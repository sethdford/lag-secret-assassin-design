import SwiftUI

/// Ride Card Component - Generated from live Figma patterns
/// Channel: kqzej2sr, Based on ride-sharing app design system
struct RideCardView: View {
    let ride: RideInfo
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(spacing: .spacingMd) {
                // Ride Status Header
                HStack {
                    Text(ride.status.displayName)
                        .font(.buttonText)
                        .foregroundColor(ride.status.color)
                    
                    Spacer()
                    
                    Text(ride.formattedTime)
                        .font(.bodyText)
                        .foregroundColor(.textSecondary)
                }
                
                // Ride Details
                VStack(spacing: .spacingSm) {
                    HStack {
                        Image(systemName: "location.circle.fill")
                            .foregroundColor(.accentGreen)
                        Text(ride.pickup)
                            .font(.bodyText)
                            .foregroundColor(.textPrimary)
                        Spacer()
                    }
                    
                    HStack {
                        Image(systemName: "location.fill")
                            .foregroundColor(.errorColor)
                        Text(ride.destination)
                            .font(.bodyText)
                            .foregroundColor(.textPrimary)
                        Spacer()
                    }
                }
                
                // Ride Info Footer
                HStack {
                    Text(ride.driverName)
                        .font(.bodyText)
                        .foregroundColor(.textSecondary)
                    
                    Spacer()
                    
                    Text(ride.formattedPrice)
                        .font(.buttonText)
                        .foregroundColor(.textPrimary)
                }
            }
            .padding(.cardPadding)
        }
        .background(Color.cardBackground)
        .mediumCorners()
        .overlay(
            RoundedRectangle(cornerRadius: .radiusMedium)
                .stroke(ride.status.borderColor, lineWidth: 1)
        )
    }
}

// MARK: - Ride Info Model
struct RideInfo {
    let id: String
    let status: RideStatus
    let pickup: String
    let destination: String
    let driverName: String
    let price: Double
    let scheduledTime: Date
    
    var formattedTime: String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: scheduledTime)
    }
    
    var formattedPrice: String {
        return "$\(String(format: "%.2f", price))"
    }
}

// MARK: - Ride Status
enum RideStatus: CaseIterable {
    case scheduled
    case active
    case completed
    case canceled
    
    var displayName: String {
        switch self {
        case .scheduled: return "Scheduled"
        case .active: return "Active"
        case .completed: return "Completed"
        case .canceled: return "Canceled"
        }
    }
    
    var color: Color {
        switch self {
        case .scheduled: return .scheduledColor
        case .active: return .rideActiveColor
        case .completed: return .successColor
        case .canceled: return .errorColor
        }
    }
    
    var borderColor: Color {
        return color.opacity(0.3)
    }
}

// MARK: - Preview
struct RideCardView_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: .spacingMd) {
            RideCardView(
                ride: RideInfo(
                    id: "1",
                    status: .active,
                    pickup: "123 Main St",
                    destination: "456 Oak Ave",
                    driverName: "John Driver",
                    price: 25.50,
                    scheduledTime: Date()
                ),
                onTap: {}
            )
            
            RideCardView(
                ride: RideInfo(
                    id: "2",
                    status: .completed,
                    pickup: "Coffee Shop",
                    destination: "Home",
                    driverName: "Jane Driver",
                    price: 18.75,
                    scheduledTime: Date().addingTimeInterval(-3600)
                ),
                onTap: {}
            )
        }
        .padding()
        .background(Color.appBackground)
        .preferredColorScheme(.dark)
    }
}