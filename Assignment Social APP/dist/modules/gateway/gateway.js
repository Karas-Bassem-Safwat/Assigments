"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intializeSocketIo = void 0;
const socket_io_1 = require("socket.io");
const redis_connection_1 = __importDefault(require("../../db/redis.connection"));
const redis_service_1 = require("../../utils/redis/redis.service");
const chat_gateway_1 = require("../chat/chat.gateway");
const connectedSockets = new Map();
const intializeSocketIo = (httpServer) => {
    const io = new socket_io_1.Server(httpServer);
    io.use((socket, next) => {
        try {
            socket.handshake.headers.authorization;
            next();
        }
        catch (error) {
            console.log("error: ", error);
        }
    });
    io.on("connect", (socket) => {
        registerNewUser(socket);
        socket.on("login_success", (data) => {
            console.log({ data });
        });
        socket.on("disconnect", () => {
            revokeUser(socket);
            console.log("new connection detected ==>", socket.id);
        });
        socket.emit("user_data", socket.user);
        chat_gateway_1.chatGateway.register(socket);
    });
};
exports.intializeSocketIo = intializeSocketIo;
const registerNewUser = async (socket) => {
    let userSockets = await redis_connection_1.default.get((0, redis_service_1.connectedSocketsKey)(socket.user.id));
    if (userSockets) {
        userSockets = JSON.parse(userSockets);
        await redis_connection_1.default.set((0, redis_service_1.connectedSocketsKey)(socket.user.id), JSON.stringify([socket.id, ...userSockets]));
    }
    else {
        await redis_connection_1.default.set((0, redis_service_1.connectedSocketsKey)(socket.user.id), JSON.stringify([socket.id]));
    }
};
const revokeUser = async (socket) => {
    let userSockets = await redis_connection_1.default.get((0, redis_service_1.connectedSocketsKey)(socket.user.id));
    let newUserSockets = JSON.parse(userSockets);
    newUserSockets = newUserSockets.filter((ele) => {
        return ele != socket.id;
    });
    if (newUserSockets.length == 0) {
        await redis_connection_1.default.del((0, redis_service_1.connectedSocketsKey)(socket.id));
    }
    else {
        await redis_connection_1.default.set((0, redis_service_1.connectedSocketsKey)(socket.id), JSON.stringify(newUserSockets));
    }
};
