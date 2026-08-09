"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_defenition_1 = require("../users/user.defenition");
exports.signUpSchema = {
    body: zod_1.default.object({
        email: zod_1.default.email(),
        password: zod_1.default.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/),
        age: zod_1.default.number().optional(),
        gender: zod_1.default.union([zod_1.default.literal(user_defenition_1.Gender.male), zod_1.default.literal(user_defenition_1.Gender.female)]),
        bio: zod_1.default.string(),
        phone: zod_1.default.string(),
    }),
};
exports.loginSchema = {
    body: zod_1.default.object({
        email: zod_1.default.email(),
        password: zod_1.default.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W]).{8,}$/),
    }),
};
