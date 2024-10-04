import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { isPasswordMAtched } from "./auth.utils";
import jwt from "jsonwebtoken";

const signUp = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: [payload.email] });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User Already Exists!");
  }
  const newUser = await User.create(payload);
  return newUser;
};
const signIn = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: [payload.email] }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  if (!(await isPasswordMAtched(payload.password, user.password))) {
    throw new AppError(httpStatus.CONFLICT, "Password Not Matched");
  }
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expire_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expire_in,
    }
  );
  return { accessToken, refreshToken };
};

export const authService = { signUp, signIn };
