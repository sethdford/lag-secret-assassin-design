import SwiftUI

// MARK: - Tactical Button Component
// Cinematic button with spy/military aesthetic for Assassin Game

public struct TacticalButton: View {
    
    // MARK: - Button Styles
    public enum Style {
        case primary    // Assassin Red - for critical actions like eliminations
        case secondary  // Tactical Blue - for information and secondary actions
        case success    // Electric Green - for safe zones and success states
        case danger     // Assassin Red with warning styling
        case ghost      // Transparent with border - for subtle actions
    }
    
    public enum Size {
        case small
        case medium
        case large
        case extraLarge
        
        var height: CGFloat {
            switch self {
            case .small: return 32
            case .medium: return 44
            case .large: return 56
            case .extraLarge: return 64
            }
        }
        
        var fontSize: CGFloat {
            switch self {
            case .small: return DesignTokens.Typography.sm
            case .medium: return DesignTokens.Typography.base
            case .large: return DesignTokens.Typography.lg
            case .extraLarge: return DesignTokens.Typography.xl
            }
        }
        
        var padding: CGFloat {
            switch self {
            case .small: return DesignTokens.Spacing.sm
            case .medium: return DesignTokens.Spacing.md
            case .large: return DesignTokens.Spacing.lg
            case .extraLarge: return DesignTokens.Spacing.xl
            }
        }
    }
    
    // MARK: - Properties
    let title: String
    let style: Style
    let size: Size
    let isEnabled: Bool
    let isLoading: Bool
    let icon: String?
    let action: () -> Void
    
    @State private var isPressed = false
    
    // MARK: - Initializer
    public init(
        title: String,
        style: Style = .primary,
        size: Size = .medium,
        isEnabled: Bool = true,
        isLoading: Bool = false,
        icon: String? = nil,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.style = style
        self.size = size
        self.isEnabled = isEnabled
        self.isLoading = isLoading
        self.icon = icon
        self.action = action
    }
    
    // MARK: - Body
    public var body: some View {
        Button(action: {
            if isEnabled && !isLoading {
                // Haptic feedback for tactical feel
                let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
                impactFeedback.impactOccurred()
                action()
            }
        }) {
            HStack(spacing: DesignTokens.Spacing.sm) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: textColor))
                        .scaleEffect(0.8)
                } else if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: size.fontSize, weight: .semibold))
                }
                
                Text(title)
                    .font(.system(size: size.fontSize, weight: .semibold, design: .default))
                    .foregroundColor(textColor)
            }
            .frame(height: size.height)
            .frame(maxWidth: .infinity)
            .padding(.horizontal, size.padding)
            .background(backgroundView)
            .overlay(borderView)
            .clipShape(RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.md))
            .scaleEffect(isPressed ? 0.95 : 1.0)
            .opacity(isEnabled ? 1.0 : 0.6)
            .shadow(
                color: shadowColor,
                radius: isPressed ? 2 : 4,
                x: 0,
                y: isPressed ? 1 : 2
            )
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(!isEnabled || isLoading)
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity, pressing: { pressing in
            withAnimation(.easeInOut(duration: 0.1)) {
                isPressed = pressing
            }
        }, perform: {})
    }
    
    // MARK: - Style Computed Properties
    private var backgroundColor: Color {
        switch style {
        case .primary:
            return DesignTokens.Colors.assassinRed
        case .secondary:
            return DesignTokens.Colors.tacticalBlue
        case .success:
            return DesignTokens.Colors.electricGreen
        case .danger:
            return DesignTokens.Colors.danger
        case .ghost:
            return Color.clear
        }
    }
    
    private var textColor: Color {
        switch style {
        case .primary, .secondary, .danger:
            return DesignTokens.Colors.white
        case .success:
            return DesignTokens.Colors.black
        case .ghost:
            return DesignTokens.Colors.textPrimary
        }
    }
    
    private var borderColor: Color {
        switch style {
        case .ghost:
            return DesignTokens.Colors.textSecondary
        default:
            return Color.clear
        }
    }
    
    private var shadowColor: Color {
        switch style {
        case .primary, .danger:
            return DesignTokens.Shadows.danger
        case .success:
            return DesignTokens.Shadows.glow
        default:
            return DesignTokens.Shadows.tactical
        }
    }
    
    private var backgroundView: some View {
        RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.md)
            .fill(backgroundColor)
    }
    
    private var borderView: some View {
        RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.md)
            .stroke(borderColor, lineWidth: style == .ghost ? 1 : 0)
    }
}

// MARK: - Preview
struct TacticalButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: DesignTokens.Spacing.md) {
            TacticalButton(
                title: "ELIMINATE TARGET",
                style: .primary,
                size: .large,
                icon: "target"
            ) {
                print("Elimination initiated")
            }
            
            TacticalButton(
                title: "View Intel",
                style: .secondary,
                size: .medium,
                icon: "eye"
            ) {
                print("Intel accessed")
            }
            
            TacticalButton(
                title: "Enter Safe Zone",
                style: .success,
                size: .medium,
                icon: "shield.fill"
            ) {
                print("Safe zone entered")
            }
            
            TacticalButton(
                title: "Emergency Protocol",
                style: .danger,
                size: .small,
                icon: "exclamationmark.triangle.fill"
            ) {
                print("Emergency activated")
            }
            
            TacticalButton(
                title: "Spectate",
                style: .ghost,
                size: .medium,
                icon: "eye.slash"
            ) {
                print("Spectator mode")
            }
            
            TacticalButton(
                title: "Loading...",
                style: .primary,
                size: .medium,
                isLoading: true
            ) {
                print("Loading action")
            }
        }
        .padding()
        .background(DesignTokens.Colors.backgroundPrimary)
        .previewLayout(.sizeThatFits)
    }
} 