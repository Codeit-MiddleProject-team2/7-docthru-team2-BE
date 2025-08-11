import { PrismaClient } from "@prisma/client";
import { challengeData } from "./challengeSeed.js";
import { feedbackData } from "./feedbackSeed.js";
import { heartsData } from "./heartsSeed.js";
import { translationData } from "./translationSeed.js";
import { userData } from "./userSeed.js";

const prisma = new PrismaClient();

async function main() {
  // User 데이터 넣기
  for (const user of userData) {
    const { createdAt, ...newUser } = user;
    await prisma.user.create({
      data: { ...newUser, id: String(newUser.id) },
    });
  }

  // 챌린지 데이터 넣기
  for (const challenge of challengeData) {
    await prisma.challenge.create({
      data: { ...challenge, id: String(challenge.id) },
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
