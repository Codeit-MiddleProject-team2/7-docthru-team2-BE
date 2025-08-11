import express from 'express';
import { ChallengeController} from '..controller/challenges.js'

const router = express.Router();
const challengesController = new challengesController();

//메인. 모든 챌린지 조회
router.get('/', challengesController.getAllChallenges);

//특정 챌린지 조회
router.get('/:challengeId', challengesController/getChallengeById);

//챌린지 수정하기 (계속하기)
router.put('/:challengeId', challengesController,updateChallenge);

export default router;