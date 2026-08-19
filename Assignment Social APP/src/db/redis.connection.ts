import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL as string,
});

redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));
redisClient.on("connect", () => console.log("🔄 Redis connecting..."));
redisClient.on("reconnecting", () => console.log("🔁 Redis reconnecting..."));

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("✅ Redis connected");
};



/** OTP lives for 5 minutes */
const OTP_TTL_SECONDS = 300;

/**
 * Store an OTP for a specific user.
 * Key pattern: `otp:<userId>`
 */
export const storeOTP = async (userId: string, otp: number): Promise<void> => {
  await redisClient.setEx(`otp:${userId}`, OTP_TTL_SECONDS, otp.toString());
};

/**
 * Retrieve the stored OTP for a user.
 * Returns null if the key doesn't exist (expired or never set).
 */
export const getOTP = async (userId: string): Promise<string | null> => {
  return await redisClient.get(`otp:${userId}`);
};

/**
 * Delete the OTP after successful verification.
 */
export const deleteOTP = async (userId: string): Promise<void> => {
  await redisClient.del(`otp:${userId}`);
};



/**
 * Blacklist a JWT (e.g. on logout) until it would have naturally expired.
 * @param jti  JWT ID claim or the token itself
 * @param ttl  seconds until the JWT expires
 */
export const blacklistToken = async (jti: string, ttl: number): Promise<void> => {
  await redisClient.setEx(`blacklist:${jti}`, ttl, "1");
};

/**
 * Check whether a token has been blacklisted.
 */
export const isTokenBlacklisted = async (jti: string): Promise<boolean> => {
  const result = await redisClient.get(`blacklist:${jti}`);
  return result !== null;
};



/**
 * Mark a user as online (no expiry — cleared on logout or disconnect).
 */
export const setUserOnline = async (userId: string): Promise<void> => {
  await redisClient.set(`online:${userId}`, "1");
};

/**
 * Remove the online marker for a user.
 */
export const setUserOffline = async (userId: string): Promise<void> => {
  await redisClient.del(`online:${userId}`);
};

/**
 * Check whether a user is currently online.
 */
export const isUserOnline = async (userId: string): Promise<boolean> => {
  const result = await redisClient.get(`online:${userId}`);
  return result !== null;
};

export default redisClient;
