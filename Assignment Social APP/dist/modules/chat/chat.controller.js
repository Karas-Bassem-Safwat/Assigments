"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const chat_service_1 = require("./chat.service");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/chats",
    getChat: "/",
};
router.get(exports.routes.getChat, auth_middleware_1.default, async (req, res) => {
    const { user } = req;
    const id = req.params.id;
    const data = chat_service_1.chatService.getChat({ user, id });
    return res.status(200).json({ data });
});
exports.default = router;
