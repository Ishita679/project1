import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (Protected)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteAccount);

export default router;