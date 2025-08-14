import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export class ChallengeRepository {

  findAllChallenges = async ({skip = 0, take = 5, where = {}} = {}) => {
    const [items, total] = await Promise.all([
        prisma.challenge.findMany({
            where,
            orderBy: { createdAt: 'desc' }, //최신순
            skip,
            take,
        }),
        prisma.challenge.count({where}),
    ]);
    return { items, total };
  };

  findChallengeById = async (challengeId) => {
    return await prisma.challenge.findUnique({
        where: {id:challengeId},
    });
  };

  updateChallenge = async (challengeId, updateData) => {
  return prisma.challenge.update({
  where: { id: Number(challengeId) },
  data: updateData,
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

  // 추가: 상태 변경 이력 추가
  createChallengeStatus = async (challengeId, { state, reason }) => {
    return prisma.challengeStatusManage.create({
      data: { challengeId, state, reason },
    });
  };
}
