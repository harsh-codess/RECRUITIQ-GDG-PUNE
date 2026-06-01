from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from services.pdf_extractor import extract_text_from_pdf
from services.gemini_service import analyze_candidate
from models.schemas import AnalyzeResponse

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(
    jd_text: str = Form(...),
    role_title: str = Form(...),
    company: str = Form(...),
    resumes: list[UploadFile] = File(...),
):
    if not resumes:
        raise HTTPException(status_code=400, detail="No resumes uploaded")

    candidates = []

    for resume in resumes:
        pdf_bytes = await resume.read()

        try:
            resume_text = extract_text_from_pdf(pdf_bytes)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc

        try:
            result = analyze_candidate(jd_text, resume_text, role_title, company)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

        candidates.append(result)

    return AnalyzeResponse(candidates=candidates)
