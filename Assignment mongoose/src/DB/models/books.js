import mongoose, { Schema } from "mongoose";

const booksSchema = new Schema({
  title: String,
  author: String,
  year: Number,
  genres: [String],
});

export const Book = mongoose.model("books", booksSchema);
