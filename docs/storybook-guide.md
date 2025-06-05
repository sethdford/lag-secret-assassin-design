# Assassin Game Storybook - Design System to Code

## Overview

This React Native Storybook was created directly from your Figma design system and provides a living documentation of all UI components used in the Assassin Game app. It bridges the gap between design and development by showcasing real, interactive components built with your exact design tokens.

## 🎨 What's Been Built

### 1. **Design Tokens** (`DesignTokens.stories.tsx`)
- **Colors**: All color scales from your Figma design (Primary, Secondary, Status, Greyscale, Dark theme)
- **Typography**: Font sizes, weights, and hierarchy 
- **Spacing**: Consistent spacing system based on 4px grid
- **Interactive Showcase**: Visual representation of all tokens

### 2. **Button Component** (`AssassinButton.stories.tsx`)
- **Variants**: Primary, Secondary, Danger, Success, Ghost
- **Sizes**: Small, Medium, Large
- **States**: Normal, Loading, Disabled
- **Options**: Full width support
- **Game Context**: Buttons labeled for game actions (Eliminate Target, Join Game, etc.)

### 3. **Card Component** (`AssassinCard.stories.tsx`)
- **Base Cards**: Default, Danger, Success, Warning, Dark variants
- **Game-Specific Cards**: 
  - Player Cards (with status indicators)
  - Game Cards (with player counts and status)
  - Elimination Cards (for reporting eliminations)
- **Elevation Levels**: Low, Medium, High shadows
- **Responsive Padding**: None, Small, Medium, Large

## 🎯 Design System Implementation

### Color System
```javascript
// Extracted directly from your Figma colors
Colors = {
  // Primary (Green-based)
  primary900: '#0CC25F',  // Your main brand color
  primary600: '#55D48F',  // Interactive elements
  primary300: '#9EE7BF',  // Light accents
  
  // Status Colors
  success: '#12D18E',     // Safe zones, positive actions
  error: '#F75555',       // Eliminations, danger
  warning: '#FACC15',     // Cautions, pending states
  
  // Dark Theme
  dark1: '#181A20',       // Primary dark background
  dark2: '#1E2025',       // Secondary dark background
}
```

### Typography Scale
```javascript
Typography = {
  // Sizes (in pixels)
  h1: 32,     // Page titles
  h2: 24,     // Section headers  
  body: 14,   // Standard content
  caption: 10, // Labels
  
  // Weights
  regular: '400',
  semibold: '600',
  bold: '700',
}
```

### Spacing System
```javascript
Spacing = {
  xs: 4,    // 1 unit
  sm: 8,    // 2 units  
  md: 16,   // 4 units (base)
  lg: 24,   // 6 units
  xl: 32,   // 8 units
}
```

## 🚀 Running the Storybook

### Prerequisites
- React Native development environment set up
- Node.js and npm installed
- iOS Simulator or Android Emulator

### Start Storybook
```bash
# Install dependencies (if not already done)
npm install

# Generate stories (updates story registry)
npm run storybook-generate

# Start your React Native app with Storybook
npx react-native run-ios
# or
npx react-native run-android
```

## 📱 Using Components in Your App

### Import Design Tokens
```javascript
import { Colors, Typography, Spacing } from './path/to/DesignTokens.stories';

// Use in your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark1,
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
});
```

### Use the Button Component
```javascript
import { AssassinButton } from './path/to/AssassinButton.stories';

// In your component
<AssassinButton 
  title="Eliminate Target"
  variant="danger"
  onPress={handleElimination}
  loading={isProcessing}
/>
```

### Use the Card Component
```javascript
import { AssassinCard } from './path/to/AssassinCard.stories';

// Player status card
<AssassinCard 
  title="Alex Johnson"
  subtitle="Target: Sarah Smith"
  variant="success"
>
  <Text>Additional player info...</Text>
</AssassinCard>
```

## 🔄 Syncing with Figma Updates

### When Your Figma Design Changes:

1. **Export New Design Tokens**
   - Extract updated colors/typography from Figma
   - Update the `Colors`, `Typography`, or `Spacing` objects in `DesignTokens.stories.tsx`

2. **Update Component Variants**
   - Add new component states in your Figma
   - Add corresponding variants to the React Native components
   - Create new stories for the variants

3. **Regenerate Stories**
   ```bash
   npm run storybook-generate
   ```

### Workflow Integration:
- **Designers**: Use Figma for design exploration and token updates
- **Developers**: Reference Storybook for implementation guidance
- **QA**: Use Storybook to test component states and variations

## 🎮 Game-Specific Components

### Player Cards
- **Alive**: Green variant with target information
- **Dead**: Red variant with elimination status
- **Spectator**: Gray variant for observers

### Game Cards  
- **Active**: Green variant for ongoing games
- **Pending**: Yellow variant for games waiting to start
- **Completed**: Gray variant for finished games

### Action Buttons
- **Eliminate Target**: Red danger button
- **Join Game**: Primary green button  
- **Mark Safe Zone**: Success green button
- **Emergency Exit**: Full-width danger button

## 📈 Extending the Design System

### Adding New Components:

1. **Create the Component**
   ```javascript
   // NewComponent.stories.tsx
   const NewComponent = ({ variant, size }) => {
     // Implementation using design tokens
   };
   ```

2. **Add Stories**
   ```javascript
   export default {
     title: 'Design System/NewComponent',
     component: NewComponent,
   };

   export const AllVariants = () => <NewComponentShowcase />;
   export const Primary = () => <NewComponent variant="primary" />;
   ```

3. **Regenerate**
   ```bash
   npm run storybook-generate
   ```

### Best Practices:
- Always use design tokens instead of hardcoded values
- Create variants for different game states
- Include loading and error states
- Test on both light and dark themes
- Document component props and usage

## 🔗 Integration with Development

### Component Library Structure
```
.rnstorybook/stories/
├── DesignTokens.stories.tsx    # Design tokens showcase
├── AssassinButton.stories.tsx  # Button component variants
├── AssassinCard.stories.tsx    # Card component variants
└── [Future components...]
```

### Development Workflow:
1. **Design in Figma** → Define tokens and component states
2. **Build in Storybook** → Create React Native components
3. **Test Interactively** → Use Storybook for component testing
4. **Implement in App** → Import components into actual screens

## 🎨 Design-Development Handoff

This Storybook serves as the single source of truth for:
- ✅ Exact color values and usage
- ✅ Typography hierarchy and weights  
- ✅ Component states and interactions
- ✅ Spacing and layout principles
- ✅ Game-specific styling patterns

## 📝 Next Steps

1. **Expand Component Library**
   - Input components (TextInput, Picker)
   - Navigation components (TabBar, Header)
   - Game-specific components (Map overlay, Timer)

2. **Add More Stories**
   - Dark theme variants
   - Accessibility states
   - Error scenarios

3. **Documentation**
   - Component usage guidelines
   - Accessibility standards
   - Performance considerations

This Storybook transforms your Figma design system into a living, interactive development tool that ensures consistency between design and implementation while providing a seamless handoff process. 