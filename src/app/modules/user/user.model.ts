import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { user_role } from "./user.constants";
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.keys(user_role),
      required: true,
      default: user_role.user,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co.com/xSVjw8w/Default-pfp-svg.png",
    },

    following: [{ type: Schema.Types.ObjectId, ref: "user", required: false }],
    followers: [{ type: Schema.Types.ObjectId, ref: "user", required: false }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.isDeleted;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.isDeleted;
        return ret;
      },
    },
  }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const User = model<TUser>("user", userSchema);
