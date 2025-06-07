#!/usr/bin/env node

/**
 * Design System Documentation Generator
 * Creates comprehensive documentation from components and design tokens
 */

const fs = require('fs');
const path = require('path');

class DocsGenerator {
  constructor(config = {}) {
    this.srcDir = config.srcDir || './src';
    this.docsDir = config.docsDir || './docs';
    this.outputDir = config.outputDir || './docs/generated';
  }

  async generateFullDocumentation() {
    console.log('📚 Generating design system documentation...');

    await this.generateTokensDocumentation();
    await this.generateComponentsDocumentation();
    await this.generateUsageGuides();
    await this.generateStyleGuide();
    await this.generateInteractiveExamples();

    console.log('✅ Documentation generated successfully');
  }

  async generateTokensDocumentation() {
    console.log('🎨 Generating design tokens documentation...');

    const tokensDoc = `# Design Tokens

## Overview
Design tokens are the visual design atoms of the Assassin Game design system. They store visual design attributes and ensure consistency across all components.

## Color Palette

### Primary Colors
These colors define the core brand identity and tactical aesthetic.

\`\`\`swift
// Assassin Red - Primary action color
DesignTokens.Colors.assassinRed // #C91C1C

// Tactical Blue - Secondary actions and info
DesignTokens.Colors.tacticalBlue // #3366CC

// Electric Green - Success states and highlights
DesignTokens.Colors.electricGreen // #00FF41

// Deep Navy - Primary background
DesignTokens.Colors.deepNavy // #0D0D1A
\`\`\`

### Usage Examples

#### Buttons
\`\`\`swift
Button("Eliminate Target") {
    // Action
}
.background(DesignTokens.Colors.assassinRed)
.foregroundColor(DesignTokens.Colors.white)
\`\`\`

#### Status Indicators
\`\`\`swift
Text("Mission Complete")
    .foregroundColor(DesignTokens.Colors.electricGreen)
\`\`\`

## Typography

### Font Hierarchy
\`\`\`swift
// Headlines
.font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxxl))

// Body Text
.font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.base))

// Captions
.font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.sm))
\`\`\`

## Spacing System

### Consistent Spacing
\`\`\`swift
// Extra Small - 4pt
.padding(DesignTokens.Spacing.xs)

// Small - 8pt
.padding(DesignTokens.Spacing.sm)

// Medium - 16pt (Base unit)
.padding(DesignTokens.Spacing.md)

// Large - 24pt
.padding(DesignTokens.Spacing.lg)

// Extra Large - 32pt
.padding(DesignTokens.Spacing.xl)
\`\`\`

## Border Radius

### Rounded Corners
\`\`\`swift
// Small radius for subtle rounding
.cornerRadius(DesignTokens.BorderRadius.sm)

// Medium radius for cards and buttons
.cornerRadius(DesignTokens.BorderRadius.md)

// Large radius for prominent elements
.cornerRadius(DesignTokens.BorderRadius.lg)
\`\`\`

## Shadows

### Tactical Depth
\`\`\`swift
// Standard tactical shadow
.shadow(color: DesignTokens.Shadows.tactical, radius: 4, x: 0, y: 2)

// Electric glow effect
.shadow(color: DesignTokens.Shadows.glow, radius: 8, x: 0, y: 0)

// Danger highlight
.shadow(color: DesignTokens.Shadows.danger, radius: 6, x: 0, y: 3)
\`\`\`
`;

    await this.writeFile('design-tokens.md', tokensDoc);
  }

  async generateComponentsDocumentation() {
    console.log('🧩 Generating components documentation...');

    const componentsDir = path.join(this.srcDir, 'components');
    const components = await this.scanComponents(componentsDir);

    for (const component of components) {
      await this.generateComponentDoc(component);
    }

    // Generate components index
    const indexDoc = this.generateComponentsIndex(components);
    await this.writeFile('components/index.md', indexDoc);
  }

  async generateComponentDoc(component) {
    const doc = `# ${component.name}

## Overview
${component.description || 'A reusable UI component for the Assassin Game design system.'}

## Usage

### Basic Example
\`\`\`swift
${component.basicExample}
\`\`\`

### Advanced Example
\`\`\`swift
${component.advancedExample}
\`\`\`

## Properties

${component.properties.map(prop => `
### ${prop.name}
- **Type:** \`${prop.type}\`
- **Default:** \`${prop.default || 'None'}\`
- **Description:** ${prop.description}
`).join('\n')}

## Variants

${component.variants.map(variant => `
### ${variant.name}
${variant.description}

\`\`\`swift
${variant.code}
\`\`\`
`).join('\n')}

## Accessibility

- **VoiceOver:** ${component.accessibility?.voiceOver || 'Properly labeled for screen readers'}
- **Dynamic Type:** ${component.accessibility?.dynamicType || 'Supports system font scaling'}
- **High Contrast:** ${component.accessibility?.highContrast || 'Adapts to high contrast mode'}

## Design Guidelines

### Do's
${component.guidelines?.dos?.map(item => `- ${item}`).join('\n') || '- Use consistent spacing and colors'}

### Don'ts
${component.guidelines?.donts?.map(item => `- ${item}`).join('\n') || '- Don\'t modify core styling properties'}

## Related Components
${component.relatedComponents?.map(comp => `- [${comp}](${comp.toLowerCase()}.md)`).join('\n') || 'None'}
`;

    await this.writeFile(`components/${component.name.toLowerCase()}.md`, doc);
  }

  generateComponentsIndex(components) {
    return `# Components

## Overview
The Assassin Game design system provides a comprehensive set of UI components designed for tactical, high-contrast interfaces.

## Component Categories

### Buttons
${components.filter(c => c.category === 'buttons').map(c => `- [${c.name}](${c.name.toLowerCase()}.md)`).join('\n')}

### Cards
${components.filter(c => c.category === 'cards').map(c => `- [${c.name}](${c.name.toLowerCase()}.md)`).join('\n')}

### Forms
${components.filter(c => c.category === 'forms').map(c => `- [${c.name}](${c.name.toLowerCase()}.md)`).join('\n')}

### Navigation
${components.filter(c => c.category === 'navigation').map(c => `- [${c.name}](${c.name.toLowerCase()}.md)`).join('\n')}

### Notifications
${components.filter(c => c.category === 'notifications').map(c => `- [${c.name}](${c.name.toLowerCase()}.md)`).join('\n')}

## Quick Reference

| Component | Category | Description |
|-----------|----------|-------------|
${components.map(c => `| [${c.name}](${c.name.toLowerCase()}.md) | ${c.category} | ${c.description || 'UI Component'} |`).join('\n')}
`;
  }

  async generateUsageGuides() {
    console.log('📖 Generating usage guides...');

    const migrationGuide = `# Migration Guide

## From Figma to Code

### Step 1: Export Design Tokens
\`\`\`bash
npm run figma:export-tokens
\`\`\`

### Step 2: Generate Components
\`\`\`bash
npm run figma:generate-components
\`\`\`

### Step 3: Review and Customize
1. Check generated components in \`src/components/generated/\`
2. Move approved components to appropriate category folders
3. Customize as needed while maintaining design token usage

## Best Practices

### Using Design Tokens
Always use design tokens instead of hardcoded values:

\`\`\`swift
// ✅ Good
.foregroundColor(DesignTokens.Colors.assassinRed)
.padding(DesignTokens.Spacing.md)

// ❌ Bad
.foregroundColor(Color(red: 0.78, green: 0.11, blue: 0.11))
.padding(16)
\`\`\`

### Component Composition
Build complex interfaces by composing simple components:

\`\`\`swift
VStack(spacing: DesignTokens.Spacing.md) {
    TacticalButton(title: "Primary Action", style: .primary) { }
    TacticalButton(title: "Secondary Action", style: .secondary) { }
}
\`\`\`
`;

    await this.writeFile('migration-guide.md', migrationGuide);

    const setupGuide = `# Setup Guide

## Installation

### 1. Add to Xcode Project
1. Open your Xcode project
2. Go to File → Add Package Dependencies
3. Enter the repository URL
4. Select the version and add to your target

### 2. Import the Design System
\`\`\`swift
import AssassinGameDesignSystem
\`\`\`

### 3. Configure Your App
\`\`\`swift
@main
struct AssassinGameApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.dark) // Tactical theme
        }
    }
}
\`\`\`

## Development Workflow

### 1. Design in Figma
- Use the official Assassin Game design system file
- Follow naming conventions for components
- Use established color and typography styles

### 2. Export and Generate
\`\`\`bash
# Export design tokens and assets
npm run figma:export

# Generate component code
npm run generate:components

# Build design system
npm run build
\`\`\`

### 3. Integrate and Test
- Review generated components
- Test on different devices and orientations
- Validate accessibility features
`;

    await this.writeFile('setup-guide.md', setupGuide);
  }

  async generateStyleGuide() {
    console.log('🎨 Generating style guide...');

    const styleGuide = `# Style Guide

## Visual Principles

### Tactical Aesthetic
The Assassin Game design system embodies a tactical, high-contrast aesthetic suitable for covert operations and strategic gameplay.

#### Key Characteristics
- **High Contrast:** Clear distinction between elements
- **Minimal Distractions:** Focus on essential information
- **Tactical Colors:** Military-inspired color palette
- **Sharp Edges:** Clean, precise geometric shapes

### Color Philosophy

#### Primary Palette
- **Assassin Red (#C91C1C):** Danger, elimination, primary actions
- **Tactical Blue (#3366CC):** Information, secondary actions, navigation
- **Electric Green (#00FF41):** Success, completion, positive feedback
- **Deep Navy (#0D0D1A):** Primary background, depth

#### Usage Guidelines
1. **Assassin Red:** Use sparingly for critical actions and warnings
2. **Tactical Blue:** Ideal for informational elements and secondary buttons
3. **Electric Green:** Perfect for success states and confirmations
4. **Deep Navy:** Primary background color for dark theme

### Typography Hierarchy

#### Font Selection
- **Primary:** SF Pro Display (Headlines, UI elements)
- **Secondary:** SF Pro Text (Body text, descriptions)
- **Monospace:** SF Mono (Code, technical data)

#### Size Scale
- **4XL (36pt):** Main headlines
- **3XL (30pt):** Section headers
- **2XL (24pt):** Subsection headers
- **XL (20pt):** Large body text
- **LG (18pt):** Emphasized text
- **Base (16pt):** Standard body text
- **SM (14pt):** Secondary text
- **XS (12pt):** Captions, metadata

### Spacing System

#### 8-Point Grid
All spacing follows an 8-point grid system for consistency:
- **4pt:** Micro spacing (XS)
- **8pt:** Small spacing (SM)
- **16pt:** Base spacing (MD)
- **24pt:** Large spacing (LG)
- **32pt:** Extra large spacing (XL)

### Component Patterns

#### Button Hierarchy
1. **Primary:** Assassin red background, white text
2. **Secondary:** Tactical blue background, white text
3. **Tertiary:** Transparent background, colored border
4. **Ghost:** Text-only, no background

#### Card Layouts
- **Elevated:** Subtle shadow for depth
- **Outlined:** Border-only for minimal style
- **Filled:** Solid background for emphasis

## Implementation Examples

### Color Usage
\`\`\`swift
// Primary action
Button("Eliminate") { }
    .background(DesignTokens.Colors.assassinRed)

// Success feedback
Text("Mission Complete")
    .foregroundColor(DesignTokens.Colors.electricGreen)
\`\`\`

### Typography Implementation
\`\`\`swift
VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
    Text("Mission Briefing")
        .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxxl))
        .fontWeight(DesignTokens.Typography.bold)
    
    Text("Your target has been identified...")
        .font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.base))
        .fontWeight(DesignTokens.Typography.regular)
}
\`\`\`
`;

    await this.writeFile('style-guide.md', styleGuide);
  }

  async generateInteractiveExamples() {
    console.log('🎮 Generating interactive examples...');

    const examplesDoc = `# Interactive Examples

## Component Playground

### Button Examples
\`\`\`swift
struct ButtonExamples: View {
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.lg) {
            // Primary Button
            TacticalButton(
                title: "Eliminate Target",
                style: .primary,
                action: { print("Primary action") }
            )
            
            // Secondary Button
            TacticalButton(
                title: "View Intel",
                style: .secondary,
                action: { print("Secondary action") }
            )
            
            // Danger Button
            TacticalButton(
                title: "Abort Mission",
                style: .danger,
                action: { print("Danger action") }
            )
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
\`\`\`

### Card Examples
\`\`\`swift
struct CardExamples: View {
    var body: some View {
        ScrollView {
            VStack(spacing: DesignTokens.Spacing.md) {
                // Mission Card
                MissionCard(
                    title: "Operation Nightfall",
                    description: "Infiltrate the compound and retrieve classified documents",
                    status: .active,
                    difficulty: .high
                )
                
                // Target Card
                TargetCard(
                    name: "Agent Smith",
                    location: "Downtown Plaza",
                    threat: .medium,
                    image: "agent_smith"
                )
                
                // Stats Card
                StatsCard(
                    eliminations: 12,
                    missionsCompleted: 8,
                    rank: "Elite Assassin"
                )
            }
            .padding()
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
\`\`\`

### Form Examples
\`\`\`swift
struct FormExamples: View {
    @State private var codename = ""
    @State private var mission = ""
    @State private var isSecure = false
    
    var body: some View {
        Form {
            Section("Agent Details") {
                TacticalTextField(
                    title: "Codename",
                    text: $codename,
                    placeholder: "Enter your codename"
                )
                
                TacticalTextEditor(
                    title: "Mission Brief",
                    text: $mission,
                    placeholder: "Describe your mission..."
                )
                
                TacticalToggle(
                    title: "Secure Communication",
                    isOn: $isSecure
                )
            }
            
            Section {
                TacticalButton(
                    title: "Submit Report",
                    style: .primary
                ) {
                    // Submit action
                }
            }
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
\`\`\`

## Complete Screen Examples

### Mission Dashboard
\`\`\`swift
struct MissionDashboard: View {
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: DesignTokens.Spacing.lg) {
                    // Header Stats
                    HStack(spacing: DesignTokens.Spacing.md) {
                        StatCard(title: "Active", value: "3", color: .electricGreen)
                        StatCard(title: "Pending", value: "7", color: .tacticalBlue)
                        StatCard(title: "Complete", value: "24", color: .mediumGray)
                    }
                    
                    // Mission List
                    LazyVStack(spacing: DesignTokens.Spacing.sm) {
                        ForEach(missions) { mission in
                            MissionCard(mission: mission)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Missions")
            .navigationBarTitleDisplayMode(.large)
            .background(DesignTokens.Colors.backgroundPrimary)
        }
    }
}
\`\`\`

### Target Profile
\`\`\`swift
struct TargetProfile: View {
    let target: Target
    
    var body: some View {
        ScrollView {
            VStack(spacing: DesignTokens.Spacing.lg) {
                // Profile Header
                VStack(spacing: DesignTokens.Spacing.md) {
                    AsyncImage(url: target.imageURL) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Rectangle()
                            .fill(DesignTokens.Colors.darkGray)
                    }
                    .frame(width: 120, height: 120)
                    .clipShape(Circle())
                    
                    Text(target.name)
                        .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxl))
                        .fontWeight(DesignTokens.Typography.bold)
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                    
                    ThreatBadge(level: target.threatLevel)
                }
                
                // Details Section
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
                    DetailRow(title: "Location", value: target.lastKnownLocation)
                    DetailRow(title: "Occupation", value: target.occupation)
                    DetailRow(title: "Known Associates", value: "\\(target.associates.count)")
                }
                .padding()
                .background(DesignTokens.Colors.backgroundSecondary)
                .cornerRadius(DesignTokens.BorderRadius.lg)
                
                // Action Buttons
                VStack(spacing: DesignTokens.Spacing.sm) {
                    TacticalButton(title: "Track Target", style: .primary) {
                        // Track action
                    }
                    
                    TacticalButton(title: "View Intel", style: .secondary) {
                        // Intel action
                    }
                }
            }
            .padding()
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
\`\`\`
`;

    await this.writeFile('interactive-examples.md', examplesDoc);
  }

  async scanComponents(dir) {
    const components = [];
    
    if (!fs.existsSync(dir)) {
      return components;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Scan subdirectory
        const subComponents = await this.scanComponents(itemPath);
        components.push(...subComponents);
      } else if (item.endsWith('.swift') && !item.includes('Test')) {
        // Parse Swift component file
        const component = await this.parseSwiftComponent(itemPath, item);
        if (component) {
          components.push(component);
        }
      }
    }
    
    return components;
  }

  async parseSwiftComponent(filePath, fileName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const name = fileName.replace('.swift', '');
      
      // Extract basic information from Swift file
      const component = {
        name,
        category: this.inferCategory(filePath),
        description: this.extractDescription(content),
        properties: this.extractProperties(content),
        variants: this.extractVariants(content),
        basicExample: this.generateBasicExample(name, content),
        advancedExample: this.generateAdvancedExample(name, content),
        accessibility: this.extractAccessibility(content),
        guidelines: this.generateGuidelines(name),
        relatedComponents: this.findRelatedComponents(name)
      };
      
      return component;
    } catch (error) {
      console.warn(`Failed to parse component ${fileName}:`, error.message);
      return null;
    }
  }

  inferCategory(filePath) {
    if (filePath.includes('/buttons/')) return 'buttons';
    if (filePath.includes('/cards/')) return 'cards';
    if (filePath.includes('/forms/')) return 'forms';
    if (filePath.includes('/navigation/')) return 'navigation';
    if (filePath.includes('/notifications/')) return 'notifications';
    return 'general';
  }

  extractDescription(content) {
    const match = content.match(/\/\/ MARK: - (.+)/);
    return match ? match[1] : 'A reusable UI component';
  }

  extractProperties(content) {
    const properties = [];
    const propRegex = /@State|@Binding|let|var\s+(\w+):\s*([^=\n]+)/g;
    let match;
    
    while ((match = propRegex.exec(content)) !== null) {
      properties.push({
        name: match[1],
        type: match[2].trim(),
        description: `${match[1]} property`
      });
    }
    
    return properties;
  }

  extractVariants(content) {
    // Simple variant extraction - could be enhanced
    return [
      {
        name: 'Default',
        description: 'Standard appearance',
        code: `${this.extractComponentName(content)}()`
      }
    ];
  }

  extractComponentName(content) {
    const match = content.match(/struct\s+(\w+):\s*View/);
    return match ? match[1] : 'Component';
  }

  generateBasicExample(name, content) {
    return `${name}()`;
  }

  generateAdvancedExample(name, content) {
    return `${name}()
    .padding()
    .background(DesignTokens.Colors.backgroundSecondary)
    .cornerRadius(DesignTokens.BorderRadius.md)`;
  }

  extractAccessibility(content) {
    return {
      voiceOver: 'Properly labeled for screen readers',
      dynamicType: 'Supports system font scaling',
      highContrast: 'Adapts to high contrast mode'
    };
  }

  generateGuidelines(name) {
    return {
      dos: [
        'Use consistent spacing from design tokens',
        'Follow the established color palette',
        'Maintain proper contrast ratios'
      ],
      donts: [
        'Don\'t use hardcoded colors or spacing',
        'Don\'t modify core component structure',
        'Don\'t ignore accessibility requirements'
      ]
    };
  }

  findRelatedComponents(name) {
    // Simple related component detection
    const related = [];
    if (name.includes('Button')) related.push('TacticalButton');
    if (name.includes('Card')) related.push('MissionCard', 'TargetCard');
    return related;
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
  const generator = new DocsGenerator();
  generator.generateFullDocumentation().catch(console.error);
}

module.exports = DocsGenerator; 