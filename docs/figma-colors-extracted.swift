//
//  FigmaColorsExtracted.swift
//  Assassin Game
//
//  Extracted from Figma Colors.json
//  Channel: js645w84
//

import SwiftUI

// MARK: - Figma Color System

/// All colors extracted from Figma design variables
/// These are the exact color values from your design system
extension Color {
    
    // MARK: - Primary Colors
    
    /// Primary color scale (Green-based)
    static let primary900 = Color(red: 0.047, green: 0.761, blue: 0.373) // #0CC25F
    static let primary800 = Color(red: 0.141, green: 0.784, blue: 0.435) // #24C86F
    static let primary700 = Color(red: 0.239, green: 0.808, blue: 0.498) // #3DCE7F
    static let primary600 = Color(red: 0.333, green: 0.831, blue: 0.561) // #55D48F
    static let primary500 = Color(red: 0.427, green: 0.855, blue: 0.624) // #6DDA9F
    static let primary400 = Color(red: 0.525, green: 0.882, blue: 0.686) // #86E1AF
    static let primary300 = Color(red: 0.620, green: 0.906, blue: 0.749) // #9EE7BF
    static let primary200 = Color(red: 0.714, green: 0.929, blue: 0.812) // #B6EDCF
    static let primary100 = Color(red: 0.808, green: 0.953, blue: 0.875) // #CEF3DF
    static let primary50 = Color(red: 0.906, green: 0.976, blue: 0.937) // #E7F9EF
    
    // MARK: - Secondary Colors
    
    /// Secondary color scale (Darker Green)
    static let secondary900 = Color(red: 0.000, green: 0.554, blue: 0.253) // #008D41
    static let secondary800 = Color(red: 0.102, green: 0.596, blue: 0.325) // #1A9853
    static let secondary700 = Color(red: 0.200, green: 0.643, blue: 0.400) // #33A466
    static let secondary600 = Color(red: 0.302, green: 0.686, blue: 0.475) // #4DAF79
    static let secondary500 = Color(red: 0.400, green: 0.733, blue: 0.549) // #66BB8C
    static let secondary400 = Color(red: 0.502, green: 0.776, blue: 0.627) // #80C6A0
    static let secondary300 = Color(red: 0.600, green: 0.820, blue: 0.702) // #99D1B3
    static let secondary200 = Color(red: 0.702, green: 0.867, blue: 0.776) // #B3DDC6
    static let secondary100 = Color(red: 0.800, green: 0.910, blue: 0.851) // #CCE8D9
    static let secondary50 = Color(red: 0.902, green: 0.957, blue: 0.925) // #E6F4EC
    
    // MARK: - Alert & Status Colors
    
    static let alertSuccess = Color(red: 0.071, green: 0.820, blue: 0.557) // #12D18E
    static let alertInfo = Color(red: 0.137, green: 0.365, blue: 1.000) // #235DFF
    static let alertInfoPrimary = Color(red: 0.047, green: 0.761, blue: 0.373) // #0CC25F
    static let alertWarning = Color(red: 0.980, green: 0.800, blue: 0.082) // #FACC15
    static let alertError = Color(red: 0.969, green: 0.333, blue: 0.333) // #F75555
    static let alertLightDisabled = Color(red: 0.847, green: 0.847, blue: 0.847) // #D8D8D8
    static let alertDarkDisabled = Color(red: 0.137, green: 0.145, blue: 0.169) // #23252B
    static let alertButtonDisabled = Color(red: 0.039, green: 0.608, blue: 0.298) // #0A9B4C
    
    // MARK: - Greyscale Colors
    
    static let grey900 = Color(red: 0.129, green: 0.129, blue: 0.129) // #212121
    static let grey800 = Color(red: 0.259, green: 0.259, blue: 0.259) // #424242
    static let grey700 = Color(red: 0.380, green: 0.380, blue: 0.380) // #616161
    static let grey600 = Color(red: 0.459, green: 0.459, blue: 0.459) // #757575
    static let grey500 = Color(red: 0.620, green: 0.620, blue: 0.620) // #9E9E9E
    static let grey400 = Color(red: 0.741, green: 0.741, blue: 0.741) // #BDBDBD
    static let grey300 = Color(red: 0.878, green: 0.878, blue: 0.878) // #E0E0E0
    static let grey200 = Color(red: 0.933, green: 0.933, blue: 0.933) // #EEEEEE
    static let grey100 = Color(red: 0.961, green: 0.961, blue: 0.961) // #F5F5F5
    static let grey50 = Color(red: 0.980, green: 0.980, blue: 0.980) // #FAFAFA
    
    // MARK: - Black & White
    
    static let white = Color(red: 1.000, green: 1.000, blue: 1.000) // #FFFFFF
    static let black = Color(red: 0.000, green: 0.000, blue: 0.000) // #000000
    
    // MARK: - Material Colors
    
    static let materialRed = Color(red: 0.961, green: 0.263, blue: 0.212) // #F54336
    static let materialPink = Color(red: 0.918, green: 0.118, blue: 0.380) // #EA1E61
    static let materialPurple = Color(red: 0.616, green: 0.157, blue: 0.675) // #9D28AC
    static let materialDeepPurple = Color(red: 0.404, green: 0.227, blue: 0.702) // #673AB7
    static let materialIndigo = Color(red: 0.247, green: 0.318, blue: 0.698) // #3F51B2
    static let materialBlue = Color(red: 0.102, green: 0.588, blue: 0.941) // #1A96F0
    static let materialLightBlue = Color(red: 0.000, green: 0.663, blue: 0.945) // #00A9F1
    static let materialCyan = Color(red: 0.000, green: 0.737, blue: 0.827) // #00BCD3
    static let materialTeal = Color(red: 0.000, green: 0.588, blue: 0.537) // #009688
    static let materialGreen = Color(red: 0.290, green: 0.686, blue: 0.341) // #4AAF57
    static let materialLightGreen = Color(red: 0.545, green: 0.761, blue: 0.333) // #8BC255
    static let materialLime = Color(red: 0.804, green: 0.863, blue: 0.298) // #CDDC4C
    static let materialYellow = Color(red: 1.000, green: 0.922, blue: 0.310) // #FFEB4F
    static let materialAmber = Color(red: 1.000, green: 0.753, blue: 0.176) // #FFC02D
    static let materialOrange = Color(red: 1.000, green: 0.596, blue: 0.122) // #FF981F
    static let materialDeepOrange = Color(red: 1.000, green: 0.341, blue: 0.149) // #FF5726
    static let materialBrown = Color(red: 0.478, green: 0.333, blue: 0.282) // #7A5548
    static let materialBlueGrey = Color(red: 0.376, green: 0.490, blue: 0.541) // #607D8A
    
    // MARK: - Dark Theme Colors
    
    static let dark1 = Color(red: 0.094, green: 0.102, blue: 0.125) // #181A20
    static let dark2 = Color(red: 0.118, green: 0.125, blue: 0.145) // #1E2025
    static let dark3 = Color(red: 0.122, green: 0.133, blue: 0.165) // #1F222A
    static let dark4 = Color(red: 0.149, green: 0.165, blue: 0.208) // #262A35
    static let dark5 = Color(red: 0.208, green: 0.220, blue: 0.247) // #35383F
    
    // MARK: - Background Colors
    
    static let backgroundTeal = Color(red: 0.929, green: 0.969, blue: 0.965) // #EDF7F6
    static let backgroundPurple = Color(red: 0.961, green: 0.953, blue: 1.000) // #F5F3FF
    static let backgroundRed = Color(red: 1.000, green: 0.937, blue: 0.929) // #FFEFED
    static let backgroundBlue = Color(red: 0.929, green: 0.949, blue: 1.000) // #EDF2FF
    static let backgroundGreen = Color(red: 0.922, green: 0.973, blue: 0.953) // #EBF8F3
    static let backgroundBrown = Color(red: 0.973, green: 0.953, blue: 0.945) // #F8F3F1
    static let backgroundYellow = Color(red: 1.000, green: 0.988, blue: 0.922) // #FFFCEB
    static let backgroundOrange = Color(red: 1.000, green: 0.953, blue: 0.941) // #FFF3F0
    static let backgroundGrey = Color(red: 0.965, green: 0.965, blue: 0.965) // #F6F6F6
    static let backgroundPrimary = Color(red: 0.925, green: 0.980, blue: 0.949) // #ECF9F2
    
    // MARK: - Transparent Colors (8% opacity)
    
    static let transparentTeal = Color(red: 0.102, green: 0.600, blue: 0.557).opacity(0.08)
    static let transparentPurple = Color(red: 0.494, green: 0.427, blue: 0.988).opacity(0.08)
    static let transparentRed = Color(red: 0.996, green: 0.200, blue: 0.137).opacity(0.08)
    static let transparentBlue = Color(red: 0.137, green: 0.365, blue: 1.000).opacity(0.08)
    static let transparentGreen = Color(red: 0.000, green: 0.659, blue: 0.420).opacity(0.08)
    static let transparentBrown = Color(red: 0.643, green: 0.388, blue: 0.302).opacity(0.08)
    static let transparentYellow = Color(red: 1.000, green: 0.827, blue: 0.000).opacity(0.08)
    static let transparentOrange = Color(red: 1.000, green: 0.388, blue: 0.278).opacity(0.08)
    static let transparentGrey = Color(red: 0.459, green: 0.459, blue: 0.459).opacity(0.08)
    static let transparentPrimary = Color(red: 0.047, green: 0.761, blue: 0.373).opacity(0.08)
    
    // MARK: - Pastel Colors
    
    static let pastelConditioner = Color(red: 1.000, green: 1.000, blue: 0.800) // #FFFF CC
    static let pastelPeachOrange = Color(red: 1.000, green: 0.800, blue: 0.600) // #FFCC99
    static let pastelLustyGallant = Color(red: 1.000, green: 0.800, blue: 0.800) // #FFCCCC
    static let pastelHimalayanBalsam = Color(red: 1.000, green: 0.600, blue: 0.800) // #FF99CC
    static let pastelSugarChic = Color(red: 1.000, green: 0.800, blue: 1.000) // #FFCCFF
    static let pastelLilas = Color(red: 0.800, green: 0.600, blue: 1.000) // #CC99FF
    static let pastelLavenderBlue = Color(red: 0.800, green: 0.800, blue: 1.000) // #CCCCFF
    static let pastelApocyan = Color(red: 0.600, green: 0.800, blue: 1.000) // #99CCFF
    static let pastelDawnDeparts = Color(red: 0.800, green: 1.000, blue: 1.000) // #CCFFFF
    static let pastelMagicMint = Color(red: 0.600, green: 1.000, blue: 0.800) // #99FFCC
    static let pastelDistilledMoss = Color(red: 0.800, green: 1.000, blue: 0.800) // #CCFFCC
    static let pastelMenthol = Color(red: 0.800, green: 1.000, blue: 0.600) // #CCFF99
    static let pastelTurquoise = Color(red: 0.600, green: 0.773, blue: 0.769) // #99C5C4
    static let pastelPersianPastel = Color(red: 0.667, green: 0.580, blue: 0.600) // #AA9499
    static let pastelPaleMauve = Color(red: 0.776, green: 0.643, blue: 0.643) // #C6A4A4
    static let pastelAmericanPink = Color(red: 1.000, green: 0.596, blue: 0.600) // #FF9899
}

// MARK: - Design System Color Tokens

/// Semantic color tokens for the Assassin Game design system
struct AssassinColors {
    
    // MARK: - Brand Colors
    
    /// Primary brand color (main green)
    static let brand = Color.primary900
    static let brandLight = Color.primary500
    static let brandLighter = Color.primary200
    static let brandLightest = Color.primary50
    
    // MARK: - UI Colors
    
    /// Background colors
    static let backgroundPrimary = Color.white
    static let backgroundSecondary = Color.grey50
    static let backgroundTertiary = Color.grey100
    static let backgroundDark = Color.dark1
    
    /// Text colors
    static let textPrimary = Color.black
    static let textSecondary = Color.grey700
    static let textTertiary = Color.grey500
    static let textInverse = Color.white
    static let textOnBrand = Color.white
    
    /// Border colors
    static let borderPrimary = Color.grey300
    static let borderSecondary = Color.grey200
    static let borderFocus = Color.primary500
    
    /// Interactive colors
    static let interactive = Color.primary600
    static let interactiveHover = Color.primary700
    static let interactivePressed = Color.primary800
    static let interactiveDisabled = Color.alertButtonDisabled
    
    // MARK: - Game-Specific Colors
    
    /// Target and elimination colors
    static let target = Color.materialRed
    static let targetBackground = Color.backgroundRed
    static let elimination = Color.materialDeepOrange
    static let eliminationBackground = Color.backgroundOrange
    
    /// Safe zone colors
    static let safeZone = Color.materialBlue
    static let safeZoneBackground = Color.backgroundBlue
    
    /// Player status colors
    static let playerActive = Color.primary600
    static let playerEliminated = Color.grey500
    static let playerSafe = Color.materialBlue
    
    /// Game status colors
    static let gameActive = Color.primary600
    static let gameEnded = Color.grey500
    static let gameWaiting = Color.materialYellow
    
    // MARK: - Alert Colors
    
    static let success = Color.alertSuccess
    static let successBackground = Color.backgroundGreen
    static let warning = Color.alertWarning
    static let warningBackground = Color.backgroundYellow
    static let error = Color.alertError
    static let errorBackground = Color.backgroundRed
    static let info = Color.alertInfo
    static let infoBackground = Color.backgroundBlue
}

// MARK: - SwiftUI Extensions

extension View {
    /// Apply brand color styling
    func brandColor() -> some View {
        self.foregroundColor(AssassinColors.brand)
    }
    
    /// Apply text color based on hierarchy
    func textColor(_ hierarchy: TextHierarchy = .primary) -> some View {
        switch hierarchy {
        case .primary:
            return self.foregroundColor(AssassinColors.textPrimary)
        case .secondary:
            return self.foregroundColor(AssassinColors.textSecondary)
        case .tertiary:
            return self.foregroundColor(AssassinColors.textTertiary)
        case .inverse:
            return self.foregroundColor(AssassinColors.textInverse)
        }
    }
    
    /// Apply background color
    func backgroundColor(_ color: Color) -> some View {
        self.background(color)
    }
}

enum TextHierarchy {
    case primary, secondary, tertiary, inverse
}

// MARK: - Usage Examples

/*
 
 Example usage in SwiftUI views:
 
 // Brand colors
 Text("Assassin Game")
     .brandColor()
 
 // Text hierarchy
 VStack {
     Text("Primary Text")
         .textColor(.primary)
     Text("Secondary Text")
         .textColor(.secondary)
     Text("Tertiary Text")
         .textColor(.tertiary)
 }
 
 // Game-specific colors
 Button("Eliminate Target") {
     // Action
 }
 .backgroundColor(AssassinColors.target)
 .foregroundColor(AssassinColors.textInverse)
 
 // Status indicators
 Circle()
     .fill(AssassinColors.playerActive)
     .frame(width: 12, height: 12)
 
 */ 