import { GoogleGenAI, Part } from '@google/genai';

export type KoStudyAIResponse = {
  text: string;
  model: string;
  provider: 'server' | 'byok';
  quota?: {
    used: number;
    remaining: number;
  };
};

export async function callKoStudyServerAI(args: {
  prompt?: string;
  contents?: Array<{ role: 'user' | 'model'; parts: Part[] }>;
  model?: string;
  task?: string;
}): Promise<KoStudyAIResponse> {
  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'KoStudy server AI request failed');
  }

  return {
    text: data.text || '',
    model: data.model || args.model || 'server-default',
    provider: 'server',
    quota: data.quota,
  };
}

export async function callGeminiWithUserKey(args: {
  apiKey: string;
  contents: Array<{ role: 'user' | 'model'; parts: Part[] }>;
  model?: string;
}): Promise<KoStudyAIResponse> {
  const genAI = new GoogleGenAI({ apiKey: args.apiKey });
  const model = args.model || 'gemini-3.1-flash-lite';

  const result = await genAI.models.generateContent({
    model,
    contents: args.contents,
  });

  return {
    text: result.text || '',
    model,
    provider: 'byok',
  };
}
