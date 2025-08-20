import { createFeedback } from "../services/feedback.js";

export const postFeedback = async (req, res) => {
  const { id } = req.user;
  const { data } = req.body;

  if (id !== data.userId) {
    return res.status(500).json({ error: "인증 에러" });
  }

  const newData = { ...data, userId: id };

  try {
    const newFeedback = await createFeedback(newData);
    if (!newFeedback) {
      return res
        .status(404)
        .json({ error: "feedback post 리퀘스트 데이터 확인 필요" });
    }
    res.status(200).json(newFeedback);
  } catch (e) {
    console.error("❌ [postFeedback]] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};

import { feedbackService } from "../services/feedback.js";

// 문자열 헬퍼
const toStr = (v) => (v === undefined || v === null ? "" : String(v));

export const feedbackController = {
  // GET /feedback?translationId=...&offset=0&limit=3   ← 단수 경로(A안)
  async list(req, res, next) {
    try {
      const translationId = toStr(req.query.translationId).trim();
      if (!translationId) {
        return res.status(400).json({ message: "translationId is required" });
      }

      const offset = Math.max(0, parseInt(toStr(req.query.offset) || "0", 10));
      const rawLimit = parseInt(toStr(req.query.limit) || "3", 10);
      const limit = Math.max(1, Math.min(30, isNaN(rawLimit) ? 3 : rawLimit));

      const result = await feedbackService.list({
        translationId, // 문자열로 전달
        offset,
        limit,
      });

      return res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },

  // PATCH /feedback/:id
  async update(req, res, next) {
    try {
      const id = toStr(req.params.id).trim(); // 문자열
      if (!id) {
        return res.status(400).json({ message: "유효한 id가 필요합니다." });
      }

      const userId = toStr(req.user?.id).trim(); // 문자열로 통일
      const isAdmin = !!req.user?.isAdmin;
      const { content } = req.body || {};

      if (!userId || !content?.trim()) {
        return res
          .status(400)
          .json({ message: "로그인 사용자와 content는 필수입니다." });
      }

      const updated = await feedbackService.update({
        id,
        userId,
        isAdmin,
        content: content.trim(),
      });

      return res.status(200).json(updated);
    } catch (e) {
      if (e && typeof e === "object" && "status" in e && "message" in e) {
        return res.status(e.status).json({ message: e.message });
      }
      return next(e);
    }
  },

  // DELETE /feedback/:id
  async remove(req, res, next) {
    try {
      const id = toStr(req.params.id).trim(); // 문자열
      if (!id) {
        return res.status(400).json({ message: "유효한 id가 필요합니다." });
      }

      const userId = toStr(req.user?.id).trim(); // 문자열로 통일
      const isAdmin = !!req.user?.isAdmin;
      const { reason = "" } = req.body || {};

      if (!userId) {
        return res.status(400).json({ message: "로그인이 필요합니다." });
      }

      const result = await feedbackService.remove({
        id,
        userId,
        isAdmin,
        reason: String(reason ?? ""),
      });

      return res.status(200).json(result);
    } catch (e) {
      if (e && typeof e === "object" && "status" in e && "message" in e) {
        return res.status(e.status).json({ message: e.message });
      }
      return next(e);
    }
  },
};
