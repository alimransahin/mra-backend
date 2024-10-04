import { z } from "zod";

const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

const createBookValidationSchema = z.object({
  userId: z.string().min(1, "User ID is required").optional(),
  carId: z.string().min(1, "Car ID is required"),
  pickUpDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  pickUpTime: z
    .string({
      required_error: "Pick-up Time time is required",
      invalid_type_error: "Pick-up Time time must be a string",
    })
    .regex(timeRegex, "Pick-up Time time must be in the format HH:MM"),
  dropOffDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  dropOffTime: z
    .string({
      required_error: "Drop-off Time time is required",
      invalid_type_error: "Drop-off Time  time must be a string",
    })
    .regex(timeRegex, "Drop-off Time  time must be in the format HH:MM"),
  status: z.enum(["Pending", "Approved", "Done"]).optional(),
  totalCost: z.number().nonnegative().default(0),
  isPaid: z.boolean().optional(),
  isReturn: z.boolean().optional(),
});

export const bookValidation = {
  createBookValidationSchema,
};
