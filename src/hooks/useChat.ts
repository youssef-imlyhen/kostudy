import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GoogleGenAI, Part } from '@google/genai';
import { MediaContext } from '../types/media';
import { mediaContextToParts, isMediaContextReady } from '../utils/mediaUtils';

// Define the message structure
export interface ChatMessage {
  role: 'user' | 'model';
  parts: Part[];
}

// Helper function to convert File to a generative part (kept for backward compatibility)
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export const useChat = (apiKey: string) => {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatHistory', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genAI = new GoogleGenAI({ apiKey });

  const sendMessage = async (
    text: string,
    mediaContext?: MediaContext | File | null,
    context?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const userParts: Part[] = [];
      userParts.push({ text });

      // Handle different types of media input
      if (mediaContext) {
        if (mediaContext instanceof File) {
          // Legacy image support
          const imagePart = await fileToGenerativePart(mediaContext);
          userParts.push(imagePart);
        } else if (isMediaContextReady(mediaContext)) {
          // New media context support
          try {
            const mediaParts = await mediaContextToParts(mediaContext, genAI);
            userParts.push(...mediaParts);
          } catch (error) {
            console.error('Error processing media context:', error);
            setError('Failed to process media content. Please try again.');
            setLoading(false);
            return;
          }
        }
      }

      const userMessage: ChatMessage = {
        role: 'user',
        parts: userParts,
      };

      // Add the new message to the history, keeping only the last 10
      const newHistory = [...messages, userMessage];
      setMessages(newHistory.slice(-10)); // Optimistic update

      const contents = newHistory.slice(-10);
      if (context) {
        // Parse the context to extract prompt and data
        let contextText = context;
        try {
          const parsedContext = JSON.parse(context);
          if (parsedContext.prompt && parsedContext.data) {
            contextText = `${parsedContext.prompt}\n\n${JSON.stringify(parsedContext.data)}`;
          }
        } catch (e) {
          // If parsing fails, use context as is
        }
        
        contents.unshift({
          role: 'user',
          parts: [{ text: `Context: ${contextText}` }],
        });
      }

      const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents
      });

      const response = result;
      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        for (const fn of functionCalls) {
          if (fn.name === 'generateImage' && fn.args && typeof (fn.args as any).prompt === 'string') {
            const prompt = (fn.args as any).prompt as string;
            // Call the image generation model
            const imageResult = await genAI.models.generateContent({
              model: 'gemini-2.0-flash-preview-image-generation',
              contents: [{
                role: 'user',
                parts: [{ text: prompt }]
              }]
            });

            const imageResponse = imageResult;
            const modelParts: Part[] = [];
            let imageGenerated = false;
            
            if (imageResponse.candidates && imageResponse.candidates[0] && imageResponse.candidates[0].content) {
              for (const part of imageResponse.candidates[0].content.parts || []) {
                if (part.text) {
                  modelParts.push({ text: part.text });
                } else if (part.inlineData) {
                  modelParts.push(part);
                  imageGenerated = true;
                }
              }
            }

            if (!imageGenerated) {
              modelParts.push({ text: "I was unable to generate an image for that prompt." });
            }

            const modelMessage: ChatMessage = {
              role: 'model',
              parts: modelParts,
            };
            setMessages([...newHistory, modelMessage].slice(-10));
          }
        }
      } else {
        const responseText = response.text || '';

        const modelMessage: ChatMessage = {
          role: 'model',
          parts: [{ text: responseText }],
        };

        setMessages([...newHistory, modelMessage].slice(-10));
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return { messages, loading, error, sendMessage, clearChat };
};