import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";
import { User } from "../user/user.model";

const signUp = catchAsync(async (req, res) => {
  const result = await authService.signUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const signIn = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.signIn(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });
  const email = req.body.email;
  const data = await User.findOne({ email });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: data,
    token: accessToken,
  });
});
export const authController = {
  signIn,
  signUp,
};
