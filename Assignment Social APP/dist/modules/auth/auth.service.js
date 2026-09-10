"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const createOtp_1 = require("../../utils/email/createOtp");
const sendEmail_1 = require("../../utils/email/sendEmail");
const template_1 = require("../../utils/email/template");
const error_exceptions_1 = require("../../utils/error.exceptions");
const hashing_1 = require("../../utils/security/hashing");
const token_1 = require("../../utils/security/token");
const redis_connection_1 = require("../../db/redis.connection");
const user_model_1 = require("../users/models/user.model");
class AuthService {
    async signUP(data) {
        const { bio, email, gender, password, phone, age, name } = data;
        const isEmailExist = await user_model_1.userModel.findOne({ email });
        if (isEmailExist) {
            throw new error_exceptions_1.badRequest("Email already exists");
        }
        const user = await user_model_1.userModel.create({
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
        const otp = (0, createOtp_1.createOTP)();
        await (0, redis_connection_1.storeOTP)(user._id.toString(), otp);
        (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Confirm your email – OTP inside",
            html: (0, template_1.otpEmailTemplate)(otp),
        }).catch((err) => console.error("❌ Failed to send verification email:", err));
        return {
            message: "Account created successfully. Please check your email for the OTP to verify your account.",
            userId: user._id,
        };
    }
    async verifyOTP(data) {
        const { userId, otp } = data;
        const storedOTP = await (0, redis_connection_1.getOTP)(userId);
        if (!storedOTP) {
            throw new error_exceptions_1.badRequest("OTP has expired or is invalid. Please request a new one.");
        }
        if (storedOTP !== otp.toString()) {
            throw new error_exceptions_1.badRequest("Incorrect OTP. Please try again.");
        }
        const user = await user_model_1.userModel.findByIdAndUpdate(userId, { confirmedAt: new Date(), isActive: true }, { new: true });
        if (!user) {
            throw new error_exceptions_1.notFound("User not found");
        }
        await (0, redis_connection_1.deleteOTP)(userId);
        return { message: "Email verified successfully. You can now log in." };
    }
    async login(data) {
        const { email, password } = data;
        const user = await user_model_1.userModel.findOne({ email });
        if (!user) {
            throw new error_exceptions_1.notFound("No account found with this email");
        }
        const isPasswordValid = await (0, hashing_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new error_exceptions_1.badRequest("Invalid credentials");
        }
        if (!user.confirmedAt) {
            throw new error_exceptions_1.badRequest("Please verify your email before logging in");
        }
        const token = (0, token_1.generateToken)({ userId: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        await (0, redis_connection_1.setUserOnline)(user._id.toString());
        await user_model_1.userModel.findByIdAndUpdate(user._id, { isOnIine: true });
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
exports.authService = new AuthService();
