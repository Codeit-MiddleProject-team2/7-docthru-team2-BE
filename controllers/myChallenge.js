import express from "express";
import { getMyChallenges } from "../services/myChallenge.js";

export const myChallengesApply = async (req, res, next) => {
  const { status, keyword } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const testUserId = "2";

  try {
    const result = await getMyChallenges({
      userId: testUserId,
      status,
      keyword,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
