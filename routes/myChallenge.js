import express from "express";
import passport, { authLoginMiddleware } from "../config/passport.js";
import { myChallengesApply } from "../controllers/myChallenge.js";

const router = express.Router();

router.get("/", authLoginMiddleware, myChallengesApply);

export default router;
