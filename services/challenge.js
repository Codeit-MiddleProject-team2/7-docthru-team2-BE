// services/challenge.js
import { ChallengeRepository } from "../repositories/challenge.js";

export class ChallengeService {
  challengeRepository = new ChallengeRepository();

  // 목록 조회: 페이지네이션 + 검색(q) + 필터(category/type/state)
  findAllChallenges = async ({ page = 1, pageSize = 5, q, category, type, state } = {}) => {
    // Prisma where 구성
    const where = {
      ...(q && { title: { contains: String(q), mode: "insensitive" } }),
      ...(type && { docType: type }),
      ...(state && { status: state }),
      ...(Array.isArray(category) && category.length ? { category: { in: category } } : {}),
    };

    // page/pageSize → skip/take 계산
    const take = Math.max(1, Number(pageSize) || 5);
    const pageNum = Math.max(1, Number(page) || 1);
    const skip = (pageNum - 1) * take;

    // 레포지토리 호출 (쿼리 전담)
    const { items, total } = await this.challengeRepository.findAllChallenges({ skip, take, where });

    // 프론트가 바로 쓰기 좋은 형태로 반환
    return {
      challenges: items,
      page: pageNum,
      pageSize: take,
      totalCount: total,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
  };

  findChallengeById = async (challengeId) => {
    return this.challengeRepository.findChallengeById(challengeId);
  };

  updateChallenge = async (challengeId, updateData) => {
    return this.challengeRepository.updateChallenge(challengeId, updateData);
  };

  getChallengeViewById = async (challengeId) => {
    const challenge = await this.challengeRepository.findChallengeViewById(challengeId);
    if (!challenge) return null;

    const { ChallengeStatusManage, ...rest } = challenge;
    return {
      ...rest,
      challengeState: ChallengeStatusManage.state,
      updatedAt: ChallengeStatusManage.updatedAt ?? challenge.updatedAt,
      reason: ChallengeStatusManage.reason ?? null,
    };
  };

  updateChallengeWithStatus = async (challengeId, updateData) => {
    const { ChallengeState, reason, ...core } = updateData;

    // 상태 변경 요청이 있으면 상태 이력 생성
    if (ChallengeState || typeof reason !== "undefined") {
      const valid = ["PENDING", "ACCEPTED", "REJECTED", "DELETED"];
      if (ChallengeState && !valid.includes(ChallengeState)) {
        throw new Error(`Invalid ChallengeState: ${ChallengeState}`);
      }
      await this.challengeRepository.createChallengeStatus(challengeId, {
        state: ChallengeState,
        reason,
      });
    }

    // 나머지 본문 필드 업데이트
    if (Object.keys(core).length > 0) {
      await this.updateChallenge(challengeId, core);
    }

    return this.getChallengeViewById(challengeId);
  };
}