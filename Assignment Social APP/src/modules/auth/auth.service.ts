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
import { userModel } from "../users/models/user.model";
import { loginType, SignUpType, VerifyOtpType } from "./aut.validation";

class AuthService {
  async signUP(data: SignUpType) {
    const { bio, email, gender, password, phone, age, name } = data;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      throw new badRequest("Email already exists");
    }

    const user = await userModel.create({
      name,
      bio,
      email,
      gender,
      password,
      phone,
      age: age ?? 18,
      role: 0,
      isActive: false,
      isOnIine: false,
    });

    const otp: number = createOTP();
    await storeOTP(user._id.toString(), otp);

    sendEmail({
      to: email,
      subject: "Confirm your email – OTP inside",
      html: otpEmailTemplate(otp),
    }).catch((err) =>
      console.error("❌ Failed to send verification email:", err),
    );

    return {
      message:
        "Account created successfully. Please check your email for the OTP to verify your account.",
      userId: user._id,
    };
  }

  async verifyOTP(data: VerifyOtpType) {
    const { userId, otp } = data;

    const storedOTP = await getOTP(userId);
    if (!storedOTP) {
      throw new badRequest(
        "OTP has expired or is invalid. Please request a new one.",
      );
    }

    if (storedOTP !== otp.toString()) {
      throw new badRequest("Incorrect OTP. Please try again.");
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { confirmedAt: new Date(), isActive: true },
      { new: true },
    );

    if (!user) {
      throw new notFound("User not found");
    }

    await deleteOTP(userId);

    return { message: "Email verified successfully. You can now log in." };
  }

  async login(data: loginType) {
    const { email, password } = data;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new notFound("No account found with this email");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new badRequest("Invalid credentials");
    }

    if (!user.confirmedAt) {
      throw new badRequest("Please verify your email before logging in");
    }

    const token = generateToken(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    await setUserOnline(user._id.toString());

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
