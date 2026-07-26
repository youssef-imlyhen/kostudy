import { useMemo, useState } from 'react';
import { MicrophoneIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import GeminiLiveComponent from '../GeminiLiveComponent';
import { callKoStudyServerAI } from '../../services/aiClient';
import { Lesson, LessonBlock } from '../../types/lesson';
import { LessonProgressEntry } from '../../utils/lessonProgress';

interface TutorMessage { role: 'user' | 'tutor'; text: string; }

export default function LessonTutorPanel({ lesson, block, progress }: { lesson: Lesson; block: LessonBlock; progress?: LessonProgressEntry }) {
  const [open, setOpen] = useState(false); const [voiceOpen, setVoiceOpen] = useState(false); const [input, setInput] = useState(''); const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const [messages, setMessages] = useState<TutorMessage[]>([]);
  const context = useMemo(() => JSON.stringify({
    prompt: 'You are KoStudy lesson tutor. Teach the exact step the learner is viewing. Prefer hints and questions over immediately giving answers. Distinguish teaching simulations from real measurements or universal benchmarks.',
    data: { lesson: { title: lesson.title, coreQuestion: lesson.coreQuestion, firstPrinciple: lesson.firstPrinciple, concepts: lesson.concepts, tutorBrief: lesson.tutorBrief }, currentBlock: block, progress },
  }), [lesson, block, progress]);

  const send = async (preset?: string) => {
    const userText = (preset || input).trim(); if (!userText || loading) return;
    const nextMessages = [...messages, { role: 'user' as const, text: userText }]; setMessages(nextMessages); setInput(''); setLoading(true); setError('');
    try {
      const response = await callKoStudyServerAI({ task: 'lesson_tutor', prompt: `LESSON CONTEXT:\n${context}\n\nCONVERSATION:\n${nextMessages.slice(-8).map((message) => `${message.role.toUpperCase()}: ${message.text}`).join('\n')}\n\nReply as a concise tutor. Stay grounded in this lesson and current step.` });
      setMessages((current) => [...current, { role: 'tutor', text: response.text }]);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Tutor request failed'); }
    finally { setLoading(false); }
  };

  return <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><SparklesIcon className="h-5 w-5 text-primary" /><div><div className="font-semibold">Tutor this step</div><div className="text-xs text-base-content/60">The tutor knows this lesson and the block you are viewing.</div></div></div><div className="flex gap-2"><button type="button" className="btn btn-ghost btn-sm" onClick={() => setVoiceOpen(true)}><MicrophoneIcon className="h-4 w-4" />Talk live</button><button type="button" className="btn btn-primary btn-sm" onClick={() => setOpen((value) => !value)}>{open ? 'Close tutor' : 'Ask tutor'}</button></div></div>{open && <div className="mt-4 space-y-3"><div className="flex flex-wrap gap-2">{['Explain differently','Give me a hint','Quiz me on this','Give me an analogy'].map((prompt) => <button key={prompt} type="button" onClick={() => void send(prompt)} className="btn btn-ghost btn-xs">{prompt}</button>)}</div>{messages.length > 0 && <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl bg-base-100 p-3">{messages.map((message,index) => <div key={`${message.role}-${index}`} className={`rounded-xl p-3 text-sm leading-6 ${message.role === 'user' ? 'ml-8 bg-primary/10' : 'mr-8 bg-base-200'}`}>{message.text}</div>)}</div>}{error && <div className="text-sm text-error">{error}</div>}<div className="flex gap-2"><input className="input input-bordered flex-1" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void send(); }} placeholder="What is confusing here?" /><button type="button" className="btn btn-primary btn-square" disabled={!input.trim() || loading} onClick={() => void send()}>{loading ? <span className="loading loading-spinner loading-sm" /> : <PaperAirplaneIcon className="h-4 w-4" />}</button></div></div>}{voiceOpen && <GeminiLiveComponent apiKey="" aiProvider="server" context={context} onClose={() => setVoiceOpen(false)} />}</div>;
}
