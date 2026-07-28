import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, PlayCircle, Trash2, ArrowRight } from "lucide-react";
import apiClient from "../api/apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await apiClient.get("/video");
      setVideos(res.data.videos);
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/video/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
      toast.success("Video removed from history");
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-secondary)]">
        <div className="w-8 h-8 border-4 border-[var(--color-accent-gold)] border-t-transparent rounded-full animate-spin mb-4" />
        Loading history...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-6 w-full max-w-5xl mx-auto text-[var(--color-text-primary)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-serif flex items-center gap-3">
          <Clock className="w-8 h-8 text-[var(--color-accent-gold)]" />
          Learning History
        </h1>
        <p className="text-[var(--color-text-secondary)]">Your previously processed videos and study materials.</p>
      </div>

      {videos.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center mb-4 border border-[var(--color-glass-border)]">
            <PlayCircle className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 font-serif">No videos yet</h3>
          <p className="text-[var(--color-text-secondary)] mb-6">Process a YouTube video to start building your knowledge library.</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-none bg-[var(--color-accent-gold)] text-[var(--color-bg-primary)] font-medium hover:opacity-90 transition-opacity"
          >
            Process Video
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card group flex flex-col overflow-hidden rounded-none border-[var(--color-glass-border)] hover:border-[var(--color-accent-gold)]/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"} 
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent opacity-80" />
                <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-mono bg-black/60 backdrop-blur-sm rounded-none border border-white/10">
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif font-semibold text-lg line-clamp-2 mb-2 group-hover:text-[var(--color-accent-gold)] transition-colors">
                  {video.title || "Untitled Video"}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4 line-clamp-1 uppercase tracking-wider">
                  {video.channel || "Unknown Channel"}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-glass-border)]">
                  <button 
                    onClick={() => {
                      // Navigate to dashboard and somehow load this video?
                      // The current Dashboard doesn't accept ID in route, but we can pass state.
                      navigate("/dashboard", { state: { videoData: video } });
                    }}
                    className="text-sm font-medium hover:text-[var(--color-accent-gold)] transition-colors flex items-center gap-1"
                  >
                    View Materials <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(video._id)}
                    className="p-2 text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-400/10 rounded-none transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
