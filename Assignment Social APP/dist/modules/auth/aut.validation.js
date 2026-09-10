"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.verifyOtpSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_types_1 = require("../users/types/user.types");
exports.signUpSchema = {
    body: zod_1.default.object({
        name: zod_1.default.string().min(2).max(50),
        email: zod_1.default.email(),
        password: zod_1.default
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/, "Password must be at least 8 characters with uppercase, lowercase, and a special character"),
        age: zod_1.default.number().min(13).max(120).optional(),
        gender: zod_1.default.union([zod_1.default.literal(user_types_1.Gender.male), zod_1.default.literal(user_types_1.Gender.female)]),
        bio: zod_1.default.string().max(300),
        phone: zod_1.default.string().min(7).max(20),
    }),
};
exports.verifyOtpSchema = {
    body: zod_1.default.object({
        userId: zod_1.default.string().min(1),
        otp: zod_1.default.number().int().min(1).max(999999),
    }),
};
exports.loginSchema = {
    body: zod_1.default.object({
        email: zod_1.default.email(),
        password: zod_1.default
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/, "Invalid password format"),
    }),
};
