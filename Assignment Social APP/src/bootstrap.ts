import chalk from "chalk";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import connectDB from "./db/db.connection";
import { connectRedis } from "./db/redis.connection";
import authRouter from "./modules/auth/auth.controller";
import userRouter from "./modules/users/user.controller";

export const bootstrap = async () => {
  // ── Database connections ─────────────────────────────────────────────────
  await connectDB();
  await connectRedis();

  // ── Express app ──────────────────────────────────────────────────────────
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
  app.use(express.json());
  app.use(morgan("dev"));

  // ── Routes ───────────────────────────────────────────────────────────────
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  // ── 404 handler ──────────────────────────────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Route not found",
    });
  });

  // ── Global error handler ─────────────────────────────────────────────────
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode: number =
      typeof err.statusCode === "number" ? err.statusCode : 500;
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: err.message ?? "Internal Server Error",
    });
  });

  // ── Start ─────────────────────────────────────────────────────────────────
  app.listen(process.env.PORT, () => {
    console.log(
      chalk.bgBlue(`🚀 App is running on port ${process.env.PORT}`)
    );
  });
};
