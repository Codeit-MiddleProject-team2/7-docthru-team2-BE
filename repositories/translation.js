import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const translationRepository = {
  findById(id) {
    return prisma.translation.findUnique({ where: { id } });
  },

  findByIdWithRelations(id) {
    return prisma.translation.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, nickname: true, isAdmin: true } },
        challenge: { select: { id: true, title: true } },
        _count: { select: { Feedback: true, Hearts: true } }, // 관계명 대문자 사용
      },
    });
  },

  findManyByChallenge(challengeId, skip = 0, take = 10) {
    return prisma.translation.findMany({
      where: { challengeId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        challengeId: true,
        userId: true,
        content: true,
        isSubmitted: true,
        submittedAt: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, nickname: true } },
        _count: { select: { Feedback: true, Hearts: true } },
      },
    });
  },

  countByChallenge(challengeId) {
    return prisma.translation.count({ where: { challengeId } });
  },

  // 번역 작업 생성
  createTranslation(data) {
    return prisma.translation.create({
      data,
    });
  },

  update({ id, content, isSubmitted }) {
    const data = {};
    if (typeof content === "string") data.content = content;
    if (typeof isSubmitted === "boolean") {
      data.isSubmitted = isSubmitted;
      data.submittedAt = isSubmitted ? new Date() : null;
    }
    return prisma.translation.update({ where: { id }, data });
  },
};
