import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { isPasswordMAtched } from "./auth.utils";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/verifyJWT";

const signUp = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: [payload.email] });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "This Email Already Exists!");
  }
  const newUser = await User.create(payload);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    isBlock: newUser.isBlock,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// sign in
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
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isBlock: user.isBlock,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = { signUp, signIn };
