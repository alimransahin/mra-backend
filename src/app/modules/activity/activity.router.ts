import express from "express";
import getAllActivity from "./activity.controller";

const router = express.Router();

router.get("/", getAllActivity);

export const ActivityRoutes = router;
