import express from "express";
import {
  loginUser,
  refreshAccessToken,
  signupUser,
} from "../controllers/user.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post(
  "/token/refresh",
  passport.authenticate("refresh-token", { session: false }),
  refreshAccessToken
);
router.post("/signup", signupUser);
router.post("/", loginUser);

export default router;
