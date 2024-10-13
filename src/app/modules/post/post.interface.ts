import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TPost = {
  user: Types.ObjectId | TUser;
  description: string;
  image?: string;
  category: "Web" | "Software Engineering" | "AI" | "Data Science";
  upvotes?: number;
  downvotes?: number;
  comments: Types.ObjectId[];
  isPremium: boolean;
  isDeleted: boolean;
};
