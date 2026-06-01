import { Star } from "lucide-react";

export type VerdictType = "strong_hire" | "hire" | "maybe" | "no_hire" | "strong_no_hire";

export interface VerdictBadgeProps {
  verdict: VerdictType;
  large?: boolean;
}

export function VerdictBadge({ verdict, large = false }: VerdictBadgeProps) {
  let bgClass = "";
  let textLabel = "";

  switch (verdict) {
    case "strong_hire":
      bgClass = "bg-[#34A853] text-white border-[#34A853]";
      textLabel = "Strong Hire";
      break;
    case "hire":
      bgClass = "bg-[#4285F4] text-white border-[#4285F4]";
      textLabel = "Hire";
      break;
    case "maybe":
      bgClass = "bg-[#FBBC04] text-[#202124] border-[#FBBC04]";
      textLabel = "Maybe";
      break;
    case "no_hire":
      bgClass = "bg-[#EA4335] text-white border-[#EA4335]";
      textLabel = "No Hire";
      break;
    case "strong_no_hire":
      bgClass = "bg-[#EA4335] text-white border-[#EA4335]";
      textLabel = "Strong No";
      break;
    default:
      bgClass = "bg-gray-200 text-gray-700 border-gray-200";
      textLabel = verdict;
  }

  const sizeClasses = large ? "px-6 py-2.5 text-sm" : "px-3.5 py-1 text-xs";

  return (
    <div className={`inline-flex items-center justify-center gap-1.5 rounded-full border-2 font-sans font-bold uppercase tracking-wider shadow-xs ${bgClass} ${sizeClasses}`}>
      <span>{textLabel}</span>
    </div>
  );
}

interface ScoreBadgeProps {
  score: number;
  showIcon?: boolean;
}

export default function ScoreBadge({ score, showIcon = true }: ScoreBadgeProps) {
  let bgClass = "bg-[#34A853] text-white"; // 80-100 -> Green
  let borderClass = "border-[#34A853]";
  let labelText = "High Match";

  if (score >= 50 && score < 80) {
    bgClass = "bg-[#FBBC04] text-[#202124]"; // 50-79 -> Yellow
    borderClass = "border-[#FBBC04]";
    labelText = "Core Fit";
  } else if (score < 50) {
    bgClass = "bg-[#EA4335] text-white"; // 0-49 -> Red
    borderClass = "border-[#EA4335]";
    labelText = "Low Alignment";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-mono text-xs font-bold uppercase tracking-wider shadow-sm ${bgClass} ${borderClass}`}>
      {showIcon && <Star className="w-3.5 h-3.5 fill-current animate-pulse shrink-0" />}
      <span>{score}%  ({labelText})</span>
    </div>
  );
}