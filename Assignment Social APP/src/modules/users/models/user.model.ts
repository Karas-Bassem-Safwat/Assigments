import { model, Schema } from "mongoose";
import { Gender, Iuser, Role } from "../types/user.types";
import { hashPassword } from "../../../utils/security/hashing";
import { decrypt, encrypt } from "../../../utils/security/encryption";
import { friendRequestEnum } from "../types/friendRequest.types";

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      set: async function (value: string) {
        return await hashPassword(value);
      },
    },

    phone: {
      type: String,
      required: true,
      set: function (value: string) {
        return encrypt(value);
      },
      get: function (value: string) {
        return decrypt(value);
      },
    },

    gender: {
      type: Number,
      enum: Gender,
      required: true,
    },

    role: {
      type: Number,
      enum: Role,
      default: Role.user,
    },

    age: {
      type: Number,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    isOnIine: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    confirmedAt: {
      type: Date,
      default: null,
    },

    changedCredentialsAt: {
      type: Date,
      default: null,
    },

    profilePic: {
      type: String,
      default: null,
    },

    coverPics: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

userSchema.virtual("received", {
  localField: "_id",
  foreignField: "to",
  ref: "frienRequest",
  match:{status:friendRequestEnum.accepted}
});
userSchema.virtual("sent", {
  localField: "_id",
  foreignField: "from",
  ref: "frienRequest",
  match:{status:friendRequestEnum.accepted}
});

export const userModel = model<Iuser>("User", userSchema);