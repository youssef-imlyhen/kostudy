export type LessonDifficulty = 'foundation' | 'intermediate' | 'advanced';

export interface LessonConcept {
  id: string;
  label: string;
  description: string;
}

export type LessonVisualId =
  | 'click-funnel'
  | 'retention-curve'
  | 'sound-wave'
  | 'memory-curve'
  | 'projectile-motion'
  | 'chemical-equilibrium'
  | 'natural-selection'
  | 'bayes-updater'
  | 'supply-demand'
  | 'sorting-algorithms'
  | 'polyrhythm'
  | 'energy-balance'
  | 'exponential-growth'
  | 'compound-growth'
  | 'orbit-motion'
  | 'predator-prey'
  | 'truth-table'
  | 'population-pyramid'
  | 'signal-detection'
  | 'morphology-builder'
  | 'color-context'
  | 'repeated-game';
export type LessonSourceType = 'article' | 'youtube' | 'video' | 'audio' | 'pdf' | 'image' | 'book' | 'other';
export type LessonMediaType = 'image' | 'audio' | 'video' | 'pdf';

export interface LessonSource {
  id: string;
  title: string;
  url: string;
  type: LessonSourceType;
  creator?: string;
  note?: string;
}

interface LessonBlockBase {
  id: string;
  eyebrow?: string;
  title: string;
}

export interface ExplainLessonBlock extends LessonBlockBase {
  type: 'explain';
  body: string;
  bullets?: string[];
  visual?: LessonVisualId;
}

export interface InteractiveLessonBlock extends LessonBlockBase {
  type: 'interactive';
  body: string;
  visual: LessonVisualId;
  challenge?: string;
}

export interface YouTubeLessonBlock extends LessonBlockBase {
  type: 'youtube';
  url: string;
  channel?: string;
  why: string;
  startSeconds?: number;
  sourceId?: string;
}

export interface MediaLessonBlock extends LessonBlockBase {
  type: 'media';
  mediaType: LessonMediaType;
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  sourceId?: string;
}

export interface ResourceLessonBlock extends LessonBlockBase {
  type: 'resources';
  body?: string;
  sourceIds: string[];
}

export interface CompareLessonBlock extends LessonBlockBase {
  type: 'compare';
  prompt?: string;
  left: { label: string; body: string };
  right: { label: string; body: string };
}

export interface CheckpointLessonBlock extends LessonBlockBase {
  type: 'checkpoint';
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  conceptIds: string[];
}

export interface ReflectionLessonBlock extends LessonBlockBase {
  type: 'reflection';
  prompt: string;
  placeholder?: string;
}

export interface TakeawaysLessonBlock extends LessonBlockBase {
  type: 'takeaways';
  items: string[];
}

export type LessonBlock =
  | ExplainLessonBlock
  | InteractiveLessonBlock
  | YouTubeLessonBlock
  | MediaLessonBlock
  | ResourceLessonBlock
  | CompareLessonBlock
  | CheckpointLessonBlock
  | ReflectionLessonBlock
  | TakeawaysLessonBlock;

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coreQuestion: string;
  firstPrinciple: string;
  durationMinutes: number;
  difficulty: LessonDifficulty;
  emoji: string;
  field?: string;
  learningObjectives?: string[];
  prerequisiteConceptIds?: string[];
  recommendedLessonIds?: string[];
  relatedCategory?: string;
  concepts: LessonConcept[];
  blocks: LessonBlock[];
  tutorBrief: string;
  sources?: LessonSource[];
  origin?: 'built-in' | 'custom-ai' | 'custom';
  createdAt?: number;
}
