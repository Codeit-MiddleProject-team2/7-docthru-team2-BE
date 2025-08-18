import { createTranslation } from "../repositories/translation.js";

import { translationRepository } from "../repositories/translation.js";

export const translationService = {
  async listByChallenge({ challengeId, page, limit }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      translationRepository.findManyByChallenge(challengeId, skip, limit),
      translationRepository.countByChallenge(challengeId),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  getById(id) {
    return translationRepository.findByIdWithRelations(id);
  },

  async postTranslation({ challengeId, userId, content, isSubmitted }) {
    return await createTranslation({
      challengeId,
      userId,
      content,
      isSubmitted,
      submittedAt: isSubmitted ? new Date() : null,
    });
  },

  async update({ id, userId, isAdmin, content, isSubmitted }) {
    const t = await translationRepository.findById(id);
    if (!t) throw { status: 404, message: "Translation not found" };
    if (t.userId !== userId && !isAdmin)
      throw { status: 403, message: "Forbidden" };
    return translationRepository.update({ id, content, isSubmitted });
  },
};
