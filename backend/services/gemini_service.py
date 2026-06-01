import json
import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()


def analyze_candidate(
    jd_text: str, resume_text: str, role_title: str, company: str
) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-3.5-flash")

    prompt = (
        "You are a recruitment analyst. Analyze the candidate resume against the job "
        "description and return ONLY valid JSON. No markdown, no code fences, no "
        "explanations. The JSON must follow this schema exactly:\n\n"
        "{\n"
        "  \"name\": str,\n"
        "  \"current_role\": str,\n"
        "  \"scores\": { \"overall_score\": 0-100 },\n"
        "  \"final_recommendation\": {\n"
        "    \"verdict\": \"strong_hire|hire|maybe|no_hire|strong_no_hire\",\n"
        "    \"one_liner\": str,\n"
        "    \"next_action\": str\n"
        "  },\n"
        "  \"strengths\": [{\"title\": str, \"description\": str}],\n"
        "  \"concerns\": [{\"title\": str, \"severity\": \"low|medium|high\"}],\n"
        "  \"interview_questions\": {\n"
        "    \"technical\": [str],\n"
        "    \"behavioral\": [str]\n"
        "  }\n"
        "}\n\n"
        f"Role Title: {role_title}\n"
        f"Company: {company}\n\n"
        "Job Description:\n"
        f"{jd_text}\n\n"
        "Candidate Resume:\n"
        f"{resume_text}\n"
    )

    response = model.generate_content(prompt)
    raw_text = (response.text or "").strip()

    if not raw_text:
        raise ValueError("Could not extract text from Gemini response")

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        raise ValueError(raw_text)
