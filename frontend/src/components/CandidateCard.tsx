import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScoreBadge, { VerdictBadge, VerdictType } from "./ScoreBadge";

interface CandidateCardProps {
  id: string;
  name: string;
  role: string;
  score: number;
  verdict: VerdictType;
  oneLiner: string;
  rankIndex: number;
  key?: string | number;
}

export default function CandidateCard({ id, name, role, score, verdict, oneLiner, rankIndex }: CandidateCardProps) {
  // Rank index displayed as two-digit padded number e.g. #01, #02
  const formattedRank = String(rankIndex).padStart(2, "0");

  const isStrongNoHire = verdict === "strong_no_hire";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: rankIndex * 0.05 
      }}
      className="p-5 md:p-6 bg-white border-2 border-[#E8EAED] rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all duration-300 hover:border-[#4285F4] hover:shadow-lg relative overflow-hidden"
    >
      {/* Absolute miniature top accent marker */}
      <div className="absolute top-0 left-0 w-12 h-1 bg-[#4285F4]" />

      <div className="flex items-start md:items-center gap-4 min-w-0 flex-grow">
        
        {/* Large Bold Muted Gray rank identifier */}
        <div className="font-mono text-2xl md:text-3xl font-black text-[#5F6368]/30 tracking-tight shrink-0 mt-0.5 md:mt-0">
          #{formattedRank}
        </div>

        {/* Candidate metadata bio */}
        <div className="min-w-0 flex-grow">
          <h3 className={`text-lg font-extrabold text-[#202124] tracking-tight leading-snug ${isStrongNoHire ? "line-through text-gray-400" : ""}`}>
            {name}
          </h3>
          <p className="text-sm font-medium text-[#5F6368] mt-0.5 truncate">
            {role}
          </p>
          <p className="text-[13px] italic text-[#5F6368] mt-1.5 font-serif leading-relaxed">
            "{oneLiner}"
          </p>
        </div>
      </div>

      {/* Row Right controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8EAED] shrink-0">
        
        {/* Scoring and Verdict pill stacked alignment */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
          <VerdictBadge verdict={verdict} />
          <ScoreBadge score={score} showIcon={false} />
        </div>

        {/* Action Trigger */}
        <Link 
          to={`/candidate/${id}`}
          className="px-4 py-2 border-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white rounded-full text-xs font-bold font-sans uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 self-stretch sm:self-auto text-center justify-center"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </motion.div>
  );
}
