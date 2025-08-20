import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AVAILABLE_MODELS, AIModelConfig } from '../services/enhancedAIService';
import { 
  CpuChipIcon, 
  BoltIcon, 
  BeakerIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  className = ''
}) => {
  const { t } = useLanguage();

  const getModelIcon = (model: AIModelConfig) => {
    if (model.capabilities.includes('experimental')) {
      return <BeakerIcon className="w-5 h-5" />;
    }
    if (model.capabilities.includes('speed')) {
      return <BoltIcon className="w-5 h-5" />;
    }
    return <CpuChipIcon className="w-5 h-5" />;
  };

  const getModelBadgeColor = (model: AIModelConfig) => {
    if (model.capabilities.includes('experimental')) {
      return 'badge-warning';
    }
    if (model.capabilities.includes('speed')) {
      return 'badge-info';
    }
    return 'badge-primary';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <CpuChipIcon className="w-5 h-5 text-base-content/70" />
        <h3 className="text-lg font-semibold">{t('aiGenerator.modelSelector.title')}</h3>
        <div className="tooltip" data-tip={t('aiGenerator.modelSelector.tooltip')}>
          <InformationCircleIcon className="w-4 h-4 text-base-content/50" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {Object.values(AVAILABLE_MODELS).map((model) => (
          <label
            key={model.name}
            className={`
              cursor-pointer p-4 rounded-lg border-2 transition-all duration-200
              ${selectedModel === model.name 
                ? 'border-primary bg-primary/5' 
                : 'border-base-300 hover:border-base-400 bg-base-100'
              }
            `}
          >
            <input
              type="radio"
              name="model"
              value={model.name}
              checked={selectedModel === model.name}
              onChange={(e) => onModelChange(e.target.value)}
              className="sr-only"
            />
            
            <div className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-lg flex-shrink-0
                ${selectedModel === model.name 
                  ? 'bg-primary text-primary-content' 
                  : 'bg-base-200 text-base-content'
                }
              `}>
                {getModelIcon(model)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-base-content">
                    {model.displayName}
                  </h4>
                  <div className={`badge badge-sm ${getModelBadgeColor(model)}`}>
                    {model.capabilities.includes('experimental') ? 'Experimental' :
                     model.capabilities.includes('speed') ? 'Fast' : 'Pro'}
                  </div>
                </div>
                
                <p className="text-sm text-base-content/70 mb-2">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-base-200 text-base-content/80"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
                
                {model.maxTokens && (
                  <div className="text-xs text-base-content/50 mt-1">
                    Max tokens: {model.maxTokens.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="bg-info/10 border border-info/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <InformationCircleIcon className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div className="text-sm text-info-content">
            <p className="font-medium mb-1">{t('aiGenerator.modelSelector.recommendation')}</p>
            <ul className="text-xs space-y-1 text-info-content/80">
              <li>• <strong>Gemini 2.5 Pro:</strong> Best for complex, creative applications</li>
              <li>• <strong>Gemini 2.5 Flash:</strong> Fast generation for simple apps</li>
              <li>• <strong>Gemini 2.0 Flash:</strong> Latest features, may be unstable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;