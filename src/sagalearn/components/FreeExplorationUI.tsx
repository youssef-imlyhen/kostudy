import React, { useState } from 'react';
import type { Scene, WorldState } from '../types';
import { FreeExplorationEngine } from '../services/geminiService';
import { Spinner, BackpackIcon, TalkIcon, MoveIcon, ExamineIcon, UseIcon, QuestionIcon } from './icons';
import { StatsDisplay } from './StatsDisplay';
import { PlayerDashboard } from './PlayerDashboard';


interface FreeExplorationUIProps {
  scene: Scene;
  engine: FreeExplorationEngine;
  onSceneUpdate: (scene: Scene) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  worldState: Partial<WorldState>;
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

export const FreeExplorationUI: React.FC<FreeExplorationUIProps> = ({ scene, engine, onSceneUpdate, loading, setLoading, worldState, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string, options?: Record<string, string | number>) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.freeExplorationUI.generatingScene': 'Generating initial scene...',
      'sagaLearnScreen.freeExplorationUI.worldResponds': 'The world responds...',
      'sagaLearnScreen.freeExplorationUI.openDashboard': 'Open Dashboard',
      'sagaLearnScreen.freeExplorationUI.suggestedReplies': 'Suggested Replies:',
      'sagaLearnScreen.freeExplorationUI.suggestions': 'Suggestions:',
      'sagaLearnScreen.freeExplorationUI.say': 'Say',
      'sagaLearnScreen.freeExplorationUI.go': 'Go',
      'sagaLearnScreen.freeExplorationUI.whatDoYouSay': 'What do you say to {{dialoguePartner}}?',
      'sagaLearnScreen.freeExplorationUI.whatDoYouDo': 'What do you do next?'
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

  const [inputText, setInputText] = useState("");
  const [isDashboardOpen, setDashboardOpen] = useState(false);

  const handleAction = async (action: string) => {
    if (!action.trim() || loading) return;
    setLoading(true);
    setInputText("");
    
    let newScene;
    if (scene.interactionMode === 'dialogue' && scene.dialoguePartner) {
        newScene = await engine.processDialogueTurn(action, scene.dialoguePartner);
    } else {
        newScene = await engine.processPlayerAction(action);
    }
    
    onSceneUpdate(newScene);
    setLoading(false);
  };

  const isDialogueMode = scene.interactionMode === 'dialogue';
  const placeholderText = isDialogueMode ? translate('sagaLearnScreen.freeExplorationUI.whatDoYouSay', { dialoguePartner: scene.dialoguePartner || '' }) : translate('sagaLearnScreen.freeExplorationUI.whatDoYouDo');
  const buttonText = isDialogueMode ? translate('sagaLearnScreen.freeExplorationUI.say') : translate('sagaLearnScreen.freeExplorationUI.go');

  return (
    <div className="max-w-5xl mx-auto p-4 font-sans">
        <PlayerDashboard isOpen={isDashboardOpen} onClose={() => setDashboardOpen(false)} worldState={worldState} stats={scene.stats} />

      {/* Main Game Image & Stats */}
      <div className="relative mb-6 rounded-lg overflow-hidden shadow-2xl aspect-video bg-gray-800 border-2 border-gray-700">
        {scene.image ? (
            <img src={`data:image/jpeg;base64,${scene.image}`} alt="Game Scene" className="w-full h-full object-cover animate-fade-in" key={scene.image} />
        ) : <div className="w-full h-full flex items-center justify-center text-gray-400">{translate('sagaLearnScreen.freeExplorationUI.generatingScene')}</div>}
        
        {scene.stats && <StatsDisplay stats={scene.stats} />}
        
        <button onClick={() => setDashboardOpen(true)} className="absolute top-4 right-4 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 transition-colors" aria-label={translate('sagaLearnScreen.freeExplorationUI.openDashboard')}>
            <BackpackIcon />
        </button>

        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center text-white">
              <Spinner />
              <p className="text-lg mt-4 animate-pulse">{translate('sagaLearnScreen.freeExplorationUI.worldResponds')}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Narrative */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700">
        <p className="text-white text-lg leading-relaxed">{scene.narrative}</p>
      </div>

      {/* Suggested Actions */}
      {scene.choices && scene.choices.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">{isDialogueMode ? translate('sagaLearnScreen.freeExplorationUI.suggestedReplies') : translate('sagaLearnScreen.freeExplorationUI.suggestions')}</p>
          <div className="flex flex-wrap gap-3">
            {scene.choices.map((choice, idx) => (
              <button key={idx} onClick={() => handleAction(choice)} disabled={loading}
                className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm text-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 font-sans">
                {getActionIcon(choice)}
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isDialogueMode ? <TalkIcon /> : <MoveIcon />}
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAction(inputText)}
          placeholder={placeholderText}
          disabled={loading}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-28 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition font-sans"
        />
        <button
          onClick={() => handleAction(inputText)}
          disabled={loading || !inputText.trim()}
          className="absolute inset-y-0 right-0 m-1.5 px-6 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 rounded-md text-white font-semibold transition-colors font-sans">
          {buttonText}
        </button>
      </div>
    </div>
  );
};