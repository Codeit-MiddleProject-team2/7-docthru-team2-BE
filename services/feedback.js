import { postFeedback } from "../repositories/feedback.js";

export const createFeedback = async (data) => {
  return await postFeedback(data);
};

import { feedbackRepository } from "../repositories/feedback.js";

export const feedbackService = {
  async list({ translationId, offset, limit }) {
    const [items, total] = await Promise.all([
      feedbackRepository.findManyByTranslation(translationId, offset, limit),
      feedbackRepository.countByTranslation(translationId),
    ]);

    return {
      items,
      total,
      hasMore: offset + items.length < total,
      nextOffset: offset + items.length,
    };
  },

  create({ translationId, userId, content }) {
    return feedbackRepository.create({ translationId, userId, content });
  },

  async update({ id, userId, isAdmin, content }) {
    const f = await feedbackRepository.findById(id);
    if (!f) throw { status: 404, message: "Feedback not found" };

    const allowed = String(f.userId) === String(userId) || isAdmin === true;
    if (!allowed) throw { status: 403, message: "Forbidden" };

    return feedbackRepository.update({ id, content });
  },

  async remove({ id, userId, isAdmin, reason }) {
    const f = await feedbackRepository.findById(id);
    if (!f) throw { status: 404, message: "Feedback not found" };

    const allowed = String(f.userId) === String(userId) || isAdmin === true;
    if (!allowed) throw { status: 403, message: "Forbidden" };

    if (isAdmin && !String(reason).trim()) {
      throw { status: 400, message: "관리자 삭제는 reason이 필수입니다." };
    }

    await feedbackRepository.remove({ id });
    return { id, deleted: true };
  },
};
