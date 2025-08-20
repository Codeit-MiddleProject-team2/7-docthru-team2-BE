import { ChallengeService } from "../services/challenge.js";

export class ChallengeController {
  challengeService = new ChallengeService();

  getAllChallenges = async (req, res, next) => {
    try {
      const challenges = await this.challengeService.findAllChallenges(
        req.query
      );
      return res.status(200).json(challenges);
    } catch (error) {
      next(error);
    }
  };

  postChallenge = async (req, res, next) => {
    const { data } = req.body;
    try {
      const challenge = await this.challengeService.postChallenge(data);
      await this.challengeService.createStatus(challenge.id);
      return res.status(200).json(challenge);
    } catch (e) {
      console.error(e);
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

  updateChallengeStatusManage = async (req, res, next) => {
    const { challengeId } = req.params;
    const { state, reason = null } = req.body;
    console.log("Request body received:", state, reason);
    console.log("Challenge ID received:", challengeId);
    try {
      const newStatus = await this.challengeService.updateStatus(
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

  getCategorys = async (req, res, next) => {
    const { keyword } = req.query;
    try {
      const categorys = await this.challengeService.getCategorys(keyword);
      return res.status(200).json(categorys);
    } catch (e) {
      console.error("❌ [getCategorys] error:", e);
      res.status(500).json({ error: `${e}` });
    }
  };
}
