import httpStatus from "http-status";
import { voteService } from "./vote.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const vote = catchAsync(async (req, res) => {
  const { userId, postId, voteType } = req.body;
  const result = await voteService.createVote(userId, postId, voteType);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `${voteType} is created successfully`,
    data: result,
  });
});

// const downVote = catchAsync(async (req, res) => {
//   const { postId } = req.params;
//   const userId = req.body.user._id;
//   const result = await voteService.createDownVote(userId, postId);

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "Downvote is created successfully",
//     data: result,
//   });
// });

export const VoteController = {
  vote,
  //   downVote,
};
