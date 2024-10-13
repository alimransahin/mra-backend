import mongoose, { Schema } from "mongoose";
import { IComment } from "./comment.interface";

// Define the Comment schema
const commentSchema: Schema<IComment> = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

// Export the Comment model
export const Comment = mongoose.model<IComment>("Comment", commentSchema);
