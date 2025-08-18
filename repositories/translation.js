import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const translationRepository = {
  findById(id) {
    return prisma.translation.findUnique({ where: { id } });
  },

  findByIdWithRelations(id) {
    return prisma.translation.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, nickname: true, isAdmin: true } },
        challenge: { select: { id: true, title: true } },
        _count: { select: { Feedback: true, Hearts: true } }, // 관계명 대문자 사용
      },
    });
  },

  findManyByChallenge(challengeId, skip = 0, take = 10) {
    return prisma.translation.findMany({
      where: { challengeId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        challengeId: true,
        userId: true,
        content: true,
        isSubmitted: true,
        submittedAt: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, nickname: true } },
        _count: { select: { Feedback: true, Hearts: true } },
      },
    });
  },

  countByChallenge(challengeId) {
    return prisma.translation.count({ where: { challengeId } });
  },

  // 번역 작업 생성 접근 시, 작업물 유무 체크

  findSubmittedByChallengeAndUser(challengeId, userId) {
    return prisma.translation.findFirst({
      where: {
        challengeId,
        userId,
        isSubmitted: true,
      },
      orderBy: {
        submittedAt: "desc",
      },
      include: {
        challenge: {
          select: {
            url: true,
          },
        },
      },
    });
  },

  // isSubmitted = false인 번역물 중 최신 데이터 조회
  findLatestDraftByChallengeAndUser(challengeId, userId) {
    return prisma.translation.findFirst({
      where: {
        challengeId,
        userId,
        isSubmitted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        challenge: {
          select: {
            url: true,
          },
        },
      },
    });
  },

  // 생성
  create(data) {
    return prisma.translation.create({
      data,
    });
  },

  // 수정
  update(id, data) {
    return prisma.translation.update({
      where: { id },
      data: {
        content: data.content,
        isSubmitted: data.isSubmitted,
      },
    });
  },
};

// 특정 챌린지에 속하는 작업물 목록 조회
export const findAllTranslations = async ({ challengeId, page = 1 }) => {
  const limit = 5;
  const offset = (page - 1) * 5;

  const rawResult = await prisma.$queryRaw`
  SELECT
    t.id,
    u.id AS "userId",
    u.nickname,
    u.img,
    u."userLevel",
    COUNT(h.id) AS hearts_count
  FROM "Translation" t
  JOIN "User" u ON t."userId" = u.id
  LEFT JOIN "Hearts" h ON h."translationId" = t.id
  WHERE t."challengeId" = ${challengeId} AND t."isSubmitted" = ${true}
  GROUP BY t.id, u.id
  ORDER BY hearts_count DESC
  LIMIT ${limit} OFFSET ${offset}
  `;

  const result = rawResult.map((row) => ({
    ...row,
    hearts_count: Number(row.hearts_count),
  }));

  return result;
};

// 최다 추천작 가져오기
export const findBestTranslations = async (challengeId) => {
  const rawResult = await prisma.$queryRaw`
  SELECT
    t.id,
    t.content,
    t."submittedAt",
    u.id AS "userId",
    u.nickname,
    u.img,
    u."userLevel",
    COUNT(h.id) AS hearts_count
  FROM "Translation" t
  JOIN "User" u ON t."userId" = u.id
  LEFT JOIN "Hearts" h ON h."translationId" = t.id
  WHERE t."challengeId" = ${challengeId}
    AND t."isSubmitted" = true
  GROUP BY t.id, u.id
  ORDER BY hearts_count DESC
  FETCH FIRST 1 ROWS WITH TIES
`;

  const result = rawResult.map((row) => ({
    ...row,
    hearts_count: Number(row.hearts_count),
  }));

  return result;
};

// 번역 작업 생성
export const createTranslation = async (data) => {
  return await prisma.translation.create({
    data,
  });
};
