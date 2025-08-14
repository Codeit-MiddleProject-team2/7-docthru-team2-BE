import { ChallengeRepository } from "../repositories/challenge.js";

export class ChallengeService {
  challengeRepository = new ChallengeRepository();

  findAllChallenges = async () => {
    return await this.challengeRepository.findAllChallenges();
  };
  findChallengeById = async (challengeId) => {
    return await this.challengeRepository.findChallengeById(challengeId);
  };
  updateChallenge = async (challengeId, updateData) => {
    return await this.challengeRepository.updateChallenge(
      challengeId,
      updateData
    );
  };

  getChallengeViewById = async (challengeId) => {
    const challenge = await this.challengeRepository.findChallengeViewById(
      challengeId
    );

    if (!challenge) {
      return null;
    }

    const { ChallengeStatusManage, ...rest } = challenge;

    return {
      ...rest,
      challengeState: challenge.ChallengeStatusManage.state,
      updatedAt:
        challenge.ChallengeStatusManage.updatedAt ?? challenge.updatedAt,
      reason: challenge.ChallengeStatusManage.reason ?? null,
    };
  };

  updateChallengeWithStatus = async (challengeId, updateData) => {
    const { ChallengeState, reason, ...core } = updateData;

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

    if (Object.keys(core).length > 0) {
      await this.updateChallenge(challengeId, core);
    }

    return this.getChallengeViewById(challengeId);
  };
}
const repo = new ChallengeRepository();
export async function getChallenges({ page = 1, pageSize = 5, q, category, type, state } = {}) {
    const where = {
      ...(q && { title: { contains: q, mode: 'insensitive' } }),
      ...(type && { docType: type }),
      ...(state && { status: state }),
      ...(Array.isArray(category) && category.length ? { category: { in: category } } : {}),
    };
  
    const skip = (Math.max(1, Number(page)) - 1) * Number(pageSize);
    const take = Number(pageSize);
  
    const { items, total } = await repo.findAllChallenges({ skip, take, where });
  
    return {
      challenges: items,
      page: Number(page),
      pageSize: take,
      totalCount: total,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
}
