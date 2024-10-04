import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { bookService } from "./book.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";
import { Car } from "../car/car.model";
import AppError from "../../errors/AppError";

const createBook = catchAsync(async (req, res) => {
  const car = await Car.findOne({ _id: req.body.carId });
  if (car?.status === "unavailable") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Sorry! This Car is not available available now."
    );
  }

  //find user info
  const myToken = req.headers.authorization?.split(" ")[1];
  const verifiedToken = jwt.verify(
    myToken as string,
    config.jwt_access_secret as string
  );
  const { email } = verifiedToken as JwtPayload;
  const user = await User.findOne({ email });

  const bookingData = {
    ...req.body,
    userId: user?._id,
  };
  const result = await bookService.createBookIntoDb(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});

const getAllBook = catchAsync(async (req, res) => {
  const result = await bookService.getAllBookFromDB();
  if (!result || (Array.isArray(result) && result.length === 0)) {
    // If no data is found, send this response
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const getAllBookByUser = catchAsync(async (req, res) => {
  const myToken = req.headers.authorization?.split(" ")[1];
  const verifiedToken = jwt.verify(
    myToken as string,
    config.jwt_access_secret as string
  );
  const { email } = verifiedToken as JwtPayload;
  const result = await bookService.getAllBookFromDBByUser(email);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});
const makePayment = catchAsync(async (req, res) => {
  const result = await bookService.makePayment(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Successfull",
    data: result,
  });
});
const bookingApprove = catchAsync(async (req, res) => {
  const result = await bookService.bookingStatusUpdate(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book status updated",
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBook,
  getAllBookByUser,
  makePayment,
  bookingApprove,
};
