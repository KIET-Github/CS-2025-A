import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ConversationProvider } from './context/ConversationContext';
import './index.css';

function App() {
  return (
    <ConversationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <header className="p-4 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">MindfulChat</h1>
            <p className="ml-4 text-gray-500 text-sm hidden md:block">
              A compassionate conversation assistant
            </p>
          </div>
        </header>
        
        <main className="flex-1 max-w-4xl w-full mx-auto p-4">
          <ChatInterface />
        </main>
        
        <footer className="text-center p-4 text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
          <p>MindfulChat © 2025 - Diagnostic Assistant for Mental Health Professionals</p>
        </footer>
      </div>
    </ConversationProvider>
  );
}

export default App;