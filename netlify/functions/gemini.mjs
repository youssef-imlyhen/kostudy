import { GoogleGenAI } from '@google/genai';

const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-3.1-flash-lite';
const DAILY_LIMIT = Number(process.env.KOSTUDY_FREE_AI_DAILY_LIMIT || 450);

const quotaStore = globalThis.__kostudyQuotaStore || new Map();
globalThis.__kostudyQuotaStore = quotaStore;

function getClientId(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('client-ip') ||
    'anonymous'
  );
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function checkQuota(request) {
  const clientId = getClientId(request);
  const key = `${getTodayKey()}:${clientId}`;
  const used = quotaStore.get(key) || 0;

  if (used >= DAILY_LIMIT) {
    return { allowed: false, used, remaining: 0 };
  }

  quotaStore.set(key, used + 1);
  return {
    allowed: true,
    used: used + 1,
    remaining: Math.max(DAILY_LIMIT - used - 1, 0),
  };
}

function buildContents(body) {
  if (Array.isArray(body.contents)) return body.contents;

  if (typeof body.prompt === 'string') {
    return [{ role: 'user', parts: [{ text: body.prompt }] }];
  }

  if (typeof body.text === 'string') {
    return [{ role: 'user', parts: [{ text: body.text }] }];
  }

  return [{ role: 'user', parts: [{ text: JSON.stringify(body) }] }];
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'KoStudy server AI is not configured. Set GEMINI_API_KEY in Netlify.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    if ('apiKey' in body || 'geminiApiKey' in body) {
      return Response.json(
        { error: 'Do not send API keys to the server. BYOK mode must stay local in the browser.' },
        { status: 400 }
      );
    }

    const quota = checkQuota(request);
    if (!quota.allowed) {
      return Response.json(
        {
          error: 'Daily free AI limit reached. Add your own Gemini API key in Settings to keep using AI today.',
          quota,
        },
        { status: 429 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = typeof body.model === 'string' ? body.model : DEFAULT_TEXT_MODEL;
    const contents = buildContents(body);

    const result = await ai.models.generateContent({ model, contents });

    return Response.json({
      text: result.text || '',
      model,
      provider: 'server',
      quota,
    });
  } catch (error) {
    console.error('KoStudy Gemini function error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown Gemini error' },
      { status: 500 }
    );
  }
}
