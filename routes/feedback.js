import express from "express";
import passport from "../config/passport.js";
import { postFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("access-token", { session: false }),
  postFeedback
);

export default router;
