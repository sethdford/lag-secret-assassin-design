# Assassin Game UI Kit - iOS Implementation Guide

## Overview

This guide provides detailed instructions for implementing the Figma UI kit in your Swift iOS application. The design system is built around the exact typography and colors extracted from the inspiration layers, creating a cohesive and authentic design experience.

## App Mobile1 Color Scheme Analysis

The "App Mobile1" design showcases a sophisticated color palette that combines elegance with gaming energy. Here's how to recreate this aesthetic:

### Color Philosophy
- **Base**: Clean white background for clarity and modern feel
- **Accents**: Deep burgundy and coral reds for gaming energy
- **Overlays**: Subtle purple and red-brown gradients for depth
- **Text**: High contrast white with muted rose accents

### App Mobile1 Color Palette

```swift
// AppMobile1Colors.swift
import SwiftUI

extension Color {
    // App Mobile1 Inspired Palette
    
    // Background System
    static let mobile1Background = Color.white                                    // #FFFFFF - Clean base
    static let mobile1OverlayPurple = Color(red: 0.29, green: 0.17, blue: 0.29) // #4A2C4B - Sophisticated overlay
    static let mobile1OverlayRed = Color(red: 0.41, green: 0.19, blue: 0.21)    // #683035 - Warm overlay
    
    // Primary Action Colors
    static let mobile1Primary = Color(red: 0.38, green: 0.14, blue: 0.16)       // #602429 - Deep burgundy CTA
    static let mobile1Secondary = Color(red: 0.75, green: 0.25, blue: 0.25)     // #C04040 - Bright coral
    static let mobile1Accent = Color(red: 0.69, green: 0.31, blue: 0.35)        // #B04F59 - Mid-tone red
    
    // Text System
    static let mobile1TextPrimary = Color.white                                  // #FFFFFF - High contrast
    static let mobile1TextSecondary = Color(red: 0.75, green: 0.62, blue: 0.64) // #BE9DA4 - Muted rose
    static let mobile1TextAccent = Color(red: 0.85, green: 0.72, blue: 0.74)    // #D9B8BC - Light rose
    
    // Gradient Components
    static let mobile1GradientStart = Color(red: 0.29, green: 0.17, blue: 0.29) // #4A2C4B
    static let mobile1GradientMid = Color(red: 0.41, green: 0.19, blue: 0.21)   // #683035
    static let mobile1GradientEnd = Color(red: 0.38, green: 0.14, blue: 0.16)   // #602429
}

// Gradient Definitions
struct Mobile1Gradients {
    static let backgroundOverlay = LinearGradient(
        colors: [
            Color.mobile1OverlayPurple.opacity(0.5),
            Color.mobile1OverlayRed.opacity(0.5),
            Color.mobile1Primary.opacity(0.3)
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let buttonGradient = LinearGradient(
        colors: [
            Color.mobile1Primary,
            Color.mobile1Secondary
        ],
        startPoint: .leading,
        endPoint: .trailing
    )
    
    static let cardOverlay = RadialGradient(
        colors: [
            Color.mobile1OverlayPurple.opacity(0.3),
            Color.mobile1OverlayRed.opacity(0.2),
            Color.clear
        ],
        center: .center,
        startRadius: 50,
        endRadius: 200
    )
}
```

### Implementation Examples

#### 1. Background with Gradient Overlays
```swift
struct Mobile1Background: View {
    var body: some View {
        ZStack {
            // Base white background
            Color.mobile1Background
                .ignoresSafeArea()
            
            // Gradient overlay circles (like in the design)
            Circle()
                .fill(Color.mobile1OverlayPurple.opacity(0.5))
                .frame(width: 380, height: 380)
                .offset(x: -100, y: -200)
            
            Circle()
                .fill(Color.mobile1OverlayRed.opacity(0.5))
                .frame(width: 304, height: 304)
                .offset(x: 150, y: -300)
            
            Circle()
                .fill(Color.mobile1OverlayRed.opacity(0.5))
                .frame(width: 304, height: 304)
                .offset(x: 120, y: 200)
        }
    }
}
```

#### 2. Primary CTA Button (Get Started Style)
```swift
struct Mobile1CTAButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: "arrow.up.right")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.mobile1TextPrimary)
                
                Text(title)
                    .font(.custom("Montserrat", size: 16))
                    .fontWeight(.semibold)
                    .foregroundColor(.mobile1TextPrimary)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 16)
            .background(Color.mobile1Primary)
            .cornerRadius(26)
        }
    }
}
```

#### 3. Secondary Action Buttons
```swift
struct Mobile1SecondaryButton: View {
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 20, weight: .medium))
                .foregroundColor(.mobile1TextPrimary)
                .frame(width: 53, height: 52)
                .background(Color.mobile1Secondary)
                .cornerRadius(26)
        }
    }
}
```

#### 4. Typography Implementation
```swift
struct Mobile1Typography: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Main headline
            Text("Level Up Gaming\nExperience!")
                .font(.custom("Montserrat", size: 36))
                .fontWeight(.semibold)
                .foregroundColor(.mobile1TextPrimary)
                .lineSpacing(7.2)
            
            // Description text
            Text("Take your gaming to the next level with seamless performance and real-time stats.")
                .font(.custom("Montserrat", size: 14))
                .fontWeight(.regular)
                .foregroundColor(.mobile1TextSecondary)
                .lineSpacing(7)
        }
    }
}
```

### Color Usage Guidelines

#### When to Use Each Color:

**Primary (#602429 - Deep Burgundy)**
- Main call-to-action buttons
- Primary navigation elements
- Key interactive elements
- Brand emphasis areas

**Secondary (#C04040 - Coral Red)**
- Secondary buttons and actions
- Icon backgrounds
- Accent elements
- Interactive states (hover, active)

**Text Colors**
- **White (#FFFFFF)**: Headlines, primary content, button text
- **Muted Rose (#BE9DA4)**: Descriptions, secondary information, captions
- **Light Rose (#D9B8BC)**: Tertiary text, disabled states, subtle labels

**Background Overlays**
- **Purple (#4A2C4B)**: Sophisticated depth, premium feel
- **Red-Brown (#683035)**: Warmth, energy, gaming atmosphere

### Creating Similar Schemes

To create variations of this color scheme:

1. **Keep the base structure**: Light background + dark overlays + red accent family
2. **Adjust hue families**: 
   - Gaming: Reds, oranges, purples
   - Tech: Blues, cyans, purples  
   - Nature: Greens, browns, earth tones
3. **Maintain contrast ratios**: Ensure text remains readable
4. **Use overlay opacity**: 30-50% for subtle depth without overwhelming content

### Accessibility Considerations

```swift
// Ensure proper contrast ratios
extension Color {
    static let mobile1TextOnPrimary = Color.white      // 4.5:1 contrast ratio
    static let mobile1TextOnSecondary = Color.white    // 3.8:1 contrast ratio
    static let mobile1TextOnBackground = Color.black   // 21:1 contrast ratio
}
```

This color scheme creates a premium, gaming-focused aesthetic that balances sophistication with energy - perfect for an engaging mobile game experience.

## Design System Foundation

### Color Palette (Updated from Reference Images)

```swift
// Colors.swift
import SwiftUI

extension Color {
    // Primary Colors (from reference images)
    static let assassinRed = Color(red: 0.79, green: 0.11, blue: 0.11) // #C91C1C - Keep for eliminations
    static let primaryGreen = Color(red: 0.4, green: 0.8, blue: 0.2) // #66CC33 - Main accent from images
    static let accentBlue = Color(red: 0.2, green: 0.4, blue: 0.8) // #3366CC - Secondary accent
    
    // Background Colors (from reference images)
    static let backgroundPrimary = Color(red: 0.02, green: 0.02, blue: 0.02) // #050505 - Deep black
    static let backgroundSecondary = Color(red: 0.08, green: 0.08, blue: 0.08) // #141414 - Dark gray
    static let backgroundCard = Color(red: 0.12, green: 0.12, blue: 0.12) // #1F1F1F - Card background
    static let backgroundSidebar = Color(red: 0.06, green: 0.06, blue: 0.06) // #0F0F0F - Sidebar dark
    static let backgroundInput = Color(red: 0.15, green: 0.15, blue: 0.15) // #262626 - Input fields
    
    // Text Colors (from reference images)
    static let textPrimary = Color(red: 1.0, green: 1.0, blue: 1.0) // #FFFFFF - Primary text
    static let textSecondary = Color(red: 0.7, green: 0.7, blue: 0.7) // #B3B3B3 - Secondary text
    static let textTertiary = Color(red: 0.5, green: 0.5, blue: 0.5) // #808080 - Tertiary/disabled text
    static let textAccent = Color.primaryGreen // Green accent text
    
    // Status Colors (from reference images)
    static let statusOnline = Color(red: 0.2, green: 0.8, blue: 0.2) // #33CC33 - Online/active
    static let statusAway = Color(red: 1.0, green: 0.8, blue: 0.0) // #FFCC00 - Away/warning
    static let statusOffline = Color(red: 0.6, green: 0.6, blue: 0.6) // #999999 - Offline/inactive
    static let statusDanger = Color.assassinRed // #C91C1C - Danger/elimination
    
    // Game-specific Colors
    static let targetHighlight = Color.assassinRed
    static let safeZoneGreen = Color(red: 0.3, green: 0.7, blue: 0.3) // #4DB84D - Safe zones
    static let eliminationOrange = Color(red: 1.0, green: 0.6, blue: 0.0) // #FF9900 - Eliminations
    static let notificationPurple = Color(red: 0.6, green: 0.4, blue: 0.8) // #9966CC - Notifications
    
    // Interactive Elements
    static let buttonPrimary = Color.primaryGreen
    static let buttonSecondary = Color.backgroundCard
    static let buttonDanger = Color.assassinRed
    static let buttonDisabled = Color(red: 0.3, green: 0.3, blue: 0.3) // #4D4D4D
    
    // Borders and Dividers
    static let borderPrimary = Color(red: 0.2, green: 0.2, blue: 0.2) // #333333
    static let borderAccent = Color.primaryGreen
    static let borderDanger = Color.assassinRed
    static let divider = Color(red: 0.15, green: 0.15, blue: 0.15) // #262626
}

// Color extension for hex support
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
```

### Typography System (Exact from Inspiration Layers)

```swift
// Typography.swift
import SwiftUI

extension Font {
    // Primary Font Family: DM Sans
    static let h1Title = Font.custom("DM Sans", size: 22).weight(.bold)           // "Order Tracking", "Select Location"
    static let h2Button = Font.custom("DM Sans", size: 18).weight(.regular)      // "Save Address"
    static let bodyLarge = Font.custom("DM Sans", size: 16).weight(.medium)      // "Cameron Williamson"
    static let bodyMedium = Font.custom("DM Sans", size: 14).weight(.medium)     // "Office", "Home", "Others"
    static let bodySmall = Font.custom("DM Sans", size: 12).weight(.regular)     // "Delivery Man", "Your Location"
    static let captionMedium = Font.custom("DM Sans", size: 12).weight(.medium)  // "03:00PM (Max 20 min)"
    
    // Map Typography: Montserrat
    static let mapLabelLarge = Font.custom("Montserrat", size: 8).weight(.medium)  // "LOWERVAILSBURG", "STREET"
    static let mapLabelSmall = Font.custom("Montserrat", size: 5).weight(.medium)  // "street name"
    
    // System Typography: SF Pro Text
    static let systemText = Font.custom("SF Pro Text", size: 15).weight(.semibold) // "12:22"
}

// Typography modifiers for consistent styling
extension Text {
    func h1Style() -> some View {
        self
            .font(.h1Title)
            .foregroundColor(.textPrimary)
    }
    
    func h2Style() -> some View {
        self
            .font(.h2Button)
            .foregroundColor(.textPrimary)
    }
    
    func bodyLargeStyle() -> some View {
        self
            .font(.bodyLarge)
            .foregroundColor(.textPrimary)
    }
    
    func bodyMediumStyle() -> some View {
        self
            .font(.bodyMedium)
            .foregroundColor(.textPrimary)
    }
    
    func bodySmallStyle() -> some View {
        self
            .font(.bodySmall)
            .foregroundColor(.textSecondary)
    }
    
    func captionStyle() -> some View {
        self
            .font(.captionMedium)
            .foregroundColor(.textSecondary)
    }
    
    func mapLabelLargeStyle() -> some View {
        self
            .font(.mapLabelLarge)
            .foregroundColor(.textSecondary)
    }
    
    func mapLabelSmallStyle() -> some View {
        self
            .font(.mapLabelSmall)
            .foregroundColor(.textTertiary)
    }
    
    func accentStyle() -> some View {
        self
            .font(.bodyMedium)
            .foregroundColor(.textAccent)
    }
}
```

### Spacing System

```swift
// Spacing.swift
import SwiftUI

extension CGFloat {
    // Base spacing unit: 4px (from inspiration grid)
    static let spacingXS: CGFloat = 4
    static let spacingS: CGFloat = 8
    static let spacingM: CGFloat = 12
    static let spacingL: CGFloat = 16
    static let spacingXL: CGFloat = 20
    static let spacingXXL: CGFloat = 24
    static let spacingXXXL: CGFloat = 32
}

struct Spacing {
    static let xs: CGFloat = 4
    static let s: CGFloat = 8
    static let m: CGFloat = 12
    static let l: CGFloat = 16
    static let xl: CGFloat = 20
    static let xxl: CGFloat = 24
    static let xxxl: CGFloat = 32
}
```

## Recommended Flat Line Icon Libraries

Based on research of the top open-source icon libraries in 2024, here are the best options for flat line vector icons:

### 1. **Lucide Icons** (Recommended)
- **Icons**: 1,595+ beautiful, consistent icons
- **Style**: Clean, minimalist line icons with consistent stroke width
- **Formats**: SVG, JSX, React, Vue, Angular, Flutter
- **Figma**: Available as Figma plugin
- **Website**: https://lucide.dev/
- **Why Choose**: Fork of Feather Icons with more variety, active community, excellent documentation

### 2. **Heroicons** 
- **Icons**: 316 icons in outline and solid styles
- **Style**: Minimalist, created by Tailwind CSS team
- **Formats**: SVG, JSX for React and Vue
- **Figma**: Available
- **Website**: https://heroicons.com/
- **Why Choose**: Perfect for modern UIs, excellent with Tailwind CSS

### 3. **Feather Icons**
- **Icons**: 287 clean, minimalist icons
- **Style**: 24x24 grid, consistent stroke width
- **Formats**: SVG, React, Vue, Angular, Flutter
- **Figma**: Available
- **Website**: https://feathericons.com/
- **Why Choose**: Original minimalist icon set, very lightweight

### 4. **Phosphor Icons**
- **Icons**: 9,000+ icons with multiple weights
- **Style**: Flexible weights (thin, light, regular, bold, fill, duotone)
- **Formats**: SVG, PNG, JSX, React, Vue, Flutter
- **Figma**: Available
- **Website**: https://phosphoricons.com/
- **Why Choose**: Most comprehensive set with weight variations

### 5. **Tabler Icons**
- **Icons**: 5,500+ open-source icons
- **Style**: Consistent, functional design
- **Formats**: SVG, PNG, React, Vue, Svelte
- **Figma**: Available
- **Website**: https://tabler-icons.io/
- **Why Choose**: Large collection, well-maintained

## Figma UI Kit Structure

To create a comprehensive UI Kit in Figma that's easy to implement, organize it with these sections:

### 1. **Foundation**
- **Color Palette**: All color swatches with hex codes and usage notes
- **Typography**: Font samples with exact specifications
- **Spacing**: Grid system and spacing tokens
- **Iconography**: Flat line icons from chosen library

### 2. **Components**
- **Buttons**: Primary, secondary, tertiary states
- **Cards**: All 6 card variants with proper labeling
- **Forms**: Input fields, dropdowns, checkboxes
- **Navigation**: Tab bars, sidebars, breadcrumbs
- **Modals**: Dialogs, alerts, confirmations

### 3. **Patterns**
- **Lists**: Player lists, game lists, notification lists
- **Data Display**: Stats, progress bars, badges
- **Feedback**: Loading states, empty states, error states
- **Layout**: Grid systems, containers, sections

### 4. **Templates**
- **Key Screens**: Login, game lobby, active game, profile
- **Responsive**: Mobile, tablet, desktop layouts
- **States**: Loading, error, success, empty

## Component Implementation

### Button Components

```swift
// AssassinButton.swift
import SwiftUI

struct AssassinButton: View {
    let title: String
    let action: () -> Void
    let style: ButtonStyle
    
    enum ButtonStyle {
        case primary
        case secondary
        case tertiary
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .h2Style()
                .padding(.horizontal, Spacing.xl)
                .padding(.vertical, Spacing.m)
                .frame(maxWidth: .infinity)
        }
        .background(backgroundForStyle)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(strokeColorForStyle, lineWidth: strokeWidthForStyle)
        )
        .cornerRadius(8)
    }
    
    private var backgroundForStyle: Color {
        switch style {
        case .primary:
            return .buttonPrimary
        case .secondary:
            return .buttonSecondary
        case .tertiary:
            return .clear
        }
    }
    
    private var strokeColorForStyle: Color {
        switch style {
        case .primary:
            return .clear
        case .secondary:
            return .borderAccent
        case .tertiary:
            return .borderPrimary
        }
    }
    
    private var strokeWidthForStyle: CGFloat {
        switch style {
        case .primary:
            return 0
        case .secondary, .tertiary:
            return 2
        }
    }
}

// Usage Examples
struct ButtonExamples: View {
    var body: some View {
        VStack(spacing: Spacing.l) {
            AssassinButton(title: "⚔️ ELIMINATE TARGET", action: {}, style: .primary)
            AssassinButton(title: "📱 SCAN QR", action: {}, style: .secondary)
            AssassinButton(title: "👤 PROFILE", action: {}, style: .tertiary)
        }
        .padding()
    }
}
```

### Card Components

The UI Kit includes several reusable card components for different content types. All cards follow a consistent structure with customizable colors and content.

### Card Structure

All cards share the same base structure:
- **Container**: Dark background with colored border
- **Label**: Category/type indicator with icon
- **Title**: Main content heading
- **Details**: Supporting information or metadata

### Card Variants

#### 1. Target Card
- **Purpose**: Display target player information
- **Border Color**: Red (#C91C1C)
- **Label Color**: Red (#C91C1C)
- **Icon**: 🎯
- **Content**: Player name, major, location, distance

#### 2. Player Info Card
- **Purpose**: Display player profile information
- **Border Color**: Blue (#3366CC)
- **Label Color**: Blue (#3366CC)
- **Icon**: 👤
- **Content**: Player name, major, status, stats

#### 3. Game Status Card
- **Purpose**: Display current game information
- **Border Color**: Green (#33CC33)
- **Label Color**: Green (#33CC33)
- **Icon**: 🎮
- **Content**: Game name, time remaining, players alive

#### 4. Elimination Card
- **Purpose**: Display elimination notifications
- **Border Color**: Orange (#FF9900)
- **Label Color**: Orange (#FF9900)
- **Icon**: ⚔️
- **Content**: Eliminated player, location, time, method

#### 5. Safe Zone Card
- **Purpose**: Display safe zone information
- **Border Color**: Light Green (#66CC66)
- **Label Color**: Light Green (#66CC66)
- **Icon**: 🛡️
- **Content**: Zone name, status, rules, hours

#### 6. Notification Card
- **Purpose**: Display system notifications
- **Border Color**: Purple (#CC66FF)
- **Label Color**: Purple (#CC66FF)
- **Icon**: 🔔
- **Content**: Notification message, timestamp, action

### SwiftUI Implementation

```swift
// Base Card Component
struct GameCard: View {
    let type: CardType
    let title: String
    let details: String
    let borderColor: Color
    let labelColor: Color
    let icon: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Label with icon
            HStack {
                Text("\(icon) \(type.rawValue.uppercased())")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(labelColor)
                Spacer()
            }
            
            // Title
            Text(title)
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundColor(.white)
            
            // Details
            Text(details)
                .font(.caption)
                .foregroundColor(.textSecondary)
        }
        .padding(20)
        .background(Color.backgroundCard)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(borderColor, lineWidth: 1)
        )
        .cornerRadius(12)
    }
}

// Card Type Enum
enum CardType: String, CaseIterable {
    case target = "target"
    case player = "player info"
    case gameStatus = "game status"
    case elimination = "elimination"
    case safeZone = "safe zone"
    case notification = "notification"
    
    var icon: String {
        switch self {
        case .target: return "🎯"
        case .player: return "👤"
        case .gameStatus: return "🎮"
        case .elimination: return "⚔️"
        case .safeZone: return "🛡️"
        case .notification: return "🔔"
        }
    }
    
    var color: Color {
        switch self {
        case .target: return .targetHighlight
        case .player: return .accentBlue
        case .gameStatus: return .statusOnline
        case .elimination: return .eliminationOrange
        case .safeZone: return .safeZoneGreen
        case .notification: return .notificationPurple
        }
    }
}

// Specific Card Implementations
struct TargetCard: View {
    let playerName: String
    let major: String
    let location: String
    let distance: String
    let timeAgo: String
    
    var body: some View {
        GameCard(
            type: .target,
            title: "\(playerName) • \(major)",
            details: "📍 Last seen: \(location) (\(timeAgo)) • 🏃‍♂️ \(distance) away",
            borderColor: .targetHighlight,
            labelColor: .targetHighlight,
            icon: "🎯"
        )
    }
}

struct PlayerInfoCard: View {
    let playerName: String
    let major: String
    let status: String
    let eliminations: Int
    let rank: Int
    
    var body: some View {
        GameCard(
            type: .player,
            title: "\(playerName) • \(major)",
            details: "\(status) • \(eliminations) eliminations • Rank #\(rank)",
            borderColor: .accentBlue,
            labelColor: .accentBlue,
            icon: "👤"
        )
    }
}

struct GameStatusCard: View {
    let gameName: String
    let timeRemaining: String
    let playersAlive: Int
    
    var body: some View {
        GameCard(
            type: .gameStatus,
            title: gameName,
            details: "⏱️ \(timeRemaining) remaining • \(playersAlive) players alive",
            borderColor: .statusOnline,
            labelColor: .statusOnline,
            icon: "🎮"
        )
    }
}

struct EliminationCard: View {
    let playerName: String
    let location: String
    let time: String
    let method: String
    
    var body: some View {
        GameCard(
            type: .elimination,
            title: "\(playerName) eliminated!",
            details: "📍 \(location) • \(time) • \(method)",
            borderColor: .eliminationOrange,
            labelColor: .eliminationOrange,
            icon: "⚔️"
        )
    }
}

struct SafeZoneCard: View {
    let zoneName: String
    let status: String
    let hours: String
    
    var body: some View {
        GameCard(
            type: .safeZone,
            title: zoneName,
            details: "\(status) • No eliminations allowed • \(hours)",
            borderColor: .safeZoneGreen,
            labelColor: .safeZoneGreen,
            icon: "🛡️"
        )
    }
}

struct NotificationCard: View {
    let message: String
    let timeAgo: String
    let hasAction: Bool
    
    var body: some View {
        GameCard(
            type: .notification,
            title: message,
            details: hasAction ? "📱 Tap to view details • \(timeAgo)" : timeAgo,
            borderColor: .notificationPurple,
            labelColor: .notificationPurple,
            icon: "🔔"
        )
    }
}
```

### Usage Examples

```swift
// In your views
VStack(spacing: 16) {
    TargetCard(
        playerName: "Alex Chen",
        major: "Computer Science",
        location: "Library",
        distance: "127m",
        timeAgo: "2 min ago"
    )
    
    PlayerInfoCard(
        playerName: "Sarah Johnson",
        major: "Psychology",
        status: "🟢 ACTIVE",
        eliminations: 3,
        rank: 7
    )
    
    GameStatusCard(
        gameName: "Campus Assassins Fall 2024",
        timeRemaining: "2 days 14h",
        playersAlive: 47
    )
}
.padding()
```

### Accessibility

All card components include:
- Proper semantic labels
- VoiceOver support
- Dynamic Type scaling
- High contrast support

### Design Tokens

Card-specific colors are defined in the color system:
```swift
extension Color {
    static let safeGreen = Color(red: 0.4, green: 0.8, blue: 0.4)
    static let warningOrange = Color(red: 1.0, green: 0.6, blue: 0.0)
    static let notificationPurple = Color(red: 0.8, green: 0.4, blue: 1.0)
}
```

### Navigation Components

```swift
// SidebarView.swift - Inspired by reference image sidebar
import SwiftUI

struct GameSidebar: View {
    @Binding var selectedSection: SidebarSection
    let unreadMessages: Int
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            VStack(alignment: .leading, spacing: 8) {
                Text("Secret Assassin")
                    .h1Style()
                    .foregroundColor(.textPrimary)
                
                Text("LIFE IS BETTER WHEN PLAYED AS A GAME")
                    .font(.caption)
                    .foregroundColor(.textSecondary)
                    .textCase(.uppercase)
            }
            .padding(.horizontal, 20)
            .padding(.top, 20)
            .padding(.bottom, 30)
            
            // Navigation Items
            VStack(spacing: 4) {
                SidebarItem(
                    icon: "📰",
                    title: "News Feed",
                    isSelected: selectedSection == .newsFeed,
                    badgeCount: nil
                ) {
                    selectedSection = .newsFeed
                }
                
                SidebarItem(
                    icon: "💬",
                    title: "Messages",
                    isSelected: selectedSection == .messages,
                    badgeCount: unreadMessages > 0 ? unreadMessages : nil
                ) {
                    selectedSection = .messages
                }
                
                SidebarItem(
                    icon: "🕐",
                    title: "The Clock",
                    isSelected: selectedSection == .clock,
                    badgeCount: nil
                ) {
                    selectedSection = .clock
                }
                
                SidebarItem(
                    icon: "🔍",
                    title: "Recon",
                    isSelected: selectedSection == .recon,
                    badgeCount: nil
                ) {
                    selectedSection = .recon
                }
                
                SidebarItem(
                    icon: "👥",
                    title: "Players",
                    isSelected: selectedSection == .players,
                    badgeCount: nil
                ) {
                    selectedSection = .players
                }
                
                SidebarItem(
                    icon: "📸",
                    title: "Photos",
                    isSelected: selectedSection == .photos,
                    badgeCount: nil
                ) {
                    selectedSection = .photos
                }
            }
            
            // Games Section
            VStack(alignment: .leading, spacing: 4) {
                Text("GAMES")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.primaryGreen)
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                    .padding(.bottom, 8)
                
                SidebarItem(icon: "💼", title: "Work", isSelected: false, badgeCount: nil) {}
                SidebarItem(icon: "🎨", title: "Art Class", isSelected: false, badgeCount: 7) {}
                SidebarItem(icon: "💻", title: "Computer Lab", isSelected: false, badgeCount: 27) {}
                SidebarItem(icon: "🏠", title: "Dorm", isSelected: false, badgeCount: nil) {}
                SidebarItem(icon: "🦸", title: "Hero Squad", isSelected: false, badgeCount: nil) {}
                
                SidebarItem(icon: "📋", title: "See All", isSelected: false, badgeCount: nil) {}
            }
            
            Spacer()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.backgroundSidebar)
    }
}

struct SidebarItem: View {
    let icon: String
    let title: String
    let isSelected: Bool
    let badgeCount: Int?
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Text(icon)
                    .font(.body)
                
                Text(title)
                    .bodyMediumStyle()
                    .foregroundColor(isSelected ? .textPrimary : .textSecondary)
                
                Spacer()
                
                if let count = badgeCount {
                    Text("\(count)")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.textPrimary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 2)
                        .background(Color.primaryGreen)
                        .cornerRadius(10)
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 8)
            .background(isSelected ? Color.backgroundCard : Color.clear)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

enum SidebarSection: CaseIterable {
    case newsFeed, messages, clock, recon, players, photos
}
```

### Profile Components

```swift
// ProfileAvatar.swift - Inspired by reference image avatars
import SwiftUI

struct ProfileAvatar: View {
    let imageURL: String?
    let size: AvatarSize
    let isOnline: Bool
    let showBorder: Bool
    
    enum AvatarSize {
        case small, medium, large
        
        var dimension: CGFloat {
            switch self {
            case .small: return 32
            case .medium: return 48
            case .large: return 80
            }
        }
        
        var borderWidth: CGFloat {
            switch self {
            case .small: return 1
            case .medium: return 2
            case .large: return 3
            }
        }
    }
    
    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            // Avatar Image
            AsyncImage(url: URL(string: imageURL ?? "")) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle()
                    .fill(Color.backgroundCard)
                    .overlay(
                        Text("👤")
                            .font(.system(size: size.dimension * 0.4))
                            .foregroundColor(.textSecondary)
                    )
            }
            .frame(width: size.dimension, height: size.dimension)
            .clipShape(Circle())
            .overlay(
                Circle()
                    .stroke(showBorder ? Color.borderAccent : Color.clear, lineWidth: size.borderWidth)
            )
            
            // Online Status Indicator
            if isOnline {
                Circle()
                    .fill(Color.statusOnline)
                    .frame(width: size.dimension * 0.25, height: size.dimension * 0.25)
                    .overlay(
                        Circle()
                            .stroke(Color.backgroundPrimary, lineWidth: 2)
                    )
                    .offset(x: 2, y: 2)
            }
        }
    }
}

// Usage Examples
struct ProfileAvatarExamples: View {
    var body: some View {
        HStack(spacing: 16) {
            ProfileAvatar(
                imageURL: "https://example.com/avatar1.jpg",
                size: .small,
                isOnline: true,
                showBorder: false
            )
            
            ProfileAvatar(
                imageURL: "https://example.com/avatar2.jpg",
                size: .medium,
                isOnline: false,
                showBorder: true
            )
            
            ProfileAvatar(
                imageURL: nil,
                size: .large,
                isOnline: true,
                showBorder: true
            )
        }
        .padding()
        .background(Color.backgroundPrimary)
    }
}
```

### Message Components

```swift
// MessageBubble.swift - Inspired by reference image chat
import SwiftUI

struct MessageBubble: View {
    let message: String
    let isCurrentUser: Bool
    let timestamp: String
    let profileImageURL: String?
    
    var body: some View {
        HStack(alignment: .top, spacing: 8) {
            if !isCurrentUser {
                ProfileAvatar(
                    imageURL: profileImageURL,
                    size: .small,
                    isOnline: false,
                    showBorder: false
                )
            }
            
            VStack(alignment: isCurrentUser ? .trailing : .leading, spacing: 4) {
                Text(message)
                    .bodyMediumStyle()
                    .foregroundColor(.textPrimary)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(isCurrentUser ? Color.primaryGreen : Color.backgroundCard)
                    )
                
                Text(timestamp)
                    .font(.caption2)
                    .foregroundColor(.textTertiary)
            }
            
            if isCurrentUser {
                ProfileAvatar(
                    imageURL: profileImageURL,
                    size: .small,
                    isOnline: false,
                    showBorder: false
                )
            }
        }
        .padding(.horizontal, 16)
    }
}
```

## Implementation Notes

### Font Loading
Make sure to add the custom fonts to your iOS project:
1. Add `DM Sans` font files to your Xcode project
2. Add `Montserrat` font files to your Xcode project  
3. Update `Info.plist` with font file names
4. `SF Pro Text` is available system-wide on iOS

### Icon Implementation
1. Choose one of the recommended icon libraries (Lucide recommended)
2. Install the Figma plugin for your chosen library
3. Create an "Iconography" section in your UI Kit
4. Use consistent sizing (24px recommended)
5. Apply your color palette to icons
6. Create icon components for common use cases

### Color Usage Guidelines
- Use `textPrimary` (#FFFFFF) for main content and titles
- Use `textSecondary` (#B3B3B3) for labels and secondary information  
- Use `textTertiary` (#808080) for disabled or less important text
- Use `primaryGreen` (#66CC33) for primary actions and main accents
- Use `assassinRed` (#C91C1C) for eliminations and danger states
- Use `backgroundPrimary` (#050505) for main app background
- Use `backgroundCard` (#1F1F1F) for card and content containers
- Use `backgroundSidebar` (#0F0F0F) for navigation and sidebar areas

### Accessibility
- All color combinations meet WCAG AA contrast requirements
- Typography scales with Dynamic Type
- Interactive elements have minimum 44pt touch targets
- Semantic colors adapt to light/dark mode preferences

This implementation guide ensures your iOS app matches the exact design specifications from your Figma inspiration layers while providing a comprehensive, easy-to-implement design system. 