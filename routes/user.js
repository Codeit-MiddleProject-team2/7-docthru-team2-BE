import express from "express";
import { loginUser, signupUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/", loginUser);

export default router;
