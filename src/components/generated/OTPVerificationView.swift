import SwiftUI

/// OTP Verification Component - Generated from live Figma
/// Channel: kqzej2sr, Frame: "8_Dark_enter OTP code"
struct OTPVerificationView: View {
    @State private var otpCode: [String] = ["", "", "", ""]
    @State private var activeIndex: Int = 0
    @State private var timeRemaining: Int = 60
    @State private var canResend: Bool = false
    
    let phoneNumber: String
    let onComplete: (String) -> Void
    let onResend: () -> Void
    
    var body: some View {
        VStack(spacing: .spacingXl) {
            // Title Section
            VStack(spacing: .spacingMd) {
                HStack {
                    Text("Enter OTP Code 🔐")
                        .font(.screenTitle)
                        .foregroundColor(.textPrimary)
                    Spacer()
                }
                
                HStack {
                    Text("Check your messages! We've sent a one-time code to \(phoneNumber). Enter the code below to verify your account and continue.")
                        .font(.bodyText)
                        .foregroundColor(.textSecondary)
                        .multilineTextAlignment(.leading)
                    Spacer()
                }
            }
            
            // OTP Input Fields
            HStack(spacing: .spacingMd) {
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
            
            // Resend Section
            VStack(spacing: .spacingMd) {
                Text(canResend ? 
                     "Tap below to resend code" : 
                     "You can resend the code in \(timeRemaining) seconds")
                    .font(.bodyText)
                    .foregroundColor(.textSecondary)
                
                Button("Resend code") {
                    onResend()
                    resetTimer()
                }
                .font(.buttonText)
                .foregroundColor(canResend ? .accentGreen : .textTertiary)
                .disabled(!canResend)
            }
        }
        .padding(.screenPadding)
        .onAppear {
            startTimer()
        }
    }
    
    private func handleNumberInput(_ number: String) {
        guard activeIndex < 4 else { return }
        
        otpCode[activeIndex] = number
        
        if activeIndex < 3 {
            activeIndex += 1
        }
        
        // Check if OTP is complete
        if otpCode.allSatisfy({ !$0.isEmpty }) {
            let completeOTP = otpCode.joined()
            onComplete(completeOTP)
        }
    }
    
    private func startTimer() {
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                canResend = true
                timer.invalidate()
            }
        }
    }
    
    private func resetTimer() {
        timeRemaining = 60
        canResend = false
        otpCode = ["", "", "", ""]
        activeIndex = 0
        startTimer()
    }
}

// MARK: - OTP Digit Field
struct OTPDigitField: View {
    let digit: String
    let isActive: Bool
    let isFilled: Bool
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: .radiusMedium)
                .fill(Color.cardBackground)
                .overlay(
                    RoundedRectangle(cornerRadius: .radiusMedium)
                        .stroke(isActive ? .accentGreen : .cardBackground, lineWidth: 2)
                )
                .background(
                    isActive ? Color.accentGreenLight.opacity(0.08) : Color.clear
                )
            
            Text(digit)
                .font(.keypadText)
                .foregroundColor(.textPrimary)
        }
        .frame(width: 83.5, height: 66)
    }
}

// MARK: - Preview
struct OTPVerificationView_Previews: PreviewProvider {
    static var previews: some View {
        OTPVerificationView(
            phoneNumber: "+1 (646) 555-4099",
            onComplete: { otp in
                print("OTP entered: \(otp)")
            },
            onResend: {
                print("Resend requested")
            }
        )
        .background(Color.appBackground)
        .preferredColorScheme(.dark)
    }
}