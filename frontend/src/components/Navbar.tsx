import { Link, useLocation } from "react-router-dom";
import { Terminal, Star } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const getPillStyle = (path: string, colorClass: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      if (colorClass === "blue") return "bg-[#4285F4] text-white";
      if (colorClass === "yellow") return "bg-[#FBBC04] text-[#202124]";
      if (colorClass === "red") return "bg-[#EA4335] text-white";
    }
    
    // Custom non-active hover classes
    if (colorClass === "yellow") return "hover:bg-[#FBBC04]/10 text-[#202124] border-transparent";
    if (colorClass === "blue") return "hover:bg-[#4285F4]/10 text-[#202124] border-transparent";
    return "hover:bg-[#EA4335]/10 text-[#202124] border-transparent";
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 border-b border-[#E8EAED] bg-white relative z-20">
      
      {/* Brand logo */}
      <Link to="/" className="flex items-center gap-2 group self-start sm:self-auto">
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#202124] bg-white group-hover:bg-[#4285F4] group-hover:text-white transition-all duration-200">
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
        </div>
        <div>
          <span className="font-extrabold text-[18px] tracking-tight text-[#202124]">
            Recruit<span className="text-[#4285F4]">IQ</span>
          </span>
          <div className="text-[9px] font-mono tracking-widest text-[#5F6368] uppercase font-bold">
            ✦ GDG HACKATHON
          </div>
        </div>
      </Link>

      {/* Nav pill controls */}
      <div className="flex flex-row items-center gap-1 p-1 bg-[#F8F9FA] rounded-full border border-[#E8EAED] w-full sm:w-auto justify-between sm:justify-start">
        <Link 
          to="/" 
          id="nav-home"
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-xs font-bold font-sans rounded-full transition-all duration-200 uppercase tracking-wider flex-grow sm:flex-initial text-center ${getPillStyle("/", "yellow")}`}
        >
          Home
        </Link>
        <Link 
          to="/upload" 
          id="nav-upload"
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-xs font-bold font-sans rounded-full transition-all duration-200 uppercase tracking-wider flex-grow sm:flex-initial text-center ${getPillStyle("/upload", "blue")}`}
        >
          Upload Studio
        </Link>
        <Link 
          to="/results" 
          id="nav-results"
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[12px] sm:text-xs font-bold font-sans rounded-full transition-all duration-200 uppercase tracking-wider flex-grow sm:flex-initial text-center ${getPillStyle("/results", "red")}`}
        >
          Results
        </Link>
      </div>

    </nav>
  );
}