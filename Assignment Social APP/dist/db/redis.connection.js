"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));
const connectRedis = async () => {
    await redisClient.connect();
    console.log("✅ Redis connected");
};
exports.connectRedis = connectRedis;
exports.default = redisClient;
