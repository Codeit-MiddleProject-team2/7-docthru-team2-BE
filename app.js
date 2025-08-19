import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
