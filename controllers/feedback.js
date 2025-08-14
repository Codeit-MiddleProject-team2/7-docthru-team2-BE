import { feedbackService } from "../services/feedback.js";

export const feedbackController = {
  async list(req, res, next) {
    try {
      const translationId = String(req.query.translationId || "");
      if (!translationId)
        return res.status(400).json({ message: "translationId is required" });

      const offset = Math.max(0, parseInt(req.query.offset ?? "0", 10));
      const limit = Math.max(
        1,
        Math.min(30, parseInt(req.query.limit ?? "3", 10))
      );

      const result = await feedbackService.list({
        translationId,
        offset,
        limit,
      });
      return res.json(result);
    } catch (e) {
      return next(e);
    }
  },

  async create(req, res, next) {
    try {
      const { translationId, userId, content } = req.body || {};
      if (!translationId || !userId || !content) {
        return res
          .status(400)
          .json({ message: "translationId, userId, content are required" });
      }
      const created = await feedbackService.create({
        translationId,
        userId,
        content,
      });
      return res.status(201).json(created);
    } catch (e) {
      return next(e);
    }
  },

  async update(req, res, next) {
    try {
      const id = String(req.params.id);
      const { userId, isAdmin = false, content } = req.body || {};
      if (!userId || !content) {
        return res
          .status(400)
          .json({ message: "userId and content are required" });
      }
      const updated = await feedbackService.update({
        id,
        userId,
        isAdmin: !!isAdmin,
        content,
      });
      return res.json(updated);
    } catch (e) {
      return next(e);
    }
  },
};
