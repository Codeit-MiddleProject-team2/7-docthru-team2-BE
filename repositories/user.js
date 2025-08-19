import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 아이디로 유저 찾기
// 찾으면 유저 객체 리턴
export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

// 이메일로 유저 찾기
// 찾으면 유저 객체 리턴
export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// 입력된 데이터로 유저 생성 (회원가입)
export const postUser = async (data) => {
  return prisma.user.create({
    data,
  });
};
