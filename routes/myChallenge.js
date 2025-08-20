import express from "express";
import { authLoginMiddleware } from "../config/passport.js";
import {
  getAllChallenges,
  myChallengesApply,
} from "../controllers/myChallenge.js";

const router = express.Router();

router.get("/apply", authLoginMiddleware, myChallengesApply);
router.get("/", authLoginMiddleware, getAllChallenges);

export default router;
