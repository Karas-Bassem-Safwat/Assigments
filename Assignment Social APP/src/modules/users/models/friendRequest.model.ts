import { model, Schema, Types } from "mongoose";
import {
  friendRequestEnum,
  IfriendRequest,
} from "../types/friendRequest.types";

const friendRequestSchema = new Schema<IfriendRequest>(
  {
    from: {
      type: Types.ObjectId,
      require: true,
      ref: "User",
    },
    to: {
      type: Types.ObjectId,
      require: true,
      ref: "User",
    },

    status: {
      type: Number,
      default: friendRequestEnum.pendenig,
      enum: Object.values(friendRequestEnum),
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  },
);

export const friendRequestModel = model<IfriendRequest>(
  "frienRequest",
  friendRequestSchema,
);
