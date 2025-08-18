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
    if (f.userId !== userId && !isAdmin)
      throw { status: 403, message: "Forbidden" };
    return feedbackRepository.update({ id, content });
  },
};
