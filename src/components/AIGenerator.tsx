import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { useQuestions } from '../hooks/useQuestions';
import { useGeneratedApps } from '../hooks/useGeneratedApps';
import { EnhancedAIService } from '../services/enhancedAIService';
import { GenerationRequest, ContextSelection } from '../types/aiGenerator';
import { starterPrompts } from '../data/starterPrompts';
import StarterPromptCard from './StarterPromptCard';
import ContextSelector from './ContextSelector';
import ModelSelector from './ModelSelector';
import AppPreview from './AppPreview';
import SaveAppModal from './SaveAppModal';
import GeneratedAppsGallery from './GeneratedAppsGallery';
import AIOrchestrationHub from './AIOrchestrationHub';
import {
  SparklesIcon,
  PlayIcon,
  BookmarkIcon,
  FolderIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const AIGenerator = () => {
  const { t } = useLanguage();
  const [apiKey] = useLocalStorage('geminiApiKey', '');
  const { customQuestions } = useCustomQuestions();
  const { getCategories, allQuestions } = useQuestions();
  const { saveApp } = useGeneratedApps();
  
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState<ContextSelection>({
    includeCategories: false,
    includeMistakes: false
  });
  const [selectedModel, setSelectedModel] = useLocalStorage('selectedAIModel', 'gemini-2.5-pro');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentView, setCurrentView] = useState<'generator' | 'gallery' | 'orchestrator'>('generator');
  const [selectedStarterPrompt, setSelectedStarterPrompt] = useState<string | null>(null);

  const handleStarterPromptSelect = (promptId: string) => {
    const starter = starterPrompts.find(p => p.id === promptId);
    if (starter) {
      setPrompt(starter.prompt);
      setSelectedStarterPrompt(promptId);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      setError(t('aiGenerator.errors.apiKeyMissing'));
      return;
    }

    if (!prompt.trim()) {
      setError(t('aiGenerator.errors.promptMissing'));
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedHtml(null);

    try {
      const service = new EnhancedAIService(apiKey, selectedModel);
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        context,
        starterPromptId: selectedStarterPrompt || undefined
      };

      // Get user's mistakes (questions they got wrong)
      // In a real implementation, this would track actual user mistakes
      const mistakes = customQuestions.filter(() => false);

      const result = await service.generateApp(request, allQuestions, mistakes);

      if (result.success && result.htmlContent) {
        setGeneratedHtml(result.htmlContent);
      } else {
        setError(result.error || t('aiGenerator.errors.generationFailed'));
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(t('aiGenerator.errors.generationFailed'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveApp = (name: string, description: string) => {
    if (generatedHtml) {
      const starterPrompt = selectedStarterPrompt ? 
        starterPrompts.find(p => p.id === selectedStarterPrompt) : null;
      
      saveApp(
        name,
        description,
        generatedHtml,
        prompt,
        starterPrompt?.category
      );
      
      setShowSaveModal(false);
      setGeneratedHtml(null);
      setPrompt('');
      setSelectedStarterPrompt(null);
    }
  };

  if (currentView === 'gallery') {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{t('aiGenerator.gallery.title')}</h3>
          <button
            onClick={() => setCurrentView('generator')}
            className="btn btn-primary"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            {t('aiGenerator.buttons.createNew')}
          </button>
        </div>
        <GeneratedAppsGallery />
      </div>
    );
  }

  if (currentView === 'orchestrator') {
    return <AIOrchestrationHub onClose={() => setCurrentView('generator')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('generator')}
            className={`btn ${currentView === 'generator' ? 'btn-primary' : 'btn-ghost'}`}
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            {t('aiGenerator.tabs.generator')}
          </button>
          <button
            onClick={() => setCurrentView('gallery')}
            className={`btn ${String(currentView) === 'gallery' ? 'btn-primary' : 'btn-ghost'}`}
          >
            <FolderIcon className="w-5 h-5 mr-2" />
            {t('aiGenerator.tabs.gallery')}
          </button>
          <button
            onClick={() => setCurrentView('orchestrator')}
            className={`btn ${String(currentView) === 'orchestrator' ? 'btn-primary' : 'btn-ghost'}`}
          >
            <CpuChipIcon className="w-5 h-5 mr-2" />
            AI Orchestrator
          </button>
        </div>
      </div>

      {/* API Key Warning */}
      {!apiKey && (
        <div className="alert alert-warning">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <div>
            <h3 className="font-bold">{t('aiGenerator.apiKey.required')}</h3>
            <div className="text-xs">{t('aiGenerator.apiKey.instructions')}</div>
          </div>
        </div>
      )}

      {/* Starter Prompts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('aiGenerator.starterPrompts.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {starterPrompts.map((starter) => (
            <StarterPromptCard
              key={starter.id}
              prompt={starter}
              isSelected={selectedStarterPrompt === starter.id}
              onSelect={() => handleStarterPromptSelect(starter.id)}
            />
          ))}
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('aiGenerator.settings.title')}</h3>
        <button
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="btn btn-ghost btn-sm"
        >
          <Cog6ToothIcon className="w-4 h-4 mr-2" />
          {showAdvancedSettings ? t('aiGenerator.settings.hide') : t('aiGenerator.settings.show')}
        </button>
      </div>

      {/* Advanced Settings */}
      {showAdvancedSettings && (
        <div className="space-y-6 p-4 bg-base-200/50 rounded-lg">
          {/* Model Selection */}
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      )}

      {/* Context Selection */}
      <ContextSelector
        context={context}
        onChange={setContext}
        availableCategories={getCategories()}
      />

      {/* Prompt Input */}
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium mb-2">
          {t('aiGenerator.prompt.label')}
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder={t('aiGenerator.prompt.placeholder')}
        />
        <div className="text-xs text-base-content/60 mt-1">
          {t('aiGenerator.prompt.hint')}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !apiKey}
        className="btn btn-primary btn-lg w-full"
      >
        {isGenerating ? (
          <>
            <span className="loading loading-spinner loading-sm mr-2"></span>
            {t('aiGenerator.buttons.generating')}
          </>
        ) : (
          <>
            <PlayIcon className="w-5 h-5 mr-2" />
            {t('aiGenerator.buttons.generate')}
          </>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <span>{error}</span>
        </div>
      )}

      {/* Generated App Preview */}
      {generatedHtml && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t('aiGenerator.preview.title')}</h3>
            <button
              onClick={() => setShowSaveModal(true)}
              className="btn btn-success"
            >
              <BookmarkIcon className="w-5 h-5 mr-2" />
              {t('aiGenerator.buttons.save')}
            </button>
          </div>
          
          <AppPreview htmlContent={generatedHtml} />
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <SaveAppModal
          onSave={handleSaveApp}
          onCancel={() => setShowSaveModal(false)}
          suggestedName={selectedStarterPrompt ? 
            starterPrompts.find(p => p.id === selectedStarterPrompt)?.title || '' : 
            ''
          }
        />
      )}
    </div>
  );
};

export default AIGenerator;