import json
import re
import uuid

def clean_json_string(raw_response: str) -> str:
    """
    Strips markdown code blocks (e.g. ```json ... ```) from Gemini's response.
    """
    # Remove leading/trailing whitespace
    clean_str = raw_response.strip()
    # Match ```json <content> ``` or ``` <content> ```
    match = re.match(r"^```(?:json)?\s*(.*?)\s*```$", clean_str, re.DOTALL)
    if match:
        clean_str = match.group(1).strip()
    return clean_str

def aggregate_results(candidates: list) -> list:
    """
    candidates: list of {"filename": str, "gemini_response": str}
    returns:    list of ranked dicts with candidate_name + rank at top level
    """
    processed = []

    for item in candidates:
        filename = item.get("filename", "unknown.pdf")
        raw_resp = item.get("gemini_response", "")

        if not raw_resp:
            print(f"[WARNING] Skipping '{filename}': empty response.")
            continue

        clean_str = clean_json_string(raw_resp)

        # Parse JSON
        try:
            data = json.loads(clean_str)
        except Exception as e:
            print(f"[WARNING] Skipping '{filename}': invalid JSON — {e}")
            continue

        # Validate required fields
        # Needs: scores.overall_score, candidate_profile, final_recommendation.verdict, final_recommendation.one_liner
        scores = data.get("scores")
        profile = data.get("candidate_profile")
        recommendation = data.get("final_recommendation")

        if not isinstance(scores, dict) or "overall_score" not in scores:
            print(f"[WARNING] Skipping '{filename}': missing required field 'scores.overall_score'.")
            continue

        if not isinstance(profile, dict):
            print(f"[WARNING] Skipping '{filename}': missing required field 'candidate_profile'.")
            continue

        if not isinstance(recommendation, dict) or "verdict" not in recommendation or "one_liner" not in recommendation:
            print(f"[WARNING] Skipping '{filename}': missing required fields in 'final_recommendation'.")
            continue

        # Resolve candidate name
        name = profile.get("name", "").strip()
        if not name:
            # strip .pdf from filename
            name = filename
            if name.lower().endswith(".pdf"):
                name = name[:-4]
            # Replace underscores/dashes with spaces and capitalize
            name = name.replace("_", " ").replace("-", " ").title()

        # Resolve current role
        current_role = profile.get("current_role", "").strip()
        if not current_role:
            current_role = "Candidate"

        # Normalize verdict to lowercase snake_case for frontend
        raw_verdict = recommendation.get("verdict", "").strip()
        # map common strings: "Strong Hire" -> "strong_hire", "No Hire" -> "no_hire", etc.
        verdict = raw_verdict.lower().replace(" ", "_")
        # Ensure it is one of the valid frontend values
        valid_verdicts = ["strong_hire", "hire", "maybe", "no_hire", "strong_no_hire"]
        if verdict not in valid_verdicts:
            if "strong_no" in verdict or "strong no" in verdict:
                verdict = "strong_no_hire"
            elif "strong" in verdict:
                verdict = "strong_hire"
            elif "no" in verdict:
                verdict = "no_hire"
            elif "maybe" in verdict:
                verdict = "maybe"
            else:
                verdict = "hire"

        # Parse strengths, concerns, interview questions
        strengths = data.get("strengths", [])
        if not isinstance(strengths, list):
            strengths = []
        
        # Ensure strengths match schema: {title, description}
        cleaned_strengths = []
        for s in strengths:
            if isinstance(s, dict) and "title" in s:
                cleaned_strengths.append({
                    "title": s.get("title", ""),
                    "description": s.get("description", "")
                })
            elif isinstance(s, str):
                cleaned_strengths.append({
                    "title": s,
                    "description": ""
                })

        concerns = data.get("concerns", [])
        if not isinstance(concerns, list):
            concerns = []
        cleaned_concerns = []
        for c in concerns:
            if isinstance(c, dict) and "title" in c:
                severity = c.get("severity", "low").lower()
                if severity not in ["low", "medium", "high"]:
                    severity = "low"
                cleaned_concerns.append({
                    "title": c.get("title", ""),
                    "severity": severity
                })
            elif isinstance(c, str):
                cleaned_concerns.append({
                    "title": c,
                    "severity": "low"
                })

        # Interview questions
        questions = data.get("interview_questions", {})
        if not isinstance(questions, dict):
            questions = {}
        
        technical_qs = questions.get("technical", [])
        if not isinstance(technical_qs, list):
            technical_qs = [technical_qs] if technical_qs else []
        
        behavioral_qs = questions.get("behavioral", [])
        if not isinstance(behavioral_qs, list):
            behavioral_qs = [behavioral_qs] if behavioral_qs else []

        cleaned_questions = {
            "technical": [str(q) for q in technical_qs],
            "behavioral": [str(q) for q in behavioral_qs]
        }

        # Normalize overall score to numeric (int or float)
        try:
            overall_score = float(scores["overall_score"])
            # if it's an integer value, convert to int
            if overall_score.is_integer():
                overall_score = int(overall_score)
        except Exception:
            overall_score = 0

        # Construct final frontend-compliant Candidate dict
        candidate_id = data.get("id", f"cand-{uuid.uuid4().hex[:6]}")

        candidate_record = {
            "id": candidate_id,
            "name": name,
            "current_role": current_role,
            "scores": {
                "overall_score": overall_score
            },
            "final_recommendation": {
                "verdict": verdict,
                "one_liner": recommendation.get("one_liner", ""),
                "next_action": recommendation.get("next_action", "Review candidate portfolio")
            },
            "strengths": cleaned_strengths,
            "concerns": cleaned_concerns,
            "interview_questions": cleaned_questions,
            # Maintain any additional fields from original responses
            "raw_payload": data
        }

        processed.append(candidate_record)

    # Sort by overall_score descending
    processed.sort(key=lambda x: x["scores"]["overall_score"], reverse=True)

    # Assign ranks
    for rank_idx, record in enumerate(processed, 1):
        record["rank"] = rank_idx

    return processed
