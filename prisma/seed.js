import { PrismaClient } from "@prisma/client";
import { challengeData, challengeStatusData } from "../prisma/challengeSeed.js";
import { feedbackData } from "../prisma/feedbackSeed.js";
import { heartsData } from "../prisma/heartsSeed.js";
import { translationData } from "../prisma/translationSeed.js";
import { userData } from "../prisma/userSeed.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// 비밀번호 해시 함수
async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  await prisma.$transaction([
    prisma.hearts.deleteMany(),
    prisma.feedback.deleteMany(),
    prisma.challengeStatusManage.deleteMany(),
    prisma.translation.deleteMany(),
    prisma.challenge.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // User 데이터 넣기
  for (const user of userData) {
    const { createdAt, ...newUser } = user;
    const hassedPassword = await hashingPassword(user.password);
    await prisma.user.create({
      data: { ...newUser, password: hassedPassword },
    });
  }

  // 챌린지 데이터 넣기
  for (const challenge of challengeData) {
    await prisma.challenge.create({
      data: { ...challenge, id: String(challenge.id) },
    });
  }

  // 챌린지 상태 데이터 넣기
  for (const status of challengeStatusData) {
    await prisma.challengeStatusManage.create({
      data: status,
    });
  }

  // 작업물 데이터 넣기
  for (const translation of translationData) {
    await prisma.translation.create({
      data: { ...translation, id: String(translation.id) },
    });
  }

  // 피드백 데이터 넣기
  for (const feedback of feedbackData) {
    await prisma.feedback.create({
      data: { ...feedback, id: String(feedback.id) },
    });
  }

  // 좋아요 데이터 넣기
  for (const heart of heartsData) {
    await prisma.hearts.create({ data: { ...heart, id: String(heart.id) } });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
