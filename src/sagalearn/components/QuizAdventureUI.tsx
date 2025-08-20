import React, { useState } from 'react';
import type { Scene, WorldState } from '../types';
import { QuizAdventureEngine } from '../services/geminiService';
import { Spinner, BackpackIcon, VictoryIcon, DefeatIcon, TalkIcon, MoveIcon, ExamineIcon, UseIcon, QuestionIcon } from './icons';
import { StatsDisplay } from './StatsDisplay';
import { PlayerDashboard } from './PlayerDashboard';

interface QuizAdventureUIProps {
  scene: Scene;
  engine: QuizAdventureEngine;
  onSceneUpdate: (scene: Scene) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  worldState: Partial<WorldState>;
  resetToStart: () => void;
  t?: (key: string, options?: Record<string, string | number>) => string;
}

const getActionIcon = (choice: string): React.ReactNode => {
    const lowerChoice = choice.toLowerCase();
    if (lowerChoice.includes('talk') || lowerChoice.includes('speak') || lowerChoice.includes('ask')) return <TalkIcon />;
    if (lowerChoice.includes('go') || lowerChoice.includes('move') || lowerChoice.includes('walk') || lowerChoice.includes('run') || lowerChoice.includes('leave')) return <MoveIcon />;
    if (lowerChoice.includes('examine') || lowerChoice.includes('look') || lowerChoice.includes('inspect')) return <ExamineIcon />;
    if (lowerChoice.includes('use') || lowerChoice.includes('activate') || lowerChoice.includes('pull')) return <UseIcon />;
    return <QuestionIcon />;
}

export const QuizAdventureUI: React.FC<QuizAdventureUIProps> = ({ scene, engine, onSceneUpdate, loading, setLoading, worldState, resetToStart, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string, options?: Record<string, string | number>) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.quizAdventureUI.victory': 'Victory!',
      'sagaLearnScreen.quizAdventureUI.gameOver': 'Game Over',
      'sagaLearnScreen.quizAdventureUI.playAgain': 'Play Again',
      'sagaLearnScreen.quizAdventureUI.correct': 'Correct!',
      'sagaLearnScreen.quizAdventureUI.incorrect': 'Incorrect!',
      'sagaLearnScreen.quizAdventureUI.objective': 'Objective:',
      'sagaLearnScreen.quizAdventureUI.survive': 'Survive...',
      'sagaLearnScreen.quizAdventureUI.turnsRemaining': 'Turns Remaining: ',
      'sagaLearnScreen.quizAdventureUI.generatingScene': 'Generating initial scene...',
      'sagaLearnScreen.quizAdventureUI.storyUnfolds': 'The story unfolds...',
      'sagaLearnScreen.quizAdventureUI.openDashboard': 'Open Dashboard'
    };
    
    let translation = fallbacks[key] || key;
    
    // Handle interpolation
    if (options) {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(new RegExp(`{{${optionKey}}}`, 'g'), String(options[optionKey]));
      });
    }
    
    return translation;
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string, correct: boolean} | null>(null);
  const [isDashboardOpen, setDashboardOpen] = useState(false);

  const handleChoice = async (choice: string) => {
    if (loading || feedback || scene.gameOver?.isGameOver) return;

    if (scene.isQuiz) {
      const isCorrect = choice === scene.correctAnswer;
      setSelectedAnswer(choice);
      setFeedback({ message: isCorrect ? translate('sagaLearnScreen.quizAdventureUI.correct') : translate('sagaLearnScreen.quizAdventureUI.incorrect'), correct: isCorrect });

      setTimeout(async () => {
        setLoading(true);
        setFeedback(null);
        setSelectedAnswer(null);
        const newScene = await engine.processTurn(choice);
        onSceneUpdate(newScene);
        setLoading(false);
      }, 2500);

    } else {
      setLoading(true);
      const newScene = await engine.processTurn(choice);
      onSceneUpdate(newScene);
      setLoading(false);
    }
  };
  
  const bossEncounterClass = 'border-2 border-red-500/50 rounded-lg shadow-lg shadow-red-500/20 animate-pulse';
  const mainContainerClass = `max-w-5xl mx-auto p-4 font-sans transition-all duration-500 ${scene.isBossEncounter ? bossEncounterClass : ''}`;

  if (scene.gameOver?.isGameOver) {
      return (
        <div className="flex items-center justify-center min-h-[80vh] text-center font-sans animate-fade-in">
            <div className={`p-8 rounded-lg ${scene.gameOver.isVictory ? 'bg-green-900/50' : 'bg-red-900/50'} border ${scene.gameOver.isVictory ? 'border-yellow-500' : 'border-red-500'} shadow-2xl`}>
                <div className="flex justify-center mb-4">
                    {scene.gameOver.isVictory ? <VictoryIcon /> : <DefeatIcon />}
                </div>
                <h2 className={`text-4xl font-bold ${scene.gameOver.isVictory ? 'text-yellow-300' : 'text-red-300'}`}>
                    {scene.gameOver.isVictory ? translate('sagaLearnScreen.quizAdventureUI.victory') : translate('sagaLearnScreen.quizAdventureUI.gameOver')}
                </h2>
                <p className="text-lg text-white mt-4 max-w-md">{scene.gameOver.message}</p>
                <button onClick={resetToStart} className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105">
                    {translate('sagaLearnScreen.quizAdventureUI.playAgain')}
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className={mainContainerClass}>
      <PlayerDashboard isOpen={isDashboardOpen} onClose={() => setDashboardOpen(false)} worldState={worldState} stats={scene.stats} />
      
      {/* Mission Info Header */}
      <div className="bg-gray-800/60 p-3 rounded-t-lg border-b border-gray-700 flex justify-between items-center mb-2">
          <div className="text-sm">
            <span className="font-bold text-yellow-300">{translate('sagaLearnScreen.quizAdventureUI.objective')}</span>
            <span className="ml-2 text-gray-300">{scene.missionObjective || translate('sagaLearnScreen.quizAdventureUI.survive')}</span>
          </div>
          <div className="text-sm font-semibold text-gray-300">
             {translate('sagaLearnScreen.quizAdventureUI.turnsRemaining', { count: scene.turnsRemaining?.toString() || '0' })}
          </div>
      </div>


      {/* Main Game Image & Stats */}
      <div className="relative mb-6 rounded-b-lg overflow-hidden shadow-2xl aspect-video bg-gray-800 border-2 border-gray-700">
        {scene.image ? (
          <img src={`data:image/jpeg;base64,${scene.image}`} alt="Game Scene" className="w-full h-full object-cover animate-fade-in" key={scene.image} />
        ) : <div className="w-full h-full flex items-center justify-center text-gray-400">{translate('sagaLearnScreen.quizAdventureUI.generatingScene')}</div>}
        
        {scene.stats && <StatsDisplay stats={scene.stats} />}

        <button onClick={() => setDashboardOpen(true)} className="absolute top-4 right-4 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 transition-colors" aria-label={translate('sagaLearnScreen.quizAdventureUI.openDashboard')}>
            <BackpackIcon />
        </button>

        {(loading || feedback) && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300">
            <div className="text-center text-white">
              {loading && !feedback && <Spinner />}
              {loading && !feedback && <p className="text-lg mt-4 animate-pulse">{translate('sagaLearnScreen.quizAdventureUI.storyUnfolds')}</p>}
              {feedback && (
                 <div className={`text-3xl font-bold ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                    {feedback.message}
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Narrative & Choices */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
        <p className="text-white text-lg leading-relaxed mb-6">{scene.narrative}</p>
        
        {scene.isQuiz && scene.quizQuestion && (
            <div className="mb-6 p-4 border border-purple-500 rounded-lg bg-purple-900/20">
                <h3 className="text-xl font-bold text-purple-300 mb-4">{scene.quizQuestion}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scene.quizOptions?.map((option, idx) => {
                        const isSelected = selectedAnswer === option;
                        let buttonClass = 'bg-purple-600 hover:bg-purple-700';
                        if (isSelected && feedback) {
                            buttonClass = feedback.correct ? 'bg-green-600' : 'bg-red-600';
                        } else if(feedback && option === scene.correctAnswer) {
                            buttonClass = 'bg-green-600';
                        }

                        return (
                            <button key={idx} onClick={() => handleChoice(option)} disabled={loading || !!feedback}
                                className={`p-4 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-wait ${buttonClass}`}>
                                {option}
                            </button>
                        )
                    })}
                </div>
            </div>
        )}

        {!scene.isQuiz && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scene.choices.map((choice, idx) => (
                <button key={idx} onClick={() => handleChoice(choice)} disabled={loading}
                    className="flex items-center p-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold transition-colors text-left">
                    {getActionIcon(choice)}
                    {choice}
                </button>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};