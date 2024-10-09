import express from "express";
import validateRequest from "../middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { authController } from "./auth.controller";

const router = express.Router();

// sign up
router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  authController.signUp
);

// signIn
router.post(
  "/login",
  validateRequest(userValidation.signInUserValidationSchema),
  authController.signIn
);
router.post("/password", authController.changePassword);
router.post(
  "/forget-password",
  validateRequest(userValidation.forgetPasswprdValidation),
  authController.forgetPassword
);
router.post(
  "/reset-password",
  validateRequest(userValidation.resetPasswordValidation),
  authController.resetPassword
);
export const AuthRoutes = router;
