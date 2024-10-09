import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { initialPayment } from "../payment/payment.utils";

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
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );
  const result = await User.findByIdAndUpdate({ _id: id }, filteredPayload, {
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

const makePayment = async (req: any, res: any) => {
  // console.log(req.body);
  const { subscriptionPrice, currentPageLink } = req.body;
  const userId = req.params.id;
  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // console.log(result);

  const transactionId = `txn-${Date.now()}`;
  const paymentData = {
    success_url: currentPageLink,
    fail_url: currentPageLink,
    cancel_url: currentPageLink,
    transactionId,
    amount: subscriptionPrice,
    customerName: result?.name,
    customerEmail: result?.email,
    customerPhone: result?.phone,
    customerAddress: result?.address,
  };

  const paymentSession = await initialPayment(paymentData);
  result.isVerified = true;
  await result.save();
  return paymentSession;
};

export const userService = {
  createUserIntoDB,
  signInUser,
  updateUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  roleUpdate,
  makePayment,
};
