import { useMemo } from 'react';
import { lessons as builtInLessons } from '../data/lessons';
import { Lesson } from '../types/lesson';
import { useLocalStorage } from './useLocalStorage';

export function useLessons() {
  const [customLessons, setCustomLessons] = useLocalStorage<Lesson[]>('customLessons', []);

  const allLessons = useMemo(() => {
    const byId = new Map<string, Lesson>();
    builtInLessons.forEach((lesson) => byId.set(lesson.id, { ...lesson, origin: lesson.origin || 'built-in' }));
    customLessons.forEach((lesson) => byId.set(lesson.id, lesson));
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
