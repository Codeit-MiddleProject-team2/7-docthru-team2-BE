import express from "express";
import { authLoginMiddleware } from "../config/passport.js";
import {
  findAllTranslations,
  findBestTranslations,
  translationController,
} from "../controllers/translation.js";
import { verifyTranslationAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/temporary", findAllTranslations);
router.get("/best", findBestTranslations);

// 목록: 특정 challengeId의 번역들 페이지네이션
router.get("/", translationController.listByChallenge);

// 단건 조회
router.get("/:id", translationController.getById);

// 생성 전 데이터 확인
router.get(
  "/:challengeId/edit",
  authLoginMiddleware,
  translationController.getTranslationByChallengeId
);

// 생성
router.post("/", authLoginMiddleware, translationController.createTranslation);

// 수정
router.put(
  "/:id",
  (req, res, next) => {
    console.log("PUT /:id 라우터에 요청이 들어옴");
    next();
  },
  authLoginMiddleware,
  // verifyTranslationAuth,
  (req, res, next) => {
    console.log("PUT /:id 로그인 미들웨어 이후");
    next();
  },
  translationController.updateTranslation
);

router.get(
  "/:challengeId/drafts",
  authLoginMiddleware,
  translationController.getDrafts
);

router.delete(
  "/:challengeId",
  authLoginMiddleware,
  translationController.deleteByChallenge
);

export default router;
