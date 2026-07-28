import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";

export default function Favorites() {
  return (
    <div className="flex flex-col gap-8 py-6 w-full max-w-5xl mx-auto text-[var(--color-text-primary)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-serif flex items-center gap-3">
          <Heart className="w-8 h-8 text-[var(--color-accent-gold)]" />
          Favorites
        </h1>
        <p className="text-[var(--color-text-secondary)]">Your bookmarked and saved videos for quick access.</p>
      </div>

      <div className="glass-card flex flex-col items-center justify-center p-16 text-center border-dashed border-white/20">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <Search className="w-8 h-8 text-[var(--color-text-muted)]" />
        </div>
        <h3 className="text-xl font-semibold mb-2 font-serif">No favorites yet</h3>
        <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm">
          You haven't added any videos to your favorites yet. Click the heart icon on any processed video to save it here.
        </p>
      </div>
    </div>
  );
}
