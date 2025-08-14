import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../middlewares/passport/jwtStrategy.js";

passport.use("access-token", accessTokenStrategy);
passport.use("refresh-token", refreshTokenStrategy);

export default passport;
