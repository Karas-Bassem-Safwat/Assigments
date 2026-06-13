import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(`DB connection error: `, error);
  }
};
