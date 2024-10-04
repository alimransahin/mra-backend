import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (password: string, payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload,
    password: password || (config.default_password as string),
  };

  const newUser = await User.create(userData);
  return newUser;
};
const signInUser = async (payload: any) => {
  const result = await User.create(payload);
  return result;
};
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};
const roleUpdate = async (req: any) => {
  const userId = req.params.id;
  const status = req.body.status;

  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (status === "block") {
    result.isBlock = true;
  } else if (status === "unblock") {
    result.isBlock = false;
  } else {
    result.role = "admin";
  }

  // Prevent password re-hashing if it's not being modified
  if (!result.isModified("password")) {
    result.markModified("isBlock");
    result.markModified("role");
  }

  const updatedUser = await result.save();
  return updatedUser;
};

export const userService = {
  createUserIntoDB,
  signInUser,
  updateUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  roleUpdate,
};
