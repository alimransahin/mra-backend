import express from "express";
import { CommentController } from "./comment.controller";
import validateRequest from "../middleware/validateRequest";
import {
  commentUpdateValidationSchema,
  commentValidationSchema,
} from "./comment.validation";

const router = express.Router();

router.post(
  "/",
  //   auth(USER_ROLE.user),
  validateRequest(commentValidationSchema),
  CommentController.createComment
);
router.put(
  "/update-comment/:id",
  //   auth(USER_ROLE.user),
  validateRequest(commentUpdateValidationSchema),
  CommentController.updateComment
);
router.delete("/:id", CommentController.deleteComment);

export const CommentRoutes = router;
