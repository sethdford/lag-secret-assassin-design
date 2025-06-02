//
//  DesignVariables.swift
//  Assassin Game
//
//  Auto-generated from Figma Design Variables
//  Channel: js645w84
//

import SwiftUI

// MARK: - Design System Variables

/// Comprehensive design system variables exported from Figma
/// This file contains all design tokens for consistent styling across the app
struct DesignVariables {
    
    // MARK: - Spacing System
    
    /// Gap and Padding values for consistent spacing
    struct Spacing {
        // Positive spacing values
        static let none: CGFloat = 0
        static let xs: CGFloat = 2
        static let sm: CGFloat = 4
        static let md: CGFloat = 8
        static let lg: CGFloat = 12
        static let xl: CGFloat = 16
        static let xxl: CGFloat = 20
        static let xxxl: CGFloat = 24
        
        // Extended spacing scale
        static let spacing6: CGFloat = 6
        static let spacing10: CGFloat = 10
        static let spacing14: CGFloat = 14
        static let spacing18: CGFloat = 18
        static let spacing22: CGFloat = 22
        static let spacing28: CGFloat = 28
        static let spacing32: CGFloat = 32
        static let spacing36: CGFloat = 36
        static let spacing40: CGFloat = 40
        static let spacing44: CGFloat = 44
        static let spacing48: CGFloat = 48
        static let spacing56: CGFloat = 56
        static let spacing64: CGFloat = 64
        static let spacing72: CGFloat = 72
        static let spacing80: CGFloat = 80
        static let spacing88: CGFloat = 88
        static let spacing96: CGFloat = 96
        static let spacing104: CGFloat = 104
        static let spacing112: CGFloat = 112
        static let spacing120: CGFloat = 120
        static let spacing128: CGFloat = 128
        static let spacing136: CGFloat = 136
        static let spacing144: CGFloat = 144
        static let spacing152: CGFloat = 152
        static let spacing160: CGFloat = 160
        static let spacing180: CGFloat = 180
        static let spacing200: CGFloat = 200
        static let spacing220: CGFloat = 220
        static let spacing240: CGFloat = 240
        static let spacing260: CGFloat = 260
        static let spacing280: CGFloat = 280
        static let spacing300: CGFloat = 300
        
        // Negative spacing (for overlaps and adjustments)
        static let negativeXs: CGFloat = -2
        static let negativeSm: CGFloat = -4
        static let negativeMd: CGFloat = -8
        static let negativeLg: CGFloat = -12
        static let negativeXl: CGFloat = -16
        static let negativeXxl: CGFloat = -20
        static let negativeXxxl: CGFloat = -24
    }
    
    // MARK: - Corner Radius System
    
    /// Corner radius values for consistent rounded corners
    struct CornerRadius {
        
        // Modern style (smooth, rounded)
        struct Modern {
            static let none: CGFloat = 0
            static let xs: CGFloat = 2
            static let sm: CGFloat = 4
            static let md: CGFloat = 6
            static let lg: CGFloat = 8
            static let xl: CGFloat = 10
            static let xxl: CGFloat = 12
            static let xxxl: CGFloat = 16
            
            // Extended radius scale
            static let radius14: CGFloat = 14
            static let radius18: CGFloat = 18
            static let radius20: CGFloat = 20
            static let radius22: CGFloat = 22
            static let radius24: CGFloat = 24
            static let radius28: CGFloat = 28
            static let radius32: CGFloat = 32
            static let radius36: CGFloat = 36
            static let radius40: CGFloat = 40
            static let radius44: CGFloat = 44
            static let radius48: CGFloat = 48
            static let radius56: CGFloat = 56
            static let radius64: CGFloat = 64
            static let radius72: CGFloat = 72
            static let radius80: CGFloat = 80
            static let radius88: CGFloat = 88
            static let radius96: CGFloat = 96
            
            // Large radius values
            static let radius104: CGFloat = 104
            static let radius112: CGFloat = 112
            static let radius120: CGFloat = 120
            static let radius128: CGFloat = 128
            static let radius136: CGFloat = 136
            static let radius144: CGFloat = 144
            static let radius152: CGFloat = 152
            static let radius160: CGFloat = 160
            static let radius180: CGFloat = 180
            static let radius200: CGFloat = 200
            static let radius220: CGFloat = 220
            static let radius240: CGFloat = 240
            static let radius260: CGFloat = 260
            static let radius280: CGFloat = 280
            static let radius300: CGFloat = 300
            static let radius500: CGFloat = 500
            static let radius1000: CGFloat = 1000
            
            // Special radius values
            static let round: CGFloat = 1000  // For circular elements
            static let line: CGFloat = 1000   // For pill-shaped elements
            
            // Button-specific radius
            static let buttonSmall: CGFloat = 8
            static let buttonMedium: CGFloat = 10
            static let buttonLarge: CGFloat = 12
            static let buttonXLarge: CGFloat = 14
        }
        
        // Neobrutalism style (sharp, minimal)
        struct Neobrutalism {
            static let none: CGFloat = 0
            static let minimal: CGFloat = 1
            static let small: CGFloat = 2
            static let round: CGFloat = 1000  // Still circular when needed
            static let line: CGFloat = 0      // Sharp lines
            
            // Button-specific radius (minimal)
            static let buttonSmall: CGFloat = 1
            static let buttonMedium: CGFloat = 1
            static let buttonLarge: CGFloat = 1
            static let buttonXLarge: CGFloat = 1
        }
    }
    
    // MARK: - Color System
    
    /// Color palette from Figma variables
    struct Colors {
        // Note: Colors will be populated from the Colors.json file
        // This is a placeholder structure - actual colors should be extracted
        // from the Colors.json file and converted to SwiftUI Color values
        
        // Primary colors
        static let primary = Color.red  // Placeholder
        static let secondary = Color.blue  // Placeholder
        static let accent = Color.green  // Placeholder
        
        // Background colors
        static let background = Color.white  // Placeholder
        static let surface = Color.gray  // Placeholder
        
        // Text colors
        static let textPrimary = Color.black  // Placeholder
        static let textSecondary = Color.gray  // Placeholder
        
        // Status colors
        static let success = Color.green  // Placeholder
        static let warning = Color.orange  // Placeholder
        static let error = Color.red  // Placeholder
        static let info = Color.blue  // Placeholder
    }
    
    // MARK: - Typography System
    
    /// Typography scale and font definitions
    struct Typography {
        // Font families
        static let primaryFont = "SF Pro Display"  // iOS system font
        static let secondaryFont = "SF Pro Text"   // iOS system font
        
        // Font sizes (will be populated from Language.json)
        static let caption: CGFloat = 12
        static let body: CGFloat = 16
        static let title3: CGFloat = 20
        static let title2: CGFloat = 22
        static let title1: CGFloat = 28
        static let largeTitle: CGFloat = 34
        
        // Font weights
        static let light = Font.Weight.light
        static let regular = Font.Weight.regular
        static let medium = Font.Weight.medium
        static let semibold = Font.Weight.semibold
        static let bold = Font.Weight.bold
        static let heavy = Font.Weight.heavy
    }
    
    // MARK: - Effects System
    
    /// Shadow and effect definitions
    struct Effects {
        // Shadow presets (will be populated from Effects.json)
        static let shadowSmall = 2.0
        static let shadowMedium = 4.0
        static let shadowLarge = 8.0
        static let shadowXLarge = 16.0
    }
    
    // MARK: - Layout System
    
    /// Layout and sizing constraints
    struct Layout {
        // Common widths and heights (from Width and Height.json)
        static let buttonHeight: CGFloat = 44
        static let inputHeight: CGFloat = 48
        static let cardMinHeight: CGFloat = 120
        
        // Screen breakpoints
        static let mobileMaxWidth: CGFloat = 428
        static let tabletMinWidth: CGFloat = 768
        
        // Grid system
        static let gridColumns = 12
        static let gridGutter: CGFloat = 16
        static let gridMargin: CGFloat = 20
    }
    
    // MARK: - Animation System
    
    /// Animation timing and easing
    struct Animation {
        static let fast = 0.2
        static let normal = 0.3
        static let slow = 0.5
        
        static let easeInOut = SwiftUI.Animation.easeInOut
        static let spring = SwiftUI.Animation.spring()
        static let bouncy = SwiftUI.Animation.bouncy
    }
}

// MARK: - SwiftUI Extensions

extension View {
    /// Apply design system corner radius
    func cornerRadius(_ radius: CGFloat) -> some View {
        self.clipShape(RoundedRectangle(cornerRadius: radius))
    }
    
    /// Apply modern corner radius
    func modernCornerRadius(_ size: ModernCornerRadiusSize = .medium) -> some View {
        switch size {
        case .small:
            return self.cornerRadius(DesignVariables.CornerRadius.Modern.sm)
        case .medium:
            return self.cornerRadius(DesignVariables.CornerRadius.Modern.lg)
        case .large:
            return self.cornerRadius(DesignVariables.CornerRadius.Modern.xl)
        case .extraLarge:
            return self.cornerRadius(DesignVariables.CornerRadius.Modern.xxl)
        }
    }
    
    /// Apply neobrutalism corner radius
    func neobrutalismCornerRadius() -> some View {
        self.cornerRadius(DesignVariables.CornerRadius.Neobrutalism.minimal)
    }
}

enum ModernCornerRadiusSize {
    case small, medium, large, extraLarge
}

// MARK: - Usage Examples

/*
 
 Example usage in SwiftUI views:
 
 // Spacing
 VStack(spacing: DesignVariables.Spacing.md) {
     // Content
 }
 .padding(DesignVariables.Spacing.lg)
 
 // Corner radius
 Rectangle()
     .fill(Color.blue)
     .modernCornerRadius(.large)
 
 Button("Action") {
     // Action
 }
 .cornerRadius(DesignVariables.CornerRadius.Modern.buttonLarge)
 
 // Typography
 Text("Title")
     .font(.system(size: DesignVariables.Typography.title1, weight: DesignVariables.Typography.bold))
 
 */ 