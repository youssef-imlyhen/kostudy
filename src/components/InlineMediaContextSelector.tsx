import React, { useState, useRef } from 'react';
import { 
  MediaContextType, 
  MediaContext, 
  MEDIA_CONFIGS, 
  MEDIA_CONTEXT_LABELS,
  validateMediaFile,
  isValidYouTubeUrl
 } from '../types/media';
import {
  PhotoIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  DocumentIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';
import { FaYoutube } from 'react-icons/fa';

interface InlineMediaContextSelectorProps {
  value: MediaContext;
  onChange: (context: MediaContext) => void;
  disabled?: boolean;
  className?: string;
}

const InlineMediaContextSelector: React.FC<InlineMediaContextSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState(value.url || '');
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleContextTypeChange = (type: MediaContextType) => {
    setError(null);
    setIsDropdownOpen(false);
    
    if (type === 'none') {
      onChange({ type: 'none' });
      setShowUrlInput(false);
    } else if (type === 'youtube') {
      onChange({ type: 'youtube', url: youtubeUrl });
      setShowUrlInput(true);
    } else {
      onChange({ type, file: undefined });
      setShowUrlInput(false);
      // Trigger file input for non-YouTube media types
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);
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

  const clearContext = () => {
    onChange({ type: 'none' });
    setShowUrlInput(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getContextIcon = (type: MediaContextType, size = 'w-4 h-4') => {
    switch (type) {
      case 'image':
        return <PhotoIcon className={size} />;
      case 'video':
        return <VideoCameraIcon className={size} />;
      case 'youtube':
        return <FaYoutube className={size} />;
      case 'audio':
        return <SpeakerWaveIcon className={size} />;
      case 'pdf':
        return <DocumentIcon className={size} />;
      default:
        return <PaperClipIcon className={size} />;
    }
  };

  const contextTypes: MediaContextType[] = ['image', 'video', 'youtube', 'audio', 'pdf'];

  const getContextSummary = () => {
    if (value.type === 'none') return null;
    if (value.type === 'youtube' && value.url) {
      const shortUrl = value.url.length > 30 ? `${value.url.substring(0, 30)}...` : value.url;
      return shortUrl;
    }
    if (value.file) return value.file.name;
    return `Select ${MEDIA_CONTEXT_LABELS[value.type].toLowerCase()}`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Compact Context Button - Just Icon */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
            ${value.type !== 'none'
              ? 'bg-primary text-white'
              : 'bg-base-300 text-base-content hover:bg-primary hover:text-white'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title={value.type === 'none' ? 'Add media context' : `${MEDIA_CONTEXT_LABELS[value.type]} context`}
        >
          {getContextIcon(value.type)}
        </button>

        {/* Dropdown Menu - Opens Above */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute bottom-full left-0 mb-2 w-48 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <button
                onClick={() => handleContextTypeChange('none')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-200 transition-colors"
              >
                <PaperClipIcon className="w-4 h-4" />
                <span className="text-sm">No Context</span>
              </button>
              
              {contextTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleContextTypeChange(type)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-200 transition-colors"
                >
                  {getContextIcon(type)}
                  <span className="text-sm">{MEDIA_CONTEXT_LABELS[type]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Context Summary - Shows below icon when active */}
      {value.type !== 'none' && (
        <div className="absolute top-full left-0 mt-1 flex items-center gap-2 bg-base-100 border border-base-300 rounded-lg px-2 py-1 shadow-sm min-w-max">
          <span className="text-xs text-base-content/80 truncate max-w-32">
            {getContextSummary()}
          </span>
          <button
            type="button"
            onClick={clearContext}
            disabled={disabled}
            className="text-error hover:bg-error/10 p-0.5 rounded transition-colors flex-shrink-0"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* YouTube URL Input - Shows above icon to avoid navbar masking */}
      {showUrlInput && value.type === 'youtube' && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-base-100 border border-base-300 rounded-lg p-3 shadow-lg z-50">
          <label className="block text-xs font-medium text-base-content mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => handleYouTubeUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
            disabled={disabled}
            className={`
              input input-bordered input-sm w-full
              ${error ? 'input-error' : ''}
            `}
          />
          {error && (
            <div className="mt-1 flex items-center gap-1 text-error text-xs">
              <ExclamationTriangleIcon className="w-3 h-3" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        accept={value.type !== 'none' && value.type !== 'youtube' ? MEDIA_CONFIGS[value.type]?.acceptedTypes.join(',') : ''}
        disabled={disabled}
        className="hidden"
      />

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default InlineMediaContextSelector;