import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const newPost = await Post.create(payload);
  return newPost;
};
const getAllPostFromDB = async () => {
  const result = await Post.find().populate("user");
  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findOne({ _id: id }).populate({
    path: "comments",
    model: "Comment",
    populate: {
      path: "userId",
      model: "user",
      select: "name profilePicture",
    },
    select: "-__v -postId",
  });
  return result;
};
const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deletePostFromDB = async (id: string) => {
  const deleteInfo = {
    isDeleted: true,
  };
  const result = await Post.findOneAndUpdate({ _id: id }, deleteInfo, {
    new: true,
  });
  return result;
};

export const postService = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
};
