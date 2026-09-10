"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const user_types_1 = require("../types/user.types");
const hashing_1 = require("../../../utils/security/hashing");
const encryption_1 = require("../../../utils/security/encryption");
const friendRequest_types_1 = require("../types/friendRequest.types");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        set: async function (value) {
            return await (0, hashing_1.hashPassword)(value);
        },
    },
    phone: {
        type: String,
        required: true,
        set: function (value) {
            return (0, encryption_1.encrypt)(value);
        },
        get: function (value) {
            return (0, encryption_1.decrypt)(value);
        },
    },
    gender: {
        type: Number,
        enum: user_types_1.Gender,
        required: true,
    },
    role: {
        type: Number,
        enum: user_types_1.Role,
        default: user_types_1.Role.user,
    },
    age: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    isOnIine: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    confirmedAt: {
        type: Date,
        default: null,
    },
    changedCredentialsAt: {
        type: Date,
        default: null,
    },
    profilePic: {
        type: String,
        default: null,
    },
    coverPics: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
userSchema.virtual("received", {
    localField: "_id",
    foreignField: "to",
    ref: "frienRequest",
    match: { status: friendRequest_types_1.friendRequestEnum.accepted }
});
userSchema.virtual("sent", {
    localField: "_id",
    foreignField: "from",
    ref: "frienRequest",
    match: { status: friendRequest_types_1.friendRequestEnum.accepted }
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
