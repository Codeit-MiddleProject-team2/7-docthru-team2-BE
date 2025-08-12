import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export async function findMyChallenges(userId) {
  return await prisma.challenge.findMany({
    where: { userId },
    include: {
      challengeStatusManage: {
        select: {
          state: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
