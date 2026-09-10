"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserOnline = exports.setUserOffline = exports.setUserOnline = exports.isTokenBlacklisted = exports.blacklistToken = exports.deleteOTP = exports.getOTP = exports.storeOTP = exports.connectRedis = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));
redisClient.on("connect", () => console.log("🔄 Redis connecting..."));
redisClient.on("reconnecting", () => console.log("🔁 Redis reconnecting..."));
const connectRedis = async () => {
    await redisClient.connect();
    console.log("✅ Redis connected");
};
exports.connectRedis = connectRedis;
/** OTP lives for 5 minutes */
const OTP_TTL_SECONDS = 300;
/**
 * Store an OTP for a specific user.
 * Key pattern: `otp:<userId>`
 */
const storeOTP = async (userId, otp) => {
    await redisClient.setEx(`otp:${userId}`, OTP_TTL_SECONDS, otp.toString());
};
exports.storeOTP = storeOTP;
/**
 * Retrieve the stored OTP for a user.
 * Returns null if the key doesn't exist (expired or never set).
 */
const getOTP = async (userId) => {
    return await redisClient.get(`otp:${userId}`);
};
exports.getOTP = getOTP;
/**
 * Delete the OTP after successful verification.
 */
const deleteOTP = async (userId) => {
    await redisClient.del(`otp:${userId}`);
};
exports.deleteOTP = deleteOTP;
/**
 * Blacklist a JWT (e.g. on logout) until it would have naturally expired.
 * @param jti  JWT ID claim or the token itself
 * @param ttl  seconds until the JWT expires
 */
const blacklistToken = async (jti, ttl) => {
    await redisClient.setEx(`blacklist:${jti}`, ttl, "1");
};
exports.blacklistToken = blacklistToken;
/**
 * Check whether a token has been blacklisted.
 */
const isTokenBlacklisted = async (jti) => {
    const result = await redisClient.get(`blacklist:${jti}`);
    return result !== null;
};
exports.isTokenBlacklisted = isTokenBlacklisted;
/**
 * Mark a user as online (no expiry — cleared on logout or disconnect).
 */
const setUserOnline = async (userId) => {
    await redisClient.set(`online:${userId}`, "1");
};
exports.setUserOnline = setUserOnline;
/**
 * Remove the online marker for a user.
 */
const setUserOffline = async (userId) => {
    await redisClient.del(`online:${userId}`);
};
exports.setUserOffline = setUserOffline;
/**
 * Check whether a user is currently online.
 */
const isUserOnline = async (userId) => {
    const result = await redisClient.get(`online:${userId}`);
    return result !== null;
};
exports.isUserOnline = isUserOnline;
exports.default = redisClient;
