import { heartsRepository } from "../repositories/hearts.js";

/**
 * 스키마 변경 없이(유니크 제약 없음) 안전하게 쓰기 위해
 * - createIfNotExists: 먼저 존재여부 확인 후 없을 때만 생성
 * - deleteIfExists:    있을 때만 삭제
 * 프론트는 현재 liked 상태에 따라 POST 또는 DELETE 호출
 */
export const heartsService = {
  async createIfNotExists({ translationId, userId }) {
    const exists = await heartsRepository.findFirst({ translationId, userId });
    if (!exists) {
      await heartsRepository.create({ translationId, userId });
    }
    const count = await heartsRepository.countByTranslation(translationId);
    return { created: !exists, count };
  },

  async deleteIfExists({ translationId, userId }) {
    const exists = await heartsRepository.findFirst({ translationId, userId });
    if (exists) {
      await heartsRepository.removeById(exists.id);
    }
    const count = await heartsRepository.countByTranslation(translationId);
    return { deleted: !!exists, count };
  },

  exists({ translationId, userId }) {
    return heartsRepository.exists({ translationId, userId });
  },

  countByTranslation(translationId) {
    return heartsRepository.countByTranslation(translationId);
  },
};
