import { translationService } from "../services/translation.js";
import {
  getAllTranslations,
  getBestTranslations,
} from "../services/translation.js";

export const findAllTranslations = async (req, res) => {
  const { query } = req;

  try {
    const translations = await getAllTranslations(query);
    if (!translations) {
      return res.status(404).json({ error: "작업물 목록이 없습니다." });
    }
    res.status(200).json(translations);
  } catch (e) {
    console.error("❌ [findAllTranslations] error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findBestTranslations = async (req, res) => {
  const { challengeId } = req.query;

  try {
    const translations = await getBestTranslations(challengeId);
    if (!translations) {
      return res.status(404).json({ error: "작업물 목록이 없습니다." });
    }
    res.status(200).json(translations);
  } catch (e) {
    console.error("❌ [findBestTranslations] error:", e);
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

  // 생성 (POST)
  async createTranslation(req, res, next) {
    try {
      const userId = req.user.id;
      const { challengeId, content, isSubmitted } = req.body;

      const newTranslation = await translationService.create({
        challengeId,
        userId,
        content,
        isSubmitted,
      });

      res.status(201).json(newTranslation);
    } catch (error) {
      next(error);
    }
  },

  // 수정 (PUT)
  async updateTranslation(req, res, next) {
    try {
      const { id: translationId } = req.params;
      const userId = req.user.id;
      const { content, isSubmitted } = req.body;

      const updatedTranslation = await translationService.update(
        translationId,
        { content, isSubmitted },
        userId
      );

      if (!updatedTranslation) {
        return res
          .status(404)
          .json({ message: "해당 번역물을 찾을 수 없습니다." });
      }

      res.status(200).json(updatedTranslation);
    } catch (error) {
      next(error);
    }
  },
  async getDrafts(req, res, next) {
    try {
      const { challengeId } = req.params;
      const userId = req.user.id;

      const drafts = await translationService.findDrafts(challengeId, userId);

      res.status(200).json(drafts);
    } catch (error) {
      next(error);
    }
  },

  async deleteByChallenge(req, res, next) {
    try {
      const { challengeId } = req.params;
      const userId = req.user.id;

      await translationService.deleteByChallenge(challengeId, userId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async getTranslationByChallengeId(req, res, next) {
    try {
      const { challengeId } = req.params;
      const userId = req.user.id;

      const translation = await translationService.findTranslation(
        challengeId,
        userId
      );

      // 번역물이 없으면 404 Not Found 반환
      if (!translation) {
        return res
          .status(404)
          .json({ message: "해당 챌린지에 대한 번역물을 찾을 수 없습니다." });
      }

      res.status(200).json(translation);
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
