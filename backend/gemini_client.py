# import sys
# print("Running with:", sys.executable)
# try:
#     from google import genai
#     print("google.genai import succeeded")
# except Exception as e:
#     print("IMPORT ERROR:", e)



import os
import json
import random
from google import genai
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google Generative AI
API_KEY = os.getenv("GEMINI_API_KEY")
HAS_API_KEY = True

if API_KEY:
    # The new google-genai SDK reads the API key automatically from the environment.
    # No explicit configure() call is needed.
    HAS_API_KEY = True
    print("[INFO] GEMINI_API_KEY found; client will use it automatically.")
else:
    print("[WARNING] GEMINI_API_KEY not found in environment. Running in mockup fallback mode.")

SYSTEM_PROMPT = """
You are an expert technical recruiter and AI talent agent. Your task is to evaluate the provided Candidate Resume Text against the Job Description (JD). 

You must return a JSON object with the following fields:
{
  "candidate_profile": {
    "name": "Full name of the candidate",
    "current_role": "Current designation and company"
  },
  "scores": {
    "overall_score": 85
  },
  "final_recommendation": {
    "verdict": "strong_hire",
    "one_liner": "A concise one-sentence explanation of their overall fit.",
    "next_action": "Recommended next step (e.g. Schedule technical interview)"
  },
  "strengths": [
    {
      "title": "Strength Name",
      "description": "Short explanation of the strength in relation to the JD"
    }
  ],
  "concerns": [
    {
      "title": "Concern Name",
      "severity": "low"
    }
  ],
  "interview_questions": {
    "technical": [
      "Technical question 1",
      "Technical question 2"
    ],
    "behavioral": [
      "Behavioral question 1"
    ]
  }
}

Constraint Rules:
1. 'overall_score' must be an integer between 0 and 100.
2. 'verdict' must be exactly one of: 'strong_hire', 'hire', 'maybe', 'no_hire', 'strong_no_hire'.
3. 'severity' in concerns must be exactly one of: 'low', 'medium', 'high'.
4. Do not include markdown code block styling or any conversational text around the JSON. Return only raw JSON.
"""

def evaluate_candidate(jd_text: str, candidate_resume_text: str) -> str:
    """
    Sends the JD and candidate resume text to Gemini 1.5 Flash.
    Returns the raw string (which should be JSON).
    Falls back to a realistic mock evaluation if no API key is set.
    """
    if HAS_API_KEY:
        try:
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_PROMPT
            )
            
            prompt = f"JOB DESCRIPTION:\n{jd_text}\n\nCANDIDATE RESUME TEXT:\n{candidate_resume_text}"
            
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            return response.text
        except Exception as e:
            print(f"[ERROR] Gemini API call failed: {e}. Falling back to mock generator.")
            # Fall through to mock generator

    # Mock evaluation logic (Fallback)
    return generate_mock_evaluation(jd_text, candidate_resume_text)


def generate_mock_evaluation(jd_text: str, resume_text: str) -> str:
    """
    Generates a realistic mock evaluation based on keywords in the resume text.
    """
    resume_lower = resume_text.lower()
    jd_lower = jd_text.lower()

    # Try to extract candidate name
    name = "Candidate Profile"
    lines = [l.strip() for l in resume_text.split("\n") if l.strip()]
    if lines:
        # First non-empty line often has candidate name
        first_line = lines[0]
        if len(first_line) < 30 and not any(k in first_line.lower() for k in ["resume", "cv", "page", "contact"]):
            name = first_line

    # Try to find current role
    current_role = "Software Engineer"
    for line in lines[:5]:
        if any(keyword in line.lower() for keyword in ["engineer", "developer", "scientist", "researcher", "lead", "manager"]):
            if len(line) < 50:
                current_role = line
                break

    # Analyze fit based on keyword intersections
    common_ml = ["pytorch", "tensorflow", "keras", "machine learning", "nlp", "transformers", "llm", "deep learning", "embedding"]
    common_backend = ["go", "rust", "node", "fastapi", "django", "postgres", "sql", "api", "kafka", "rabbitmq"]

    ml_matches = sum(1 for kw in common_ml if kw in resume_lower)
    backend_matches = sum(1 for kw in common_backend if kw in resume_lower)

    # Determine JD type
    is_ml_jd = any(kw in jd_lower for kw in ["ml", "machine learning", "nlp", "researcher", "ai"])
    
    score = 50
    verdict = "maybe"
    one_liner = "The candidate has general technical background but alignment is moderate."
    strengths = []
    concerns = []
    tech_questions = []

    if is_ml_jd:
        if ml_matches >= 4:
            score = random.randint(85, 95)
            verdict = "strong_hire"
            one_liner = f"Outstanding alignment with advanced ML models and deep learning frameworks."
            strengths = [
                {"title": "Deep ML Stack Alignment", "description": "Demonstrates strong experience in neural networks and PyTorch/TensorFlow frameworks."},
                {"title": "Advanced Problem Solving", "description": "Proven experience addressing complex model evaluation and deployment bottlenecks."}
            ]
            concerns = [{"title": "Limited legacy systems integration", "severity": "low"}]
            tech_questions = ["Explain a complex model training bottleneck you resolved.", "How do you evaluate model drift post-deployment?"]
        elif ml_matches >= 2:
            score = random.randint(70, 84)
            verdict = "hire"
            one_liner = "Good foundations in ML concepts and programming; ready to contribute."
            strengths = [
                {"title": "Core AI Foundations", "description": "Clear hands-on projects showing implementation of ML theories."}
            ]
            concerns = [{"title": "Lacks production scaling experience at very high throughput", "severity": "medium"}]
            tech_questions = ["What metrics do you track for classification tasks?", "How do you split dataset for unbalanced classes?"]
        else:
            score = random.randint(35, 59)
            verdict = "no_hire"
            one_liner = "Core background is in backend software development with insufficient AI/ML exposure."
            strengths = [
                {"title": "Backend Engineering", "description": "Strong general software development skills and API structures."}
            ]
            concerns = [{"title": "Zero demonstration of PyTorch, Transformers or LLM fine-tuning", "severity": "high"}]
            tech_questions = ["What python libraries are you most comfortable with?", "How would you start building a text classification pipeline?"]
    else:
        # Backend JD
        if backend_matches >= 4:
            score = random.randint(85, 95)
            verdict = "strong_hire"
            one_liner = "Excellent concurrent system designs and high-throughput transaction engineering."
            strengths = [
                {"title": "High Concurrency Systems", "description": "Strong experience handling concurrent processes, queues (Kafka/RabbitMQ), and distributed architecture."},
                {"title": "Robust API Designs", "description": "Demonstrated ability to architect reliable RESTful endpoints and schema validations."}
            ]
            concerns = [{"title": "Limited experience with frontend architectures", "severity": "low"}]
            tech_questions = ["How do you handle database race conditions under peak traffic?", "Explain how distributed locks work in database operations."]
        elif backend_matches >= 2:
            score = random.randint(70, 84)
            verdict = "hire"
            one_liner = "Competent developer with solid database and system structures."
            strengths = [
                {"title": "Database Optimization", "description": "Good knowledge of querying structures and caching layers."}
            ]
            concerns = [{"title": "Message brokers and event stream familiarity is theoretical", "severity": "medium"}]
            tech_questions = ["Compare relational databases vs NoSQL databases.", "How do you organize error boundaries in APIs?"]
        else:
            score = random.randint(35, 59)
            verdict = "no_hire"
            one_liner = "Resume is highly research or theory-focused, lacking core high-performance system designs."
            strengths = [
                {"title": "Research and Analysis", "description": "Demonstrated skills in analysis and mathematical scripting."}
            ]
            concerns = [{"title": "No experience building web APIs or message brokers", "severity": "high"}]
            tech_questions = ["What concurrent libraries have you used?", "How would you design a simple microservice endpoint?"]

    evaluation = {
        "candidate_profile": {
            "name": name,
            "current_role": current_role
        },
        "scores": {
            "overall_score": score
        },
        "final_recommendation": {
            "verdict": verdict,
            "one_liner": one_liner,
            "next_action": "Schedule technical interview" if score >= 70 else "Review alternative roles"
        },
        "strengths": strengths,
        "concerns": concerns,
        "interview_questions": {
            "technical": tech_questions,
            "behavioral": ["Tell me about a project where you had to learn a technology very quickly.", "How do you coordinate with team members during crunch periods?"]
        }
    }

    return json.dumps(evaluation, indent=2)
