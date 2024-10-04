import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { carService } from "./car.service";

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;
  const result = await carService.createCarIntoDB(carData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});
const getAllCar = catchAsync(async (req, res) => {
  const result = await carService.getAllCarFromDB();
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getSingleCar = catchAsync(async (req, res) => {
  const result = await carService.getSingleCarFromDB(req.params.id);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});
const updateCar = catchAsync(async (req, res) => {
  const result = await carService.updateCarIntoDB(req.params.id, req.body);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    // If no data is found, send this response
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  // If data is found, send the success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated succeskkkkksfully",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const result = await carService.deleteCarFromDB(req.params.id);

  if (!result || (Array.isArray(result) && result.length === 0)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Deleted successfully",
    data: result,
  });
});
const returnCarUpdate = catchAsync(async (req, res) => {
  const result = await carService.returnCarUpdateIntoDB(req.body);
  if (!result || (Array.isArray(result) && result.length === 0)) {
    // If no data is found, send this response
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No data found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});
export const carController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCarUpdate,
};
