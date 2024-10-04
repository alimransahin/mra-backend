import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    features: {
      type: [String],

    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

carSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre("findOneAndUpdate", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre("findOneAndDelete", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Car = model<TCar>("car", carSchema);
