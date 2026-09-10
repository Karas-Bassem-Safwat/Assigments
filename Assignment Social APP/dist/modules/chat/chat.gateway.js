"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGateway = exports.ChatGateway = void 0;
class ChatGateway {
    register(socket) {
        socket.on("sendMessage", (data) => {
            console.log({ data });
        });
    }
}
exports.ChatGateway = ChatGateway;
exports.chatGateway = new ChatGateway();
