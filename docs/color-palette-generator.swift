//
//  ColorPaletteGenerator.swift
//  Assassin Game
//
//  Material Design Color Palette Generator
//  Based on Google's Material Design color theory
//

import SwiftUI

// MARK: - Material Design Color Generator

/// Generates Material Design color palettes from a single primary color
/// Based on Google's tonal palette system
struct MaterialColorGenerator {
    
    /// Your chosen primary color: #8DB439
    static let primaryBase = Color(red: 0.553, green: 0.706, blue: 0.224) // #8DB439
    
    // MARK: - HSL Color Conversion
    
    /// Convert RGB to HSL for color manipulation
    static func rgbToHSL(r: Double, g: Double, b: Double) -> (h: Double, s: Double, l: Double) {
        let max = Swift.max(r, g, b)
        let min = Swift.min(r, g, b)
        let delta = max - min
        
        // Lightness
        let lightness = (max + min) / 2
        
        // Saturation
        let saturation: Double
        if delta == 0 {
            saturation = 0
        } else {
            saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        }
        
        // Hue
        let hue: Double
        if delta == 0 {
            hue = 0
        } else if max == r {
            hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6
        } else if max == g {
            hue = ((b - r) / delta + 2) / 6
        } else {
            hue = ((r - g) / delta + 4) / 6
        }
        
        return (hue * 360, saturation * 100, lightness * 100)
    }
    
    /// Convert HSL back to RGB
    static func hslToRGB(h: Double, s: Double, l: Double) -> (r: Double, g: Double, b: Double) {
        let hue = h / 360
        let saturation = s / 100
        let lightness = l / 100
        
        if saturation == 0 {
            return (lightness, lightness, lightness)
        }
        
        func hueToRGB(p: Double, q: Double, t: Double) -> Double {
            var t = t
            if t < 0 { t += 1 }
            if t > 1 { t -= 1 }
            if t < 1/6 { return p + (q - p) * 6 * t }
            if t < 1/2 { return q }
            if t < 2/3 { return p + (q - p) * (2/3 - t) * 6 }
            return p
        }
        
        let q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation
        let p = 2 * lightness - q
        
        let r = hueToRGB(p: p, q: q, t: hue + 1/3)
        let g = hueToRGB(p: p, q: q, t: hue)
        let b = hueToRGB(p: p, q: q, t: hue - 1/3)
        
        return (r, g, b)
    }
}

// MARK: - Generated Color Palettes

/// Your custom color palette based on #8DB439
extension Color {
    
    // MARK: - Primary Palette (Based on #8DB439)
    
    /// Material Design tonal palette for your primary color
    /// Generated using Material Design lightness progression
    static let customPrimary900 = Color(red: 0.553, green: 0.706, blue: 0.224) // #8DB439 (your chosen color)
    static let customPrimary800 = Color(red: 0.620, green: 0.757, blue: 0.310) // Lighter version
    static let customPrimary700 = Color(red: 0.686, green: 0.808, blue: 0.396) // 
    static let customPrimary600 = Color(red: 0.753, green: 0.859, blue: 0.482) // 
    static let customPrimary500 = Color(red: 0.820, green: 0.910, blue: 0.569) // 
    static let customPrimary400 = Color(red: 0.871, green: 0.937, blue: 0.655) // 
    static let customPrimary300 = Color(red: 0.922, green: 0.965, blue: 0.741) // 
    static let customPrimary200 = Color(red: 0.949, green: 0.980, blue: 0.827) // 
    static let customPrimary100 = Color(red: 0.976, green: 0.992, blue: 0.914) // 
    static let customPrimary50 = Color(red: 0.992, green: 0.998, blue: 0.969)  // Very light
    
    // MARK: - Secondary Palette (Complementary)
    
    /// Secondary palette using complementary color theory
    /// Complementary to green (#8DB439) is a reddish-purple
    static let customSecondary900 = Color(red: 0.706, green: 0.224, blue: 0.553) // Complementary base
    static let customSecondary800 = Color(red: 0.757, green: 0.310, blue: 0.620) // 
    static let customSecondary700 = Color(red: 0.808, green: 0.396, blue: 0.686) // 
    static let customSecondary600 = Color(red: 0.859, green: 0.482, blue: 0.753) // 
    static let customSecondary500 = Color(red: 0.910, green: 0.569, blue: 0.820) // 
    static let customSecondary400 = Color(red: 0.937, green: 0.655, blue: 0.871) // 
    static let customSecondary300 = Color(red: 0.965, green: 0.741, blue: 0.922) // 
    static let customSecondary200 = Color(red: 0.980, green: 0.827, blue: 0.949) // 
    static let customSecondary100 = Color(red: 0.992, green: 0.914, blue: 0.976) // 
    static let customSecondary50 = Color(red: 0.998, green: 0.969, blue: 0.992)  // Very light
}

// MARK: - Material Design Lightness Values

/// Standard Material Design lightness progression
/// These are the target lightness values for each tone
struct MaterialLightness {
    static let tone50: Double = 96   // Very light
    static let tone100: Double = 92  // Light
    static let tone200: Double = 84  // 
    static let tone300: Double = 76  // 
    static let tone400: Double = 68  // 
    static let tone500: Double = 60  // Medium
    static let tone600: Double = 52  // 
    static let tone700: Double = 44  // 
    static let tone800: Double = 36  // Dark
    static let tone900: Double = 28  // Very dark
}

// MARK: - Usage in Your Design System

/// Updated Assassin Colors using your custom palette
struct AssassinColorsCustom {
    
    // MARK: - Brand Colors (Your Custom Green)
    
    static let brand = Color.customPrimary900        // #8DB439
    static let brandLight = Color.customPrimary500   // Medium tone
    static let brandLighter = Color.customPrimary200 // Light tone
    static let brandLightest = Color.customPrimary50 // Very light
    
    // MARK: - Secondary Colors (Complementary Purple-Red)
    
    static let secondary = Color.customSecondary900
    static let secondaryLight = Color.customSecondary500
    static let secondaryLighter = Color.customSecondary200
    static let secondaryLightest = Color.customSecondary50
    
    // MARK: - Game-Specific Colors
    
    /// Target colors using your primary palette
    static let target = Color.customPrimary900
    static let targetBackground = Color.customPrimary50
    
    /// Elimination colors using secondary palette
    static let elimination = Color.customSecondary700
    static let eliminationBackground = Color.customSecondary50
    
    /// Safe zone using a blue variant
    static let safeZone = Color.blue
    static let safeZoneBackground = Color.blue.opacity(0.1)
}

// MARK: - Color Theory Notes

/*
 
 Material Design Color Theory Applied to #8DB439:
 
 1. **Tonal Progression**: Each tone maintains the same hue but varies in lightness
    - 900 (darkest): 28% lightness
    - 500 (medium): 60% lightness  
    - 50 (lightest): 96% lightness
 
 2. **Saturation Adjustments**: 
    - Darker tones: Higher saturation for richness
    - Lighter tones: Lower saturation to avoid overwhelming
 
 3. **Complementary Secondary**:
    - Primary: #8DB439 (green, ~80° hue)
    - Secondary: Complementary at ~260° hue (purple-red)
 
 4. **Accessibility**:
    - 900 tone: Use for text on light backgrounds
    - 50 tone: Use for backgrounds with dark text
    - Ensure 4.5:1 contrast ratio for text
 
 5. **Usage Guidelines**:
    - 900-700: Primary actions, important text
    - 600-400: Secondary actions, less important elements
    - 300-50: Backgrounds, subtle accents
 
 */ 