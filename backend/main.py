from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn

from routes.analyze import router as analyze_router

load_dotenv()

app = FastAPI(
    title="RecruitIQ API",
    description="AI-powered candidate ranking backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(analyze_router, prefix="/api")


@app.get("/")
def health_check():
    return {"status": "ok", "service": "RecruitIQ API"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
