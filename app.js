import dotenv from 'dotenv';
dotenv.config();
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
const PORT = Number(process.env.PORT) || 5000;
  //지금 읽힌 값 화인
  console.log('PORT from env =', process.env.PORT);
  app.listen(PORT, () => console.log(`Server on :${PORT}`));