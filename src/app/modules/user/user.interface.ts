import { user_role } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  // role: "user" | "admin";
  role: keyof typeof user_role;
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  isBlock: boolean;
};
