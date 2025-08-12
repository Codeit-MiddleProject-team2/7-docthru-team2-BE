import { findMyChallenges } from "../repositories/myChallenge.js";

export async function getMyChallenges(userId) {
  const challenges = await findMyChallenges(userId);
  return challenges;
}
