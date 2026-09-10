import chalk from "chalk";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import connectDB from "./db/db.connection";
import { connectRedis } from "./db/redis.connection";
import authRouter from "./modules/auth/auth.controller";
import userRouter, {
  routes as userRoutes,
} from "./modules/users/user.controller";
import postRouter, {
  routes as postRoutes,
} from "./modules/post/post.controller";
import { intializeSocketIo } from "./modules/gateway/gateway";
import chatRouter, {
  routes as chatRoutes,
} from "./modules/chat/chat.controller";
import { schema } from "./modules/graphql/graphql.schema";
import { createHandler } from "graphql-http/lib/use/express";
export const bootstrap = async () => {
  await connectDB();
  await connectRedis();

  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/auth", authRouter);
  app.use(userRoutes.base, userRouter);
  app.use(
    "/graphql",
    createHandler({
      schema,
      context: (req) => ({ tok: req.raw.headers.authorization }),
    }),
  );
  app.use(postRoutes.base, postRouter);
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Route not found",
    });
  });

  app.use(chatRoutes.base, chatRouter);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode: number =
      typeof err.statusCode === "number" ? err.statusCode : 500;
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: err.message ?? "Internal Server Error",
    });
  });

  const httpServer = app.listen(process.env.PORT, () => {
    console.log(chalk.bgBlue(`🚀 App is running on port ${process.env.PORT}`));
  });

  intializeSocketIo(httpServer);
};
