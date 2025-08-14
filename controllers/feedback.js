import { createFeedback } from "../services/feedback.js";

export const postFeedback = async (req, res) => {
  const { id } = req.user;
  const { data } = req.body;

  if (id !== data.userId) {
    return res.status(500).json({ error: "인증 에러" });
  }

  const newData = { ...data, userId: id };

  try {
    const newFeedback = await createFeedback(newData);
    if (!newFeedback) {
      return res
        .status(404)
        .json({ error: "feedback post 리퀘스트 데이터 확인 필요" });
    }
    res.status(200).json(newFeedback);
  } catch (e) {
    console.error("❌ [postFeedback]] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};
