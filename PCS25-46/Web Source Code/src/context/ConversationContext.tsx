import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Message, Report } from '../types';
import { generateContentFromGemini } from '../services/GeminiService';
import { v4 as uuidv4 } from 'uuid';

interface ConversationContextType {
  messages: Message[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
  generateReport: () => Promise<void>;
  report: Report | null;
  isReportGenerating: boolean;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [isReportGenerating, setIsReportGenerating] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  // Initial message from chatbot
  useEffect(() => {
    if (!conversationStarted) {
      setConversationStarted(true);
      setTimeout(() => {
        const initialMessage: Message = {
          id: uuidv4(),
          content: "Hi there! How are you feeling today?",
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages([initialMessage]);
      }, 500);
    }
  }, [conversationStarted]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Get all messages for context
      const allMessages = [...messages, userMessage];
      
      // Prepare conversation history for Gemini
      const conversationHistory = allMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.content
      }));

      // Create system prompt for Gemini
      const systemPrompt = `You are a mental health assessment chatbot designed to have natural, human-like conversations to subtly assess the user's mental state. 
      
Your goal is to:
1. Maintain a warm, compassionate conversation
2. Ask natural follow-up questions based on the user's responses
3. Look for signs of mental health conditions like anxiety, depression, burnout, etc.
4. Keep the conversation flowing naturally, not like an interview
5. Don't explicitly state that you're assessing their mental health
6. Respond like a thoughtful human friend would, not a clinical robot
7. Keep responses concise (1-3 sentences maximum)
8. NEVER mention that you're an AI or chatbot

IMPORTANT: Do not ask directly about mental health conditions. Instead, ask about their day, feelings, sleep, energy levels, interests, and relationships in a natural, conversational way.`;

      // Get response from Gemini
      const response = await generateContentFromGemini(conversationHistory, systemPrompt);
      
      if (response) {
        // Add bot response
        const botMessage: Message = {
          id: uuidv4(),
          content: response,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble responding right now. Could you try again?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const generateReport = useCallback(async () => {
    setIsReportGenerating(true);
    
    try {
      // Prepare conversation history for Gemini
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.content
      }));

      // Create system prompt for report generation
      const reportPrompt = `Based on the conversation history, generate a comprehensive mental health assessment report. Include:

1. Observed behavioral patterns (list 3-5 key observations)
2. Potential mental health conditions that may be present (if any)
3. A mood score from 1-10 (10 being excellent mental health)
4. A sentiment score from 1-10 (10 being very positive)
5. 2-3 key quotes from the user that were significant
6. 1-2 recommended therapy modules or approaches that might be beneficial

Format your response as a valid JSON object with the following structure:
{
  "observedPatterns": ["pattern1", "pattern2", ...],
  "tentativeConditions": ["condition1", "condition2", ...],
  "moodScore": number,
  "sentimentScore": number,
  "keyQuotes": ["quote1", "quote2", ...],
  "recommendations": ["recommendation1", "recommendation2"],
  "analysisDate": "current date in ISO format"
}

IMPORTANT: Be compassionate but honest in your assessment. If there are no signs of mental health conditions, state that the user appears to be in good mental health. Don't invent issues that aren't supported by the conversation.`;

      // Get report from Gemini
      const reportJson = await generateContentFromGemini(conversationHistory, reportPrompt, true);
      
      if (reportJson) {
        try {
          // Parse JSON response
          const reportData = JSON.parse(reportJson);
          setReport(reportData);
        } catch (parseError) {
          console.error('Error parsing report JSON:', parseError);
          setReport({
            observedPatterns: ['Error generating comprehensive report'],
            tentativeConditions: [],
            moodScore: 5,
            sentimentScore: 5,
            keyQuotes: [],
            recommendations: ['Consider a general wellness check-in'],
            analysisDate: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setReport({
        observedPatterns: ['Error generating comprehensive report'],
        tentativeConditions: [],
        moodScore: 5,
        sentimentScore: 5,
        keyQuotes: [],
        recommendations: ['Consider a general wellness check-in'],
        analysisDate: new Date().toISOString()
      });
    } finally {
      setIsReportGenerating(false);
    }
  }, [messages]);

  return (
    <ConversationContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        generateReport,
        report,
        isReportGenerating
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};