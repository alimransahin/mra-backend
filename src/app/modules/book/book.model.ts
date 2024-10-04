import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    carId: { type: Schema.Types.ObjectId, ref: "car", required: true },
    pickUpDate: {
      type: Date,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid time format! Use HH:MM.`,
      },
    },
    dropOffDate: {
      type: Date,
      required: true,
    },
    dropOffTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid time format! Use HH:MM.`,
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Done", "Cancled"],
      default: "Pending",
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturn: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Book = model("book", bookSchema);
