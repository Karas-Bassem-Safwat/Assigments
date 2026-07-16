import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./src/DB/connection.js";
import { connectRedis } from "./src/DB/redis.js";
import bootstrap from "./src/bootstrap.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "token", "authorization"],
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

bootstrap(app);

const PORT = process.env.PORT || 3000;

Promise.all([connectDB(), connectRedis()])
  .then(() =>
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)),
  )
  .catch((err) => {
    console.error("❌ error:", err.message);
  });
