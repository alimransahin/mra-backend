import mongoose from "mongoose";

import { Vote } from "./vote.model";
import { Post } from "../post/post.model";

const createVote = async (userId: string, postId: string, voteType: string) => {
  const existingVote = await Vote.findOne({ user: userId, post: postId });
  if (voteType === "Upvote") {
    if (existingVote) {
      if (existingVote.voteType === "Upvote") {
        throw new Error("Already upvoted");
      } else {
        existingVote.voteType = "Upvote";
        await existingVote.save();
        await Post.findByIdAndUpdate(postId, {
          $inc: { upvotes: 1, downvotes: -1 },
        });
      }
    } else {
      const newVote = new Vote({
        user: new mongoose.Types.ObjectId(userId),
        post: new mongoose.Types.ObjectId(postId),
        voteType: "Upvote",
      });
      await newVote.save();

      await Post.findByIdAndUpdate(postId, { $inc: { upvotes: 1 } });
    }
  } else {
    if (existingVote) {
      if (existingVote.voteType === "Downvote") {
        throw new Error("Already downvoted");
      } else {
        existingVote.voteType = "Downvote";
        await existingVote.save();

        await Post.findByIdAndUpdate(postId, {
          $inc: { downvotes: 1, upvotes: -1 },
        });
      }
    } else {
      const newVote = new Vote({
        user: new mongoose.Types.ObjectId(userId),
        post: new mongoose.Types.ObjectId(postId),
        voteType: "Downvote",
      });
      await newVote.save();

      await Post.findByIdAndUpdate(postId, { $inc: { downvotes: 1 } });
    }
  }
};

// const createDownVote = async (userId: string, postId: string) => {
//   const existingVote = await Vote.findOne({ user: userId, post: postId });

//   if (existingVote) {
//     if (existingVote.voteType === "Downvote") {
//       throw new Error("Already downvoted");
//     } else {
//       existingVote.voteType = "Downvote";
//       await existingVote.save();

//       await Post.findByIdAndUpdate(postId, {
//         $inc: { downvotes: 1, upvotes: -1 },
//       });
//     }
//   } else {
//     const newVote = new Vote({
//       user: new mongoose.Types.ObjectId(userId),
//       post: new mongoose.Types.ObjectId(postId),
//       voteType: "Downvote",
//     });
//     await newVote.save();

//     await Post.findByIdAndUpdate(postId, { $inc: { downvotes: 1 } });
//   }
// };

export const voteService = {
  createVote,
};
