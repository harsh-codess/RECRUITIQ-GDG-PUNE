import React, { useState } from "react";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  fileObject?: File;
}

interface FileUploadZoneProps {
  files: UploadedFile[];
  onAddFiles: (newFiles: UploadedFile[]) => void;
  onRemoveFile: (id: string) => void;
}

export default function FileUploadZone({ files, onAddFiles, onRemoveFile }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFileList = (fileList: FileList) => {
    const parsed: UploadedFile[] = Array.from(fileList).map((f, i) => ({
      id: `file-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
      name: f.name,
      size: `${Math.round(f.size / 1024)} KB`,
      fileObject: f
    }));
    onAddFiles(parsed);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileList(e.target.files);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      
      {/* Drag Drop Box Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-3 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
          dragActive 
            ? "border-[#4285F4] bg-[#4285F4]/5 scale-[1.01]" 
            : "border-[#E8EAED] hover:border-[#4285F4]/50 bg-[#F8F9FA]"
        }`}
      >
        <input 
          type="file" 
          id="resume-file-picker" 
          multiple 
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleInputChange} 
        />

        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mb-3 border-2 border-[#E8EAED] shadow-sm">
          <Upload className="w-5 h-5 text-[#34A853]" />
        </div>

        <p className="text-sm font-extrabold text-[#202124] mb-1">
          Drop PDFs here or click to browse
        </p>
        <p className="text-xs text-[#5F6368] mb-4">
          Accepts standard recruiter resume files (PDF, Word)
        </p>

        <label 
          htmlFor="resume-file-picker"
          className="cursor-pointer text-xs font-bold px-4 py-2.5 bg-white border-2 border-[#202124] text-[#202124] hover:bg-[#202124] hover:text-white rounded-full transition-colors font-sans uppercase tracking-wider"
        >
          Select Files
        </label>
      </div>

      {/* Upload count state badge chips */}
      <div className="flex items-center justify-between text-xs mt-1">
        <span className="font-mono text-[10px] uppercase font-bold text-[#5F6368]">
          UPLOADED DOSSIER FILES ({files.length})
        </span>
        
        {files.length > 0 && (
          <div className="px-3 py-1 bg-[#34A853] text-white font-mono text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{files.length} resumes uploaded</span>
          </div>
        )}
      </div>

      {/* Files tag chips wrapper */}
      {files.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-3 bg-[#F8F9FA] border-2 border-[#E8EAED] rounded-2xl">
          {files.map((file) => (
            <div
              key={file.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-[#E8EAED] rounded-full text-xs font-medium text-[#202124]"
            >
              <FileText className="w-3.5 h-3.5 text-[#4285F4]" />
              <span className="max-w-[150px] truncate">{file.name}</span>
              <span className="text-[10px] font-mono text-[#5F6368]">({file.size})</span>
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="hover:bg-red-100 p-0.5 rounded-full text-[#EA4335] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-[#5F6368] border-2 border-dashed border-[#E8EAED] rounded-2xl bg-[#F8F9FA]/50">
          No candidates in evaluation queue. Use the sample loaders or drag files to queue them up.
        </div>
      )}

    </div>
  );
}
