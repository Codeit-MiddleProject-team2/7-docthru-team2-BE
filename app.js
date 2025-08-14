import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import myChallengeRouter from "./routes/myChallenge.js";
import userRouter from "./routes/user.js";
import challengeRouter from "./routes/challenge.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/mychallenge/apply", myChallengeRouter);
app.use("/user", userRouter);
app.use("/challenge", challengeRouter);

// 서버 실행
const PORT = 5000;
//지금 읽힌 값 화인
app.listen(PORT, () => console.log(`Server on :${PORT}`));
