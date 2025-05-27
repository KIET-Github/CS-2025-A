import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Check, X } from 'lucide-react';

interface VoiceInputProps {
  onResult: (text: string) => void;
  onCancel: () => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, onCancel }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };
      
      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      setError('Speech recognition is not supported in this browser');
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleConfirm = () => {
    if (transcript) {
      onResult(transcript);
    } else {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
          {error || (isListening ? 'Listening...' : 'Voice input ready')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={handleConfirm}
            disabled={!transcript}
            className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={20} />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-3 min-h-[52px] relative">
        {transcript ? (
          <p className="text-gray-800">{transcript}</p>
        ) : (
          <p className="text-gray-400">Speak now...</p>
        )}
      </div>

      <div className="flex justify-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {isListening ? <Mic size={24} /> : <MicOff size={24} />}
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;