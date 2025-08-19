// repositories/challenge.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ChallengeRepository {
  findAllChallenges = async ({
    page = 1,
    pageSize = 5,
    searchQuery,
    sort,
    category,
    type,
    state = {},
  }) => {
    const whereClause = {
      ...(searchQuery && {
        title: { contains: String(searchQuery), mode: "insensitive" },
      }),
      ...(category && { category }),
    };

    // const sortOption = sort === "latest" ? : sort === "deadline" ?

    const sortOption =
      sort === "deadline" ? { dueDate: "asc" } : { createdAt: "desc" };

    const numPage = parseInt(page);
    const numPageSize = parseInt(pageSize);

    const [items, total] = await Promise.all([
      prisma.challenge.findMany({
        where: whereClause,
        orderBy: sortOption,
        skip: (numPage - 1) * numPageSize,
        take: numPageSize,
      }),
      prisma.challenge.count({ where: whereClause }),
    ]);
    return { items, total, numPage, numPageSize };
  };

  updateChallenge = async (challengeId, updateData) => {
    return await prisma.challenge.update({
      where: { id: challengeId },
      data: updateData,
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    });
  };

  // 상태 1개(최신)까지 포함한 단건 조회
  findChallengeViewById = async (challengeId) => {
    return prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        ChallengeStatusManage: {
          select: { state: true, updatedAt: true, reason: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
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

  createStatus = async (challengeId, state, reason = null) => {
    return prisma.challengeStatusManage.create({
      data: { challengeId, state, reason },
    });
  getCategorys = async (keyword = "") => {
    return await prisma.$queryRaw`
    SELECT c.category 
    FROM "Challenge" c
    WHERE c.category ILIKE '%' || ${keyword} || '%'
    GROUP BY c.category
    ORDER BY COUNT(*) DESC
    LIMIT 5;
  `;
  };
}
