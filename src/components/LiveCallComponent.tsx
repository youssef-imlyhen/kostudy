import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

interface LiveCallComponentProps {
  apiKey: string;
  context?: string;
  onClose: () => void;
  onCallStart?: () => void;
}

const LiveCallComponent: React.FC<LiveCallComponentProps> = ({
  apiKey,
  context = '',
  onClose,
  onCallStart
}) => {
  const { t } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [status, setStatus] = useState('Click to start voice call');
  const [error, setError] = useState<string | null>(null);

  // Refs for audio processing
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  const volumeWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
  
  // Refs for audio playback
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Audio processing state
  const totalBytesSentRef = useRef(0);

  // AudioWorklet code for processing audio
  const AudioRecordingWorklet = `
    class AudioProcessingWorklet extends AudioWorkletProcessor {
      buffer = new Int16Array(2048);
      bufferWriteIndex = 0;

      constructor() {
        super();
      }

      process(inputs, outputs, parameters) {
        if (inputs.length > 0 && inputs[0].length > 0) {
          const channelData = inputs[0][0];
          this.processChunk(channelData);
        }
        return true; // Keep processor alive
      }

      sendAndClearBuffer() {
        if (this.bufferWriteIndex > 0) {
          const dataToSend = this.buffer.slice(0, this.bufferWriteIndex);
          this.port.postMessage({
            eventType: "audioData",
            audioData: dataToSend.buffer // Send ArrayBuffer
          }, [dataToSend.buffer]); // Transfer buffer ownership for efficiency
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

  // Volume meter worklet for visual feedback
  const VolumeMeterWorklet = `
    class VolumeMeter extends AudioWorkletProcessor {
      constructor() {
        super();
        this.volume = 0;
      }
      
      process(inputs) {
        const input = inputs[0];
        if (input.length > 0 && input[0].length > 0) {
          // Calculate RMS (Root Mean Square)
          let sumOfSquares = 0.0;
          for (const sample of input[0]) {
            sumOfSquares += sample * sample;
          }
          const rms = Math.sqrt(sumOfSquares / input[0].length);
          
          // Convert RMS to a linear scale (0.0 to 1.0)
          this.volume = Math.min(1.0, rms * 10); // Adjust multiplier as needed for sensitivity
          // Post a message to main thread with the volume level
          this.port.postMessage({ volume: this.volume });
        } else {
          this.volume = 0;
        }
        
        return true;
      }
    }
    registerProcessor('volume-meter', VolumeMeter);
  `;

  // Helper function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Start the live call session
  const startCall = useCallback(async () => {
    try {
      setError(null);
      setStatus('Initializing...');

      // Step 1: Initialize GoogleGenAI Client
      const genAI = new GoogleGenAI({ apiKey });
      
      // Test API key
      try {
        // Test API key by fetching models list (adaptable based on SDK docs)
        await genAI.models.list();
      } catch (testError) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      }

      // Step 2: Get microphone access
      setStatus('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          echoCancellation: false,
          noiseSuppression: true
        }
      });
      mediaStreamRef.current = stream;

      // Step 3: Create audio contexts
      setStatus('Setting up audio processing...');
      const audioContext = new AudioContext({ sampleRate: 16000 });
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      audioContextRef.current = audioContext;

      const outputAudioContext = new AudioContext({ sampleRate: 24000 });
      if (outputAudioContext.state === 'suspended') {
        await outputAudioContext.resume();
      }
      outputAudioContextRef.current = outputAudioContext;

      // Step 4: Set up audio worklets
      const workletBlob = new Blob([AudioRecordingWorklet], { type: 'application/javascript' });
      const workletURL = URL.createObjectURL(workletBlob);
      await audioContext.audioWorklet.addModule(workletURL);
      
      const volumeWorkletBlob = new Blob([VolumeMeterWorklet], { type: 'application/javascript' });
      const volumeWorkletURL = URL.createObjectURL(volumeWorkletBlob);
      await audioContext.audioWorklet.addModule(volumeWorkletURL);

      // Create audio nodes
      const audioSource = audioContext.createMediaStreamSource(stream);
      audioSourceRef.current = audioSource;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1;

      const audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-processing-worklet');
      audioWorkletNodeRef.current = audioWorkletNode;

      const volumeWorkletNode = new AudioWorkletNode(audioContext, 'volume-meter');
      volumeWorkletNodeRef.current = volumeWorkletNode;

      // Connect audio nodes
      audioSource.connect(gainNode);
      gainNode.connect(volumeWorkletNode);
      gainNode.connect(audioWorkletNode);

      // Step 5: Connect to Gemini Live API
      setStatus('Connecting to Gemini...');
      
      const systemPrompt = context 
        ? `You are a helpful AI tutor. The user is working on a quiz application. Here's their current context: ${context}. Please help them with their questions and provide educational support.`
        : 'You are a helpful AI assistant. Please respond naturally to the user\'s voice input.';

      // Use speech recognition and regular Gemini model for voice interaction
      // Build a function to send prompts using the Gemini SDK (as per @google/genai v1.x docs)
      const sendPrompt = async (userPrompt: string): Promise<string> => {
        // The SDK supports multimodal content as an array (see AIGenerationTab), but for simple text, a string can be passed.
        // systemInstruction is not part of GenerateContentParameters in this SDK version.
        // Add to contents as context text instead.
        const contextPrompt = systemPrompt ? systemPrompt + '\n' + userPrompt : userPrompt;
        const response = await genAI.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contextPrompt,
        });
        return response.text || '';
      };

      // Set up speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition not supported in this browser');
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let finalTranscript = '';
      let interimTranscript = '';
      let isProcessing = false;

      recognition.onresult = async (event: any) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Process final transcript
        if (finalTranscript && !isProcessing) {
          isProcessing = true;
          setStatus('Processing your message...');
          setIsAISpeaking(true);
          
          try {
            const response = await sendPrompt(finalTranscript);
            
            // Use text-to-speech for response
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            utterance.onend = () => {
              setIsAISpeaking(false);
              setStatus('Listening...');
              isProcessing = false;
              finalTranscript = '';
            };
            
            speechSynthesis.speak(utterance);
            
          } catch (error) {
            console.error('Error processing speech:', error);
            setError('Error processing your message');
            setIsAISpeaking(false);
            setStatus('Listening...');
            isProcessing = false;
            finalTranscript = '';
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access and try again.');
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        if (isConnected) {
          // Restart recognition if still connected
          try {
            recognition.start();
          } catch (e) {
            console.log('Recognition restart failed:', e);
          }
        }
      };

      // Start speech recognition
      recognition.start();
      
      setIsConnected(true);
      setIsRecording(true);
      setStatus('Connected! Listening...');
      onCallStart?.();

      // Store references for cleanup
      sessionRef.current = {
        close: () => {
          recognition.stop();
          speechSynthesis.cancel();
          setIsConnected(false);
          setIsRecording(false);
          setIsAISpeaking(false);
        },
        sendRealtimeInput: (data: any) => {
          // Audio worklet data - not needed for speech recognition approach
          console.log('Audio data received (not used in speech recognition mode):', data);
        },
        recognition: recognition
      };

      // Step 6: Handle audio data from worklet
      audioWorkletNode.port.onmessage = (event) => {
        if (event.data.eventType === 'audioData' && sessionRef.current && isConnected) {
          const audioDataBuffer = event.data.audioData;
          const base64AudioData = arrayBufferToBase64(audioDataBuffer);
          
          try {
            sessionRef.current.sendRealtimeInput({
              media: {
                data: base64AudioData,
                mimeType: `audio/pcm;rate=16000`
              }
            });
            totalBytesSentRef.current += audioDataBuffer.byteLength;
          } catch (sendError) {
            console.error('Error sending audio data:', sendError);
          }
        }
      };

      // Handle volume events for visual feedback
      volumeWorkletNode.port.onmessage = (event) => {
        if (event.data.volume !== undefined) {
          // You can use this for visual feedback if needed
          // For now, we'll just log it in development
          if (process.env.NODE_ENV === 'development' && event.data.volume > 0.1) {
            console.log('Volume level:', event.data.volume);
          }
        }
      };

      // Clean up blob URLs
      URL.revokeObjectURL(workletURL);
      URL.revokeObjectURL(volumeWorkletURL);

    } catch (error) {
      console.error('Error starting call:', error);
      setError(error instanceof Error ? error.message : 'Failed to start call');
      stopCall();
    }
  }, [apiKey, context, isConnected]);


  // Stop the live call session
  const stopCall = useCallback(async () => {
    setIsConnected(false);
    setIsRecording(false);
    setIsAISpeaking(false);
    setStatus('Disconnecting...');

    // Stop speech synthesis
    speechSynthesis.cancel();

    // Stop all playing audio
    for (const source of sourcesRef.current) {
      try {
        source.stop();
      } catch (e) {
        // Source might already be stopped
      }
    }
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;

    // Close session and stop speech recognition
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
        if (sessionRef.current.recognition) {
          sessionRef.current.recognition.stop();
        }
      } catch (e) {
        console.error('Error closing session:', e);
      }
      sessionRef.current = null;
    }

    // Stop audio processing
    if (audioWorkletNodeRef.current) {
      audioWorkletNodeRef.current.disconnect();
      audioWorkletNodeRef.current = null;
    }

    if (volumeWorkletNodeRef.current) {
      volumeWorkletNodeRef.current.disconnect();
      volumeWorkletNodeRef.current = null;
    }

    if (audioSourceRef.current) {
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close audio contexts
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        await audioContextRef.current.close();
      } catch (e) {
        console.error('Error closing audio context:', e);
      }
      audioContextRef.current = null;
    }

    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
      try {
        await outputAudioContextRef.current.close();
      } catch (e) {
        console.error('Error closing output audio context:', e);
      }
      outputAudioContextRef.current = null;
    }

    // Reset state
    totalBytesSentRef.current = 0;
    setStatus('Call ended');
    setError(null);
  }, []);

  // Handle component unmount
  useEffect(() => {
    return () => {
      stopCall();
    };
  }, [stopCall]);

  // Toggle call state
  const toggleCall = useCallback(() => {
    if (isConnected) {
      stopCall();
    } else {
      startCall();
    }
  }, [isConnected, startCall, stopCall]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-6 max-w-md w-full mx-4 border-2 border-b-4 border-base-300 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('liveCallComponent.title')}</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle"
          >
            ✕
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="mb-4">
            <button
              onClick={toggleCall}
              disabled={!apiKey}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-150 ${
                isConnected
                  ? 'bg-red-500 hover:bg-red-600 active:translate-y-0.5 shadow-lg hover:shadow-xl'
                  : 'bg-green-500 hover:bg-green-600 active:translate-y-0.5 shadow-lg hover:shadow-xl'
              } ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isConnected ? '📞' : '📞'}
            </button>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            {isRecording && (
              <div className="flex items-center text-red-500">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                Recording
              </div>
            )}
            {isAISpeaking && (
              <div className="flex items-center text-blue-500">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                AI Speaking
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">{status}</p>
          
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          {context && (
            <p className="mb-2">
              <strong>{t('liveCallComponent.context')}</strong> {t('liveCallComponent.contextDescription')}
            </p>
          )}
          <p>
            Click the phone button to start/stop the voice call. 
            Make sure to allow microphone access when prompted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveCallComponent;