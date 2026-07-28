import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  BookOpen, 
  List, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Network
} from "lucide-react";
import SummaryTab from "./SummaryTab";
import NotesTab from "./NotesTab";
import ChaptersTab from "./ChaptersTab";
import HighlightsTab from "./HighlightsTab";
import QuizTab from "./QuizTab";
import FlashcardsTab from "./FlashcardsTab";
import MindMapTab from "./MindMapTab";

const tabs = [
  { id: "summary", label: "Summary", icon: FileText, component: SummaryTab },
  { id: "notes", label: "Notes", icon: BookOpen, component: NotesTab },
  { id: "chapters", label: "Chapters", icon: List, component: ChaptersTab },
  { id: "highlights", label: "Highlights", icon: Sparkles, component: HighlightsTab },
  { id: "quiz", label: "Quiz", icon: HelpCircle, component: QuizTab },
  { id: "flashcards", label: "Flashcards", icon: Layers, component: FlashcardsTab },
  { id: "mindMap", label: "Mind Map", icon: Network, component: MindMapTab },
];

export default function AITabs({ videoData = {} }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabConfig = tabs.find((t) => t.id === activeTab) || tabs[0];
  const ActiveComponent = activeTabConfig.component;
  const tabData = videoData[activeTabConfig.id];

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Navigation */}
      <div className="glass-card p-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center min-w-max gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-4 h-4 relative z-10 ${isActive ? "text-[var(--color-accent-gold)]" : ""}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="glass-card min-h-[500px] p-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--color-accent-gold)] blur-[100px] opacity-10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="relative z-10 h-full"
          >
            <ActiveComponent data={tabData} videoData={videoData} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
