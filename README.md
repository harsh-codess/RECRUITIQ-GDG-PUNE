# RecruitAI - Intelligent Candidate Ranking System

## Overview

RecruitIQ helps recruiters identify the best candidates for a role without manually reviewing dozens of resumes.

Traditional Applicant Tracking Systems (ATS) rely heavily on keyword matching, often missing strong candidates whose experience is relevant but described differently. RecruiterAI uses AI-powered semantic understanding to evaluate candidates based on actual role fit rather than keyword coincidence.

The platform analyzes a Job Description (JD), understands role requirements, evaluates multiple resumes, and produces a ranked shortlist with explainable insights for every candidate.

---

## Problem Statement

Recruiters often spend hours reviewing resumes manually:

* Reading 50+ PDF resumes
* Comparing skills against job requirements
* Identifying hidden strengths
* Creating candidate shortlists
* Preparing interview questions

Most ATS platforms focus on keyword matching, which frequently results in:

* False positives
* Missed qualified candidates
* Poor ranking quality
* Limited transparency in scoring

RecruitIQ solves this by understanding context, experience, skills, and role alignment using Large Language Models and semantic search.

---

## Key Features

### 1. Job Description Understanding

Upload a Job Description and RecruitIQ extracts:

* Required technical skills
* Preferred skills
* Experience level
* Education requirements
* Key responsibilities
* Success criteria

The system converts an unstructured JD into structured hiring intelligence.

---

### 2. Multi-Resume Analysis

Upload multiple candidate resumes simultaneously.

RecruitIQ:

* Extracts resume content
* Understands experience and skills
* Creates semantic embeddings
* Compares candidates against role requirements

---

### 3. Hybrid Candidate Scoring

Each candidate receives a score between **0–100** based on:

* Skill alignment
* Experience relevance
* Semantic similarity
* Role fit
* Career trajectory

Candidates are automatically ranked from strongest to weakest match.

---

### 4. Explainable AI Ranking

Instead of giving only a score, RecruitIQ explains:

#### Strengths

Examples:

* Strong Python and FastAPI experience
* Relevant backend development projects
* Experience matching required seniority

#### Concerns

Examples:

* Limited cloud exposure
* Missing required framework experience
* Insufficient years of experience

#### Suggested Interview Questions

Examples:

* Explain how you optimized API performance.
* Describe your experience with vector databases.
* How would you design a scalable recommendation system?

This transparency helps recruiters trust the ranking output.

---

### 5. Diversity & Bias Awareness (Optional Enhancement)

The system can highlight potential evaluation biases and encourage fair candidate assessment.

---

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/55f4cb1f-94cb-44d1-8542-71cf4131a32f" />






## System Architecture

```text
                     ┌─────────────────┐
                     │ Job Description │
                     └────────┬────────┘
                              │
                              ▼
                    JD Understanding Layer
                              │
                              ▼
                    Structured Requirements
                              │
                              ▼

 ┌─────────────┐     Semantic Matching     ┌─────────────┐
 │ Resume 1    │ ───────────────────────► │             │
 ├─────────────┤                           │             │
 │ Resume 2    │ ───────────────────────► │ Scoring &   │
 ├─────────────┤                           │ Ranking     │
 │ Resume N    │ ───────────────────────► │ Engine       │
 └─────────────┘                           │             │
                                           └──────┬──────┘
                                                  │
                                                  ▼
                                    Ranked Candidate List
                                                  │
                                                  ▼
                                    Explainable Insights
```

---

## Technology Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Frontend      | Streamlit                 |
| Backend       | FastAPI                   |
| LLM           | Gemini 1.5 Flash          |
| Embeddings    | Google text-embedding-004 |
| Vector Search | FAISS                     |
| PDF Parsing   | pdfplumber / PyPDF2       |
| Storage       | In-Memory (No Database)   |

---

## Project Structure

```text
backend/
│
├── app.py
│
├── routes/
│   ├── jd.py
│   ├── resume.py
│   └── ranking.py
│
├── services/
│   ├── jd_extractor.py
│   ├── resume_parser.py
│   ├── embeddings.py
│   ├── scorer.py
│   └── llm_service.py
│
└── requirements.txt


frontend/
│
├── app.py
└── requirements.txt
```

---

## How It Works

### Step 1

Upload a Job Description PDF or text.

### Step 2

RecruiterAI extracts:

* Skills
* Experience requirements
* Success criteria
* Role expectations

### Step 3

Upload multiple candidate resumes.

### Step 4

The system:

* Parses resumes
* Generates embeddings
* Computes semantic similarity
* Evaluates role alignment

### Step 5

Candidates are ranked automatically.

### Step 6

Recruiters receive:

* Candidate Score
* Rank
* Strengths
* Concerns
* Suggested Interview Questions

---

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/APL-GDG-PUNE/.git

cd RecruitIQ
```

---

## Backend Setup

### Navigate to backend

```bash
cd backend
```

### Create Virtual Environment

Windows:

```bash
python -m venv venv

venv\Scripts\activate
```

Linux / Mac:

```bash
python3 -m venv venv

source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key
```

---

## Run Backend

```bash
uvicorn app:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

Open a new terminal.

### Navigate to frontend

```bash
cd frontend
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Streamlit

```bash
streamlit run app.py
```

Frontend URL:

```text
http://localhost:8501
```

---

## API Endpoints

### Upload Job Description

```http
POST /jd/upload
```

Returns:

```json
{
  "skills": [],
  "experience_level": "",
  "success_criteria": []
}
```

---

### Upload Resumes

```http
POST /resume/upload
```

Returns parsed candidate data.

---

### Rank Candidates

```http
POST /ranking/generate
```

Returns:

```json
[
  {
    "candidate": "John Doe",
    "score": 89,
    "rank": 1,
    "strengths": [],
    "concerns": [],
    "interview_questions": []
  }
]
```

---

## Future Enhancements

* CSV/PDF shortlist export
* Recruiter dashboard
* Candidate comparison view
* Bias-aware ranking insights
* Historical hiring analytics
* ATS integrations
* Team collaboration features

---

## Demo Workflow

1. Upload Job Description
2. Upload 5–50 Resumes
3. Generate Rankings
4. Review Candidate Insights
5. Export Shortlist

Total processing time: typically under a few minutes.

---

## Why RecruiterAI?

RecruiterAI is designed to rank candidates the way a great recruiter would:

* Understand context, not just keywords
* Evaluate overall fit
* Surface hidden talent
* Explain every ranking decision
* Reduce resume screening time dramatically

Instead of asking:

> "Does the resume contain the right words?"

RecruiterAI asks:

> "Is this candidate genuinely the right fit for the role?"

---

## Team Vision

Our goal is to build hiring intelligence that augments recruiters rather than replacing them.

Recruiters make the final decision.

RecruitIQ helps them reach that decision faster, with better information and greater confidence.
