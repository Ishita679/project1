import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    youtubeUrl: {
      type: String,
      required: true,
    },

    videoId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    channel: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    transcript: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    chapters: {
      type: [
        {
          title: String,
          timestamp: String,
        },
      ],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    quiz: {
      type: [Object],
      default: [],
    },

    flashcards: {
      type: [Object],
      default: [],
    },

    // ⭐ NEW
    mindMap: {
      type: Object,
      default: {},
    },

    language: {
      type: String,
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;