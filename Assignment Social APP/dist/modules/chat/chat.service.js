"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const user_model_1 = require("../users/models/user.model");
const error_exceptions_1 = require("../../utils/error.exceptions");
const chat_model_1 = require("./models/chat.model");
class Chat {
    async getChat({ user, id }) {
        const friend = await user_model_1.userModel.findById(id);
        if (!friend) {
            throw new error_exceptions_1.notFound("friend not found");
        }
        let chat = await chat_model_1.chatModel
            .findOne({
            group: {
                $exists: false,
            },
            participants: {
                $all: [friend._id, user._id],
            },
        })
            .populate("particiants");
        if (!chat) {
            chat = await chat_model_1.chatModel.create({
                participants: [friend._id, user._id],
            });
        }
        return { data: { chat } };
    }
}
exports.chatService = new Chat();
