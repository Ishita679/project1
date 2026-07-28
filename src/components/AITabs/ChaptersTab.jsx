import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function ChaptersTab({ data }) {
  const chapters = Array.isArray(data) ? data : [];

  if (!chapters || chapters.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-[var(--color-text-secondary)]">
        No chapters available for this video.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-[var(--color-text-primary)]">
      <div className="pb-4 border-b border-[var(--color-glass-border)]">
        <h2 className="text-xl font-semibold m-0 font-serif">Video Chapters</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Jump to specific sections of the video.</p>
      </div>
      
      <div className="relative border-l border-[var(--color-glass-border)] ml-4 py-2 space-y-6">
        {chapters.map((chapter, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center gap-6 group cursor-pointer"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] w-[9px] h-[9px] rounded-none bg-[var(--color-glass-border)] group-hover:bg-[var(--color-accent-gold)] transition-colors group-hover:shadow-[0_0_10px_var(--color-accent-gold)]" />
            
            <div className="pl-6 flex-1 bg-white/5 border border-[var(--color-glass-border)] rounded-none p-4 group-hover:bg-[var(--color-accent-gold)]/10 transition-all duration-300 flex items-center justify-between">
              <div>
                <span className="text-[var(--color-accent-gold)] text-sm font-mono font-medium mb-1 block">{chapter.time || chapter.timestamp}</span>
                <h3 className="text-[var(--color-text-primary)] font-medium font-serif">{chapter.title}</h3>
              </div>
              <PlayCircle className="w-8 h-8 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-gold)] transition-colors opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
