"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const user_defenition_1 = require("./user.defenition");
const hashing_1 = require("../../utils/security/hashing");
const encryption_1 = require("../../utils/security/encryption");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: async function (value) {
            const hashedPassword = await (0, hashing_1.hashPassword)(value);
            return hashedPassword;
        },
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        set: function (value) {
            const encryptedPhone = (0, encryption_1.encrypt)(value);
            return encryptedPhone;
        },
        get: function (value) {
            const decryptedPhone = (0, encryption_1.decrypt)(value);
            return decryptedPhone;
        },
    },
    gender: {
        type: Number,
        enum: user_defenition_1.Gender,
        required: true,
    },
    role: {
        type: Number,
        enum: user_defenition_1.Role,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isOnIine: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
    },
    coverPics: {
        type: [String],
    },
    profilePic: {
        type: String,
    },
}, {});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
