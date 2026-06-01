<div align="center">

# ✦ Recruit IQ
### AI-Powered Resume Screening & Ranking Engine
**Built for Google Developer Groups Hackathon · Pune 2026**


</div>

---

## 📌 What is Recruit IQ?

**Recruit IQ** is an intelligent recruiter assistant that eliminates the manual effort of resume screening. A recruiter pastes a Job Description, uploads a batch of candidate PDFs, and within seconds receives a ranked leaderboard of the best-fit candidates — each evaluated, scored, and explained by **Gemini 3.5 Flash** via Google AI Studio.

The system doesn't just match keywords. It understands context, infers candidate strength, and provides a hiring verdict (`Strong Hire / Hire / Maybe / No Hire`) with a one-liner rationale for every candidate — making it a true AI co-pilot for talent acquisition.

---

## 🚀 Live Demo (POC)

▶️ **Screen Recording (Full Demo on YouTube)** — please watch the full end-to-end demo on YouTube:

> Watch on YouTube: [https://youtu.be/l4NXQKvVa-0](https://youtu.be/l4NXQKvVa-0)

---

## 🖥️ Screenshots

### Upload Studio — Configure JD & Upload Resumes
![Upload Studio](./assets/ss1.png)

> The recruiter pastes the full Job Description (or uses a quick-seed template for roles like *Senior ML Engineer at Flipkart* or *Lead AI Researcher at IIT Bombay Hub*), then uploads a batch of candidate PDF resumes. The system confirms readiness before triggering evaluation.

---

### Results — Ranked Candidate Leaderboard
![Ranked Leaderboard](./assets/ss2.png)

> After Gemini evaluates each candidate, the leaderboard shows candidates ranked by AI score with verdicts like **Strong Hire (91%)**, **Hire (87%)**, etc. Each card includes the candidate's current role, a one-liner AI evaluation, and a "View Details" button for the full breakdown.

---

## 🏗️ System Architecture

The system is a 7-step pipeline:

| Step | Module | Responsibility |
|------|--------|----------------|
| 1 | `app.py` (Streamlit Frontend) | Recruiter inputs Job Description + uploads PDF resumes |
| 2 | `main.py` (FastAPI Backend) | Receives `jd_text` + `resume_files` at `POST /rank` |
| 3 | `pdf_parser.py` | Extracts raw text from each PDF using `pdfplumber` |
| 4 | `gemini_client.py` | Sends JD + resume text to Gemini 1.5 Flash → structured JSON evaluation |
| 5 | **`scorer.py`** ⭐ | Parses, validates, normalizes scores, and ranks all candidates |
| 6 | `main.py` (FastAPI Backend) | Returns ranked candidates JSON to frontend |
| 7 | `app.py` (Streamlit Frontend) | Renders ranked candidate cards with score, verdict, one-liner |

![System Architecture](./assets/ARCHITECTURE.png)

---

## ⭐ scorer.py — Ranking Engine Deep Dive

`scorer.py` is the brain of the ranking pipeline. It is the **only module** that `main.py` calls to go from raw Gemini responses → a clean, ranked list.

### Public API

```python
from scorer import aggregate_results

results = aggregate_results(candidates)
# candidates: list of {"filename": str, "gemini_response": str}
# returns:    list of ranked dicts with candidate_name + rank at top level
```

### What it does

1. **Strips markdown fences** — Gemini sometimes wraps JSON in ` ```json ``` ` blocks. These are stripped automatically before parsing.
2. **Parses JSON** — Uses Python's standard `json` module. Invalid JSON is skipped with a warning; the pipeline never crashes.
3. **Validates required fields** — Checks for `scores.overall_score`, `candidate_profile`, `final_recommendation.verdict`, and `final_recommendation.one_liner`. Missing fields → skip + warn.
4. **Resolves candidate name** — Uses `candidate_profile.name` if present and non-empty, otherwise falls back to the PDF filename (`.pdf` stripped).
5. **Normalizes and ranks** — Sorts by `overall_score` descending (handles both `int` and `float`). Assigns sequential `rank` starting at 1. Ties get sequential ranks in sort order.

### Gemini JSON Contract

Every agent's Gemini response **must** include these fields at minimum:

```json
{
  "scores": {
    "overall_score": 91
  },
  "candidate_profile": {
    "name": "Aisha Khan"
  },
  "final_recommendation": {
    "verdict": "Strong Hire",
    "one_liner": "Rare combination of research depth and production readiness."
  }
}
```

Additional fields (`technical_score`, `soft_skills`, `strengths`, `concerns`, `interview_questions`, etc.) are preserved untouched in the output.

### Dependencies

```
json   # standard library
re     # standard library
```

Zero third-party dependencies. No file I/O. No API calls.

---

## 🧪 Running Tests

```bash
python3 scorer.py
```

Expected output:
```
============================================================
RecruiterAI — scorer.py test run
============================================================
[WARNING] Skipping 'malformed.pdf': invalid JSON — ...
[WARNING] Skipping 'diana_prince.pdf': missing required field 'scores.overall_score'.

── Final ranked results ──
  Rank  1 | score=   85 | name=Alice Johnson
  Rank  2 | score=   85 | name=Bob Smith
  Rank  3 | score=   72 | name=charlie_doe

✅  All assertions passed.
```

The test block covers:
- ✅ Clean JSON with full schema
- ✅ Markdown-fenced JSON (` ```json ``` `)
- ✅ Missing `candidate_profile.name` → filename fallback
- ✅ Malformed JSON → skip + warn
- ✅ Missing `overall_score` → skip + warn
- ✅ Tied scores → sequential ranking

---

## 🏷️ Event

Built at the **Google Developer Groups Hackathon — Pune 2026**  
Theme: *AI-Powered Developer Tools using Google AI Stack*  
Stack: `Gemini 1.5 Flash`, `FastAPI`, `Streamlit`, `pdfplumber`, `Python`

---

<div align="center">
  <sub>Recruit IQ · GDG Pune 2026 · Powered by Gemini</sub>
</div>
