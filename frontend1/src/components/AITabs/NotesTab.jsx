import ReactMarkdown from "react-markdown";
import { Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function NotesTab({ data }) {
  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(data);
    toast.success("Notes copied to clipboard!", {
      style: {
        background: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-glass-border)'
      }
    });
  };

  return (
    <div className="flex flex-col h-full text-[var(--color-text-primary)]">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-glass-border)]">
        <div>
          <h2 className="text-xl font-semibold m-0 font-serif text-[var(--color-text-primary)]">Structured Notes</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Detailed breakdown with code snippets.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleCopy} className="p-2 rounded-none bg-white/5 hover:bg-[var(--color-accent-gold)]/20 text-[var(--color-text-primary)] transition-colors flex items-center gap-2 text-sm border border-[var(--color-glass-border)]">
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
          <button className="p-2 rounded-none bg-white/5 hover:bg-[var(--color-accent-gold)]/20 text-[var(--color-text-primary)] transition-colors flex items-center gap-2 text-sm border border-[var(--color-glass-border)]">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="prose prose-invert max-w-none overflow-y-auto custom-scrollbar flex-1 pr-4">
        <ReactMarkdown>{data || "No notes available."}</ReactMarkdown>
      </div>
    </div>
  );
}
