import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Layers, FileText, CheckCircle2, RotateCw } from "lucide-react";
import Navbar from "../components/Navbar";
import FileUploadZone from "../components/FileUploadZone";
import { SAMPLE_JDS, SampleJD } from "../data/mockCandidates";

export default function UploadStudio() {
  const navigate = useNavigate();

  // JD states
  const [jdText, setJdText] = useState("");
  const [activeJDTitle, setActiveJDTitle] = useState<string | null>(null);
  const [roleTitle, setRoleTitle] = useState("");
  const [company, setCompany] = useState("");

  // Resume states
  const [resumes, setResumes] = useState<{ id: string; name: string; size: string; file: File }[]>([]);

  // Loading analysis sequence
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [progressWidth, setProgressWidth] = useState("0%");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectSample = (sample: SampleJD) => {
    setJdText(sample.text);
    setActiveJDTitle(sample.title);
    setRoleTitle(sample.title);
    setCompany(sample.company);
    
    // Persist active settings
    localStorage.setItem("active_jd_title", sample.title);
    localStorage.setItem("active_jd_company", sample.company);
  };

  const handleAddFiles = (newFiles: { id: string; name: string; size: string }[]) => {
    setResumes((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAnalyze = async () => {
    if (!jdText.trim() || resumes.length === 0) return;

    setErrorMessage("");

    // Cache the job specification
    localStorage.setItem("jd_configured", jdText);
    if (!localStorage.getItem("active_jd_title")) {
      localStorage.setItem("active_jd_title", "Custom Evaluation Spec");
      localStorage.setItem("active_jd_company", "Custom Client");
    }

    setIsAnalyzing(true);
    setCurrentMessage("Uploading resumes to Gemini...");
    setProgressWidth("0%");
    
    // Animate progress bar from 0% to 100% over 3.5s using CSS transition
    setTimeout(() => {
      setProgressWidth("100%");
    }, 50);

    const messageTimers: number[] = [];

    messageTimers.push(
      window.setTimeout(() => {
        setCurrentMessage("Extracting job requirements...");
      }, 1000)
    );

    messageTimers.push(
      window.setTimeout(() => {
        setCurrentMessage("Analyzing candidate profiles...");
      }, 2000)
    );

    messageTimers.push(
      window.setTimeout(() => {
        setCurrentMessage("Ranking by fit score...");
      }, 3000)
    );

    try {
      const formData = new FormData();
      formData.append("jd_text", jdText);
      formData.append("role_title", roleTitle || "Custom Evaluation Spec");
      formData.append("company", company || "Custom Client");
      resumes.forEach((resume) => formData.append("resumes", resume.file));

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const raw = await response.text();
        throw new Error(raw || "Failed to analyze candidates");
      }

      const data = await response.json();
      localStorage.setItem("recruiteriq_results", JSON.stringify(data));
      navigate("/results");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(message);
      setIsAnalyzing(false);
      setProgressWidth("0%");
    } finally {
      messageTimers.forEach((timer) => window.clearTimeout(timer));
    }
  };

  const isFormValid = jdText.trim().length > 0 && resumes.length > 0;

  return (
    <div className="min-h-screen bg-white text-[#202124] relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Upper background glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#4285F4]/5 to-transparent pointer-events-none z-0" />

      {/* FIXED NAVIGATION */}
      <Navbar />

      {/* Studio main wrapper */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex-grow">
        
        <motion.div
          key="studio-forms"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex flex-col gap-8"
        >
          
          {/* Header block with 64px bold Blue indicator */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8EAED] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[#FBBC04] text-2xl animate-spin shrink-0">✦</span>
                <span className="text-xs uppercase font-mono tracking-widest text-[#5F6368] font-bold">
                  GDG Hackathon Evaluation
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight text-[#4285F4]">
                Upload Studio
              </h1>
            </div>

            {/* Counter progress */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <span className="text-[10px] uppercase font-mono text-[#5F6368] font-bold block">
                  Evaluation Steps
                </span>
                <span className="text-xs font-bold text-[#202124]">
                  Configure parameters and candidates
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-3 border-[#4285F4] flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Job Description Panel */}
            <div className="lg:col-span-7 flex flex-col gap-4 bg-[#F8F9FA] p-6 rounded-3xl border-2 border-[#E8EAED]">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#5F6368] block">
                    01 — JOB DESCRIPTION
                  </span>
                  <h2 className="text-base font-extrabold text-[#202124] tracking-tight mt-0.5">
                    Target Role Specifications
                  </h2>
                </div>

                <span className="text-xs font-mono font-bold text-[#5F6368] bg-[#E8EAED] px-2.5 py-1 rounded">
                  {jdText.length} Chars
                </span>
              </div>

              {/* Seed selection quick bar */}
              <div className="bg-white p-4 border border-[#E8EAED] rounded-2xl">
                <span className="text-[10px] font-mono tracking-wider text-[#5F6368] font-bold block mb-2 uppercase">
                  ✦ QUICK SEED HACKATHON TEMPLATES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_JDS.map((sample) => (
                    <button
                      key={sample.title}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`text-xs px-3.5 py-2 font-bold font-sans rounded-full transition-all border-2 ${
                        activeJDTitle === sample.title
                          ? "bg-[#4285F4] text-white border-[#202124]"
                          : "bg-[#F8F9FA] text-[#202124] border-[#E8EAED] hover:border-[#5F6368]"
                      }`}
                    >
                      {sample.title} ({sample.company})
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    value={roleTitle}
                    onChange={(e) => {
                      setRoleTitle(e.target.value);
                      localStorage.setItem("active_jd_title", e.target.value || "Custom Evaluation Spec");
                    }}
                    className="w-full bg-white border-2 border-[#E8EAED] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] text-sm text-[#202124] placeholder-gray-400 px-4 py-3 rounded-2xl transition-all outline-none"
                    placeholder="Role title"
                  />
                  <input
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      localStorage.setItem("active_jd_company", e.target.value || "Custom Client");
                    }}
                    className="w-full bg-white border-2 border-[#E8EAED] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] text-sm text-[#202124] placeholder-gray-400 px-4 py-3 rounded-2xl transition-all outline-none"
                    placeholder="Company"
                  />
                </div>
                <textarea
                  value={jdText}
                  onChange={(e) => {
                    setJdText(e.target.value);
                    setActiveJDTitle(null); // Custom JD entered manually
                    localStorage.setItem("active_jd_title", "Custom Job Evaluation");
                    localStorage.setItem("active_jd_company", "Custom Client");
                  }}
                  className="w-full min-h-[280px] bg-white border-2 border-[#E8EAED] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] text-sm text-[#202124] placeholder-gray-400 p-4 rounded-2xl transition-all outline-none leading-relaxed"
                  placeholder="Paste the full JD specs here or click one of the quick pre-fill seeds above to instantly evaluate the default candidates dataset..."
                />
              </div>

              {/* Optional extracted role badge */}
              {activeJDTitle && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4285F4]/10 text-[#4285F4] text-xs font-bold font-sans rounded-full uppercase tracking-wider self-start">
                  <span>✓ Extracting Frameworks for: {activeJDTitle}</span>
                </div>
              )}
            </div>

            {/* Right Column: Resume Upload Panel */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-[#F8F9FA] p-6 rounded-3xl border-2 border-[#E8EAED] justify-between">
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#5F6368]">
                    02 — CANDIDATE RESUMES
                  </span>

                  {/* Recruiter test tool */}
                  <button
                    type="button"
                    onClick={() => setResumes([])}
                    className="text-xs text-[#4285F4] hover:underline flex items-center gap-1 font-bold font-sans"
                  >
                    <RotateCw className="w-3.5 h-3.5" /> Clear Candidates
                  </button>
                </div>

                <h2 className="text-base font-extrabold text-[#202124] tracking-tight">
                  Upload Target Profiles dossier
                </h2>
              </div>

              {/* Embedded Custom File upload zone */}
              <FileUploadZone
                files={resumes}
                onAddFiles={handleAddFiles}
                onRemoveFile={handleRemoveFile}
              />

              {/* Info footer */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8EAED] mt-2 flex items-center gap-2.5 text-xs text-[#5F6368]">
                <span className="text-[#34A853]">✦</span>
                <span>Gemini maps target metrics asynchronously. All candidate dossier evaluations are isolated and secure.</span>
              </div>

            </div>

          </div>

          {/* Bottom full-width CTA actions */}
          <div className="bg-[#F8F9FA] border-2 border-[#202124] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mt-4 relative">
            {/* Visual accent background shape */}
            <div className="absolute top-2 right-2 w-[15px] h-[15px] rounded-full bg-[#EA4335]" />

            <div>
              <h3 className="text-base font-extrabold text-[#202124] tracking-tight flex items-center gap-1.5">
                <span className="text-[#34A853] text-lg">✦</span> Confirm Parameters and Candidates state
              </h3>
              <p className="text-xs text-[#5F6368] mt-1 font-serif">
                Ensure both panels contain data to activate deep Gemini flash scoring matrices.
              </p>
            </div>

            {!isAnalyzing ? (
                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    id="analyze-btn"
                    onClick={handleAnalyze}
                    disabled={!isFormValid}
                    className={`w-full sm:w-auto px-10 py-4 font-bold font-sans uppercase tracking-widest text-xs rounded-full transition-all duration-300 flex items-center justify-center gap-2 border-3 border-[#202124] ${
                      isFormValid
                        ? "bg-[#4285F4] text-white hover:bg-[#3b78dd] scale-100 hover:scale-[1.02] cursor-pointer"
                        : "bg-[#E8EAED] text-gray-400 border-[#E8EAED] cursor-not-allowed"
                    }`}
                  >
                    Analyze & Rank Candidates 
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                  {errorMessage && (
                    <p className="text-xs text-[#EA4335] font-mono max-w-[320px] text-right">
                      {errorMessage}
                    </p>
                  )}
                </div>
            ) : (
              <div id="loading-box" className="w-full sm:w-[400px] bg-white border-2 border-[#4285F4] rounded-2xl p-4 flex flex-col gap-3 justify-center shadow-xs">
                {/* Progress bar */}
                <div className="w-full bg-[#E8EAED] h-[6px] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4285F4] rounded-full"
                    style={{ 
                      width: progressWidth,
                      transition: "width 3.5s linear"
                    }}
                  />
                </div>
                {/* Message text representing evaluation state */}
                <div className="flex items-center justify-center gap-2">
                  <p className="text-[14px] text-[#5F6368] font-sans font-medium text-center">
                    {currentMessage}
                  </p>
                  <span className="text-[#4285F4] font-bold animate-pulse text-base shrink-0">✦</span>
                </div>
              </div>
            )}
          </div>

        </motion.div>

      </main>

      {/* Standard Footer */}
      <footer className="bg-[#F8F9FA] py-6 text-center border-t border-[#E8EAED] text-xs text-[#5F6368] font-mono">
        <p>© 2026 Recruit IQ. GDG Hackathon Showcase Submission.</p>
      </footer>

    </div>
  );
}