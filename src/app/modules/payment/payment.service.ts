import { join } from "path";
// import orderModel from "../order/order.model"
// import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { varifyPayment } from "./payment.utils";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const confirmationService = async (
  transactionId: string,
  status: string,
  userId: string
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const verifyResponse = await varifyPayment(transactionId);
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    user.isVerified = true;
    await user.save();
  }
  return result;
};

export const paymentServices = {
  confirmationService,
};
