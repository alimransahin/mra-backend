import { user_role } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  role: keyof typeof user_role;
  password: string;
  phone: string;
  address: string;
  profilePicture: string;
  isDeleted: boolean;
  isBlock: boolean;
  isVerified: boolean;
};
