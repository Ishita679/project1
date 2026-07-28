import express from "express";

import {
  processVideo,
  getVideos,
  getVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/process",
  protect,
  (req, res, next) => {
    console.log("✅ POST /process route matched");
    next();
  },
  processVideo
);

router.get("/", protect, getVideos);

router.get(
  "/:id",
  protect,
  (req, res, next) => {
    console.log("✅ GET /:id route matched");
    next();
  },
  getVideo
);

router.delete(
  "/:id",
  protect,
  (req, res, next) => {
    console.log("✅ DELETE /:id route matched");
    next();
  },
  deleteVideo
);

export default router;