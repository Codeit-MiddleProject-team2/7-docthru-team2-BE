import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 입력된 데이터로 피드백 생성
export const postFeedback = async (data) => {
  return await prisma.feedback.create({
    data,
  });
};

export const feedbackRepository = {
  findById(id) {
    return prisma.feedback.findUnique({ where: { id } });
  },

  findManyByTranslation(translationId, offset = 0, limit = 3) {
    return prisma.feedback.findMany({
      where: { translationId },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: { select: { id: true, nickname: true, isAdmin: true } },
      },
    });
  },

  countByTranslation(translationId) {
    return prisma.feedback.count({ where: { translationId } });
  },

  create({ translationId, userId, content }) {
    return prisma.feedback.create({ data: { translationId, userId, content } });
  },

  update({ id, content }) {
    return prisma.feedback.update({ where: { id }, data: { content } });
  },

  remove({ id }) {
    return prisma.feedback.delete({ where: { id } });
  },
};
