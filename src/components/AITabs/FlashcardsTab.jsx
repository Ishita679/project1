import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Rotate3D } from "lucide-react";

export default function FlashcardsTab({ data }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = Array.isArray(data) ? data : [];

  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto py-8 items-center justify-center text-[var(--color-text-secondary)]">
        No flashcards available for this video.
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto py-8 text-[var(--color-text-primary)]">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold m-0 font-serif">Interactive Flashcards</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Click the card to reveal the answer.</p>
      </div>

      <div className="relative w-full aspect-[4/3] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center p-8 text-center bg-[var(--color-bg-secondary)] border border-[var(--color-glass-border)] hover:border-[var(--color-accent-gold)]/50 transition-colors">
            <span className="absolute top-4 right-4 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-none border border-[var(--color-glass-border)] text-[var(--color-text-secondary)]">Question</span>
            <h3 className="text-2xl font-serif font-medium leading-relaxed">{cards[currentIdx]?.q || cards[currentIdx]?.question}</h3>
            <div className="absolute bottom-6 text-[var(--color-text-muted)] flex items-center gap-2 text-sm uppercase tracking-widest">
              <Rotate3D className="w-4 h-4" />
              Click to flip
            </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center p-8 text-center bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/30"
            style={{ transform: "rotateX(180deg)" }}
          >
            <span className="absolute top-4 right-4 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-none bg-[var(--color-accent-gold)] text-[var(--color-bg-primary)]">Answer</span>
            <p className="text-xl font-medium leading-relaxed text-[var(--color-text-primary)]">{cards[currentIdx]?.a || cards[currentIdx]?.answer}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-none border border-[var(--color-glass-border)] hover:bg-white/5 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium font-mono text-[var(--color-text-secondary)]">
          {currentIdx + 1} / {cards.length}
        </span>
        <button 
          onClick={handleNext}
          className="p-3 rounded-none border border-[var(--color-glass-border)] hover:bg-white/5 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
