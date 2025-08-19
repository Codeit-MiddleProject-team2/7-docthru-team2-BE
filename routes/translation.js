import express from "express";
import passport from "../config/passport.js";
import {
  findAllTranslations,
  translationController,
} from "../controllers/translation.js";

const router = express.Router();

// 목록: 특정 challengeId의 번역들 페이지네이션
router.get("/", translationController.listByChallenge);

// 단건 조회
router.get("/:id", translationController.getById);

// 생성 전 데이터 확인
router.get(
  "/:challengeId/edit",
  passport.authenticate("access-token", { session: false }),
  translationController.getTranslationByChallengeId
);

// 생성
router.post(
  "/",
  passport.authenticate("access-token", { session: false }),
  translationController.createTranslation
);

// 수정
router.put(
  "/:id",
  passport.authenticate("access-token", { session: false }),
  translationController.updateTranslation
);

router.get("/temporary", findAllTranslations);

export default router;
