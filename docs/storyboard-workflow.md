# Figma to Storyboard Workflow

## Overview

This document outlines the complete workflow for creating Xcode Storyboards from your Assassin Game design system, bridging the gap between Figma designs and native iOS development.

## 🎯 What We've Created

### 1. **SwiftUI Design System Showcase**
- **File**: `src/components/previews/SimpleDesignShowcase.swift`
- **Purpose**: Interactive preview of all design system components
- **Features**:
  - Tabbed interface (Buttons, Cards, Forms, Colors)
  - Live component examples with tactical gaming theme
  - Mission cards, target cards, form validation states
  - Complete color palette and typography showcase

### 2. **Xcode Project Generator**
- **File**: `scripts/xcode-project-generator.js`
- **Purpose**: Generates complete Xcode project templates
- **Output**: 
  - Project structure with Sources, Resources, Tests
  - Storyboard templates with Auto Layout constraints
  - SwiftUI integration examples
  - Info.plist and scheme configurations

### 3. **Figma to Storyboard Bridge**
- **File**: `scripts/figma-to-storyboard.js`
- **Purpose**: Converts Figma designs into Xcode storyboard XML
- **Features**:
  - Automatic UI element detection (buttons, labels, images)
  - Auto Layout constraint generation
  - Design token integration
  - Sample storyboard generation

## 🚀 Quick Start

### Generate Sample Storyboard
```bash
npm run storyboard:generate
```

### Generate Xcode Project Template
```bash
npm run xcode:generate
```

### Open Generated Xcode Project
```bash
npm run xcode:open
```

### View SwiftUI Showcase
```bash
npm run preview:showcase
```

## 📋 Detailed Workflow

### Step 1: Design System Showcase
The SwiftUI showcase provides a comprehensive view of your design system:

```swift
// Example usage in your app
import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            SimpleDesignShowcase()
        }
    }
}
```

**Components Included**:
- **Buttons**: Primary (Assassin Red), Secondary (Tactical Blue), Danger states
- **Cards**: Mission cards with status indicators, Target cards with threat levels
- **Forms**: Text fields with validation states (valid, invalid, warning)
- **Colors**: Complete tactical color palette with samples

### Step 2: Storyboard Generation

#### From Figma (with API access):
```bash
# Set environment variables
export FIGMA_API_KEY="your-figma-api-key"
export FIGMA_FILE_KEY="your-figma-file-key"

# Generate storyboard from Figma
npm run storyboard:generate
```

#### Sample Storyboard (no API required):
```bash
npm run storyboard:sample
```

**Generated Files**:
- `storyboard-output/Sample.storyboard` - Complete storyboard XML
- `storyboard-output/SampleViewController.swift` - View controller implementation
- `storyboard-output/ConstraintHelpers.swift` - Auto Layout helpers

### Step 3: Xcode Project Setup

```bash
# Generate complete Xcode project
npm run xcode:generate

# Open in Xcode
npm run xcode:open
```

**Project Structure**:
```
xcode-templates/
├── AssassinDesignSystem.xcodeproj/
├── Sources/
│   ├── DesignSystem/
│   │   ├── Components/
│   │   ├── Tokens/
│   │   └── Previews/
│   └── ViewControllers.swift
├── Resources/
│   ├── Storyboards/
│   │   ├── Main.storyboard
│   │   ├── ComponentShowcase.storyboard
│   │   └── LaunchScreen.storyboard
│   ├── Assets.xcassets/
│   └── Info.plist
└── Tests/
```

## 🎨 Design System Integration

### Color Palette
```swift
extension UIColor {
    static let assassinRed = UIColor(red: 0.8, green: 0.1, blue: 0.1, alpha: 1.0)
    static let tacticalBlue = UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0)
    static let electricGreen = UIColor(red: 0.0, green: 0.8, blue: 0.4, alpha: 1.0)
    static let deepNavy = UIColor(red: 0.05, green: 0.1, blue: 0.2, alpha: 1.0)
}
```

### Auto Layout Helpers
```swift
// Apply consistent spacing from design system
view.applyFigmaConstraints(to: superview, safeArea: safeArea)

// Apply corner radius
button.applyFigmaCornerRadius(12)

// Apply shadow
card.applyFigmaShadow(color: .black, opacity: 0.1, radius: 4)
```

## 🔧 Customization

### Modifying the Showcase
Edit `src/components/previews/SimpleDesignShowcase.swift`:

```swift
// Add new component section
ComponentSection(title: "New Components") {
    VStack(spacing: 16) {
        // Your custom components here
    }
}
```

### Extending Storyboard Generation
Modify `scripts/figma-to-storyboard.js`:

```javascript
// Add custom element conversion
convertCustomNode(node) {
    return {
        type: 'customElement',
        id: this.generateId(node.name),
        // Custom properties
    };
}
```

### Adding New View Controllers
Update `scripts/xcode-project-generator.js`:

```javascript
// Add new scene to storyboard
generateCustomSceneXML(scene) {
    return `<!-- Custom Scene XML -->`;
}
```

## 📱 Integration with Existing Apps

### SwiftUI Integration
```swift
// Embed in existing SwiftUI app
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            TabView {
                ContentView()
                    .tabItem { Label("Home", systemImage: "house") }
                
                SimpleDesignShowcase()
                    .tabItem { Label("Design System", systemImage: "paintpalette") }
            }
        }
    }
}
```

### UIKit Integration
```swift
// Present from UIKit view controller
@IBAction func showDesignSystem(_ sender: UIButton) {
    let swiftUIView = SimpleDesignShowcase()
    let hostingController = UIHostingController(rootView: swiftUIView)
    present(hostingController, animated: true)
}
```

## 🧪 Testing

### Visual Regression Testing
```swift
// Test storyboard components
func testStoryboardComponents() {
    let storyboard = UIStoryboard(name: "Sample", bundle: nil)
    let viewController = storyboard.instantiateInitialViewController()
    
    // Snapshot testing
    assertSnapshot(matching: viewController, as: .image)
}
```

### Accessibility Testing
```swift
// Test accessibility in generated storyboards
func testAccessibility() {
    let viewController = AssassinDesignViewController()
    viewController.loadViewIfNeeded()
    
    XCTAssertNotNil(viewController.primaryButton.accessibilityLabel)
    XCTAssertNotNil(viewController.titleLabel.accessibilityLabel)
}
```

## 🔄 Continuous Integration

The storyboard generation is integrated into your CI/CD pipeline:

```yaml
# .github/workflows/design-system-ci.yml
- name: Generate Storyboards
  run: |
    npm run storyboard:generate
    npm run xcode:generate
    
- name: Test Generated Code
  run: |
    cd xcode-templates
    xcodebuild test -scheme AssassinDesignSystem
```

## 📊 Metrics and Monitoring

Track storyboard generation metrics:

```bash
# Check generation status
npm run project:status

# View storyboard metrics
npm run metrics:dashboard
```

**Tracked Metrics**:
- Storyboard generation success rate
- Component coverage in storyboards
- Auto Layout constraint validation
- Accessibility compliance

## 🚨 Troubleshooting

### Common Issues

**1. Figma API Connection**
```bash
# Verify API credentials
echo $FIGMA_API_KEY
echo $FIGMA_FILE_KEY

# Test API connection
curl -H "X-Figma-Token: $FIGMA_API_KEY" \
     "https://api.figma.com/v1/files/$FIGMA_FILE_KEY"
```

**2. Xcode Project Issues**
```bash
# Clean generated files
npm run storyboard:clean

# Regenerate project
npm run xcode:generate
```

**3. SwiftUI Preview Issues**
- Ensure Xcode 15+ is installed
- Check that SwiftUI is available in your target
- Verify import statements in preview files

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm run storyboard:generate
```

## 🎯 Best Practices

### 1. **Naming Conventions**
- Use descriptive names for Figma layers
- Follow Swift naming conventions in generated code
- Maintain consistency between design and code

### 2. **Component Organization**
- Group related components in Figma
- Use consistent spacing and sizing
- Apply design tokens consistently

### 3. **Accessibility**
- Include accessibility labels in Figma
- Test with VoiceOver
- Ensure sufficient color contrast

### 4. **Performance**
- Optimize image assets
- Use appropriate view hierarchies
- Test on various device sizes

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time Figma sync
- [ ] Advanced constraint generation
- [ ] Custom component templates
- [ ] Automated testing generation
- [ ] Design token validation
- [ ] Multi-platform support (macOS, watchOS)

### Contributing
To contribute to the storyboard workflow:

1. Fork the repository
2. Create a feature branch
3. Add your enhancements
4. Test thoroughly
5. Submit a pull request

## 📚 Additional Resources

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Xcode Storyboard Reference](https://developer.apple.com/documentation/uikit/uistoryboard)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Auto Layout Guide](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/)

---

**Need Help?** Check the troubleshooting section or create an issue in the repository. 