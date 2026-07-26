import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GoogleGenAI, Part } from '@google/genai';
import { MediaContext } from '../types/media';
import { AIProvider, DEFAULT_AI_PROVIDER } from '../types/aiProvider';
import { mediaContextToParts, isMediaContextReady } from '../utils/mediaUtils';
import { callKoStudyServerAI } from '../services/aiClient';
import { DEFAULT_TEXT_MODEL, IMAGE_GENERATION_MODEL } from '../config/aiModels';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Part[];
}

async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return { inlineData: { data: await base64EncodedDataPromise, mimeType: file.type } };
}

export const useChat = (apiKey: string, aiProvider: AIProvider = DEFAULT_AI_PROVIDER) => {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatHistory', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string, mediaContext?: MediaContext | File | null, context?: string) => {
    setLoading(true);
    setError(null);

    try {
      const userParts: Part[] = [{ text }];
      const useByok = aiProvider === 'byok';
      const hasUsableByokKey = useByok && !!apiKey;

      if (mediaContext) {
        if (!hasUsableByokKey && !(mediaContext instanceof File) && mediaContext.type !== 'none') {
          setError('Media context currently requires BYOK mode with your own Gemini API key. Text chat works with KoStudy Server AI.');
          return;
        }
        if (mediaContext instanceof File) {
          if (!hasUsableByokKey) {
            setError('Image/file context currently requires BYOK mode with your own Gemini API key.');
            return;
          }
          userParts.push(await fileToGenerativePart(mediaContext));
        } else if (isMediaContextReady(mediaContext) && mediaContext.type !== 'none') {
          try {
            const genAI = new GoogleGenAI({ apiKey });
            userParts.push(...await mediaContextToParts(mediaContext, genAI));
          } catch (cause) {
            console.error('Error processing media context:', cause);
            setError('Failed to process media content. Please try again.');
            return;
          }
        }
      }

      const userMessage: ChatMessage = { role: 'user', parts: userParts };
      const newHistory: ChatMessage[] = [...messages, userMessage];
      setMessages(newHistory.slice(-10));
      const contents: ChatMessage[] = [...newHistory.slice(-10)];

      if (context) {
        let contextText = context;
        try {
          const parsed = JSON.parse(context);
          if (parsed.prompt && parsed.data) contextText = `${parsed.prompt}\n\n${JSON.stringify(parsed.data)}`;
        } catch {
          // Raw text context is valid too.
        }
        contents.unshift({ role: 'user', parts: [{ text: `Context: ${contextText}` }] });
      }

      if (!hasUsableByokKey) {
        const response = await callKoStudyServerAI({ task: 'chat', contents });
        const modelMessage: ChatMessage = { role: 'model', parts: [{ text: response.text }] };
        setMessages([...newHistory, modelMessage].slice(-10));
        return;
      }

      const genAI = new GoogleGenAI({ apiKey });
      const response = await genAI.models.generateContent({ model: DEFAULT_TEXT_MODEL, contents });
      const functionCalls = response.functionCalls;

      if (functionCalls?.length) {
        for (const fn of functionCalls) {
          if (fn.name === 'generateImage' && fn.args && typeof (fn.args as { prompt?: unknown }).prompt === 'string') {
            const prompt = (fn.args as { prompt: string }).prompt;
            const imageResponse = await genAI.models.generateContent({
              model: IMAGE_GENERATION_MODEL,
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
            });
            const modelParts: Part[] = [];
            let imageGenerated = false;
            for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
              if (part.text) modelParts.push({ text: part.text });
              else if (part.inlineData) {
                modelParts.push(part);
                imageGenerated = true;
              }
            }
            if (!imageGenerated) {
              modelParts.push({ text: 'I was unable to generate an image for that prompt. Image generation may require a billing-enabled BYOK key.' });
            }
            const modelMessage: ChatMessage = { role: 'model', parts: modelParts };
            setMessages([...newHistory, modelMessage].slice(-10));
          }
        }
      } else {
        const modelMessage: ChatMessage = { role: 'model', parts: [{ text: response.text || '' }] };
        setMessages([...newHistory, modelMessage].slice(-10));
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Chat request failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat: () => setMessages([]),
  };
};
