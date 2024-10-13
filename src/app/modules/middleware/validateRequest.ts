import { NextFunction, Request, Response } from "express";
import { ZodError, AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({
            message: error.issues[0]?.message || "Validation error",
            errors: error.errors,
          });
          return;
        }
        next(error);
      }
    }
  );
};

export default validateRequest;
