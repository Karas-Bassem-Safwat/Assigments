import { model, Schema, Types } from "mongoose";
import { Ipost, PostPrivacyEnum } from "./post.types";
import { string } from "zod";

const postSchema = new Schema<Ipost>(
  {
    title: {
      type: string,
    },
    content: {
      type: string,
      required: function (this) {
        return this.attachments.length > 0;
      },
    },
    attachments: {
      type: [string],
    },
    likes: {
      type: [Types.ObjectId],
      ref: "User",
    },
    privacy: {
      type: Number,
      default: PostPrivacyEnum.public,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
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

export const postModel = model("Post", postSchema);
