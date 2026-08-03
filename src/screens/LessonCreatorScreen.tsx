import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { callKoStudyServerAI } from '../services/aiClient';
import { useLessons } from '../hooks/useLessons';
import { useQuestions } from '../hooks/useQuestions';
import { Lesson, LessonBlock, LessonDifficulty, LessonSource, LessonSourceType, LessonVisualId } from '../types/lesson';

const allowedVisualIds: LessonVisualId[] = [
  'click-funnel', 'retention-curve', 'sound-wave', 'memory-curve',
  'projectile-motion', 'chemical-equilibrium', 'natural-selection', 'bayes-updater',
  'supply-demand', 'sorting-algorithms', 'polyrhythm', 'energy-balance',
  'exponential-growth', 'compound-growth', 'orbit-motion', 'predator-prey', 'truth-table',
  'population-pyramid', 'signal-detection', 'morphology-builder', 'color-context', 'repeated-game',
];
const allowedVisuals = new Set<LessonVisualId>(allowedVisualIds);
const allowedBlockTypes = new Set(['explain', 'interactive', 'checkpoint', 'reflection', 'takeaways', 'compare', 'resources']);

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 52) || 'lesson';
const cleanText = (value: unknown, fallback = '') => typeof value === 'string' ? value.trim() : fallback;
const sourceType = (url: string): LessonSourceType => {
  if (/youtu\.be|youtube\.com/.test(url)) return 'youtube';
  if (/\.pdf(?:$|\?)/i.test(url)) return 'pdf';
  if (/\.(mp3|wav|ogg|m4a)(?:$|\?)/i.test(url)) return 'audio';
  if (/\.(mp4|webm|mov)(?:$|\?)/i.test(url)) return 'video';
  if (/\.(png|jpe?g|gif|webp|svg)(?:$|\?)/i.test(url)) return 'image';
  return 'article';
};

const extractJson = (text: string) => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = fenced || text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  return JSON.parse(candidate);
};

const normalizeBlocks = (raw: unknown): LessonBlock[] => {
  if (!Array.isArray(raw)) return [];
  const blocks: LessonBlock[] = [];

  raw.slice(0, 10).forEach((value, index) => {
    if (!value || typeof value !== 'object') return;
    const item = value as Record<string, unknown>;
    const type = cleanText(item.type);
    if (!allowedBlockTypes.has(type)) return;
    const id = cleanText(item.id, `step-${index + 1}`).replace(/[^a-zA-Z0-9_-]/g, '-');
    const title = cleanText(item.title, `Step ${index + 1}`);
    const eyebrow = cleanText(item.eyebrow) || undefined;

    if (type === 'explain') {
      blocks.push({ id, type: 'explain', title, eyebrow, body: cleanText(item.body), bullets: Array.isArray(item.bullets) ? item.bullets.filter((x): x is string => typeof x === 'string').slice(0, 5) : undefined });
      return;
    }

    if (type === 'interactive') {
      const visual = cleanText(item.visual) as LessonVisualId;
      if (allowedVisuals.has(visual)) blocks.push({ id, type: 'interactive', title, eyebrow, body: cleanText(item.body), visual, challenge: cleanText(item.challenge) || undefined });
      return;
    }

    if (type === 'checkpoint') {
      const options = Array.isArray(item.options) ? item.options.filter((x): x is string => typeof x === 'string').slice(0, 5) : [];
      const correctAnswer = cleanText(item.correctAnswer);
      if (options.length >= 2 && options.includes(correctAnswer)) {
        blocks.push({ id, type: 'checkpoint', title, eyebrow, prompt: cleanText(item.prompt), options, correctAnswer, explanation: cleanText(item.explanation), conceptIds: Array.isArray(item.conceptIds) ? item.conceptIds.filter((x): x is string => typeof x === 'string').slice(0, 6) : [] });
      }
      return;
    }

    if (type === 'reflection') {
      blocks.push({ id, type: 'reflection', title, eyebrow, prompt: cleanText(item.prompt), placeholder: cleanText(item.placeholder) || undefined });
      return;
    }

    if (type === 'takeaways') {
      blocks.push({ id, type: 'takeaways', title, eyebrow, items: Array.isArray(item.items) ? item.items.filter((x): x is string => typeof x === 'string').slice(0, 7) : [] });
      return;
    }

    if (type === 'compare') {
      const left = item.left as Record<string, unknown> | undefined;
      const right = item.right as Record<string, unknown> | undefined;
      if (left && right) blocks.push({ id, type: 'compare', title, eyebrow, prompt: cleanText(item.prompt) || undefined, left: { label: cleanText(left.label, 'A'), body: cleanText(left.body) }, right: { label: cleanText(right.label, 'B'), body: cleanText(right.body) } });
      return;
    }

    if (type === 'resources') {
      blocks.push({ id, type: 'resources', title, eyebrow, body: cleanText(item.body) || undefined, sourceIds: Array.isArray(item.sourceIds) ? item.sourceIds.filter((x): x is string => typeof x === 'string').slice(0, 12) : [] });
    }
  });

  return blocks;
};

export default function LessonCreatorScreen() {
  const navigate = useNavigate();
  const { saveLesson } = useLessons();
  const { getCategories } = useQuestions();
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [sourceNotes, setSourceNotes] = useState('');
  const [sourceUrls, setSourceUrls] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const categories = getCategories();

  const sources = useMemo<LessonSource[]>(() => sourceUrls.split(/\n+/).map((url) => url.trim()).filter((url) => /^https?:\/\//i.test(url)).slice(0, 10).map((url, index) => ({ id: `source-${index + 1}`, title: `Source ${index + 1}`, url, type: sourceType(url), note: 'Learner-provided source URL. URL metadata alone is not evidence that the AI read the source contents.' })), [sourceUrls]);

  const generate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true); setError('');
    try {
      const response = await callKoStudyServerAI({
        task: 'lesson_generate',
        prompt: `Create a compact, first-principles learning lesson as JSON only. Topic: ${topic.trim()}\nGoal: ${goal.trim() || 'Build a durable mental model'}\nRelated category: ${category || 'none'}\nLearner-provided notes (the only source content you may treat as read):\n${sourceNotes.slice(0, 12000)}\n\nSource metadata IDs available: ${sources.map((source) => `${source.id} (${source.type})`).join(', ') || 'none'}\n\nReturn an object with title, subtitle, description, field, coreQuestion, firstPrinciple, durationMinutes (5-20), difficulty (foundation|intermediate|advanced), emoji, tutorBrief, concepts (2-6 items with id,label,description), blocks (4-9 items). Allowed block types ONLY: explain, interactive, checkpoint, reflection, takeaways, compare, resources. Interactive visual may ONLY be one of ${allowedVisualIds.join(', ')} and should be omitted if it does not genuinely fit. A checkpoint needs 2-5 options and correctAnswer must exactly match one option. Resources may only reference the provided source IDs. Never invent source URLs, citations, facts claimed to come from an unread URL, executable code, HTML, scripts, or new visualization identifiers. Prefer explanation + prediction + retrieval over decorative content.`
      });
      const raw = extractJson(response.text);
      const concepts = Array.isArray(raw.concepts) ? raw.concepts.slice(0, 6).map((concept: Record<string, unknown>, index: number) => ({ id: slugify(cleanText(concept.id, `${topic}-concept-${index + 1}`)), label: cleanText(concept.label, `Concept ${index + 1}`), description: cleanText(concept.description) })) : [];
      const blocks = normalizeBlocks(raw.blocks);
      if (concepts.length < 2 || blocks.length < 3) throw new Error('The generated lesson was too incomplete to save safely. Try a more specific topic or add source notes.');
      const difficulty: LessonDifficulty = ['foundation', 'intermediate', 'advanced'].includes(raw.difficulty) ? raw.difficulty : 'foundation';
      const lesson: Lesson = {
        id: `ai-${slugify(topic)}-${Date.now().toString(36)}`,
        title: cleanText(raw.title, topic),
        subtitle: cleanText(raw.subtitle, 'Generated lesson'),
        description: cleanText(raw.description, goal || `Learn ${topic}`),
        coreQuestion: cleanText(raw.coreQuestion, `What is the most useful mental model for ${topic}?`),
        firstPrinciple: cleanText(raw.firstPrinciple, `Start from the simplest relationship that explains ${topic}.`),
        durationMinutes: Math.max(5, Math.min(20, Number(raw.durationMinutes) || 10)),
        difficulty,
        emoji: cleanText(raw.emoji, '✨').slice(0, 4),
        field: cleanText(raw.field, category || 'Custom').slice(0, 40),
        relatedCategory: category || undefined,
        concepts,
        blocks,
        tutorBrief: cleanText(raw.tutorBrief, `Teach ${topic} from first principles and distinguish evidence from analogy.`),
        sources,
        origin: 'custom-ai',
        createdAt: Date.now(),
      };
      saveLesson(lesson);
      navigate(`/lessons/${lesson.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not generate a valid lesson.');
    } finally { setLoading(false); }
  };

  return <div className="pb-24 pt-4"><Header title="Create lesson" /><div className="mx-auto max-w-3xl space-y-6 px-4"><section className="rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-wider text-primary">Structured AI lesson</p><h1 className="mt-2 text-2xl font-black">Give KoStudy something worth understanding</h1><p className="mt-2 text-sm leading-6 text-base-content/65">The AI writes lesson data, not arbitrary executable code. It can reuse approved coded labs when they genuinely fit.</p></section><div className="grid gap-5 rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-7"><label className="form-control"><span className="label-text font-semibold">Topic *</span><input className="input input-bordered mt-2" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. Why seasons happen" /></label><label className="form-control"><span className="label-text font-semibold">Learning goal</span><input className="input input-bordered mt-2" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="What should feel obvious after the lesson?" /></label><label className="form-control"><span className="label-text font-semibold">Connect to practice category</span><select className="select select-bordered mt-2" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">No category</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label className="form-control"><span className="label-text font-semibold">Source notes / pasted material</span><textarea className="textarea textarea-bordered mt-2 min-h-36" value={sourceNotes} onChange={(event) => setSourceNotes(event.target.value)} placeholder="Paste the facts, transcript excerpt, class notes, or source material the lesson should actually use." /><span className="mt-1 text-xs text-base-content/50">This content is sent to the tutor model. URLs below are metadata only unless you also paste their relevant content here.</span></label><label className="form-control"><span className="label-text font-semibold">Resource URLs</span><textarea className="textarea textarea-bordered mt-2 min-h-24" value={sourceUrls} onChange={(event) => setSourceUrls(event.target.value)} placeholder={'One URL per line\nYouTube, article, image, audio, video, PDF…'} /></label>{error && <div className="rounded-2xl bg-error/10 p-4 text-sm text-error">{error}</div>}<button type="button" onClick={() => void generate()} disabled={!topic.trim() || loading} className="btn btn-primary">{loading ? <><span className="loading loading-spinner loading-sm" />Building lesson</> : 'Generate structured lesson'}</button></div></div></div>;
}
