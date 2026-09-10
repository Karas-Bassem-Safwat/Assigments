"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const userValidatoin = __importStar(require("./userValidation"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const user_service_1 = require("./user.service");
const chat_controller_1 = __importDefault(require("../chat/chat.controller"));
const router = (0, express_1.Router)();
exports.routes = {
    base: "/users",
    sendFriendRequest: "/send-friend-request",
    friendRequestReplay: "/reply-friend-request/:id",
    listFriendRequest: "/list-friend-request",
    cacnelFriendRequest: "/cancel-friend-request/:id",
    listFriends: "/list-friends",
};
router.use("/:id/chat", chat_controller_1.default);
router.post(exports.routes.sendFriendRequest, (0, validation_middleware_1.validation)(userValidatoin.sendFriendRequestSchema), auth_middleware_1.default, async (req, res) => {
    const { to } = req.body;
    const { id: from } = req.user;
    await user_service_1.userService.sendFriendRequest({ to, from });
    return res.status(202).json({ message: "Success" });
});
router.patch(exports.routes.friendRequestReplay, (0, validation_middleware_1.validation)(userValidatoin.friendRequestReplay), auth_middleware_1.default, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?._id;
    await user_service_1.userService.friendRequestReplay({ id, status, userId });
    return res.status(202).json({ message: "Success" });
});
router.get(exports.routes.listFriendRequest, async (req, res) => {
    const userId = req.user._id;
    const { isTo = true } = req.query;
    const { data } = await user_service_1.userService.listfriendRequests({
        userId,
        isTo: JSON.parse(isTo),
    });
    return res.status(200).json({ data });
});
router.patch(exports.routes.cacnelFriendRequest, auth_middleware_1.default, (0, validation_middleware_1.validation)(userValidatoin.cancelFriendRequest), async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    await user_service_1.userService.cancelFriendRequest({
        id,
        userId,
    });
    return res.status(200).json({ message: "Canceld" });
});
router.get(exports.routes.listFriends, auth_middleware_1.default, async (req, res) => {
    const user = req.user;
    const data = await user_service_1.userService.listFriends({ user });
    return res.status(200).json({ message: `friends :\n ${data} ` });
});
exports.default = router;
