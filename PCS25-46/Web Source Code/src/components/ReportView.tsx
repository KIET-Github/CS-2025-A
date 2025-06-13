import React from 'react';
import { Report } from '../types';

interface ReportViewProps {
  report: Report;
}

const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  const {
    observedPatterns,
    tentativeConditions,
    moodScore,
    sentimentScore,
    keyQuotes,
    recommendations,
    analysisDate
  } = report;

  // Determine mood color
  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Format date
  const formattedDate = new Date(analysisDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Mental Health Assessment</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      
      <div className="p-5 space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Mood Assessment</h4>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${getMoodColor(moodScore)}`}>
                  {moodScore}/10
                </span>
                <div className="ml-3 flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        moodScore >= 8 ? 'bg-green-500' : 
                        moodScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${moodScore * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Analysis</h4>
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${getMoodColor(sentimentScore)}`}>
                  {sentimentScore}/10
                </span>
                <div className="ml-3 flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        sentimentScore >= 8 ? 'bg-green-500' : 
                        sentimentScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sentimentScore * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Observed Patterns</h3>
          <ul className="space-y-2">
            {observedPatterns.map((pattern, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{pattern}</span>
              </li>
            ))}
          </ul>
        </section>

        {tentativeConditions.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Potential Concerns</h3>
            <div className="flex flex-wrap gap-2">
              {tentativeConditions.map((condition, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {condition}
                </span>
              ))}
            </div>
          </section>
        )}

        {keyQuotes.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Notable Expressions</h3>
            <div className="space-y-3">
              {keyQuotes.map((quote, index) => (
                <blockquote 
                  key={index}
                  className="border-l-4 border-blue-300 pl-4 italic text-gray-600"
                >
                  "{quote}"
                </blockquote>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReportView;