import express from "express";
import { postTranslation } from "../services/translation.js";

export const createTranslation = async (req, res, next) => {
  try {
    const { challengeId, userId, content, isSubmitted } = req.body;

    // 필수 데이터 유효성 검사
    if (!challengeId || !userId || !content) {
      return res
        .status(400)
        .json({ message: "챌린지 ID, 사용자 ID, 내용이 필요합니다." });
    }

    const result = await postTranslation({
      challengeId,
      userId,
      content,
      isSubmitted,
    });

    res.status(201).json(result);
    console.log("생성 또는 업데이트된 데이터:", result);
  } catch (error) {
    next(error);
  }
};
