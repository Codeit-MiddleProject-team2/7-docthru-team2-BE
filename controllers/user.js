import { updateUser } from "../repositories/user.js";
import { createToken, createUser, getUser } from "../services/user.js";

// 회원가입
export const signupUser = async (req, res) => {
  const { data } = req.body;
  try {
    const user = await createUser(data);
    if (!user) {
      return res
        .status(404)
        .json({ error: "signup 리퀘스트 데이터 확인 필요" });
    }
    const accessToken = createToken(user);
    const refreshToken = createToken(user, true);
    await updateUser(user.id, { refreshToken });
    return res.json({ accessToken, refreshToken, user });
  } catch (e) {
    console.error("❌ [signupUser] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};

// 로그인
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    if (!user) {
      return res.status(404).json({ error: "login 리퀘스트 데이터 확인 필요" });
    }
    const accessToken = createToken(user);
    const refreshToken = createToken(user, true);
    await updateUser(user.id, { refreshToken });
    return res.json({ accessToken, refreshToken, user });
  } catch (e) {
    console.error("❌ [loginUser] error:", e);
    res.status(500).json({ error: `${e}` });
  }
};
