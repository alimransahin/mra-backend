import { z } from "zod";

// Create User validation schema
export const commentValidationSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  comment: z.string(),
});
export const commentUpdateValidationSchema = z.object({
  userId: z.string().optional(),
  postId: z.string().optional(),
  comment: z.string().optional(),
});
