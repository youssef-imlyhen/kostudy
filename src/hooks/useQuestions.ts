import { useMemo } from 'react';
import { Question } from '../types/question';
import defaultQuestions from '../data/questions';
import { crossDomainQuestions } from '../data/crossDomainQuestions';
import { expansionQuestions } from '../data/expansionQuestions';
import { advancedQuestions } from '../data/advancedQuestions';
import { humanSystemsQuestions } from '../data/humanSystemsQuestions';
import { frontierFoundationsQuestions } from '../data/frontierFoundationsQuestions';
import { crossDomainLessons } from '../data/crossDomainLessons';
import { questionConceptMap } from '../data/questionConceptMap';
import { assertValidCurriculum, validateQuestionMappings } from '../utils/curriculumValidation';
import { useCustomQuestions } from './useCustomQuestions';

const curriculumQuestions = [...crossDomainQuestions, ...expansionQuestions, ...advancedQuestions, ...humanSystemsQuestions, ...frontierFoundationsQuestions];

assertValidCurriculum(
  validateQuestionMappings(crossDomainLessons, curriculumQuestions, questionConceptMap),
  'Cross-domain retrieval bank',
);

const sourcedDefaults: Question[] = [...defaultQuestions, ...curriculumQuestions].map((question) => ({ ...question, source: 'default' }));

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
};

export const useQuestions = () => {
  const { customQuestions } = useCustomQuestions();
  const data = useMemo(() => {
    const byId = new Map<string, Question>();
    sourcedDefaults.forEach((question) => byId.set(question.id, question));
    customQuestions.forEach((question) => byId.set(question.id, { ...question, source: 'custom' }));
    const allQuestions = Array.from(byId.values());
    const grouped = new Map<string, Question[]>();
    allQuestions.forEach((question) => {
      const list = grouped.get(question.category) || [];
      list.push(question);
      grouped.set(question.category, list);
    });
    const order = ['easy', 'medium', 'hard'];
    grouped.forEach((list) => list.sort((a, b) => order.indexOf(a.difficulty) - order.indexOf(b.difficulty)));
    return {
      allQuestions,
      categories: Array.from(grouped.keys()),
      grouped,
      counts: Object.fromEntries(Array.from(grouped.entries()).map(([category, list]) => [category, list.length])),
    };
  }, [customQuestions]);

  return {
    allQuestions: data.allQuestions,
    getCategories: () => data.categories,
    getQuestionsByCategory: (category: string) => data.grouped.get(category) || [],
    getQuestionsCountByCategory: () => data.counts,
    getRandomQuestions: (count = 10) => shuffle(data.allQuestions).slice(0, count),
  };
};
