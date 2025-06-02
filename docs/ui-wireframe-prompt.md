# Assassin Game - UI Wireframe Design Prompt

## Project Overview

You are designing the complete UI wireframe system for **Assassin Game** - a thrilling location-based elimination game that combines the strategic gameplay of Assassin with the real-world engagement of Pokémon GO. This is a mobile-first iOS application targeting college campuses and young adults.

## Core Game Concept

**"Assassin meets Pokémon GO but way more thrilling"**

Players are assigned targets in a campus-wide elimination game where they must "eliminate" their targets while avoiding being eliminated themselves. The game uses real-world locations, GPS tracking, and various verification methods to create an immersive, tactical experience.

## Technical Foundation

### API Capabilities Available
Based on the comprehensive backend API, your designs should leverage these capabilities:

#### **Authentication & User Management**
- User registration and login
- Password reset functionality
- JWT-based session management
- Player profile management with stats

#### **Game Lifecycle Management**
- Game creation and joining
- Game status tracking (CREATED, ACTIVE, COMPLETED, PENDING)
- Player removal and game administration
- Game boundaries and geographic restrictions
- Real-time game timeline and events

#### **Core Gameplay Features**
- Target assignment and tracking
- Kill reporting with multiple verification methods:
  - GPS proximity verification
  - NFC tag scanning
  - Photo verification
  - Manual admin verification
- Kill history and statistics
- Player status management (ACTIVE, DEAD, SPECTATOR)
- Last will messages for eliminated players

#### **Location & Safety Systems**
- Real-time GPS location tracking
- Safe zone management with multiple types:
  - **Public Safe Zones**: Open to all players
  - **Private Safe Zones**: Restricted access
  - **Timed Safe Zones**: Active during specific hours
  - **Relocatable Safe Zones**: Can be moved by players
- Emergency game pause/resume controls
- Geographic game boundaries

#### **Social & Communication**
- Comprehensive notification system for:
  - Game events (start, end, eliminations)
  - Target assignments
  - Proximity alerts
  - Safe zone events
  - Admin messages
- Player statistics and leaderboards
- Game timeline and activity feeds

#### **Monetization & Payments**
- Entry fee payment processing via Stripe
- Transaction history and management
- In-app purchase capabilities

## Design System Foundation

### **Visual Identity**
- **Primary Color**: Assassin Red (#C91C1C) - for elimination actions, danger states
- **Accent Color**: Tactical Blue (#3366CC) - for secondary actions, information
- **Background**: Dark Navy (#0D0D1A) - creates tactical, immersive atmosphere
- **Text Colors**: 
  - Primary: #1E1E1E (dark content)
  - Secondary: #9D9D9D (supporting information)
  - Light: #FFFFFF (on dark backgrounds)

### **Typography Hierarchy**
- **H1 Titles**: DM Sans Bold 22px (main screens, game titles)
- **H2 Buttons**: DM Sans Regular 18px (primary actions)
- **Body Large**: DM Sans Medium 16px (player names, important info)
- **Body Medium**: DM Sans Medium 14px (labels, secondary info)
- **Body Small**: DM Sans Regular 12px (timestamps, metadata)
- **Map Labels**: Montserrat Medium 8px/5px (location text)
- **System Text**: SF Pro Text Semibold 15px (iOS native elements)

### **Component Patterns**
- **Buttons**: 335px × 58px with 8px border radius, tactical styling
- **Cards**: Dark backgrounds with red accent borders for target information
- **Status Indicators**: Color-coded badges for player states
- **Location Pins**: Custom tactical-style markers for map elements

## Required User Journeys & Screens

### **1. Authentication Flow**
**Screens Needed:**
- Welcome/Onboarding screen with game concept explanation
- Sign up form with email, password, display name
- Sign in form with email/password
- Forgot password flow
- Email verification if needed

**Key UX Considerations:**
- Quick onboarding for college students
- Social proof and excitement building
- Clear privacy and safety messaging

### **2. Game Discovery & Joining**
**Screens Needed:**
- Game browser/list with filters (status, campus, entry fee)
- Game details view with rules, player count, boundaries
- Join game confirmation with entry fee payment
- Payment processing screens (Stripe integration)
- Game lobby/waiting room for pre-start games

**Key Features:**
- Campus-specific game filtering
- Entry fee display and payment
- Game rules and boundary visualization
- Player count and status indicators

### **3. Main Game Interface**
**Screens Needed:**
- **Primary Game Screen**: Central hub showing:
  - Current target information and photo
  - Player's own status and stats
  - Quick action buttons (eliminate, scan QR, view map)
  - Recent activity feed
  - Safe zone proximity indicators

**Key Features:**
- Target photo and basic info (name, last known location)
- Elimination button with verification options
- Real-time status updates
- Quick access to map and notifications

### **4. Map & Location Features**
**Screens Needed:**
- **Interactive Game Map** showing:
  - Player's current location
  - Safe zones with different visual styles by type
  - Game boundaries
  - Recent elimination locations (anonymized)
  - Nearby players (if allowed by game rules)
- Safe zone details and rules
- Location sharing controls and privacy settings

**Key Features:**
- Real-time location tracking toggle
- Safe zone entry/exit notifications
- Boundary violation warnings
- Tactical map styling with dark theme

### **5. Elimination & Verification Flow**
**Screens Needed:**
- **Elimination Initiation**: Target confirmation screen
- **Verification Method Selection**:
  - GPS proximity verification
  - QR code scanning interface
  - Photo capture for verification
  - Manual verification request
- **Elimination Confirmation**: Success/failure feedback
- **Last Will Entry**: For eliminated players
- **Target Reassignment**: New target notification

**Key Features:**
- Multiple verification methods with clear instructions
- Real-time GPS proximity checking
- Camera integration for QR codes and photos
- Dramatic elimination animations and feedback

### **6. Safe Zone Management**
**Screens Needed:**
- Safe zone browser and map view
- Safe zone creation form (for authorized players)
- Safe zone details with rules and timing
- Private safe zone access management
- Relocatable safe zone controls

**Key Features:**
- Visual safe zone indicators on map
- Entry/exit notifications
- Time-based safe zone schedules
- Access control for private zones

### **7. Notifications & Activity**
**Screens Needed:**
- Notification center with categorized alerts
- Real-time notification overlays
- Activity timeline for game events
- Push notification settings and preferences

**Notification Types:**
- Game start/end announcements
- Target assignments
- Elimination confirmations
- Proximity alerts
- Safe zone events
- Admin messages

### **8. Player Profile & Statistics**
**Screens Needed:**
- Personal profile with stats and history
- Game history and performance metrics
- Achievement badges and rankings
- Settings and preferences
- Privacy controls for location sharing

**Key Metrics:**
- Games played/won
- Kill/death ratio
- Survival time statistics
- Leaderboard rankings

### **9. Leaderboards & Social Features**
**Screens Needed:**
- Global leaderboards with multiple sorting options
- Game-specific rankings
- Player search and profiles
- Social sharing capabilities

**Key Features:**
- Multiple ranking categories (kills, wins, survival time)
- Seasonal and all-time leaderboards
- Social sharing of achievements

### **10. Emergency & Safety Controls**
**Screens Needed:**
- Emergency contact information
- Game pause/safety mode activation
- Incident reporting interface
- Safety guidelines and rules

**Key Features:**
- One-tap emergency contacts
- Game-wide pause capabilities for admins
- Clear safety messaging and guidelines

### **11. Admin & Game Management**
**Screens Needed:**
- Game creation wizard with boundary setting
- Player management and removal tools
- Game monitoring dashboard
- Emergency controls and communication tools

**Admin Features:**
- Real-time game monitoring
- Player behavior management
- Emergency pause/resume controls
- Bulk messaging capabilities

## Design Principles & UX Guidelines

### **1. Safety First**
- Always prioritize player safety in design decisions
- Clear emergency controls and safety messaging
- Obvious safe zone indicators and boundaries
- Privacy controls for location sharing

### **2. Tactical Immersion**
- Dark, tactical color scheme creates atmosphere
- Military/spy-inspired UI elements
- Dramatic animations for eliminations
- Stealth-mode options for discrete gameplay

### **3. Real-World Integration**
- Seamless map integration with game elements
- Location-aware notifications and alerts
- GPS-based gameplay mechanics
- Campus-specific customization

### **4. Social Engagement**
- Leaderboards and competitive elements
- Social sharing of achievements
- Team/alliance formation capabilities
- Spectator modes for eliminated players

### **5. Mobile-First Performance**
- Battery-efficient location tracking
- Offline capability for core features
- Quick loading and responsive interactions
- Minimal data usage optimization

## Technical Considerations

### **Platform Requirements**
- iOS native development (Swift/SwiftUI)
- Real-time location services integration
- Push notification capabilities
- Camera and QR code scanning
- Stripe payment processing
- Background location tracking (with user consent)

### **Performance Requirements**
- Sub-second response times for critical actions
- Efficient battery usage for location tracking
- Offline mode for basic functionality
- Real-time updates for game state changes

### **Security & Privacy**
- Secure authentication and session management
- Location data encryption and privacy controls
- Safe zone verification and enforcement
- Anti-cheating measures and verification

## Success Metrics & Goals

### **Engagement Metrics**
- Daily active users and session length
- Game completion rates
- Player retention across multiple games
- Social sharing and viral growth

### **Safety Metrics**
- Zero safety incidents
- Proper safe zone usage
- Emergency feature accessibility
- Player reporting and moderation effectiveness

### **Business Metrics**
- Entry fee conversion rates
- In-app purchase adoption
- Campus expansion and adoption
- Player lifetime value

## Wireframe Deliverables Expected

1. **Complete user flow diagrams** for all major journeys
2. **Detailed wireframes** for each screen with annotations
3. **Interactive prototypes** showing key transitions and animations
4. **Component library** documenting reusable UI elements
5. **Responsive design considerations** for different device sizes
6. **Accessibility guidelines** and inclusive design principles
7. **Animation and micro-interaction specifications**
8. **Error state and edge case handling**

## Design Inspiration & References

- **Tactical/Military Aesthetics**: Call of Duty Mobile, Rainbow Six Siege
- **Location Gaming**: Pokémon GO, Ingress, Zombies Run
- **Social Gaming**: Among Us, Fall Guys, Fortnite
- **Campus Apps**: Yik Yak, Fizz, BeReal
- **Dark UI Themes**: Discord, Spotify, Netflix

Create wireframes that capture the thrill and strategy of the game while maintaining safety, usability, and social engagement. The design should feel like a premium gaming experience that college students will be excited to play and share with friends. 