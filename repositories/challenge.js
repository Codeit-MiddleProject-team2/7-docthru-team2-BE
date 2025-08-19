// repositories/challenge.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ChallengeRepository {
  findAllChallenges = async ({ skip = 0, take = 5, where = {} } = {}) => {
    const [items, total] = await Promise.all([
      prisma.challenge.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.challenge.count({ where }),
    ]);
    return { items, total };
  };

  findChallengeById = async (challengeId) => {
    return prisma.challenge.findUnique({
      where: { id: challengeId }, // id는 String(uuid)
    });
  };

  updateChallenge = async (challengeId, updateData) => {
    return prisma.challenge.update({
      where: { id: challengeId },
      data: updateData,
    });
  };

  // 상태 1개(최신)까지 포함한 단건 조회
  findChallengeViewById = async (challengeId) => {
    return prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        ChallengeStatusManage: {
          orderBy: { updatedAt: "desc" },
          take: 1,
          select: { id: true, state: true, updatedAt: true, reason: true },
        },
        _count: {
          select: {
            Translation: { where: { challengeId, isSubmitted: true } },
          },
        },
        user: {
          select: { id: true, nickname: true, userLevel: true, img: true },
        },
      },
    });
  };

  createChallengeStatus = async (challengeId, { state, reason }) => {
    return prisma.challengeStatusManage.create({
      data: { challengeId, state, reason }, // id는 String(uuid)
    });
  };
}