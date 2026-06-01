import io

import pdfplumber


def extract_text_from_pdf(file_bytes: bytes) -> str:
    if not file_bytes:
        raise ValueError("Could not extract text from PDF")

    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
    except Exception as exc:
        raise ValueError(f"Could not extract text from PDF: {exc}") from exc

    text = "\n".join(pages)
    text = " ".join(text.split())

    if not text:
        raise ValueError("Could not extract text from PDF")

    return text
