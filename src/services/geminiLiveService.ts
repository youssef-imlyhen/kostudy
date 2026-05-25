import { GoogleGenAI, LiveServerMessage, Modality, Session } from '@google/genai';
import { AIProvider } from '../types/aiProvider';

export class GeminiLiveService {
  private client: GoogleGenAI | null = null;
  private session: Session | null = null;

  constructor(
    private apiKey: string,
    private aiProvider: AIProvider = 'byok',
    private model: string = 'gemini-3.1-flash-live-preview'
  ) {}

  private async getConnectionKey(): Promise<string> {
    if (this.aiProvider === 'byok') {
      if (!this.apiKey) {
        throw new Error('BYOK Live mode requires a Gemini API key saved in this browser.');
      }
      return this.apiKey;
    }

    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'live_session', model: this.model }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Could not start a KoStudy Server Live session.');
    }

    if (!data.liveKey) {
      throw new Error('KoStudy Server Live did not return a connection key.');
    }

    return data.liveKey;
  }

  public async connect(
    onMessage: (message: LiveServerMessage) => void,
    onError: (error: ErrorEvent) => void,
    onClose: () => void
  ): Promise<void> {
    try {
      const connectionKey = await this.getConnectionKey();
      this.client = new GoogleGenAI({ apiKey: connectionKey });

      this.session = await this.client.live.connect({
        model: this.model,
        config: {
          responseModalities: [Modality.AUDIO],
        },
        callbacks: {
          onmessage: onMessage,
          onerror: onError,
          onclose: onClose,
        },
      });
    } catch (e) {
      onError(new ErrorEvent('error', { error: e, message: (e as Error).message }));
    }
  }

  public sendAudio(audioData: ArrayBuffer) {
    if (!this.session) return;

    this.session.sendRealtimeInput({
      media: {
        mimeType: 'audio/pcm;rate=16000',
        data: this.arrayBufferToBase64(audioData),
      },
    });
  }

  public sendText(text: string) {
    if (!this.session) return;

    this.session.sendRealtimeInput({
      text,
    });
  }

  public close() {
    this.session?.close();
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
