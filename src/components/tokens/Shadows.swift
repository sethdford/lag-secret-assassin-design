import SwiftUI

/// Design System Shadows - Auto-generated from Figma
/// Last updated: 2025-06-07T18:17:15.690Z
extension View {
    
    // MARK: - Tactical Shadow Effects
    

    
    // MARK: - Semantic Shadows
    
    /// Subtle shadow for cards and panels
    func cardShadow() -> some View {
        self.shadow(
            color: Color.black.opacity(0.2),
            radius: 8,
            x: 0,
            y: 4
        )
    }
    
    /// Dramatic shadow for floating elements
    func floatingShadow() -> some View {
        self.shadow(
            color: Color.black.opacity(0.4),
            radius: 16,
            x: 0,
            y: 8
        )
    }
    
    /// Tactical glow effect for active elements
    func tacticalGlow(color: Color = .electricGreen) -> some View {
        self.shadow(
            color: color.opacity(0.6),
            radius: 12,
            x: 0,
            y: 0
        )
    }
    
    /// Mission critical highlight
    func criticalHighlight() -> some View {
        self.shadow(
            color: Color.assassinRed.opacity(0.8),
            radius: 8,
            x: 0,
            y: 0
        )
    }
}