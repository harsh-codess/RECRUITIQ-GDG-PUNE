import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, RotateCw, Filter, Shield, Info, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/CandidateCard";
import { MOCK_CANDIDATES } from "../data/mockCandidates";

export default function ResultsDashboard() {
  // Retain the JD title from storage
  const [jdTitle, setJdTitle] = useState("Senior Machine Learning Engineer");
  const [jdCompany, setJdCompany] = useState("Flipkart");
  const [scoreThreshold, setScoreThreshold] = useState(60); // Default threshold parameter in instructions is 60

  useEffect(() => {
    const title = localStorage.getItem("active_jd_title");
    const company = localStorage.getItem("active_jd_company");
    if (title) setJdTitle(title);
    if (company) setJdCompany(company);
  }, []);

  // Filter & sort candidates by score descending
  const filteredCandidates = MOCK_CANDIDATES.filter((c) => c.scores.overall_score >= scoreThreshold);
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.scores.overall_score - a.scores.overall_score);

  // Stats
  const totalOriginalCount = MOCK_CANDIDATES.length;
  const passedCount = filteredCandidates.length;

  return (
    <div className="min-h-screen bg-white text-[#202124] relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background grids and decorations */}
      <div className="absolute top-[30%] left-[-40px] w-32 h-32 rounded-full bg-[#FBBC04]/10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-40px] w-48 h-48 rounded-full bg-[#34A853]/10 pointer-events-none" />

      {/* NAVBAR */}
      <Navbar />

      {/* Results Workspace Panel */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex-grow">
        
        {/* HEADER AREA */}
        <div className="border-3 border-[#202124] bg-[#F8F9FA] rounded-3xl p-6 md:p-8 relative mb-8 overflow-hidden">
          
          {/* Decorative large ✦ top right */}
          <div className="absolute top-4 right-6 text-6xl text-[#FBBC04] uppercase font-bold tracking-widest select-none select-none animate-bounce">
            ✦
          </div>

          <div className="flex flex-col gap-3 relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#5F6368] font-black">
              ✦ GDG HACKATHON LIVE LEADERBOARD
            </span>
            
            {/* Exactly: Role title in bold Blue | X candidates analyzed | 2.4s time badge */}
            <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight leading-none text-[#202124]">
              <span className="text-[#4285F4]">{jdTitle}</span>{" "}
              <span className="text-lg sm:text-2xl font-serif text-[#5F6368] font-normal mx-2 md:mx-3">|</span>{" "}
              <span className="text-sm sm:text-lg font-mono text-[#5F6368] font-normal">
                {totalOriginalCount} candidates analyzed
              </span>{" "}
              <span className="text-lg font-serif text-[#5F6368] font-normal mx-1">|</span>{" "}
              <span className="inline-flex items-center text-[11px] font-mono font-bold bg-[#FBBC04]/20 text-[#202124] px-2.5 py-1 rounded border border-[#FBBC04]/40 uppercase tracking-widest">
                2.4s Time Badge
              </span>
            </h1>

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
            {sortedCandidates.length === 0 ? (
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
                // Determine the logical ranking rank number based on overall sorted position in MOCK_CANDIDATES
                const globalRankNum = MOCK_CANDIDATES.findIndex(c => c.id === cand.id) + 1;

                return (
                  <CandidateCard
                    key={cand.id}
                    id={cand.id}
                    name={cand.name}
                    role={cand.current_role}
                    score={cand.scores.overall_score}
                    verdict={cand.final_recommendation.verdict}
                    oneLiner={cand.final_recommendation.one_liner}
                    rankIndex={globalRankNum} // Maps nicely to formatted global index
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
