# Assassin Game Design System

Welcome to the **Assassin Game Design System** - a native Swift component library built specifically for the ultimate campus gaming experience.

## 🎯 What is this?

This design system provides everything you need to build the Assassin Game mobile app with a consistent, tactical aesthetic that makes players feel like real secret agents.

## 🎨 Design Philosophy

### Tactical Aesthetic
- **Dark theme** with neon accents for that spy-thriller feel
- **Military-inspired** visual language and terminology
- **Cinematic** animations and dramatic feedback

### Native Performance
- Built specifically for **iOS with SwiftUI**
- Optimized for **real-time location tracking**
- **Battery-efficient** for 8+ hours of gameplay

### Game-First Design
- Components designed for **target tracking** and elimination
- **Safety-first** visual hierarchy for emergency functions
- **Social gaming** features for leaderboards and player interaction

## 🧩 Core Components

### TacticalButton
Cinematic buttons with haptic feedback and multiple tactical styles.

### MissionBriefingCard
Classified document-style cards for target assignments and mission details.

### Design Tokens
Comprehensive color, typography, and spacing system based on the tactical aesthetic.

## 🚀 Getting Started

1. **Add to your project** via Swift Package Manager
2. **Import the design system** in your SwiftUI views
3. **Use components** with consistent styling
4. **Follow the guidelines** for best practices

## 📱 Example Usage

```swift
import AssassinGameDesignSystem

struct GameView: View {
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.lg) {
            TacticalButton(
                title: "ELIMINATE TARGET",
                style: .primary,
                icon: "target"
            ) {
                // Handle elimination
            }
            
            MissionBriefingCard(mission: currentMission) {
                // Accept mission
            }
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
```

## 🎮 Built for the Game

This isn't just another design system - it's specifically crafted for the Assassin Game experience:

- **Mission-focused UI** that makes every interaction feel important
- **Real-time updates** optimized for live gameplay
- **Tactical terminology** that immerses players in the spy world
- **Safety features** that prioritize player wellbeing

---

Ready to build the most thrilling campus game ever? Let's get started! 🎯 