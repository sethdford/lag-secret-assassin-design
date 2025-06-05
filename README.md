# LAG Secret Assassin - Design System

A comprehensive design system for the LAG Secret Assassin mobile game, including design tokens, documentation, and interactive React Native Storybook components.

## 📁 Repository Structure

```
lag-secret-assassin-design/
├── docs/                      # Design system documentation
│   ├── design-system.md       # Complete design system guide
│   ├── storybook-guide.md     # Storybook implementation guide
│   ├── figma-colors-extracted.swift
│   ├── ui-kit-implementation.md
│   └── variables/             # Figma design tokens (JSON)
├── example/                   # Interactive Storybook demo
│   ├── .rnstorybook/         # React Native Storybook
│   ├── App.js                # Demo app entry point
│   └── README.md             # Example app documentation
└── .taskmaster/              # Project management
    ├── docs/                 # Project requirements
    └── tasks/                # Development tasks
```

## 🎨 Design System

This design system includes:

### **Design Tokens**
- **Colors**: 50+ colors including primary/secondary scales, status colors, dark theme
- **Typography**: Comprehensive font sizes and weights
- **Spacing**: 4px-based consistent spacing system

### **Components**
- **Buttons**: 5 variants (Primary, Secondary, Danger, Success, Ghost)
- **Cards**: Basic and game-specific variants
- **Game Elements**: Player status, elimination reports, game management

### **Game-Specific Features**
- **Player Status**: Visual indicators for alive/dead/spectator states
- **Elimination Tracking**: Styled components for game events
- **Safe Zones**: Success-styled components for safe areas
- **Emergency Actions**: High-priority danger-styled elements

## 🚀 Quick Start

### View the Interactive Storybook

1. **Install dependencies:**
   ```bash
   npm run example:install
   ```

2. **Start the Storybook:**
   ```bash
   npm run example
   ```

3. **Open in browser:**
   Go to `http://localhost:19006` or scan the QR code with Expo Go

### Available Commands

- `npm run example` - Start the Storybook demo
- `npm run example:install` - Install example dependencies
- `npm run example:ios` - Open in iOS simulator
- `npm run example:android` - Open in Android emulator
- `npm run example:web` - Open in web browser

## 📱 Interactive Demo

The example Storybook allows you to:
- **Browse Components**: See all design system components
- **Test Variants**: Try different states and configurations
- **View Design Tokens**: Explore colors, typography, and spacing
- **Game Context**: See components in assassin game scenarios

## 🎮 Game-Specific Design

### Color Semantics
- **Primary Green (#0CC25F)**: Safe zones, positive actions
- **Danger Red (#F75555)**: Eliminations, dangerous areas
- **Warning Yellow (#FACC15)**: Cautions, pending states
- **Success Green (#12D18E)**: Successful actions, confirmations

### Component Variants
- **Player Cards**: Dynamically styled based on player status
- **Action Buttons**: Context-aware styling for game actions
- **Status Indicators**: Visual feedback for game states

## 📖 Documentation

- **[Complete Design System](docs/design-system.md)** - Full design system specification
- **[Storybook Guide](docs/storybook-guide.md)** - Implementation and usage guide
- **[UI Kit Implementation](docs/ui-kit-implementation.md)** - Detailed component guide
- **[Example README](example/README.md)** - Interactive demo documentation

## 🔄 Development Workflow

1. **Design in Figma** → Define tokens and component states
2. **Extract Tokens** → Update design tokens in code
3. **Build Components** → Create React Native components
4. **Test in Storybook** → Interactive component testing
5. **Implement in App** → Use components in actual screens

## 🎯 Key Features

- ✅ **Figma Integration**: Direct extraction from design files
- ✅ **React Native Ready**: Mobile-first component library
- ✅ **Interactive Testing**: Live Storybook demo
- ✅ **Game Context**: Assassin game-specific components
- ✅ **Design Tokens**: Consistent styling system
- ✅ **Documentation**: Comprehensive guides and examples

## 🔗 Links

- **Repository**: [GitHub](https://github.com/sethdford/lag-secret-assassin-design)
- **Interactive Demo**: Run `npm run example` to start
- **Design Documentation**: [docs/design-system.md](docs/design-system.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes to design tokens or components
4. Test in the example Storybook
5. Update documentation
6. Submit a pull request

---

**Built with ❤️ for the LAG Secret Assassin Game** 