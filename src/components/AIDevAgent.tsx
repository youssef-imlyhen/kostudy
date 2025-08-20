import React, { useState, useEffect, useRef } from 'react';
import { AIOrchestrator, GenerationRequest, OrchestrationResult, ConversationTurn, TaskStep } from '../services/aiOrchestrator';
import { useQuestions } from '../hooks/useQuestions';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { 
  CpuChipIcon, 
  UserIcon, 
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  SparklesIcon,
  PhotoIcon,
  CodeBracketIcon,
  EyeIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface AIDevAgentProps {
  apiKey: string;
  onResult: (result: OrchestrationResult) => void;
}

const AIDevAgent: React.FC<AIDevAgentProps> = ({ apiKey, onResult }) => {
  const { getCategories, allQuestions } = useQuestions();
  useCustomQuestions();
  
  const [orchestrator] = useState(() => new AIOrchestrator(apiKey));
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState<OrchestrationResult | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [preferences, setPreferences] = useState({
    includeImages: true,
    includeInteractivity: true,
    style: 'educational' as const,
    complexity: 'intermediate' as const
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const categories = getCategories();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleStartGeneration = async () => {
    if (!userInput.trim()) return;

    setIsProcessing(true);
    
    const request: GenerationRequest = {
      userPrompt: userInput,
      context: {
        categories: selectedCategories,
        userQuestions: allQuestions,
        mistakes: [] // Could be populated from user's mistake history
      },
      preferences
    };

    try {
      const result = await orchestrator.orchestrateGeneration(request);
      setCurrentResult(result);
      setConversationHistory(result.conversationHistory);
      onResult(result);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackInput.trim()) return;

    await orchestrator.respondToUserFeedback(feedbackInput);
    setConversationHistory(orchestrator.getConversationHistory());
    setFeedbackInput('');
  };

  const getStepIcon = (step: TaskStep) => {
    switch (step.type) {
      case 'text_generation':
        return <ChatBubbleLeftRightIcon className="w-5 h-5" />;
      case 'image_generation':
        return <PhotoIcon className="w-5 h-5" />;
      case 'app_generation':
        return <CodeBracketIcon className="w-5 h-5" />;
      case 'review':
        return <EyeIcon className="w-5 h-5" />;
      case 'refinement':
        return <ArrowPathIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  const getStepStatusColor = (status: TaskStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in_progress':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-base-content/60';
    }
  };

  const getStepStatusIcon = (status: TaskStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-success" />;
      case 'in_progress':
        return <ClockIcon className="w-4 h-4 text-warning animate-spin" />;
      case 'failed':
        return <ExclamationCircleIcon className="w-4 h-4 text-error" />;
      default:
        return <ClockIcon className="w-4 h-4 text-base-content/40" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
            <CpuChipIcon className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-base-content">AI Development Agent</h2>
            <p className="text-base-content/70">Multi-modal content orchestrator with intelligent planning</p>
          </div>
        </div>
      </div>

      {/* Request Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Describe what you want to create
          </label>
          <textarea
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="e.g., Create an interactive web page about photosynthesis with illustrations, diagrams, and a quiz game..."
            disabled={isProcessing}
          />
        </div>

        {/* Advanced Options */}
        <div className="collapse collapse-arrow bg-base-200">
          <input 
            type="checkbox" 
            checked={showAdvancedOptions}
            onChange={(e) => setShowAdvancedOptions(e.target.checked)}
          />
          <div className="collapse-title text-sm font-medium">
            Advanced Options & Context
          </div>
          <div className="collapse-content space-y-4">
            {/* Preferences */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <select
                  value={preferences.style}
                  onChange={(e) => setPreferences(prev => ({ ...prev, style: e.target.value as any }))}
                  className="select select-bordered w-full"
                >
                  <option value="educational">Educational</option>
                  <option value="gamified">Gamified</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Complexity</label>
                <select
                  value={preferences.complexity}
                  onChange={(e) => setPreferences(prev => ({ ...prev, complexity: e.target.value as any }))}
                  className="select select-bordered w-full"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.includeImages}
                  onChange={(e) => setPreferences(prev => ({ ...prev, includeImages: e.target.checked }))}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Include AI-generated images</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.includeInteractivity}
                  onChange={(e) => setPreferences(prev => ({ ...prev, includeInteractivity: e.target.checked }))}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Include interactive elements</span>
              </label>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Focus Categories (optional)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories(prev => [...prev, category]);
                        } else {
                          setSelectedCategories(prev => prev.filter(c => c !== category));
                        }
                      }}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleStartGeneration}
          disabled={isProcessing || !userInput.trim()}
          className="btn btn-primary btn-lg w-full"
        >
          {isProcessing ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              AI Agent Working...
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5 mr-2" />
              Start AI Development Process
            </>
          )}
        </button>
      </div>

      {/* Task Plan Visualization */}
      {currentResult?.taskPlan && (
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <SparklesIcon className="w-5 h-5 mr-2" />
            Task Plan: {currentResult.taskPlan.description}
          </h3>
          
          <div className="grid gap-3">
            {currentResult.taskPlan.steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                  step.status === 'completed' ? 'border-success bg-success/5' :
                  step.status === 'in_progress' ? 'border-warning bg-warning/5' :
                  step.status === 'failed' ? 'border-error bg-error/5' :
                  'border-base-300 bg-base-100'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`p-2 rounded-lg ${getStepStatusColor(step.status)}`}>
                    {getStepIcon(step)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{step.description}</span>
                    {getStepStatusIcon(step.status)}
                  </div>
                  <div className="text-xs text-base-content/60 mt-1">
                    Model: {step.model} • Step {index + 1} of {currentResult.taskPlan.steps.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-base-content/70">
            Estimated time: {currentResult.taskPlan.estimatedTime}s • 
            Complexity: {currentResult.taskPlan.complexity}
          </div>
        </div>
      )}

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <div className="bg-base-100 rounded-lg border border-base-300">
          <div className="p-4 border-b border-base-300">
            <h3 className="text-lg font-semibold flex items-center">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              AI Agent Conversation
            </h3>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto space-y-3">
            {conversationHistory.map((turn) => (
              <div
                key={turn.id}
                className={`flex space-x-3 ${
                  turn.type.startsWith('user') ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex space-x-3 max-w-[80%] ${
                  turn.type.startsWith('user') ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      turn.type.startsWith('user') ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {turn.type.startsWith('user') ? 
                        <UserIcon className="w-4 h-4 text-primary-content" /> :
                        <CpuChipIcon className="w-4 h-4 text-secondary-content" />
                      }
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    turn.type.startsWith('user') ? 
                      'bg-primary text-primary-content' : 
                      'bg-base-200 text-base-content'
                  }`}>
                    <div className="text-sm">{turn.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {turn.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Feedback Input */}
          {currentResult && !isProcessing && (
            <div className="p-4 border-t border-base-300">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Provide feedback or ask for modifications..."
                  className="input input-bordered flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleFeedbackSubmit()}
                />
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackInput.trim()}
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {currentResult && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-success mb-2">
            Generation Complete!
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium">Text Content</div>
              <div className="text-base-content/70">
                {currentResult.generatedContent.textContent?.length || 0} sections
              </div>
            </div>
            <div>
              <div className="font-medium">Images</div>
              <div className="text-base-content/70">
                {currentResult.generatedContent.images?.length || 0} generated
              </div>
            </div>
            <div>
              <div className="font-medium">Interactive App</div>
              <div className="text-base-content/70">
                {currentResult.generatedContent.htmlContent ? 'Generated' : 'None'}
              </div>
            </div>
            <div>
              <div className="font-medium">Conversation</div>
              <div className="text-base-content/70">
                {currentResult.conversationHistory.length} turns
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDevAgent;