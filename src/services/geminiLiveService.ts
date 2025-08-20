import { GoogleGenAI, LiveServerMessage, Modality, Session } from '@google/genai';

export class GeminiLiveService {
  private client: GoogleGenAI;
  private session: Session | null = null;

  constructor(
    private apiKey: string,
    private model: string = 'gemini-2.5-flash-preview-native-audio-dialog'
  ) {
    this.client = new GoogleGenAI({ apiKey: this.apiKey });
  }

  public async connect(
    onMessage: (message: LiveServerMessage) => void,
    onError: (error: ErrorEvent) => void,
    onClose: () => void
  ): Promise<void> {
    try {
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
      // The component expects an Error, so we create one.
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
      text: text
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