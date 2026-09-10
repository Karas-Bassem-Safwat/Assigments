import { model, Schema, Types } from "mongoose";
import { required } from "zod/mini";
import { Imessage } from "../types/message.type";
import { Ichat } from "../types/chat.type";

const MessageShema = new Schema<Imessage>(
  {
    content: {
      type: String,
      required: function (this: Imessage) {
        return this.attachments.length == 0;
      },
    },
    attachments: { type: [String] },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

const chatSchema = new Schema<Ichat>(
  {
    participants: { type: [Types.ObjectId], ref: "User" },
    messages: { MessageShema },
    group: { type: String },
    groupImg: { type: String },
    roomId: { type: String },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const chatModel = model("Chat", chatSchema);
