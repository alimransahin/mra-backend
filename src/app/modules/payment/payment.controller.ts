import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status, userId } = req.body;
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
    userId as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment info successfully",
    data: result,
  });
};

export const paymentControler = {
  confirmationController,
};
