import { Lesson } from '../types/lesson';
import { questionConceptMap } from '../data/questionConceptMap';
import { Question } from '../types/question';
import { LearningState } from './learningState';
import { LessonProgressState, getLessonCompletion } from './lessonProgress';

export type ConceptStatus = 'new' | 'exposed' | 'weak' | 'developing' | 'strong';
export interface ConceptMastery { id: string; label: string; description: string; score?: number; exposure: number; attempts: number; dueQuestions: number; status: ConceptStatus; lessonIds: string[]; }

export const buildConceptMastery = (lessons: Lesson[], questions: Question[], learningState: LearningState, lessonProgress: LessonProgressState, now = Date.now()): ConceptMastery[] => {
  const registry = new Map<string, { label: string; description: string; lessonIds: string[]; exposures: number[] }>();
  lessons.forEach((lesson) => {
    const completion = getLessonCompletion(lesson, lessonProgress[lesson.id]);
    lesson.concepts.forEach((concept) => {
      const current = registry.get(concept.id) || { label: concept.label, description: concept.description, lessonIds: [], exposures: [] };
      current.lessonIds.push(lesson.id); current.exposures.push(completion); registry.set(concept.id, current);
    });
  });

  return Array.from(registry.entries()).map(([id, meta]) => {
    const mapped = questions.filter((question) => questionConceptMap[question.id]?.includes(id));
    const states = mapped.map((question) => learningState[question.id]).filter(Boolean);
    const attempts = states.reduce((sum, item) => sum + item.attempts, 0);
    const correct = states.reduce((sum, item) => sum + item.correctAttempts, 0);
    const dueQuestions = states.filter((item) => item.nextReviewAt <= now).length;
    const exposure = meta.exposures.length ? Math.round(meta.exposures.reduce((sum, value) => sum + value, 0) / meta.exposures.length) : 0;
    const accuracy = attempts ? correct / attempts : 0;
    const stability = states.length ? states.reduce((sum, item) => sum + Math.min(item.consecutiveCorrect / 3, 1), 0) / states.length : 0;
    const score = attempts ? Math.round((accuracy * 0.72 + stability * 0.28) * 100) : undefined;
    const status: ConceptStatus = score === undefined ? (exposure > 0 ? 'exposed' : 'new') : score >= 80 ? 'strong' : score >= 55 ? 'developing' : 'weak';
    return { id, label: meta.label, description: meta.description, score, exposure, attempts, dueQuestions, status, lessonIds: [...new Set(meta.lessonIds)] };
  });
};

export const getWeakestConcepts = (concepts: ConceptMastery[], limit = 3) => concepts.filter((concept) => concept.score !== undefined).sort((a, b) => (a.score ?? 100) - (b.score ?? 100) || b.attempts - a.attempts).slice(0, limit);
