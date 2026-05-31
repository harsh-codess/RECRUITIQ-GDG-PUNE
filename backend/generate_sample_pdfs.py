import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_resume_pdf(filename, name, role, email, phone, summary, experience, education, skills):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(filename, pagesize=letter,
                            rightMargin=54, leftMargin=54,
                            topMargin=54, bottomMargin=54)
    story = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=24,
        leading=28,
        textColor='#4285F4',
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        leading=14,
        textColor='#5F6368',
        spaceAfter=15
    )
    
    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=14,
        leading=18,
        textColor='#202124',
        spaceBefore=12,
        spaceAfter=6
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor='#202124',
        spaceAfter=8
    )

    # Title & Contact
    story.append(Paragraph(name, title_style))
    story.append(Paragraph(f"{role}  |  {email}  |  {phone}", subtitle_style))
    story.append(Spacer(1, 10))

    # Summary
    story.append(Paragraph("Professional Summary", heading_style))
    story.append(Paragraph(summary, body_style))
    story.append(Spacer(1, 10))

    # Experience
    story.append(Paragraph("Work Experience", heading_style))
    for exp in experience:
        story.append(Paragraph(f"<b>{exp['title']}</b> - {exp['company']} ({exp['period']})", body_style))
        story.append(Paragraph(exp['details'], body_style))
        story.append(Spacer(1, 5))
    story.append(Spacer(1, 10))

    # Skills
    story.append(Paragraph("Key Skills", heading_style))
    story.append(Paragraph(", ".join(skills), body_style))
    story.append(Spacer(1, 10))

    # Education
    story.append(Paragraph("Education", heading_style))
    story.append(Paragraph(education, body_style))

    doc.build(story)
    print(f"Created PDF resume: {filename}")

if __name__ == "__main__":
    # Get absolute path for output directory relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(script_dir, "..", "sample_resumes")
    
    # Aisha Khan
    create_resume_pdf(
        os.path.join(out_dir, "aisha_khan_research.pdf"),
        "Aisha Khan",
        "AI Researcher at IIT Bombay",
        "aisha.khan@iitb.ac.in",
        "+91 98765 43210",
        "Academic and applied machine learning researcher specializing in NLP, transformers, and multimodal embeddings. Extensive theoretical background in matrix operations and custom loss functions, coupled with hands-on PyTorch engineering.",
        [
            {
                "title": "Lead Research Assistant",
                "company": "IIT Bombay ML Research Lab",
                "period": "2024 - Present",
                "details": "Designing sparse-attention layers for multimodal architectures. Published a top-tier paper on language model alignment. Spearheading PyTorch model customization and training optimization."
            }
        ],
        "M.Tech in Computer Science, IIT Bombay (GPA: 9.8/10)",
        ["PyTorch", "Transformers", "NLP", "Sparse Attention", "Large Language Models", "Multimodal Learning", "Linear Algebra", "Python"]
    )
    
    # Priya Sharma
    create_resume_pdf(
        os.path.join(out_dir, "priya_sharma_ml.pdf"),
        "Priya Sharma",
        "Senior ML Engineer at Flipkart",
        "priya.sharma@flipkart.com",
        "+91 99988 77766",
        "Senior Machine Learning Engineer with 4+ years of professional experience building, training, and deploying large-scale NLP and recommendation models. Expertise in PyTorch, transformers, and MLOps workflows.",
        [
            {
                "title": "Senior ML Engineer",
                "company": "Flipkart Tech Research Division",
                "period": "2022 - Present",
                "details": "Architected and deployed transformer-based product recommendation query layers serving 10M+ daily active users. Optimized PyTorch model training pipelines and solved data drift issues under peak throughput."
            }
        ],
        "B.Tech in Computer Science & Engineering, DTU",
        ["PyTorch", "Transformers", "Large Language Models", "BERT", "MLOps", "Model Deployment", "Python", "Data Drift Mitigation"]
    )

    # Rohan Mehta
    create_resume_pdf(
        os.path.join(out_dir, "rohan_mehta_cv.pdf"),
        "Rohan Mehta",
        "Data Scientist at Swiggy",
        "rohan.mehta@swiggy.in",
        "+91 88877 66655",
        "Data Scientist with 3 years of experience in data analysis, recommendation engines, and predictive analytics. Skilled in Python, SQL, and traditional ML algorithms.",
        [
            {
                "title": "Data Scientist",
                "company": "Swiggy",
                "period": "2023 - Present",
                "details": "Built a location-based menu recommendation model that improved click-through rates by 12%. Developed data cleaning pipelines and traditional regression/classification model suites."
            }
        ],
        "B.Tech in Information Technology, VIT",
        ["Python", "SQL", "Pandas", "Scikit-Learn", "Recommendation Systems", "A/B Testing", "Data Analysis", "Tableau"]
    )

    # Dev Patel
    create_resume_pdf(
        os.path.join(out_dir, "dev_patel_backend.pdf"),
        "Dev Patel",
        "Core Backend System Engineer at Razorpay",
        "dev.patel@razorpay.com",
        "+91 77766 55544",
        "Backend Software Engineer with 3+ years of experience designing concurrent APIs and high-throughput transaction ledger systems. Expert in Go, Rust, message brokers, and database locking.",
        [
            {
                "title": "Software Engineer (Backend)",
                "company": "Razorpay Payment Subsystems",
                "period": "2022 - Present",
                "details": "Designed ledger APIs handling 5,000+ transaction requests per second. Implemented concurrent backend workers in Go and managed message routing queues via Apache Kafka and RabbitMQ."
            }
        ],
        "B.E. in Computer Engineering, BITS Pilani",
        ["Go", "Rust", "Node.js", "Apache Kafka", "RabbitMQ", "PostgreSQL", "REST APIs", "Distributed Systems", "Concurrency"]
    )

    # Sneha Iyer
    create_resume_pdf(
        os.path.join(out_dir, "sneha_iyer_nlp.pdf"),
        "Sneha Iyer",
        "NLP Engineer",
        "sneha.iyer@gmail.com",
        "+91 96655 44433",
        "Computational Linguist and Machine Learning Engineer specializing in NLP parsing pipelines, transformer architectures, and custom text cleaning utilities.",
        [
            {
                "title": "ML Engineer (Contractor)",
                "company": "Cognizant",
                "period": "2024 - 2025",
                "details": "Developed custom parsing modules for scanning financial logs. Deployed BERT-based semantic search systems. Managed text preprocessing pipelines in Python."
            }
        ],
        "M.Sc in Computational Linguistics, Hyderabad Central University",
        ["Python", "NLTK", "SpaCy", "BERT", "PyTorch", "Transformers", "Regex", "Text Mining"]
    )
