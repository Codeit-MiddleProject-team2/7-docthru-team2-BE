import express from "express";
import { postFeedback } from "../controllers/feedback.js";
import { feedbackController } from "../controllers/feedback.js";
import { authLoginMiddleware } from "../config/passport.js";
import { verifyFeedbackAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authLoginMiddleware, postFeedback);

router.get("/", feedbackController.list);

/**
 * PATCH 수정:  인증 미들웨어 추가
 */
router.patch(
  "/:id",
  authLoginMiddleware,
  // verifyFeedbackAuth,  // 인증 미들웨어는 필요하지 않아서 주석처리
  feedbackController.update
);

/**
 * DELETE 삭제: 인증 필요 (작성자 또는 관리자만 허용)
 * - 관리자: reason(사유) 필수
 * - 작성자: reason 선택(모달 입력값 그대로 전달)
 */
router.delete("/:id", authLoginMiddleware, feedbackController.remove);

export default router;
