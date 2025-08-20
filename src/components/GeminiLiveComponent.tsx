import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GeminiLiveService } from '../services/geminiLiveService';
import { decode, decodeAudioData } from '../utils/audioUtils';
import { LiveServerMessage } from '@google/genai';

interface GeminiLiveComponentProps {
  apiKey: string;
  context?: string;
  onClose: () => void;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onError?: (error: string) => void;
}

const GeminiLiveComponent: React.FC<GeminiLiveComponentProps> = ({
  apiKey,
  context,
  onClose,
  onCallStart,
  onCallEnd,
  onError,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [status, setStatus] = useState('Click to start voice call');
  const [error, setError] = useState<string | null>(null);

  const liveServiceRef = useRef<GeminiLiveService | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const AudioRecordingWorklet = `
    class AudioProcessingWorklet extends AudioWorkletProcessor {
      buffer = new Int16Array(2048);
      bufferWriteIndex = 0;

      process(inputs) {
        if (inputs.length > 0 && inputs[0].length > 0) {
          const channelData = inputs[0][0];
          this.processChunk(channelData);
        }
        return true;
      }

      sendAndClearBuffer() {
        if (this.bufferWriteIndex > 0) {
          const dataToSend = this.buffer.slice(0, this.bufferWriteIndex);
          this.port.postMessage({ audioData: dataToSend.buffer }, [dataToSend.buffer]);
          this.bufferWriteIndex = 0;
        }
      }

      processChunk(float32Array) {
        for (let i = 0; i < float32Array.length; i++) {
          const clampedValue = Math.max(-1.0, Math.min(1.0, float32Array[i]));
          const int16Value = Math.floor(clampedValue * 32767);
          this.buffer[this.bufferWriteIndex++] = int16Value;
          if (this.bufferWriteIndex >= this.buffer.length) {
            this.sendAndClearBuffer();
          }
        }
      }
    }
    registerProcessor('audio-processing-worklet', AudioProcessingWorklet);
  `;

  const playAudioResponse = useCallback(async (base64Audio: string) => {
    if (!outputAudioContextRef.current) return;
    setIsAISpeaking(true);
    try {
      const audioBuffer = decode(base64Audio);
      const decodedAudio = await decodeAudioData(audioBuffer, outputAudioContextRef.current, 24000, 1);
      
      const source = outputAudioContextRef.current.createBufferSource();
      source.buffer = decodedAudio;
      source.connect(outputAudioContextRef.current.destination);
      
      sourcesRef.current.add(source);
      
      const startTime = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
      source.start(startTime);
      nextStartTimeRef.current = startTime + decodedAudio.duration;
      
      source.onended = () => {
        sourcesRef.current.delete(source);
        if (sourcesRef.current.size === 0) {
          setIsAISpeaking(false);
        }
      };
    } catch (error) {
      console.error('Error playing audio response:', error);
      setIsAISpeaking(false);
    }
  }, []);

  const handleStopCall = useCallback(() => {
    setStatus('Disconnecting...');
    
    liveServiceRef.current?.close();
    liveServiceRef.current = null;

    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;

    audioWorkletNodeRef.current?.disconnect();
    audioWorkletNodeRef.current = null;

    audioContextRef.current?.close();
    audioContextRef.current = null;
    
    outputAudioContextRef.current?.close();
    outputAudioContextRef.current = null;

    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();

    setIsConnected(false);
    setIsRecording(false);
    setIsAISpeaking(false);
    setStatus('Call ended');
    onCallEnd?.();
  }, [onCallEnd]);

  const handleStartCall = useCallback(async () => {
    try {
      setError(null);
      setStatus('Initializing...');
      onCallStart?.();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000 } });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const outputAudioContext = new AudioContext({ sampleRate: 24000 });
      outputAudioContextRef.current = outputAudioContext;

      const workletBlob = new Blob([AudioRecordingWorklet], { type: 'application/javascript' });
      const workletURL = URL.createObjectURL(workletBlob);
      await audioContext.audioWorklet.addModule(workletURL);

      const audioSource = audioContext.createMediaStreamSource(stream);
      const audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-processing-worklet');
      audioWorkletNodeRef.current = audioWorkletNode;

      const service = new GeminiLiveService(apiKey);
      liveServiceRef.current = service;

      await service.connect(
        (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData;
          if (audio?.data) {
            playAudioResponse(audio.data);
          }
        },
        (err: ErrorEvent) => {
          const errorMessage = err.message || 'An unknown error occurred.';
          setError(errorMessage);
          onError?.(errorMessage);
          handleStopCall();
        },
        () => {
          handleStopCall();
        }
      );

      setIsConnected(true);
      setIsRecording(true);
      setStatus('Connected! Listening...');
      
      // Send context as initial message if available
      if (context && liveServiceRef.current) {
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
        
        liveServiceRef.current.sendText(`Context for this conversation: ${contextText}`);
      }
      
      audioWorkletNode.port.onmessage = (event) => {
        if (liveServiceRef.current) {
          liveServiceRef.current.sendAudio(event.data.audioData);
        }
      };
      audioSource.connect(audioWorkletNode);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start call';
      setError(errorMessage);
      onError?.(errorMessage);
      handleStopCall();
    }
  }, [apiKey, onCallStart, onError, handleStopCall, playAudioResponse]);

  useEffect(() => {
    handleStartCall();
    return () => {
      handleStopCall();
    };
  }, [handleStartCall]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-6 max-w-md w-full mx-4 border-2 border-b-4 border-base-300 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Live Voice Call</h2>
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            ✕
          </button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-lg font-medium">{status}</p>
          </div>
          {isRecording && !isAISpeaking && <p className="text-gray-500">Listening...</p>}
          {isAISpeaking && <p className="text-blue-500">AI is speaking...</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="btn btn-error rounded-2xl border-b-4 border-error-focus
                      hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiLiveComponent;