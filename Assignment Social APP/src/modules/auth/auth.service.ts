import { createOTP } from "../../utils/email/createOtp";
import { sendEmail } from "../../utils/email/sendEmail";
import { otpEmailTemplate } from "../../utils/email/template";
import { badRequest, notFound } from "../../utils/error.exceptions";
import { comparePassword } from "../../utils/security/hashing";
import { generateToken } from "../../utils/security/token";
import {
  deleteOTP,
  getOTP,
  setUserOnline,
  storeOTP,
} from "../../db/redis.connection";
import { userModel } from "../users/user.model";
import { loginType, SignUpType, VerifyOtpType } from "./aut.validation";

class AuthService {
  // ─── Sign Up ────────────────────────────────────────────────────────────────

  async signUP(data: SignUpType) {
    const { bio, email, gender, password, phone, age, name } = data;

    // 1. Duplicate email check
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      throw new badRequest("Email already exists");
    }

    // 2. Create user (password hashed & phone encrypted via model setters)
    const user = await userModel.create({
      name,
      bio,
      email,
      gender,
      password,
      phone,
      age: age ?? 18,
      role: 0, // default: user
      isActive: false,
      isOnIine: false,
    });

    // 3. Generate OTP and persist in Redis (5 min TTL)
    const otp: number = createOTP();
    await storeOTP(user._id.toString(), otp);

    // 4. Send verification email (fire-and-forget)
    sendEmail({
      to: email,
      subject: "Confirm your email – OTP inside",
      html: otpEmailTemplate(otp),
    }).catch((err) =>
      console.error("❌ Failed to send verification email:", err)
    );

    return {
      message:
        "Account created successfully. Please check your email for the OTP to verify your account.",
      userId: user._id,
    };
  }

  // ─── Verify OTP ─────────────────────────────────────────────────────────────

  async verifyOTP(data: VerifyOtpType) {
    const { userId, otp } = data;

    // 1. Check OTP exists in Redis
    const storedOTP = await getOTP(userId);
    if (!storedOTP) {
      throw new badRequest("OTP has expired or is invalid. Please request a new one.");
    }

    // 2. Compare OTP
    if (storedOTP !== otp.toString()) {
      throw new badRequest("Incorrect OTP. Please try again.");
    }

    // 3. Mark user as verified & active
    const user = await userModel.findByIdAndUpdate(
      userId,
      { confirmedAt: new Date(), isActive: true },
      { new: true }
    );

    if (!user) {
      throw new notFound("User not found");
    }

    // 4. Remove OTP from Redis
    await deleteOTP(userId);

    return { message: "Email verified successfully. You can now log in." };
  }

  // ─── Login ──────────────────────────────────────────────────────────────────

  async login(data: loginType) {
    const { email, password } = data;

    // 1. Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new notFound("No account found with this email");
    }

    // 2. Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new badRequest("Invalid credentials");
    }

    // 3. Ensure email is confirmed
    if (!user.confirmedAt) {
      throw new badRequest(
        "Please verify your email before logging in"
      );
    }

    // 4. Generate JWT (7-day expiry)
    const token = generateToken(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // 5. Mark online in Redis
    await setUserOnline(user._id.toString());

    // 6. Set isOnline flag in DB
    await userModel.findByIdAndUpdate(user._id, { isOnIine: true });

    return {
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        bio: user.bio,
        age: user.age,
        profilePic: user.profilePic ?? null,
      },
    };
  }
}

export const authService = new AuthService();
