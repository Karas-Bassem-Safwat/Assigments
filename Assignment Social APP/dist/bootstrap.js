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
exports.bootstrap = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_connection_1 = __importDefault(require("./db/db.connection"));
const redis_connection_1 = require("./db/redis.connection");
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const user_controller_1 = __importStar(require("./modules/users/user.controller"));
const post_controller_1 = __importStar(require("./modules/post/post.controller"));
const gateway_1 = require("./modules/gateway/gateway");
const chat_controller_1 = __importStar(require("./modules/chat/chat.controller"));
const bootstrap = async () => {
    await (0, db_connection_1.default)();
    await (0, redis_connection_1.connectRedis)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN ?? "*" }));
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use("/auth", auth_controller_1.default);
    app.use(user_controller_1.routes.base, user_controller_1.default);
    app.use(post_controller_1.routes.base, post_controller_1.default);
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: "Route not found",
        });
    });
    app.use(chat_controller_1.routes.base, chat_controller_1.default);
    app.use((err, _req, res, _next) => {
        const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: err.message ?? "Internal Server Error",
        });
    });
    const httpServer = app.listen(process.env.PORT, () => {
        console.log(chalk_1.default.bgBlue(`🚀 App is running on port ${process.env.PORT}`));
    });
    (0, gateway_1.intializeSocketIo)(httpServer);
};
exports.bootstrap = bootstrap;
