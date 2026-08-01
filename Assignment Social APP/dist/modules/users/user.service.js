"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const user_model_1 = require("./user.model");
const encryption_1 = require("../../utils/encryption");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = async (req, res, next) => {
    try {
        const { name, email, password, phone, age, gender, role } = req.body;
        const existingUser = await user_model_1.userModel.findOne({
            email: email.toLowerCase(),
        });
        if (existingUser) {
            return next(new ConflictError("Email already exists"));
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const encryptedPhone = (0, encryption_1.encryptPhone)(phone);
        const newUser = await user_model_1.userModel.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone: encryptedPhone,
            age,
            gender,
            role,
        });
        return res.status(201).json({
            message: "User registered successfully",
            newUser,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.signup = signup;
