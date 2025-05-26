from flask import Flask, request, jsonify, render_template
import cohere
from dotenv import load_dotenv
import os
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    response = co.chat(
        message=user_input,
        model="command-r-plus",  # Cohere’s top model
        temperature=0.5
    )

    bot_reply = response.text.strip()
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
