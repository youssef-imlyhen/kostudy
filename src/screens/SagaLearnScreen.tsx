import React, { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useQuestions } from '../hooks/useQuestions';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { Question as MainAppQuestion } from '../types/question';

// Import sagalearn components and types
import { GameMode } from '../sagalearn/types';
import type { Scene, Question as SagaQuestion, QuestionPack, WorldState } from '../sagalearn/types';
import { QuizAdventureUI } from '../sagalearn/components/QuizAdventureUI';
import { FreeExplorationUI } from '../sagalearn/components/FreeExplorationUI';
import { ContinuePrompt } from '../sagalearn/components/ContinuePrompt';
import { GameModeSelector } from '../sagalearn/components/GameModeSelector';
import { AdventureConfigurator } from '../sagalearn/components/AdventureConfigurator';
import { QuizAdventureEngine, FreeExplorationEngine } from '../sagalearn/services/geminiService';
import { Spinner } from '../sagalearn/components/icons';

const SAVE_KEY = 'freeExplorationSave';

type AppStep = 'mode_selection' | 'continue_prompt' | 'adventure_config' | 'playing';

interface GameConfig {
  worldTheme: string;
  heroDescription: string;
  questions?: SagaQuestion[];
  learningTopic?: SagaQuestion[];
}

// Helper function to convert main app questions to sagalearn format
const convertToSagaQuestion = (question: MainAppQuestion): SagaQuestion | null => {
  let answer: string;
  let wrongOptions: string[] = [];

  switch (question.type) {
    case 'multiple-choice':
      if (typeof question.correctAnswer === 'string') {
        answer = question.correctAnswer;
        wrongOptions = question.options.filter(opt => opt !== question.correctAnswer);
      } else {
        // Handle multi-select - take first correct answer for simplicity
        answer = Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : '';
        wrongOptions = question.options.filter(opt => !question.correctAnswer.includes(opt));
      }
      break;
    case 'true-false':
      answer = question.correctAnswer ? 'True' : 'False';
      wrongOptions = [question.correctAnswer ? 'False' : 'True'];
      break;
    case 'fill-in-the-blank':
      answer = question.correctAnswer;
      // Generate some plausible wrong options for fill-in-the-blank
      wrongOptions = ['Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3'];
      break;
    default:
      return null;
  }

  return {
    topic: question.category,
    question: question.question,
    answer,
    wrongOptions
  };
};

const SagaLearnScreen: React.FC = () => {
  const { t } = useLanguage();
  const [apiKey] = useLocalStorage('geminiApiKey', '');
  const { getCategories, allQuestions } = useQuestions();
  const [mistakes] = useLocalStorage<any>('quizMistakes', {});
  
  const [appStep, setAppStep] = useState<AppStep>('mode_selection');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [gameEngine, setGameEngine] = useState<QuizAdventureEngine | FreeExplorationEngine | null>(null);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [worldState, setWorldState] = useState<Partial<WorldState>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savedGameExists = useMemo(() => {
    try {
      return localStorage.getItem(SAVE_KEY) !== null;
    } catch {
      return false;
    }
  }, [appStep]);

  // Transform main app data into sagalearn format
  const transformedQuestionPacks = useMemo(() => {
    const categories = getCategories();
    const packs: QuestionPack[] = [];

    // Add category-based question packs
    categories.forEach(category => {
      const categoryQuestions = allQuestions.filter(q => q.category === category);
      if (categoryQuestions.length > 0) {
        const convertedQuestions = categoryQuestions
          .map(convertToSagaQuestion)
          .filter(Boolean) as SagaQuestion[];
        
        if (convertedQuestions.length > 0) {
          packs.push({
            id: `category_${category.toLowerCase().replace(/\s+/g, '_')}`,
            name: category,
            description: `Learn about ${category}`,
            questions: convertedQuestions,
            icon: () => <span>📚</span>
          });
        }
      }
    });

    // Add mistakes pack if there are any
    const allMistakes = Object.values(mistakes).flat() as any[];
    if (allMistakes.length > 0) {
      const mistakeQuestions = allMistakes.map(mistake => {
        const question = allQuestions.find(q => q.id === mistake.questionId);
        return question ? convertToSagaQuestion(question) : null;
      }).filter(Boolean) as SagaQuestion[];

      if (mistakeQuestions.length > 0) {
        packs.push({
          id: 'mistakes',
          name: 'My Mistakes',
          description: 'Review questions you got wrong',
          questions: mistakeQuestions,
          icon: () => <span>❌</span>
        });
      }
    }

    return packs;
  }, [allQuestions, mistakes, getCategories]);

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === GameMode.FREE_EXPLORATION && savedGameExists) {
      setAppStep('continue_prompt');
    } else {
      setAppStep('adventure_config');
    }
  };

  const updateGameState = (scene: Scene, engine: QuizAdventureEngine | FreeExplorationEngine) => {
    setCurrentScene(scene);
    // @ts-ignore
    const newWorldState = engine.worldState;
    setWorldState(newWorldState);

    if (gameMode === GameMode.FREE_EXPLORATION) {
      try {
        const stateToSave = (engine as FreeExplorationEngine).getStateForSaving(scene);
        localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.error("Failed to save game state:", e);
      }
    }
  };

  const handleInitializationError = (e: any) => {
    console.error("Initialization failed:", e);
    setError("Failed to start the adventure. Please check your API key and try again.");
    setAppStep('mode_selection');
  };

  const startAdventure = useCallback(async (config: GameConfig) => {
    if (!apiKey) {
      setError("Please set your Gemini API key in Settings first.");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentScene(null);
    setAppStep('playing');

    try {
      if (gameMode === GameMode.QUIZ_ADVENTURE) {
        const engine = new QuizAdventureEngine(apiKey);
        setGameEngine(engine);
        const initialScene = await engine.initializeMission(config.worldTheme, config.questions!, config.heroDescription);
        updateGameState(initialScene, engine);
      } else if (gameMode === GameMode.FREE_EXPLORATION) {
        if (localStorage.getItem(SAVE_KEY)) {
          localStorage.removeItem(SAVE_KEY);
        }
        const engine = new FreeExplorationEngine(apiKey);
        setGameEngine(engine);
        const initialScene = await engine.initializeWorld(config.worldTheme, config.heroDescription, config.learningTopic);
        updateGameState(initialScene, engine);
      }
    } catch (e) {
      handleInitializationError(e);
    } finally {
      setLoading(false);
    }
  }, [gameMode, apiKey]);

  const handleContinue = () => {
    if (!apiKey) {
      setError("Please set your Gemini API key in Settings first.");
      return;
    }

    setLoading(true);
    setGameMode(GameMode.FREE_EXPLORATION);
    setAppStep('playing');
    try {
      const savedData = JSON.parse(localStorage.getItem(SAVE_KEY)!);
      const engine = new FreeExplorationEngine(apiKey);
      const loadedScene = engine.loadState(savedData);
      setGameEngine(engine);
      updateGameState(loadedScene, engine);
    } catch (e) {
      console.error("Failed to load saved game:", e);
      setError("Your saved adventure seems corrupted. We have to start a new one.");
      localStorage.removeItem(SAVE_KEY);
      setAppStep('adventure_config');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    localStorage.removeItem(SAVE_KEY);
    setAppStep('adventure_config');
  };

  const resetToStart = () => {
    setError(null);
    setGameMode(null);
    setCurrentScene(null);
    setGameEngine(null);
    setWorldState({});
    setAppStep('mode_selection');
  };

  const renderContent = () => {
    if (!apiKey) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="alert alert-warning max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold">API Key Required</h3>
              <div className="text-xs">Please set your Gemini API key in Settings to use SagaLearn.</div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Error</h3>
              <div className="text-xs">{error}</div>
            </div>
          </div>
          <button onClick={resetToStart} className="btn btn-primary mt-4">
            Back to Start
          </button>
        </div>
      );
    }

    switch(appStep) {
      case 'mode_selection':
        return <GameModeSelector onSelect={handleModeSelect} t={t} />;
      
      case 'continue_prompt':
        return <ContinuePrompt onContinue={handleContinue} onStartOver={handleStartOver} t={t} />;
      
      case 'adventure_config':
        return (
          <AdventureConfigurator
            mode={gameMode!}
            onStart={startAdventure}
            loading={loading}
            questionPacks={transformedQuestionPacks}
            t={t}
          />
        );
      
      case 'playing':
        if (loading && !currentScene) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <Spinner />
              <p className="mt-4 text-xl">{t('sagaLearnScreen.craftingWorld')}</p>
            </div>
          );
        }
        if (currentScene && gameEngine) {
          const handleSceneUpdate = (scene: Scene) => updateGameState(scene, gameEngine);
          if (gameMode === GameMode.QUIZ_ADVENTURE) {
            return (
              <QuizAdventureUI
                scene={currentScene}
                engine={gameEngine as QuizAdventureEngine}
                onSceneUpdate={handleSceneUpdate}
                loading={loading}
                setLoading={setLoading}
                worldState={worldState}
                resetToStart={resetToStart}
                t={t}
              />
            );
          }
          if (gameMode === GameMode.FREE_EXPLORATION) {
            return (
              <FreeExplorationUI
                scene={currentScene}
                engine={gameEngine as FreeExplorationEngine}
                onSceneUpdate={handleSceneUpdate}
                loading={loading}
                setLoading={setLoading}
                worldState={worldState}
                t={t}
              />
            );
          }
        }
        return null;
      
      default:
        return <button onClick={resetToStart}>{t('sagaLearnScreen.backToStart')}</button>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header title={t('sagaLearnScreen.title')} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default SagaLearnScreen;