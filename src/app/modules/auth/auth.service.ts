import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { isPasswordMAtched } from "./auth.utils";
import jwt from "jsonwebtoken";
import { createToken, verifyToken } from "../utils/verifyJWT";
import { sentEmail } from "../utils/sentEmail";
import { Activity } from "../activity/activity.model";

const signUp = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: [payload.email] });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "This Email Already Exists!");
  }
  const newUser = await User.create(payload);
  return newUser;
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
  const login = await Activity.create({ userId: user._id });
  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: [payload.email] }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  if (!(await isPasswordMAtched(payload.password, user.password))) {
    throw new AppError(httpStatus.CONFLICT, "Old password is incorrect");
  }

  payload.newPassword && (user.password = payload.newPassword);
  await user.save();

  return "Password updated successfully";
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isBlock: user.isBlock,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );
  const resetUILink = `${config.reset_ui_link}/reset-password?email=${user.email}&token=${resetToken}`;
  sentEmail(user.email, resetUILink);
};

const resetPassword = async (payload: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  const user = await User.findOne({ email: [payload.email] }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
  }
  const decode = verifyToken(payload.token, config.jwt_access_secret as string);

  if (decode.email !== payload.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are Forbidden");
  }
  payload.newPassword && (user.password = payload.newPassword);
  await user.save();

  return "Password updated successfully";
};
export const authService = {
  signUp,
  signIn,
  changePassword,
  forgetPassword,
  resetPassword,
};
