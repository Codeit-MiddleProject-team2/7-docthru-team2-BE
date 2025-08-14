import { postFeedback } from "../repositories/feedback.js";

export const createFeedback = async (data) => {
  return await postFeedback(data);
};
