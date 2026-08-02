import { useMemo } from 'react';
import { lessons as legacyBuiltInLessons } from '../data/lessons';
import { crossDomainLessons } from '../data/crossDomainLessons';
import { Lesson } from '../types/lesson';
import { assertValidCurriculum, validateLessonCatalog } from '../utils/curriculumValidation';
import { useLocalStorage } from './useLocalStorage';

const inferField = (lesson: Lesson): string => {
  if (lesson.field) return lesson.field;
  if (lesson.id === 'sound-is-motion') return 'Music';
  if (lesson.id === 'forgetting-is-part-of-learning') return 'Learning Science';
  if (lesson.relatedCategory === 'Title & Packaging' || lesson.relatedCategory === 'Analytics & Algorithm') return 'Creator';
  return lesson.relatedCategory || 'General';
};

assertValidCurriculum(validateLessonCatalog(crossDomainLessons), 'Cross-domain lesson pack');

const builtInLessons: Lesson[] = [...legacyBuiltInLessons, ...crossDomainLessons].map((lesson) => ({
  ...lesson,
  field: inferField(lesson),
  origin: lesson.origin || 'built-in',
}));

export function useLessons() {
  const [customLessons, setCustomLessons] = useLocalStorage<Lesson[]>('customLessons', []);

  const allLessons = useMemo(() => {
    const byId = new Map<string, Lesson>();
    builtInLessons.forEach((lesson) => byId.set(lesson.id, lesson));
    customLessons.forEach((lesson) => byId.set(lesson.id, { ...lesson, field: inferField(lesson) }));
    return Array.from(byId.values());
  }, [customLessons]);

  const saveLesson = (lesson: Lesson) => {
    setCustomLessons((current) => [...current.filter((item) => item.id !== lesson.id), lesson]);
  };

  const deleteCustomLesson = (lessonId: string) => {
    setCustomLessons((current) => current.filter((lesson) => lesson.id !== lessonId));
  };

  return {
    allLessons,
    customLessons,
    saveLesson,
    deleteCustomLesson,
    getLessonById: (lessonId: string) => allLessons.find((lesson) => lesson.id === lessonId),
    getLessonsForCategory: (category: string) => allLessons.filter((lesson) => lesson.relatedCategory === category),
  };
}
