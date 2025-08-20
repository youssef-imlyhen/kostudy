import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GameMode } from './types';
import type { Scene, Question, WorldPreset, QuestionPack, HeroPreset, WorldState } from './types';
import { QuizAdventureUI } from './components/QuizAdventureUI';
import { FreeExplorationUI } from './components/FreeExplorationUI';
import { ContinuePrompt } from './components/ContinuePrompt';
import { GameModeSelector } from './components/GameModeSelector';
import { AdventureConfigurator } from './components/AdventureConfigurator';
import { QuizAdventureEngine, FreeExplorationEngine } from './services/geminiService';
import { Spinner } from './components/icons';

const SAVE_KEY = 'freeExplorationSave';

type AppStep = 'mode_selection' | 'continue_prompt' | 'adventure_config' | 'playing';

interface GameConfig {
  worldTheme: string;
  heroDescription: string;
  questions?: Question[];
  learningTopic?: Question[];
}

const App: React.FC = () => {
  const [appStep, setAppStep] = useState<AppStep>('mode_selection');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [gameEngine, setGameEngine] = useState<QuizAdventureEngine | FreeExplorationEngine | null>(null);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [worldState, setWorldState] = useState<Partial<WorldState>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('geminiApiKey') || '';
    setApiKey(savedApiKey);
    if (!savedApiKey) {
      setShowApiKeyInput(true);
    }
  }, []);

  const savedGameExists = useMemo(() => {
    try {
      return localStorage.getItem(SAVE_KEY) !== null;
    } catch {
      return false;
    }
  }, [appStep]);

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
  }

  const handleApiKeySubmit = () => {
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey);
      setShowApiKeyInput(false);
    }
  };

  const handleInitializationError = (e: any) => {
    console.error("Initialization failed:", e);
    setError("Failed to start the adventure. The ancient spirits might be displeased. Please check your API key and try again.");
    setAppStep('mode_selection');
  }

  const startAdventure = useCallback(async (config: GameConfig) => {
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
  }, [gameMode]);

  const handleContinue = () => {
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
  }

  const renderContent = () => {
    if (showApiKeyInput) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white p-4 font-sans">
          <h2 className="text-2xl font-bold mb-4">API Key Required</h2>
          <p className="text-gray-300 max-w-md mb-6">
            Please enter your Gemini API key to use SagaLearn. You can get a free API key from the Google AI Studio.
          </p>
          <div className="w-full max-w-md">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none mb-4"
            />
            <button
              onClick={handleApiKeySubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={!apiKey}
            >
              Save API Key
            </button>
          </div>
        </div>
      );
    }

    if (error) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center text-white p-4 font-sans">
              <h2 className="text-2xl font-bold text-red-500 mb-4">An Error Occurred</h2>
              <p className="text-red-300 max-w-md">{error}</p>
               <button onClick={resetToStart} className="mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                  Back to Start
              </button>
          </div>
      );
    }

    switch(appStep) {
      case 'mode_selection':
        return <GameModeSelector onSelect={handleModeSelect} />;

      case 'continue_prompt':
        return <ContinuePrompt onContinue={handleContinue} onStartOver={handleStartOver} />;
      
      case 'adventure_config':
        return <AdventureConfigurator mode={gameMode!} onStart={startAdventure} loading={loading} />;
      
      case 'playing':
        if (loading && !currentScene) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white font-sans">
              <Spinner />
              <p className="mt-4 text-xl">Crafting your world...</p>
            </div>
          );
        }
        if (currentScene && gameEngine) {
            const handleSceneUpdate = (scene: Scene) => updateGameState(scene, gameEngine);
            if (gameMode === GameMode.QUIZ_ADVENTURE) {
                return <QuizAdventureUI scene={currentScene} engine={gameEngine as QuizAdventureEngine} onSceneUpdate={handleSceneUpdate} loading={loading} setLoading={setLoading} worldState={worldState} resetToStart={resetToStart}/>;
            }
            if (gameMode === GameMode.FREE_EXPLORATION) {
                return <FreeExplorationUI scene={currentScene} engine={gameEngine as FreeExplorationEngine} onSceneUpdate={handleSceneUpdate} loading={loading} setLoading={setLoading} worldState={worldState} />;
            }
        }
        return null; 
      
      default:
        return <button onClick={resetToStart} className="font-sans">Return to Start</button>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-serif">
      <header className="py-3 bg-gray-800/30 text-center relative z-40 backdrop-blur-sm font-sans">
              <h1 className="text-2xl font-bold tracking-wider text-white" role="button" onClick={resetToStart} style={{ cursor: 'pointer' }}>
                  SagaLearn
              </h1>
            </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;