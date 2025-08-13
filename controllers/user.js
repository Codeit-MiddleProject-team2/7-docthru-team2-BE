import { createUser } from "../services/user.js";

export const signupUser = async (req, res) => {
  const { data } = req.body;
  try {
    const user = await createUser(data);
    if (!user) {
      return res
        .status(404)
        .json({ error: "signup 리퀘스트 데이터 확인 필요" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error("❌ [signupUser] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};
