export const AI_MODELS = {
  text: 'gemini-3.5-flash-lite',
  live: 'gemini-3.1-flash-live-preview',
  image: 'gemini-3.1-flash-lite-image',
} as const;

export const DEFAULT_TEXT_MODEL = AI_MODELS.text;
export const DEFAULT_LIVE_MODEL = AI_MODELS.live;
export const IMAGE_GENERATION_MODEL = AI_MODELS.image;
export const IMAGE_GENERATION_REQUIRES_BILLING = true;
