import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import UploadStudio from "./pages/UploadStudio";
import ResultsDashboard from "./pages/ResultsDashboard";
import CandidateDetail from "./pages/CandidateDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<UploadStudio />} />
        <Route path="/results" element={<ResultsDashboard />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        {/* Redirect route fallbacks */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
