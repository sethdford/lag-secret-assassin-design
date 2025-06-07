import SwiftUI

/// Design System Typography - Auto-generated from Figma
/// Last updated: 2025-06-07T18:17:15.690Z
extension Font {
    
    // MARK: - Tactical Typography Scale
    
    /// mission-title - System 28pt
    static let missionTitle = Font.custom(
        "System",
        size: 28
    ).weight(.init(700))
    
    /// mission-title with custom size
    static func missionTitle(size: CGFloat) -> Font {
        Font.custom("System", size: size)
            .weight(.init(700))
    }

    /// section-header - System 20pt
    static let sectionHeader = Font.custom(
        "System",
        size: 20
    ).weight(.init(600))
    
    /// section-header with custom size
    static func sectionHeader(size: CGFloat) -> Font {
        Font.custom("System", size: size)
            .weight(.init(600))
    }

    /// body-text - System 16pt
    static let bodyText = Font.custom(
        "System",
        size: 16
    ).weight(.init(400))
    
    /// body-text with custom size
    static func bodyText(size: CGFloat) -> Font {
        Font.custom("System", size: size)
            .weight(.init(400))
    }

    /// caption-text - System 12pt
    static let captionText = Font.custom(
        "System",
        size: 12
    ).weight(.init(500))
    
    /// caption-text with custom size
    static func captionText(size: CGFloat) -> Font {
        Font.custom("System", size: size)
            .weight(.init(500))
    }
    
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
}