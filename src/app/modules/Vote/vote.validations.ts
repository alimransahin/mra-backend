import { z } from "zod";

export const createVoteValidationSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  voteType: z.enum(["Upvote", "Downvote"], {
    required_error: "Vote type is required",
  }),
});

export const updateVoteValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    post: z.string().optional(),
    voteType: z.enum(["Upvote", "Downvote"]).optional(),
  }),
});
