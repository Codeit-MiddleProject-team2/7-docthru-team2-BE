import express from "express";
import { myChallengesApply } from "../controllers/myChallenge.js";

const router = express.Router();

router.get("/", myChallengesApply);

export default router;
