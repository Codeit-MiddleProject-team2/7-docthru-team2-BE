import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 번역 작업 생성
export const createTranslation = async (data) => {
  return await prisma.translation.create({
    data,
  });
};
