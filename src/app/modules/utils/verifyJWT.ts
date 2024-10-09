import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { user_role } from "../user/user.constants";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    role: keyof typeof user_role;
    isBlock: boolean;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(401, "You are not authorized!");
  }
};
