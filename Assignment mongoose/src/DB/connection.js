import mongoose from "mongoose";

const url = "mongodb://localhost:27017/assignment8";

export const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(`DB connection error: `, error);
  }
};
