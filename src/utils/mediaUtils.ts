import { GoogleGenAI, Part } from '@google/genai';
import { MediaContext, MediaContextType } from '../types/media';

// Helper function to convert File to base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper function to convert File to a generative part for inline data
export async function fileToGenerativePart(file: File): Promise<Part> {
  const base64Data = await fileToBase64(file);
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type
    }
  };
}

// Uploads a file to the Gemini API and returns a Part
export async function uploadFileToGemini(file: File, genAI: GoogleGenAI): Promise<Part> {
  const uploadedFile = await genAI.files.upload({
    file,
    config: { mimeType: file.type },
  });

  // Wait for processing if needed (poll file state)
  if (uploadedFile.name) {
    let processedFile = await genAI.files.get({ name: uploadedFile.name });
    while (processedFile.state === "PROCESSING") {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s
      processedFile = await genAI.files.get({ name: uploadedFile.name });
    }

    return {
      fileData: {
        mimeType: processedFile.mimeType,
        fileUri: processedFile.uri,
      },
    };
  }

  // Fallback to inline data if upload fails
  return await fileToGenerativePart(file);
}

// Helper function to create a Part from YouTube URL
export function createYouTubePart(url: string): Part {
  return {
    fileData: {
      fileUri: url,
    },
  };
}

// Main function to convert MediaContext to Gemini API Parts
export async function mediaContextToParts(
  context: MediaContext,
  genAI: GoogleGenAI
): Promise<Part[]> {
  const parts: Part[] = [];

  switch (context.type) {
    case 'none':
      // No additional parts needed
      break;

    case 'youtube':
      if (context.url) {
        parts.push(createYouTubePart(context.url));
      }
      break;

    case 'image':
    case 'video':
    case 'audio':
    case 'pdf':
      if (context.file) {
        try {
          // For files larger than 20MB, use file upload API
          if (context.file.size > 20 * 1024 * 1024 || context.type === 'pdf') {
            const filePart = await uploadFileToGemini(context.file, genAI);
            parts.push(filePart);
          } else {
            // For smaller files, use inline data
            const filePart = await fileToGenerativePart(context.file);
            parts.push(filePart);
          }
        } catch (error) {
          console.error('Error processing media file:', error);
          throw error;
        }
      }
      break;

    default:
      console.warn(`Unsupported media context type: ${context.type}`);
  }

  return parts;
}

// Helper function to get appropriate prompt based on media type
export function getMediaContextPrompt(context: MediaContext): string {
  switch (context.type) {
    case 'none':
      return '';
    
    case 'image':
      return 'Based on the provided image, ';
    
    case 'video':
      return 'Based on the provided video content, ';
    
    case 'youtube':
      return 'Based on the YouTube video content, ';
    
    case 'audio':
      return 'Based on the provided audio content, ';
    
    case 'pdf':
      return 'Based on the provided PDF document, ';
    
    default:
      return 'Based on the provided content, ';
  }
}

// Helper function to validate if media context is ready for use
export function isMediaContextReady(context: MediaContext): boolean {
  switch (context.type) {
    case 'none':
      return true;
    
    case 'youtube':
      return !!context.url;
    
    case 'image':
    case 'video':
    case 'audio':
    case 'pdf':
      return !!context.file;
    
    default:
      return false;
  }
}

// Helper function to get media context description for UI
export function getMediaContextDescription(context: MediaContext): string {
  switch (context.type) {
    case 'none':
      return 'No media context selected';
    
    case 'youtube':
      return context.url ? `YouTube: ${context.url}` : 'YouTube URL not provided';
    
    case 'image':
    case 'video':
    case 'audio':
    case 'pdf':
      return context.file 
        ? `${context.type}: ${context.file.name} (${(context.file.size / (1024 * 1024)).toFixed(2)} MB)`
        : `${context.type} file not selected`;
    
    default:
      return 'Unknown media context';
  }
}

// Note: File cleanup is not available with the current @google/generative-ai package
// This would be available with the newer @google/genai package
export async function cleanupUploadedFile(_genAI: GoogleGenAI, _fileUri: string): Promise<void> {
  console.warn('File cleanup is not supported with the current @google/generative-ai package');
  // This functionality would require upgrading to @google/genai package
}

// Helper function to check if file should be uploaded vs inlined
export function shouldUploadFile(file: File): boolean {
  // Upload files larger than 20MB or if we want to reuse them
  return file.size > 20 * 1024 * 1024;
}

// Helper function to get supported MIME types for a context type
export function getSupportedMimeTypes(contextType: MediaContextType): string[] {
  switch (contextType) {
    case 'image':
      return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    case 'video':
      return ['video/mp4', 'video/avi', 'video/mov', 'video/webm'];
    case 'audio':
      return ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/ogg', 'audio/aac', 'audio/flac'];
    case 'pdf':
      return ['application/pdf'];
    default:
      return [];
  }
}