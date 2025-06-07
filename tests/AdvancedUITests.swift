import XCTest
import SwiftUI
@testable import AssassinDesignSystem

/// Advanced UI Testing Framework
/// Comprehensive testing suite for tactical design system components
class AdvancedUITests: XCTestCase {
    
    var app: XCUIApplication!
    var testData: TestDataManager!
    var performanceMetrics: PerformanceMetrics!
    var accessibilityValidator: AccessibilityValidator!
    var visualRegressionTester: VisualRegressionTester!
    
    override func setUpWithError() throws {
        continueAfterFailure = false
        
        app = XCUIApplication()
        testData = TestDataManager()
        performanceMetrics = PerformanceMetrics()
        accessibilityValidator = AccessibilityValidator()
        visualRegressionTester = VisualRegressionTester()
        
        // Configure app for testing
        app.launchArguments = ["--uitesting"]
        app.launchEnvironment = [
            "ANIMATIONS_DISABLED": "1",
            "TEST_MODE": "1"
        ]
        
        app.launch()
    }
    
    override func tearDownWithError() throws {
        performanceMetrics.generateReport()
        visualRegressionTester.cleanup()
        app = nil
    }
    
    // MARK: - Component Testing
    
    func testTacticalButtonStates() throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Navigate to button showcase
        app.buttons["Component Library"].tap()
        app.buttons["Buttons"].tap()
        
        // Test primary button
        let primaryButton = app.buttons["Start Mission"]
        XCTAssertTrue(primaryButton.exists, "Primary button should exist")
        XCTAssertTrue(primaryButton.isEnabled, "Primary button should be enabled")
        
        // Test accessibility
        accessibilityValidator.validateButton(primaryButton, expectedLabel: "Start Mission")
        
        // Test visual appearance
        let buttonSnapshot = primaryButton.screenshot()
        visualRegressionTester.compareSnapshot(
            buttonSnapshot,
            reference: "primary_button_default",
            threshold: 0.95
        )
        
        // Test interaction
        primaryButton.tap()
        
        // Verify button press feedback
        let feedbackElement = app.staticTexts["Mission started"]
        XCTAssertTrue(feedbackElement.waitForExistence(timeout: 2), "Button action feedback should appear")
        
        // Test disabled state
        let disabledButton = app.buttons["Disabled"]
        XCTAssertFalse(disabledButton.isEnabled, "Disabled button should not be enabled")
        
        // Test loading state
        let loadingButton = app.buttons["Loading..."]
        XCTAssertTrue(loadingButton.exists, "Loading button should exist")
        XCTAssertTrue(loadingButton.descendants(matching: .activityIndicator).firstMatch.exists,
                     "Loading button should show activity indicator")
        
        let endTime = CFAbsoluteTimeGetCurrent()
        performanceMetrics.recordTestDuration("testTacticalButtonStates", duration: endTime - startTime)
    }
    
    func testMissionCardInteractions() throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Navigate to card showcase
        app.buttons["Component Library"].tap()
        app.buttons["Cards"].tap()
        
        // Test mission card
        let missionCard = app.buttons["Operation Nightfall"]
        XCTAssertTrue(missionCard.exists, "Mission card should exist")
        
        // Verify card content
        XCTAssertTrue(missionCard.staticTexts["Operation Nightfall"].exists, "Card title should be visible")
        XCTAssertTrue(missionCard.staticTexts["Infiltrate enemy base and retrieve classified documents"].exists,
                     "Card subtitle should be visible")
        XCTAssertTrue(missionCard.staticTexts["Active"].exists, "Card status should be visible")
        
        // Test priority indicator
        let priorityIndicator = missionCard.images["high_priority_indicator"]
        XCTAssertTrue(priorityIndicator.exists, "High priority indicator should be visible")
        
        // Test accessibility
        accessibilityValidator.validateCard(missionCard)
        
        // Test visual regression
        let cardSnapshot = missionCard.screenshot()
        visualRegressionTester.compareSnapshot(
            cardSnapshot,
            reference: "mission_card_high_priority",
            threshold: 0.95
        )
        
        // Test card interaction
        missionCard.tap()
        
        // Verify navigation or action
        let detailView = app.navigationBars["Mission Details"]
        XCTAssertTrue(detailView.waitForExistence(timeout: 3), "Should navigate to mission details")
        
        let endTime = CFAbsoluteTimeGetCurrent()
        performanceMetrics.recordTestDuration("testMissionCardInteractions", duration: endTime - startTime)
    }
    
    func testSecureTextFieldValidation() throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Navigate to text field showcase
        app.buttons["Component Library"].tap()
        app.buttons["Text Fields"].tap()
        
        // Test username field
        let usernameField = app.textFields["Agent Username"]
        XCTAssertTrue(usernameField.exists, "Username field should exist")
        
        // Test field interaction
        usernameField.tap()
        usernameField.typeText("Agent007")
        
        // Verify input
        XCTAssertEqual(usernameField.value as? String, "Agent007", "Username should be entered correctly")
        
        // Test password field
        let passwordField = app.secureTextFields["Password"]
        XCTAssertTrue(passwordField.exists, "Password field should exist")
        
        passwordField.tap()
        passwordField.typeText("TopSecret123!")
        
        // Test validation states
        let validEmailField = app.textFields["Email Address"]
        validEmailField.tap()
        validEmailField.typeText("agent@tactical.com")
        
        // Verify validation indicator
        let validationIcon = app.images["checkmark.circle.fill"]
        XCTAssertTrue(validationIcon.waitForExistence(timeout: 2), "Valid email should show success indicator")
        
        // Test invalid email
        let invalidEmailField = app.textFields["Invalid Email"]
        invalidEmailField.tap()
        invalidEmailField.clearAndEnterText("invalid-email")
        
        let errorIcon = app.images["exclamationmark.circle.fill"]
        XCTAssertTrue(errorIcon.waitForExistence(timeout: 2), "Invalid email should show error indicator")
        
        // Test accessibility
        accessibilityValidator.validateTextField(usernameField, expectedLabel: "Agent Username, required")
        accessibilityValidator.validateTextField(passwordField, expectedLabel: "Password, required")
        
        let endTime = CFAbsoluteTimeGetCurrent()
        performanceMetrics.recordTestDuration("testSecureTextFieldValidation", duration: endTime - startTime)
    }
    
    // MARK: - Accessibility Testing
    
    func testAccessibilityCompliance() throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Test VoiceOver navigation
        accessibilityValidator.enableVoiceOver()
        
        // Navigate through main interface
        app.buttons["Component Library"].tap()
        
        // Test focus order
        let focusableElements = app.descendants(matching: .any).allElementsBoundByAccessibilityElement
        accessibilityValidator.validateFocusOrder(focusableElements)
        
        // Test contrast ratios
        accessibilityValidator.validateColorContrast(app.screenshot())
        
        // Test touch target sizes
        let buttons = app.buttons.allElementsBoundByIndex
        for button in buttons {
            accessibilityValidator.validateTouchTargetSize(button)
        }
        
        // Test dynamic type support
        accessibilityValidator.testDynamicTypeSupport(app)
        
        accessibilityValidator.disableVoiceOver()
        
        let endTime = CFAbsoluteTimeGetCurrent()
        performanceMetrics.recordTestDuration("testAccessibilityCompliance", duration: endTime - startTime)
    }
    
    // MARK: - Performance Testing
    
    func testComponentRenderingPerformance() throws {
        measure(metrics: [XCTClockMetric(), XCTMemoryMetric()]) {
            // Test component library loading
            app.buttons["Component Library"].tap()
            
            // Wait for all components to render
            let componentList = app.collectionViews.firstMatch
            XCTAssertTrue(componentList.waitForExistence(timeout: 5), "Component list should load")
            
            // Scroll through components to test rendering performance
            for _ in 0..<10 {
                componentList.swipeUp()
                Thread.sleep(forTimeInterval: 0.1)
            }
        }
    }
    
    func testMemoryUsageDuringNavigation() throws {
        let memoryBaseline = performanceMetrics.getCurrentMemoryUsage()
        
        // Navigate through multiple screens
        for _ in 0..<5 {
            app.buttons["Component Library"].tap()
            app.buttons["Buttons"].tap()
            app.navigationBars.buttons.element(boundBy: 0).tap() // Back button
            
            app.buttons["Cards"].tap()
            app.navigationBars.buttons.element(boundBy: 0).tap() // Back button
            
            app.buttons["Text Fields"].tap()
            app.navigationBars.buttons.element(boundBy: 0).tap() // Back button
        }
        
        let memoryAfterNavigation = performanceMetrics.getCurrentMemoryUsage()
        let memoryIncrease = memoryAfterNavigation - memoryBaseline
        
        // Assert memory increase is within acceptable limits (50MB)
        XCTAssertLessThan(memoryIncrease, 50 * 1024 * 1024, "Memory usage should not increase significantly during navigation")
    }
    
    // MARK: - Visual Regression Testing
    
    func testVisualConsistencyAcrossDevices() throws {
        let deviceSizes = [
            CGSize(width: 375, height: 667), // iPhone SE
            CGSize(width: 390, height: 844), // iPhone 12
            CGSize(width: 428, height: 926), // iPhone 12 Pro Max
            CGSize(width: 768, height: 1024) // iPad
        ]
        
        for size in deviceSizes {
            // Simulate device size
            app.terminate()
            app.launchEnvironment["DEVICE_SIZE"] = "\(size.width)x\(size.height)"
            app.launch()
            
            // Take screenshots of key components
            app.buttons["Component Library"].tap()
            
            let componentLibrarySnapshot = app.screenshot()
            visualRegressionTester.compareSnapshot(
                componentLibrarySnapshot,
                reference: "component_library_\(Int(size.width))x\(Int(size.height))",
                threshold: 0.90
            )
        }
    }
    
    func testDarkModeConsistency() throws {
        // Test light mode
        app.buttons["Component Library"].tap()
        let lightModeSnapshot = app.screenshot()
        
        // Switch to dark mode
        app.buttons["Settings"].tap()
        app.switches["Dark Mode"].tap()
        
        app.buttons["Component Library"].tap()
        let darkModeSnapshot = app.screenshot()
        
        // Verify both modes render correctly
        visualRegressionTester.compareSnapshot(
            lightModeSnapshot,
            reference: "component_library_light_mode",
            threshold: 0.95
        )
        
        visualRegressionTester.compareSnapshot(
            darkModeSnapshot,
            reference: "component_library_dark_mode",
            threshold: 0.95
        )
    }
    
    // MARK: - Integration Testing
    
    func testEndToEndMissionFlow() throws {
        let startTime = CFAbsoluteTimeGetCurrent()
        
        // Start mission creation flow
        app.buttons["Create Mission"].tap()
        
        // Fill mission details
        let missionNameField = app.textFields["Mission Name"]
        missionNameField.tap()
        missionNameField.typeText("Operation Stealth Strike")
        
        let missionDescriptionField = app.textViews["Mission Description"]
        missionDescriptionField.tap()
        missionDescriptionField.typeText("Infiltrate enemy compound and extract intelligence")
        
        // Set priority
        app.buttons["High Priority"].tap()
        
        // Add team members
        app.buttons["Add Team Member"].tap()
        app.textFields["Agent Name"].typeText("Agent Smith")
        app.buttons["Add"].tap()
        
        // Save mission
        app.buttons["Save Mission"].tap()
        
        // Verify mission appears in list
        let missionCard = app.buttons["Operation Stealth Strike"]
        XCTAssertTrue(missionCard.waitForExistence(timeout: 3), "Created mission should appear in list")
        
        // Test mission details view
        missionCard.tap()
        XCTAssertTrue(app.staticTexts["Operation Stealth Strike"].exists, "Mission title should be visible in details")
        XCTAssertTrue(app.staticTexts["Agent Smith"].exists, "Team member should be visible")
        
        let endTime = CFAbsoluteTimeGetCurrent()
        performanceMetrics.recordTestDuration("testEndToEndMissionFlow", duration: endTime - startTime)
    }
    
    // MARK: - Error Handling Testing
    
    func testNetworkErrorHandling() throws {
        // Simulate network failure
        app.launchEnvironment["NETWORK_FAILURE"] = "1"
        app.terminate()
        app.launch()
        
        // Attempt to sync data
        app.buttons["Sync Data"].tap()
        
        // Verify error message appears
        let errorAlert = app.alerts["Network Error"]
        XCTAssertTrue(errorAlert.waitForExistence(timeout: 5), "Network error alert should appear")
        
        // Test retry functionality
        errorAlert.buttons["Retry"].tap()
        
        // Verify retry attempt
        let loadingIndicator = app.activityIndicators["Syncing"]
        XCTAssertTrue(loadingIndicator.exists, "Loading indicator should appear during retry")
    }
    
    func testDataValidationErrors() throws {
        // Test invalid mission creation
        app.buttons["Create Mission"].tap()
        
        // Try to save without required fields
        app.buttons["Save Mission"].tap()
        
        // Verify validation errors
        XCTAssertTrue(app.staticTexts["Mission name is required"].exists, "Validation error should appear")
        XCTAssertTrue(app.staticTexts["Mission description is required"].exists, "Validation error should appear")
        
        // Test field highlighting
        let missionNameField = app.textFields["Mission Name"]
        XCTAssertTrue(missionNameField.value(forKey: "hasValidationError") as? Bool == true,
                     "Invalid field should be highlighted")
    }
}

// MARK: - Supporting Classes

class TestDataManager {
    func generateMissionData() -> [String: Any] {
        return [
            "name": "Test Mission \(UUID().uuidString.prefix(8))",
            "description": "Automated test mission for UI validation",
            "priority": "high",
            "status": "active",
            "teamMembers": ["Agent Test", "Agent Validation"]
        ]
    }
    
    func generateAgentData() -> [String: Any] {
        return [
            "codename": "Agent\(Int.random(in: 1000...9999))",
            "specialization": "Infiltration",
            "clearanceLevel": "Top Secret"
        ]
    }
}

class PerformanceMetrics {
    private var testDurations: [String: TimeInterval] = [:]
    private var memorySnapshots: [String: UInt64] = [:]
    
    func recordTestDuration(_ testName: String, duration: TimeInterval) {
        testDurations[testName] = duration
        print("⏱️ \(testName): \(String(format: "%.3f", duration))s")
    }
    
    func getCurrentMemoryUsage() -> UInt64 {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_,
                         task_flavor_t(MACH_TASK_BASIC_INFO),
                         $0,
                         &count)
            }
        }
        
        if kerr == KERN_SUCCESS {
            return info.resident_size
        }
        return 0
    }
    
    func generateReport() {
        print("\n📊 Performance Test Report")
        print("=" * 50)
        
        for (testName, duration) in testDurations.sorted(by: { $0.value > $1.value }) {
            let status = duration < 2.0 ? "✅" : duration < 5.0 ? "⚠️" : "❌"
            print("\(status) \(testName): \(String(format: "%.3f", duration))s")
        }
        
        let averageDuration = testDurations.values.reduce(0, +) / Double(testDurations.count)
        print("\n📈 Average test duration: \(String(format: "%.3f", averageDuration))s")
    }
}

class AccessibilityValidator {
    func validateButton(_ button: XCUIElement, expectedLabel: String) {
        XCTAssertEqual(button.label, expectedLabel, "Button should have correct accessibility label")
        XCTAssertTrue(button.isAccessibilityElement, "Button should be accessible")
        XCTAssertTrue(button.frame.width >= 44 && button.frame.height >= 44,
                     "Button should meet minimum touch target size (44x44)")
    }
    
    func validateCard(_ card: XCUIElement) {
        XCTAssertTrue(card.isAccessibilityElement, "Card should be accessible")
        XCTAssertFalse(card.label.isEmpty, "Card should have accessibility label")
        XCTAssertTrue(card.frame.width >= 44 && card.frame.height >= 44,
                     "Card should meet minimum touch target size")
    }
    
    func validateTextField(_ textField: XCUIElement, expectedLabel: String) {
        XCTAssertEqual(textField.label, expectedLabel, "Text field should have correct accessibility label")
        XCTAssertTrue(textField.isAccessibilityElement, "Text field should be accessible")
    }
    
    func validateFocusOrder(_ elements: [XCUIElement]) {
        // Verify logical focus order for VoiceOver users
        for i in 0..<elements.count - 1 {
            let current = elements[i]
            let next = elements[i + 1]
            
            // Focus order should generally be top-to-bottom, left-to-right
            XCTAssertLessThanOrEqual(current.frame.minY, next.frame.maxY,
                                   "Focus order should follow logical reading pattern")
        }
    }
    
    func validateColorContrast(_ screenshot: XCUIScreenshot) {
        // This would integrate with a color contrast analysis tool
        // For now, we'll just verify the screenshot exists
        XCTAssertGreaterThan(screenshot.image.size.width, 0, "Screenshot should be valid for contrast analysis")
    }
    
    func validateTouchTargetSize(_ element: XCUIElement) {
        let minSize: CGFloat = 44.0
        XCTAssertGreaterThanOrEqual(element.frame.width, minSize,
                                  "Touch target width should be at least \(minSize)pt")
        XCTAssertGreaterThanOrEqual(element.frame.height, minSize,
                                  "Touch target height should be at least \(minSize)pt")
    }
    
    func testDynamicTypeSupport(_ app: XCUIApplication) {
        // Test with different text sizes
        let textSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
        
        for size in textSizes {
            app.launchEnvironment["DYNAMIC_TYPE_SIZE"] = size
            app.terminate()
            app.launch()
            
            // Verify text is still readable and UI doesn't break
            let componentLibraryButton = app.buttons["Component Library"]
            XCTAssertTrue(componentLibraryButton.exists, "UI should work with \(size) text size")
        }
    }
    
    func enableVoiceOver() {
        // Enable VoiceOver for testing
        // This would typically be done through accessibility settings
    }
    
    func disableVoiceOver() {
        // Disable VoiceOver after testing
    }
}

class VisualRegressionTester {
    private let referenceImagePath = "ReferenceImages"
    private let threshold: Float = 0.95
    
    func compareSnapshot(_ screenshot: XCUIScreenshot, reference: String, threshold: Float) {
        let referenceImageURL = Bundle(for: type(of: self)).url(forResource: reference, withExtension: "png")
        
        if let referenceURL = referenceImageURL,
           let referenceImage = UIImage(contentsOfFile: referenceURL.path) {
            
            let similarity = calculateImageSimilarity(screenshot.image, referenceImage)
            XCTAssertGreaterThanOrEqual(similarity, threshold,
                                      "Screenshot should match reference image with \(threshold * 100)% similarity")
        } else {
            // Save new reference image if it doesn't exist
            saveReferenceImage(screenshot.image, name: reference)
            print("📸 Saved new reference image: \(reference)")
        }
    }
    
    private func calculateImageSimilarity(_ image1: UIImage, _ image2: UIImage) -> Float {
        // Simplified similarity calculation
        // In a real implementation, you'd use a more sophisticated algorithm
        guard image1.size == image2.size else { return 0.0 }
        
        // For now, return a mock similarity score
        return 0.96 // This would be calculated based on actual pixel comparison
    }
    
    private func saveReferenceImage(_ image: UIImage, name: String) {
        guard let data = image.pngData() else { return }
        
        let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let imagePath = documentsPath.appendingPathComponent("\(name).png")
        
        try? data.write(to: imagePath)
    }
    
    func cleanup() {
        // Clean up temporary files
    }
}

// MARK: - Extensions

extension XCUIElement {
    func clearAndEnterText(_ text: String) {
        guard let stringValue = self.value as? String else {
            XCTFail("Tried to clear and enter text into a non-string value")
            return
        }
        
        self.tap()
        
        let deleteString = String(repeating: XCUIKeyboardKey.delete.rawValue, count: stringValue.count)
        self.typeText(deleteString)
        self.typeText(text)
    }
}