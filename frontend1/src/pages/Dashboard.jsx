import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Link as LinkIcon, Loader2 } from "lucide-react";
import AITabs from "../components/AITabs/AITabs";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const [videoData, setVideoData] = useState(location.state?.videoData || null);
  const { user } = useAuth();

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsProcessing(true);
    setVideoData(null);
    try {
      const res = await apiClient.post("/video/process", { youtubeUrl: url });
      setVideoData(res.data.video);
      toast.success(res.data.message || "Video processed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to process video");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-12 w-full max-w-5xl mx-auto px-4">
      {/* Hero Section */}
      {!videoData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center pt-10"
        >

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-[var(--color-text-primary)]">
            <span className="text-[var(--color-accent-gold)]">Watch</span><br />
            <span className="text-[var(--color-accent-gold)]">less.</span><br />
            <span>Learn <span className="text-[var(--color-accent-terracotta)] italic font-serif">more.</span></span>
          </h1>

          <p className="max-w-2xl text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-12">
            Paste any YouTube URL. TubeMind extracts the transcript, understands the whole video with AI, and gives you summaries, chapters, highlights and an interactive mind map — in seconds.
          </p>

          <form onSubmit={handleProcess} className="w-full max-w-2xl relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-1.5 focus-within:border-[var(--color-accent-gold)]/50 transition-colors">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste any YouTube URL — https://youtube.com/watch?v=..."
              className="w-full bg-transparent py-4 pl-4 pr-32 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
              required
            />

            <button
              type="submit"
              disabled={isProcessing}
              className="absolute right-1.5 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-terracotta)] hover:opacity-90 text-white px-8 py-3.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Analyze
                </>
              )}
            </button>
          </form>

          <div className="flex gap-6 mt-8 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
            <Link to="/dashboard/history" className="hover:text-[var(--color-accent-gold)] cursor-pointer transition-colors flex items-center gap-1">
              <ArrowRight className="w-3 h-3" /> Open my library
            </Link>
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {videoData && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-h-[600px] mb-8"
          >
            <div className="mb-8 flex justify-between items-center">
              <button
                onClick={() => setVideoData(null)}
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Search
              </button>
            </div>
            <AITabs videoData={videoData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
