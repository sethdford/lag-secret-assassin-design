import SwiftUI

/// Live Figma Border Radius - Auto-synced from channel kqzej2sr
/// Last updated: 2025-06-07T18:27:34.617Z
extension CGFloat {
    
    // MARK: - Ride-sharing App Border Radius
    
    /// small border radius - 8pt
    static let radiusSmall = CGFloat(8)
    /// medium border radius - 12pt
    static let radiusMedium = CGFloat(12)
    /// large border radius - 16pt
    static let radiusLarge = CGFloat(16)
    /// full border radius - 9999pt
    static let radiusFull = CGFloat(9999)
}

extension View {
    
    // MARK: - Corner Radius Modifiers
    
    /// Apply small corner radius for buttons and inputs
    func smallCorners() -> some View {
        self.cornerRadius(.radiusSmall)
    }
    
    /// Apply medium corner radius for cards
    func mediumCorners() -> some View {
        self.cornerRadius(.radiusMedium)
    }
    
    /// Apply large corner radius for modals
    func largeCorners() -> some View {
        self.cornerRadius(.radiusLarge)
    }
    
    /// Apply full corner radius for circular elements
    func circularCorners() -> some View {
        self.cornerRadius(.radiusFull)
    }
}