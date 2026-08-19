import { HydratedDocument } from "mongoose";

export enum Gender {
  male,
  female,
}

export enum Role {
  user,
  admin,
  super_admin,
  super_super_admin,
}

export interface Iuser {
  name: string;
  email: string;
  password: string;
  age: number;
  bio: string;
  isOnIine: boolean;
  isActive: boolean;
  gender: Gender;
  phone: string;
  confirmedAt: Date | null;
  changedCredentialsAt: Date | null;
  role: Role;
  profilePic: string | null;
  coverPics: string[];
  received: [Huser];
  sent: [Huser];
}

export type Huser = HydratedDocument<Iuser>;
