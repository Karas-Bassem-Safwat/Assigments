"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
const mongoose_1 = require("mongoose");
const MessageShema = new mongoose_1.Schema({
    content: {
        type: String,
        required: function () {
            return this.attachments.length == 0;
        },
    },
    attachments: { type: [String] },
    createdBy: { type: mongoose_1.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date },
    updatedAt: { type: Date },
}, {
    timestamps: true,
});
const chatSchema = new mongoose_1.Schema({
    participants: { type: [mongoose_1.Types.ObjectId], ref: "User" },
    messages: { MessageShema },
    group: { type: String },
    groupImg: { type: String },
    roomId: { type: String },
    createdBy: { type: mongoose_1.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}, {
    timestamps: true,
});
exports.chatModel = (0, mongoose_1.model)("Chat", chatSchema);
