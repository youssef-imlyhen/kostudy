import React, { useState, useRef } from 'react';
import { 
  MediaContextType, 
  MediaContext, 
  MEDIA_CONFIGS, 
  MEDIA_CONTEXT_LABELS, 
  MEDIA_CONTEXT_ICONS,
  validateMediaFile,
  isValidYouTubeUrl
} from '../types/media';
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  SpeakerWaveIcon, 
  DocumentIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { FaYoutube } from 'react-icons/fa';

interface MediaContextSelectorProps {
  value: MediaContext;
  onChange: (context: MediaContext) => void;
  disabled?: boolean;
  className?: string;
}

const MediaContextSelector: React.FC<MediaContextSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState(value.url || '');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContextTypeChange = (type: MediaContextType) => {
    setError(null);
    if (type === 'none') {
      onChange({ type: 'none' });
    } else if (type === 'youtube') {
      onChange({ type: 'youtube', url: youtubeUrl });
    } else {
      onChange({ type, file: undefined });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || value.type === 'none' || value.type === 'youtube') return;

    const validation = validateMediaFile(file, value.type);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError(null);
    onChange({ ...value, file });
  };

  const handleYouTubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    if (value.type === 'youtube') {
      if (url && !isValidYouTubeUrl(url)) {
        setError('Please enter a valid YouTube URL');
      } else {
        setError(null);
        onChange({ type: 'youtube', url });
      }
    }
  };

  const clearFile = () => {
    onChange({ ...value, file: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getContextIcon = (type: MediaContextType) => {
    switch (type) {
      case 'image':
        return <PhotoIcon className="w-5 h-5" />;
      case 'video':
        return <VideoCameraIcon className="w-5 h-5" />;
      case 'youtube':
        return <FaYoutube className="w-5 h-5" />;
      case 'audio':
        return <SpeakerWaveIcon className="w-5 h-5" />;
      case 'pdf':
        return <DocumentIcon className="w-5 h-5" />;
      default:
        return <span className="text-lg">{MEDIA_CONTEXT_ICONS[type]}</span>;
    }
  };

  const contextTypes: MediaContextType[] = ['none', 'image', 'video', 'youtube', 'audio', 'pdf'];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Context Type Selection */}
      <div>
        <label className="block text-sm font-medium text-base-content mb-2">
          Context Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {contextTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleContextTypeChange(type)}
              disabled={disabled}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
                ${value.type === type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-base-300 bg-base-100 text-base-content hover:border-primary/50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {getContextIcon(type)}
              <span className="text-sm font-medium">
                {MEDIA_CONTEXT_LABELS[type]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* YouTube URL Input */}
      {value.type === 'youtube' && (
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => handleYouTubeUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={disabled}
            className={`
              input input-bordered w-full
              ${error ? 'input-error' : ''}
            `}
          />
          <p className="text-xs text-base-content/60 mt-1">
            Enter a valid YouTube video URL
          </p>
        </div>
      )}

      {/* File Upload */}
      {value.type !== 'none' && value.type !== 'youtube' && (
        <div>
          <label className="block text-sm font-medium text-base-content mb-2">
            Upload {MEDIA_CONTEXT_LABELS[value.type]}
          </label>
          
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept={MEDIA_CONFIGS[value.type]?.acceptedTypes.join(',')}
              disabled={disabled}
              className="file-input file-input-bordered w-full"
            />
            
            {MEDIA_CONFIGS[value.type] && (
              <p className="text-xs text-base-content/60">
                {MEDIA_CONFIGS[value.type]!.description}
              </p>
            )}
          </div>

          {/* File Preview */}
          {value.file && (
            <div className="mt-3 p-3 bg-base-200 rounded-lg border border-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getContextIcon(value.type)}
                  <div>
                    <p className="text-sm font-medium text-base-content truncate max-w-48">
                      {value.file.name}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {(value.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  disabled={disabled}
                  className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview */}
              {value.type === 'image' && value.file && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(value.file)}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="alert alert-error">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Context Description */}
      {value.type !== 'none' && (
        <div className="p-3 bg-info/10 border border-info/20 rounded-lg">
          <p className="text-sm text-info-content">
            <strong>How it works:</strong> The selected {MEDIA_CONTEXT_LABELS[value.type].toLowerCase()} will be analyzed by AI to provide context for generating questions or answering your queries.
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaContextSelector;