import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const newCar = await Car.create(payload);
  return newCar;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findOne({ _id: id });
  return result;
};
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteCarFromDB = async (id: string) => {
  const deleteInfo = {
    isDeleted: true,
  };
  const result = await Car.findOneAndUpdate({ _id: id }, deleteInfo, {
    new: true,
  });
  return result;
};

const returnCarUpdateIntoDB = async (payload: any) => {
  const bookingId = payload.id;

  const allBook = await Book.findById(bookingId)
    .populate<{ carId: any }>("carId")
    .populate("userId");

  if (!allBook) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  if (!allBook.carId || typeof allBook.carId !== "object") {
    throw new AppError(httpStatus.NOT_FOUND, "Car details not found");
  }

  const pickUpDate: Date = allBook.pickUpDate;
  const pickUpTime: string = allBook.pickUpTime;
  const dropOffDate: Date = allBook.dropOffDate;
  const dropOffTime: string = allBook.dropOffTime;

  if (!pickUpDate || !pickUpTime || !dropOffDate || !dropOffTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Pick-up or drop-off date and time are missing"
    );
  }

  // Combine date and time into a Date object
  const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date); // Copy the original date
    dateTime.setHours(hours, minutes, 0, 0); // Set the hours and minutes
    return dateTime;
  };

  // Function to calculate time difference in hours
  const calculateTimeDifferenceInHours = (
    pickUpDate: Date,
    pickUpTime: string,
    dropOffDate: Date,
    dropOffTime: string
  ): number => {
    const pickUpDateTime = combineDateTime(pickUpDate, pickUpTime);
    const dropOffDateTime = combineDateTime(dropOffDate, dropOffTime);

    const timeDifferenceInMs =
      dropOffDateTime.getTime() - pickUpDateTime.getTime();
    return timeDifferenceInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  // Helper function to convert time string to hours
  const convertToHours = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  // Calculate the total time in hours between pick-up and drop-off
  const totalTimeInHours = calculateTimeDifferenceInHours(
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime
  );
  const totalCost = totalTimeInHours * allBook.carId.pricePerHour;
  allBook.totalCost = totalCost;
  allBook.carId.status = "available"; // Update car status
  allBook.isReturn = true;
  const updatedBook = await allBook.save();

  return updatedBook;
};

export const carService = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarUpdateIntoDB,
};
