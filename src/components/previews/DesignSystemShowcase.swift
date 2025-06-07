import SwiftUI

/// Design System Showcase - Visual Storyboard for All Components
/// This acts as a comprehensive preview/storyboard for the entire design system
struct DesignSystemShowcase: View {
    @State private var selectedCategory: ComponentCategory = .buttons
    @State private var selectedVariant: String = "default"
    @State private var isDarkMode: Bool = false
    
    var body: some View {
        NavigationView {
            // Sidebar with component categories
            List {
                ForEach(ComponentCategory.allCases, id: \.self) { category in
                    NavigationLink(
                        destination: CategoryDetailView(category: category)
                    ) {
                        Label(category.displayName, systemImage: category.icon)
                            .foregroundColor(Color.red)
                    }
                }
                
                Section("Settings") {
                    Toggle("Dark Mode", isOn: $isDarkMode)
                        .toggleStyle(SwitchToggleStyle(tint: Color.red))
                }
            }
            .listStyle(SidebarListStyle())
            .navigationTitle("Design System")
            
            // Main content area
            CategoryDetailView(category: selectedCategory)
                .preferredColorScheme(isDarkMode ? .dark : .light)
        }
        .navigationViewStyle(DoubleColumnNavigationViewStyle())
    }
}

enum ComponentCategory: String, CaseIterable {
    case buttons = "buttons"
    case cards = "cards"
    case forms = "forms"
    case navigation = "navigation"
    case notifications = "notifications"
    case maps = "maps"
    case tokens = "tokens"
    
    var displayName: String {
        switch self {
        case .buttons: return "Buttons"
        case .cards: return "Cards"
        case .forms: return "Forms"
        case .navigation: return "Navigation"
        case .notifications: return "Notifications"
        case .maps: return "Maps"
        case .tokens: return "Design Tokens"
        }
    }
    
    var icon: String {
        switch self {
        case .buttons: return "button.programmable"
        case .cards: return "rectangle.stack"
        case .forms: return "textformat"
        case .navigation: return "list.bullet"
        case .notifications: return "bell"
        case .maps: return "map"
        case .tokens: return "paintpalette"
        }
    }
}

struct CategoryDetailView: View {
    let category: ComponentCategory
    @State private var selectedDevice: DeviceType = .iPhone15Pro
    @State private var selectedOrientation: Orientation = .portrait
    
    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header with device selection
                HeaderView(
                    category: category,
                    selectedDevice: $selectedDevice,
                    selectedOrientation: $selectedOrientation
                )
                
                // Component showcase based on category
                switch category {
                case .buttons:
                    ButtonShowcase()
                case .cards:
                    CardShowcase()
                case .forms:
                    FormShowcase()
                case .navigation:
                    NavigationShowcase()
                case .notifications:
                    NotificationShowcase()
                case .maps:
                    MapShowcase()
                case .tokens:
                    TokenShowcase()
                }
            }
            .padding()
        }
        .navigationTitle(category.displayName)
        .frame(
            width: selectedDevice.screenSize.width,
            height: selectedOrientation == .portrait ? 
                selectedDevice.screenSize.height : 
                selectedDevice.screenSize.width
        )
        .background(Color.blue.opacity(0.05))
    }
}

struct HeaderView: View {
    let category: ComponentCategory
    @Binding var selectedDevice: DeviceType
    @Binding var selectedOrientation: Orientation
    
    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Text(category.displayName)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(Color.red)
                
                Spacer()
                
                // Device selector
                Menu {
                    ForEach(DeviceType.allCases, id: \.self) { device in
                        Button(device.displayName) {
                            selectedDevice = device
                        }
                    }
                } label: {
                    HStack {
                        Image(systemName: selectedDevice.icon)
                        Text(selectedDevice.displayName)
                    }
                    .foregroundColor(Color.blue)
                }
                
                // Orientation selector
                Menu {
                    ForEach(Orientation.allCases, id: \.self) { orientation in
                        Button(orientation.displayName) {
                            selectedOrientation = orientation
                        }
                    }
                } label: {
                    Image(systemName: selectedOrientation.icon)
                        .foregroundColor(Color.blue)
                }
            }
            
            Text("Interactive preview of \(category.displayName.lowercased()) components")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
}

// MARK: - Component Showcases

struct ButtonShowcase: View {
    var body: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 24) {
            
            ShowcaseCard(title: "Primary Buttons") {
                VStack(spacing: 12) {
                    Button("Start Mission") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                    
                    Button("Accept Target") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                        .controlSize(.regular)
                    
                    Button("Quick Action") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                        .controlSize(.small)
                }
            }
            
            ShowcaseCard(title: "Secondary Buttons") {
                VStack(spacing: 12) {
                    Button("View Details") {}
                        .buttonStyle(.bordered)
                        .tint(.blue)
                    
                    Button("Cancel") {}
                        .buttonStyle(.bordered)
                        .tint(.blue)
                }
            }
            
            ShowcaseCard(title: "Danger Buttons") {
                VStack(spacing: 12) {
                    Button("Eliminate Target") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                    
                    Button("Abort Mission") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                }
            }
            
            ShowcaseCard(title: "Button States") {
                VStack(spacing: 12) {
                    Button("Normal State") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                    
                    Button("Loading...") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                        .disabled(true)
                    
                    Button("Disabled") {}
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                        .disabled(true)
                }
            }
        }
    }
}

struct CardShowcase: View {
    var body: some View {
        LazyVGrid(columns: [GridItem(.flexible())], spacing: 24) {
            
            ShowcaseCard(title: "Mission Cards") {
                VStack(spacing: 16) {
                    MissionCardPreview(
                        title: "Operation Nightfall",
                        description: "Infiltrate the enemy base and retrieve classified documents",
                        status: "Active",
                        priority: "High",
                        timeRemaining: "2h 45m"
                    )
                    
                    MissionCardPreview(
                        title: "Stealth Reconnaissance",
                        description: "Gather intelligence on target movements",
                        status: "Pending",
                        priority: "Medium",
                        timeRemaining: "6h 12m"
                    )
                }
            }
            
            ShowcaseCard(title: "Target Cards") {
                VStack(spacing: 16) {
                    TargetCardPreview(
                        name: "Agent Smith",
                        codename: "The Architect",
                        location: "Downtown Plaza",
                        threat: "High",
                        distance: "0.3 km",
                        lastSeen: "5 min ago"
                    )
                    
                    TargetCardPreview(
                        name: "Jane Doe",
                        codename: "Ghost",
                        location: "University Campus",
                        threat: "Medium",
                        distance: "1.2 km",
                        lastSeen: "15 min ago"
                    )
                }
            }
        }
    }
}

struct FormShowcase: View {
    @State private var username = ""
    @State private var password = ""
    @State private var missionCode = ""
    
    var body: some View {
        LazyVGrid(columns: [GridItem(.flexible())], spacing: 24) {
            
            ShowcaseCard(title: "Text Fields") {
                VStack(spacing: 16) {
                    VStack(alignment: .leading) {
                        Text("Agent Username")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        TextField("Enter your codename", text: $username)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("Secure Password")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        SecureField("Enter password", text: $password)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("Mission Code")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        TextField("Enter mission code", text: $missionCode)
                            .textFieldStyle(.roundedBorder)
                    }
                }
            }
            
            ShowcaseCard(title: "Form Validation") {
                VStack(spacing: 16) {
                    VStack(alignment: .leading) {
                        Text("Valid Input")
                            .font(.caption)
                            .foregroundColor(.green)
                        TextField("Email", text: .constant("valid@email.com"))
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("Invalid Input")
                            .font(.caption)
                            .foregroundColor(.red)
                        TextField("Email", text: .constant("invalid-email"))
                            .textFieldStyle(.roundedBorder)
                        Text("Please enter a valid email address")
                            .font(.caption2)
                            .foregroundColor(.red)
                    }
                    
                    VStack(alignment: .leading) {
                        Text("Warning Input")
                            .font(.caption)
                            .foregroundColor(.orange)
                        TextField("Password", text: .constant("weak-password"))
                            .textFieldStyle(.roundedBorder)
                        Text("Password strength: Weak")
                            .font(.caption2)
                            .foregroundColor(.orange)
                    }
                }
            }
        }
    }
}

struct NotificationShowcase: View {
    var body: some View {
        LazyVGrid(columns: [GridItem(.flexible())], spacing: 24) {
            
            ShowcaseCard(title: "Alerts") {
                VStack(spacing: 16) {
                    AlertPreview(
                        title: "Mission Complete",
                        message: "Operation Nightfall completed successfully",
                        type: .success
                    )
                    
                    AlertPreview(
                        title: "Target Detected",
                        message: "High-priority target spotted in your vicinity",
                        type: .warning
                    )
                    
                    AlertPreview(
                        title: "Mission Failed",
                        message: "Operation compromised. Abort immediately.",
                        type: .error
                    )
                }
            }
            
            ShowcaseCard(title: "Toast Notifications") {
                VStack(spacing: 16) {
                    ToastPreview(
                        message: "New mission assigned",
                        type: .success
                    )
                    
                    ToastPreview(
                        message: "Target eliminated",
                        type: .success
                    )
                    
                    ToastPreview(
                        message: "Connection lost",
                        type: .error
                    )
                }
            }
        }
    }
}

struct NavigationShowcase: View {
    var body: some View {
        ShowcaseCard(title: "Navigation Components") {
            VStack(spacing: 24) {
                Text("Navigation components would be shown here")
                    .foregroundColor(.secondary)
                Text("(Tab bars, navigation bars, etc.)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

struct MapShowcase: View {
    var body: some View {
        ShowcaseCard(title: "Map Components") {
            VStack(spacing: 24) {
                Text("Map components would be shown here")
                    .foregroundColor(.secondary)
                Text("(Location pins, route overlays, etc.)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

struct TokenShowcase: View {
    var body: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 24) {
            
            ShowcaseCard(title: "Colors") {
                VStack(spacing: 12) {
                    ColorSwatch(name: "Assassin Red", color: .red)
                    ColorSwatch(name: "Tactical Blue", color: .blue)
                    ColorSwatch(name: "Electric Green", color: .green)
                    ColorSwatch(name: "Deep Navy", color: .indigo)
                }
            }
            
            ShowcaseCard(title: "Typography") {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Large Title")
                        .font(.largeTitle)
                    Text("Title")
                        .font(.title)
                    Text("Headline")
                        .font(.headline)
                    Text("Body")
                        .font(.body)
                    Text("Caption")
                        .font(.caption)
                }
            }
            
            ShowcaseCard(title: "Spacing") {
                VStack(spacing: 8) {
                    SpacingSample(name: "XS", value: 4)
                    SpacingSample(name: "SM", value: 8)
                    SpacingSample(name: "MD", value: 16)
                    SpacingSample(name: "LG", value: 24)
                    SpacingSample(name: "XL", value: 32)
                }
            }
            
            ShowcaseCard(title: "Border Radius") {
                VStack(spacing: 12) {
                    BorderRadiusSample(name: "Small", value: 4)
                    BorderRadiusSample(name: "Medium", value: 8)
                    BorderRadiusSample(name: "Large", value: 16)
                }
            }
        }
    }
}

// MARK: - Helper Views

struct ShowcaseCard<Content: View>: View {
    let title: String
    let content: Content
    
    init(title: String, @ViewBuilder content: () -> Content) {
        self.title = title
        self.content = content()
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(title)
                .font(.headline)
                .foregroundColor(.red)
            
            content
        }
        .padding(20)
        .background(Color(NSColor.controlBackgroundColor))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

struct MissionCardPreview: View {
    let title: String
    let description: String
    let status: String
    let priority: String
    let timeRemaining: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.primary)
                Spacer()
                Text(status)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.green.opacity(0.2))
                    .foregroundColor(.green)
                    .cornerRadius(4)
            }
            
            Text(description)
                .font(.body)
                .foregroundColor(.secondary)
            
            HStack {
                Label(priority, systemImage: "exclamationmark.triangle")
                    .font(.caption)
                    .foregroundColor(.orange)
                
                Spacer()
                
                Label(timeRemaining, systemImage: "clock")
                    .font(.caption)
                    .foregroundColor(.blue)
            }
        }
        .padding()
        .background(Color(.secondarySystemBackground))
        .cornerRadius(8)
    }
}

struct TargetCardPreview: View {
    let name: String
    let codename: String
    let location: String
    let threat: String
    let distance: String
    let lastSeen: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading) {
                    Text(name)
                        .font(.headline)
                    Text(codename)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Text(threat)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.red.opacity(0.2))
                    .foregroundColor(.red)
                    .cornerRadius(4)
            }
            
            HStack {
                Label(location, systemImage: "location")
                    .font(.caption)
                    .foregroundColor(.blue)
                
                Spacer()
                
                Text(distance)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Text("Last seen: \(lastSeen)")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.secondarySystemBackground))
        .cornerRadius(8)
    }
}

struct AlertPreview: View {
    let title: String
    let message: String
    let type: AlertType
    
    enum AlertType {
        case success, warning, error
        
        var color: Color {
            switch self {
            case .success: return .green
            case .warning: return .orange
            case .error: return .red
            }
        }
        
        var icon: String {
            switch self {
            case .success: return "checkmark.circle"
            case .warning: return "exclamationmark.triangle"
            case .error: return "xmark.circle"
            }
        }
    }
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: type.icon)
                .foregroundColor(type.color)
                .font(.title2)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text(message)
                    .font(.body)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding()
        .background(type.color.opacity(0.1))
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(type.color.opacity(0.3), lineWidth: 1)
        )
    }
}

struct ToastPreview: View {
    let message: String
    let type: AlertType
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: type.icon)
                .foregroundColor(.white)
                .font(.body)
            
            Text(message)
                .font(.body)
                .foregroundColor(.white)
            
            Spacer()
        }
        .padding()
        .background(type.color)
        .cornerRadius(8)
    }
}

struct ColorSwatch: View {
    let name: String
    let color: Color
    
    var body: some View {
        HStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(color)
                .frame(width: 40, height: 40)
            
            VStack(alignment: .leading) {
                Text(name)
                    .font(.caption)
                    .fontWeight(.medium)
                Text(color.description)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
    }
}

struct SpacingSample: View {
    let name: String
    let value: CGFloat
    
    var body: some View {
        HStack {
            Text(name)
                .font(.caption)
                .frame(width: 30, alignment: .leading)
            
            Rectangle()
                .fill(Color.blue)
                .frame(width: value, height: 8)
            
            Text("\(Int(value))pt")
                .font(.caption2)
                .foregroundColor(.secondary)
            
            Spacer()
        }
    }
}

struct BorderRadiusSample: View {
    let name: String
    let value: CGFloat
    
    var body: some View {
        HStack {
            RoundedRectangle(cornerRadius: value)
                .fill(Color.green)
                .frame(width: 40, height: 40)
            
            VStack(alignment: .leading) {
                Text(name)
                    .font(.caption)
                    .fontWeight(.medium)
                Text("\(Int(value))pt")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
    }
}

// MARK: - Device Types

enum DeviceType: String, CaseIterable {
    case iPhone15Pro = "iPhone15Pro"
    case iPhone15 = "iPhone15"
    case iPhone14 = "iPhone14"
    case iPhoneSE = "iPhoneSE"
    case iPadPro = "iPadPro"
    case iPadAir = "iPadAir"
    
    var displayName: String {
        switch self {
        case .iPhone15Pro: return "iPhone 15 Pro"
        case .iPhone15: return "iPhone 15"
        case .iPhone14: return "iPhone 14"
        case .iPhoneSE: return "iPhone SE"
        case .iPadPro: return "iPad Pro"
        case .iPadAir: return "iPad Air"
        }
    }
    
    var screenSize: CGSize {
        switch self {
        case .iPhone15Pro: return CGSize(width: 393, height: 852)
        case .iPhone15: return CGSize(width: 393, height: 852)
        case .iPhone14: return CGSize(width: 390, height: 844)
        case .iPhoneSE: return CGSize(width: 375, height: 667)
        case .iPadPro: return CGSize(width: 1024, height: 1366)
        case .iPadAir: return CGSize(width: 820, height: 1180)
        }
    }
    
    var icon: String {
        switch self {
        case .iPhone15Pro, .iPhone15, .iPhone14, .iPhoneSE: return "iphone"
        case .iPadPro, .iPadAir: return "ipad"
        }
    }
}

enum Orientation: String, CaseIterable {
    case portrait = "portrait"
    case landscape = "landscape"
    
    var displayName: String {
        switch self {
        case .portrait: return "Portrait"
        case .landscape: return "Landscape"
        }
    }
    
    var icon: String {
        switch self {
        case .portrait: return "rectangle.portrait"
        case .landscape: return "rectangle"
        }
    }
}

// MARK: - Preview

struct DesignSystemShowcase_Previews: PreviewProvider {
    static var previews: some View {
        DesignSystemShowcase()
            .previewDevice("iPad Pro (12.9-inch) (6th generation)")
            .previewDisplayName("Design System Showcase")
    }
} 