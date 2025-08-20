import React from 'react';
import { GameMode } from '../types';
import { WandIcon, BookOpenIcon } from './icons';

interface GameModeSelectorProps {
  onSelect: (mode: GameMode) => void;
  t?: (key: string) => string;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelect, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.gameModeSelector.title': 'Choose Your Saga',
      'sagaLearnScreen.gameModeSelector.description': 'How will your adventure unfold?',
      'sagaLearnScreen.gameModeSelector.quizAdventure': 'Quiz Adventure',
      'sagaLearnScreen.gameModeSelector.quizAdventureDesc': 'A guided, mission-based journey where knowledge is the key to victory.',
      'sagaLearnScreen.gameModeSelector.freeExploration': 'Free Exploration',
      'sagaLearnScreen.gameModeSelector.freeExplorationDesc': 'An open world shaped by your choices, where destiny is unwritten.'
    };
    return fallbacks[key] || key;
  });

  return (
    <div className="flex items-center justify-center animate-fade-in" style={{minHeight: 'calc(100vh - 60px)'}}>
      <div className="w-full max-w-4xl p-4 sm:p-8 space-y-8 text-center">
        <div>
            <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">{translate('sagaLearnScreen.gameModeSelector.title')}</h1>
            <p className="mt-4 text-lg text-gray-300">{translate('sagaLearnScreen.gameModeSelector.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <button
            onClick={() => onSelect(GameMode.QUIZ_ADVENTURE)}
            className="group flex flex-col items-center justify-start p-8 bg-gray-800/50 border-2 border-transparent hover:border-purple-500 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-purple-500/30"
          >
            <div className="p-5 bg-purple-600/20 rounded-full mb-5 border-2 border-purple-500/50 group-hover:bg-purple-600/40 transition-colors">
                <BookOpenIcon />
            </div>
            <span className="text-2xl font-semibold">{translate('sagaLearnScreen.gameModeSelector.quizAdventure')}</span>
            <span className="text-base text-purple-200 mt-2 text-center max-w-xs">{translate('sagaLearnScreen.gameModeSelector.quizAdventureDetails')}</span>
          </button>
          
          <button
            onClick={() => onSelect(GameMode.FREE_EXPLORATION)}
            className="group flex flex-col items-center justify-start p-8 bg-gray-800/50 border-2 border-transparent hover:border-teal-500 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/30"
          >
             <div className="p-5 bg-teal-600/20 rounded-full mb-5 border-2 border-teal-500/50 group-hover:bg-teal-600/40 transition-colors">
                <WandIcon />
            </div>
            <span className="text-2xl font-semibold">{translate('sagaLearnScreen.gameModeSelector.freeExploration')}</span>
            <span className="text-base text-teal-200 mt-2 text-center max-w-xs">{translate('sagaLearnScreen.gameModeSelector.freeExplorationDetails')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};