import { Innertube } from "youtubei.js";

/**
 * Initialize YouTube client
 */
let youtube = null;

const getYoutubeClient = async () => {
  if (!youtube) {
    youtube = await Innertube.create();
  }
  return youtube;
};

/**
 * Extract YouTube Video ID
 */
export const extractVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    // https://youtube.com/watch?v=xxxx
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // https://youtu.be/xxxx
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    throw new Error("Invalid YouTube URL");
  } catch (error) {
    throw new Error("Invalid YouTube URL");
  }
};

/**
 * Fetch video metadata
 */
export const getVideoDetails = async (url) => {
  try {
    const videoId = extractVideoId(url);

    const yt = await getYoutubeClient();

    const info = await yt.getInfo(videoId);

    return {
      videoId,

      title: info.basic_info.title,

      description: info.basic_info.short_description,

      channel: info.basic_info.channel?.name || "",

      thumbnail:
        info.basic_info.thumbnail?.[0]?.url || "",

      duration:
        info.basic_info.duration?.text || "",

      viewCount:
        info.basic_info.view_count || 0,
    };
  } catch (error) {
    console.error(error);

    throw new Error("Unable to fetch video details.");
  }
};