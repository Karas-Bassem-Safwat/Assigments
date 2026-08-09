"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createOtp_1 = require("../../utils/email/createOtp");
const sendEmail_1 = require("../../utils/email/sendEmail");
const template_1 = require("../../utils/email/template");
const error_exceptions_1 = require("../../utils/error.exceptions");
const user_model_1 = require("../users/user.model");
class AuthService {
    async signUP(data) {
        const { bio, email, gender, password, phone, age } = data;
        const isEmailExist = await user_model_1.userModel.findOne({ email });
        if (isEmailExist) {
            throw new error_exceptions_1.badRequest("Email already exist");
        }
        const user = user_model_1.userModel.create({
            bio,
            email,
            gender,
            password,
            phone,
            age: age,
        });
        const otp = (0, createOtp_1.createOTP)();
        (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "confirm mail",
            html: (0, template_1.otpEmailTemplate)(otp),
        });
        return "user";
    }
}
