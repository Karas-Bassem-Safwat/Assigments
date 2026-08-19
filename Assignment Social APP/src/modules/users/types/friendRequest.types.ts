import { HydratedDocument, ObjectId, Types } from "mongoose";

export enum friendRequestEnum {
  pendenig,
  accepted,
  canceld,
  rejected,
}

export interface IfriendRequest {
  from: Types.ObjectId;
  to: Types.ObjectId;
  status: friendRequestEnum;
}

export type HfriendRequest = HydratedDocument<IfriendRequest>;
