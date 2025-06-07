#!/usr/bin/env node

/**
 * Figma to Storyboard Bridge
 * Converts Figma designs into Xcode storyboard XML and Auto Layout constraints
 */

const fs = require('fs');
const path = require('path');

class FigmaToStoryboardBridge {
    constructor() {
        this.outputDir = './storyboard-output';
    }

    async convertFigmaToStoryboard() {
        console.log('🎯 Converting Figma designs to Storyboard...');
        
        this.ensureDirectory(this.outputDir);
        
        const sampleStoryboard = this.createSampleStoryboardXML();
        const constraintHelpers = this.generateConstraintHelpers();
        const viewController = this.generateSampleViewController();
        
        this.writeFile('Sample.storyboard', sampleStoryboard);
        this.writeFile('ConstraintHelpers.swift', constraintHelpers);
        this.writeFile('SampleViewController.swift', viewController);
        
        console.log('✅ Sample storyboard generated!');
        console.log(`📁 Output directory: ${this.outputDir}`);
    }

    createSampleStoryboardXML() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21701" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="main-vc">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21678"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="System colors in document resources" minToolsVersion="11.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--Assassin Design System-->
        <scene sceneID="main-scene">
            <objects>
                <viewController id="main-vc" customClass="AssassinDesignViewController" customModule="AssassinDesignSystem" customModuleProvider="target" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="main-view">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Assassin Design System" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="title-label">
                                <rect key="frame" x="20" y="79" width="353" height="36"/>
                                <fontDescription key="fontDescription" type="boldSystem" pointSize="30"/>
                                <color key="textColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                <nil key="highlightedColor"/>
                            </label>
                            
                            <button opaque="NO" contentMode="scaleToFill" contentHorizontalAlignment="center" contentVerticalAlignment="center" buttonType="system" lineBreakMode="middleTruncation" translatesAutoresizingMaskIntoConstraints="NO" id="primary-button">
                                <rect key="frame" x="40" y="155" width="313" height="50"/>
                                <color key="backgroundColor" red="0.8" green="0.1" blue="0.1" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
                                <constraints>
                                    <constraint firstAttribute="height" constant="50" id="primary-height"/>
                                </constraints>
                                <fontDescription key="fontDescription" type="boldSystem" pointSize="18"/>
                                <state key="normal" title="Start Mission">
                                    <color key="titleColor" white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
                                </state>
                                <userDefinedRuntimeAttributes>
                                    <userDefinedRuntimeAttribute type="number" keyPath="layer.cornerRadius">
                                        <integer key="value" value="12"/>
                                    </userDefinedRuntimeAttribute>
                                </userDefinedRuntimeAttributes>
                                <connections>
                                    <action selector="startMissionTapped:" destination="main-vc" eventType="touchUpInside" id="primary-action"/>
                                </connections>
                            </button>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="main-safe-area"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                        <constraints>
                            <constraint firstItem="title-label" firstAttribute="leading" secondItem="main-safe-area" secondAttribute="leading" constant="20" id="title-leading"/>
                            <constraint firstItem="title-label" firstAttribute="trailing" secondItem="main-safe-area" secondAttribute="trailing" constant="-20" id="title-trailing"/>
                            <constraint firstItem="title-label" firstAttribute="top" secondItem="main-safe-area" secondAttribute="top" constant="20" id="title-top"/>
                            
                            <constraint firstItem="primary-button" firstAttribute="leading" secondItem="main-safe-area" secondAttribute="leading" constant="40" id="primary-leading"/>
                            <constraint firstItem="primary-button" firstAttribute="trailing" secondItem="main-safe-area" secondAttribute="trailing" constant="-40" id="primary-trailing"/>
                            <constraint firstItem="primary-button" firstAttribute="top" secondItem="title-label" secondAttribute="bottom" constant="40" id="primary-top"/>
                        </constraints>
                    </view>
                    <navigationItem key="navigationItem" title="Assassin Design System" id="main-nav-item"/>
                    <connections>
                        <outlet property="titleLabel" destination="title-label" id="title-outlet"/>
                        <outlet property="primaryButton" destination="primary-button" id="primary-outlet"/>
                    </connections>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="main-responder" sceneMemberID="firstResponder"/>
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

    generateSampleViewController() {
        return `import UIKit

class AssassinDesignViewController: UIViewController {
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var primaryButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor.systemBackground
        titleLabel.textColor = UIColor(red: 0.8, green: 0.1, blue: 0.1, alpha: 1.0)
        primaryButton.backgroundColor = UIColor(red: 0.8, green: 0.1, blue: 0.1, alpha: 1.0)
    }
    
    @IBAction func startMissionTapped(_ sender: UIButton) {
        let alert = UIAlertController(title: "Mission Started", message: "Operation Nightfall is active", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}`;
    }

    generateConstraintHelpers() {
        return `import UIKit

extension UIColor {
    static let assassinRed = UIColor(red: 0.8, green: 0.1, blue: 0.1, alpha: 1.0)
    static let tacticalBlue = UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0)
    static let electricGreen = UIColor(red: 0.0, green: 0.8, blue: 0.4, alpha: 1.0)
    static let deepNavy = UIColor(red: 0.05, green: 0.1, blue: 0.2, alpha: 1.0)
}`;
    }

    ensureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    writeFile(filename, content) {
        const fullPath = path.join(this.outputDir, filename);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`📝 Generated: ${filename}`);
    }
}

if (require.main === module) {
    const bridge = new FigmaToStoryboardBridge();
    bridge.convertFigmaToStoryboard().catch(console.error);
}

module.exports = FigmaToStoryboardBridge; 