import express from "express";
import passport from "../config/passport.js";
import { myChallengesApply } from "../controllers/myChallenge.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("access-token", { session: false }),
  myChallengesApply
);

export default router;
