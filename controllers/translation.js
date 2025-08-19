import express from "express";
import { translationService } from "../services/translation.js";
import {
  getAllTranslations,
  postTranslation,
} from "../services/translation.js";

export const findAllTranslations = async (req, res) => {
  const { challengeId } = req.params;
  const { query } = req;

  const option = { ...query, challengeId };

  try {
    const translations = await getAllTranslations(option);
    if (!translations) {
      return res.status(404).json({ error: "작업물 목록이 없습니다." });
    }
    res.status(200).json(translations);
  } catch (e) {
    console.error("❌ [findAllTranslations] error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const translationController = {
  async listByChallenge(req, res, next) {
    try {
      const challengeId = String(req.query.challengeId || "");
      if (!challengeId)
        return res.status(400).json({ message: "challengeId is required" });

      const page = Math.max(1, parseInt(req.query.page ?? "1", 10));
      const limit = Math.max(
        1,
        Math.min(50, parseInt(req.query.limit ?? "10", 10))
      );

      const result = await translationService.listByChallenge({
        challengeId,
        page,
        limit,
      });
      return res.json(result);
    } catch (e) {
      return next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const id = String(req.params.id);
      const data = await translationService.getById(id);
      if (!data)
        return res.status(404).json({ message: "Translation not found" });
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  },

  async createTranslation(req, res, next) {
    try {
      const { challengeId, userId, content, isSubmitted } = req.body;

      // 필수 데이터 유효성 검사
      if (!challengeId || !userId || !content) {
        return res
          .status(400)
          .json({ message: "챌린지 ID, 사용자 ID, 내용이 필요합니다." });
      }

      const result = await translationService.postTranslation({
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
  },

  async update(req, res, next) {
    try {
      const id = String(req.params.id);
      const { userId, isAdmin = false, content, isSubmitted } = req.body || {};
      if (!userId)
        return res.status(400).json({ message: "userId is required" });

      const updated = await translationService.update({
        id,
        userId,
        isAdmin: !!isAdmin,
        content,
        isSubmitted,
      });
      return res.json(updated);
    } catch (e) {
      return next(e);
    }
  },
};
