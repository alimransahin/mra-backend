import { z } from "zod";

// Define Zod schema for car validation
const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

const createCarValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  isElectric: z.boolean({ required_error: "isElectric is required" }),
  features: z
    .array(z.string())
    .min(1, { message: "At least one feature is required" })
    .optional(),
  pricePerHour: z
    .number({ required_error: "Price per hour is required" })
    .positive({ message: "Price must be a positive number" }),
  image: z.string(),
  status: z.enum(["available", "unavailable"]).optional(),
  isDeleted: z.boolean().optional(),
});

const updateCarValidationSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  isElectric: z
    .boolean({ required_error: "isElectric is required" })
    .optional(),
  features: z
    .array(z.string())
    .min(1, { message: "At least one feature is required" })
    .optional(),
  pricePerHour: z
    .number({ required_error: "Price per hour is required" })
    .positive({ message: "Price must be a positive number" })
    .optional(),
  image: z.string().optional(),
  status: z.enum(["available", "unavailable"]).optional(),
  isDeleted: z.boolean().optional(),
});

const returnValidationSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required").optional(),
  startTime: z
    .string({
      required_error: "Start time is required",
      invalid_type_error: "Start time must be a string",
    })
    .regex(timeRegex, "Start time must be in the format HH:MM"),
});

export const carValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnValidationSchema,
};
