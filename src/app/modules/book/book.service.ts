import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBook } from "./book.interface";
import { Book } from "./book.model";
import { User } from "../user/user.model";
import { initialPayment } from "../payment/payment.utils";
import { TUser } from "../user/user.interface";

const createBookIntoDb = async (payload: TBook) => {
  const newBook = await (
    await (await Book.create(payload)).populate("userId")
  ).populate<{ carId: any }>("carId");

  if (!newBook.carId || typeof newBook.carId !== "object") {
    throw new AppError(httpStatus.NOT_FOUND, "Car details not found");
  }
  newBook.carId.status = "unavailable";
  await newBook.carId.save();
  return newBook;
};
const getAllBookFromDB = async () => {
  const result = await Book.find().populate("userId").populate("carId");
  return result;
};
const getAllBookFromDBByUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // const allResult = await Book.find().populate("userId").populate("carId");
  const result = await Book.find({ userId: user._id })
    .populate("carId")
    .populate("userId");
  return result;
};
const getSingleBookFromDB = async (userId: any) => {
  const result = await Book.find({ userId: userId.userId._id })
    .populate("userId")
    .populate("carId");
  return result;
};

const makePayment = async (res: any) => {
  const bookingId = res.params.id;
  const result = await Book.findById(bookingId).populate("userId");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const transactionId = `txn-${Date.now()}`;
  const paymentData = {
    success_url: res.body.currentPageLink,
    fail_url: res.body.currentPageLink,
    cancel_url: res.body.currentPageLink,
    transactionId,
    amount: result?.totalCost || 10,
    customerName: (result?.userId as TUser)?.name,
    customerEmail: (result?.userId as TUser)?.email,
    customerPhone: (result?.userId as TUser)?.phone,
    customerAddress: (result?.userId as TUser)?.address,
  };

  const paymentSession = await initialPayment(paymentData);

  result.status = "Done";
  result.isPaid = true;
  await result.save();
  return paymentSession;
};
const bookingStatusUpdate = async (res: any) => {
  const bookingId = res.params.id;
  const status = res.body.status;
  const result = await Book.findById(bookingId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  if (status == "approve") {
    result.status = "Approved";
  } else {
    result.status = "Cancled";
  }
  await result.save();
  return result;
};

export const bookService = {
  createBookIntoDb,
  getAllBookFromDB,
  getAllBookFromDBByUser,
  getSingleBookFromDB,
  bookingStatusUpdate,
  makePayment,
};
