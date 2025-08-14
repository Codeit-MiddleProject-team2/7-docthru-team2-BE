import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const heartsRepository = {
  findFirst({ translationId, userId }) {
    return prisma.hearts.findFirst({
      where: { translationId, userId },
      select: { id: true },
    });
  },

  exists({ translationId, userId }) {
    return prisma.hearts
      .count({ where: { translationId, userId } })
      .then((n) => n > 0);
  },

  create({ translationId, userId }) {
    return prisma.hearts.create({ data: { translationId, userId } });
  },

  removeById(id) {
    return prisma.hearts.delete({ where: { id } });
  },

  countByTranslation(translationId) {
    return prisma.hearts.count({ where: { translationId } });
  },
};
