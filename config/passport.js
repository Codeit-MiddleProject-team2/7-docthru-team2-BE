import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../middlewares/passport/jwtStrategy.js";
import jwt from "jsonwebtoken";
import { createToken } from "../services/user.js";

// 로그인 했는지 검사
export async function authLoginMiddleware(req, res, next) {
  passport.authenticate(
    accessTokenStrategy,
    { session: false },
    async (err, user, info) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!user) {
        throw new Error("실패");
        // 액세스 토큰 실패 → 리프레시 토큰 확인
        const expiredAccessToken = req.headers.authorization.split(" ")[1];
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken)
          return res.status(401).json({ message: "Unauthorized" });

        try {
          const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
          const accessPayload = jwt.verify(
            expiredAccessToken,
            process.env.JWT_SECRET,
            { ignoreExpiration: true }
          );

          if (payload.userId !== accessPayload.userId) {
            return res.status(401).json({ message: "Unauthorized" });
          }

          // 새 액세스 및 리프레쉬 토큰 발급
          const newAccessToken = createToken(payload.userId);
          const newRefreshToken = createToken(payload.userId, true);
          // res.cookie("refreshToken", newRefreshToken, {
          //   httpOnly: true,
          //   sameSite: "none",
          //   secure: true,
          // });

          // 새 액세스 토큰 헤더로 전달
          // res.json({ newAccessToken });

          req.user = { id: payload.userId };
          return next();
        } catch (e) {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      }

      // 액세스 토큰 유효 → req.user 세팅 후 next()
      req.user = { id: user.id };
      next();
    }
  )(req, res, next);
}

// 리프레쉬 토큰 검사
export async function authRefreshMiddleware(req, res, next) {
  passport.authenticate(refreshTokenStrategy, { session: false })(
    req,
    res,
    next
  );
}

export default passport;
