// services/challenge.js
import { ChallengeRepository } from "../repositories/challenge.js";

export class ChallengeService {
  challengeRepository = new ChallengeRepository();

  findAllChallenges = async (query) => {
    const {
      items,
      total,
      numPage: page,
      numPageSize: pageSize,
    } = await this.challengeRepository.findAllChallenges(query);

    // 프론트가 바로 쓰기 좋은 형태로 반환
    return {
      challenges: items,
      page,
      pageSize,
      totalCount: total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  };

  updateChallenge = async (challengeId, updateData) => {
    return await this.challengeRepository.updateChallenge(
      challengeId,
      updateData
    );
  };
  postChallenge = async (data) => {
    return await this.challengeRepository.postChallenge(data);
  };

  getChallengeViewById = async (challengeId) => {
    const challenge = await this.challengeRepository.findChallengeViewById(
      challengeId
    );

    if (!challenge) {
      return null;
    }

    const { ChallengeStatusManage, ...rest } = challenge;
    const { state: challengeState, updatedAt, reason } = ChallengeStatusManage;

    return {
      ...rest,
      challengeState,
      reason,
    };
  };

  updateChallengeWithStatus = async (challengeId, updateData) => {
    const { state, reason, ...core } = updateData;

    // 상태 변경 요청이 있으면 상태 이력 생성
    if (state || typeof reason !== "undefined") {
      const valid = ["PENDING", "ACCEPTED", "REJECTED", "DELETED"];
      if (state && !valid.includes(state)) {
        throw new Error(`Invalid ChallengeState: ${state}`);
      }
      await this.challengeRepository.createChallengeStatus(challengeId, {
        state,
        reason,
      });
    }

    // 나머지 본문 필드 업데이트
    if (Object.keys(core).length > 0) {
      await this.updateChallenge(challengeId, core);
    }

    return this.getChallengeViewById(challengeId);
  };

  createStatus = async (challengeId, state, reason) => {
    const challenge = await this.challengeRepository.findChallengeViewById(
      challengeId
    );
    if (!challenge) {
      throw new Error("챌린지를 찾을 수 없습니다.");
    }
    return this.challengeRepository.createStatus(challengeId, state, reason);
  };

  updateStatus = async (challengeId, state, reason) => {
    const challenge = await this.challengeRepository.findChallengeViewById(
      challengeId
    );
    if (!challenge) {
      throw new Error("챌린지를 찾을 수 없습니다.");
    }
    return this.challengeRepository.updateStatus(challengeId, state, reason);
  };

  getCategorys = async (keyword) => {
    const rawCategorys = await this.challengeRepository.getCategorys(keyword);
    let num = 0;
    const result = rawCategorys.map((raw, index) => ({
      key: index + 1,
      name: raw.category,
    }));
    return result;
  };
}
