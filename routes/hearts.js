import { Router } from "express";
import { heartsController } from "../controllers/hearts.js";

const router = Router();

/**
 * 프론트 정책:
 * - 좋아요 누를 때:   POST /hearts
 * - 다시 누르면 취소: DELETE /hearts
 * - 카운트 조회:     GET  /hearts/count?translationId=...
 * - 내 상태 조회:    GET  /hearts/status?translationId=...&userId=...
 */

// 생성(좋아요)
router.post("/", heartsController.create);

// 삭제(좋아요 취소)
router.delete("/", heartsController.remove);

// 카운트 조회
router.get("/count", heartsController.countByTranslation);

// 내 상태 조회(liked: boolean)
router.get("/status", heartsController.myStatus);

export default router;
