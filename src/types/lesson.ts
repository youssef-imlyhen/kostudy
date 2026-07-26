export type LessonDifficulty = 'foundation' | 'intermediate' | 'advanced';

export interface LessonConcept {
  id: string;
  label: string;
  description: string;
}

export type LessonVisualId = 'click-funnel' | 'retention-curve' | 'sound-wave' | 'memory-curve';

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

export type LessonBlock = ExplainLessonBlock | InteractiveLessonBlock | YouTubeLessonBlock | CheckpointLessonBlock | ReflectionLessonBlock | TakeawaysLessonBlock;

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
  relatedCategory?: string;
  concepts: LessonConcept[];
  blocks: LessonBlock[];
  tutorBrief: string;
}
