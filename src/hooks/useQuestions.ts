import { useMemo } from 'react';
import { Question } from '../types/question';
import defaultQuestions from '../data/questions';
import { useCustomQuestions } from './useCustomQuestions';

// Mark default questions with the 'default' source
const sourcedDefaultQuestions: Question[] = defaultQuestions.map(q => ({ ...q, source: 'default' }));

export const useQuestions = () => {
  const { customQuestions } = useCustomQuestions();

  // Combine default and custom questions, prioritizing custom ones
  const allQuestions = useMemo(() => {
    const all = [...sourcedDefaultQuestions, ...customQuestions];
    // Prioritize custom questions by removing default questions with the same ID
    const uniqueQuestions = all.filter((q, index, self) =>
      index === self.findIndex(t => t.id === q.id)
    );
    return uniqueQuestions;
  }, [customQuestions]);

  // Re-create utility functions to operate on the combined list
  const getCategories = (): string[] => {
    return [...new Set(allQuestions.map(q => q.category))];
  };

  const getQuestionsByCategory = (category: string): Question[] => {
    const difficultyOrder = ['easy', 'medium', 'hard'];
    return allQuestions
      .filter(q => q.category === category)
      .sort((a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty));
  };

  const getQuestionsCountByCategory = (): Record<string, number> => {
    return allQuestions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const getRandomQuestions = (count: number = 10): Question[] => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return {
    allQuestions,
    getCategories,
    getQuestionsByCategory,
    getQuestionsCountByCategory,
    getRandomQuestions,
  };
};