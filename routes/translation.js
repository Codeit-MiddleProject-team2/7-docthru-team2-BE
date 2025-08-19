import express from "express";
import {
  findAllTranslations,
  translationController,
} from "../controllers/translation.js";

const router = express.Router();

// 목록: 특정 challengeId의 번역들 페이지네이션
router.get("/", translationController.listByChallenge);

// 단건 조회
router.get("/:id", translationController.getById);

// 생성
router.post("/create", translationController.createTranslation);

// 수정(PATCH)
router.patch("/:id", translationController.update);

router.get("/temporary", findAllTranslations);

export default router;
