import express from "express";

import { askQuestion } from "../controllers/chat.controller.js";

import protect from "../middleware/auth.js";
const router = express.Router();

router.post("/ask", protect, askQuestion);

export default router;