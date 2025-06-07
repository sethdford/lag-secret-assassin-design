#!/usr/bin/env node

/**
 * Real-time Design Token Sync
 * Watches for Figma changes and automatically updates SwiftUI design tokens
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

class DesignTokenSync {
    constructor() {
        this.figmaApiKey = process.env.FIGMA_API_KEY;
        this.fileKey = process.env.FIGMA_FILE_KEY;
        this.outputDir = './src/components/tokens';
        this.lastSync = null;
        this.syncInterval = 30000; // 30 seconds
        this.isWatching = false;
        this.tokens = {
            colors: new Map(),
            typography: new Map(),
            spacing: new Map(),
            shadows: new Map(),
            borders: new Map()
        };
    }

    async startSync() {
        console.log('🔄 Starting real-time design token sync...');
        
        this.ensureDirectory(this.outputDir);
        
        // Initial sync
        await this.syncTokens();
        
        // Start watching for changes
        this.startWatching();
        
        // Set up periodic sync
        setInterval(() => {
            this.syncTokens();
        }, this.syncInterval);
        
        console.log('✅ Design token sync started!');
        console.log(`📁 Output directory: ${this.outputDir}`);
        console.log(`⏱️  Sync interval: ${this.syncInterval / 1000}s`);
    }

    async syncTokens() {
        try {
            console.log('🔍 Checking for design token updates...');
            
            const tokens = await this.fetchDesignTokens();
            const hasChanges = this.detectChanges(tokens);
            
            if (hasChanges) {
                console.log('📝 Design tokens updated, generating SwiftUI code...');
                await this.generateSwiftUITokens(tokens);
                await this.generateTokenDocumentation(tokens);
                this.lastSync = new Date();
                console.log('✅ Design tokens synchronized!');
            } else {
                console.log('✨ No changes detected');
            }
            
        } catch (error) {
            console.log('⚠️  Figma API not available, using cached tokens...');
            await this.generateSampleTokens();
        }
    }

    async fetchDesignTokens() {
        if (!this.figmaApiKey || !this.fileKey) {
            throw new Error('Figma API credentials not available');
        }

        const response = await fetch(`https://api.figma.com/v1/files/${this.fileKey}`, {
            headers: { 'X-Figma-Token': this.figmaApiKey }
        });

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status}`);
        }

        const data = await response.json();
        return this.extractTokens(data);
    }

    extractTokens(figmaData) {
        const tokens = {
            colors: new Map(),
            typography: new Map(),
            spacing: new Map(),
            shadows: new Map(),
            borders: new Map(),
            lastModified: figmaData.lastModified
        };

        this.extractColorTokens(figmaData.document, tokens.colors);
        this.extractTypographyTokens(figmaData.document, tokens.typography);
        this.extractSpacingTokens(figmaData.document, tokens.spacing);
        this.extractShadowTokens(figmaData.document, tokens.shadows);
        this.extractBorderTokens(figmaData.document, tokens.borders);

        return tokens;
    }

    extractColorTokens(node, colorMap) {
        if (!node) return;

        // Extract colors from fills
        if (node.fills && Array.isArray(node.fills)) {
            node.fills.forEach(fill => {
                if (fill.type === 'SOLID' && fill.color) {
                    const colorName = this.generateColorName(node.name || 'unnamed');
                    colorMap.set(colorName, {
                        r: Math.round(fill.color.r * 255),
                        g: Math.round(fill.color.g * 255),
                        b: Math.round(fill.color.b * 255),
                        a: fill.opacity || 1
                    });
                }
            });
        }

        // Recursively process children
        if (node.children) {
            node.children.forEach(child => {
                this.extractColorTokens(child, colorMap);
            });
        }
    }

    extractTypographyTokens(node, typographyMap) {
        if (!node) return;

        if (node.style && node.type === 'TEXT') {
            const fontName = this.generateFontName(node.name || 'unnamed');
            typographyMap.set(fontName, {
                fontFamily: node.style.fontFamily || 'System',
                fontSize: node.style.fontSize || 16,
                fontWeight: node.style.fontWeight || 400,
                lineHeight: node.style.lineHeightPx || node.style.fontSize * 1.2,
                letterSpacing: node.style.letterSpacing || 0
            });
        }

        if (node.children) {
            node.children.forEach(child => {
                this.extractTypographyTokens(child, typographyMap);
            });
        }
    }

    extractSpacingTokens(node, spacingMap) {
        if (!node) return;

        // Extract padding and margins
        if (node.paddingLeft !== undefined) {
            spacingMap.set('padding-left', node.paddingLeft);
        }
        if (node.paddingRight !== undefined) {
            spacingMap.set('padding-right', node.paddingRight);
        }
        if (node.paddingTop !== undefined) {
            spacingMap.set('padding-top', node.paddingTop);
        }
        if (node.paddingBottom !== undefined) {
            spacingMap.set('padding-bottom', node.paddingBottom);
        }

        // Extract item spacing for auto-layout
        if (node.itemSpacing !== undefined) {
            spacingMap.set('item-spacing', node.itemSpacing);
        }

        if (node.children) {
            node.children.forEach(child => {
                this.extractSpacingTokens(child, spacingMap);
            });
        }
    }

    detectChanges(newTokens) {
        if (!this.lastSync) return true;
        
        // Compare token counts
        const oldColorCount = this.tokens.colors.size;
        const newColorCount = newTokens.colors.size;
        
        if (oldColorCount !== newColorCount) return true;
        
        // Compare individual tokens
        for (const [name, color] of newTokens.colors) {
            const oldColor = this.tokens.colors.get(name);
            if (!oldColor || 
                oldColor.r !== color.r || 
                oldColor.g !== color.g || 
                oldColor.b !== color.b || 
                oldColor.a !== color.a) {
                return true;
            }
        }
        
        return false;
    }

    async generateSwiftUITokens(tokens) {
        // Generate color tokens
        const colorExtension = this.generateColorExtension(tokens.colors);
        this.writeFile('Colors.swift', colorExtension);

        // Generate typography tokens
        const typographyExtension = this.generateTypographyExtension(tokens.typography);
        this.writeFile('Typography.swift', typographyExtension);

        // Generate spacing tokens
        const spacingExtension = this.generateSpacingExtension(tokens.spacing);
        this.writeFile('Spacing.swift', spacingExtension);

        // Generate shadow tokens
        const shadowExtension = this.generateShadowExtension(tokens.shadows);
        this.writeFile('Shadows.swift', shadowExtension);

        // Generate main tokens file
        const mainTokens = this.generateMainTokensFile();
        this.writeFile('DesignTokens.swift', mainTokens);

        // Update cached tokens
        this.tokens = tokens;
    }

    generateColorExtension(colorMap) {
        const colors = Array.from(colorMap.entries());
        
        return `import SwiftUI

/// Design System Colors - Auto-generated from Figma
/// Last updated: ${new Date().toISOString()}
extension Color {
    
    // MARK: - Tactical Color Palette
    
${colors.map(([name, color]) => `    /// ${name} - RGB(${color.r}, ${color.g}, ${color.b})
    static let ${this.camelCase(name)} = Color(
        red: ${(color.r / 255).toFixed(3)},
        green: ${(color.g / 255).toFixed(3)},
        blue: ${(color.b / 255).toFixed(3)},
        opacity: ${color.a.toFixed(3)}
    )`).join('\n\n')}
    
    // MARK: - Semantic Colors
    
    /// Primary action color for mission-critical buttons
    static let primaryAction = assassinRed
    
    /// Secondary action color for supporting actions
    static let secondaryAction = tacticalBlue
    
    /// Success state color for completed missions
    static let successState = electricGreen
    
    /// Warning state color for caution alerts
    static let warningState = Color.orange
    
    /// Error state color for critical failures
    static let errorState = assassinRed
    
    /// Background color for main content areas
    static let primaryBackground = deepNavy
    
    /// Background color for secondary content areas
    static let secondaryBackground = Color.black.opacity(0.8)
    
    // MARK: - Accessibility Helpers
    
    /// High contrast version of primary action
    static let primaryActionHighContrast = Color.white
    
    /// High contrast version of secondary action
    static let secondaryActionHighContrast = Color.black
    
    // MARK: - Dynamic Colors
    
    /// Adaptive color that changes based on color scheme
    static func adaptive(light: Color, dark: Color) -> Color {
        Color(UIColor { traitCollection in
            traitCollection.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light)
        })
    }
}

// MARK: - UIColor Extension

extension UIColor {
    
    // MARK: - Tactical Color Palette
    
${colors.map(([name, color]) => `    /// ${name} - RGB(${color.r}, ${color.g}, ${color.b})
    static let ${this.camelCase(name)} = UIColor(
        red: ${(color.r / 255).toFixed(3)},
        green: ${(color.g / 255).toFixed(3)},
        blue: ${(color.b / 255).toFixed(3)},
        alpha: ${color.a.toFixed(3)}
    )`).join('\n\n')}
}

// MARK: - Color Utilities

extension Color {
    
    /// Convert Color to hex string
    var hexString: String {
        let uiColor = UIColor(self)
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0
        
        uiColor.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        
        return String(format: "#%02X%02X%02X",
                     Int(red * 255),
                     Int(green * 255),
                     Int(blue * 255))
    }
    
    /// Create Color from hex string
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}`;
    }

    generateTypographyExtension(typographyMap) {
        const fonts = Array.from(typographyMap.entries());
        
        return `import SwiftUI

/// Design System Typography - Auto-generated from Figma
/// Last updated: ${new Date().toISOString()}
extension Font {
    
    // MARK: - Tactical Typography Scale
    
${fonts.map(([name, font]) => `    /// ${name} - ${font.fontFamily} ${font.fontSize}pt
    static let ${this.camelCase(name)} = Font.custom(
        "${font.fontFamily}",
        size: ${font.fontSize}
    ).weight(.init(${font.fontWeight}))
    
    /// ${name} with custom size
    static func ${this.camelCase(name)}(size: CGFloat) -> Font {
        Font.custom("${font.fontFamily}", size: size)
            .weight(.init(${font.fontWeight}))
    }`).join('\n\n')}
    
    // MARK: - Semantic Typography
    
    /// Large title for mission headers
    static let missionTitle = Font.system(size: 34, weight: .bold, design: .default)
    
    /// Section headers for tactical information
    static let sectionHeader = Font.system(size: 22, weight: .semibold, design: .default)
    
    /// Body text for mission details
    static let missionBody = Font.system(size: 17, weight: .regular, design: .default)
    
    /// Caption text for status indicators
    static let statusCaption = Font.system(size: 12, weight: .medium, design: .default)
    
    /// Monospace font for codes and coordinates
    static let tacticalMono = Font.system(size: 16, weight: .regular, design: .monospaced)
    
    // MARK: - Accessibility Helpers
    
    /// Large accessibility version of body text
    static let bodyLarge = Font.system(size: 20, weight: .regular, design: .default)
    
    /// Extra large accessibility version of body text
    static let bodyExtraLarge = Font.system(size: 24, weight: .regular, design: .default)
}

// MARK: - Text Style Modifiers

extension Text {
    
    /// Apply tactical styling to text
    func tacticalStyle() -> some View {
        self
            .font(.missionBody)
            .foregroundColor(.primary)
            .tracking(0.5)
    }
    
    /// Apply mission title styling
    func missionTitleStyle() -> some View {
        self
            .font(.missionTitle)
            .foregroundColor(.primaryAction)
            .fontWeight(.bold)
            .tracking(1.0)
    }
    
    /// Apply status caption styling
    func statusStyle() -> some View {
        self
            .font(.statusCaption)
            .foregroundColor(.secondary)
            .textCase(.uppercase)
            .tracking(1.2)
    }
    
    /// Apply monospace styling for codes
    func codeStyle() -> some View {
        self
            .font(.tacticalMono)
            .foregroundColor(.electricGreen)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(Color.black.opacity(0.3))
            .cornerRadius(4)
    }
}

// MARK: - Typography Utilities

struct TypographyShowcase: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Mission Typography")
                .missionTitleStyle()
            
            Text("Section Header")
                .font(.sectionHeader)
                .foregroundColor(.tacticalBlue)
            
            Text("This is body text for mission details and tactical information.")
                .tacticalStyle()
            
            Text("STATUS: ACTIVE")
                .statusStyle()
            
            Text("COORD: 40.7128°N 74.0060°W")
                .codeStyle()
        }
        .padding()
        .background(Color.primaryBackground)
    }
}`;
    }

    generateShadowExtension(shadowMap) {
        const shadows = Array.from(shadowMap.entries());
        
        return `import SwiftUI

/// Design System Shadows - Auto-generated from Figma
/// Last updated: ${new Date().toISOString()}
extension View {
    
    // MARK: - Tactical Shadow Effects
    
${shadows.map(([name, shadow]) => `    /// ${name} shadow effect
    func ${this.camelCase(name)}Shadow() -> some View {
        self.shadow(
            color: Color.black.opacity(${shadow.opacity || 0.3}),
            radius: ${shadow.radius || 4},
            x: ${shadow.x || 0},
            y: ${shadow.y || 2}
        )
    }`).join('\n\n')}
    
    // MARK: - Semantic Shadows
    
    /// Subtle shadow for cards and panels
    func cardShadow() -> some View {
        self.shadow(
            color: Color.black.opacity(0.2),
            radius: 8,
            x: 0,
            y: 4
        )
    }
    
    /// Dramatic shadow for floating elements
    func floatingShadow() -> some View {
        self.shadow(
            color: Color.black.opacity(0.4),
            radius: 16,
            x: 0,
            y: 8
        )
    }
    
    /// Tactical glow effect for active elements
    func tacticalGlow(color: Color = .electricGreen) -> some View {
        self.shadow(
            color: color.opacity(0.6),
            radius: 12,
            x: 0,
            y: 0
        )
    }
    
    /// Mission critical highlight
    func criticalHighlight() -> some View {
        self.shadow(
            color: Color.assassinRed.opacity(0.8),
            radius: 8,
            x: 0,
            y: 0
        )
    }
}`;
    }

    generateSpacingExtension(spacingMap) {
        const spacings = Array.from(spacingMap.entries());
        
        return `import SwiftUI

/// Design System Spacing - Auto-generated from Figma
/// Last updated: ${new Date().toISOString()}
extension CGFloat {
    
    // MARK: - Tactical Spacing Scale
    
${spacings.map(([name, value]) => `    /// ${name} spacing - ${value}pt
    static let ${this.camelCase(name.replace('-', ''))} = CGFloat(${value})`).join('\n')}
    
    // MARK: - Standard Spacing Scale
    
    /// Extra small spacing - 4pt
    static let spacingXS = CGFloat(4)
    
    /// Small spacing - 8pt
    static let spacingS = CGFloat(8)
    
    /// Medium spacing - 16pt
    static let spacingM = CGFloat(16)
    
    /// Large spacing - 24pt
    static let spacingL = CGFloat(24)
    
    /// Extra large spacing - 32pt
    static let spacingXL = CGFloat(32)
    
    /// Extra extra large spacing - 48pt
    static let spacingXXL = CGFloat(48)
    
    // MARK: - Component Spacing
    
    /// Button padding horizontal
    static let buttonPaddingH = CGFloat(16)
    
    /// Button padding vertical
    static let buttonPaddingV = CGFloat(12)
    
    /// Card padding
    static let cardPadding = CGFloat(16)
    
    /// Section spacing
    static let sectionSpacing = CGFloat(24)
    
    /// List item spacing
    static let listItemSpacing = CGFloat(12)
    
    // MARK: - Layout Spacing
    
    /// Screen edge margins
    static let screenMargin = CGFloat(20)
    
    /// Content max width
    static let contentMaxWidth = CGFloat(375)
    
    /// Safe area padding
    static let safeAreaPadding = CGFloat(16)
}

// MARK: - Spacing Modifiers

extension View {
    
    /// Apply standard tactical padding
    func tacticalPadding() -> some View {
        self.padding(.spacingM)
    }
    
    /// Apply card-style padding
    func cardPadding() -> some View {
        self.padding(.cardPadding)
    }
    
    /// Apply section spacing
    func sectionSpacing() -> some View {
        self.padding(.vertical, .sectionSpacing)
    }
    
    /// Apply screen edge margins
    func screenMargins() -> some View {
        self.padding(.horizontal, .screenMargin)
    }
    
    /// Apply safe area aware padding
    func safeAreaPadding() -> some View {
        self.padding(.safeAreaPadding)
    }
}

// MARK: - Spacing Utilities

struct SpacingShowcase: View {
    var body: some View {
        VStack(spacing: .spacingM) {
            Text("Spacing Showcase")
                .font(.headline)
                .tacticalPadding()
                .background(Color.secondaryBackground)
                .cornerRadius(8)
            
            HStack(spacing: .spacingS) {
                ForEach(0..<3) { _ in
                    Rectangle()
                        .fill(Color.tacticalBlue)
                        .frame(width: 60, height: 40)
                }
            }
            
            VStack(spacing: .spacingL) {
                Text("Large spacing between sections")
                Text("Creates clear visual hierarchy")
            }
            .cardPadding()
            .background(Color.secondaryBackground)
            .cornerRadius(12)
        }
        .screenMargins()
        .background(Color.primaryBackground)
    }
}`;
    }

    async generateSampleTokens() {
        console.log('📝 Generating sample design tokens...');
        
        this.ensureDirectory(this.outputDir);
        
        // Sample tactical color palette
        const sampleColors = new Map([
            ['assassin-red', { r: 220, g: 38, b: 38, a: 1 }],
            ['tactical-blue', { r: 37, g: 99, b: 235, a: 1 }],
            ['electric-green', { r: 34, g: 197, b: 94, a: 1 }],
            ['deep-navy', { r: 15, g: 23, b: 42, a: 1 }],
            ['stealth-gray', { r: 75, g: 85, b: 99, a: 1 }]
        ]);

        const sampleTypography = new Map([
            ['mission-title', { fontFamily: 'System', fontSize: 28, fontWeight: 700, lineHeight: 34, letterSpacing: 0 }],
            ['section-header', { fontFamily: 'System', fontSize: 20, fontWeight: 600, lineHeight: 24, letterSpacing: 0 }],
            ['body-text', { fontFamily: 'System', fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0 }],
            ['caption-text', { fontFamily: 'System', fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0.5 }]
        ]);

        const sampleSpacing = new Map([
            ['xs', 4],
            ['sm', 8],
            ['md', 16],
            ['lg', 24],
            ['xl', 32]
        ]);

        const tokens = {
            colors: sampleColors,
            typography: sampleTypography,
            spacing: sampleSpacing,
            shadows: new Map(),
            borders: new Map()
        };

        await this.generateSwiftUITokens(tokens);
        console.log('✅ Sample design tokens generated!');
    }

    generateMainTokensFile() {
        return `import SwiftUI

/// Design Tokens - Auto-generated from Figma
/// Central access point for all design system tokens
/// Last updated: ${new Date().toISOString()}

struct DesignTokens {
    
    // MARK: - Token Categories
    
    struct Colors {
        // All colors are available as Color extensions
        // Example: Color.assassinRed, Color.tacticalBlue
    }
    
    struct Typography {
        // All fonts are available as Font extensions
        // Example: Font.missionTitle, Font.sectionHeader
    }
    
    struct Spacing {
        // All spacing values are available as CGFloat extensions
        // Example: CGFloat.spacingM, CGFloat.cardPadding
    }
    
    // MARK: - Token Validation
    
    static func validateTokens() -> Bool {
        // Add validation logic here
        return true
    }
    
    // MARK: - Token Documentation
    
    static let documentation = """
    Design Tokens Documentation
    
    Colors:
    - assassinRed: Primary action color for mission-critical buttons
    - tacticalBlue: Secondary action color for supporting actions
    - electricGreen: Success state color for completed missions
    - deepNavy: Background color for main content areas
    
    Typography:
    - missionTitle: Large title for mission headers
    - sectionHeader: Section headers for tactical information
    - missionBody: Body text for mission details
    - statusCaption: Caption text for status indicators
    
    Spacing:
    - spacingXS (4pt): Minimal spacing for tight layouts
    - spacingS (8pt): Small spacing for related elements
    - spacingM (16pt): Medium spacing for standard layouts
    - spacingL (24pt): Large spacing for section separation
    - spacingXL (32pt): Extra large spacing for major sections
    """
}

// MARK: - Token Preview

struct DesignTokensPreview: View {
    var body: some View {
        NavigationView {
            List {
                Section("Colors") {
                    ColorTokenRow(name: "Assassin Red", color: .assassinRed)
                    ColorTokenRow(name: "Tactical Blue", color: .tacticalBlue)
                    ColorTokenRow(name: "Electric Green", color: .electricGreen)
                    ColorTokenRow(name: "Deep Navy", color: .deepNavy)
                }
                
                Section("Typography") {
                    TypographyTokenRow(name: "Mission Title", font: .missionTitle)
                    TypographyTokenRow(name: "Section Header", font: .sectionHeader)
                    TypographyTokenRow(name: "Mission Body", font: .missionBody)
                    TypographyTokenRow(name: "Status Caption", font: .statusCaption)
                }
                
                Section("Spacing") {
                    SpacingTokenRow(name: "XS", value: .spacingXS)
                    SpacingTokenRow(name: "S", value: .spacingS)
                    SpacingTokenRow(name: "M", value: .spacingM)
                    SpacingTokenRow(name: "L", value: .spacingL)
                    SpacingTokenRow(name: "XL", value: .spacingXL)
                }
            }
            .navigationTitle("Design Tokens")
        }
    }
}

struct ColorTokenRow: View {
    let name: String
    let color: Color
    
    var body: some View {
        HStack {
            Circle()
                .fill(color)
                .frame(width: 24, height: 24)
            
            Text(name)
                .font(.body)
            
            Spacer()
            
            Text(color.hexString)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

struct TypographyTokenRow: View {
    let name: String
    let font: Font
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(name)
                .font(.caption)
                .foregroundColor(.secondary)
            
            Text("The quick brown fox")
                .font(font)
        }
    }
}

struct SpacingTokenRow: View {
    let name: String
    let value: CGFloat
    
    var body: some View {
        HStack {
            Text(name)
                .font(.body)
            
            Spacer()
            
            Rectangle()
                .fill(Color.tacticalBlue)
                .frame(width: value, height: 16)
            
            Text("\\(Int(value))pt")
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

// MARK: - Preview

struct DesignTokens_Previews: PreviewProvider {
    static var previews: some View {
        DesignTokensPreview()
            .previewDisplayName("Design Tokens")
    }
}`;
    }

    startWatching() {
        if (this.isWatching) return;
        
        console.log('👀 Starting file watcher...');
        
        // Watch for changes in the output directory
        const watcher = chokidar.watch(this.outputDir, {
            ignored: /node_modules/,
            persistent: true
        });

        watcher.on('change', (path) => {
            console.log(`📁 File changed: ${path}`);
        });

        this.isWatching = true;
    }

    generateColorName(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    generateFontName(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    camelCase(str) {
        return str
            .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
            .replace(/^[A-Z]/, (g) => g.toLowerCase());
    }

    ensureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    writeFile(filename, content) {
        const fullPath = path.join(this.outputDir, filename);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`📝 Generated: ${filename}`);
    }
}

// CLI execution
if (require.main === module) {
    const sync = new DesignTokenSync();
    sync.startSync().catch(console.error);
}

module.exports = DesignTokenSync;