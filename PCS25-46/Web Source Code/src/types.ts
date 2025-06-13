export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface Report {
  observedPatterns: string[];
  tentativeConditions: string[];
  moodScore: number;
  sentimentScore: number;
  keyQuotes: string[];
  recommendations: string[];
  analysisDate: string;
}