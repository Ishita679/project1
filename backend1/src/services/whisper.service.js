import { spawn } from "child_process";
import path from "path";

export const transcribeAudio = (audioPath) => {

    return new Promise((resolve, reject) => {

        const script = path.join(
            process.cwd(),
            "scripts",
            "transcribe.py"
        );

        const python = spawn("python", [
            script,
            audioPath
        ]);

        let output = "";
        let error = "";

        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        python.stderr.on("data", (data) => {
            error += data.toString();
        });

        python.on("close", (code) => {

            if (code !== 0) {
                reject(error);
            } else {
                resolve(output.trim());
            }

        });

    });

};