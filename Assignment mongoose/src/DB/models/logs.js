import mongoose, { Schema } from "mongoose";

const logsSchema = new Schema({
  book_id: String,
  action: String,
});

export const Log = mongoose.model("logs", logsSchema);
