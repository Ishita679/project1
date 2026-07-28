import { motion } from "framer-motion";

const items = [
  "LECTURES", "TALKS", "TUTORIALS", "PODCASTS", "COURSES", 
  "KEYNOTES", "REVIEWS", "INTERVIEWS", "DEMOS"
];

export default function Marquee() {
  return (
    <div className="w-full bg-[#111] border-b border-[#2a2a2a] py-2 overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e53935] mr-3" />
            <span className="text-[#e53935] text-[10px] font-bold tracking-[0.2em] uppercase">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
