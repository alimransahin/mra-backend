import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    category: {
      type: String,
      enum: ["Web", "Software Engineering", "AI", "Data Science"],
      required: true,
    },
    upvotes: { type: Number, required: false },
    downvotes: { type: Number, required: false },
    comments: [
      { type: Schema.Types.ObjectId, ref: "comment", required: false },
    ],
    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

postSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
postSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
postSchema.pre("findOneAndUpdate", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
postSchema.pre("findOneAndDelete", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Post = model<TPost>("post", postSchema);
