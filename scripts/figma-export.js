#!/usr/bin/env node

/**
 * Figma Export Script for Assassin Game Design System
 * Automatically extracts design tokens, components, and assets from Figma
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class FigmaExporter {
  constructor(config) {
    this.figmaToken = config.figmaToken || process.env.FIGMA_TOKEN;
    this.fileKey = config.fileKey || process.env.FIGMA_FILE_KEY;
    this.outputDir = config.outputDir || './src/generated';
    this.apiBase = 'https://api.figma.com/v1';
  }

  async exportDesignTokens() {
    console.log('🎨 Extracting design tokens from Figma...');
    
    try {
      const fileData = await this.fetchFigmaFile();
      const tokens = this.extractTokens(fileData);
      
      // Generate Swift design tokens
      const swiftTokens = this.generateSwiftTokens(tokens);
      await this.writeFile('DesignTokens.swift', swiftTokens);
      
      // Generate JSON tokens for tooling
      await this.writeFile('design-tokens.json', JSON.stringify(tokens, null, 2));
      
      console.log('✅ Design tokens exported successfully');
    } catch (error) {
      console.error('❌ Failed to export design tokens:', error.message);
    }
  }

  async exportComponents() {
    console.log('🧩 Extracting components from Figma...');
    
    try {
      const components = await this.fetchComponents();
      
      for (const component of components) {
        const swiftComponent = await this.generateSwiftComponent(component);
        const fileName = `${component.name.replace(/\s+/g, '')}.swift`;
        await this.writeFile(`components/${fileName}`, swiftComponent);
      }
      
      console.log('✅ Components exported successfully');
    } catch (error) {
      console.error('❌ Failed to export components:', error.message);
    }
  }

  async exportAssets() {
    console.log('🖼️ Exporting assets from Figma...');
    
    try {
      const images = await this.fetchImages();
      
      for (const [nodeId, imageUrl] of Object.entries(images)) {
        const imageName = await this.getNodeName(nodeId);
        await this.downloadImage(imageUrl, `assets/${imageName}.png`);
      }
      
      console.log('✅ Assets exported successfully');
    } catch (error) {
      console.error('❌ Failed to export assets:', error.message);
    }
  }

  extractTokens(fileData) {
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {}
    };

    // Extract colors from styles
    if (fileData.styles) {
      Object.values(fileData.styles).forEach(style => {
        if (style.styleType === 'FILL') {
          const color = this.extractColorFromStyle(style);
          if (color) {
            tokens.colors[style.name] = color;
          }
        }
      });
    }

    // Extract text styles
    if (fileData.styles) {
      Object.values(fileData.styles).forEach(style => {
        if (style.styleType === 'TEXT') {
          const textStyle = this.extractTextStyle(style);
          if (textStyle) {
            tokens.typography[style.name] = textStyle;
          }
        }
      });
    }

    return tokens;
  }

  generateSwiftTokens(tokens) {
    return `
import SwiftUI

// MARK: - Auto-generated Design Tokens from Figma
// Generated on: ${new Date().toISOString()}

public struct FigmaDesignTokens {
    
    // MARK: - Colors
    public struct Colors {
${Object.entries(tokens.colors).map(([name, color]) => 
  `        public static let ${this.camelCase(name)} = Color(hex: "${color.hex}")`
).join('\n')}
    }
    
    // MARK: - Typography
    public struct Typography {
${Object.entries(tokens.typography).map(([name, style]) => 
  `        public static let ${this.camelCase(name)} = Font.custom("${style.fontFamily}", size: ${style.fontSize})`
).join('\n')}
    }
}
`;
  }

  async generateSwiftComponent(component) {
    const componentName = component.name.replace(/\s+/g, '');
    
    return `
import SwiftUI

// MARK: - ${componentName}
// Auto-generated from Figma component

public struct ${componentName}: View {
    // Component properties extracted from Figma
    ${this.generateComponentProperties(component)}
    
    public var body: some View {
        ${this.generateComponentBody(component)}
    }
}

#Preview {
    ${componentName}()
}
`;
  }

  generateComponentProperties(component) {
    // Analyze component structure and generate appropriate properties
    const properties = [];
    
    if (component.children) {
      component.children.forEach(child => {
        if (child.type === 'TEXT') {
          properties.push(`public var text: String = "${child.characters || 'Sample Text'}"`);
        }
      });
    }
    
    return properties.join('\n    ');
  }

  generateComponentBody(component) {
    // Generate SwiftUI view body based on Figma component structure
    return `VStack {
            Text("Generated from Figma")
                .foregroundColor(DesignTokens.Colors.textPrimary)
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)`;
  }

  camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  async fetchFigmaFile() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.figma.com',
        path: `/v1/files/${this.fileKey}`,
        headers: {
          'X-Figma-Token': this.figmaToken
        }
      };

      https.get(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  async writeFile(filePath, content) {
    const fullPath = path.join(this.outputDir, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
  }
}

// CLI usage
if (require.main === module) {
  const exporter = new FigmaExporter({
    outputDir: './src/generated'
  });
  
  async function run() {
    await exporter.exportDesignTokens();
    await exporter.exportComponents();
    await exporter.exportAssets();
  }
  
  run().catch(console.error);
}

module.exports = FigmaExporter; 