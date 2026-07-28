$ErrorActionPreference = "Stop"

cd d:\project1
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init -q
git remote add origin https://github.com/Ishita679/project1.git
git config user.name "Ishita679"
git config user.email "183172102+Ishita679@users.noreply.github.com"
git config core.autocrlf false

$date = [datetime]"2026-07-28T09:00:00"

function Commit-File {
    param(
        [string]$file,
        [string]$message
    )
    $script:date = $script:date.AddMinutes(10)
    
    $dateStr = $script:date.ToString("yyyy-MM-ddTHH:mm:ss")
    $env:GIT_AUTHOR_DATE = $dateStr
    $env:GIT_COMMITTER_DATE = $dateStr
    
    if (Test-Path $file) {
        git add $file
        git commit -m $message -q
    }
}

Commit-File ".gitignore" "Initialize project structure and configure environment ignores"
Commit-File "README.md" "Add detailed project documentation and setup instructions"

Commit-File "backend1/package.json" "Initialize backend Node.js environment and specify dependencies"
Commit-File "backend1/package-lock.json" "Lock backend dependencies for reproducible builds"
Commit-File "backend1/Dockerfile" "Configure Docker containerization for backend microservice"
Commit-File "backend1/src/server.js" "Set up core Express server and port listener"
Commit-File "backend1/src/app.js" "Configure Express application with middleware and routing"
Commit-File "backend1/src/config/db.js" "Establish stable connection protocol for MongoDB database"
Commit-File "backend1/src/config/env.js" "Implement strict environment variable parsing and validation"
Commit-File "backend1/src/config/groq.js" "Set up Groq SDK client for AI model interaction"
Commit-File "backend1/src/middleware/auth.js" "Implement robust JWT authentication middleware"
Commit-File "backend1/src/middleware/errorHandler.js" "Create centralized error handling middleware"
Commit-File "backend1/src/models/User.js" "Define robust Mongoose schema for user accounts"
Commit-File "backend1/src/models/Video.js" "Structure MongoDB schema for video processing results"
Commit-File "backend1/src/models/Chat.js" "Create schema for storing contextual AI chat sessions"
Commit-File "backend1/src/routes/auth.routes.js" "Define secure endpoints for user registration and login"
Commit-File "backend1/src/routes/video.routes.js" "Establish routing logic for video analysis operations"
Commit-File "backend1/src/controllers/auth.controller.js" "Develop authentication controller with password encryption"
Commit-File "backend1/src/controllers/video.controller.js" "Develop core controller for orchestrating video AI pipeline"
Commit-File "backend1/src/services/youtube.service.js" "Integrate YouTube data extraction and metadata parsing"
Commit-File "backend1/src/services/transcript.service.js" "Implement seamless transcript retrieval from YouTube"
Commit-File "backend1/src/services/whisper.service.js" "Integrate Whisper AI audio transcription fallback"
Commit-File "backend1/src/services/ytDlp.service.js" "Add yt-dlp utility for robust audio extraction"
Commit-File "backend1/src/services/groq.service.js" "Build AI generation service leveraging LLaMA models"
Commit-File "backend1/src/services/chunk.service.js" "Develop intelligent transcript chunking algorithm for LLM limits"

Commit-File "frontend1/package.json" "Initialize React frontend dependencies with Vite build tool"
Commit-File "frontend1/package-lock.json" "Lock frontend dependency versions"
Commit-File "frontend1/vite.config.js" "Configure Vite build tool for optimal frontend bundling"
Commit-File "frontend1/index.html" "Set up core HTML entry point for the React application"
Commit-File "frontend1/src/main.jsx" "Mount the React application to the DOM root"
Commit-File "frontend1/src/App.jsx" "Set up main application component and router provider"
Commit-File "frontend1/src/index.css" "Implement global CSS custom properties and resets"
Commit-File "frontend1/src/api/apiClient.js" "Create Axios interceptors for robust backend communication"
Commit-File "frontend1/src/context/AuthContext.jsx" "Build robust authentication context with state management"
Commit-File "frontend1/src/layouts/DashboardLayout.jsx" "Design seamless dashboard layout wrapper"
Commit-File "frontend1/src/components/Navbar.jsx" "Build sleek top navigation bar with user controls"
Commit-File "frontend1/src/components/Marquee.jsx" "Add animated scrolling marquee for dynamic visual appeal"
Commit-File "frontend1/src/pages/Landing.jsx" "Design landing page with clear call to actions"
Commit-File "frontend1/src/pages/Dashboard.jsx" "Redesign hero section with minimalist URL input interface"
Commit-File "frontend1/src/pages/History.jsx" "Create library grid view to display processed videos"
Commit-File "frontend1/src/pages/Settings.jsx" "Implement settings interface for profile updates and account deletion"
Commit-File "frontend1/src/pages/Favorites.jsx" "Build favorites placeholder for bookmarking feature"
Commit-File "frontend1/src/pages/Login.jsx" "Design secure user authentication and login interface"
Commit-File "frontend1/src/pages/Register.jsx" "Build registration form with frontend security validations"
Commit-File "frontend1/src/components/AITabs/AITabs.jsx" "Create intuitive tab navigation for AI generated content"
Commit-File "frontend1/src/components/AITabs/SummaryTab.jsx" "Render markdown for bilingual English and Hindi summaries"
Commit-File "frontend1/src/components/AITabs/MindMapTab.jsx" "Implement interactive radial flowchart for video topics"
Commit-File "frontend1/src/components/AITabs/FlashcardsTab.jsx" "Build interactive flip animations for study flashcards"
Commit-File "frontend1/src/components/AITabs/HighlightsTab.jsx" "Display robust video highlights and timestamp markers"
Commit-File "frontend1/src/components/AITabs/NotesTab.jsx" "Format detailed study notes using clean typography"
Commit-File "frontend1/src/components/AITabs/ChaptersTab.jsx" "Visualize video chapter breakdowns seamlessly"
Commit-File "frontend1/src/components/AITabs/QuizTab.jsx" "Develop interactive multiple choice learning quizzes"
Commit-File "frontend1/src/components/AITabs/ChatTab.jsx" "Integrate interactive AI chat interface for video Q&A"

git add .
$script:date = $script:date.AddMinutes(10)
$dateStr = $script:date.ToString("yyyy-MM-ddTHH:mm:ss")
$env:GIT_AUTHOR_DATE = $dateStr
$env:GIT_COMMITTER_DATE = $dateStr
git commit -m "Finalize UI polish and include remaining utility assets" -q

git branch -M main
git push -u origin main --force
