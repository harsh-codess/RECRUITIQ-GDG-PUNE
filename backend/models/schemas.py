from typing import Literal

from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    jd_text: str
    role_title: str
    company: str


class Strength(BaseModel):
    title: str
    description: str


class Concern(BaseModel):
    title: str
    severity: Literal["low", "medium", "high"]


class InterviewQuestions(BaseModel):
    technical: list[str]
    behavioral: list[str]


class Scores(BaseModel):
    overall_score: int


class FinalRecommendation(BaseModel):
    verdict: Literal[
        "strong_hire",
        "hire",
        "maybe",
        "no_hire",
        "strong_no_hire",
    ]
    one_liner: str
    next_action: str


class Candidate(BaseModel):
    name: str
    current_role: str
    scores: Scores
    final_recommendation: FinalRecommendation
    strengths: list[Strength]
    concerns: list[Concern]
    interview_questions: InterviewQuestions


class AnalyzeResponse(BaseModel):
    candidates: list[Candidate]
