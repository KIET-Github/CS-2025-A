# Setting up your Gemini API Key

To use this application, you'll need to:

1. Get a Gemini API key from Google AI Studio: https://ai.google.dev/
2. Create a `.env` file in the root directory of this project
3. Add your API key to the `.env` file:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Never commit your API key to version control. The `.env` file is listed in `.gitignore` to prevent this.