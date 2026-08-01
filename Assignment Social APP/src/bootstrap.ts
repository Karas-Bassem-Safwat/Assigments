import connectDB from "./db/db.connection";
import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import userRouter from "./modules/users/user.controller";

export const bootstrap = async () => {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/user", userRouter);
  app.listen(process.env.PORT, () => {
    console.log(chalk.bgBlue(`app is running on port ${process.env.PORT}`));
  });
};
