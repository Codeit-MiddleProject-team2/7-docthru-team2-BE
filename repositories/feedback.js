import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 입력된 데이터로 피드백 생성
export const postFeedback = async (data) => {
  console.log(data);
  return await prisma.feedback.create({
    data,
  });
};
