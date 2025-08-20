import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export const findMyChallenges = async ({
  userId,
  status,
  keyword,
  offset,
  limit,
  orderBy,
}) => {
  const where = {
    ...(userId && { userId }),
    ...(status && {
      ChallengeStatusManage: {
        is: {
          state: status,
        },
      },
    }),
    ...(keyword && {
      title: { contains: keyword, mode: "insensitive" },
    }),
  };

  let orderQuery = { createdAt: "desc" };
  // 기본적으로 생성일 기준 최신순
  if (orderBy === "oldest") {
    orderQuery = { createdAt: "asc" };
  } else if (orderBy === "deadlineOldest") {
    orderQuery = { dueDate: "asc" };
  } else if (orderBy === "deadlineLatest") {
    orderQuery = { dueDate: "desc" };
  }

  return await prisma.challenge.findMany({
    where,
    include: {
      ChallengeStatusManage: {
        select: {
          state: true,
        },
      },
    },
    skip: Number(offset) || 0,
    take: Number(limit) || 10,
    orderBy: orderQuery,
  });
};

// 조건에 맞는 전체 개수 조회
export const countMyChallenges = async ({ userId, status, keyword }) => {
  const where = {
    ...(userId && { userId }),
    ...(status && {
      ChallengeStatusManage: {
        is: {
          state: status,
        },
      },
    }),
    ...(keyword && {
      title: { contains: keyword, mode: "insensitive" },
    }),
  };

  return await prisma.challenge.count({ where });
};

export const findMyChallengesRepo = async (searchQuery = "", userId) => {
  console.log(searchQuery);
  console.log(userId);

  const result = await prisma.$queryRaw`
    SELECT
    c.id,
    c.title,
    c.description,
    c.url,
    c.category,
    c.type,
    c."dueDate",
    c.maximum,
    c."createdAt",
    c."updatedAt",
    c."userId"
    FROM "Challenge" c
    JOIN "Translation" t ON c.id = t."challengeId"
    WHERE t."userId" = ${userId} `;

  return result;
};
