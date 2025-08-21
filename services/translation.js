import {
  translationRepository,
  findAllTranslations,
  findBestTranslations,
} from "../repositories/translation.js";

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

  async findTranslation(challengeId, userId) {
    // 1. isSubmitted = true인 최종 제출된 번역물이 있는지 먼저 확인
    const submittedTranslation =
      await translationRepository.findSubmittedByChallengeAndUser(
        challengeId,
        userId
      );
    if (submittedTranslation) {
      return {
        translation: submittedTranslation,
        challenge: submittedTranslation.challenge,
      };
    }

    // 2. 제출된 번역물이 없으면, isSubmitted = false인 임시 저장된 번역물 중 가장 최신 데이터를 조회
    const draftTranslation =
      await translationRepository.findLatestDraftByChallengeAndUser(
        challengeId,
        userId
      );
    if (draftTranslation) {
      return {
        translation: draftTranslation,
        challenge: draftTranslation.challenge,
      };
    }

    // 3. 둘 다 없으면 챌린지 반환
    const challenge = await translationRepository.findChallengeById(
      challengeId
    );

    if (!challenge) {
      return null;
    }
    return {
      translation: null,
      challenge: challenge,
    };
  },

  // 생성
  async create(data) {
    return translationRepository.create(data);
  },

  // 수정
  async update(translationId, data, userId) {
    const existingTranslation = await translationRepository.findById(
      translationId
    );

    if (!existingTranslation) {
      return null;
    }

    if (existingTranslation.userId !== userId) {
      throw new Error("수정 권한이 없습니다.");
    }

    return await translationRepository.update(translationId, data);
  },

  async findDrafts(challengeId, userId) {
    return await translationRepository.findDraftsByChallengeAndUser(
      challengeId,
      userId
    );
  },

  async deleteByChallenge(challengeId, userId) {
    return await translationRepository.deleteByChallenge(challengeId, userId);
  },
};

export const getAllTranslations = async (query) => {
  return await findAllTranslations(query);
};

export const getBestTranslations = async (challengeId) => {
  return await findBestTranslations(challengeId);
};

export async function postTranslation({
  challengeId,
  userId,
  content,
  isSubmitted,
}) {
  return await createTranslation({
    challengeId,
    userId,
    content,
    isSubmitted,
    submittedAt: isSubmitted ? new Date() : null,
  });
}
