import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { initialPayment } from "../payment/payment.utils";
import { Types } from "mongoose";

const createUserIntoDB = async (password: string, payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload,
    password: password || (config.default_password as string),
  };

  const newUser = await User.create(userData);
  return newUser;
};
const signInUser = async (payload: any) => {
  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );
  const result = await User.findByIdAndUpdate({ _id: id }, filteredPayload, {
    new: true,
  });

  return result;
};
const updateUserStatusIntoDB = async (userId: string, payload: string) => {
  const findUser = await User.findOne({ _id: userId });
  if (!findUser) {
    return { success: false, message: " User not found" };
  }
  let result;
  if (payload === "admin") {
    result = findUser.role = "admin";
  } else if (payload === "user") {
    result = findUser.role = "user";
  } else if (payload === "delete") {
    result = findUser.isDeleted = true;
  } else if (payload === "block") {
    result = findUser.isBlock = !findUser.isBlock;
  } else {
    return "some thing want wrong";
  }
  await findUser.save();
  return result;
};

const updateFollowIntoDB = async (_id: string, userId: string) => {
  const findAuthor = await User.findOne({ _id });
  const findUser = await User.findOne({ _id: userId });
  if (!findAuthor || !findUser) {
    return { success: false, message: "Author or User not found" };
  }
  // Initialize followers and following arrays if they do not exist
  if (!findAuthor.followers) {
    findAuthor.followers = [];
  }
  if (!findUser.following) {
    findUser.following = [];
  }

  const userIdAsObjectId = new Types.ObjectId(userId);

  // Check if userId is already a follower
  const existingFollower = findAuthor.followers.some(
    (follower) => follower.toString() === userIdAsObjectId.toString()
  );

  if (existingFollower) {
    // Unfollow: remove the user from followers and following lists
    findAuthor.followers = findAuthor.followers.filter(
      (follower) => follower.toString() !== userIdAsObjectId.toString()
    );
    findUser.following = findUser.following.filter(
      (following) => following.toString() !== findAuthor._id.toString()
    );

    await findAuthor.save();
    await findUser.save();

    return "User unfollowed successfully";
  } else {
    // Follow: add the user to followers and following lists
    findAuthor.followers.push(userIdAsObjectId);
    findUser.following.push(findAuthor._id);

    await findAuthor.save();
    await findUser.save();

    return "User followed successfully";
  }
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email })
    .populate({
      path: "following",
      select: "name email profilePicture",
    })
    .populate({
      path: "followers",
      select: "name email profilePicture",
    });
  return result;
};

const roleUpdate = async (req: any) => {
  const userId = req.params.id;
  const status = req.body.status;

  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (status === "block") {
    result.isBlock = true;
  } else if (status === "unblock") {
    result.isBlock = false;
  } else {
    result.role = "admin";
  }

  // Prevent password re-hashing if it's not being modified
  if (!result.isModified("password")) {
    result.markModified("isBlock");
    result.markModified("role");
  }

  const updatedUser = await result.save();
  return updatedUser;
};

const makePayment = async (req: any, res: any) => {
  const { subscriptionPrice, currentPageLink } = req.body;
  const userId = req.params.id;
  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const transactionId = `txn-${Date.now()}`;
  const paymentData = {
    success_url: currentPageLink,
    fail_url: currentPageLink,
    cancel_url: currentPageLink,
    transactionId,
    amount: subscriptionPrice,
    customerName: result?.name,
    customerEmail: result?.email,
    customerPhone: result?.phone,
    customerAddress: result?.address,
  };

  const paymentSession = await initialPayment(paymentData);
  result.isVerified = true;
  await result.save();
  return paymentSession;
};

export const userService = {
  createUserIntoDB,
  signInUser,
  updateUserIntoDB,
  updateFollowIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  roleUpdate,
  makePayment,
  updateUserStatusIntoDB,
};
