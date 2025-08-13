import { ChallengeRepository } from "../repositories/challenge.js";

export class ChallengeService {
  challengeRepository = new ChallengeRepository();

  findAllChallenges = async () => {
    return await this.challengeRepository.findAllChallenges();
  };
  findChallengeById = async (challengeId) => {
    return await this.challengeRepository.findChallengeById(challengeId);
  };
}
