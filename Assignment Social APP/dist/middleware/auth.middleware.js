"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_exceptions_1 = require("../utils/error.exceptions");
const authMiddleware = (req, res, next) => {
    const token = req.headers.get("token") || req.headers.get("authorization");
    if (!token)
        return new error_exceptions_1.noContent();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETv);
        req.userId = decoded.userId;
        next();
    }
    catch {
        throw new error_exceptions_1.Auth();
    }
};
exports.default = authMiddleware;
