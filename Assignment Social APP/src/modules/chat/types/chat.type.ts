import { HydratedDocument, Types } from "mongoose";
import { Imessage } from "./message.type";

export interface Ichat {
  participants: Types.ObjectId[];
  messages: Imessage[];
  group?: string;
  groupImg?: string;
  roomId?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type Hchat = HydratedDocument<Ichat>;
