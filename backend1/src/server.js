import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(".env"),
});

console.log("Loaded:", process.env.GEMINI_API_KEY);

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Backend1 server running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();