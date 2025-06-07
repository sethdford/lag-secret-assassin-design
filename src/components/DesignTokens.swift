import SwiftUI

// MARK: - Design Tokens for Assassin Game
// Based on PRD requirements for tactical, cinematic aesthetic

public struct DesignTokens {
    
    // MARK: - Colors
    public struct Colors {
        
        // Primary brand colors
        public static let assassinRed = Color(hex: "C91C1C")
        public static let tacticalBlue = Color(hex: "3366CC")
        public static let electricGreen = Color(hex: "00FF41")
        public static let deepNavy = Color(hex: "0D0D1A")
        
        // Semantic colors
        public static let danger = assassinRed
        public static let success = electricGreen
        public static let warning = Color(hex: "FFB800")
        public static let info = tacticalBlue
        
        // Neutral colors
        public static let white = Color.white
        public static let lightGray = Color(hex: "F5F5F5")
        public static let mediumGray = Color(hex: "8E8E93")
        public static let darkGray = Color(hex: "48484A")
        public static let black = Color.black
        
        // Background colors for dark tactical theme
        public static let backgroundPrimary = deepNavy
        public static let backgroundSecondary = Color(hex: "1A1A2E")
        public static let backgroundTertiary = Color(hex: "16213E")
        
        // Text colors for high contrast
        public static let textPrimary = white
        public static let textSecondary = lightGray
        public static let textTertiary = mediumGray
    }
    
    // MARK: - Typography
    public struct Typography {
        
        // Font families
        public static let primaryFont = "SF Pro Display"
        public static let secondaryFont = "SF Pro Text"
        public static let monospaceFont = "SF Mono"
        
        // Font sizes
        public static let xs: CGFloat = 12
        public static let sm: CGFloat = 14
        public static let base: CGFloat = 16
        public static let lg: CGFloat = 18
        public static let xl: CGFloat = 20
        public static let xxl: CGFloat = 24
        public static let xxxl: CGFloat = 30
        public static let xxxxl: CGFloat = 36
        
        // Font weights
        public static let light = Font.Weight.light
        public static let regular = Font.Weight.regular
        public static let medium = Font.Weight.medium
        public static let semibold = Font.Weight.semibold
        public static let bold = Font.Weight.bold
        public static let heavy = Font.Weight.heavy
    }
    
    // MARK: - Spacing
    public struct Spacing {
        public static let xs: CGFloat = 4
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
        public static let xl: CGFloat = 32
        public static let xxl: CGFloat = 48
        public static let xxxl: CGFloat = 64
    }
    
    // MARK: - Border Radius
    public struct BorderRadius {
        public static let none: CGFloat = 0
        public static let sm: CGFloat = 4
        public static let md: CGFloat = 8
        public static let lg: CGFloat = 12
        public static let xl: CGFloat = 16
        public static let full: CGFloat = 9999
    }
    
    // MARK: - Shadows for tactical depth
    public struct Shadows {
        public static let tactical = Color.black.opacity(0.3)
        public static let glow = electricGreen.opacity(0.5)
        public static let danger = assassinRed.opacity(0.4)
    }
}

// MARK: - Color Extension for Hex Support
extension Color {
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