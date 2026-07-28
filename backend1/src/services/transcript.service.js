import { YoutubeTranscript } from "youtube-transcript";

/**
 * Extract transcript from a YouTube video
 */
export const getTranscript = async (videoId) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      throw new Error("Transcript not available.");
    }

    const cleanedTranscript = cleanTranscript(transcript);

    return {
      transcript: cleanedTranscript,
      segments: transcript,
    };
  } catch (error) {
    console.error("Transcript Error:", error.message);

    throw new Error(
      "Unable to fetch transcript. The video may not have captions."
    );
  }
};

/**
 * Convert transcript array into readable text
 */
const cleanTranscript = (segments) => {
  return segments
    .map((segment) => segment.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Split transcript into chunks
 */
export const chunkTranscript = (
  transcript,
  chunkSize = 1200,
  overlap = 200
) => {
  const chunks = [];

  let start = 0;

  while (start < transcript.length) {
    const end = start + chunkSize;

    chunks.push(transcript.slice(start, end));

    start += chunkSize - overlap;
  }

  return chunks;
};

/**
 * Calculate transcript statistics
 */
export const transcriptStats = (transcript) => {
  const words = transcript.trim().split(/\s+/);

  return {
    words: words.length,
    characters: transcript.length,
    estimatedReadingTime: Math.ceil(words.length / 200),
  };
};