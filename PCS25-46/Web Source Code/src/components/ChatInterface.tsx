import React, { useEffect, useRef, useState } from 'react';
import { Mic, Send, FileText, X } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';
import MessageList from './MessageList';
import VoiceInput from './VoiceInput';
import ReportView from './ReportView';
import TherapyRecommendations from './TherapyRecommendations';

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    generateReport, 
    report, 
    isReportGenerating 
  } = useConversation();

  // Focus input on load
  useEffect(() => {
    if (inputRef.current && !isVoiceActive) {
      inputRef.current.focus();
    }
  }, [isVoiceActive]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputText(text);
    setIsVoiceActive(false);
    // Auto-send after voice input if text is available
    if (text.trim()) {
      setTimeout(() => {
        sendMessage(text);
        setInputText('');
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleGenerateReport = async () => {
    await generateReport();
    setShowReport(true);
  };

  if (showReport && report) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Assessment Report</h2>
          <button 
            onClick={() => setShowReport(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <ReportView report={report} />
        <TherapyRecommendations recommendations={report.recommendations} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {messages.length > 5 && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex justify-center">
          <button
            onClick={handleGenerateReport}
            disabled={isReportGenerating || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText size={16} />
            {isReportGenerating ? 'Generating Report...' : 'Finish Conversation & Generate Report'}
          </button>
        </div>
      )}

      <div className="border-t border-gray-200 p-4">
        {isVoiceActive ? (
          <VoiceInput 
            onResult={handleVoiceInput} 
            onCancel={() => setIsVoiceActive(false)} 
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[52px] max-h-32"
              rows={1}
            />
            <button
              type="button"
              onClick={() => setIsVoiceActive(true)}
              className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              aria-label="Voice input"
            >
              <Mic size={20} />
            </button>
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;