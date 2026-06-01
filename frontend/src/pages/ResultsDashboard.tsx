import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, RotateCw, Filter, Shield, Info, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/CandidateCard";
import { Candidate } from "../data/mockCandidates";
import { X } from "lucide-react";

const STATIC_MOCK_DATA: any[] = [
  {
    id: "cand-1",
    name: "Aisha Khan",
    current_role: "AI Researcher at IIT Bombay",
    scores: { overall_score: 91 },
    final_recommendation: {
      verdict: "strong_hire",
      one_liner: "Rare combination of research depth and production readiness.",
      next_action: "Schedule technical interview immediately"
    },
    strengths: [
      { title: "Research Pedigree", description: "Published NLP paper, IIT Bombay ML lab" },
      { title: "Full-Stack AI", description: "Built and deployed models end-to-end" }
    ],
    concerns: [
      { title: "Limited industry exposure", severity: "low" }
    ],
    interview_questions: {
      technical: ["Walk me through your published research.", "How would you scale your model to 10M users?"],
      behavioral: ["How do you handle ambiguous problem statements?", "Describe a failed experiment and what you learned."]
    }
  },
  {
    id: "cand-2",
    name: "Priya Sharma",
    current_role: "ML Engineer at Flipkart",
    scores: { overall_score: 87 },
    final_recommendation: {
      verdict: "strong_hire",
      one_liner: "Exceptional NLP background with production-scale deployment experience.",
      next_action: "Schedule technical interview immediately"
    },
    strengths: [
      { title: "NLP Expertise", description: "3 years production NLP, BERT fine-tuning at scale" },
      { title: "Ownership Mindset", description: "Led end-to-end model deployment with zero downtime" }
    ],
    concerns: [
      { title: "No leadership experience", severity: "low" },
      { title: "Limited system design exposure", severity: "medium" }
    ],
    interview_questions: {
      technical: ["Describe your largest model deployment pipeline.", "How do you handle data drift in production?"],
      behavioral: ["Tell me about a time you disagreed with your team.", "How do you prioritize when deadlines conflict?"]
    }
  },
  {
    id: "cand-3",
    name: "Dev Patel",
    current_role: "Backend Engineer at Razorpay",
    scores: { overall_score: 45 },
    final_recommendation: {
      verdict: "no_hire",
      one_liner: "Strong backend skills but insufficient ML depth for this role.",
      next_action: "Send rejection with feedback on ML skill gaps"
    },
    strengths: [
      { title: "System Design", description: "Designed high-throughput payment APIs at scale" }
    ],
    concerns: [
      { title: "No ML/AI experience", severity: "high" },
      { title: "No Python proficiency demonstrated", severity: "high" }
    ],
    interview_questions: {
      technical: ["Have you worked with any ML frameworks?", "How would you approach learning NLP?"],
      behavioral: ["Why are you transitioning to AI roles?"]
    }
  }
];

export default function ResultsDashboard() {
  // Retain the JD title from storage
  const [jdTitle, setJdTitle] = useState("Senior Machine Learning Engineer");
  const [jdCompany, setJdCompany] = useState("Flipkart");
  const [scoreThreshold, setScoreThreshold] = useState(60);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showMockBanner, setShowMockBanner] = useState(false);

  useEffect(() => {
    const title = localStorage.getItem("active_jd_title");
    const company = localStorage.getItem("active_jd_company");
    if (title) setJdTitle(title);
    if (company) setJdCompany(company);

    const stored = localStorage.getItem("recruiteriq_results");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const incoming = Array.isArray(parsed?.candidates) ? parsed.candidates : [];
        if (incoming.length > 0) {
          const normalized = incoming.map((cand: Candidate, index: number) => ({
            ...cand,
            id: cand.id || `cand-${index + 1}`
          }));
          setCandidates(normalized);
          return;
        }
      } catch {
        // Do nothing on parse failure
      }
    }
    
    // Fallback to static mock data
    setCandidates(STATIC_MOCK_DATA);
    setShowMockBanner(true);
  }, []);

  // Filter & sort candidates by score descending
  const filteredCandidates = candidates.filter((c) => c.scores.overall_score >= scoreThreshold);
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.scores.overall_score - a.scores.overall_score);

  // Stats
  const totalOriginalCount = candidates.length;
  const passedCount = filteredCandidates.length;

  return (
    <div className="min-h-screen bg-white text-[#202124] relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background grids and decorations */}
      <div className="absolute top-[30%] left-[-40px] w-32 h-32 rounded-full bg-[#FBBC04]/10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-40px] w-48 h-48 rounded-full bg-[#34A853]/10 pointer-events-none" />

      {/* NAVBAR */}
      <Navbar />

      {/* Mock Data Banner */}
      <AnimatePresence>
        {showMockBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[80px] right-6 z-50 max-w-[320px] bg-white border border-[#FBBC04] rounded-xl flex shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            <div className="w-1 bg-[#FBBC04] shrink-0" />
            <div className="p-3 pl-4 pr-3 flex-grow flex flex-col gap-1 relative">
              <div className="flex items-start justify-between gap-4">
                <span className="font-bold text-[13px] text-[#202124]">✦ Sample Results</span>
                <button 
                  onClick={() => setShowMockBanner(false)}
                  className="text-gray-400 hover:bg-black/5 rounded-full p-0.5 transition-colors shrink-0"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[12px] text-[#5F6368] leading-snug pr-2">
                Upload resumes in Upload Studio to see real candidate analysis.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Workspace Panel */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex-grow">
        
        {/* HEADER AREA */}
        <div className="border-3 border-[#202124] bg-[#F8F9FA] rounded-3xl p-4 sm:p-8 relative mb-8 overflow-hidden">
          
          {/* Decorative large ✦ top right */}
          <div className="absolute top-4 right-6 text-4xl sm:text-6xl text-[#FBBC04] uppercase font-bold tracking-widest select-none opacity-20 sm:opacity-100 pointer-events-none animate-bounce">
            ✦
          </div>

          <div className="flex flex-col gap-3 relative z-10 w-full">
            <span className="text-xs uppercase font-mono tracking-widest text-[#5F6368] font-black">
              ✦ GDG HACKATHON LIVE LEADERBOARD
            </span>
            
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-[#4285F4] leading-tight">
                {jdTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-[#5F6368]">
                <span>{totalOriginalCount} candidates analyzed</span>
                <span className="text-[#E8EAED] hidden sm:inline">|</span>
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-mono font-bold bg-[#FBBC04]/20 text-[#202124] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#FBBC04]/40 uppercase tracking-widest">
                  2.4s Time Badge
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5F6368] font-serif mt-1">
              Currently evaluating dossier against specifications published for <span className="font-sans font-bold text-[#202124]">{jdCompany}</span>.
            </p>
          </div>
        </div>

        {/* CONTROLS ROW */}
        <div className="bg-[#F8F9FA] border-2 border-[#E8EAED] rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label + slider input */}
          <div className="w-full md:w-3/5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-[#4285F4]" />
              <span className="text-sm font-bold text-[#202124] font-sans">
                Showing candidates above: <span className="font-mono text-[#4285F4] font-black">{scoreThreshold}</span>
              </span>
            </div>

            <div className="flex-grow flex items-center gap-3">
              <span className="text-xs font-mono text-[#5F6368]">0</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={scoreThreshold}
                onChange={(e) => setScoreThreshold(Number(e.target.value))}
                className="w-full h-2 bg-[#E8EAED] rounded-lg appearance-none cursor-pointer accent-[#4285F4] border border-[#202124]/10"
              />
              <span className="text-xs font-mono text-[#5F6368]">100</span>
            </div>
          </div>

          {/* Quick Filter Info Tag and Reseed action */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#E8EAED] pt-3 md:pt-0">
            <span className="text-xs text-[#5F6368] font-mono">
              Passed: <span className="font-bold text-[#34A853]">{passedCount}/{totalOriginalCount}</span>
            </span>

            <Link 
              to="/upload" 
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#4285F4] hover:text-[#3b78dd] flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" /> Re-upload Dossier
            </Link>
          </div>

        </div>

        {/* CANDIDATE ROW CARDS WITH STAGGERED ENTRANCES */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {candidates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-16 border-3 border-dashed border-[#E8EAED] rounded-3xl text-center flex flex-col items-center justify-center bg-[#F8F9FA]"
              >
                <Info className="w-12 h-12 text-[#FBBC04] mb-3 animate-pulse" />
                <h3 className="text-lg font-extrabold text-[#202124] tracking-tight">
                  No results yet
                </h3>
                <p className="text-xs text-[#5F6368] max-w-sm mt-1 mb-6">
                  Upload a JD and resumes in Upload Studio to see ranked candidates
                </p>
                <Link
                  to="/upload"
                  className="px-6 py-2.5 bg-[#4285F4] hover:bg-[#3b78dd] text-white text-xs font-bold font-sans uppercase tracking-widest border-2 border-[#202124] rounded-full transition-all"
                >
                  Go to Upload Studio →
                </Link>
              </motion.div>
            ) : sortedCandidates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-16 border-3 border-dashed border-[#E8EAED] rounded-3xl text-center flex flex-col items-center justify-center bg-[#F8F9FA]"
              >
                <Info className="w-12 h-12 text-[#FBBC04] mb-3 animate-pulse" />
                <h3 className="text-lg font-extrabold text-[#202124] tracking-tight">
                  No Candidates Passed Score Filter
                </h3>
                <p className="text-xs text-[#5F6368] max-w-sm mt-1 mb-6">
                  Adjust the threshold slider left to review alternative resume profiles or lower criteria bounds.
                </p>
                <button
                  onClick={() => setScoreThreshold(0)}
                  className="px-6 py-2.5 bg-[#4285F4] hover:bg-[#3b78dd] text-white text-xs font-bold font-sans uppercase tracking-widest border-2 border-[#202124] rounded-full transition-all"
                >
                  Show All Candidates
                </button>
              </motion.div>
            ) : (
              sortedCandidates.map((cand, index) => {
                const globalRankNum = candidates.findIndex(c => c.id === cand.id) + 1;

                return (
                  <CandidateCard
                    key={cand.id}
                    id={cand.id}
                    name={cand.name}
                    role={cand.current_role}
                    score={cand.scores.overall_score}
                    verdict={cand.final_recommendation.verdict}
                    oneLiner={cand.final_recommendation.one_liner}
                    rankIndex={globalRankNum}
                    onViewDetails={() => localStorage.setItem("recruiteriq_selected_candidate", JSON.stringify(cand))}
                  />
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Bottom System indicators */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] text-[#5F6368] font-mono border-t border-[#E8EAED] pt-4 justify-between">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#34A853]" /> Secured Sandboxed Evaluation Pipelines
          </span>
          <span>Google GDG Platform Entry 2026</span>
        </div>

      </main>

      {/* Standard Footer */}
      <footer className="bg-[#F8F9FA] py-6 text-center border-t border-[#E8EAED] text-xs text-[#5F6368] font-mono mt-12">
        <p>© 2026 Recruit IQ. Built with Gemini Flash for GDG Hackathon.</p>
      </footer>

    </div>
  );
}