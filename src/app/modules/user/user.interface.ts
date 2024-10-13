import { Types } from "mongoose";
import { user_role } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  role: keyof typeof user_role;
  password: string;
  newPassword?: string;
  phone: string;
  address: string;
  profilePicture: string;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  isDeleted: boolean;
  isBlock: boolean;
  isVerified: boolean;
};
