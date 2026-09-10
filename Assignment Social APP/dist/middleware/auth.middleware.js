"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_connection_1 = require("../db/redis.connection");
const error_exceptions_1 = require("../utils/error.exceptions");
const authMiddleware = async (req, res, next) => {
    const rawAuth = req.headers["authorization"];
    const token = req.headers["token"] ||
        (rawAuth?.startsWith("Bearer ") ? rawAuth.slice(7) : rawAuth);
    if (!token) {
        return next(new error_exceptions_1.noContent("No authentication token provided"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const blacklisted = await (0, redis_connection_1.isTokenBlacklisted)(decoded.jti ?? token);
        if (blacklisted) {
            return next(new error_exceptions_1.Auth("Token has been invalidated. Please log in again."));
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch {
        next(new error_exceptions_1.Auth("Invalid or expired token"));
    }
};
exports.default = authMiddleware;
