import SwiftUI

/// OTP Verification Screen - Generated from live Figma design
/// Channel: kqzej2sr, Frame: "8_Dark_enter OTP code"
struct OTPVerificationScreen: View {
    @State private var otpCode: [String] = ["9", "4", "5", ""]
    @State private var activeIndex: Int = 2
    @State private var timeRemaining: Int = 56
    @State private var canResend: Bool = false
    
    let phoneNumber = "+1 (646) 555-4099"
    
    var body: some View {
        ZStack {
            // Background - #181a20 from Figma
            ColorHelper.colorFromHex("#181a20")
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Status Bar
                StatusBarView()
                
                // Navigation Bar
                NavigationHeaderView(title: "Review Summary")
                
                Spacer()
                
                // Main Content
                VStack(spacing: 32) {
                    // Title & Description
                    VStack(spacing: 16) {
                        HStack {
                            Text("Enter OTP Code 🔐")
                                .font(.custom("Urbanist", size: 32))
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Spacer()
                        }
                        
                        HStack {
                            Text("Check your messages! We've sent a one-time code to \(phoneNumber). Enter the code below to verify your account and continue.")
                                .font(.custom("Urbanist", size: 18))
                                .fontWeight(.regular)
                                .foregroundColor(Color(hex: "#eeeeee"))
                                .lineSpacing(4.8)
                                .multilineTextAlignment(.leading)
                            Spacer()
                        }
                    }
                    .padding(.horizontal, 24)
                    
                    // OTP Input Fields
                    HStack(spacing: 16) {
                        ForEach(0..<4, id: \.self) { index in
                            OTPDigitField(
                                digit: otpCode[index],
                                isActive: index == activeIndex,
                                isFilled: !otpCode[index].isEmpty
                            )
                        }
                    }
                    .padding(.horizontal, 24)
                    
                    // Resend Code Section
                    VStack(spacing: 16) {
                        Text(canResend ? 
                             "Tap below to resend code" : 
                             "You can resend the code in \(timeRemaining) seconds")
                            .font(.custom("Urbanist", size: 18))
                            .fontWeight(.regular)
                            .foregroundColor(Color(hex: "#eeeeee"))
                        
                        Button("Resend code") {
                            resendCode()
                        }
                        .font(.custom("Urbanist", size: 18))
                        .fontWeight(.semibold)
                        .foregroundColor(canResend ? Color(hex: "#8db439") : Color(hex: "#bdbdbd"))
                        .disabled(!canResend)
                    }
                    .padding(.horizontal, 24)
                }
                
                Spacer()
                
                // Numeric Keyboard
                NumericKeypadView(onNumberTap: { number in
                    handleNumberInput(number)
                }, onDeleteTap: {
                    handleDelete()
                })
            }
        }
        .onAppear {
            startCountdown()
        }
    }
    
    private func handleNumberInput(_ number: String) {
        if activeIndex < 4 {
            otpCode[activeIndex] = number
            if activeIndex < 3 {
                activeIndex += 1
            }
        }
    }
    
    private func handleDelete() {
        if activeIndex > 0 {
            if otpCode[activeIndex].isEmpty {
                activeIndex -= 1
            }
            otpCode[activeIndex] = ""
        }
    }
    
    private func resendCode() {
        // Reset timer and OTP
        timeRemaining = 60
        canResend = false
        otpCode = ["", "", "", ""]
        activeIndex = 0
        startCountdown()
    }
    
    private func startCountdown() {
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                canResend = true
                timer.invalidate()
            }
        }
    }
}

// MARK: - OTP Digit Field Component
struct OTPDigitField: View {
    let digit: String
    let isActive: Bool
    let isFilled: Bool
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(hex: "#1f222a"))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(isActive ? Color(hex: "#8db439") : Color(hex: "#1f222a"), lineWidth: 2)
                )
                .background(
                    isActive ? Color(hex: "#0cc25f").opacity(0.08) : Color.clear
                )
            
            Text(digit)
                .font(.custom("Urbanist", size: 24))
                .fontWeight(.bold)
                .foregroundColor(.white)
        }
        .frame(width: 83.5, height: 66)
    }
}

// MARK: - Numeric Keypad
struct NumericKeypadView: View {
    let onNumberTap: (String) -> Void
    let onDeleteTap: () -> Void
    
    let numbers = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["*", "0", "⌫"]
    ]
    
    var body: some View {
        VStack(spacing: 8) {
            ForEach(numbers, id: \.self) { row in
                HStack(spacing: 8) {
                    ForEach(row, id: \.self) { item in
                        KeypadButton(text: item) {
                            if item == "⌫" {
                                onDeleteTap()
                            } else if item != "*" {
                                onNumberTap(item)
                            }
                        }
                    }
                }
            }
        }
        .padding(.horizontal, 12)
        .padding(.bottom, 34)
        .background(Color(hex: "#1f222a"))
    }
}

// MARK: - Keypad Button
struct KeypadButton: View {
    let text: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            ZStack {
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color(hex: "#1f222a"))
                    .frame(width: 130, height: 56)
                
                if text == "⌫" {
                    Image(systemName: "delete.left")
                        .font(.system(size: 24, weight: .medium))
                        .foregroundColor(.white)
                } else {
                    Text(text)
                        .font(.custom("SF Pro Display", size: 24))
                        .fontWeight(.medium)
                        .foregroundColor(.white)
                }
            }
        }
        .disabled(text == "*")
    }
}

// MARK: - Navigation Header
struct NavigationHeaderView: View {
    let title: String
    
    var body: some View {
        HStack {
            Button(action: {}) {
                Image(systemName: "arrow.left")
                    .font(.system(size: 20, weight: .medium))
                    .foregroundColor(.white)
            }
            
            Spacer()
            
            Text(title)
                .font(.custom("Urbanist", size: 24))
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            Spacer()
            
            Button("Continue") {
                // Handle continue action
            }
            .font(.custom("Urbanist", size: 20))
            .fontWeight(.bold)
            .foregroundColor(Color(hex: "#8db439"))
        }
        .padding(.horizontal, 24)
        .frame(height: 48)
    }
}

// MARK: - Status Bar
struct StatusBarView: View {
    var body: some View {
        HStack {
            Text("9:41")
                .font(.custom("Urbanist", size: 16))
                .fontWeight(.semibold)
                .foregroundColor(.white)
            
            Spacer()
            
            HStack(spacing: 6) {
                // Signal, WiFi, Battery icons
                Rectangle()
                    .fill(.white)
                    .frame(width: 18, height: 10)
                    .cornerRadius(2)
                
                Rectangle()
                    .fill(.white)
                    .frame(width: 15, height: 11)
                    .cornerRadius(2)
                
                Rectangle()
                    .fill(.white)
                    .frame(width: 27, height: 13)
                    .cornerRadius(3)
            }
        }
        .padding(.horizontal, 24)
        .frame(height: 44)
    }
}

// MARK: - Private Color Helper
private struct ColorHelper {
    static func colorFromHex(_ hex: String) -> Color {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        return Color(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Preview
struct OTPVerificationScreen_Previews: PreviewProvider {
    static var previews: some View {
        OTPVerificationScreen()
            .preferredColorScheme(.dark)
    }
} 