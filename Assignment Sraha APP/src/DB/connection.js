import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../config/.env", import.meta.url) });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
};

export default connectDB;
