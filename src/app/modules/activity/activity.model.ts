import { model, Schema } from "mongoose";
import { TActivity } from "./activity.interface";

const activitySchema = new Schema<TActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

export const Activity = model<TActivity>("activity", activitySchema);
