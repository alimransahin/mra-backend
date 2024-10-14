import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

// sign up
const signUp = catchAsync(async (req, res) => {
  const result = await authService.signUp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// sign in
const signIn = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.signIn(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// password change
const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: { result },
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const result = await authService.forgetPassword(req.body.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link is generated successfully",
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Reset successfully",
    data: result,
  });
});
export const authController = {
  signIn,
  signUp,
  changePassword,
  forgetPassword,
  resetPassword,
};
