import React, { useState } from 'react';
import { GameMode } from '../types';
import type { QuestionPack, WorldPreset, HeroPreset } from '../types';
import { worldPresets, questionPacks, heroPresets } from '../data/presets';
import { Spinner, CheckmarkIcon, GlobeIcon, UserIcon, BookIcon } from './icons';
import { CustomDropdown } from './CustomDropdown';

interface AdventureConfiguratorProps {
  mode: GameMode;
  onStart: (config: { worldTheme: string; heroDescription: string; questions?: QuestionPack['questions'], learningTopic?: QuestionPack['questions'] }) => void;
  loading: boolean;
  questionPacks?: QuestionPack[];
  t?: (key: string) => string;
}

const SelectionCard: React.FC<{preset: WorldPreset | HeroPreset, isSelected: boolean, onSelect: () => void}> = ({ preset, isSelected, onSelect }) => {

  return (
    <button onClick={onSelect}
        className={`relative p-5 rounded-xl text-left transition-all duration-200 border-2 text-white h-full
        ${isSelected ? 'bg-gray-700/50 border-teal-500 scale-105 shadow-lg shadow-teal-900/50' : 'bg-gray-800/60 border-gray-700 hover:border-teal-600 hover:bg-gray-700/80'}`}>
        
        {isSelected && <div className="absolute top-3 right-3 bg-teal-600 rounded-full p-1 shadow-md"><CheckmarkIcon /></div>}
        
        <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${isSelected ? 'bg-teal-500/20' : 'bg-gray-700'}`}>
                <preset.icon />
            </div>
            <div>
                <h3 className="font-bold text-lg">{preset.name}</h3>
                <p className="text-sm text-gray-300 mt-1">{preset.description}</p>
            </div>
        </div>
    </button>
  );
};

export const AdventureConfigurator: React.FC<AdventureConfiguratorProps> = ({ mode, onStart, loading, questionPacks: customQuestionPacks, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.adventureConfigurator.adventureAwaits': 'Adventure Awaits',
      'sagaLearnScreen.adventureConfigurator.adventureAwaitsDesc': 'Set the stage for your epic tale.',
      'sagaLearnScreen.adventureConfigurator.chooseWorld': 'Choose Your World',
      'sagaLearnScreen.adventureConfigurator.selectHero': 'Select a Hero',
      'sagaLearnScreen.adventureConfigurator.customHero': 'Custom Hero',
      'sagaLearnScreen.adventureConfigurator.customHeroDesc': 'Define your own protagonist from scratch.',
      'sagaLearnScreen.adventureConfigurator.customHeroPlaceholder': "e.g., 'A cunning rogue with a heart of gold'",
      'sagaLearnScreen.adventureConfigurator.selectKnowledgePack': 'Select a Knowledge Pack',
      'sagaLearnScreen.adventureConfigurator.optionalLearningQuest': 'Optional: Add a Learning Quest',
      'sagaLearnScreen.adventureConfigurator.justExploring': 'Just Exploring',
      'sagaLearnScreen.adventureConfigurator.justExploringDesc': 'A pure narrative adventure.',
      'sagaLearnScreen.adventureConfigurator.beginAdventure': 'Begin Adventure',
      'sagaLearnScreen.adventureConfigurator.selectOption': 'Select an option...'
    };
    return fallbacks[key] || key;
  });

  const availableQuestionPacks = customQuestionPacks && customQuestionPacks.length > 0 ? customQuestionPacks : questionPacks;
  const [selectedWorld, setSelectedWorld] = useState(worldPresets[0]);
  const [selectedPack, setSelectedPack] = useState<QuestionPack | null>(mode === GameMode.QUIZ_ADVENTURE ? availableQuestionPacks[0] : null);
  const [selectedHero, setSelectedHero] = useState<HeroPreset | null>(heroPresets[0]);
  const [customHeroDescription, setCustomHeroDescription] = useState('');
  const [selectedLearningPack, setSelectedLearningPack] = useState<QuestionPack | null>(null);

  const handleStart = () => {
    const heroPrompt = selectedHero ? selectedHero.prompt : customHeroDescription;
    const config: { worldTheme: string; heroDescription: string; questions?: QuestionPack['questions']; learningTopic?: QuestionPack['questions'] } = {
      worldTheme: selectedWorld.prompt,
      heroDescription: heroPrompt,
    };
    if (mode === GameMode.QUIZ_ADVENTURE) {
      config.questions = selectedPack!.questions;
    } else if (mode === GameMode.FREE_EXPLORATION && selectedLearningPack) {
      config.learningTopic = selectedLearningPack.questions;
    }
    onStart(config);
  };
  
  const stepHeader = (Icon: React.FC, text: string) => (
    <div className="flex items-center space-x-3 mb-5">
        <div className="p-2 bg-gray-700 rounded-full border border-gray-600">
            <Icon />
        </div>
        <h2 className="text-2xl font-semibold text-white">{text}</h2>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 font-sans animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white tracking-tight">{translate('sagaLearnScreen.adventureConfigurator.adventureAwaits')}</h1>
        <p className="text-xl text-gray-400 mt-3">{translate('sagaLearnScreen.adventureConfigurator.adventureAwaitsDesc')}</p>
      </div>

      <div className="space-y-12">
        <div>
          {stepHeader(GlobeIcon, translate('sagaLearnScreen.adventureConfigurator.chooseWorld'))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worldPresets.map(preset => (
              <SelectionCard key={preset.id} preset={preset} isSelected={selectedWorld.id === preset.id} onSelect={() => setSelectedWorld(preset)} />
            ))}
          </div>
        </div>

        <div>
           {stepHeader(UserIcon, translate('sagaLearnScreen.adventureConfigurator.selectHero'))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroPresets.map(preset => (
                    <SelectionCard key={preset.id} preset={preset} isSelected={selectedHero?.id === preset.id} onSelect={() => { setSelectedHero(preset); setCustomHeroDescription(''); }} />
                ))}
                 <button onClick={() => setSelectedHero(null)}
                    className={`relative p-5 rounded-xl text-left transition-all duration-200 border-2 text-white h-full
                    ${!selectedHero ? 'bg-gray-700/50 border-teal-500 scale-105 shadow-lg shadow-teal-900/50' : 'bg-gray-800/60 border-gray-700 hover:border-teal-600 hover:bg-gray-700/80'}`}>
                        {!selectedHero && <div className="absolute top-3 right-3 bg-teal-600 rounded-full p-1 shadow-md"><CheckmarkIcon /></div>}
                        <h3 className="font-bold text-lg">{translate('sagaLearnScreen.adventureConfigurator.customHero')}</h3>
                        <p className="text-sm text-gray-300 mt-1">{translate('sagaLearnScreen.adventureConfigurator.customHeroDesc')}</p>
                </button>
            </div>
            {!selectedHero && (
                 <div className="mt-4 animate-fade-in">
                    <input type="text" value={customHeroDescription} onChange={(e) => setCustomHeroDescription(e.target.value)}
                    placeholder={translate('sagaLearnScreen.adventureConfigurator.customHeroPlaceholder')}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    disabled={loading} />
                 </div>
            )}
        </div>

        {mode === GameMode.QUIZ_ADVENTURE && (
          <div>
            {stepHeader(BookIcon, translate('sagaLearnScreen.adventureConfigurator.selectKnowledgePack'))}
            <CustomDropdown
                options={availableQuestionPacks}
                selected={selectedPack}
                onSelect={(pack) => setSelectedPack(pack as QuestionPack)}
                t={t}
            />
          </div>
        )}

        {mode === GameMode.FREE_EXPLORATION && (
            <div>
                 {stepHeader(BookIcon, translate('sagaLearnScreen.adventureConfigurator.optionalLearningQuest'))}
                 <CustomDropdown
                    options={[{id: 'none', name: translate('sagaLearnScreen.adventureConfigurator.justExploring'), description: translate('sagaLearnScreen.adventureConfigurator.justExploringDesc'), icon: () => <></>}, ...availableQuestionPacks]}
                    selected={selectedLearningPack ?? {id: 'none', name: translate('sagaLearnScreen.adventureConfigurator.justExploring'), description: translate('sagaLearnScreen.adventureConfigurator.justExploringDesc'), icon: () => <></>}}
                    onSelect={(pack) => setSelectedLearningPack(pack.id === 'none' ? null : pack as QuestionPack)}
                    t={t}
                />
            </div>
        )}
      </div>
      
      <div className="text-center mt-16">
        <button
          onClick={handleStart}
          disabled={loading || (!selectedHero && !customHeroDescription.trim())}
          className="px-12 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-gray-500 disabled:to-gray-600 disabled:text-gray-300 text-white font-bold text-xl rounded-lg shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-105 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {loading ? <Spinner /> : translate('sagaLearnScreen.adventureConfigurator.beginAdventure')}
        </button>
      </div>
    </div>
  );
};