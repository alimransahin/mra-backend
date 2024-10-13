import httpStatus from "http-status";

import { CommentService } from "./comment.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createCommentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment is created successfully",
    data: result,
  });
});
const updateComment = catchAsync(async (req, res) => {
  const result = await CommentService.updateCommentIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment is updated successfully",
    data: result,
  });
});
const deleteComment = catchAsync(async (req, res) => {
  const result = await CommentService.deleteCommentFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment is Deleted successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
  updateComment,
  deleteComment,
};
