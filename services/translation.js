import {
  findTemporaryStorage,
  createTranslation,
} from "../repositories/translation.js";

export async function postTranslation({
  challengeId,
  userId,
  content,
  isSubmitted,
}) {
  return await createTranslation({
    challengeId,
    userId,
    content,
    isSubmitted,
    submittedAt: isSubmitted ? new Date() : null,
  });
}
