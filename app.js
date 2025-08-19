import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import myChallengeRouter from "./routes/myChallenge.js";
import userRouter from "./routes/user.js";
import challengeRouter from "./routes/challenge.js";
import feedbackRouter from "./routes/feedback.js";
import translationRouter from "./routes/translation.js";
import passport from "./config/passport.js";
import heartsRouter from "./routes/hearts.js";

dotenv.config();

const app = express();

// 초기화
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/mychallenge/apply", myChallengeRouter);
app.use("/user", userRouter);
app.use("/challenge", challengeRouter);
app.use("/translation", translationRouter);
app.use("/feedback", feedbackRouter);
app.use("/hearts", heartsRouter);
// 서버 실행
const PORT = Number(process.env.PORT) || 5000;
//지금 읽힌 값 화인
app.listen(PORT, () => console.log(`Server on :${PORT}`));
