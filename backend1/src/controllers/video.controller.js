import Video from "../models/Video.js";

import { getVideoDetails } from "../services/youtube.service.js";
import { getTranscript } from "../services/transcript.service.js";
import { downloadAudio } from "../services/ytDlp.service.js";
import { transcribeAudio } from "../services/whisper.service.js";
import {
  chunkTranscript,
  mergeSummaries,
} from "../services/chunk.service.js";

import {
  generateSummary,
  generateNotes,
  generateChapters,
  generateHighlights,
  generateQuiz,
  generateFlashcards,
  generateMindMap,
} from "../services/groq.service.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @route POST /api/video/process
 */
export const processVideo = async (req, res, next) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required",
      });
    }

    // -----------------------------
    // Fetch Video Metadata
    // -----------------------------
    const metadata = await getVideoDetails(youtubeUrl);

    // -----------------------------
    // Check if already processed
    // -----------------------------
    const existingVideo = await Video.findOne({
      user: req.user._id,
      videoId: metadata.videoId,
    });

    if (existingVideo) {
      return res.status(200).json({
        success: true,
        message: "Video already processed.",
        video: existingVideo,
      });
    }

    // -----------------------------
    // Fetch Transcript
    // -----------------------------
   let transcript = "";
let language = "en";
let audioFile = null;

try {
    const transcriptData = await getTranscript(metadata.videoId);

    transcript = transcriptData.transcript;
    language = transcriptData.language;

    console.log("✅ Using YouTube transcript");

} catch (err) {
    console.log("⚠️ No YouTube transcript found.");
}

if (!transcript) {

    console.log("⬇️ Downloading audio...");

    audioFile = await downloadAudio(youtubeUrl);

    console.log("🎙️ Generating transcript using Whisper...");

    transcript = await transcribeAudio(audioFile);

    console.log("✅ Whisper transcript generated");
}

    // Truncate transcript aggressively to avoid Groq 6000 TPM limit on free tier across 7 requests
    if (transcript && transcript.length > 2000) {
      transcript = transcript.substring(0, 2000);
    }

    // -----------------------------
    // Chunk Transcript
    // -----------------------------
    const chunks = chunkTranscript(transcript);

    // -----------------------------
    // Generate Summary
    // -----------------------------
    const summaries = [];

    let finalSummary = "";
    try {
      for (const chunk of chunks) {
        const summary = await generateSummary(chunk);
        summaries.push(summary);
      }
      finalSummary = mergeSummaries(summaries);
    } catch (err) {
      console.error("Failed to generate summary:", err.message);
      finalSummary = "Summary could not be generated at this time. Error: " + err.message;
    }

    // -----------------------------
    // Generate Other AI Features
    // -----------------------------
    let notes = "";
    try {
      notes = await generateNotes(transcript);
    } catch (err) {
      console.error("Failed to generate notes:", err.message);
      notes = "Notes could not be generated at this time. Error: " + err.message;
    }

    let chapters = [];
    let highlights = [];
    let quiz = [];
    let flashcards = [];
    let mindMap = {};
    try {
      await delay(2000);
      chapters = await generateChapters(transcript);
    } catch (err) {
      console.error("Failed to parse chapters:", err.message);
    }

    try {
      await delay(2000);
      highlights = await generateHighlights(transcript);
    } catch (err) {
      console.error("Failed to parse highlights:", err.message);
    }

    try {
      await delay(2000);
      quiz = await generateQuiz(transcript);
    } catch (err) {
      console.error("Failed to parse quiz:", err.message);
    }

    try {
      await delay(2000);
      flashcards = await generateFlashcards(transcript);
    } catch (err) {
      console.error("Failed to parse flashcards:", err.message);
    }
try {
    await delay(2000);
    mindMap = await generateMindMap(transcript);
} catch (err) {
    console.error("MindMap Error:", err.message);
}
    // -----------------------------
    // Save Video
    // -----------------------------
    // Robust parsing to prevent Mongoose ValidationErrors
    const safeArray = (val) => {
      if (Array.isArray(val)) return val;
      if (val && typeof val === 'object') {
        // Try to find the first array in the object's values
        const arrays = Object.values(val).filter(Array.isArray);
        if (arrays.length > 0) return arrays[0];
      }
      return [];
    };

    const video = await Video.create({
      user: req.user._id,

      youtubeUrl,

      videoId: metadata.videoId,

      title: metadata.title,

      description: metadata.description,

      channel: metadata.channel,

      thumbnail: metadata.thumbnail,

      duration: metadata.duration,

      transcript,

      summary: finalSummary,

      notes,

      chapters: safeArray(chapters),
      highlights: safeArray(highlights),
      quiz: safeArray(quiz),
      flashcards: safeArray(flashcards),

      mindMap,

      language,
    });

    // -----------------------------
    // Response
    // -----------------------------
    return res.status(201).json({
      success: true,
      message: "Video processed successfully.",
      video,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/video
 */
export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/video/:id
 */
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.status(200).json({
      success: true,
      video,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @route DELETE /api/video/:id
 */
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};