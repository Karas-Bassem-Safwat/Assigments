import { model, Schema } from "mongoose";
import { Gender, Iuser, Role } from "./user.defenition";

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      enum: Gender,
      required: true,
    },

    role: {
      type: Number,
      enum: Role,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },

    isOnIine: {
      type: Boolean,
    },

    isActive: {
      type: Boolean,
    },
    coverPics: {
      type: [String],
    },
    profilePic: {
      type: String,
    },
  },
  {},
);

export const userModel = model("User", userSchema);
