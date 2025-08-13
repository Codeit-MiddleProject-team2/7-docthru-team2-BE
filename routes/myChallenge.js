import express from "express";
import { getMyChallenges } from "../services/myChallenge.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  //const { status, keyword, page, limit } = req.query;

  try {
    const testUserId = "2";
    const challenges = await getMyChallenges(testUserId);

    res.json(challenges);
  } catch (error) {
    next(error);
  }
});

export default router;
