import time
from typing import List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pdf_parser import extract_text_from_pdf
from gemini_client import evaluate_candidate
from scorer import aggregate_results

app = FastAPI(
    title="Recruit IQ Backend",
    description="AI-Powered Resume Screening & Ranking Engine API",
    version="1.0.0"
)

# CORS Configuration
# React frontend typically runs on http://localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon/local development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Recruit IQ Backend is running. Use POST /api/rank to screen resumes."}

@app.post("/api/rank")
async def rank_candidates(
    jd_text: str = Form(...),
    resumes: List[UploadFile] = File(...)
):
    """
    Receives Job Description (jd_text) and a list of resume PDF files.
    Parses them, sends to Gemini for grading, ranks them, and returns candidate reports.
    """
    if not resumes:
        raise HTTPException(status_code=400, detail="No resume files uploaded.")
    
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description text is empty.")
    
    print(f"[INFO] Received /api/rank request with {len(resumes)} resume files.")
    start_time = time.time()
    
    candidates_raw_data = []
    
    for resume in resumes:
        filename = resume.filename
        print(f"[INFO] Processing file: {filename}")
        
        try:
            # Read binary file bytes
            file_bytes = await resume.read()
            
            # Extract plain text
            resume_text = extract_text_from_pdf(file_bytes)
            
            if not resume_text:
                print(f"[WARNING] Skipping '{filename}': Failed to extract text.")
                # We still want to report skipped files, but scorer.py expects gemini_response
                # Let's generate a basic empty or failed model response so the user knows it failed,
                # or let scorer skip it. We'll skip it here to keep output clean.
                continue
                
            print(f"[INFO] Extracted {len(resume_text)} characters from '{filename}'. Calling Gemini...")
            
            # Send to Gemini
            gemini_response = evaluate_candidate(jd_text, resume_text)
            
            candidates_raw_data.append({
                "filename": filename,
                "gemini_response": gemini_response
            })
            
        except Exception as e:
            print(f"[ERROR] Failed to process resume file '{filename}': {e}")
            continue
            
    # Run the candidate scorer and ranking engine
    try:
        ranked_results = aggregate_results(candidates_raw_data)
        elapsed_time = round(time.time() - start_time, 2)
        print(f"[INFO] Processed {len(ranked_results)} candidates successfully in {elapsed_time}s.")
        
        # Attach elapsed time metadata to response if desired, or return just the list
        return ranked_results
    except Exception as e:
        print(f"[ERROR] Ranking engine failed: {e}")
        raise HTTPException(status_code=500, detail=f"Ranking aggregation error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
