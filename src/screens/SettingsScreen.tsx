import { useNavigate } from 'react-router-dom';
import {
  InformationCircleIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EnvelopeIcon,
  ShareIcon,
  TrashIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  CpuChipIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage, languages, Language } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { useTheme } from '../context/ThemeContext';
import { Question } from '../types/question';
import Header from '../components/Header';
import soundManager from '../utils/soundManager';
import { ChatMessage } from '../hooks/useChat';
import { GeneratedApp } from '../types/aiGenerator';

interface Progress {
  [key: string]: {
    [key: string]: {
      completed: number;
      correct: number;
    };
  };
}

interface Mistakes {
  [key: string]: Array<{
    questionId: string;
    category: string;
    difficulty: string;
    selectedAnswer: string;
    timestamp: number;
  }>;
}

interface UserData {
  username: string;
  progress: Progress;
  mistakes: Mistakes;
  customQuestions: Question[];
  // Optional cross-feature data
  chatHistory?: ChatMessage[];
  generatedApps?: GeneratedApp[];
  customEmojis?: Record<string, string>;
  aiSettings?: {
    apiKey?: string;
    selectedModel?: string;
  };
  sagaLearnSave?: any;
  preferences?: {
    theme?: string;
    soundEnabled?: boolean;
    language?: string;
  };
  timestamp: number;
}

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { username } = useUser();
  const { language, setLanguage, t } = useLanguage();
  const [progress] = useLocalStorage<Progress>('quizProgress', {});
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const { customQuestions } = useCustomQuestions();
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useLocalStorage<string>('geminiApiKey', '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAiSettingsModal, setShowAiSettingsModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('soundEnabled', true);

  // Initialize sound manager with current setting
  useEffect(() => {
    soundManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleExport = () => {
    // Gather optional persisted data safely
    const customEmojis = JSON.parse(localStorage.getItem('customCategoryEmojis') || '{}');
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]') as ChatMessage[];
    const generatedApps = JSON.parse(localStorage.getItem('generatedApps') || '[]') as GeneratedApp[];
    const sagaLearnSave = JSON.parse(localStorage.getItem('freeExplorationSave') || 'null');
    const selectedModel = localStorage.getItem('selectedAIModel') || undefined;
    const storedTheme = localStorage.getItem('theme') || theme;
    const storedSoundEnabled = localStorage.getItem('soundEnabled');
    const soundPref = storedSoundEnabled !== null ? storedSoundEnabled === 'true' : soundEnabled;

    const data: UserData = {
      username,
      progress,
      mistakes,
      customQuestions,
      customEmojis,
      chatHistory,
      generatedApps,
      sagaLearnSave: sagaLearnSave ?? undefined,
      aiSettings: {
        apiKey,
        selectedModel,
      },
      preferences: {
        theme: storedTheme,
        soundEnabled: soundPref,
        language,
      },
      timestamp: Date.now(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data: UserData = JSON.parse(text);

        // Validate minimal data structure
        if (!data.username || !data.progress || !data.mistakes || !data.customQuestions || !data.timestamp) {
          throw new Error('Invalid data format');
        }

        // Required stores
        localStorage.setItem('quizProgress', JSON.stringify(data.progress));
        localStorage.setItem('quizMistakes', JSON.stringify(data.mistakes));
        localStorage.setItem('customQuizQuestions', JSON.stringify(data.customQuestions));

        // Optional: custom emojis
        if (data.customEmojis) {
          localStorage.setItem('customCategoryEmojis', JSON.stringify(data.customEmojis));
        }

        // Optional: chat history
        if (data.chatHistory) {
          localStorage.setItem('chatHistory', JSON.stringify(data.chatHistory));
        }

        // Optional: generated apps
        if (data.generatedApps) {
          localStorage.setItem('generatedApps', JSON.stringify(data.generatedApps));
        }

        // Optional: SagaLearn save
        if (data.sagaLearnSave) {
          localStorage.setItem('freeExplorationSave', JSON.stringify(data.sagaLearnSave));
        }

        // Optional: AI settings
        if (data.aiSettings?.apiKey !== undefined) {
          localStorage.setItem('geminiApiKey', data.aiSettings.apiKey || '');
        }
        if (data.aiSettings?.selectedModel) {
          localStorage.setItem('selectedAIModel', data.aiSettings.selectedModel);
        }

        // Optional: preferences
        if (data.preferences?.theme) {
          localStorage.setItem('theme', data.preferences.theme);
        }
        if (typeof data.preferences?.soundEnabled === 'boolean') {
          localStorage.setItem('soundEnabled', JSON.stringify(data.preferences.soundEnabled));
        }
        if (data.preferences?.language) {
          setLanguage(data.preferences.language as Language);
        }

        // Reload the page to reflect changes
        window.location.reload();
      } catch (error) {
        alert('Error importing data. Please make sure the file is valid.');
      }
    };
    input.click();
  };

  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    soundManager.setSoundEnabled(newSoundEnabled);
  };

  const settingsOptions = [
    {
      id: 'theme',
      label: t('settingsScreen.theme'),
      icon: theme === 'light' ? MoonIcon : SunIcon,
      path: '#',
      onClick: toggleTheme
    },
    {
      id: 'sound',
      label: t('settingsScreen.sound'),
      icon: soundEnabled ? SpeakerWaveIcon : SpeakerXMarkIcon,
      path: '#',
      onClick: toggleSound
    },
    {
      id: 'ai-settings',
      label: t('settingsScreen.aiSettings'),
      icon: CpuChipIcon,
      path: '#',
      onClick: () => setShowAiSettingsModal(true)
    },
    {
      id: 'about',
      label: t('settingsScreen.about'),
      icon: InformationCircleIcon,
      path: '/about',
      onClick: () => navigate('/about')
    },
    {
      id: 'import',
      label: t('settingsScreen.import'),
      icon: ArrowDownTrayIcon,
      path: '#',
      onClick: handleImport
    },
    {
      id: 'export',
      label: t('settingsScreen.export'),
      icon: ArrowUpTrayIcon,
      path: '#',
      onClick: handleExport
    },
    {
      id: 'contact',
      label: t('settingsScreen.contact'),
      icon: EnvelopeIcon,
      path: '/contact',
      onClick: () => navigate('/contact')
    },
    {
      id: 'share',
      label: t('settingsScreen.share'),
      icon: ShareIcon,
      path: '/share',
      onClick: () => navigate('/share')
    },
    {
      id: 'reset',
      label: t('settingsScreen.reset'),
      icon: TrashIcon,
      path: '#',
      onClick: () => {
        try {
          // Core app data
          localStorage.removeItem('quizProgress');
          localStorage.removeItem('quizMistakes');
          localStorage.removeItem('quizUsername');
          localStorage.removeItem('customQuizQuestions');

          // Preferences and settings
          localStorage.removeItem('theme');
          localStorage.removeItem('geminiApiKey');
          localStorage.removeItem('soundEnabled');
          localStorage.removeItem('selectedAIModel');
          localStorage.removeItem('customCategoryEmojis');

          // AI chat and AI App Studio
          localStorage.removeItem('chatHistory');
          localStorage.removeItem('generatedApps');

          // SagaLearn
          localStorage.removeItem('freeExplorationSave');

          // Clean up any generated in-app data saved by AIHelper (ai_app_* keys)
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('ai_app_')) {
              keysToRemove.push(k);
            }
          }
          keysToRemove.forEach(k => localStorage.removeItem(k));
        } finally {
          window.location.reload();
        }
      }
    },
  ];

  return (
    <div className="pt-4 pb-20">
      <Header title={t('settingsScreen.title')} />

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <span className="text-primary text-3xl font-medium">
            {username?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <span className="text-lg font-medium text-base-content">{username}</span>
      </div>

      {/* Language Selector */}
      <div className="px-4 space-y-2 mb-6">
        <div className="w-full flex items-center p-4 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
            <GlobeAltIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-base-content mr-4">{t('settingsScreen.language')}</span>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="select select-bordered select-sm flex-grow max-w-xs ml-auto"
          >
            {Object.keys(languages).map((langCode) => (
              <option key={langCode} value={langCode}>
                {languages[langCode as Language].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Settings Options */}
      <div className="px-4 space-y-2">
        {settingsOptions.map(({ id, label, icon: Icon, onClick }) => (
          <button
            key={id}
            onClick={onClick}
            className="w-full flex items-center p-4 bg-base-100 rounded-2xl border border-base-300 shadow-sm
                     hover:shadow-elevated transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-base-content">{label}</span>
            {id === 'theme' && (
              <span className="ml-auto text-base-content/60">
                {theme === 'light' ? t('settingsScreen.darkMode') : t('settingsScreen.lightMode')}
              </span>
            )}
            {id === 'sound' && (
              <span className="ml-auto text-base-content/60">
                {soundEnabled ? t('settingsScreen.soundOn') : t('settingsScreen.soundOff')}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 px-4">
        <div className="bg-base-100 rounded-2xl p-4 border border-base-300 shadow-sm">
          <h3 className="text-sm font-medium text-base-content/60 mb-2">{t('settingsScreen.progressSummary')}</h3>
          <div className="space-y-1 text-sm text-base-content/80">
            <p>{t('settingsScreen.categories')}: {Object.keys(progress).length}</p>
            <p>{t('settingsScreen.mistakes')}: {Object.values(mistakes).reduce((sum, arr) => sum + arr.length, 0)}</p>
            <p>{t('settingsScreen.lastUpdated')}: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="mt-8 text-center text-sm text-base-content/50">
        Version 1.0.0
      </div>
      
      {/* AI Settings Modal */}
      {showAiSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-base-100 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-base-content">{t('settingsScreen.aiGenerationSettings')}</h3>
              <button
                onClick={() => setShowAiSettingsModal(false)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1 text-base-content">
                Gemini API Key
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type={showApiKey ? "text" : "password"}
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="input input-bordered flex-grow"
                  placeholder="Enter your Gemini API key"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="btn btn-outline"
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="mt-2 text-xs text-base-content/70">
                Your key is stored only in your browser. Get a free key at{' '}
                <a
                  href="https://ai.dev/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  ai.google.dev
                </a>
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setApiKey('');
                  localStorage.removeItem('geminiApiKey');
                }}
                className="btn btn-ghost rounded-2xl"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('geminiApiKey', apiKey);
                  setShowAiSettingsModal(false);
                }}
                className="btn btn-primary rounded-2xl border-b-4 border-primary-focus
                          hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
                disabled={!apiKey}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
