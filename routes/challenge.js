import express from "express";
import { ChallengeController } from "../controllers/challenge.js";

const router = express.Router();
const challengesController = new ChallengeController();

// 챌린지 태그(카테고리) 목록 조회
router.get("/categorys", challengesController.getCategorys);

//메인. 모든 챌린지 조회
router.get("/", challengesController.getAllChallenges);

//특정 챌린지 조회
router.get("/:challengeId", challengesController.getChallengeViewById);

// 챌린지 생성
router.post("/", challengesController.postChallenge);

//챌린지 수정하기 (계속하기)
router.patch("/:challengeId", challengesController.updateChallengeWithStatus);

// 챌린지 상태
router.post(
  "/:challengeId/status",
  challengesController.createChallengeStatusManage
);
export default router;
