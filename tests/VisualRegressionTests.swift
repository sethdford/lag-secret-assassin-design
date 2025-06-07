import XCTest
import SwiftUI
import SnapshotTesting
@testable import AssassinGameDesignSystem

// MARK: - Visual Regression Tests
// Ensures implemented components match Figma designs

class VisualRegressionTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Configure snapshot testing
        isRecording = false // Set to true to record new snapshots
    }
    
    // MARK: - Design Token Tests
    
    func testColorPalette() {
        let colorPalette = ColorPaletteView()
        
        assertSnapshot(matching: colorPalette, as: .image(layout: .device(config: .iPhone13)))
        assertSnapshot(matching: colorPalette, as: .image(layout: .device(config: .iPhone13), traits: .init(userInterfaceStyle: .dark)))
    }
    
    func testTypographyScale() {
        let typography = TypographyScaleView()
        
        assertSnapshot(matching: typography, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testSpacingSystem() {
        let spacing = SpacingSystemView()
        
        assertSnapshot(matching: spacing, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Button Component Tests
    
    func testTacticalButtonStates() {
        let buttonStates = TacticalButtonStatesView()
        
        // Test all button states
        assertSnapshot(matching: buttonStates, as: .image(layout: .device(config: .iPhone13)))
        
        // Test on different devices
        assertSnapshot(matching: buttonStates, as: .image(layout: .device(config: .iPhoneSe)))
        assertSnapshot(matching: buttonStates, as: .image(layout: .device(config: .iPhone13ProMax)))
    }
    
    func testButtonAccessibility() {
        let button = TacticalButton(title: "Eliminate Target", style: .primary) { }
        
        // Test with accessibility features
        assertSnapshot(
            matching: button,
            as: .image(layout: .device(config: .iPhone13), traits: .init(preferredContentSizeCategory: .accessibilityExtraExtraExtraLarge))
        )
    }
    
    // MARK: - Card Component Tests
    
    func testMissionCard() {
        let missionCard = MissionCard(
            title: "Operation Nightfall",
            description: "Infiltrate the compound and retrieve classified documents",
            status: .active,
            difficulty: .high
        )
        
        assertSnapshot(matching: missionCard, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testTargetCard() {
        let targetCard = TargetCard(
            name: "Agent Smith",
            location: "Downtown Plaza",
            threat: .medium,
            image: "test_agent"
        )
        
        assertSnapshot(matching: targetCard, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Form Component Tests
    
    func testTacticalTextField() {
        let textField = TacticalTextFieldTestView()
        
        assertSnapshot(matching: textField, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testFormLayout() {
        let form = AgentRegistrationForm()
        
        assertSnapshot(matching: form, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Navigation Component Tests
    
    func testTacticalTabBar() {
        let tabBar = TacticalTabBarTestView()
        
        assertSnapshot(matching: tabBar, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testNavigationHeader() {
        let header = TacticalNavigationHeader(title: "Mission Control")
        
        assertSnapshot(matching: header, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Notification Component Tests
    
    func testAlertNotification() {
        let alert = TacticalAlert(
            title: "Mission Update",
            message: "Target has changed location",
            type: .warning
        )
        
        assertSnapshot(matching: alert, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testToastNotification() {
        let toast = TacticalToast(
            message: "Mission completed successfully",
            type: .success
        )
        
        assertSnapshot(matching: toast, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Complex Layout Tests
    
    func testMissionDashboard() {
        let dashboard = MissionDashboardTestView()
        
        assertSnapshot(matching: dashboard, as: .image(layout: .device(config: .iPhone13)))
        assertSnapshot(matching: dashboard, as: .image(layout: .device(config: .iPhone13), traits: .init(horizontalSizeClass: .regular)))
    }
    
    func testTargetProfile() {
        let profile = TargetProfileTestView()
        
        assertSnapshot(matching: profile, as: .image(layout: .device(config: .iPhone13)))
    }
    
    // MARK: - Responsive Design Tests
    
    func testResponsiveLayout() {
        let responsiveView = ResponsiveLayoutTestView()
        
        // Test on different screen sizes
        assertSnapshot(matching: responsiveView, as: .image(layout: .device(config: .iPhoneSe)))
        assertSnapshot(matching: responsiveView, as: .image(layout: .device(config: .iPhone13)))
        assertSnapshot(matching: responsiveView, as: .image(layout: .device(config: .iPhone13ProMax)))
        assertSnapshot(matching: responsiveView, as: .image(layout: .device(config: .iPadMini)))
    }
    
    // MARK: - Dark Mode Tests
    
    func testDarkModeConsistency() {
        let components = ComponentShowcaseView()
        
        // Light mode
        assertSnapshot(
            matching: components,
            as: .image(layout: .device(config: .iPhone13), traits: .init(userInterfaceStyle: .light))
        )
        
        // Dark mode
        assertSnapshot(
            matching: components,
            as: .image(layout: .device(config: .iPhone13), traits: .init(userInterfaceStyle: .dark))
        )
    }
    
    // MARK: - Animation State Tests
    
    func testLoadingStates() {
        let loadingView = LoadingStatesTestView()
        
        assertSnapshot(matching: loadingView, as: .image(layout: .device(config: .iPhone13)))
    }
    
    func testInteractiveStates() {
        let interactiveView = InteractiveStatesTestView()
        
        assertSnapshot(matching: interactiveView, as: .image(layout: .device(config: .iPhone13)))
    }
}

// MARK: - Test Helper Views

struct ColorPaletteView: View {
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.md) {
            Text("Color Palette")
                .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxl))
                .fontWeight(DesignTokens.Typography.bold)
            
            HStack(spacing: DesignTokens.Spacing.sm) {
                ColorSwatch(color: DesignTokens.Colors.assassinRed, name: "Assassin Red")
                ColorSwatch(color: DesignTokens.Colors.tacticalBlue, name: "Tactical Blue")
                ColorSwatch(color: DesignTokens.Colors.electricGreen, name: "Electric Green")
                ColorSwatch(color: DesignTokens.Colors.deepNavy, name: "Deep Navy")
            }
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}

struct ColorSwatch: View {
    let color: Color
    let name: String
    
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.xs) {
            Rectangle()
                .fill(color)
                .frame(width: 60, height: 60)
                .cornerRadius(DesignTokens.BorderRadius.sm)
            
            Text(name)
                .font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.xs))
                .foregroundColor(DesignTokens.Colors.textSecondary)
        }
    }
}

struct TypographyScaleView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Typography Scale")
                .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxxxl))
                .fontWeight(DesignTokens.Typography.heavy)
            
            Text("Headline 3XL")
                .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxxl))
                .fontWeight(DesignTokens.Typography.bold)
            
            Text("Headline 2XL")
                .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxl))
                .fontWeight(DesignTokens.Typography.semibold)
            
            Text("Body Large")
                .font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.lg))
                .fontWeight(DesignTokens.Typography.medium)
            
            Text("Body Regular")
                .font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.base))
                .fontWeight(DesignTokens.Typography.regular)
            
            Text("Caption Small")
                .font(.custom(DesignTokens.Typography.secondaryFont, size: DesignTokens.Typography.sm))
                .fontWeight(DesignTokens.Typography.light)
        }
        .foregroundColor(DesignTokens.Colors.textPrimary)
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}

struct TacticalButtonStatesView: View {
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.lg) {
            Text("Button States")
                .font(.custom(DesignTokens.Typography.primaryFont, size: DesignTokens.Typography.xxl))
                .fontWeight(DesignTokens.Typography.bold)
                .foregroundColor(DesignTokens.Colors.textPrimary)
            
            VStack(spacing: DesignTokens.Spacing.md) {
                TacticalButton(title: "Primary Button", style: .primary) { }
                TacticalButton(title: "Secondary Button", style: .secondary) { }
                TacticalButton(title: "Danger Button", style: .danger) { }
                TacticalButton(title: "Disabled Button", style: .primary) { }
                    .disabled(true)
            }
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}

struct TacticalTextFieldTestView: View {
    @State private var text = ""
    @State private var secureText = ""
    
    var body: some View {
        VStack(spacing: DesignTokens.Spacing.md) {
            TacticalTextField(
                title: "Codename",
                text: $text,
                placeholder: "Enter your codename"
            )
            
            TacticalSecureField(
                title: "Access Code",
                text: $secureText,
                placeholder: "Enter access code"
            )
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}

struct ComponentShowcaseView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: DesignTokens.Spacing.lg) {
                TacticalButtonStatesView()
                ColorPaletteView()
                TypographyScaleView()
            }
        }
        .background(DesignTokens.Colors.backgroundPrimary)
    }
}

// Additional test helper views would be implemented here... 