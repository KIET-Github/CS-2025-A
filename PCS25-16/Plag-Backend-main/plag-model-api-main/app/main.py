# app/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from app.utils import extract_text_from_pdf, check_plagiarism

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/check")
async def check(pdf: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await pdf.read())
        tmp_path = tmp.name

    text = extract_text_from_pdf(tmp_path)
    plagiarism_percent = check_plagiarism(text)

    return {
        "plagiarism_percentage": plagiarism_percent,
        "is_plagiarized": plagiarism_percent > 30
    }
