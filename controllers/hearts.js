import { heartsService } from "../services/hearts.js";

export const heartsController = {
  async create(req, res, next) {
    try {
      const { translationId, userId } = req.body || {};
      if (!translationId || !userId) {
        return res
          .status(400)
          .json({ message: "translationId and userId are required" });
      }
      // 중복 생성을 막기 위해 서비스에서 한 번 확인 후 없을 때만 생성
      const { created, count } = await heartsService.createIfNotExists({
        translationId,
        userId,
      });
      return res
        .status(created ? 201 : 200)
        .json({ liked: true, count, created });
    } catch (e) {
      return next(e);
    }
  },

  async remove(req, res, next) {
    try {
      // DELETE 바디 받기 허용(프론트 편의). 쿼리로 보내도 됨
      const translationId = String(
        req.body?.translationId || req.query?.translationId || ""
      );
      const userId = String(req.body?.userId || req.query?.userId || "");
      if (!translationId || !userId) {
        return res
          .status(400)
          .json({ message: "translationId and userId are required" });
      }
      const { deleted, count } = await heartsService.deleteIfExists({
        translationId,
        userId,
      });
      return res.status(200).json({ liked: false, count, deleted });
    } catch (e) {
      return next(e);
    }
  },

  async countByTranslation(req, res, next) {
    try {
      const translationId = String(req.query.translationId || "");
      if (!translationId)
        return res.status(400).json({ message: "translationId is required" });
      const count = await heartsService.countByTranslation(translationId);
      return res.json({ count });
    } catch (e) {
      return next(e);
    }
  },

  async myStatus(req, res, next) {
    try {
      const translationId = String(req.query.translationId || "");
      const userId = String(req.query.userId || "");
      if (!translationId || !userId) {
        return res
          .status(400)
          .json({ message: "translationId and userId are required" });
      }
      const liked = await heartsService.exists({ translationId, userId });
      return res.json({ liked });
    } catch (e) {
      return next(e);
    }
  },
};
