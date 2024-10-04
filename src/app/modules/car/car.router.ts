import express from "express";
import validateRequest from "../middleware/validateRequest";
import { carValidation } from "./car.validation";
import { carController } from "./car.controller";
import { auth } from "../middleware/auth";
import { user_role } from "../user/user.constants";

const router = express.Router();

router.post(
  "/",
  validateRequest(carValidation.createCarValidationSchema),
  auth(user_role.admin),
  carController.createCar
);

router.get("/", carController.getAllCar);

router.get("/:id", carController.getSingleCar);

router.put(
  "/return",
  auth(user_role.admin),
  // validateRequest(carValidation.returnValidationSchema),
  carController.returnCarUpdate
);

router.put(
  "/:id",
  validateRequest(carValidation.updateCarValidationSchema),
  auth(user_role.admin),
  carController.updateCar
);

router.delete("/:id", auth(user_role.admin), carController.deleteCar);

export const CarRoutes = router;
