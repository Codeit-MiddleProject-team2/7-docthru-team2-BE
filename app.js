import express from "express";
import cors from "cors";
import myChallengeRouter from "./routes/myChallenge.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/mychallenge/apply", myChallengeRouter);
app.use("/user", userRouter);

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
