TubeMind 🚀
AI-Powered YouTube Video Intelligence Platform

TubeMind is a full-stack AI application that transforms YouTube videos into structured learning content. Instead of watching long videos repeatedly, users can instantly generate AI-powered summaries, notes, quizzes, flashcards, mind maps, and more.

The platform is designed to help students, developers, educators, and lifelong learners consume educational content faster and more effectively.

✨ Features
🔐 JWT Authentication
🎥 Process any public YouTube video
📝 Automatic Transcript Extraction
🤖 AI-powered Summaries
📚 Smart Notes Generation
📑 Automatic Chapter Generation
⭐ Key Highlights Extraction
❓ Quiz Generation
🧠 Flashcards
🌳 AI Mind Maps
💾 MongoDB Storage
🔄 Fallback transcription using yt-dlp + Whisper when YouTube captions are unavailable (in progress)

🛠 Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcrypt
Groq API (Llama 3.3 70B Versatile)
AI & Processing
YouTube Transcript API
yt-dlp
Faster Whisper
Python
Database
MongoDB Atlas
Tools
Postman
Git
VS Code
🏗 Architecture
                    User
                      │
                      ▼
               Express Backend
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
 YouTube Transcript API        yt-dlp + Whisper
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Transcript
                      │
                      ▼
                 Groq LLM
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Summary        Notes        Chapters
        ▼             ▼             ▼
 Highlights      Flashcards      Quiz
                      │
                      ▼
                  Mind Map
                      │
                      ▼
                  MongoDB

📂 Project Structure
TubeMind/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── scripts/
│   ├── config/
│   ├── uploads/
│   ├── temp/
│   ├── utils/
│   └── server.js
│
├── frontend/        (Coming Soon 🚧)
│
└── README.md
🚀 API Features
Authentication
Register User
Login User
JWT Authentication
Video Processing

Given a YouTube URL, TubeMind generates:

Video Metadata
Transcript
Summary
Smart Notes
Chapters
Highlights
Quiz
Flashcards
Mind Map
📡 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Video
POST /api/video/process
GET /api/video
GET /api/video/:id
DELETE /api/video/:id
⚙ Installation

cd TubeMind/backend
Install Dependencies
npm install
Environment Variables

Create a .env file.

PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key
Run Backend
npm run dev
🧪 Testing

All APIs have been tested using Postman.

The backend currently supports:

Authentication
Video Processing
AI Summary
Notes
Chapters
Highlights
Quiz
Flashcards
Mind Maps
📸 Screenshots

Backend API testing screenshots are available in the repository.

User Registration
User Login
Video Processing
AI Generated Response
Quiz
Flashcards
Mind Map
🚧 Upcoming Features
🎨 React Frontend
📄 PDF Export
📥 Download Notes
🌙 Dark Mode
🔍 Semantic Search
💬 AI Chat with Video
📊 Dashboard
📱 Responsive UI
🔊 Whisper Fallback for Videos Without Captions
🌐 Multi-language Support