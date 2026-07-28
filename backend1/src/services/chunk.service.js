/**
 * Split transcript into manageable chunks
 */
export const chunkTranscript = (
  transcript,
  chunkSize = 1500,
  overlap = 200
) => {
  if (!transcript) return [];

  const words = transcript.split(" ");
  const chunks = [];

  let currentChunk = [];

  for (const word of words) {
    currentChunk.push(word);

    const currentLength = currentChunk.join(" ").length;

    if (currentLength >= chunkSize) {
      chunks.push(currentChunk.join(" "));

      // Keep overlap words
      const overlapWordCount = Math.floor(overlap / 5);

      currentChunk = currentChunk.slice(
        Math.max(currentChunk.length - overlapWordCount, 0)
      );
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
};

/**
 * Merge all chunk summaries into one summary
 */
export const mergeSummaries = (summaries) => {
  return summaries.join("\n\n");
};