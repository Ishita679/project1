import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BrainCircuit, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col relative overflow-hidden bg-noise">
      {/* Background Gradients & Orbits */}
      <div className="absolute top-[5%] left-[10%] w-[80vw] h-[80vw] rounded-full border border-[var(--color-accent-gold)]/10 opacity-40 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-bg-tertiary)] blur-[200px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent-gold)] blur-[200px] opacity-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 md:px-12 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-500/30">
            <BrainCircuit className="text-[var(--color-bg-primary)] w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-serif italic">TubeMind</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-secondary)] hover:text-white transition-colors">Sign In</Link>
          <Link to="/dashboard" className="px-5 py-2.5 rounded-none border border-[var(--color-accent-gold)]/50 bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)] text-sm font-semibold tracking-widest uppercase hover:bg-[var(--color-accent-gold)]/20 transition-colors backdrop-blur-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl flex flex-col items-center gap-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse shadow-[0_0_8px_var(--color-accent-gold)]" />
            <span className="text-xs font-medium text-[var(--color-accent-gold)]">TubeMind AI is now in Beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight font-serif text-[var(--color-text-primary)]">
            Learn from YouTube <br className="hidden md:block" />
            <span className="font-script text-6xl md:text-8xl text-[var(--color-accent-gold)] font-normal inline-block transform -rotate-2 mt-4 ml-4 shadow-sm">at the speed of thought.</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl font-light">
            Paste a URL and let AI generate summaries, structured notes, flashcards, quizzes, and mind maps instantly. The ultimate learning copilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link 
              to="/dashboard" 
              className="px-10 py-4 rounded-none bg-[var(--color-text-primary)] hover:opacity-90 text-[var(--color-bg-primary)] font-semibold tracking-widest uppercase flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(244,234,225,0.15)] group"
            >
              Try TubeMind
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#how-it-works"
              className="px-10 py-4 rounded-none border border-[var(--color-text-secondary)]/30 text-[var(--color-text-primary)] font-semibold tracking-widest uppercase hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              See how it works
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
