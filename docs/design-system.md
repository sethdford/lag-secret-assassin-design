# Assassin Game - Design System

## Overview

The Assassin Game design system creates a dark, tactical aesthetic that evokes the thrill and intensity of elimination gameplay while maintaining excellent usability and accessibility. This system provides a comprehensive foundation for building a cohesive, engaging mobile experience.

## Design Principles

### 1. **Tactical Intensity**
- Dark, military-inspired aesthetic
- High contrast for critical information
- Neon accents for important actions

### 2. **Clarity Under Pressure**
- Clear information hierarchy
- Instant recognition of game states
- Minimal cognitive load during gameplay

### 3. **Real-world Integration**
- Map-centric design philosophy
- Location-aware interface elements
- Seamless AR/real-world transitions

### 4. **Safety First**
- Clear emergency controls
- Obvious safe zone indicators
- Transparent game state communication

## Color System

### Primary Colors

```css
/* Danger/Elimination */
--color-primary: #CC0000;
--color-primary-light: #FF3333;
--color-primary-dark: #990000;

/* Actions/Interactive */
--color-secondary: #0080FF;
--color-secondary-light: #33A3FF;
--color-secondary-dark: #0066CC;

/* Safe Zones/Success */
--color-accent: #00FF00;
--color-accent-light: #33FF33;
--color-accent-dark: #00CC00;
```

### Neutral Colors

```css
/* Backgrounds */
--color-background-primary: #0A0A0F;
--color-background-secondary: #151520;
--color-background-tertiary: #202030;

/* Surfaces */
--color-surface-primary: #1A1A25;
--color-surface-secondary: #252535;
--color-surface-elevated: #303045;

/* Borders */
--color-border-primary: #404055;
--color-border-secondary: #505065;
--color-border-accent: #606075;
```

### Text Colors

```css
/* Text */
--color-text-primary: #FFFFFF;
--color-text-secondary: #CCCCCC;
--color-text-tertiary: #999999;
--color-text-disabled: #666666;

/* Status Text */
--color-text-success: #00FF88;
--color-text-warning: #FFAA00;
--color-text-error: #FF4444;
--color-text-info: #44AAFF;
```

### Semantic Colors

```css
/* Game States */
--color-active-game: #00FF88;
--color-pending-game: #FFAA00;
--color-completed-game: #888888;

/* Player States */
--color-alive: #00FF88;
--color-dead: #FF4444;
--color-spectator: #888888;

/* Verification States */
--color-verified: #00FF88;
--color-pending-verification: #FFAA00;
--color-rejected: #FF4444;
```

## Typography

### Font Stack

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace (for codes/IDs) */
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

### Type Scale

```css
/* Headings */
--font-size-h1: 32px; /* Page titles */
--font-size-h2: 24px; /* Section headers */
--font-size-h3: 20px; /* Subsection headers */
--font-size-h4: 18px; /* Card titles */

/* Body Text */
--font-size-body-large: 16px; /* Primary content */
--font-size-body: 14px; /* Standard content */
--font-size-body-small: 12px; /* Secondary content */

/* UI Elements */
--font-size-button: 16px; /* Button text */
--font-size-caption: 10px; /* Labels, captions */
--font-size-overline: 10px; /* Overline text */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-black: 900;
```

## Spacing System

### Base Unit: 4px

```css
/* Spacing Scale */
--space-xs: 4px;   /* 1 unit */
--space-sm: 8px;   /* 2 units */
--space-md: 16px;  /* 4 units */
--space-lg: 24px;  /* 6 units */
--space-xl: 32px;  /* 8 units */
--space-2xl: 48px; /* 12 units */
--space-3xl: 64px; /* 16 units */
```

### Component Spacing

```css
/* Internal Padding */
--padding-button: 12px 24px;
--padding-card: 16px;
--padding-modal: 24px;
--padding-screen: 20px;

/* Margins */
--margin-component: 16px;
--margin-section: 32px;
--margin-page: 20px;
```

## Component Library

### Buttons

#### Primary Button
```css
.button-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  border-radius: 8px;
  padding: var(--padding-button);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
}

.button-primary:hover {
  background: var(--color-primary-light);
}

.button-primary:disabled {
  background: var(--color-text-disabled);
  color: var(--color-text-tertiary);
}
```

#### Secondary Button
```css
.button-secondary {
  background: var(--color-secondary);
  color: var(--color-text-primary);
  border: none;
  border-radius: 8px;
  padding: var(--padding-button);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
}
```

#### Ghost Button
```css
.button-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-primary);
  border-radius: 8px;
  padding: var(--padding-button);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
}
```

#### Danger Button
```css
.button-danger {
  background: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  border-radius: 8px;
  padding: var(--padding-button);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-bold);
  min-height: 48px;
  box-shadow: 0 0 20px rgba(204, 0, 0, 0.3);
}
```

### Cards

#### Base Card
```css
.card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  padding: var(--padding-card);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

#### Game Card
```css
.card-game {
  background: var(--color-surface-primary);
  border: 2px solid var(--color-border-primary);
  border-radius: 12px;
  padding: var(--padding-card);
  position: relative;
  overflow: hidden;
}

.card-game::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-active-game);
}

.card-game.pending::before {
  background: var(--color-pending-game);
}

.card-game.completed::before {
  background: var(--color-completed-game);
}
```

#### Player Card
```css
.card-player {
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-player.target {
  border-color: var(--color-primary);
  box-shadow: 0 0 16px rgba(204, 0, 0, 0.2);
}

.card-player.hunter {
  border-color: var(--color-accent);
  box-shadow: 0 0 16px rgba(0, 255, 0, 0.2);
}
```

### Form Elements

#### Input Fields
```css
.input {
  background: var(--color-surface-secondary);
  border: 2px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
  min-height: 48px;
}

.input:focus {
  border-color: var(--color-secondary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 128, 255, 0.2);
}

.input::placeholder {
  color: var(--color-text-tertiary);
}
```

#### Toggle Switch
```css
.toggle {
  width: 48px;
  height: 24px;
  background: var(--color-surface-tertiary);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle.active {
  background: var(--color-secondary);
}

.toggle::after {
  content: '';
  width: 20px;
  height: 20px;
  background: var(--color-text-primary);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
}

.toggle.active::after {
  transform: translateX(24px);
}
```

### Navigation

#### Tab Bar
```css
.tab-bar {
  background: var(--color-surface-primary);
  border-top: 1px solid var(--color-border-primary);
  padding: 8px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.tab-item.active {
  background: var(--color-surface-secondary);
  color: var(--color-secondary);
}

.tab-icon {
  width: 24px;
  height: 24px;
}

.tab-label {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
}
```

#### Header
```css
.header {
  background: var(--color-surface-primary);
  border-bottom: 1px solid var(--color-border-primary);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
}

.header-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.header-action {
  padding: 8px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
}
```

### Status Indicators

#### Status Badge
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(0, 255, 136, 0.2);
  color: var(--color-active-game);
  border: 1px solid var(--color-active-game);
}

.status-badge.pending {
  background: rgba(255, 170, 0, 0.2);
  color: var(--color-pending-game);
  border: 1px solid var(--color-pending-game);
}

.status-badge.dead {
  background: rgba(255, 68, 68, 0.2);
  color: var(--color-text-error);
  border: 1px solid var(--color-text-error);
}
```

#### Progress Indicator
```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--color-surface-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary), var(--color-accent));
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

### Notifications

#### Toast Notification
```css
.toast {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-accent);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 320px;
}

.toast.success {
  border-color: var(--color-accent);
}

.toast.error {
  border-color: var(--color-primary);
}

.toast.warning {
  border-color: var(--color-pending-game);
}
```

#### Notification Badge
```css
.notification-badge {
  background: var(--color-primary);
  color: var(--color-text-primary);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-bold);
  position: absolute;
  top: -8px;
  right: -8px;
}
```

## Iconography

### Icon System
- **Style**: Outline icons with 2px stroke weight
- **Size**: 16px, 20px, 24px, 32px variants
- **Color**: Inherit from parent or use semantic colors

### Core Icons
```
🎯 Target/Elimination
📍 Location/Position
🛡️ Safe Zone
⚔️ Combat/Kill
👤 Player/Profile
🎮 Game/Controller
📱 Mobile/Device
🔔 Notifications
⚙️ Settings
📊 Statistics
🏆 Leaderboard
💰 Payment
🚨 Emergency
👁️ Visibility/Tracking
🔒 Security/Privacy
```

## Map Styling

### Base Map Theme
```css
/* Dark map theme */
.map-container {
  filter: invert(90%) hue-rotate(180deg) saturate(1.2) brightness(0.9);
}

/* Player markers */
.marker-player {
  background: var(--color-secondary);
  border: 3px solid var(--color-text-primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: 0 0 12px rgba(0, 128, 255, 0.6);
}

.marker-target {
  background: var(--color-primary);
  border: 3px solid var(--color-text-primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: 0 0 12px rgba(204, 0, 0, 0.6);
  animation: pulse 2s infinite;
}

.marker-hunter {
  background: var(--color-accent);
  border: 3px solid var(--color-text-primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.6);
}

/* Safe zones */
.safe-zone {
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}
```

## Animations

### Micro-interactions
```css
/* Button press */
@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Pulse animation for critical elements */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

/* Slide in from bottom */
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Transition Timing
```css
/* Standard transitions */
--transition-fast: 0.15s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;

/* Easing functions */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

## Accessibility

### Focus States
```css
.focusable:focus {
  outline: 3px solid var(--color-secondary);
  outline-offset: 2px;
}

.focusable:focus:not(:focus-visible) {
  outline: none;
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --color-background-primary: #000000;
    --color-text-primary: #FFFFFF;
    --color-border-primary: #FFFFFF;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
--breakpoint-sm: 375px;  /* Small phones */
--breakpoint-md: 414px;  /* Large phones */
--breakpoint-lg: 768px;  /* Tablets */
--breakpoint-xl: 1024px; /* Large tablets */
```

### Safe Areas
```css
/* iOS Safe Area Support */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-left {
  padding-left: env(safe-area-inset-left);
}

.safe-area-right {
  padding-right: env(safe-area-inset-right);
}
```

## Implementation Guidelines

### Component Structure
1. **Atomic Design**: Build components from atoms → molecules → organisms
2. **Composition**: Favor composition over inheritance
3. **Props Interface**: Clear, typed props for all components
4. **Accessibility**: ARIA labels and semantic HTML

### Performance Considerations
1. **Lazy Loading**: Load components and images on demand
2. **Memoization**: Use React.memo for expensive components
3. **Bundle Splitting**: Code split by feature/route
4. **Image Optimization**: WebP format with fallbacks

### Testing Strategy
1. **Visual Regression**: Automated screenshot testing
2. **Accessibility**: Automated a11y testing
3. **Cross-platform**: Test on iOS and Android
4. **Performance**: Monitor bundle size and render times

This design system provides a comprehensive foundation for building the Assassin Game mobile app with consistency, accessibility, and visual impact. 