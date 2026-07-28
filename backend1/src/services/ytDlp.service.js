import ytDlp from "yt-dlp-exec";
import fs from "fs-extra";
import path from "path";

const AUDIO_DIR = path.join(process.cwd(), "temp", "audio");

await fs.ensureDir(AUDIO_DIR);

export const downloadAudio = async (youtubeUrl) => {
    try {
        const outputPath = path.join(
            AUDIO_DIR,
            `${Date.now()}.%(ext)s`
        );

        await ytDlp(youtubeUrl, {
            extractAudio: true,
            audioFormat: "mp3",
            output: outputPath,
            noPlaylist: true,
        });

        const files = await fs.readdir(AUDIO_DIR);

        const latest = files
            .map(file => ({
                file,
                time: fs.statSync(path.join(AUDIO_DIR, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        return path.join(AUDIO_DIR, latest.file);

    } catch (error) {
        throw new Error(`Audio Download Failed: ${error.message}`);
    }
};