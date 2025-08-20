import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowsPointingOutIcon, 
  ArrowsPointingInIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

interface AppPreviewProps {
  htmlContent: string;
}

const AppPreview: React.FC<AppPreviewProps> = ({ htmlContent }) => {
  const { t } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      setIsLoading(true);
      
      // Create a blob URL for the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Set up iframe load handler
      const iframe = iframeRef.current;
      const handleLoad = () => {
        setIsLoading(false);
        // Clean up the blob URL after loading
        URL.revokeObjectURL(url);
      };
      
      iframe.addEventListener('load', handleLoad);
      iframe.src = url;
      
      // Cleanup
      return () => {
        iframe.removeEventListener('load', handleLoad);
        URL.revokeObjectURL(url);
      };
    }
  }, [htmlContent]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).mozRequestFullScreen) {
          await (containerRef.current as any).mozRequestFullScreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
      // Fallback to CSS-only fullscreen if browser API fails
      setIsFullscreen(!isFullscreen);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? 'bg-black' : ''}`}
      style={isFullscreen ? {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      } : {}}
    >
      {/* Preview Controls */}
      <div className="flex justify-between items-center mb-4 bg-base-200 p-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium ml-4">
            {t('aiGenerator.preview.title')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="btn btn-sm btn-ghost"
            title={t('aiGenerator.preview.refresh')}
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="btn btn-sm btn-ghost"
            title={isFullscreen ? t('aiGenerator.preview.exitFullscreen') : t('aiGenerator.preview.fullscreen')}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-4 h-4" />
            ) : (
              <ArrowsPointingOutIcon className="w-4 h-4" />
            )}
          </button>
          
          {isFullscreen && (
            <button
              onClick={exitFullscreen}
              className="btn btn-sm btn-error"
            >
              {t('aiGenerator.preview.close')}
            </button>
          )}
        </div>
      </div>

      {/* Preview Container */}
      <div className={`relative bg-white rounded-b-lg overflow-hidden ${
        isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-96 md:h-[500px]'
      }`}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-base-100 flex items-center justify-center z-10">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <div className="mt-2 text-sm text-base-content/70">
                {t('aiGenerator.preview.loading')}
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          title={t('aiGenerator.preview.title')}
          style={{
            backgroundColor: 'white'
          }}
        />
      </div>

      {/* Preview Info */}
      <div className="mt-2 text-xs text-base-content/60 text-center">
        {t('aiGenerator.preview.info')}
      </div>
    </div>
  );
};

export default AppPreview;