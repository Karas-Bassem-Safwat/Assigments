import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log(chalk.bgGreen("✅ MongoDB connected"));
  } catch (error) {
    console.log(chalk.bgRed(`error:${error}`));
  }
};

export default connectDB;
