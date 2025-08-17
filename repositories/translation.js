import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 번역 작업 생성
export const createTranslation = async (data) => {
  return await prisma.translation.create({
    data,
  });
};

// 챌린지ID, 사용자ID로 임시 저장 글
export const findTemporaryStorage = async (challengeId, userId) => {
  return await prisma.translation.findFirst({
    where: {
      challengeId,
      userId,
      isSubmitted: false,
    },
  });
};
