import SwiftUI

/// Design System Colors - Auto-generated from Figma
/// Last updated: 2025-06-07T18:29:45.716Z
extension Color {
    
    // MARK: - Tactical Color Palette
    
    /// assassin-red - RGB(220, 38, 38)
    static let assassinRed = Color(
        red: 0.863,
        green: 0.149,
        blue: 0.149,
        opacity: 1.000
    )

    /// tactical-blue - RGB(37, 99, 235)
    static let tacticalBlue = Color(
        red: 0.145,
        green: 0.388,
        blue: 0.922,
        opacity: 1.000
    )

    /// electric-green - RGB(34, 197, 94)
    static let electricGreen = Color(
        red: 0.133,
        green: 0.773,
        blue: 0.369,
        opacity: 1.000
    )

    /// deep-navy - RGB(15, 23, 42)
    static let deepNavy = Color(
        red: 0.059,
        green: 0.090,
        blue: 0.165,
        opacity: 1.000
    )

    /// stealth-gray - RGB(75, 85, 99)
    static let stealthGray = Color(
        red: 0.294,
        green: 0.333,
        blue: 0.388,
        opacity: 1.000
    )
    
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
    
    /// assassin-red - RGB(220, 38, 38)
    static let assassinRed = UIColor(
        red: 0.863,
        green: 0.149,
        blue: 0.149,
        alpha: 1.000
    )

    /// tactical-blue - RGB(37, 99, 235)
    static let tacticalBlue = UIColor(
        red: 0.145,
        green: 0.388,
        blue: 0.922,
        alpha: 1.000
    )

    /// electric-green - RGB(34, 197, 94)
    static let electricGreen = UIColor(
        red: 0.133,
        green: 0.773,
        blue: 0.369,
        alpha: 1.000
    )

    /// deep-navy - RGB(15, 23, 42)
    static let deepNavy = UIColor(
        red: 0.059,
        green: 0.090,
        blue: 0.165,
        alpha: 1.000
    )

    /// stealth-gray - RGB(75, 85, 99)
    static let stealthGray = UIColor(
        red: 0.294,
        green: 0.333,
        blue: 0.388,
        alpha: 1.000
    )
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
}