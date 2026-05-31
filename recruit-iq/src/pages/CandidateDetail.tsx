import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Copy, Check, ShieldAlert, CheckCircle2, HelpCircle, ChevronLeft, ChevronRight 
} from "lucide-react";
import Navbar from "../components/Navbar";
import ScoreDonut from "../components/ScoreDonut";
import { VerdictBadge } from "../components/ScoreBadge";
import { MOCK_CANDIDATES } from "../data/mockCandidates";

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidates] = useState<any[]>(() => {
    const stored = localStorage.getItem("ranked_candidates");
    return stored ? JSON.parse(stored) : MOCK_CANDIDATES;
  });

  const currentIndex = candidates.findIndex((c) => c.id === id);
  const candidate = candidates[currentIndex];

  // Tab State: 'technical' or 'behavioral'
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');

  // UI state feedback
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Scroll on view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-white text-[#202124] flex flex-col justify-between font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md p-8 text-center bg-[#F8F9FA] border-2 border-[#EA4335]/30 rounded-3xl">
            <ShieldAlert className="w-12 h-12 text-[#EA4335] mx-auto mb-4" />
            <h2 className="text-2xl font-black text-[#202124] tracking-tight">Profile Reference Unavailable</h2>
            <p className="text-xs text-[#5F6368] mt-2 mb-6 leading-relaxed">
              The targeted candidate segment was not recovered in active buffer datasets. Please return to the results portal or upload new dossier contents.
            </p>
            <Link 
              to="/results" 
              className="px-6 py-3 bg-[#4285F4] hover:bg-[#3b78dd] text-white text-xs font-bold font-sans uppercase tracking-widest rounded-full border-2 border-[#202124]"
            >
              Back to Results Leaderboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Next and Previous indexes
  const prevCandidate = currentIndex > 0 ? candidates[currentIndex - 1] : null;
  const nextCandidate = currentIndex < candidates.length - 1 ? candidates[currentIndex + 1] : null;

  // Question copy mechanics
  const handleCopyQuestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAllQuestions = () => {
    const questionsList = activeTab === "technical" 
      ? candidate.interview_questions.technical 
      : candidate.interview_questions.behavioral;

    const listString = questionsList
      .map((q, i) => `${i + 1}. ${q}`)
      .join("\n\n");
    
    navigator.clipboard.writeText(listString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const isStrongNoHire = candidate.final_recommendation.verdict === "strong_no_hire";

  return (
    <div className="min-h-screen bg-white text-[#202124] relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Upper mesh styling glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#4285F4]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-[#FBBC04]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <Navbar />

      {/* Active profile detail dashboard */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex-grow">
        
        {/* Back Link Row - Muted, hover Blue */}
        <div className="mb-8">
          <Link
            to="/results"
            className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold text-[#5F6368] hover:text-[#4285F4] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Results Dashboard</span>
          </Link>
        </div>

        {/* TWO-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* LEFT COLUMN: Name, role, Score donut circle, quick biography */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Biography Profile block card */}
            <div className="bg-[#F8F9FA] border-2 border-[#E8EAED] rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[#FBBC04] text-lg">✦</div>
              
              <span className="text-[10px] uppercase font-mono text-[#5F6368] font-bold block mb-1">
                ✦ Candidate Profile Info
              </span>

              {/* Candidate name — 48px bold */}
              <h1 className={`text-3xl md:text-[48px] font-sans font-black tracking-tight leading-none text-[#202124] ${isStrongNoHire ? "line-through text-gray-400" : ""}`}>
                {candidate.name}
              </h1>

              {/* Current role — muted */}
              <p className="text-base font-serif text-[#5F6368] mt-1.5 font-medium">
                {candidate.current_role}
              </p>
            </div>

            {/* Score Ring indicator card container */}
            <div className="bg-[#F8F9FA] border-2 border-[#E8EAED] rounded-3xl p-6 flex flex-col items-center justify-center gap-4">
              <ScoreDonut score={candidate.scores.overall_score} />
              
              <div className="w-full border-t border-[#E8EAED] pt-4 flex flex-col items-center gap-3.5 text-center">
                <VerdictBadge verdict={candidate.final_recommendation.verdict} large={true} />
                
                <p className="text-base italic font-serif leading-relaxed text-[#5F6368] px-4">
                  "{candidate.final_recommendation.one_liner}"
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Strengths, Concerns, suggested interview questions numbered list */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6 w-full">
            
            {/* 1. STRENGTHS (Green border left, bold label, description below) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-mono tracking-widest font-black text-[#34A853] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 font-bold" /> STRENGTHS
              </h3>

              <div className="flex flex-col gap-3">
                {candidate.strengths.map((strength, sIdx) => (
                  <div 
                    key={sIdx}
                    className="border-2 border-l-4 border-l-[#34A853] border-[#E8EAED] bg-white p-4 rounded-xl flex flex-col"
                  >
                    <span className="font-bold text-[#202124] text-sm">
                      {strength.title}
                    </span>
                    <span className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                      {strength.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CONCERNS (Yellow border left, severity badges) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-mono tracking-widest font-black text-[#FBBC04] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 font-bold" /> CONCERNS
              </h3>

              <div className="flex flex-col gap-3">
                {candidate.concerns.map((concern, cIdx) => {
                  let badgeBgColor = "";
                  switch (concern.severity) {
                    case "low":
                      badgeBgColor = "bg-[#34A853]/10 text-[#34A853] border-[#34A853]/20";
                      break;
                    case "medium":
                      badgeBgColor = "bg-[#FBBC04]/10 text-[#8F6B00] border-[#FBBC04]/20";
                      break;
                    case "high":
                      badgeBgColor = "bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/20";
                      break;
                  }

                  return (
                    <div 
                      key={cIdx}
                      className="border-2 border-l-4 border-l-[#FBBC04] border-[#E8EAED] bg-white p-4 rounded-xl flex items-center justify-between gap-4"
                    >
                      <span className="font-bold text-sm text-[#202124]">
                        {concern.title}
                      </span>
                      <span className={`px-3 py-1 text-[10px] font-mono tracking-wider font-bold border rounded-full uppercase shrink-0 ${badgeBgColor}`}>
                        {concern.severity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. SUGGESTED INTERVIEW QUESTIONS - Tabbed */}
            <div className="bg-[#F8F9FA] border-2 border-[#E8EAED] rounded-3xl p-6 flex flex-col gap-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8EAED] pb-3">
                <h3 className="text-xs uppercase font-mono tracking-widest font-black text-[#202124] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#4285F4]" /> INTERVIEW QUESTIONS
                </h3>

                <button
                  type="button"
                  onClick={handleCopyAllQuestions}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285F4] hover:text-[#3b78dd] flex items-center gap-1 self-start sm:self-auto"
                >
                  {copiedAll ? "Copied list!" : "Copy Tab List"}
                </button>
              </div>

              {/* TWO TABS (Google Blue underline on active tab) */}
              <div className="flex border-b border-[#E8EAED]">
                <button
                  type="button"
                  onClick={() => setActiveTab("technical")}
                  className={`flex-grow sm:flex-initial px-6 py-2.5 text-xs font-bold font-sans uppercase tracking-wider relative transition-colors duration-200 ${
                    activeTab === "technical" ? "text-[#4285F4]" : "text-[#5F6368] hover:text-[#202124]"
                  }`}
                >
                  Technical Questions
                  {activeTab === "technical" && (
                    <motion.div 
                      layoutId="activeTabOutline" 
                      className="absolute bottom-0 inset-x-0 h-[3px] bg-[#4285F4]" 
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("behavioral")}
                  className={`flex-grow sm:flex-initial px-6 py-2.5 text-xs font-bold font-sans uppercase tracking-wider relative transition-colors duration-200 ${
                    activeTab === "behavioral" ? "text-[#4285F4]" : "text-[#5F6368] hover:text-[#202124]"
                  }`}
                >
                  Behavioral Questions
                  {activeTab === "behavioral" && (
                    <motion.div 
                      layoutId="activeTabOutline" 
                      className="absolute bottom-0 inset-x-0 h-[3px] bg-[#4285F4]" 
                    />
                  )}
                </button>
              </div>

              {/* Tab list rendering */}
              <div className="min-h-[140px] flex flex-col gap-3 mt-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3"
                  >
                    {(activeTab === "technical"
                      ? candidate.interview_questions.technical
                      : candidate.interview_questions.behavioral
                    ).map((question, qIdx) => (
                      <div 
                        key={qIdx}
                        className="p-4 bg-white border border-[#E8EAED] hover:border-[#202124] rounded-2xl flex items-start gap-4 justify-between transition-colors duration-200"
                      >
                        <div className="flex gap-3">
                          <span className="font-mono text-sm font-bold text-[#5F6368]">
                            {(qIdx + 1).toString().padStart(2, "0")}
                          </span>
                          <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#202124]">
                            {question}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyQuestion(question, qIdx)}
                          className="text-gray-400 hover:text-[#4285F4] p-1.5 hover:bg-[#F8F9FA] rounded-md transition-all shrink-0 cursor-pointer"
                          title="Copy question text"
                        >
                          {copiedIndex === qIdx ? (
                            <Check className="w-4 h-4 text-[#34A853]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <span className="text-[9px] font-mono font-bold text-[#5F6368] mt-2 block uppercase tracking-widest">
                ✦ Always ground evaluation contexts manually
              </span>

            </div>

          </div>

        </div>

        {/* BOTTOM: Full Width Action Bar next action button + previous/next */}
        <div className="mt-8 flex flex-col gap-6">
          
          <button
            type="button"
            className="w-full bg-[#4285F4] hover:bg-[#3b78dd] text-white py-4 px-6 rounded-2xl border-2 border-[#202124] text-sm font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center shadow-md active:scale-[0.99] cursor-pointer"
          >
            {candidate.final_recommendation.next_action}
          </button>

          <div className="pt-6 border-t border-[#E8EAED] flex items-center justify-between gap-4">
            {/* Previous item button */}
            <div>
              {prevCandidate ? (
                <button
                  type="button"
                  onClick={() => navigate(`/candidate/${prevCandidate.id}`)}
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider px-5 py-3 bg-white border-2 border-[#E8EAED] hover:border-[#202124] rounded-full transition-all text-[#202124] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>← Previous Candidate</span>
                </button>
              ) : (
                <div className="text-xs font-mono text-gray-400 select-none px-4 py-2">
                  First Candidate reached
                </div>
              )}
            </div>

            {/* Next item button */}
            <div>
              {nextCandidate ? (
                <button
                  type="button"
                  onClick={() => navigate(`/candidate/${nextCandidate.id}`)}
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider px-5 py-3 bg-white border-2 border-[#E8EAED] hover:border-[#202124] rounded-full transition-all text-[#202124] cursor-pointer"
                >
                  <span>Next Candidate →</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-mono text-gray-400 select-none px-4 py-2">
                  Last Candidate reached
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* Real-time Toast Copied notification overlays */}
      <AnimatePresence>
        {(copiedIndex !== null || copiedAll) && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-[#202124] text-white text-xs rounded-full shadow-lg flex items-center gap-2 font-sans font-bold"
          >
            <Check className="w-4 h-4 text-[#34A853]" />
            <span>{copiedAll ? "Copied all drills to Clipboard!" : "Suggested drill copied to Clipboard!"}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standard Footer */}
      <footer className="bg-[#F8F9FA] py-6 text-center border-t border-[#E8EAED] text-xs text-[#5F6368] font-mono mt-12">
        <p>© 2026 Recruit IQ. GDG Hackathon Showcase Submission.</p>
      </footer>

    </div>
  );
}
