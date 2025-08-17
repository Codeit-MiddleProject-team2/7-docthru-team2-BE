import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export const findMyChallenges = async ({
  userId,
  status,
  keyword,
  offset,
  limit,
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
    orderBy: { createdAt: "desc" },
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
