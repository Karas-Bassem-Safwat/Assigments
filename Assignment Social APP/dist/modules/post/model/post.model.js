"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const post_types_1 = require("./post.types");
const zod_1 = require("zod");
const postSchema = new mongoose_1.Schema({
    title: {
        type: zod_1.string,
    },
    content: {
        type: zod_1.string,
        required: function () {
            return this.attachments.length > 0;
        },
    },
    attachments: {
        type: [zod_1.string],
    },
    likes: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
    },
    privacy: {
        type: Number,
        default: post_types_1.PostPrivacyEnum.public,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
    toObject: {
        virtuals: true,
        getters: true,
    },
});
exports.postModel = (0, mongoose_1.model)("Post", postSchema);
