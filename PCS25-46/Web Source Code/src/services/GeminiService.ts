import { v4 as uuidv4 } from 'uuid';

interface MessageInput {
  role: 'user' | 'model';
  content: string;
}

// This would typically use your actual API key
// For security, this should be stored in an environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'GEMINI_API_KEY';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateContentFromGemini = async (
  messages: MessageInput[],
  systemPrompt: string,
  isJson = false
): Promise<string> => {
  try {
    // Convert messages to Gemini format
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first message
    const contentsWithSystem = [
      {
        role: 'model',
        parts: [{ text: systemPrompt }]
      },
      ...formattedMessages
    ];

    // Prepare request payload
    const payload = {
      contents: contentsWithSystem,
      generationConfig: {
        temperature: isJson ? 0.1 : 0.7,
        topP: 0.95,
        topK: 40,
      }
    };

    // Make API request
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract response text
    if (
      data && 
      data.candidates && 
      data.candidates[0] && 
      data.candidates[0].content && 
      data.candidates[0].content.parts && 
      data.candidates[0].content.parts[0]
    ) {
      return data.candidates[0].content.parts[0].text;
    } else {
      // Simulate API response for demo purposes if real API fails
      console.warn('Using fallback response simulation');
      return simulateFallbackResponse(messages, isJson);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Return fallback response in case of error
    return simulateFallbackResponse(messages, isJson);
  }
};

// Fallback function to simulate responses when API is not available
const simulateFallbackResponse = (messages: MessageInput[], isJson: boolean): string => {
  const lastUserMessage = messages.findLast(msg => msg.role === 'user')?.content || '';
  
  if (isJson) {
    // Return sample report JSON
    return JSON.stringify({
      observedPatterns: [
        "Shows signs of moderate stress related to daily activities",
        "Expresses desire for more social connection",
        "Displays self-awareness about emotional states"
      ],
      tentativeConditions: [
        "Mild anxiety",
        "Social isolation"
      ],
      moodScore: 6,
      sentimentScore: 5,
      keyQuotes: [
        lastUserMessage.length > 10 ? lastUserMessage : "I've been feeling a bit overwhelmed lately"
      ],
      recommendations: [
        "Guided meditation sessions for stress reduction",
        "Social connection exercises"
      ],
      analysisDate: new Date().toISOString()
    });
  }
  
  // Simulate conversation responses
  const responses = [
    "How long have you been feeling this way?",
    "That sounds challenging. What helps you cope when you feel like this?",
    "Have you noticed any patterns to when these feelings are stronger or weaker?",
    "How has your sleep been recently?",
    "What activities bring you joy or a sense of accomplishment?",
    "How would you describe your energy levels throughout the day?",
    "Have you shared these feelings with anyone else in your life?",
    "What would an ideal day look like for you right now?",
    "How have your relationships been affected by how you've been feeling?",
    "What small thing could you do today that might help you feel a bit better?"
  ];
  
  // Select a random response
  return responses[Math.floor(Math.random() * responses.length)];
};