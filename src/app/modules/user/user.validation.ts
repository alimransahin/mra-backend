import { z } from "zod";
import { user_role } from "./user.constants";

//  create schema
const createUserValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email"),
  role: z.nativeEnum(user_role).default(user_role.user),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
  phone: z.string().trim().min(10, "Please enter a valid phone number"),
  address: z.string().trim().min(1, "Address is required"),
  profilePicture: z.string().optional(),
  isDeleted: z.boolean().default(false),
  isBlock: z.boolean().default(false),
  following: z.array(z.string()).optional(),
  followers: z.array(z.string()).optional(),
  isVerified: z.boolean().default(false),
});

//  update schema
const updateUserValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  email: z.string().trim().email("Please enter a valid email").optional(),
  role: z.nativeEnum(user_role).optional(),
  password: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  profilePicture: z.string().optional(),
  following: z.array(z.string()).optional(),
  followers: z.array(z.string()).optional(),
  isDeleted: z.boolean().optional(),
  isBlock: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});

//  sign in
const signInUserValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const forgetPasswprdValidation = z.object({
  email: z.string({ required_error: "Email is required" }),
});

const resetPasswordValidation = z.object({
  email: z.string({ required_error: "Email is required" }),
  token: z.string({ required_error: "token is required" }),
  newPassword: z
    .string()
    .trim()
    .min(6, "New Password must be at least 6 characters long"),
});

export const userValidation = {
  createUserValidationSchema,
  signInUserValidationSchema,
  updateUserValidationSchema,
  forgetPasswprdValidation,
  resetPasswordValidation,
};
