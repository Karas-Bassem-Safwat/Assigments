import mongoose, { Schema } from "mongoose";

const authorsSchema = new Schema({
  name: String,
  nationality: String,
});

export const Author = mongoose.model("authors", authorsSchema);
