import {
  findMyChallenges,
  countMyChallenges,
} from "../repositories/myChallenge.js";

export async function getMyChallenges({
  userId,
  status,
  keyword,
  page = 1,
  limit = 10,
}) {
  const offset = (page - 1) * limit;

  // 검색 및 필터 구성 요소
  const filters = {
    userId: userId || null,
    status: status || null,
    keyword: keyword || null,
    offset,
    limit,
  };
  const challenges = await findMyChallenges(filters);

  // 챌린지 전체 개수도 별도로 조회
  const totalCount = await countMyChallenges(filters);

  return {
    total: totalCount,
    challenges: challenges,
  };
}
