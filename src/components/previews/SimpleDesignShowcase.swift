import SwiftUI

/// Simple Design System Showcase - Visual Storyboard for Components
/// This provides a clean, working preview of the design system components
struct SimpleDesignShowcase: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            ButtonsTab()
                .tabItem {
                    Image(systemName: "button.programmable")
                    Text("Buttons")
                }
                .tag(0)
            
            CardsTab()
                .tabItem {
                    Image(systemName: "rectangle.stack")
                    Text("Cards")
                }
                .tag(1)
            
            FormsTab()
                .tabItem {
                    Image(systemName: "textformat")
                    Text("Forms")
                }
                .tag(2)
            
            ColorsTab()
                .tabItem {
                    Image(systemName: "paintpalette")
                    Text("Colors")
                }
                .tag(3)
        }
        .navigationTitle("Design System")
    }
}

// MARK: - Buttons Tab

struct ButtonsTab: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 20) {
                
                ComponentSection(title: "Primary Buttons") {
                    VStack(spacing: 12) {
                        Button("Start Mission") {}
                            .buttonStyle(.borderedProminent)
                            .tint(.red)
                            .controlSize(.large)
                        
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
                
                ComponentSection(title: "Secondary Buttons") {
                    VStack(spacing: 12) {
                        Button("View Details") {}
                            .buttonStyle(.bordered)
                            .tint(.blue)
                            .controlSize(.large)
                        
                        Button("Cancel") {}
                            .buttonStyle(.bordered)
                            .tint(.blue)
                            .controlSize(.regular)
                    }
                }
                
                ComponentSection(title: "Danger Buttons") {
                    VStack(spacing: 12) {
                        Button("Eliminate Target") {}
                            .buttonStyle(.borderedProminent)
                            .tint(.red)
                        
                        Button("Abort Mission") {}
                            .buttonStyle(.borderedProminent)
                            .tint(.red)
                    }
                }
                
                ComponentSection(title: "Button States") {
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
                            .tint(.gray)
                            .disabled(true)
                    }
                }
            }
            .padding()
        }
    }
}

// MARK: - Cards Tab

struct CardsTab: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.flexible())], spacing: 20) {
                
                ComponentSection(title: "Mission Cards") {
                    VStack(spacing: 16) {
                        MissionCardExample(
                            title: "Operation Nightfall",
                            description: "Infiltrate the enemy base and retrieve classified documents",
                            status: "Active",
                            priority: "High",
                            timeRemaining: "2h 45m"
                        )
                        
                        MissionCardExample(
                            title: "Stealth Reconnaissance",
                            description: "Gather intelligence on target movements",
                            status: "Pending",
                            priority: "Medium",
                            timeRemaining: "6h 12m"
                        )
                    }
                }
                
                ComponentSection(title: "Target Cards") {
                    VStack(spacing: 16) {
                        TargetCardExample(
                            name: "Agent Smith",
                            codename: "The Architect",
                            location: "Downtown Plaza",
                            threat: "High",
                            distance: "0.3 km",
                            lastSeen: "5 min ago"
                        )
                        
                        TargetCardExample(
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
            .padding()
        }
    }
}

// MARK: - Forms Tab

struct FormsTab: View {
    @State private var username = ""
    @State private var password = ""
    @State private var missionCode = ""
    @State private var email = "valid@email.com"
    @State private var invalidEmail = "invalid-email"
    @State private var weakPassword = "weak-password"
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.flexible())], spacing: 20) {
                
                ComponentSection(title: "Text Fields") {
                    VStack(spacing: 16) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Agent Username")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            TextField("Enter your codename", text: $username)
                                .textFieldStyle(.roundedBorder)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Secure Password")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            SecureField("Enter password", text: $password)
                                .textFieldStyle(.roundedBorder)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Mission Code")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            TextField("Enter mission code", text: $missionCode)
                                .textFieldStyle(.roundedBorder)
                        }
                    }
                }
                
                ComponentSection(title: "Form Validation") {
                    VStack(spacing: 16) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Valid Input")
                                .font(.caption)
                                .foregroundColor(.green)
                            TextField("Email", text: $email)
                                .textFieldStyle(.roundedBorder)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Invalid Input")
                                .font(.caption)
                                .foregroundColor(.red)
                            TextField("Email", text: $invalidEmail)
                                .textFieldStyle(.roundedBorder)
                            Text("Please enter a valid email address")
                                .font(.caption2)
                                .foregroundColor(.red)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Warning Input")
                                .font(.caption)
                                .foregroundColor(.orange)
                            TextField("Password", text: $weakPassword)
                                .textFieldStyle(.roundedBorder)
                            Text("Password strength: Weak")
                                .font(.caption2)
                                .foregroundColor(.orange)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

// MARK: - Colors Tab

struct ColorsTab: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 20) {
                
                ComponentSection(title: "Primary Colors") {
                    VStack(spacing: 12) {
                        ColorSample(name: "Assassin Red", color: .red)
                        ColorSample(name: "Tactical Blue", color: .blue)
                        ColorSample(name: "Electric Green", color: .green)
                        ColorSample(name: "Deep Navy", color: .indigo)
                    }
                }
                
                ComponentSection(title: "System Colors") {
                    VStack(spacing: 12) {
                        ColorSample(name: "Primary", color: .primary)
                        ColorSample(name: "Secondary", color: .secondary)
                        ColorSample(name: "Accent", color: .accentColor)
                        ColorSample(name: "Background", color: .gray.opacity(0.1))
                    }
                }
                
                ComponentSection(title: "Typography") {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Large Title")
                            .font(.largeTitle)
                            .foregroundColor(.red)
                        Text("Title")
                            .font(.title)
                            .foregroundColor(.blue)
                        Text("Headline")
                            .font(.headline)
                            .foregroundColor(.green)
                        Text("Body")
                            .font(.body)
                            .foregroundColor(.primary)
                        Text("Caption")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                
                ComponentSection(title: "Spacing & Layout") {
                    VStack(spacing: 8) {
                        SpacingExample(name: "XS", value: 4)
                        SpacingExample(name: "SM", value: 8)
                        SpacingExample(name: "MD", value: 16)
                        SpacingExample(name: "LG", value: 24)
                        SpacingExample(name: "XL", value: 32)
                    }
                }
            }
            .padding()
        }
    }
}

// MARK: - Helper Components

struct ComponentSection<Content: View>: View {
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
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

struct MissionCardExample: View {
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
        .background(Color.gray.opacity(0.1))
        .cornerRadius(8)
    }
}

struct TargetCardExample: View {
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
        .background(Color.gray.opacity(0.1))
        .cornerRadius(8)
    }
}

struct ColorSample: View {
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
                Text("Color")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
    }
}

struct SpacingExample: View {
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

// MARK: - Preview

struct SimpleDesignShowcase_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            SimpleDesignShowcase()
        }
        .previewDisplayName("Simple Design Showcase")
    }
} 