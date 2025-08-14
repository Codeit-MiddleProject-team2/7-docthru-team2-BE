import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserById } from "../../services/user.js";

// 전략 옵션에는 jwtFromRequest 옵션이 반드시 필요
// jwt를 찾는 추출 함수

// 액세스 토큰의 경우 Authorization 헤더의 Bearer ${token}를 통해 전달받는다
const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// refreshToken은 쿠키의 refreshToken 속성을 통해 전달받는다
const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["refreshToken"];
  }
  return token;
};

const refreshTokenOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

// 콜백 함수
async function jwtVerify(payload, done) {
  try {
    const user = await getUserById(payload.userId); // 여기는 다시 작성
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

// JwtStrategy에는 아규먼트 2가지 필요
// 첫번째 아규먼트는 전략 옵션 (~TokenOptions로 정의된 것들)
// 두번째 아규먼트는 토큰을 검증하고 유저 객체를 리퀘스트 객체에 지정하기 위한 콜백(jwtVerify)
export const accessTokenStrategy = new JwtStrategy(
  accessTokenOptions,
  jwtVerify
);
export const refreshTokenStrategy = new JwtStrategy(
  refreshTokenOptions,
  jwtVerify
);
