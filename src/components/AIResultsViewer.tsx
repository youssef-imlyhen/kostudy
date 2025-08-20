import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OrchestrationResult } from '../services/aiOrchestrator';
import { 
  DocumentTextIcon,
  PhotoIcon,
  CodeBracketIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CpuChipIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface AIResultsViewerProps {
  result: OrchestrationResult;
  onFeedback?: (feedback: string) => void;
  onSave?: () => void;
  onShare?: () => void;
}

const AIResultsViewer: React.FC<AIResultsViewerProps> = ({ 
  result, 
  onFeedback, 
  onSave, 
  onShare 
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'content' | 'images' | 'app' | 'metadata'>('content');
  const [isLiked, setIsLiked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [imageZoom, setImageZoom] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { generatedContent, taskPlan, conversationHistory } = result;
  const metadata = generatedContent.metadata;

  // Filter content based on search
  const filteredTextContent = generatedContent.textContent?.filter(section =>
    section.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadContent = () => {
    const content = generatedContent.textContent?.join('\n\n---\n\n') || '';
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-generated-content-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadApp = () => {
    if (!generatedContent.htmlContent) return;
    
    const blob = new Blob([generatedContent.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-generated-app-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImageDownload = (imageUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `ai-generated-image-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim() && onFeedback) {
      onFeedback(feedbackText);
      setFeedbackText('');
      setShowFeedback(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'content':
        return generatedContent.textContent?.length || 0;
      case 'images':
        return generatedContent.images?.length || 0;
      case 'app':
        return generatedContent.htmlContent ? 1 : 0;
      case 'metadata':
        return Object.keys(metadata || {}).length;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-base-100 rounded-lg border border-base-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <SparklesIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                AI Generated Content
              </h2>
              <p className="text-base-content/70">
                {taskPlan?.description || 'Multi-modal AI orchestration result'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`btn btn-circle btn-sm ${isLiked ? 'btn-error' : 'btn-ghost'}`}
            >
              {isLiked ? 
                <HeartSolidIcon className="w-4 h-4" /> : 
                <HeartIcon className="w-4 h-4" />
              }
            </button>
            
            {onShare && (
              <button onClick={onShare} className="btn btn-circle btn-sm btn-ghost">
                <ShareIcon className="w-4 h-4" />
              </button>
            )}
            
            {onSave && (
              <button onClick={onSave} className="btn btn-circle btn-sm btn-ghost">
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Generation Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Duration</span>
            </div>
            <div className="text-lg font-bold mt-1">
              {formatDuration(metadata?.generationTime || 0)}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <CpuChipIcon className="w-4 h-4 text-green-400" />
              <span className="font-medium">Models Used</span>
            </div>
            <div className="text-lg font-bold mt-1">
              {metadata?.modelsUsed?.length || 0}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="w-4 h-4 text-purple-400" />
              <span className="font-medium">Conversations</span>
            </div>
            <div className="text-lg font-bold mt-1">
              {conversationHistory.length}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-4 h-4 text-success" />
              <span className="font-medium">Quality Score</span>
            </div>
            <div className="text-lg font-bold mt-1">
              {metadata?.qualityScore || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-base-300">
        {[
          { key: 'content', label: 'Text Content', icon: DocumentTextIcon },
          { key: 'images', label: 'Images', icon: PhotoIcon },
          { key: 'app', label: 'Interactive App', icon: CodeBracketIcon },
          { key: 'metadata', label: 'Details', icon: EyeIcon }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === key
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {getTabCount(key) > 0 && (
              <span className="badge badge-sm badge-primary">
                {getTabCount(key)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Search Bar */}
        {(activeTab === 'content' || activeTab === 'images') && (
          <div className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>
        )}

        {/* Text Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {filteredTextContent.length === 0 ? (
              <div className="text-center py-12 text-base-content/60">
                <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No text content generated</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Generated Text Content ({filteredTextContent.length})
                  </h3>
                  <button
                    onClick={handleDownloadContent}
                    className="btn btn-sm btn-outline"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                    Download All
                  </button>
                </div>

                {filteredTextContent.map((section, index) => (
                  <div key={index} className="bg-base-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold">Section {index + 1}</h4>
                      <button
                        onClick={() => handleCopyToClipboard(section)}
                        className="btn btn-sm btn-ghost"
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap">{section}</div>
                    </div>
                    
                    {metadata && (
                      <div className="mt-4 text-xs text-base-content/60">
                        Generated with AI • {new Date().toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            {!generatedContent.images || generatedContent.images.length === 0 ? (
              <div className="text-center py-12 text-base-content/60">
                <PhotoIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No images generated</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Generated Images ({generatedContent.images.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedContent.images.map((imageUrl, index) => (
                    <div key={index} className="bg-base-200 rounded-lg overflow-hidden">
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-48 object-cover cursor-pointer transition-transform group-hover:scale-105"
                          onClick={() => setImageZoom(imageUrl)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setImageZoom(imageUrl)}
                            className="btn btn-circle btn-sm bg-white/20 border-white/30"
                          >
                            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-base-content/60">
                            AI Generated Image
                          </span>
                          <button
                            onClick={() => handleImageDownload(imageUrl, index)}
                            className="btn btn-xs btn-outline"
                          >
                            <ArrowDownTrayIcon className="w-3 h-3 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Interactive App Tab */}
        {activeTab === 'app' && (
          <div className="space-y-6">
            {!generatedContent.htmlContent ? (
              <div className="text-center py-12 text-base-content/60">
                <CodeBracketIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No interactive app generated</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Interactive Application</h3>
                  <button
                    onClick={handleDownloadApp}
                    className="btn btn-sm btn-outline"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                    Download HTML
                  </button>
                </div>

                <div className="bg-base-200 rounded-lg p-4">
                  <div className="bg-white rounded-lg border-2 border-base-300 overflow-hidden">
                    <div className="bg-base-300 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-base-content/70">AI Generated App</span>
                    </div>
                    
                    <iframe
                      ref={iframeRef}
                      srcDoc={generatedContent.htmlContent}
                      className="w-full h-96 border-0"
                      title="Generated Interactive App"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Metadata Tab */}
        {activeTab === 'metadata' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Generation Details</h3>
            
            <div className="grid gap-6">
              {/* Task Plan */}
              {taskPlan && (
                <div className="bg-base-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Task Execution Plan</h4>
                  <div className="space-y-2">
                    <p><strong>Description:</strong> {taskPlan.description}</p>
                    <p><strong>Complexity:</strong> {taskPlan.complexity}</p>
                    <p><strong>Estimated Time:</strong> {taskPlan.estimatedTime}s</p>
                    <p><strong>Steps Completed:</strong> {taskPlan.steps.filter(s => s.status === 'completed').length}/{taskPlan.steps.length}</p>
                  </div>
                </div>
              )}

              {/* Models Used */}
              {metadata?.modelsUsed && Array.isArray(metadata.modelsUsed) && (
                <div className="bg-base-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">AI Models Used</h4>
                  <div className="space-y-2">
                    {metadata.modelsUsed.map((model: string, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{model}</span>
                        <span className="badge badge-primary badge-sm">AI Model</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {metadata && (
                <div className="bg-base-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-base-content/70">Generation Time</span>
                      <div className="font-bold">{formatDuration(metadata.generationTime || 0)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-base-content/70">Quality Score</span>
                      <div className="font-bold">{metadata.qualityScore || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-sm text-base-content/70">Token Usage</span>
                      <div className="font-bold">{metadata.tokenUsage || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-sm text-base-content/70">Cost Estimate</span>
                      <div className="font-bold">${metadata.costEstimate || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="border-t border-base-300 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            className="btn btn-sm btn-outline"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
            Provide Feedback
          </button>
          
          <div className="text-sm text-base-content/60">
            Generated {new Date(metadata?.timestamp || Date.now()).toLocaleString()}
          </div>
        </div>

        {showFeedback && (
          <div className="mt-4 space-y-3">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your thoughts on this AI-generated content..."
              className="textarea textarea-bordered w-full"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowFeedback(false)}
                className="btn btn-sm btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackText.trim()}
                className="btn btn-sm btn-primary"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {imageZoom && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={imageZoom}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setImageZoom(null)}
              className="absolute top-4 right-4 btn btn-circle btn-sm bg-black/50 border-white/30 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResultsViewer;