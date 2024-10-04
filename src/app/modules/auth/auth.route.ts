import express from "express";
import validateRequest from "../middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { authController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  authController.signUp
);
router.post(
  "/signin",
  validateRequest(userValidation.signInUserValidationSchema),
  authController.signIn
);
export const AuthRoutes = router;
