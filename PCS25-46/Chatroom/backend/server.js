const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json()); // To parse JSON request bodies
app.use(cors());

const HF_API_KEY = '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'; // Replace with your actual key (no extra space)
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion"; // Emotion classification model

// Add a new POST route for text analysis
app.post("/analyze-text", async (req, res) => {
  const { text } = req.body; // Get text from request body
  try {
    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: text }, // Send the user input text
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`, // Authorization header with Hugging Face API Key
        },
      }
    );
    
    const predictions = response.data; // This contains the model's predictions
    console.log("Predictions:", predictions); // Log the predictions for debugging
    res.json(predictions); // Send predictions back to frontend
  } catch (error) {
    console.error("Error fetching Hugging Face API:", error.message);
    
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }

    res.status(500).send("Error analyzing text");
  }
});

// Start server (if not already running)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


