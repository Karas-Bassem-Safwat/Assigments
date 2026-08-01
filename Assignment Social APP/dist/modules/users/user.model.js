"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const user_defenition_1 = require("./user.defenition");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
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
