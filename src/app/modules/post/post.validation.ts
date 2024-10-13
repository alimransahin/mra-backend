import { z } from "zod";

export const createPostValidationSchema = z.object({
  user: z.string().nonempty("User ID is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  category: z.enum(["Web", "Software Engineering", "AI", "Data Science"], {
    required_error: "Category is required",
  }),
  isPremium: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

// Update Post Validation Schema
export const updatePostValidationSchema = z.object({
  description: z.string().optional(),
  image: z.string().optional(),
  category: z
    .enum(["Web", "Software Engineering", "AI", "Data Science"])
    .optional(),
  isPremium: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const postValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
