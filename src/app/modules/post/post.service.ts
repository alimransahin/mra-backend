import { IPostQuery, TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const newPost = await Post.create(payload);
  return newPost;
};

const getAllPostFromDB = async (query: IPostQuery) => {
  const { search, category, isPremium, sortBy, sortOrder } = query;

  const filter: Record<string, unknown> = {
    isDeleted: false,
  };

  if (search) {
    filter.description = { $regex: new RegExp(search, "i") };
  }

  if (category) {
    filter.category = category;
  }

  if (isPremium) {
    filter.isPremium = isPremium === "true";
  }
  const sort: Record<string, number> = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  return await Post.find(filter).populate({
    path: "user",
    model: "user",
    select: "-__v",
  });
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findOne({ _id: id })
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "userId",
        model: "user",
        select: "name profilePicture",
      },
      select: "-__v -postId",
    })
    .populate({
      path: "user",
      model: "user",
      select: "-__v",
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
