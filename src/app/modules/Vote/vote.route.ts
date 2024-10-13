import express from "express";
import { VoteController } from "./vote.controller";
import { createVoteValidationSchema } from "./vote.validations";

import validateRequest from "../middleware/validateRequest";

const router = express.Router();

router.post(
  `/`,
  validateRequest(createVoteValidationSchema),
  VoteController.vote
);

export const VoteRoutes = router;
