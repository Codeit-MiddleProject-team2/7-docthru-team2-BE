import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export class ChallengeRepository {
  findAllChallenges = async () => {
    return await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    });
  };

  findChallengeById = async (challengeId) => {
    return await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    });
  };

  updateChallenge = async (challengeId, updata) => {
    return await prisma.challenge.update({
      where: { id: challengeId },
      data: updateData,
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
          orderBy: { updateAt: "desc" },
          take: 1,
        },
      },
    });
  };

  createChallengeStatus = async (challengeId, { state, reason }) => {
    return prisma.challengeStatusManage.create({
      data: { challengeId, state, reason },
    });
  };
  // 추가: 상태 포함 단건 조회
  findChallengeViewById = async (challengeId) => {
    return prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
        },
      },
    });
  };

  // 추가: 상태 변경 이력 추가
  createChallengeStatus = async (challengeId, { state, reason }) => {
    return prisma.challengeStatusManage.create({
      data: { challengeId, state, reason },
    });
  };
}
