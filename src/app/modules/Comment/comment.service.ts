import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { Post } from "../post/post.model";

const createCommentIntoDB = async (comment: IComment) => {
  try {
    // Find the post by postId
    const post = await Post.findById(comment.postId);

    if (!post) {
      throw new Error("Post not found");
    }
    const newComment = await Comment.create(comment);

    post.comments.push(newComment._id);
    await post.save();
    return newComment;
  } catch (error) {
    throw new AppError(httpStatus.FORBIDDEN, "Could not create comment");
  }
};
const updateCommentIntoDB = async (id: string, payload: Partial<IComment>) => {
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );
  const result = await Comment.findByIdAndUpdate({ _id: id }, filteredPayload, {
    new: true,
  });

  return result;
};
const deleteCommentFromDB = async (id: string) => {
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("comment not found");
    }
    const post = await Post.findOne({ _id: comment.postId });

    if (!post) {
      throw new Error("Post not found");
    }

    const result = await Comment.findByIdAndDelete({ _id: id });

    post.comments = post.comments.filter((item) => item.toString() !== id);

    await post.save();
    return result;
  } catch (error) {}
};

export const CommentService = {
  createCommentIntoDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
};
