import { HydratedDocument, Types } from "mongoose";
export enum PostPrivacyEnum {
  public,
  friends,
  private,
}
export interface Ipost {
  title: String;
  content: String;
  attachments: Array<String>;
  likes: Array<Types.ObjectId>;
  privacy: PostPrivacyEnum;
  createdBy: Types.ObjectId;
}

export type Hpost = HydratedDocument<Ipost>;
