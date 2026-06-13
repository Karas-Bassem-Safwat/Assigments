import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      validate: {
        validator: function (value) {
          // Title must NOT be entirely uppercase
          return value !== value.toUpperCase();
        },
        message:
          'Title must not be entirely uppercase. Use mixed case (e.g., "First Note" instead of "FIRST NOTE").',
      },
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
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
