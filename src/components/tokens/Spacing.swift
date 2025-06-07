import SwiftUI

/// Design System Spacing - Auto-generated from Figma
/// Last updated: 2025-06-07T18:17:15.690Z
extension CGFloat {
    
    // MARK: - Tactical Spacing Scale
    
    /// xs spacing - 4pt
    static let xs = CGFloat(4)
    /// sm spacing - 8pt
    static let sm = CGFloat(8)
    /// md spacing - 16pt
    static let md = CGFloat(16)
    /// lg spacing - 24pt
    static let lg = CGFloat(24)
    /// xl spacing - 32pt
    static let xl = CGFloat(32)
    
    // MARK: - Standard Spacing Scale
    
    /// Extra small spacing - 4pt
    static let spacingXS = CGFloat(4)
    
    /// Small spacing - 8pt
    static let spacingS = CGFloat(8)
    
    /// Medium spacing - 16pt
    static let spacingM = CGFloat(16)
    
    /// Large spacing - 24pt
    static let spacingL = CGFloat(24)
    
    /// Extra large spacing - 32pt
    static let spacingXL = CGFloat(32)
    
    /// Extra extra large spacing - 48pt
    static let spacingXXL = CGFloat(48)
    
    // MARK: - Component Spacing
    
    /// Button padding horizontal
    static let buttonPaddingH = CGFloat(16)
    
    /// Button padding vertical
    static let buttonPaddingV = CGFloat(12)
    
    /// Card padding
    static let cardPadding = CGFloat(16)
    
    /// Section spacing
    static let sectionSpacing = CGFloat(24)
    
    /// List item spacing
    static let listItemSpacing = CGFloat(12)
    
    // MARK: - Layout Spacing
    
    /// Screen edge margins
    static let screenMargin = CGFloat(20)
    
    /// Content max width
    static let contentMaxWidth = CGFloat(375)
    
    /// Safe area padding
    static let safeAreaPadding = CGFloat(16)
}

// MARK: - Spacing Modifiers

extension View {
    
    /// Apply standard tactical padding
    func tacticalPadding() -> some View {
        self.padding(.spacingM)
    }
    
    /// Apply card-style padding
    func cardPadding() -> some View {
        self.padding(.cardPadding)
    }
    
    /// Apply section spacing
    func sectionSpacing() -> some View {
        self.padding(.vertical, .sectionSpacing)
    }
    
    /// Apply screen edge margins
    func screenMargins() -> some View {
        self.padding(.horizontal, .screenMargin)
    }
    
    /// Apply safe area aware padding
    func safeAreaPadding() -> some View {
        self.padding(.safeAreaPadding)
    }
}

// MARK: - Spacing Utilities

struct SpacingShowcase: View {
    var body: some View {
        VStack(spacing: .spacingM) {
            Text("Spacing Showcase")
                .font(.headline)
                .tacticalPadding()
                .background(Color.secondaryBackground)
                .cornerRadius(8)
            
            HStack(spacing: .spacingS) {
                ForEach(0..<3) { _ in
                    Rectangle()
                        .fill(Color.tacticalBlue)
                        .frame(width: 60, height: 40)
                }
            }
            
            VStack(spacing: .spacingL) {
                Text("Large spacing between sections")
                Text("Creates clear visual hierarchy")
            }
            .cardPadding()
            .background(Color.secondaryBackground)
            .cornerRadius(12)
        }
        .screenMargins()
        .background(Color.primaryBackground)
    }
}