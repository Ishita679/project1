import ReactMarkdown from "react-markdown";

export default function SummaryTab({ data }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-[var(--color-text-primary)]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-glass-border)]">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-gold)]/20 flex items-center justify-center text-[var(--color-accent-gold)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold m-0 font-serif text-[var(--color-text-primary)]">AI Generated Summary</h2>
          <p className="text-sm text-[var(--color-text-secondary)] m-0">A concise overview of the main topics covered in the video.</p>
        </div>
      </div>
      <ReactMarkdown>{data || "No summary available."}</ReactMarkdown>
    </div>
  );
}
