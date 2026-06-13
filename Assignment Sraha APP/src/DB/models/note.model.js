import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      validate: {
        validator: (value) => value !== value.toUpperCase(),
        message:
          'Title must not be entirely uppercase (e.g. use "First Note" not "FIRST NOTE").',
      },
    },
    content: { type: String, required: [true, "Content is required"] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
