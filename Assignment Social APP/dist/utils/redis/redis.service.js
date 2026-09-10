"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectedSocketsKey = exports.jwtKey = exports.confirmEmailKey = void 0;
const confirmEmailKey = (userId) => `users:${userId}:confirmEmailOTP`;
exports.confirmEmailKey = confirmEmailKey;
const jwtKey = (userId, jwtId) => `users:${userId}:${jwtId}`;
exports.jwtKey = jwtKey;
const connectedSocketsKey = (userId) => `users:${userId}:sockets`;
exports.connectedSocketsKey = connectedSocketsKey;
