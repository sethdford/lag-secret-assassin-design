#!/usr/bin/env node

/**
 * AI-Powered Component Generator
 * Analyzes Figma designs and generates SwiftUI code
 */

const fs = require('fs');
const path = require('path');

class ComponentGenerator {
  constructor(config = {}) {
    this.designTokens = this.loadDesignTokens();
    this.templates = this.loadTemplates();
    this.outputDir = config.outputDir || './src/components';
  }

  loadDesignTokens() {
    // Load design tokens from the existing file
    return {
      colors: {
        assassinRed: '#C91C1C',
        tacticalBlue: '#3366CC',
        electricGreen: '#00FF41',
        deepNavy: '#0D0D1A'
      },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
      typography: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20 }
    };
  }

  loadTemplates() {
    return {
      button: this.getButtonTemplate(),
      card: this.getCardTemplate(),
      form: this.getFormTemplate(),
      navigation: this.getNavigationTemplate()
    };
  }

  async generateComponent(figmaNode, componentType) {
    console.log(`🔧 Generating ${componentType} component...`);

    const analysis = this.analyzeFigmaNode(figmaNode);
    const template = this.templates[componentType];
    
    if (!template) {
      throw new Error(`Unknown component type: ${componentType}`);
    }

    const swiftCode = this.generateSwiftCode(analysis, template);
    const fileName = `${analysis.name}.swift`;
    
    await this.writeComponent(fileName, swiftCode);
    await this.generatePreview(analysis.name);
    await this.generateTests(analysis.name);

    console.log(`✅ Generated ${fileName} successfully`);
    return fileName;
  }

  analyzeFigmaNode(node) {
    return {
      name: this.sanitizeName(node.name),
      type: node.type,
      width: node.absoluteBoundingBox?.width || 0,
      height: node.absoluteBoundingBox?.height || 0,
      backgroundColor: this.extractBackgroundColor(node),
      textColor: this.extractTextColor(node),
      borderRadius: this.extractBorderRadius(node),
      padding: this.extractPadding(node),
      children: this.analyzeChildren(node.children || []),
      states: this.extractStates(node),
      interactions: this.extractInteractions(node)
    };
  }

  generateSwiftCode(analysis, template) {
    let code = template.base;
    
    // Replace placeholders with actual values
    code = code.replace(/{{NAME}}/g, analysis.name);
    code = code.replace(/{{BACKGROUND_COLOR}}/g, this.mapToDesignToken('color', analysis.backgroundColor));
    code = code.replace(/{{TEXT_COLOR}}/g, this.mapToDesignToken('color', analysis.textColor));
    code = code.replace(/{{BORDER_RADIUS}}/g, this.mapToDesignToken('borderRadius', analysis.borderRadius));
    code = code.replace(/{{PADDING}}/g, this.mapToDesignToken('spacing', analysis.padding));
    
    // Generate component body based on children
    const bodyCode = this.generateComponentBody(analysis);
    code = code.replace(/{{BODY}}/g, bodyCode);
    
    // Add state management if needed
    if (analysis.states.length > 0) {
      const stateCode = this.generateStateManagement(analysis.states);
      code = code.replace(/{{STATES}}/g, stateCode);
    }
    
    return code;
  }

  generateComponentBody(analysis) {
    const children = analysis.children;
    
    if (children.length === 0) {
      return 'EmptyView()';
    }
    
    if (children.length === 1) {
      return this.generateChildView(children[0]);
    }
    
    // Multiple children - determine layout
    const layout = this.determineLayout(children);
    const childViews = children.map(child => this.generateChildView(child)).join('\n            ');
    
    return `${layout} {
            ${childViews}
        }`;
  }

  generateChildView(child) {
    switch (child.type) {
      case 'TEXT':
        return `Text("${child.text || 'Sample Text'}")
                .font(.custom("${this.designTokens.typography.primaryFont}", size: ${child.fontSize || 16}))
                .foregroundColor(${this.mapToDesignToken('color', child.color)})`;
      
      case 'RECTANGLE':
        return `Rectangle()
                .fill(${this.mapToDesignToken('color', child.backgroundColor)})
                .frame(width: ${child.width}, height: ${child.height})`;
      
      case 'FRAME':
        return this.generateFrameView(child);
      
      default:
        return `// TODO: Implement ${child.type} view`;
    }
  }

  generateFrameView(frame) {
    const children = frame.children || [];
    const childViews = children.map(child => this.generateChildView(child)).join('\n            ');
    
    return `VStack {
            ${childViews}
        }
        .padding(${this.mapToDesignToken('spacing', frame.padding)})
        .background(${this.mapToDesignToken('color', frame.backgroundColor)})`;
  }

  determineLayout(children) {
    // Simple heuristic: if children are stacked vertically, use VStack
    // If horizontally aligned, use HStack
    const firstChild = children[0];
    const secondChild = children[1];
    
    if (!firstChild || !secondChild) return 'VStack';
    
    const verticalGap = Math.abs(firstChild.y - secondChild.y);
    const horizontalGap = Math.abs(firstChild.x - secondChild.x);
    
    return verticalGap > horizontalGap ? 'VStack' : 'HStack';
  }

  mapToDesignToken(type, value) {
    switch (type) {
      case 'color':
        return this.findClosestColor(value) || 'DesignTokens.Colors.textPrimary';
      case 'spacing':
        return this.findClosestSpacing(value) || 'DesignTokens.Spacing.md';
      case 'borderRadius':
        return this.findClosestBorderRadius(value) || 'DesignTokens.BorderRadius.md';
      default:
        return value;
    }
  }

  findClosestColor(hexColor) {
    if (!hexColor) return 'DesignTokens.Colors.textPrimary';
    
    // Map common colors to design tokens
    const colorMap = {
      '#C91C1C': 'DesignTokens.Colors.assassinRed',
      '#3366CC': 'DesignTokens.Colors.tacticalBlue',
      '#00FF41': 'DesignTokens.Colors.electricGreen',
      '#0D0D1A': 'DesignTokens.Colors.deepNavy',
      '#FFFFFF': 'DesignTokens.Colors.white',
      '#000000': 'DesignTokens.Colors.black'
    };
    
    return colorMap[hexColor.toUpperCase()] || `Color(hex: "${hexColor}")`;
  }

  getButtonTemplate() {
    return {
      base: `import SwiftUI

// MARK: - {{NAME}}
// Generated from Figma design

public struct {{NAME}}: View {
    {{STATES}}
    
    let title: String
    let action: () -> Void
    
    public init(title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }
    
    public var body: some View {
        Button(action: action) {
            {{BODY}}
        }
        .background({{BACKGROUND_COLOR}})
        .foregroundColor({{TEXT_COLOR}})
        .cornerRadius({{BORDER_RADIUS}})
        .padding({{PADDING}})
    }
}

#Preview {
    {{NAME}}(title: "Sample Button") {
        print("Button tapped")
    }
}`
    };
  }

  getCardTemplate() {
    return {
      base: `import SwiftUI

// MARK: - {{NAME}}
// Generated from Figma design

public struct {{NAME}}: View {
    {{STATES}}
    
    public var body: some View {
        {{BODY}}
            .background({{BACKGROUND_COLOR}})
            .cornerRadius({{BORDER_RADIUS}})
            .padding({{PADDING}})
            .shadow(color: DesignTokens.Shadows.tactical, radius: 4, x: 0, y: 2)
    }
}

#Preview {
    {{NAME}}()
}`
    };
  }

  getFormTemplate() {
    return {
      base: `import SwiftUI

// MARK: - {{NAME}}
// Generated from Figma design

public struct {{NAME}}: View {
    {{STATES}}
    
    public var body: some View {
        Form {
            {{BODY}}
        }
        .background({{BACKGROUND_COLOR}})
        .cornerRadius({{BORDER_RADIUS}})
    }
}

#Preview {
    {{NAME}}()
}`
    };
  }

  getNavigationTemplate() {
    return {
      base: `import SwiftUI

// MARK: - {{NAME}}
// Generated from Figma design

public struct {{NAME}}: View {
    {{STATES}}
    
    public var body: some View {
        NavigationView {
            {{BODY}}
        }
        .navigationBarTitleDisplayMode(.inline)
        .background({{BACKGROUND_COLOR}})
    }
}

#Preview {
    {{NAME}}()
}`
    };
  }

  sanitizeName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').replace(/^\d/, 'Component$&');
  }

  async writeComponent(fileName, content) {
    const filePath = path.join(this.outputDir, fileName);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
  }

  async generatePreview(componentName) {
    const previewContent = `import SwiftUI

struct ${componentName}_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ${componentName}()
                .previewDisplayName("Light Mode")
            
            ${componentName}()
                .preferredColorScheme(.dark)
                .previewDisplayName("Dark Mode")
            
            ${componentName}()
                .previewDevice("iPhone SE (3rd generation)")
                .previewDisplayName("Small Screen")
        }
    }
}`;
    
    await this.writeComponent(`previews/${componentName}Preview.swift`, previewContent);
  }

  async generateTests(componentName) {
    const testContent = `import XCTest
import SwiftUI
@testable import AssassinGameDesignSystem

class ${componentName}Tests: XCTestCase {
    
    func testComponentInitialization() {
        let component = ${componentName}()
        XCTAssertNotNil(component)
    }
    
    func testComponentRendering() {
        let component = ${componentName}()
        let view = component.body
        XCTAssertNotNil(view)
    }
}`;
    
    await this.writeComponent(`tests/${componentName}Tests.swift`, testContent);
  }

  // Helper methods for extraction (simplified for example)
  extractBackgroundColor(node) { return node.fills?.[0]?.color || '#FFFFFF'; }
  extractTextColor(node) { return node.fills?.[0]?.color || '#000000'; }
  extractBorderRadius(node) { return node.cornerRadius || 0; }
  extractPadding(node) { return 16; }
  analyzeChildren(children) { return children.map(child => ({ ...child, type: child.type })); }
  extractStates(node) { return []; }
  extractInteractions(node) { return []; }
  generateStateManagement(states) { return '@State private var isPressed = false'; }
  findClosestSpacing(value) { return 'DesignTokens.Spacing.md'; }
  findClosestBorderRadius(value) { return 'DesignTokens.BorderRadius.md'; }
}

module.exports = ComponentGenerator; 