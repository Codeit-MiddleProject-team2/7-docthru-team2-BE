import {
  findUserByEmail,
  findUserById,
  postUser,
} from "../repositories/user.js";

// 회원가입
// email로 이미 가입된 유저가 있는지 확인
// 있다면 에러 발생
// 이미 가입된 유저가 없다면 새로 유저 생성
// password를 제외한 값 유저 객체 리턴
export const createUser = async (user) => {
  const existedUser = await findUserByEmail(user.email);

  if (existedUser) {
    const error = new Error("User already exists");
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const newUser = await postUser(user);
  const { password, ...rest } = newUser;
  return rest;
};
