import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import myChallengeRouter from "./routes/myChallenge.js";
import userRouter from "./routes/user.js";
import challengeRouter from "./routes/challenge.js";

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
