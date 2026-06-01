export interface Candidate {
  id: string;
  name: string;
  current_role: string;
  scores: {
    overall_score: number;
  };
  final_recommendation: {
    verdict: 'strong_hire' | 'hire' | 'maybe' | 'no_hire' | 'strong_no_hire';
    one_liner: string;
    next_action: string;
  };
  strengths: {
    title: string;
    description: string;
  }[];
  concerns: {
    title: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  interview_questions: {
    technical: string[];
    behavioral: string[];
  };
}

export interface SampleJD {
  title: string;
  category: string;
  company: string;
  text: string;
}

export const SAMPLE_JDS: SampleJD[] = [
  {
    title: "Senior Machine Learning Engineer",
    category: "AI & ML",
    company: "Flipkart",
    text: `Job Title: Senior Machine Learning & NLP Engineer
Company: Flipkart Tech Research Division
Location: Bengaluru, India (Hybrid)

About the Role:
We are looking for an experienced Machine Learning Engineer who can architect and deploy state-of-the-art NLP models, embedding models, and transformer architectures. You will scale Flipkart's recommendation query layers.

Required Qualifications:
- 4+ years of professional ML deployment experience.
- Heavy expertise with PyTorch, Transformer layers, and Large Language Models.
- Passion for solving data drift and feature evaluation scale issues under massive throughput.`
  },
  {
    title: "Lead AI Researcher",
    category: "AI Systems",
    company: "IIT Bombay Hub",
    text: `Job Title: Lead Artificial Intelligence Researcher / Scientist
Company: IIT Bombay Applied AI Incubator
Location: Mumbai, India

About the Role:
We seek a mathematical researcher to lead our next-generation multimodal embedding project. You will implement direct fine-tuning of sparse-attention layers.

Required Qualifications:
- Deep academic and theoretical knowledge of deep learning architectures.
- Experience publishing models or leading advanced research workflows.
- Strong foundational knowledge of matrix operations, custom loss functions, and PyTorch.`
  },
  {
    title: "Core Backend System Engineer",
    category: "Backend",
    company: "Razorpay",
    text: `Job Title: Core Infrastructure Software Engineer
Company: Razorpay Payment Subsystems
Location: Remote (India)

About the Role:
We are hiring a Backend Developer to reinforce scalable ledger APIs and real-time ledger settlement queues.

Required Qualifications:
- 3+ years writing concurrent system code (Go, Rust, or Node.js).
- Master of scalable message brokers (Apache Kafka, RabbitMQ) and distributed locking.
- Heavy background in API performance and high throughput query optimization.`
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    "id": "cand-1",
    "name": "Aisha Khan",
    "current_role": "AI Researcher at IIT Bombay",
    "scores": { "overall_score": 91 },
    "final_recommendation": {
      "verdict": "strong_hire",
      "one_liner": "Rare combination of research depth and production readiness.",
      "next_action": "Schedule technical interview immediately"
    },
    "strengths": [
      { "title": "Research Pedigree", "description": "Published NLP paper, IIT Bombay ML lab" },
      { "title": "Full-Stack AI", "description": "Built and deployed models end-to-end" }
    ],
    "concerns": [
      { "title": "Limited industry exposure", "severity": "low" }
    ],
    "interview_questions": {
      "technical": ["Walk me through your published research.", "How would you scale your model to 10M users?"],
      "behavioral": ["How do you handle ambiguous problem statements?", "Describe a failed experiment and what you learned."]
    }
  },
  {
    "id": "cand-2",
    "name": "Priya Sharma",
    "current_role": "ML Engineer at Flipkart",
    "scores": { "overall_score": 87 },
    "final_recommendation": {
      "verdict": "strong_hire",
      "one_liner": "Exceptional NLP background with production-scale deployment experience.",
      "next_action": "Schedule technical interview immediately"
    },
    "strengths": [
      { "title": "NLP Expertise", "description": "3 years production NLP, BERT fine-tuning at scale" },
      { "title": "Ownership Mindset", "description": "Led end-to-end model deployment with zero downtime" }
    ],
    "concerns": [
      { "title": "No leadership experience", "severity": "low" },
      { "title": "Limited system design exposure", "severity": "medium" }
    ],
    "interview_questions": {
      "technical": ["Describe your largest model deployment pipeline.", "How do you handle data drift in production?"],
      "behavioral": ["Tell me about a time you disagreed with your team's technical decision.", "How do you prioritize when deadlines conflict?"]
    }
  },
  {
    "id": "cand-3",
    "name": "Rohan Mehta",
    "current_role": "Data Scientist at Swiggy",
    "scores": { "overall_score": 74 },
    "final_recommendation": {
      "verdict": "hire",
      "one_liner": "Solid data science fundamentals, needs mentorship on ML engineering.",
      "next_action": "Proceed to second round with senior engineer"
    },
    "strengths": [
      { "title": "Strong Analytics", "description": "Built recommendation engine serving 5M users" }
    ],
    "concerns": [
      { "title": "MLOps knowledge gaps", "severity": "medium" },
      { "title": "No LLM experience", "severity": "medium" }
    ],
    "interview_questions": {
      "technical": ["How do you evaluate a recommendation system?", "What's your experience with model monitoring?"],
      "behavioral": ["How do you communicate technical tradeoffs to non-technical stakeholders?"]
    }
  },
  {
    "id": "cand-4",
    "name": "Dev Patel",
    "current_role": "Backend Engineer at Razorpay",
    "scores": { "overall_score": 45 },
    "final_recommendation": {
      "verdict": "no_hire",
      "one_liner": "Strong backend skills but insufficient ML depth for this role.",
      "next_action": "Send rejection with feedback on ML skill gaps"
    },
    "strengths": [
      { "title": "System Design", "description": "Designed high-throughput payment APIs at scale" }
    ],
    "concerns": [
      { "title": "No ML/AI experience", "severity": "high" },
      { "title": "No Python proficiency demonstrated", "severity": "high" }
    ],
    "interview_questions": {
      "technical": ["Have you worked with any ML frameworks?", "How would you approach learning NLP?"],
      "behavioral": ["Why are you transitioning to AI roles?"]
    }
  }
];