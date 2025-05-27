import React from 'react';

interface TherapyRecommendationsProps {
  recommendations: string[];
}

const TherapyRecommendations: React.FC<TherapyRecommendationsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-green-50 rounded-lg p-5 border border-green-100">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Recommended Modules</h3>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg border border-green-100 flex items-start"
          >
            <div className="mr-4 flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              {index + 1}
            </div>
            <div>
              <p className="text-gray-800">{recommendation}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        These recommendations are based on the conversation analysis and are intended as 
        suggestions for therapeutic focus.
      </p>
    </div>
  );
};

export default TherapyRecommendations;