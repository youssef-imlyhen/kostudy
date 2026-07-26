import { useState } from 'react';
import { ArrowTopRightOnSquareIcon, CheckCircleIcon, DocumentTextIcon, LightBulbIcon, LinkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Lesson, LessonBlock } from '../../types/lesson';
import { LessonCheckpointResult } from '../../utils/lessonProgress';
import LessonVisual from './LessonVisual';

interface Props {
  lesson: Lesson;
  block: LessonBlock;
  checkpointResult?: LessonCheckpointResult;
  reflectionValue?: string;
  onCheckpoint: (answer: string, correct: boolean) => void;
  onReflection: (value: string) => void;
}

const getYouTubeEmbedUrl = (url: string, startSeconds?: number) => {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!match) return undefined;
  return `https://www.youtube.com/embed/${match[1]}${startSeconds ? `?start=${startSeconds}` : ''}`;
};

export default function LessonBlockView({ lesson, block, checkpointResult, reflectionValue = '', onCheckpoint, onReflection }: Props) {
  const [selected, setSelected] = useState(checkpointResult?.selectedAnswer || '');
  const [reflection, setReflection] = useState(reflectionValue);

  if (block.type === 'checkpoint') {
    const submitted = !!checkpointResult;
    return <div className="space-y-5"><p className="text-lg font-semibold leading-8 text-base-content">{block.prompt}</p><div className="grid gap-3">{block.options.map((option) => { const selectedOption = selected === option; const correctOption = submitted && option === block.correctAnswer; const wrongSelected = submitted && selectedOption && !correctOption; return <button key={option} type="button" disabled={submitted} onClick={() => setSelected(option)} className={`rounded-2xl border p-4 text-left text-sm transition ${correctOption ? 'border-success/50 bg-success/10' : wrongSelected ? 'border-error/50 bg-error/10' : selectedOption ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-100 hover:border-primary/35'}`}><span className="flex items-center justify-between gap-3"><span>{option}</span>{correctOption ? <CheckCircleIcon className="h-5 w-5 text-success" /> : wrongSelected ? <XCircleIcon className="h-5 w-5 text-error" /> : null}</span></button>; })}</div>{!submitted && <button type="button" disabled={!selected} onClick={() => onCheckpoint(selected, selected === block.correctAnswer)} className="btn btn-primary w-full sm:w-auto">Check my thinking</button>}{submitted && <div className={`rounded-2xl p-4 ${checkpointResult?.correct ? 'bg-success/10' : 'bg-warning/10'}`}><div className="mb-1 font-semibold">{checkpointResult?.correct ? 'Yes — that distinction holds.' : 'Use the correction, then retrieve it again.'}</div><p className="text-sm leading-6 text-base-content/75">{block.explanation}</p></div>}</div>;
  }

  if (block.type === 'interactive') return <div className="space-y-6"><p className="leading-7 text-base-content/75">{block.body}</p><LessonVisual visual={block.visual} />{block.challenge && <div className="flex gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4"><LightBulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-6"><strong>Try this:</strong> {block.challenge}</p></div>}</div>;

  if (block.type === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(block.url, block.startSeconds);
    return <div className="space-y-5"><p className="leading-7 text-base-content/75">{block.why}</p>{embedUrl && <div className="aspect-video overflow-hidden rounded-2xl border border-base-300 bg-black"><iframe src={embedUrl} title={block.title} className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>}<a href={block.url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><ArrowTopRightOnSquareIcon className="h-4 w-4" />Open on YouTube{block.channel ? ` · ${block.channel}` : ''}</a></div>;
  }

  if (block.type === 'media') {
    const caption = block.caption && <p className="text-sm leading-6 text-base-content/65">{block.caption}</p>;
    if (block.mediaType === 'image') return <figure className="space-y-3"><img src={block.src} alt={block.alt || block.title} loading="lazy" className="max-h-[34rem] w-full rounded-2xl border border-base-300 object-contain bg-base-200/40" />{caption}</figure>;
    if (block.mediaType === 'audio') return <div className="space-y-3"><audio controls preload="metadata" className="w-full" src={block.src} />{caption}</div>;
    if (block.mediaType === 'video') return <div className="space-y-3"><video controls preload="metadata" poster={block.poster} className="max-h-[34rem] w-full rounded-2xl bg-black" src={block.src} />{caption}</div>;
    return <div className="rounded-2xl border border-base-300 bg-base-200/50 p-5"><DocumentTextIcon className="h-7 w-7 text-primary" /><p className="mt-3 font-semibold">Document resource</p>{caption}<a href={block.src} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm mt-4"><ArrowTopRightOnSquareIcon className="h-4 w-4" />Open PDF/document</a></div>;
  }

  if (block.type === 'resources') {
    const sources = block.sourceIds.map((id) => lesson.sources?.find((source) => source.id === id)).filter(Boolean);
    return <div className="space-y-4">{block.body && <p className="leading-7 text-base-content/75">{block.body}</p>}<div className="grid gap-3">{sources.map((source) => source && <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary/35"><div className="flex items-start gap-3"><LinkIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><div className="font-semibold group-hover:text-primary">{source.title}</div><div className="mt-1 text-xs uppercase tracking-wide text-base-content/45">{source.type}{source.creator ? ` · ${source.creator}` : ''}</div>{source.note && <p className="mt-2 text-sm leading-6 text-base-content/65">{source.note}</p>}</div></div></a>)}</div></div>;
  }

  if (block.type === 'compare') return <div className="space-y-4">{block.prompt && <p className="leading-7 text-base-content/75">{block.prompt}</p>}<div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-base-300 bg-base-200/50 p-5"><div className="text-xs font-bold uppercase tracking-wider text-primary">{block.left.label}</div><p className="mt-3 leading-7">{block.left.body}</p></div><div className="rounded-2xl border border-base-300 bg-base-200/50 p-5"><div className="text-xs font-bold uppercase tracking-wider text-secondary">{block.right.label}</div><p className="mt-3 leading-7">{block.right.body}</p></div></div></div>;

  if (block.type === 'reflection') return <div className="space-y-4"><p className="text-lg font-semibold leading-8">{block.prompt}</p><textarea value={reflection} onChange={(event) => setReflection(event.target.value)} onBlur={() => onReflection(reflection.trim())} placeholder={block.placeholder} className="textarea textarea-bordered min-h-32 w-full text-base leading-7" /><p className="text-xs text-base-content/55">Saved locally on this device when you leave the field.</p></div>;

  if (block.type === 'takeaways') return <div className="space-y-3">{block.items.map((item,index) => <div key={item} className="flex gap-3 rounded-2xl bg-base-200/60 p-4"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index+1}</div><p className="leading-6">{item}</p></div>)}</div>;

  return <div className="space-y-5"><p className="text-lg leading-8 text-base-content/80">{block.body}</p>{block.bullets && <div className="grid gap-3 sm:grid-cols-3">{block.bullets.map((item) => <div key={item} className="rounded-2xl bg-base-200/60 p-4 text-sm leading-6">{item}</div>)}</div>}{block.visual && <LessonVisual visual={block.visual} />}</div>;
}
