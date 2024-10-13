import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import getAllActivityFromDB from "./activity.service";

const getAllActivity = catchAsync(async (req, res) => {
  const result = await getAllActivityFromDB();
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
    message: "Activity retrieved successfully",
    data: result,
  });
});

export default getAllActivity;
