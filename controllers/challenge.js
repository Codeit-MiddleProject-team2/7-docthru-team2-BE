import { ChallengeService } from "../services/challenge.js";

export class ChallengeController {
  challengeService = new ChallengeService();

  getAllChallenges = async (req, res, next) => {
    try {
      const challenges = await this.challengeService.findAllChallenges();
      return res.status(200).json({ data: challenges });
    } catch (error) {
      next(error);
    }
  };

  getChallengeById = async (req, res, next) => {
    try {
      const { challengeId } = req.params;
      const challenge = await this.challengeService.findChallengeById(
        challengeId
      );
      if (!challenge) {
        return res.status(404).json({ message: "챌린지를 찾을 수 없습니다." });
      }
      return res.status(200).json({ data: challenge });
    } catch (error) {
      next(error);
    }
  };

  updateChallenge = async (req, res, next) => {
    try {
      const { challengeID } = req.params;
      const updateData = req.body;
      const updateChallenge = await this.challengeService.updateChallenge(
        challengeId,
        updateChallenge
      );
      return res.status(200).json({ data: updatedChallenge });
    } catch (error) {
      next(error);
    }
  };
}
