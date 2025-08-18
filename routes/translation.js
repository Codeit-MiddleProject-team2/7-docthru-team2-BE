import express from "express";
import { createTranslation } from "../controllers/translation.js";

const router = express.Router();

router.post("/create", createTranslation);

export default router;
