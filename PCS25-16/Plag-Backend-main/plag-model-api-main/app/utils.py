# app/utils.py
import os
import pandas as pd
import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

csv_path = os.path.join(os.path.dirname(__file__), "final_data.csv")
data = pd.read_csv(csv_path)
if data.empty or 'Text' not in data.columns:
    raise ValueError("CSV is empty or missing 'Text' column.")

data_segments = data['Text'].dropna().tolist()

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + ' '
    return text.strip()

def check_plagiarism(input_text):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1).fit_transform([input_text] + data_segments)
    similarity_matrix = cosine_similarity(vectorizer[0:1], vectorizer[1:])
    scores = similarity_matrix[0]
    percent = (sum(scores > 0.0) / len(data_segments)) * 100
    return round(percent, 2)
