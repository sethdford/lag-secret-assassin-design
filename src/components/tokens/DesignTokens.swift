import SwiftUI

/// Design Tokens - Auto-generated from Figma
/// Central access point for all design system tokens
/// Last updated: 2025-06-07T18:29:45.717Z

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
            
            Text("\(Int(value))pt")
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
}