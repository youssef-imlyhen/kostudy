// Audio utility functions for Gemini Live API
export function createBlob(pcmData: Float32Array): Blob {
  // Convert Float32Array PCM data to 16-bit PCM
  const int16Array = new Int16Array(pcmData.length);
  for (let i = 0; i < pcmData.length; i++) {
    // Convert from [-1, 1] to [-32768, 32767]
    int16Array[i] = Math.max(-32768, Math.min(32767, pcmData[i] * 32767));
  }
  
  return new Blob([int16Array.buffer], { type: 'audio/pcm' });
}

export function decode(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function decodeAudioData(
  arrayBuffer: ArrayBuffer,
  audioContext: AudioContext,
  sampleRate: number,
  channels: number
): Promise<AudioBuffer> {
  try {
    // Try native decoding first
    // Pass a copy of the buffer so the original is not detached on failure
    return await audioContext.decodeAudioData(arrayBuffer.slice(0));
  } catch (error) {
    // Fallback: create audio buffer manually for PCM data
    const int16Array = new Int16Array(arrayBuffer);
    const audioBuffer = audioContext.createBuffer(channels, int16Array.length, sampleRate);
    
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < int16Array.length; i++) {
      // Convert from 16-bit PCM to [-1, 1]
      channelData[i] = int16Array[i] / 32767;
    }
    
    return audioBuffer;
  }
}