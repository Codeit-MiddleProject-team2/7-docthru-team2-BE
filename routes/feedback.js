import express from "express";
import passport from "../config/passport.js";
import { postFeedback } from "../controllers/feedback.js";
import { Router } from "express";
import { feedbackController } from "../controllers/feedback.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("access-token", { session: false }),
  postFeedback
);

// 목록(더보기: offset/limit)
router.get("/", feedbackController.list);

// 생성
// router.post("/", feedbackController.create);

// 수정
router.patch("/:id", feedbackController.update);

export default router;
