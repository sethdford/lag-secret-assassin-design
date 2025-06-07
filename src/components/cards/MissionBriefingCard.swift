import SwiftUI

// MARK: - Mission Briefing Card Component
// Classified document style card for target assignments and mission details

public struct MissionBriefingCard: View {
    
    // MARK: - Mission Data Model
    public struct MissionData {
        let targetName: String
        let targetPhoto: String?
        let codename: String
        let lastKnownLocation: String
        let missionType: MissionType
        let priority: Priority
        let timeRemaining: TimeInterval
        let briefingText: String
        let restrictions: [String]
        
        public init(
            targetName: String,
            targetPhoto: String? = nil,
            codename: String,
            lastKnownLocation: String,
            missionType: MissionType,
            priority: Priority,
            timeRemaining: TimeInterval,
            briefingText: String,
            restrictions: [String] = []
        ) {
            self.targetName = targetName
            self.targetPhoto = targetPhoto
            self.codename = codename
            self.lastKnownLocation = lastKnownLocation
            self.missionType = missionType
            self.priority = priority
            self.timeRemaining = timeRemaining
            self.briefingText = briefingText
            self.restrictions = restrictions
        }
    }
    
    public enum MissionType {
        case elimination
        case surveillance
        case extraction
        case protection
        
        var icon: String {
            switch self {
            case .elimination: return "target"
            case .surveillance: return "eye"
            case .extraction: return "arrow.up.circle"
            case .protection: return "shield"
            }
        }
        
        var title: String {
            switch self {
            case .elimination: return "ELIMINATION"
            case .surveillance: return "SURVEILLANCE"
            case .extraction: return "EXTRACTION"
            case .protection: return "PROTECTION"
            }
        }
        
        var color: Color {
            switch self {
            case .elimination: return DesignTokens.Colors.assassinRed
            case .surveillance: return DesignTokens.Colors.tacticalBlue
            case .extraction: return DesignTokens.Colors.warning
            case .protection: return DesignTokens.Colors.electricGreen
            }
        }
    }
    
    public enum Priority {
        case low, medium, high, critical
        
        var color: Color {
            switch self {
            case .low: return DesignTokens.Colors.mediumGray
            case .medium: return DesignTokens.Colors.tacticalBlue
            case .high: return DesignTokens.Colors.warning
            case .critical: return DesignTokens.Colors.assassinRed
            }
        }
        
        var title: String {
            switch self {
            case .low: return "LOW"
            case .medium: return "MEDIUM"
            case .high: return "HIGH"
            case .critical: return "CRITICAL"
            }
        }
    }
    
    // MARK: - Properties
    let mission: MissionData
    let onAccept: () -> Void
    let onDecline: (() -> Void)?
    
    @State private var isExpanded = false
    @State private var timeString = ""
    
    // MARK: - Initializer
    public init(
        mission: MissionData,
        onAccept: @escaping () -> Void,
        onDecline: (() -> Void)? = nil
    ) {
        self.mission = mission
        self.onAccept = onAccept
        self.onDecline = onDecline
    }
    
    // MARK: - Body
    public var body: some View {
        VStack(spacing: 0) {
            // Header with classification and mission type
            headerView
            
            // Main content
            contentView
            
            // Action buttons
            actionButtonsView
        }
        .background(cardBackground)
        .overlay(cardBorder)
        .clipShape(RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.lg))
        .shadow(
            color: mission.missionType.color.opacity(0.3),
            radius: 8,
            x: 0,
            y: 4
        )
        .onAppear {
            updateTimeString()
        }
    }
    
    // MARK: - Header View
    private var headerView: some View {
        HStack {
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                Text("CLASSIFIED")
                    .font(.system(size: DesignTokens.Typography.xs, weight: .heavy))
                    .foregroundColor(DesignTokens.Colors.assassinRed)
                
                HStack(spacing: DesignTokens.Spacing.sm) {
                    Image(systemName: mission.missionType.icon)
                        .foregroundColor(mission.missionType.color)
                    
                    Text(mission.missionType.title)
                        .font(.system(size: DesignTokens.Typography.lg, weight: .bold))
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                }
            }
            
            Spacer()
            
            VStack(alignment: .trailing, spacing: DesignTokens.Spacing.xs) {
                priorityBadge
                
                Text(timeString)
                    .font(.system(size: DesignTokens.Typography.sm, weight: .medium, design: .monospaced))
                    .foregroundColor(DesignTokens.Colors.textSecondary)
            }
        }
        .padding(DesignTokens.Spacing.md)
        .background(DesignTokens.Colors.backgroundSecondary)
    }
    
    // MARK: - Content View
    private var contentView: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            // Target information
            targetInfoView
            
            // Mission briefing
            briefingView
            
            // Restrictions (if any)
            if !mission.restrictions.isEmpty {
                restrictionsView
            }
        }
        .padding(DesignTokens.Spacing.md)
    }
    
    // MARK: - Target Info View
    private var targetInfoView: some View {
        HStack(spacing: DesignTokens.Spacing.md) {
            // Target photo placeholder or actual photo
            targetPhotoView
            
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                    Text("TARGET")
                        .font(.system(size: DesignTokens.Typography.xs, weight: .semibold))
                        .foregroundColor(DesignTokens.Colors.textTertiary)
                    
                    Text(mission.targetName)
                        .font(.system(size: DesignTokens.Typography.lg, weight: .semibold))
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                }
                
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                    Text("CODENAME")
                        .font(.system(size: DesignTokens.Typography.xs, weight: .semibold))
                        .foregroundColor(DesignTokens.Colors.textTertiary)
                    
                    Text(mission.codename)
                        .font(.system(size: DesignTokens.Typography.base, weight: .medium, design: .monospaced))
                        .foregroundColor(mission.missionType.color)
                }
                
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                    Text("LAST KNOWN LOCATION")
                        .font(.system(size: DesignTokens.Typography.xs, weight: .semibold))
                        .foregroundColor(DesignTokens.Colors.textTertiary)
                    
                    Text(mission.lastKnownLocation)
                        .font(.system(size: DesignTokens.Typography.sm, weight: .medium))
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }
            }
            
            Spacer()
        }
    }
    
    // MARK: - Target Photo View
    private var targetPhotoView: some View {
        Group {
            if let photoName = mission.targetPhoto {
                Image(photoName)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } else {
                Image(systemName: "person.crop.circle.fill")
                    .font(.system(size: 40))
                    .foregroundColor(DesignTokens.Colors.mediumGray)
            }
        }
        .frame(width: 80, height: 80)
        .clipShape(RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.md))
        .overlay(
            RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.md)
                .stroke(mission.missionType.color, lineWidth: 2)
        )
    }
    
    // MARK: - Briefing View
    private var briefingView: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
            Text("MISSION BRIEFING")
                .font(.system(size: DesignTokens.Typography.sm, weight: .semibold))
                .foregroundColor(DesignTokens.Colors.textTertiary)
            
            Text(mission.briefingText)
                .font(.system(size: DesignTokens.Typography.base, weight: .regular))
                .foregroundColor(DesignTokens.Colors.textSecondary)
                .lineLimit(isExpanded ? nil : 3)
            
            if mission.briefingText.count > 150 {
                Button(action: {
                    withAnimation(.easeInOut(duration: 0.3)) {
                        isExpanded.toggle()
                    }
                }) {
                    Text(isExpanded ? "Show Less" : "Read More")
                        .font(.system(size: DesignTokens.Typography.sm, weight: .medium))
                        .foregroundColor(mission.missionType.color)
                }
            }
        }
    }
    
    // MARK: - Restrictions View
    private var restrictionsView: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
            Text("OPERATIONAL RESTRICTIONS")
                .font(.system(size: DesignTokens.Typography.sm, weight: .semibold))
                .foregroundColor(DesignTokens.Colors.warning)
            
            ForEach(mission.restrictions, id: \.self) { restriction in
                HStack(spacing: DesignTokens.Spacing.sm) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: DesignTokens.Typography.xs))
                        .foregroundColor(DesignTokens.Colors.warning)
                    
                    Text(restriction)
                        .font(.system(size: DesignTokens.Typography.sm, weight: .regular))
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    
                    Spacer()
                }
            }
        }
    }
    
    // MARK: - Action Buttons View
    private var actionButtonsView: some View {
        HStack(spacing: DesignTokens.Spacing.md) {
            if let onDecline = onDecline {
                TacticalButton(
                    title: "DECLINE",
                    style: .ghost,
                    size: .medium,
                    icon: "xmark"
                ) {
                    onDecline()
                }
            }
            
            TacticalButton(
                title: "ACCEPT MISSION",
                style: .primary,
                size: .medium,
                icon: "checkmark.shield.fill"
            ) {
                onAccept()
            }
        }
        .padding(DesignTokens.Spacing.md)
        .background(DesignTokens.Colors.backgroundTertiary)
    }
    
    // MARK: - Supporting Views
    private var priorityBadge: some View {
        Text(mission.priority.title)
            .font(.system(size: DesignTokens.Typography.xs, weight: .heavy))
            .foregroundColor(DesignTokens.Colors.white)
            .padding(.horizontal, DesignTokens.Spacing.sm)
            .padding(.vertical, DesignTokens.Spacing.xs)
            .background(mission.priority.color)
            .clipShape(RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.sm))
    }
    
    private var cardBackground: some View {
        RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.lg)
            .fill(DesignTokens.Colors.backgroundPrimary)
    }
    
    private var cardBorder: some View {
        RoundedRectangle(cornerRadius: DesignTokens.BorderRadius.lg)
            .stroke(mission.missionType.color.opacity(0.3), lineWidth: 1)
    }
    
    // MARK: - Helper Methods
    private func updateTimeString() {
        let hours = Int(mission.timeRemaining) / 3600
        let minutes = Int(mission.timeRemaining) % 3600 / 60
        timeString = String(format: "%02d:%02d", hours, minutes)
    }
}

// MARK: - Preview
struct MissionBriefingCard_Previews: PreviewProvider {
    static var previews: some View {
        let sampleMission = MissionBriefingCard.MissionData(
            targetName: "Alex Chen",
            codename: "SHADOW_WALKER",
            lastKnownLocation: "Engineering Building, Floor 3",
            missionType: .elimination,
            priority: .high,
            timeRemaining: 7200, // 2 hours
            briefingText: "Target is a highly skilled operative with advanced evasion techniques. Known to frequent the engineering building during late hours. Exercise extreme caution and maintain stealth protocols. Target has been observed using multiple exit routes and may have established safe house locations.",
            restrictions: [
                "No elimination during class hours",
                "Avoid public areas with high foot traffic",
                "Maintain 50ft distance from safe zones"
            ]
        )
        
        MissionBriefingCard(
            mission: sampleMission,
            onAccept: {
                print("Mission accepted")
            },
            onDecline: {
                print("Mission declined")
            }
        )
        .padding()
        .background(DesignTokens.Colors.backgroundSecondary)
        .previewLayout(.sizeThatFits)
    }
} 