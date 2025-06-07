#!/usr/bin/env node

/**
 * Advanced Figma Component Analyzer
 * Analyzes Figma components and generates SwiftUI code with design patterns
 */

const fs = require('fs');
const path = require('path');

class FigmaComponentAnalyzer {
    constructor() {
        this.figmaApiKey = process.env.FIGMA_API_KEY;
        this.fileKey = process.env.FIGMA_FILE_KEY;
        this.outputDir = './generated-components';
        this.designPatterns = new Map();
        this.componentLibrary = new Map();
    }

    async analyzeAndGenerate() {
        console.log('🔍 Analyzing Figma components and generating SwiftUI code...');
        
        try {
            // Analyze Figma file
            const analysis = await this.analyzeFigmaFile();
            
            // Generate SwiftUI components
            await this.generateSwiftUIComponents(analysis);
            
            // Generate design pattern documentation
            await this.generatePatternDocumentation(analysis);
            
            // Generate component tests
            await this.generateComponentTests(analysis);
            
            console.log('✅ Component analysis and generation complete!');
            console.log(`📁 Output directory: ${this.outputDir}`);
            
        } catch (error) {
            console.log('⚠️  Figma API not available, generating sample components...');
            await this.generateSampleComponents();
        }
    }

    async analyzeFigmaFile() {
        if (!this.figmaApiKey || !this.fileKey) {
            throw new Error('Figma API credentials not available');
        }

        const response = await fetch(`https://api.figma.com/v1/files/${this.fileKey}`, {
            headers: { 'X-Figma-Token': this.figmaApiKey }
        });

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status}`);
        }

        const data = await response.json();
        return this.analyzeComponents(data);
    }

    analyzeComponents(figmaData) {
        const analysis = {
            components: [],
            patterns: [],
            colorTokens: [],
            typographyTokens: [],
            spacingTokens: []
        };

        // Extract components from Figma data
        this.extractComponents(figmaData.document, analysis);
        
        // Analyze design patterns
        this.analyzeDesignPatterns(analysis);
        
        return analysis;
    }

    extractComponents(node, analysis, depth = 0) {
        if (!node) return;

        // Check if this is a component
        if (node.type === 'COMPONENT') {
            const component = this.analyzeComponent(node);
            analysis.components.push(component);
        }

        // Extract design tokens
        if (node.fills) {
            this.extractColorTokens(node.fills, analysis.colorTokens);
        }

        if (node.style) {
            this.extractTypographyTokens(node.style, analysis.typographyTokens);
        }

        // Recursively analyze children
        if (node.children) {
            node.children.forEach(child => {
                this.extractComponents(child, analysis, depth + 1);
            });
        }
    }

    analyzeComponent(node) {
        return {
            id: node.id,
            name: node.name,
            type: this.determineComponentType(node),
            properties: this.extractComponentProperties(node),
            variants: this.extractVariants(node),
            layout: this.analyzeLayout(node),
            interactions: this.extractInteractions(node),
            accessibility: this.analyzeAccessibility(node)
        };
    }

    determineComponentType(node) {
        const name = node.name.toLowerCase();
        
        if (name.includes('button')) return 'Button';
        if (name.includes('card')) return 'Card';
        if (name.includes('input') || name.includes('field')) return 'TextField';
        if (name.includes('modal') || name.includes('dialog')) return 'Modal';
        if (name.includes('navigation') || name.includes('nav')) return 'Navigation';
        if (name.includes('tab')) return 'TabView';
        if (name.includes('list')) return 'List';
        if (name.includes('header')) return 'Header';
        if (name.includes('footer')) return 'Footer';
        
        return 'CustomView';
    }

    async generateSwiftUIComponents(analysis) {
        this.ensureDirectory(this.outputDir);
        
        for (const component of analysis.components) {
            const swiftUICode = this.generateSwiftUICode(component);
            const filename = `${component.name.replace(/[^a-zA-Z0-9]/g, '')}.swift`;
            this.writeFile(filename, swiftUICode);
        }

        // Generate component library index
        const libraryIndex = this.generateComponentLibraryIndex(analysis.components);
        this.writeFile('ComponentLibrary.swift', libraryIndex);
    }

    generateSwiftUICode(component) {
        switch (component.type) {
            case 'Button':
                return this.generateButtonComponent(component);
            case 'Card':
                return this.generateCardComponent(component);
            case 'TextField':
                return this.generateTextFieldComponent(component);
            case 'Modal':
                return this.generateModalComponent(component);
            case 'Navigation':
                return this.generateNavigationComponent(component);
            default:
                return this.generateCustomComponent(component);
        }
    }

    generateButtonComponent(component) {
        const componentName = this.sanitizeComponentName(component.name);
        
        return `import SwiftUI

/// ${component.name} - Auto-generated from Figma
/// Tactical button component for mission-critical actions
struct ${componentName}: View {
    let title: String
    let action: () -> Void
    var style: ButtonStyle = .primary
    var size: ButtonSize = .regular
    var isEnabled: Bool = true
    var isLoading: Bool = false
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .scaleEffect(0.8)
                        .foregroundColor(textColor)
                }
                
                Text(title)
                    .font(buttonFont)
                    .fontWeight(.semibold)
                
                if style == .withIcon {
                    Image(systemName: "arrow.right")
                        .font(.system(size: 14, weight: .semibold))
                }
            }
            .foregroundColor(textColor)
            .padding(.horizontal, horizontalPadding)
            .padding(.vertical, verticalPadding)
            .background(backgroundColor)
            .cornerRadius(cornerRadius)
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(borderColor, lineWidth: borderWidth)
            )
            .shadow(color: shadowColor, radius: shadowRadius, x: 0, y: shadowOffset)
        }
        .disabled(!isEnabled || isLoading)
        .scaleEffect(isEnabled ? 1.0 : 0.95)
        .opacity(isEnabled ? 1.0 : 0.6)
        .animation(.easeInOut(duration: 0.2), value: isEnabled)
        .accessibilityLabel(title)
        .accessibilityHint("Tap to \\(title.lowercased())")
        .accessibilityAddTraits(isEnabled ? [] : .notEnabled)
    }
    
    // MARK: - Style Properties
    
    private var backgroundColor: Color {
        switch style {
        case .primary:
            return Color.assassinRed
        case .secondary:
            return Color.clear
        case .danger:
            return Color.red
        case .success:
            return Color.electricGreen
        case .withIcon:
            return Color.tacticalBlue
        }
    }
    
    private var textColor: Color {
        switch style {
        case .primary, .danger, .success, .withIcon:
            return .white
        case .secondary:
            return .tacticalBlue
        }
    }
    
    private var borderColor: Color {
        switch style {
        case .secondary:
            return .tacticalBlue
        default:
            return .clear
        }
    }
    
    private var borderWidth: CGFloat {
        style == .secondary ? 2 : 0
    }
    
    private var buttonFont: Font {
        switch size {
        case .small:
            return .system(size: 14, weight: .medium)
        case .regular:
            return .system(size: 16, weight: .medium)
        case .large:
            return .system(size: 18, weight: .semibold)
        }
    }
    
    private var horizontalPadding: CGFloat {
        switch size {
        case .small: return 12
        case .regular: return 16
        case .large: return 20
        }
    }
    
    private var verticalPadding: CGFloat {
        switch size {
        case .small: return 8
        case .regular: return 12
        case .large: return 16
        }
    }
    
    private var cornerRadius: CGFloat {
        switch size {
        case .small: return 6
        case .regular: return 8
        case .large: return 12
        }
    }
    
    private var shadowColor: Color {
        Color.black.opacity(0.1)
    }
    
    private var shadowRadius: CGFloat {
        4
    }
    
    private var shadowOffset: CGFloat {
        2
    }
}

// MARK: - Supporting Types

extension ${componentName} {
    enum ButtonStyle {
        case primary
        case secondary
        case danger
        case success
        case withIcon
    }
    
    enum ButtonSize {
        case small
        case regular
        case large
    }
}

// MARK: - Convenience Initializers

extension ${componentName} {
    static func primary(_ title: String, action: @escaping () -> Void) -> ${componentName} {
        ${componentName}(title: title, action: action, style: .primary)
    }
    
    static func secondary(_ title: String, action: @escaping () -> Void) -> ${componentName} {
        ${componentName}(title: title, action: action, style: .secondary)
    }
    
    static func danger(_ title: String, action: @escaping () -> Void) -> ${componentName} {
        ${componentName}(title: title, action: action, style: .danger)
    }
}

// MARK: - Preview

struct ${componentName}_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 20) {
            ${componentName}.primary("Start Mission") {
                print("Mission started")
            }
            
            ${componentName}.secondary("View Details") {
                print("Details viewed")
            }
            
            ${componentName}.danger("Abort Mission") {
                print("Mission aborted")
            }
            
            ${componentName}(
                title: "Loading...",
                action: {},
                style: .primary,
                isLoading: true
            )
            
            ${componentName}(
                title: "Disabled",
                action: {},
                style: .primary,
                isEnabled: false
            )
        }
        .padding()
        .background(Color.deepNavy)
        .previewDisplayName("${component.name} Variants")
    }
}`;
    }

    generateCardComponent(component) {
        const componentName = this.sanitizeComponentName(component.name);
        
        return `import SwiftUI

/// ${component.name} - Auto-generated from Figma
/// Tactical card component for displaying mission information
struct ${componentName}: View {
    let title: String
    let subtitle: String?
    let status: String?
    let priority: Priority
    let action: (() -> Void)?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                    
                    if let subtitle = subtitle {
                        Text(subtitle)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
                
                if let status = status {
                    StatusBadge(status: status, priority: priority)
                }
            }
            
            // Priority Indicator
            HStack {
                PriorityIndicator(priority: priority)
                
                Spacer()
                
                if action != nil {
                    Button("View Details") {
                        action?()
                    }
                    .font(.caption)
                    .foregroundColor(.tacticalBlue)
                }
            }
        }
        .padding(16)
        .background(Color.secondarySystemBackground)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(borderColor, lineWidth: 1)
        )
        .onTapGesture {
            action?()
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\\(title)\\(subtitle != nil ? ", \\(subtitle!)" : "")\\(status != nil ? ", Status: \\(status!)" : "")")
        .accessibilityHint("Tap for more details")
    }
    
    private var borderColor: Color {
        switch priority {
        case .high:
            return Color.assassinRed.opacity(0.3)
        case .medium:
            return Color.systemOrange.opacity(0.3)
        case .low:
            return Color.electricGreen.opacity(0.3)
        }
    }
}

// MARK: - Supporting Views

struct StatusBadge: View {
    let status: String
    let priority: ${componentName}.Priority
    
    var body: some View {
        Text(status)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(badgeColor.opacity(0.2))
            .foregroundColor(badgeColor)
            .cornerRadius(4)
    }
    
    private var badgeColor: Color {
        switch priority {
        case .high:
            return .assassinRed
        case .medium:
            return .systemOrange
        case .low:
            return .electricGreen
        }
    }
}

struct PriorityIndicator: View {
    let priority: ${componentName}.Priority
    
    var body: some View {
        HStack(spacing: 4) {
            Circle()
                .fill(priorityColor)
                .frame(width: 8, height: 8)
            
            Text(priority.rawValue.capitalized)
                .font(.caption)
                .foregroundColor(priorityColor)
        }
    }
    
    private var priorityColor: Color {
        switch priority {
        case .high:
            return .assassinRed
        case .medium:
            return .systemOrange
        case .low:
            return .electricGreen
        }
    }
}

// MARK: - Supporting Types

extension ${componentName} {
    enum Priority: String, CaseIterable {
        case high = "high"
        case medium = "medium"
        case low = "low"
    }
}

// MARK: - Convenience Initializers

extension ${componentName} {
    static func mission(
        title: String,
        subtitle: String,
        status: String,
        priority: Priority,
        action: @escaping () -> Void
    ) -> ${componentName} {
        ${componentName}(
            title: title,
            subtitle: subtitle,
            status: status,
            priority: priority,
            action: action
        )
    }
    
    static func target(
        name: String,
        location: String,
        threat: Priority,
        action: @escaping () -> Void
    ) -> ${componentName} {
        ${componentName}(
            title: name,
            subtitle: location,
            status: "Active",
            priority: threat,
            action: action
        )
    }
}

// MARK: - Preview

struct ${componentName}_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 16) {
            ${componentName}.mission(
                title: "Operation Nightfall",
                subtitle: "Infiltrate enemy base and retrieve classified documents",
                status: "Active",
                priority: .high
            ) {
                print("Mission selected")
            }
            
            ${componentName}.target(
                name: "Agent Smith",
                location: "Downtown Plaza",
                threat: .medium
            ) {
                print("Target selected")
            }
            
            ${componentName}(
                title: "Stealth Reconnaissance",
                subtitle: "Gather intelligence on target movements",
                status: "Pending",
                priority: .low,
                action: nil
            )
        }
        .padding()
        .background(Color.deepNavy)
        .previewDisplayName("${component.name} Variants")
    }
}`;
    }

    generateTextFieldComponent(component) {
        const componentName = this.sanitizeComponentName(component.name);
        
        return `import SwiftUI

/// ${component.name} - Auto-generated from Figma
/// Tactical text field component for secure data input
struct ${componentName}: View {
    @Binding var text: String
    let placeholder: String
    let label: String?
    var isSecure: Bool = false
    var validationState: ValidationState = .none
    var validationMessage: String?
    var isRequired: Bool = false
    
    @FocusState private var isFocused: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Label
            if let label = label {
                HStack {
                    Text(label)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(labelColor)
                    
                    if isRequired {
                        Text("*")
                            .font(.caption)
                            .foregroundColor(.assassinRed)
                    }
                }
            }
            
            // Text Field
            Group {
                if isSecure {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .focused($isFocused)
            .font(.body)
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(backgroundColor)
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(borderColor, lineWidth: borderWidth)
            )
            .animation(.easeInOut(duration: 0.2), value: validationState)
            
            // Validation Message
            if let validationMessage = validationMessage, validationState != .none {
                HStack(spacing: 4) {
                    Image(systemName: validationIcon)
                        .font(.caption)
                        .foregroundColor(validationColor)
                    
                    Text(validationMessage)
                        .font(.caption)
                        .foregroundColor(validationColor)
                }
                .transition(.opacity)
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityHint(accessibilityHint)
    }
    
    // MARK: - Style Properties
    
    private var backgroundColor: Color {
        isFocused ? Color.systemBackground : Color.secondarySystemBackground
    }
    
    private var borderColor: Color {
        switch validationState {
        case .valid:
            return .electricGreen
        case .invalid:
            return .assassinRed
        case .warning:
            return .systemOrange
        case .none:
            return isFocused ? .tacticalBlue : .gray.opacity(0.3)
        }
    }
    
    private var borderWidth: CGFloat {
        validationState != .none || isFocused ? 2 : 1
    }
    
    private var labelColor: Color {
        switch validationState {
        case .valid:
            return .electricGreen
        case .invalid:
            return .assassinRed
        case .warning:
            return .systemOrange
        case .none:
            return .primary
        }
    }
    
    private var validationColor: Color {
        switch validationState {
        case .valid:
            return .electricGreen
        case .invalid:
            return .assassinRed
        case .warning:
            return .systemOrange
        case .none:
            return .clear
        }
    }
    
    private var validationIcon: String {
        switch validationState {
        case .valid:
            return "checkmark.circle.fill"
        case .invalid:
            return "exclamationmark.circle.fill"
        case .warning:
            return "exclamationmark.triangle.fill"
        case .none:
            return ""
        }
    }
    
    private var accessibilityLabel: String {
        if let label = label {
            return "\\(label)\\(isRequired ? ", required" : "")"
        }
        return placeholder
    }
    
    private var accessibilityHint: String {
        if isSecure {
            return "Secure text field"
        }
        return "Text field"
    }
}

// MARK: - Supporting Types

extension ${componentName} {
    enum ValidationState {
        case none
        case valid
        case invalid
        case warning
    }
}

// MARK: - Convenience Initializers

extension ${componentName} {
    static func username(_ text: Binding<String>) -> ${componentName} {
        ${componentName}(
            text: text,
            placeholder: "Enter your agent codename",
            label: "Agent Username",
            isRequired: true
        )
    }
    
    static func password(_ text: Binding<String>) -> ${componentName} {
        ${componentName}(
            text: text,
            placeholder: "Enter secure password",
            label: "Password",
            isSecure: true,
            isRequired: true
        )
    }
    
    static func missionCode(_ text: Binding<String>) -> ${componentName} {
        ${componentName}(
            text: text,
            placeholder: "Enter mission code",
            label: "Mission Code",
            isRequired: true
        )
    }
}

// MARK: - Preview

struct ${componentName}_Previews: PreviewProvider {
    @State static var username = ""
    @State static var password = ""
    @State static var email = "valid@email.com"
    @State static var invalidEmail = "invalid-email"
    
    static var previews: some View {
        VStack(spacing: 20) {
            ${componentName}.username($username)
            
            ${componentName}.password($password)
            
            ${componentName}(
                text: $email,
                placeholder: "Enter email",
                label: "Email Address",
                validationState: .valid,
                validationMessage: "Email is valid"
            )
            
            ${componentName}(
                text: $invalidEmail,
                placeholder: "Enter email",
                label: "Email Address",
                validationState: .invalid,
                validationMessage: "Please enter a valid email address"
            )
        }
        .padding()
        .background(Color.deepNavy)
        .previewDisplayName("${component.name} Variants")
    }
}`;
    }

    generateCustomComponent(component) {
        const componentName = this.sanitizeComponentName(component.name);
        
        return `import SwiftUI

/// ${component.name} - Auto-generated from Figma
/// Custom tactical component for specialized functionality
struct ${componentName}: View {
    // Add your custom properties here
    
    var body: some View {
        VStack {
            Text("${component.name}")
                .font(.headline)
                .foregroundColor(.primary)
            
            Text("Custom component generated from Figma")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color.secondarySystemBackground)
        .cornerRadius(8)
    }
}

// MARK: - Preview

struct ${componentName}_Previews: PreviewProvider {
    static var previews: some View {
        ${componentName}()
            .padding()
            .background(Color.deepNavy)
            .previewDisplayName("${component.name}")
    }
}`;
    }

    async generateSampleComponents() {
        console.log('📝 Generating sample tactical components...');
        
        this.ensureDirectory(this.outputDir);
        
        const sampleComponents = [
            {
                name: 'TacticalButton',
                type: 'Button',
                properties: { style: 'primary', size: 'regular' }
            },
            {
                name: 'MissionCard',
                type: 'Card',
                properties: { priority: 'high', status: 'active' }
            },
            {
                name: 'SecureTextField',
                type: 'TextField',
                properties: { isSecure: true, validation: true }
            }
        ];

        for (const component of sampleComponents) {
            const swiftUICode = this.generateSwiftUICode(component);
            this.writeFile(`${component.name}.swift`, swiftUICode);
        }

        // Generate component library
        const libraryIndex = this.generateComponentLibraryIndex(sampleComponents);
        this.writeFile('ComponentLibrary.swift', libraryIndex);
        
        console.log('✅ Sample components generated!');
    }

    generateComponentLibraryIndex(components) {
        const componentNames = components.map(c => this.sanitizeComponentName(c.name));
        
        return `import SwiftUI

/// Component Library - Auto-generated from Figma
/// Central registry of all tactical design system components
struct ComponentLibrary {
    
    // MARK: - Component Registry
    
    static let components: [ComponentInfo] = [
${components.map(c => `        ComponentInfo(
            name: "${c.name}",
            type: "${c.type}",
            description: "Tactical ${c.type.toLowerCase()} component for mission-critical interfaces"
        )`).join(',\n')}
    ]
    
    // MARK: - Quick Access
    
    struct Buttons {
${componentNames.filter((_, i) => components[i].type === 'Button').map(name => 
`        static func ${name.toLowerCase()}(_ title: String, action: @escaping () -> Void) -> ${name} {
            ${name}(title: title, action: action)
        }`).join('\n')}
    }
    
    struct Cards {
${componentNames.filter((_, i) => components[i].type === 'Card').map(name => 
`        static func ${name.toLowerCase()}(title: String, subtitle: String) -> ${name} {
            ${name}(title: title, subtitle: subtitle, status: nil, priority: .medium, action: nil)
        }`).join('\n')}
    }
    
    struct TextFields {
${componentNames.filter((_, i) => components[i].type === 'TextField').map(name => 
`        static func ${name.toLowerCase()}(_ text: Binding<String>, placeholder: String) -> ${name} {
            ${name}(text: text, placeholder: placeholder, label: nil)
        }`).join('\n')}
    }
}

// MARK: - Component Info

struct ComponentInfo: Identifiable {
    let id = UUID()
    let name: String
    let type: String
    let description: String
}

// MARK: - Component Showcase

struct ComponentLibraryShowcase: View {
    var body: some View {
        NavigationView {
            List {
                Section("Available Components") {
                    ForEach(ComponentLibrary.components) { component in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(component.name)
                                .font(.headline)
                                .foregroundColor(.primary)
                            
                            Text(component.type)
                                .font(.caption)
                                .foregroundColor(.tacticalBlue)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(Color.tacticalBlue.opacity(0.1))
                                .cornerRadius(4)
                            
                            Text(component.description)
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .navigationTitle("Component Library")
        }
    }
}

// MARK: - Preview

struct ComponentLibrary_Previews: PreviewProvider {
    static var previews: some View {
        ComponentLibraryShowcase()
            .previewDisplayName("Component Library")
    }
}`;
    }

    sanitizeComponentName(name) {
        return name
            .replace(/[^a-zA-Z0-9]/g, '')
            .replace(/^./, str => str.toUpperCase());
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

// CLI execution
if (require.main === module) {
    const analyzer = new FigmaComponentAnalyzer();
    analyzer.analyzeAndGenerate().catch(console.error);
}

module.exports = FigmaComponentAnalyzer;