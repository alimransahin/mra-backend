import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const postData = req.body;
  const result = await postService.createPostIntoDB(postData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: "result",
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await postService.getAllPostFromDB();
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
    message: "Posts retrieved successfully",
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const result = await postService.getSinglePostFromDB(req.params.id);
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
    message: "A Post retrieved successfully",
    data: result,
  });
});
const updatePost = catchAsync(async (req, res) => {
  const result = await postService.updatePostIntoDB(req.params.id, req.body);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    // If no data is found, send this response
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  // If data is found, send the success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated succeskkkkksfully",
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const result = await postService.deletePostFromDB(req.params.id);

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
    message: "Post Deleted successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
