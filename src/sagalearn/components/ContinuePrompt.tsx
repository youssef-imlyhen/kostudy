import React from 'react';

interface ContinuePromptProps {
  onContinue: () => void;
  onStartOver: () => void;
  t?: (key: string) => string;
}

export const ContinuePrompt: React.FC<ContinuePromptProps> = ({ onContinue, onStartOver, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.continuePrompt.title': 'Welcome Back, Adventurer!',
      'sagaLearnScreen.continuePrompt.description': 'We found a saved adventure. Would you like to continue where you left off or start a new journey?',
      'sagaLearnScreen.continuePrompt.continue': 'Continue Adventure',
      'sagaLearnScreen.continuePrompt.startOver': 'Start Over'
    };
    return fallbacks[key] || key;
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-white">{translate('sagaLearnScreen.continuePrompt.title')}</h2>
        <p className="text-lg text-gray-300">
          {translate('sagaLearnScreen.continuePrompt.description')}
        </p>
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            {translate('sagaLearnScreen.continuePrompt.continue')}
          </button>
          <button
            onClick={onStartOver}
            className="px-8 py-3 bg-gray-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          >
            {translate('sagaLearnScreen.continuePrompt.startOver')}
          </button>
        </div>
      </div>
    </div>
  );
};
