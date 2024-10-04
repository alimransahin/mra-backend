import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TBook = {
  userId: Types.ObjectId | TUser;
  carId: Types.ObjectId;
  pickUpDate: Date;
  pickUpTime: string;
  dropOffDate: Date;
  dropOffTime: string;
  totalCost: number;
  status: "Done" | "Pending" | "Approved"|"Cancled";
  isReturn: boolean;
  isPaid: boolean;
};
