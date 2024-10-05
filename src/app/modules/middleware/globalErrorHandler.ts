import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any, // You can create a specific error type if you have one
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
