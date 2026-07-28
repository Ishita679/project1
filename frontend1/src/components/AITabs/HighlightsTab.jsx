import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function HighlightsTab({ data }) {
  const highlights = Array.isArray(data) ? data : [];

  if (!highlights || highlights.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-[var(--color-text-secondary)]">
        No highlights available for this video.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full text-[var(--color-text-primary)]">
      <div className="pb-4 border-b border-[var(--color-glass-border)]">
        <h2 className="text-xl font-semibold m-0 font-serif">Key Highlights</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Important takeaways extracted from the content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((item, index) => {
          const isString = typeof item === 'string';
          const text = isString ? item : (item.text || item.highlight || JSON.stringify(item));
          const tag = isString ? "Highlight" : (item.tag || "Highlight");
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="glass-card p-5 group rounded-none hover:bg-[var(--color-accent-gold)]/5 transition-colors border-[var(--color-glass-border)] hover:border-[var(--color-accent-gold)]/40"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-none text-xs font-semibold uppercase tracking-widest border border-[var(--color-accent-gold)]/30 text-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10">
                  {tag}
                </span>
                <Quote className="w-4 h-4 text-[var(--color-accent-gold)]/20 group-hover:text-[var(--color-accent-gold)]/50 transition-colors" />
              </div>
              <p className="text-[var(--color-text-primary)] leading-relaxed text-sm font-serif italic">{text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
