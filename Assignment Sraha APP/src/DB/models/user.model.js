import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [60, "Age must be at most 60"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
