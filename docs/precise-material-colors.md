# Material Design Color Palette for #8DB439

## Your Base Color Analysis

**Primary Color**: `#8DB439`
- **RGB**: (141, 180, 57)
- **HSL**: (79°, 52%, 46%)
- **Description**: A vibrant yellow-green, perfect for a game about stealth and nature

## Material Design Tonal Palette

### Primary Palette (Based on #8DB439)

Using Material Design's lightness progression:

| Tone | Lightness | Hex Code | RGB | Usage |
|------|-----------|----------|-----|-------|
| **50** | 96% | `#F7FBF0` | (247, 251, 240) | Very light backgrounds |
| **100** | 92% | `#EDF6DC` | (237, 246, 220) | Light backgrounds |
| **200** | 84% | `#DAEDB8` | (218, 237, 184) | Subtle accents |
| **300** | 76% | `#C6E394` | (198, 227, 148) | Disabled states |
| **400** | 68% | `#B2DA70` | (178, 218, 112) | Secondary actions |
| **500** | 60% | `#9ED04C` | (158, 208, 76) | Medium emphasis |
| **600** | 52% | `#8AC628` | (138, 198, 40) | Primary actions |
| **700** | 44% | `#76BC04` | (118, 188, 4) | Strong emphasis |
| **800** | 36% | `#62A200` | (98, 162, 0) | High emphasis |
| **900** | 28% | `#8DB439` | (141, 180, 57) | **Your chosen color** |

### Secondary Palette (Complementary)

**Complementary Color**: Purple-Red (~259° hue)
Based on color wheel theory, complementary to your green:

| Tone | Lightness | Hex Code | RGB | Usage |
|------|-----------|----------|-----|-------|
| **50** | 96% | `#FBF0F7` | (251, 240, 247) | Very light backgrounds |
| **100** | 92% | `#F6DCED` | (246, 220, 237) | Light backgrounds |
| **200** | 84% | `#EDB8DA` | (237, 184, 218) | Subtle accents |
| **300** | 76% | `#E394C6` | (227, 148, 198) | Disabled states |
| **400** | 68% | `#DA70B2` | (218, 112, 178) | Secondary actions |
| **500** | 60% | `#D04C9E` | (208, 76, 158) | Medium emphasis |
| **600** | 52% | `#C6288A` | (198, 40, 138) | Primary actions |
| **700** | 44% | `#BC0476` | (188, 4, 118) | Strong emphasis |
| **800** | 36% | `#A20062` | (162, 0, 98) | High emphasis |
| **900** | 28% | `#88004E` | (136, 0, 78) | Darkest tone |

## Swift Implementation

```swift
extension Color {
    // Primary Palette (#8DB439 base)
    static let gameGreen900 = Color(red: 0.553, green: 0.706, blue: 0.224) // #8DB439
    static let gameGreen800 = Color(red: 0.384, green: 0.635, blue: 0.000) // #62A200
    static let gameGreen700 = Color(red: 0.463, green: 0.737, blue: 0.016) // #76BC04
    static let gameGreen600 = Color(red: 0.541, green: 0.776, blue: 0.157) // #8AC628
    static let gameGreen500 = Color(red: 0.620, green: 0.816, blue: 0.298) // #9ED04C
    static let gameGreen400 = Color(red: 0.698, green: 0.855, blue: 0.439) // #B2DA70
    static let gameGreen300 = Color(red: 0.776, green: 0.890, blue: 0.580) // #C6E394
    static let gameGreen200 = Color(red: 0.855, green: 0.929, blue: 0.722) // #DAEDB8
    static let gameGreen100 = Color(red: 0.929, green: 0.965, blue: 0.863) // #EDF6DC
    static let gameGreen50 = Color(red: 0.969, green: 0.984, blue: 0.941)  // #F7FBF0
    
    // Secondary Palette (Complementary Purple-Red)
    static let gamePurple900 = Color(red: 0.533, green: 0.000, blue: 0.306) // #88004E
    static let gamePurple800 = Color(red: 0.635, green: 0.000, blue: 0.384) // #A20062
    static let gamePurple700 = Color(red: 0.737, green: 0.016, blue: 0.463) // #BC0476
    static let gamePurple600 = Color(red: 0.776, green: 0.157, blue: 0.541) // #C6288A
    static let gamePurple500 = Color(red: 0.816, green: 0.298, blue: 0.620) // #D04C9E
    static let gamePurple400 = Color(red: 0.855, green: 0.439, blue: 0.698) // #DA70B2
    static let gamePurple300 = Color(red: 0.890, green: 0.580, blue: 0.776) // #E394C6
    static let gamePurple200 = Color(red: 0.929, green: 0.722, blue: 0.855) // #EDB8DA
    static let gamePurple100 = Color(red: 0.965, green: 0.863, blue: 0.929) // #F6DCED
    static let gamePurple50 = Color(red: 0.984, green: 0.941, blue: 0.969)  // #FBF0F7
}
```

## Usage Guidelines

### Primary Green (#8DB439 family)
- **900-800**: Main brand color, primary buttons, important text
- **700-600**: Secondary actions, active states
- **500-400**: Hover states, less important actions  
- **300-200**: Subtle backgrounds, disabled states
- **100-50**: Very light backgrounds, surface colors

### Secondary Purple-Red (Complementary)
- **900-700**: Error states, elimination actions, warnings
- **600-400**: Secondary brand elements, accents
- **300-50**: Background tints, subtle highlights

### Accessibility Notes
- **Text on light backgrounds**: Use 700-900 tones
- **Text on dark backgrounds**: Use 50-300 tones
- **Minimum contrast ratio**: 4.5:1 for normal text, 3:1 for large text
- **Color blindness**: These complementary colors work well for most types of color vision

## Game-Specific Applications

```swift
struct AssassinGameColors {
    // Primary actions (hunting, active gameplay)
    static let hunt = Color.gameGreen900
    static let huntBackground = Color.gameGreen50
    
    // Elimination/danger actions
    static let eliminate = Color.gamePurple700
    static let eliminateBackground = Color.gamePurple50
    
    // Success states
    static let success = Color.gameGreen600
    static let successBackground = Color.gameGreen100
    
    // Warning/caution
    static let warning = Color.gamePurple500
    static let warningBackground = Color.gamePurple100
}
```

This palette maintains the tactical, nature-inspired feel of your chosen green while providing a full range of tones for comprehensive UI design! 🎯 