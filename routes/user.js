import express from "express";
import { loginUser, signupUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", loginUser);
router.post("/", signupUser);

export default router;
