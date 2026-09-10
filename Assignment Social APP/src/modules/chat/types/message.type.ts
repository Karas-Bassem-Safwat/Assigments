import { HydratedDocument, Types } from "mongoose";

export interface Imessage {
  createdBy: Types.ObjectId;
  content: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type Hmessage = HydratedDocument<Imessage>;
