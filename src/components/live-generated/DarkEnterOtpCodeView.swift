import SwiftUI

/// DarkEnterOtpCodeView - Generated from live Figma
/// Channel: kqzej2sr
/// Auto-generated on: 2025-06-07T18:27:53.514Z
struct DarkEnterOtpCodeView: View {
    @State private var otpCode: [String] = ["", "", "", ""]
    @State private var activeIndex: Int = 0
    @State private var isLoading: Bool = false
    
    let phoneNumber: String
    let onComplete: (String) -> Void
    let onResend: () -> Void
    
    var body: some View {
        VStack(spacing: 32) {
            // Header Section
            VStack(spacing: 16) {
                Text("Enter OTP Code 🔐")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                
                Text("We've sent a verification code to \(phoneNumber)")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            // OTP Input
            HStack(spacing: 12) {
                ForEach(0..<4, id: \.self) { index in
                    OTPDigitField(
                        digit: otpCode[index],
                        isActive: index == activeIndex,
                        isFilled: !otpCode[index].isEmpty
                    )
                    .onTapGesture {
                        activeIndex = index
                    }
                }
            }
            
            // Action Buttons
            VStack(spacing: 16) {
                Button("Verify Code") {
                    verifyCode()
                }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(otpCode.contains("") || isLoading)
                
                Button("Resend Code") {
                    onResend()
                }
                .buttonStyle(SecondaryButtonStyle())
            }
        }
        .padding()
        .onAppear {
            // Focus first field
            activeIndex = 0
        }
    }
    
    private func verifyCode() {
        isLoading = true
        let code = otpCode.joined()
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            isLoading = false
            onComplete(code)
        }
    }
}

// MARK: - Supporting Views
struct OTPDigitField: View {
    let digit: String
    let isActive: Bool
    let isFilled: Bool
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(.systemGray6))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(isActive ? Color.accentColor : Color.clear, lineWidth: 2)
                )
            
            Text(digit)
                .font(.title2)
                .fontWeight(.bold)
        }
        .frame(width: 60, height: 60)
        .scaleEffect(isActive ? 1.05 : 1.0)
        .animation(.easeInOut(duration: 0.2), value: isActive)
    }
}

// MARK: - Button Styles
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.accentColor)
            .cornerRadius(12)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundColor(.accentColor)
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.clear)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.accentColor, lineWidth: 1)
            )
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}

// MARK: - Preview
struct DarkEnterOtpCodeView_Previews: PreviewProvider {
    static var previews: some View {
        DarkEnterOtpCodeView(
            phoneNumber: "+1 (555) 123-4567",
            onComplete: { code in
                print("Entered code: \(code)")
            },
            onResend: {
                print("Resend requested")
            }
        )
    }
}