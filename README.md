# Assassin Game Design System

An advanced automated Swift design system with **live Figma channel integration**. This design system provides real-time bidirectional Figma-to-code automation, instant design token sync, and intelligent SwiftUI component generation from live Figma selections. Perfect for ride-sharing apps, tactical gaming interfaces, and modern mobile applications.

## 🚀 **Live Figma Channel Integration** ⚡

**Revolutionary real-time design-to-code workflow** using live Figma channels:

### 🎯 **Live Channel vs REST API**
| Feature | REST API | **Live Channel** |
|---------|----------|------------------|
| Updates | Manual polling | ✅ **Real-time** |
| Direction | Read-only | ✅ **Bidirectional** |
| Performance | Rate-limited | ✅ **Event-driven** |
| Selection Sync | Manual | ✅ **Automatic** |

### 🔧 **Quick Start**
```bash
# 🚀 Start live development mode
npm run dev:live

# 🧩 Generate SwiftUI from current Figma selection
npm run components:live-generate

# 🎨 Sync design tokens in real-time
npm run figma:live-sync
```

### 🚀 **Enhanced Automation Features**
- **🎨 Live Figma Integration**: Real-time sync with Figma channel `kqzej2sr`
- **🤖 AI-Powered Component Generation**: Generate SwiftUI components from live Figma selections
- **📸 Visual Regression Testing**: Ensure designs match implementation pixel-perfectly
- **📚 Auto-Generated Documentation**: Comprehensive docs with interactive examples
- **🔄 CI/CD Pipeline**: Automated testing, building, and deployment
- **♿ Accessibility First**: Built-in accessibility features and testing

## 🎯 Overview

The Assassin Game Design System delivers:

- **Tactical Aesthetic**: Dark theme with neon accents and military-inspired styling
- **Cinematic Experience**: Dramatic animations and spy-thriller visual language
- **Native Performance**: Built specifically for iOS with SwiftUI
- **Component Library**: Reusable components for rapid development
- **Design Tokens**: Consistent colors, typography, and spacing

## 🚀 Quick Start

### Prerequisites

- Xcode 15.0+
- iOS 16.0+
- Swift 5.9+

### Installation

#### Swift Package Manager

Add this package to your Xcode project:

```
https://github.com/your-org/assassin-game-design-system
```

Or add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/your-org/assassin-game-design-system", from: "1.0.0")
]
```

#### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-org/assassin-game-design-system.git
cd assassin-game-design-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development workflow:
```bash
npm run dev
```

## 🎨 Design Tokens

### Colors

The design system uses a tactical color palette:

- **Assassin Red** (`#C91C1C`) - Primary actions, eliminations, danger
- **Tactical Blue** (`#3366CC`) - Secondary actions, information
- **Electric Green** (`#00FF41`) - Safe zones, success states
- **Deep Navy** (`#0D0D1A`) - Primary background

### Typography

- **Primary**: SF Pro Display (headings, UI elements)
- **Secondary**: SF Pro Text (body text, descriptions)
- **Monospace**: SF Mono (codes, technical data)

### Spacing

Consistent spacing scale: `4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`

## 🧩 Components

### TacticalButton

Cinematic button component with multiple styles and haptic feedback:

```swift
import AssassinGameDesignSystem

TacticalButton(
    title: "ELIMINATE TARGET",
    style: .primary,
    size: .large,
    icon: "target"
) {
    // Handle elimination action
}
```

**Styles:**
- `.primary` - Assassin Red for critical actions
- `.secondary` - Tactical Blue for secondary actions
- `.success` - Electric Green for positive actions
- `.danger` - Red with warning styling
- `.ghost` - Transparent with border

### MissionBriefingCard

Classified document-style card for target assignments:

```swift
let mission = MissionBriefingCard.MissionData(
    targetName: "Alex Chen",
    codename: "SHADOW_WALKER",
    lastKnownLocation: "Engineering Building",
    missionType: .elimination,
    priority: .high,
    timeRemaining: 7200,
    briefingText: "Target is highly skilled...",
    restrictions: ["No elimination during class hours"]
)

MissionBriefingCard(mission: mission) {
    // Handle mission acceptance
}
```

## 📱 Usage in Your App

### Basic Setup

```swift
import SwiftUI
import AssassinGameDesignSystem

struct ContentView: View {
    var body: some View {
        VStack {
            // Your app content using design system components
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}
```

### Using Design Tokens

```swift
Text("Mission Status")
    .font(.system(size: DesignTokens.Typography.lg, weight: .bold))
    .foregroundColor(DesignTokens.Colors.textPrimary)
    .padding(DesignTokens.Spacing.md)
```

## 🔧 Figma-to-Code Automation

### Setup Figma Integration

1. **Configure Figma Access**:
```bash
# Set environment variables
export FIGMA_TOKEN="your_figma_access_token"
export FIGMA_FILE_KEY="your_figma_file_key"

# Or update figma.config.json
```

2. **Export Design Tokens**:
```bash
# Export all design tokens from Figma
npm run figma:export-tokens

# Export specific components
npm run figma:export-components

# Export assets (icons, images)
npm run figma:export-assets
```

3. **Generate Components**:
```bash
# Generate SwiftUI components from Figma designs
npm run generate:components

# Generate comprehensive documentation
npm run generate:docs
```

### Automated Workflow

The design system includes several automation scripts:

- **`scripts/figma-export.js`**: Extracts design tokens, components, and assets from Figma
- **`scripts/component-generator.js`**: AI-powered SwiftUI component generation
- **`scripts/docs-generator.js`**: Auto-generates comprehensive documentation
- **`tests/VisualRegressionTests.swift`**: Ensures visual consistency between Figma and code

### Visual Regression Testing

Ensure your implementations match Figma designs:

```bash
# Run visual regression tests
npm run visual:test

# Record new snapshots (when designs change)
npm run visual:record
```

### Development Workflow

1. **Design in Figma**: Create or update components in your Figma design system
2. **Sync Changes**: Run `npm run figma:export` to pull latest changes
3. **Generate Code**: Use `npm run generate:components` to create SwiftUI components
4. **Test Visually**: Run `npm run visual:test` to ensure pixel-perfect implementation
5. **Document**: Auto-generate docs with `npm run generate:docs`

### CI/CD Integration

The included GitHub Actions workflow automatically:

- Syncs design changes from Figma daily
- Runs visual regression tests on every PR
- Generates and deploys documentation
- Creates releases with proper versioning

## 🛠 Development

### Project Structure

```
src/
├── components/
│   ├── DesignTokens.swift
│   ├── buttons/
│   │   └── TacticalButton.swift
│   ├── cards/
│   │   └── MissionBriefingCard.swift
│   ├── forms/
│   ├── navigation/
│   ├── maps/
│   └── notifications/
docs/
└── variables/
```

### Building Components

1. Create new components in the appropriate `src/components/` subdirectory
2. Follow the established naming conventions and structure
3. Include comprehensive previews and tests
4. Use design tokens for consistency

### Development Commands

```bash
# Start development workflow with real-time sync
npm run dev

# Build all components and documentation
npm run build:all

# Generate Xcode project with storyboards
npm run xcode:generate
```

## 🎮 Game-Specific Features

This design system is specifically tailored for the Assassin Game with:

- **Mission-focused UI**: Components designed for target tracking and elimination
- **Tactical Aesthetics**: Military/spy-inspired visual language
- **Real-time Updates**: Components optimized for live game data
- **Safety Features**: Clear visual hierarchy for emergency functions
- **Social Gaming**: Components for leaderboards and player interaction

## 📖 Documentation

- [Component Library](./docs/components.md)
- [Design Tokens](./docs/tokens.md)
- [Usage Guidelines](./docs/guidelines.md)
- [Contributing](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🎯 Roadmap

- [ ] Additional tactical components (maps, notifications)
- [ ] Animation library for cinematic effects
- [ ] Accessibility enhancements
- [ ] Dark/light theme variants
- [ ] Component testing suite
- [ ] Figma design tokens sync

---

Built with ❤️ for the ultimate campus gaming experience. 