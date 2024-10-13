import express from "express";
import { userValidation } from "./user.validation";
import validateRequest from "../middleware/validateRequest";
import { UserController } from "./user.controller";
import { auth } from "../middleware/auth";
import { user_role } from "./user.constants";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);

router.get("/", UserController.getAllUser);
router.put(
  "/update-profile/:id",
  validateRequest(userValidation.updateUserValidationSchema),
  UserController.updateUser
);
router.put(
  "/follow/:id",
  // validateRequest(userValidation.updateUserValidationSchema),
  UserController.followUser
);
router.get("/:email", UserController.getUserProfile);
router.put("/:id", auth(user_role.admin), UserController.userRoleUpdate);
router.post("/:id", UserController.makePayment);
export const UserRoutes = router;
