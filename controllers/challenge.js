import { ChallengeService } from "../services/challenge.js";

export class ChallengeController {
  challengeService = new ChallengeService();

  getAllChallenges = async (req, res, next) => {
    try {
      const challenges = await this.challengeService.findAllChallenges(
        req.query
      );
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
      const { challengeId } = req.params;
      const updateData = req.body;
      const updatedChallenge = await this.challengeService.updateChallenge(
        challengeId,
        updateData
      );
      return res.status(200).json({ data: updatedChallenge });
    } catch (error) {
      next(error);
    }
  };

  getChallengeViewById = async (req, res, next) => {
    try {
      const { challengeId } = req.params;
      const data = await this.challengeService.getChallengeViewById(
        challengeId
      );
      if (!data)
        return res.status(404).json({ message: "챌린지를 찾을 수 없습니다." });
      return res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

  updateChallengeWithStatus = async (req, res, next) => {
    try {
      const { challengeId } = req.params;
      const updateData = req.body;
      const data = await this.challengeService.updateChallengeWithStatus(
        challengeId,
        updateData
      );
      return res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

  createChallengeStatusManage = async (req, res, next) => {
    const { challengeId } = req.params;
    const { state, reason = null } = req.body;

    try {
      const newStatus = await this.challengeService.createStatus(
        challengeId,
        state,
        reason
      );
      res.status(201).json({
        message: "챌린지 상태가 변경되었습니다.",
        status: newStatus,
      });
    } catch (err) {
      next(err);
    }
  };
}
