// Media context types for AI generation and chat
export type MediaContextType = 'none' | 'image' | 'video' | 'youtube' | 'audio' | 'pdf';

export interface MediaContext {
  type: MediaContextType;
  file?: File;
  url?: string; // For YouTube URLs
  description?: string;
}

export interface MediaUploadConfig {
  maxSize: number; // in bytes
  acceptedTypes: string[];
  description: string;
}

export const MEDIA_CONFIGS: Record<MediaContextType, MediaUploadConfig | null> = {
  none: null,
  image: {
    maxSize: 20 * 1024 * 1024, // 20MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    description: 'Upload an image (JPEG, PNG, GIF, WebP) up to 20MB'
  },
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    acceptedTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/webm'],
    description: 'Upload a video (MP4, AVI, MOV, WebM) up to 100MB'
  },
  youtube: null, // YouTube URLs don't need file upload
  audio: {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedTypes: ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/aac', 'audio/flac'],
    description: 'Upload an audio file (MP3, WAV, M4A, OGG, AAC, FLAC) up to 50MB'
  },
  pdf: {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedTypes: ['application/pdf'],
    description: 'Upload a PDF document up to 50MB'
  }
};

export const MEDIA_CONTEXT_LABELS: Record<MediaContextType, string> = {
  none: 'No Context',
  image: 'Image',
  video: 'Video',
  youtube: 'YouTube Video',
  audio: 'Audio',
  pdf: 'PDF Document'
};

export const MEDIA_CONTEXT_ICONS: Record<MediaContextType, string> = {
  none: '🚫',
  image: '🖼️',
  video: '🎥',
  youtube: '📺',
  audio: '🎵',
  pdf: '📄'
};

// Helper function to validate file type and size
export function validateMediaFile(file: File, contextType: MediaContextType): { valid: boolean; error?: string } {
  const config = MEDIA_CONFIGS[contextType];
  
  if (!config) {
    return { valid: false, error: 'Invalid context type' };
  }

  if (file.size > config.maxSize) {
    const maxSizeMB = Math.round(config.maxSize / (1024 * 1024));
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }

  if (!config.acceptedTypes.includes(file.type)) {
    return { valid: false, error: `File type ${file.type} is not supported for ${contextType}` };
  }

  return { valid: true };
}

// Helper function to get file extension from MIME type
export function getFileExtension(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/avi': 'avi',
    'video/mov': 'mov',
    'video/webm': 'webm',
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/m4a': 'm4a',
    'audio/ogg': 'ogg',
    'application/pdf': 'pdf'
  };
  
  return mimeToExt[mimeType] || 'unknown';
}

// Helper function to check if YouTube URL is valid
export function isValidYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)[a-zA-Z0-9_-]{11}(\?[^&\s]*)?(&[^&\s]*)*$/;
  return youtubeRegex.test(url);
}