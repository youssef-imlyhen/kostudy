import { Lesson } from '../types/lesson';

export interface LessonCheckpointResult {
  selectedAnswer: string;
  correct: boolean;
  answeredAt: number;
}

export interface LessonProgressEntry {
  startedAt: number;
  updatedAt: number;
  completedBlockIds: string[];
  checkpointResults: Record<string, LessonCheckpointResult>;
  reflections: Record<string, string>;
  lastBlockId?: string;
  completedAt?: number;
}

export type LessonProgressState = Record<string, LessonProgressEntry>;

const emptyProgress = (now: number): LessonProgressEntry => ({ startedAt: now, updatedAt: now, completedBlockIds: [], checkpointResults: {}, reflections: {} });

export const touchLesson = (state: LessonProgressState, lessonId: string, blockId?: string, now = Date.now()): LessonProgressState => {
  const current = state[lessonId] || emptyProgress(now);
  return { ...state, [lessonId]: { ...current, updatedAt: now, lastBlockId: blockId || current.lastBlockId } };
};

export const completeLessonBlock = (state: LessonProgressState, lessonId: string, blockId: string, now = Date.now()): LessonProgressState => {
  const current = state[lessonId] || emptyProgress(now);
  const completedBlockIds = current.completedBlockIds.includes(blockId) ? current.completedBlockIds : [...current.completedBlockIds, blockId];
  return { ...state, [lessonId]: { ...current, completedBlockIds, lastBlockId: blockId, updatedAt: now } };
};

export const recordLessonCheckpoint = (state: LessonProgressState, lessonId: string, blockId: string, selectedAnswer: string, correct: boolean, now = Date.now()): LessonProgressState => {
  const base = completeLessonBlock(state, lessonId, blockId, now);
  const current = base[lessonId];
  return { ...base, [lessonId]: { ...current, checkpointResults: { ...current.checkpointResults, [blockId]: { selectedAnswer, correct, answeredAt: now } } } };
};

export const saveLessonReflection = (state: LessonProgressState, lessonId: string, blockId: string, text: string, now = Date.now()): LessonProgressState => {
  const current = state[lessonId] || emptyProgress(now);
  return { ...state, [lessonId]: { ...current, updatedAt: now, lastBlockId: blockId, reflections: { ...current.reflections, [blockId]: text } } };
};

export const completeLesson = (state: LessonProgressState, lesson: Lesson, now = Date.now()): LessonProgressState => {
  const current = state[lesson.id] || emptyProgress(now);
  return { ...state, [lesson.id]: { ...current, completedBlockIds: lesson.blocks.map((block) => block.id), lastBlockId: lesson.blocks[lesson.blocks.length - 1]?.id, completedAt: current.completedAt || now, updatedAt: now } };
};

export const getLessonCompletion = (lesson: Lesson, entry?: LessonProgressEntry): number => {
  if (!entry || lesson.blocks.length === 0) return 0;
  const completed = lesson.blocks.filter((block) => entry.completedBlockIds.includes(block.id)).length;
  return Math.round((completed / lesson.blocks.length) * 100);
};

export const getMostRecentLessonId = (state: LessonProgressState): string | undefined => Object.entries(state).filter(([, entry]) => !entry.completedAt).sort(([, a], [, b]) => b.updatedAt - a.updatedAt)[0]?.[0];
