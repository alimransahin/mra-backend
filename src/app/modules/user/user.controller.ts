import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { userService } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userService.createUserIntoDB(
    userData.password,
    userData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUserIntoDB(req.params.id, req.body);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No user found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A User Profile Update successfully",
    data: result,
  });
});
const getUserProfile = catchAsync(async (req, res) => {
  const result = await userService.getSingleUserFromDB(req.params.email);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No user found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A User Profile retrieved successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No user found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});
const userRoleUpdate = catchAsync(async (req, res) => {
  const result = await userService.roleUpdate(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book status updated",
    data: result,
  });
});
export const UserController = {
  createUser,
  updateUser,
  getAllUser,
  getUserProfile,
  userRoleUpdate,
};
