import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export class ChallengeRepository {
  findAllChallenges = async () => {
    return await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
    });
  };

  findChallengeById = async (challengeId) => {
    return await prisma.challenge.findUnique({
      where: { id: challengeId },
    });
  };

  updateChallenge = async (challengeId, updata) => {
    return await prisma.challenge.update({
      where: { id: challengeId },
      data: updateData,
    });
  };
}
