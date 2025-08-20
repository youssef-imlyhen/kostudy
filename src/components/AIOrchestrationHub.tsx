import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { OrchestrationResult } from '../services/aiOrchestrator';
import AIDevAgent from './AIDevAgent';
import AIResultsViewer from './AIResultsViewer';
import { 
  SparklesIcon,
  CpuChipIcon,
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

interface AIOrchestrationHubProps {
  onClose?: () => void;
}

const AIOrchestrationHub: React.FC<AIOrchestrationHubProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [geminiApiKey] = useLocalStorage('geminiApiKey', '');
  const [currentResult, setCurrentResult] = useState<OrchestrationResult | null>(null);
  const [resultHistory, setResultHistory] = useState<OrchestrationResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleResult = (result: OrchestrationResult) => {
    setCurrentResult(result);
    setResultHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const handleFeedback = (feedback: string) => {
    console.log('User feedback:', feedback);
    // This could trigger a new iteration with the AI agent
  };

  const handleSave = () => {
    if (currentResult) {
      // Save to localStorage or trigger download
      const dataStr = JSON.stringify(currentResult, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-orchestration-result-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleShare = () => {
    if (currentResult && navigator.share) {
      navigator.share({
        title: 'AI Generated Content',
        text: currentResult.taskPlan?.description || 'Check out this AI-generated content!',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      if (currentResult) {
        const shareText = `AI Generated Content: ${currentResult.taskPlan?.description || 'Multi-modal AI orchestration result'}`;
        navigator.clipboard.writeText(shareText).catch(console.error);
      }
    }
  };

  const loadHistoryResult = (result: OrchestrationResult) => {
    setCurrentResult(result);
    setShowHistory(false);
  };

  if (!geminiApiKey) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-200 rounded-lg p-8 text-center">
          <div className="p-4 bg-error/10 rounded-full w-fit mx-auto mb-4">
            <CpuChipIcon className="w-8 h-8 text-error" />
          </div>
          <h2 className="text-2xl font-bold mb-4">API Key Required</h2>
          <p className="text-base-content/70 mb-6">
            Please configure your Gemini API key in the AI Generator settings to use the AI Orchestration Hub.
          </p>
          {onClose && (
            <button onClick={onClose} className="btn btn-primary">
              Go to Settings
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="btn btn-circle btn-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
              )}
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Orchestration Hub</h1>
                  <p className="text-white/80 text-sm">
                    Multi-modal AI content generation with intelligent planning
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {resultHistory.length > 0 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="btn btn-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                  History ({resultHistory.length})
                </button>
              )}
              
              {currentResult && (
                <>
                  <button
                    onClick={handleSave}
                    className="btn btn-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="btn btn-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* AI Development Agent */}
          <div className="space-y-6">
            <AIDevAgent
              apiKey={geminiApiKey}
              onResult={handleResult}
            />
          </div>

          {/* Results Viewer */}
          <div className="space-y-6">
            {currentResult ? (
              <AIResultsViewer
                result={currentResult}
                onFeedback={handleFeedback}
                onSave={handleSave}
                onShare={handleShare}
              />
            ) : (
              <div className="bg-base-200 rounded-lg p-12 text-center">
                <div className="p-4 bg-base-300 rounded-full w-fit mx-auto mb-4">
                  <CpuChipIcon className="w-12 h-12 text-base-content/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready for AI Generation</h3>
                <p className="text-base-content/70">
                  Describe what you want to create using the AI Development Agent, and the results will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-base-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Generation History</h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="btn btn-circle btn-sm btn-ghost"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid gap-4">
                  {resultHistory.map((result, index) => (
                    <div
                      key={index}
                      className="bg-base-200 rounded-lg p-4 cursor-pointer hover:bg-base-300 transition-colors"
                      onClick={() => loadHistoryResult(result)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {result.taskPlan?.description || `Generation ${index + 1}`}
                          </h4>
                          <p className="text-sm text-base-content/70">
                            {result.generatedContent.textContent?.length || 0} text sections • 
                            {result.generatedContent.images?.length || 0} images • 
                            {result.generatedContent.htmlContent ? '1 app' : '0 apps'}
                          </p>
                        </div>
                        <div className="text-xs text-base-content/60">
                          {result.conversationHistory.length} turns
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIOrchestrationHub;