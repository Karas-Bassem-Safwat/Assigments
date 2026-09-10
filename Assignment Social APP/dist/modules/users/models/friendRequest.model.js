"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestModel = void 0;
const mongoose_1 = require("mongoose");
const friendRequest_types_1 = require("../types/friendRequest.types");
const friendRequestSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Types.ObjectId,
        require: true,
        ref: "User",
    },
    to: {
        type: mongoose_1.Types.ObjectId,
        require: true,
        ref: "User",
    },
    status: {
        type: Number,
        default: friendRequest_types_1.friendRequestEnum.pendenig,
        enum: Object.values(friendRequest_types_1.friendRequestEnum),
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
exports.friendRequestModel = (0, mongoose_1.model)("frienRequest", friendRequestSchema);
