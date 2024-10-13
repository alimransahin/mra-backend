import { NextFunction, Request, Response } from "express";
import { user_role } from "../user/user.constants";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";

export const auth = (...roles: (keyof typeof user_role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const myToken = req.headers.authorization?.split(" ")[1];

    if (!myToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    const verifiedToken = jwt.verify(
      myToken as string,
      config.jwt_access_secret as string
    );
    const { role, email } = verifiedToken as JwtPayload;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }
    if (!roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    next();
  });
};
