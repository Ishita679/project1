import Video from "../models/Video.js";
import Chat from "../models/Chat.js";

import { answerQuestion } from "../services/groq.service.js";

export const askQuestion = async (req, res) => {
  try {
    const { videoId, question } = req.body;

    if (!videoId || !question) {
      return res.status(400).json({
        success: false,
        message: "Video ID and question are required.",
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    const answer = await answerQuestion(video.transcript, question);

    const chat = await Chat.create({
      video: video._id,
      user: req.user._id,
      question,
      answer,
    });

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};