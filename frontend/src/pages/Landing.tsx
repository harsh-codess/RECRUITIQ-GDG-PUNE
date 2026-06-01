import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Sparkles, Terminal, BookOpen, Layers, HelpCircle, ArrowRight, Star } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[#202124] relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* BACKGROUND FLOATING PILL DECORATIONS (Google Colors) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Floating Green Pill (Top-Left) */}
        <div className="absolute -top-12 -left-12 w-[180px] h-[70px] rounded-full bg-[#34A853]/15 transform -rotate-12" />
        
        {/* Floating Yellow Pill (Bottom-Left) */}
        <div className="absolute bottom-[20%] -left-16 w-[260px] h-[90px] rounded-full bg-[#FBBC04]/15 transform rotate-45" />
        
        {/* Floating Blue Pill (Right center) */}
        <div className="absolute top-[40%] -right-20 w-[300px] h-[100px] rounded-full bg-[#4285F4]/10 transform -rotate-45" />

        {/* Small Solid Yellow Pill decoration */}
        <div className="absolute top-[18%] left-[10%] w-[35px] h-[15px] rounded-full bg-[#FBBC04]" />

        {/* Small Solid Blue Pill decoration */}
        <div className="absolute bottom-[35%] right-[20%] w-[45px] h-[18px] rounded-full bg-[#4285F4]" />

        {/* Large faint Google grid decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eaed_1px,transparent_1px),linear-gradient(to_bottom,#e8eaed_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
      </div>

      {/* FIXED NAVIGATION */}
      <Navbar />

      {/* TWO-COLUMN LAYOUT WITH ROTATED TRACK LABELS */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-4 md:px-6 pt-[40px] sm:pt-[60px] pb-12 md:py-20 flex-grow grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left rotated tracker strip */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center font-mono text-[9px] font-bold text-[#5F6368] space-y-24 tracking-[0.3em] uppercase select-none border-r border-[#E8EAED] py-12 h-full">
          <div className="transform -rotate-90 origin-center whitespace-nowrap">
            CANDIDATE RANKING
          </div>
          <div className="transform -rotate-90 origin-center text-[#4285F4] whitespace-nowrap">
            ✦ GEMINI POWERED
          </div>
          <div className="transform -rotate-90 origin-center whitespace-nowrap">
            GDG HACKATHON 2026
          </div>
        </div>

        {/* Central Display Typography Area */}
        <div className="md:col-span-12 lg:col-span-11 flex flex-col items-start text-left relative pl-0 lg:pl-12">
          
          <div className="relative">
            {/* Google 4-pointed star ✦ floating top-right of wordmark */}
            <div className="absolute -top-6 sm:-top-8 right-0 sm:right-2 md:-top-12 md:right-16 text-[#FBBC04] text-[36px] sm:text-[48px] md:text-[64px] animate-bounce pointer-events-none">
              ✦
            </div>

            {/* Giant bold wordmark RecruitIQ */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-[52px] sm:text-[64px] md:text-[120px] font-sans font-black tracking-tighter leading-[0.85] text-[#202124] select-none"
            >
              Recruit<span className="text-[#4285F4]">IQ</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[18px] sm:text-[22px] md:text-[32px] font-serif text-[#5F6368] max-w-full sm:max-w-[340px] md:max-w-xl mt-5 sm:mt-6 font-medium leading-[1.4] sm:leading-[1.3] md:leading-relaxed"
          >
            Rank candidates the way a seasoned recruiter would. Powered by Gemini.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 sm:mt-10 flex flex-wrap items-center gap-4 w-full"
          >
            <Link 
              to="/upload" 
              className="w-full sm:w-auto h-[52px] sm:h-[56px] px-8 bg-[#4285F4] hover:bg-[#3b78dd] text-white text-[14px] sm:text-[16px] whitespace-nowrap font-bold font-sans uppercase tracking-wider rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 border-3 border-[#202124]"
            >
              <span className="sm:hidden">Start Analyzing →</span>
              <span className="hidden sm:inline">Start Analyzing Candidates</span>
              <ArrowRight className="hidden sm:block w-5 h-5 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative large cropped bottom-right action trigger circles */}
      <div className="absolute bottom-[10%] right-[-70px] w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#4285F4] text-white hidden md:flex flex-col items-center justify-center p-8 border-4 border-[#202124] rotate-12 pointer-events-none select-none">
        <span className="font-mono text-center leading-tight font-black text-xs uppercase tracking-widest">
          ANALYZE <br /> RESUMES ↓
        </span>
      </div>

      {/* SECTIONS BELOW HERO: 3-feature row */}
      <section className="bg-[#F8F9FA] border-t-3 border-b-3 border-[#202124] w-full relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#5F6368] font-bold block mb-2">✦ SYSTEM CAPABILITIES</span>
            <h2 className="text-[28px] md:text-[48px] font-sans font-black tracking-tight text-[#202124] leading-tight">
              Evaluation Metrics Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 01 */}
            <div className="group bg-white p-6 rounded-2xl border-2 border-[#E8EAED] hover:border-[#202124] transition-all relative overflow-hidden">
              <span className="absolute right-4 top-4 text-7xl font-mono font-black text-[#E8EAED] select-none group-hover:text-[#FBBC04]/20 transition-colors">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center mb-4 border border-[#4285F4]/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] md:text-[24px] font-bold text-[#202124] mb-2 uppercase tracking-wide">
                Deep JD Understanding
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#5F6368] leading-relaxed relative z-10 mr-12">
                Gemini processes structural requirements, technology layers, and targeted seniority directly from raw prose.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="group bg-white p-6 rounded-2xl border-2 border-[#E8EAED] hover:border-[#202124] transition-all relative overflow-hidden">
              <span className="absolute right-4 top-4 text-7xl font-mono font-black text-[#E8EAED] select-none group-hover:text-[#34A853]/20 transition-colors">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center mb-4 border border-[#34A853]/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] md:text-[24px] font-bold text-[#202124] mb-2 uppercase tracking-wide">
                Holistic Scoring
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#5F6368] leading-relaxed relative z-10 mr-12">
                Quantitative algorithms evaluate applicant files against objective criteria rather than superficial keyword matching.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="group bg-white p-6 rounded-2xl border-2 border-[#E8EAED] hover:border-[#202124] transition-all relative overflow-hidden">
              <span className="absolute right-4 top-4 text-7xl font-mono font-black text-[#E8EAED] select-none group-hover:text-[#EA4335]/20 transition-colors">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center mb-4 border border-[#EA4335]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] md:text-[24px] font-bold text-[#202124] mb-2 uppercase tracking-wide">
                Explainable Results
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#5F6368] leading-relaxed relative z-10 mr-12">
                Get full transparency with key strengths, concerns, and tailored candidate-specific interview question sets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA: Full width bold section */}
      <section className="bg-white py-16 relative z-10 border-b border-[#E8EAED]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="text-[#EA4335] text-2xl mb-4 font-mono">✦ ✦ ✦</div>
          <h2 className="text-[28px] md:text-[48px] font-sans font-black tracking-tight text-[#202124] leading-tight mb-6">
            Ready to find the right candidate?
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#5F6368] max-w-md mx-auto mb-8 font-sans">
            Paste target role scopes and parse up to dozens of draft resumes instantly. Get context mapping in seconds.
          </p>
          <Link 
            to="/upload" 
            className="w-full md:w-auto h-[56px] px-8 bg-[#4285F4] hover:bg-[#3b78dd] text-white text-[16px] font-bold font-sans uppercase tracking-[0.2em] rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 border-2 border-[#202124]"
          >
            Start Analyzing <Star className="w-4 h-4 fill-current text-[#FBBC04] shrink-0" />
          </Link>
        </div>
      </section>

      {/* Standard Footer */}
      <footer className="bg-[#F8F9FA] py-6 text-center border-t border-[#E8EAED] text-xs text-[#5F6368] font-mono relative z-10">
        <p>© 2026 Recruit IQ. Built with Gemini Flash for Google Developer Groups (GDG) Hackathon.</p>
      </footer>

    </div>
  );
}