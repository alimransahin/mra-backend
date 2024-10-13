import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TActivity = {
  userId: Types.ObjectId | TUser;
};
