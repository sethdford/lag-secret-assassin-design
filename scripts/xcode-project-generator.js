#!/usr/bin/env node

/**
 * Xcode Project Generator for Design System
 * Generates Xcode project templates, storyboards, and SwiftUI previews
 */

const fs = require('fs');
const path = require('path');

class XcodeProjectGenerator {
    constructor() {
        this.projectName = 'AssassinDesignSystem';
        this.outputDir = './xcode-templates';
        this.bundleId = 'com.assassin.designsystem';
    }

    async generateProject() {
        console.log('🎯 Generating Xcode project templates...');
        
        // Create output directory
        this.ensureDirectory(this.outputDir);
        
        // Generate project structure
        await this.generateProjectStructure();
        await this.generateStoryboardTemplates();
        await this.generateSwiftUITemplates();
        await this.generateProjectFile();
        await this.generateInfoPlist();
        await this.generateSchemes();
        
        console.log('✅ Xcode project templates generated successfully!');
        console.log(`📁 Output directory: ${this.outputDir}`);
    }

    async generateProjectStructure() {
        const structure = [
            'Sources',
            'Sources/DesignSystem',
            'Sources/DesignSystem/Components',
            'Sources/DesignSystem/Tokens',
            'Sources/DesignSystem/Previews',
            'Resources',
            'Resources/Storyboards',
            'Resources/Assets.xcassets',
            'Tests',
            'Tests/DesignSystemTests',
            'Example',
            'Example/iOS',
            'Example/macOS'
        ];

        structure.forEach(dir => {
            this.ensureDirectory(path.join(this.outputDir, dir));
        });
    }

    async generateStoryboardTemplates() {
        // Main Storyboard Template
        const mainStoryboard = this.generateMainStoryboard();
        this.writeFile('Resources/Storyboards/Main.storyboard', mainStoryboard);

        // Component Showcase Storyboard
        const showcaseStoryboard = this.generateShowcaseStoryboard();
        this.writeFile('Resources/Storyboards/ComponentShowcase.storyboard', showcaseStoryboard);

        // LaunchScreen Storyboard
        const launchStoryboard = this.generateLaunchStoryboard();
        this.writeFile('Resources/Storyboards/LaunchScreen.storyboard', launchStoryboard);
    }

    generateMainStoryboard() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="BYZ-38-t0r">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21678"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="System colors in document resources" minToolsVersion="11.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--Design System Showcase-->
        <scene sceneID="tne-QT-ifu">
            <objects>
                <viewController id="BYZ-38-t0r" customClass="DesignSystemViewController" customModule="AssassinDesignSystem" customModuleProvider="target" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="8bC-Xf-vdC">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <!-- Header Section -->
                            <view contentMode="scaleToFill" translatesAutoresizingMaskIntoConstraints="NO" id="header-view">
                                <rect key="frame" x="0.0" y="59" width="393" height="100"/>
                                <subviews>
                                    <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Assassin Design System" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="title-label">
                                        <rect key="frame" x="20" y="20" width="353" height="36"/>
                                        <fontDescription key="fontDescription" type="boldSystem" pointSize="30"/>
                                        <color key="textColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                        <nil key="highlightedColor"/>
                                    </label>
                                    <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Interactive Component Showcase" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="subtitle-label">
                                        <rect key="frame" x="20" y="64" width="353" height="16"/>
                                        <fontDescription key="fontDescription" type="system" pointSize="13"/>
                                        <color key="textColor" systemColor="secondaryLabelColor"/>
                                        <nil key="highlightedColor"/>
                                    </label>
                                </subviews>
                                <color key="backgroundColor" red="0.05" green="0.1" blue="0.2" alpha="0.05" colorSpace="custom" customColorSpace="sRGB"/>
                                <constraints>
                                    <constraint firstItem="title-label" firstAttribute="leading" secondItem="header-view" secondAttribute="leading" constant="20" id="title-leading"/>
                                    <constraint firstAttribute="trailing" secondItem="title-label" secondAttribute="trailing" constant="20" id="title-trailing"/>
                                    <constraint firstItem="title-label" firstAttribute="top" secondItem="header-view" secondAttribute="top" constant="20" id="title-top"/>
                                    <constraint firstItem="subtitle-label" firstAttribute="leading" secondItem="header-view" secondAttribute="leading" constant="20" id="subtitle-leading"/>
                                    <constraint firstAttribute="trailing" secondItem="subtitle-label" secondAttribute="trailing" constant="20" id="subtitle-trailing"/>
                                    <constraint firstItem="subtitle-label" firstAttribute="top" secondItem="title-label" secondAttribute="bottom" constant="8" id="subtitle-top"/>
                                    <constraint firstAttribute="height" constant="100" id="header-height"/>
                                </constraints>
                            </view>
                            
                            <!-- Tab Bar -->
                            <segmentedControl opaque="NO" contentMode="scaleToFill" contentHorizontalAlignment="left" contentVerticalAlignment="top" segmentControlStyle="plain" selectedSegmentIndex="0" translatesAutoresizingMaskIntoConstraints="NO" id="category-selector">
                                <rect key="frame" x="20" y="179" width="353" height="32"/>
                                <segments>
                                    <segment title="Buttons"/>
                                    <segment title="Cards"/>
                                    <segment title="Forms"/>
                                    <segment title="Colors"/>
                                </segments>
                                <color key="selectedSegmentTintColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                <connections>
                                    <action selector="categoryChanged:" destination="BYZ-38-t0r" eventType="valueChanged" id="category-action"/>
                                </connections>
                            </segmentedControl>
                            
                            <!-- Content Container -->
                            <containerView opaque="NO" contentMode="scaleToFill" translatesAutoresizingMaskIntoConstraints="NO" id="content-container">
                                <rect key="frame" x="0.0" y="231" width="393" height="587"/>
                                <connections>
                                    <segue destination="content-vc" kind="embed" id="embed-segue"/>
                                </connections>
                            </containerView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="6Tk-OE-BBY"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                        <constraints>
                            <constraint firstItem="header-view" firstAttribute="leading" secondItem="6Tk-OE-BBY" secondAttribute="leading" id="header-leading"/>
                            <constraint firstItem="header-view" firstAttribute="trailing" secondItem="6Tk-OE-BBY" secondAttribute="trailing" id="header-trailing"/>
                            <constraint firstItem="header-view" firstAttribute="top" secondItem="6Tk-OE-BBY" secondAttribute="top" id="header-top"/>
                            
                            <constraint firstItem="category-selector" firstAttribute="leading" secondItem="6Tk-OE-BBY" secondAttribute="leading" constant="20" id="selector-leading"/>
                            <constraint firstItem="category-selector" firstAttribute="trailing" secondItem="6Tk-OE-BBY" secondAttribute="trailing" constant="-20" id="selector-trailing"/>
                            <constraint firstItem="category-selector" firstAttribute="top" secondItem="header-view" secondAttribute="bottom" constant="20" id="selector-top"/>
                            
                            <constraint firstItem="content-container" firstAttribute="leading" secondItem="6Tk-OE-BBY" secondAttribute="leading" id="content-leading"/>
                            <constraint firstItem="content-container" firstAttribute="trailing" secondItem="6Tk-OE-BBY" secondAttribute="trailing" id="content-trailing"/>
                            <constraint firstItem="content-container" firstAttribute="top" secondItem="category-selector" secondAttribute="bottom" constant="20" id="content-top"/>
                            <constraint firstItem="content-container" firstAttribute="bottom" secondItem="6Tk-OE-BBY" secondAttribute="bottom" id="content-bottom"/>
                        </constraints>
                    </view>
                    <navigationItem key="navigationItem" title="Design System Showcase" id="nav-item"/>
                    <connections>
                        <outlet property="categorySelector" destination="category-selector" id="category-outlet"/>
                        <outlet property="contentContainer" destination="content-container" id="content-outlet"/>
                    </connections>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="dkx-z0-nzr" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="20" y="84"/>
        </scene>
        
        <!--Content View Controller-->
        <scene sceneID="content-scene">
            <objects>
                <viewController id="content-vc" customClass="ContentViewController" customModule="AssassinDesignSystem" customModuleProvider="target" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="content-view">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="587"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="content-responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="20" y="800"/>
        </scene>
    </scenes>
    <resources>
        <systemColor name="secondaryLabelColor">
            <color red="0.23529411764705882" green="0.23529411764705882" blue="0.2627450980392157" alpha="0.59999999999999998" colorSpace="custom" customColorSpace="sRGB"/>
        </systemColor>
        <systemColor name="systemBackgroundColor">
            <color white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        </systemColor>
    </resources>
</document>`;
    }

    generateShowcaseStoryboard() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21678"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="System colors in document resources" minToolsVersion="11.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--Button Showcase-->
        <scene sceneID="button-scene">
            <objects>
                <viewController storyboardIdentifier="ButtonShowcase" id="button-vc" customClass="ButtonShowcaseViewController" customModule="AssassinDesignSystem" customModuleProvider="target" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="button-view">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <scrollView clipsSubviews="YES" multipleTouchEnabled="YES" contentMode="scaleToFill" translatesAutoresizingMaskIntoConstraints="NO" id="scroll-view">
                                <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                                <subviews>
                                    <stackView opaque="NO" contentMode="scaleToFill" axis="vertical" spacing="24" translatesAutoresizingMaskIntoConstraints="NO" id="main-stack">
                                        <rect key="frame" x="20" y="20" width="353" height="400"/>
                                        <subviews>
                                            <!-- Primary Buttons Section -->
                                            <view contentMode="scaleToFill" translatesAutoresizingMaskIntoConstraints="NO" id="primary-section">
                                                <rect key="frame" x="0.0" y="0.0" width="353" height="120"/>
                                                <subviews>
                                                    <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Primary Buttons" textAlignment="natural" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="primary-label">
                                                        <rect key="frame" x="16" y="16" width="321" height="20"/>
                                                        <fontDescription key="fontDescription" type="boldSystem" pointSize="16"/>
                                                        <color key="textColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                                        <nil key="highlightedColor"/>
                                                    </label>
                                                    <button opaque="NO" contentMode="scaleToFill" contentHorizontalAlignment="center" contentVerticalAlignment="center" buttonType="system" lineBreakMode="middleTruncation" translatesAutoresizingMaskIntoConstraints="NO" id="start-mission-btn">
                                                        <rect key="frame" x="16" y="44" width="321" height="44"/>
                                                        <color key="backgroundColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                                        <constraints>
                                                            <constraint firstAttribute="height" constant="44" id="start-height"/>
                                                        </constraints>
                                                        <fontDescription key="fontDescription" type="boldSystem" pointSize="16"/>
                                                        <inset key="titleEdgeInsets" minX="0.0" minY="0.0" maxX="0.0" maxY="0.0"/>
                                                        <state key="normal" title="Start Mission">
                                                            <color key="titleColor" white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
                                                        </state>
                                                        <userDefinedRuntimeAttributes>
                                                            <userDefinedRuntimeAttribute type="number" keyPath="layer.cornerRadius">
                                                                <integer key="value" value="8"/>
                                                            </userDefinedRuntimeAttribute>
                                                        </userDefinedRuntimeAttributes>
                                                        <connections>
                                                            <action selector="startMissionTapped:" destination="button-vc" eventType="touchUpInside" id="start-action"/>
                                                        </connections>
                                                    </button>
                                                </subviews>
                                                <color key="backgroundColor" white="0.0" alpha="0.05" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
                                                <constraints>
                                                    <constraint firstItem="primary-label" firstAttribute="leading" secondItem="primary-section" secondAttribute="leading" constant="16" id="primary-label-leading"/>
                                                    <constraint firstAttribute="trailing" secondItem="primary-label" secondAttribute="trailing" constant="16" id="primary-label-trailing"/>
                                                    <constraint firstItem="primary-label" firstAttribute="top" secondItem="primary-section" secondAttribute="top" constant="16" id="primary-label-top"/>
                                                    
                                                    <constraint firstItem="start-mission-btn" firstAttribute="leading" secondItem="primary-section" secondAttribute="leading" constant="16" id="start-leading"/>
                                                    <constraint firstAttribute="trailing" secondItem="start-mission-btn" secondAttribute="trailing" constant="16" id="start-trailing"/>
                                                    <constraint firstItem="start-mission-btn" firstAttribute="top" secondItem="primary-label" secondAttribute="bottom" constant="8" id="start-top"/>
                                                    <constraint firstAttribute="height" constant="120" id="primary-height"/>
                                                </constraints>
                                                <userDefinedRuntimeAttributes>
                                                    <userDefinedRuntimeAttribute type="number" keyPath="layer.cornerRadius">
                                                        <integer key="value" value="12"/>
                                                    </userDefinedRuntimeAttribute>
                                                </userDefinedRuntimeAttributes>
                                            </view>
                                        </subviews>
                                    </stackView>
                                </subviews>
                                <constraints>
                                    <constraint firstItem="main-stack" firstAttribute="leading" secondItem="scroll-view" secondAttribute="leading" constant="20" id="stack-leading"/>
                                    <constraint firstAttribute="trailing" secondItem="main-stack" secondAttribute="trailing" constant="20" id="stack-trailing"/>
                                    <constraint firstItem="main-stack" firstAttribute="top" secondItem="scroll-view" secondAttribute="top" constant="20" id="stack-top"/>
                                    <constraint firstAttribute="bottom" secondItem="main-stack" secondAttribute="bottom" constant="20" id="stack-bottom"/>
                                    <constraint firstItem="main-stack" firstAttribute="width" secondItem="scroll-view" secondAttribute="width" constant="-40" id="stack-width"/>
                                </constraints>
                            </scrollView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="button-safe-area"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                        <constraints>
                            <constraint firstItem="scroll-view" firstAttribute="leading" secondItem="button-safe-area" secondAttribute="leading" id="scroll-leading"/>
                            <constraint firstItem="scroll-view" firstAttribute="trailing" secondItem="button-safe-area" secondAttribute="trailing" id="scroll-trailing"/>
                            <constraint firstItem="scroll-view" firstAttribute="top" secondItem="button-view" secondAttribute="top" id="scroll-top"/>
                            <constraint firstItem="scroll-view" firstAttribute="bottom" secondItem="button-view" secondAttribute="bottom" id="scroll-bottom"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="button-responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="20" y="84"/>
        </scene>
    </scenes>
    <resources>
        <systemColor name="systemBackgroundColor">
            <color white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        </systemColor>
    </resources>
</document>`;
    }

    generateLaunchStoryboard() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21678"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" horizontalHuggingPriority="251" verticalHuggingPriority="251" image="assassin-logo" translatesAutoresizingMaskIntoConstraints="NO" id="logo-image">
                                <rect key="frame" x="146.5" y="376" width="100" height="100"/>
                                <constraints>
                                    <constraint firstAttribute="width" constant="100" id="logo-width"/>
                                    <constraint firstAttribute="height" constant="100" id="logo-height"/>
                                </constraints>
                            </imageView>
                            <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Assassin Design System" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="app-title">
                                <rect key="frame" x="20" y="496" width="353" height="29"/>
                                <fontDescription key="fontDescription" type="boldSystem" pointSize="24"/>
                                <color key="textColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                <nil key="highlightedColor"/>
                            </label>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="6Tk-OE-BBY"/>
                        <color key="backgroundColor" red="0.05" green="0.1" blue="0.2" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                        <constraints>
                            <constraint firstItem="logo-image" firstAttribute="centerX" secondItem="Ze5-6b-2t3" secondAttribute="centerX" id="logo-center-x"/>
                            <constraint firstItem="logo-image" firstAttribute="centerY" secondItem="Ze5-6b-2t3" secondAttribute="centerY" id="logo-center-y"/>
                            <constraint firstItem="app-title" firstAttribute="leading" secondItem="6Tk-OE-BBY" secondAttribute="leading" constant="20" id="title-leading"/>
                            <constraint firstItem="6Tk-OE-BBY" firstAttribute="trailing" secondItem="app-title" secondAttribute="trailing" constant="20" id="title-trailing"/>
                            <constraint firstItem="app-title" firstAttribute="top" secondItem="logo-image" secondAttribute="bottom" constant="20" id="title-top"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
    <resources>
        <image name="assassin-logo" width="100" height="100"/>
    </resources>
</document>`;
    }

    async generateSwiftUITemplates() {
        // SwiftUI Wrapper for Storyboard Integration
        const swiftUIWrapper = `import SwiftUI
import UIKit

/// SwiftUI wrapper for integrating with UIKit Storyboards
struct StoryboardIntegrationView: UIViewControllerRepresentable {
    let storyboardName: String
    let viewControllerIdentifier: String
    
    func makeUIViewController(context: Context) -> UIViewController {
        let storyboard = UIStoryboard(name: storyboardName, bundle: nil)
        return storyboard.instantiateViewController(withIdentifier: viewControllerIdentifier)
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
        // Update the view controller if needed
    }
}

/// SwiftUI view that embeds the design system showcase storyboard
struct DesignSystemStoryboardView: View {
    var body: some View {
        StoryboardIntegrationView(
            storyboardName: "Main",
            viewControllerIdentifier: "DesignSystemViewController"
        )
        .navigationTitle("Design System")
        .navigationBarHidden(true)
    }
}

/// Preview provider for the storyboard integration
struct DesignSystemStoryboardView_Previews: PreviewProvider {
    static var previews: some View {
        DesignSystemStoryboardView()
            .previewDevice("iPhone 15 Pro")
            .previewDisplayName("Storyboard Integration")
    }
}`;

        this.writeFile('Sources/DesignSystem/Previews/StoryboardIntegration.swift', swiftUIWrapper);

        // UIKit View Controllers
        const viewController = `import UIKit
import SwiftUI

/// Main design system showcase view controller
class DesignSystemViewController: UIViewController {
    @IBOutlet weak var categorySelector: UISegmentedControl!
    @IBOutlet weak var contentContainer: UIView!
    
    private var currentContentViewController: UIViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        showButtonShowcase()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor.systemBackground
        categorySelector.selectedSegmentTintColor = UIColor(red: 0.8, green: 0.1, blue: 0.1, alpha: 1.0)
    }
    
    @IBAction func categoryChanged(_ sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
        case 0:
            showButtonShowcase()
        case 1:
            showCardShowcase()
        case 2:
            showFormShowcase()
        case 3:
            showColorShowcase()
        default:
            break
        }
    }
    
    private func showButtonShowcase() {
        let storyboard = UIStoryboard(name: "ComponentShowcase", bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: "ButtonShowcase")
        showContentViewController(vc)
    }
    
    private func showCardShowcase() {
        // Create SwiftUI view and wrap in hosting controller
        let swiftUIView = CardsTab()
        let hostingController = UIHostingController(rootView: swiftUIView)
        showContentViewController(hostingController)
    }
    
    private func showFormShowcase() {
        let swiftUIView = FormsTab()
        let hostingController = UIHostingController(rootView: swiftUIView)
        showContentViewController(hostingController)
    }
    
    private func showColorShowcase() {
        let swiftUIView = ColorsTab()
        let hostingController = UIHostingController(rootView: swiftUIView)
        showContentViewController(hostingController)
    }
    
    private func showContentViewController(_ viewController: UIViewController) {
        // Remove current content
        currentContentViewController?.willMove(toParent: nil)
        currentContentViewController?.view.removeFromSuperview()
        currentContentViewController?.removeFromParent()
        
        // Add new content
        addChild(viewController)
        contentContainer.addSubview(viewController.view)
        viewController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            viewController.view.topAnchor.constraint(equalTo: contentContainer.topAnchor),
            viewController.view.leadingAnchor.constraint(equalTo: contentContainer.leadingAnchor),
            viewController.view.trailingAnchor.constraint(equalTo: contentContainer.trailingAnchor),
            viewController.view.bottomAnchor.constraint(equalTo: contentContainer.bottomAnchor)
        ])
        viewController.didMove(toParent: self)
        
        currentContentViewController = viewController
    }
}

/// Button showcase view controller
class ButtonShowcaseViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor.systemBackground
    }
    
    @IBAction func startMissionTapped(_ sender: UIButton) {
        let alert = UIAlertController(
            title: "Mission Started",
            message: "Operation Nightfall is now active",
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}`;

        this.writeFile('Sources/DesignSystem/ViewControllers.swift', viewController);
    }

    async generateProjectFile() {
        const projectFile = `// !$*UTF8*$!
{
    archiveVersion = 1;
    classes = {
    };
    objectVersion = 56;
    objects = {
        /* Begin PBXBuildFile section */
        /* End PBXBuildFile section */
        
        /* Begin PBXFileReference section */
        /* End PBXFileReference section */
        
        /* Begin PBXFrameworksBuildPhase section */
        /* End PBXFrameworksBuildPhase section */
        
        /* Begin PBXGroup section */
        /* End PBXGroup section */
        
        /* Begin PBXNativeTarget section */
        /* End PBXNativeTarget section */
        
        /* Begin PBXProject section */
        /* End PBXProject section */
        
        /* Begin PBXResourcesBuildPhase section */
        /* End PBXResourcesBuildPhase section */
        
        /* Begin PBXSourcesBuildPhase section */
        /* End PBXSourcesBuildPhase section */
        
        /* Begin XCBuildConfiguration section */
        /* End XCBuildConfiguration section */
        
        /* Begin XCConfigurationList section */
        /* End XCConfigurationList section */
    };
    rootObject = "Project Root";
}`;

        this.writeFile('AssassinDesignSystem.xcodeproj/project.pbxproj', projectFile);
    }

    async generateInfoPlist() {
        const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>Assassin Design System</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>${this.bundleId}</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UIApplicationSceneManifest</key>
    <dict>
        <key>UIApplicationSupportsMultipleScenes</key>
        <false/>
        <key>UISceneConfigurations</key>
        <dict>
            <key>UIWindowSceneSessionRoleApplication</key>
            <array>
                <dict>
                    <key>UISceneConfigurationName</key>
                    <string>Default Configuration</string>
                    <key>UISceneDelegateClassName</key>
                    <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
                    <key>UISceneStoryboardFile</key>
                    <string>Main</string>
                </dict>
            </array>
        </dict>
    </dict>
    <key>UIApplicationSupportsIndirectInputEvents</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIMainStoryboardFile</key>
    <string>Main</string>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
</dict>
</plist>`;

        this.writeFile('Resources/Info.plist', infoPlist);
    }

    async generateSchemes() {
        const scheme = `<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1500"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "AssassinDesignSystem"
               BuildableName = "AssassinDesignSystem.app"
               BlueprintName = "AssassinDesignSystem"
               ReferencedContainer = "container:AssassinDesignSystem.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      codeCoverageEnabled = "YES">
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "AssassinDesignSystem"
            BuildableName = "AssassinDesignSystem.app"
            BlueprintName = "AssassinDesignSystem"
            ReferencedContainer = "container:AssassinDesignSystem.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
</Scheme>`;

        this.ensureDirectory(path.join(this.outputDir, 'AssassinDesignSystem.xcodeproj/xcshareddata/xcschemes'));
        this.writeFile('AssassinDesignSystem.xcodeproj/xcshareddata/xcschemes/AssassinDesignSystem.xcscheme', scheme);
    }

    ensureDirectory(dirPath) {
        const fullPath = path.resolve(dirPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    }

    writeFile(relativePath, content) {
        const fullPath = path.join(this.outputDir, relativePath);
        this.ensureDirectory(path.dirname(fullPath));
        fs.writeFileSync(fullPath, content, 'utf8');
    }
}

// CLI execution
if (require.main === module) {
    const generator = new XcodeProjectGenerator();
    generator.generateProject().catch(console.error);
}

module.exports = XcodeProjectGenerator; 