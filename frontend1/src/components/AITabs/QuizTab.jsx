import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

export default function QuizTab({ data }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = Array.isArray(data) ? data : [];

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto py-8 items-center justify-center text-[var(--color-text-secondary)]">
        No quiz available for this video.
      </div>
    );
  }

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    // Note: ensure backend correct index matches format
    if (idx === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto py-8 text-[var(--color-text-primary)]">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[var(--color-accent-gold)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {currentQ + 1} / {questions.length}
              </span>
            </div>

            {/* Question */}
            <div className="glass-card p-8 rounded-none border border-[var(--color-glass-border)]">
              <h3 className="text-xl font-medium mb-6 font-serif">{questions[currentQ].question}</h3>
              <div className="flex flex-col gap-3">
                {questions[currentQ].options.map((opt, idx) => {
                  let stateClass = "border-[var(--color-glass-border)] hover:bg-white/5";
                  if (isAnswered) {
                    if (idx === questions[currentQ].correct) {
                      stateClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100";
                    } else if (idx === selected) {
                      stateClass = "bg-rose-500/20 border-rose-500/50 text-rose-100";
                    } else {
                      stateClass = "opacity-50 border-white/5";
                    }
                  } else if (idx === selected) {
                    stateClass = "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`flex items-center justify-between p-4 rounded-none border text-left transition-all duration-300 ${stateClass}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === questions[currentQ].correct && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswered && idx === selected && idx !== questions[currentQ].correct && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] px-6 py-2.5 rounded-none font-semibold uppercase tracking-widest hover:opacity-90 transition-colors"
                >
                  {currentQ < questions.length - 1 ? "Next Question" : "View Results"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center flex-1 text-center"
          >
            <div className="w-24 h-24 rounded-full border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(229,169,59,0.2)]">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">{Math.round((score / questions.length) * 100)}%</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-serif">Quiz Complete!</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">You answered {score} out of {questions.length} questions correctly.</p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-none border border-[var(--color-glass-border)] hover:bg-white/5 transition-all font-semibold uppercase tracking-widest"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
