import express from "express";
import validateRequest from "../middleware/validateRequest";

import { auth } from "../middleware/auth";
import { user_role } from "../user/user.constants";
import { postValidation } from "./post.validation";
import { postController } from "./post.controller";

const router = express.Router();

router.post(
  "/create-post",
  validateRequest(postValidation.createPostValidationSchema),
  postController.createPost
);

router.get("/", postController.getAllPost);

router.get("/:id", postController.getSinglePost);

router.put(
  "/:id",
  validateRequest(postValidation.updatePostValidationSchema),
  auth(user_role.admin),
  postController.updatePost
);

router.delete("/:id", auth(user_role.admin), postController.deletePost);

export const PostRoutes = router;
