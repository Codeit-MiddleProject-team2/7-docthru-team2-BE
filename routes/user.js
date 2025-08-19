import express from "express";
import {
  loginUser,
  refreshAccessToken,
  signupUser,
} from "../controllers/user.js";
import { authRefreshMiddleware } from "../config/passport.js";

const router = express.Router();

router.post("/token/refresh", authRefreshMiddleware, refreshAccessToken);
router.post("/signup", signupUser);
router.post("/", loginUser);

export default router;
