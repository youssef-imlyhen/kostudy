import { youtubeQuestions } from './youtubeQuestions';
import { Question } from '../types/question';

// Flat array of questions (YouTube-only, production-ready bank)
const questions: Question[] = [
  ...youtubeQuestions,
];

// Category to emoji mapping (10-category YouTube system)
export const categoryEmojis: Record<string, string> = {
  'Mindset & Strategy': '🧠',
  'Niche Selection': '🎯',
  'Idea & Market Demand': '🔍',
  'Thumbnail Strategy': '🖼️',
  'Title & Packaging': '🏷️',
  'Scripting & Hooks': '✍️',
  'Production & Filming': '🎬',
  'Editing & Post-Production': '✂️',
  'Analytics & Algorithm': '📊',
  'Monetization & Business': '💰',
};

// Word to emoji mapping for fallback mechanism (kept for robustness)
const wordEmojis: Record<string, string> = {
  // Business/Finance
  'business': '💼',
  'finance': '💰',
  'marketing': '📢',
  'growth': '📈',
  'sales': '🛒',
  'economy': '📊',
  'investment': '🏦',
  
  // Technology
  'technology': '💻',
  'tech': '💻',
  'computer': '💻',
  'software': '🖥️',
  'hardware': '🖱️',
  'internet': '🌐',
  'web': '🌐',
  'digital': '📱',
  'app': '📱',
  'mobile': '📱',
  'ai': '🤖',
  'artificial': '🤖',
  'intelligence': '🧠',
  
  // Content/Creative
  'content': '📝',
  'creative': '🎨',
  'design': '🎨',
  'video': '🎥',
  'photo': '📸',
  'photography': '📸',
  'music': '🎵',
  'audio': '🎵',
  'writing': '✍️',
  'book': '📖',
  'literature': '📖',
  
  // Education/Learning
  'education': '🎓',
  'learning': '📚',
  'school': '🏫',
  'university': '🏛️',
  'study': '📖',
  'academic': '🏫',
  'knowledge': '🧠',
  'science': '🔬',
  'math': '🔢',
  'mathematics': '🔢',
  'history': '🏛️',
  'geography': '🌍',
  'language': '🗣️',
  
  // Analytics/Data
  'analytics': '📊',
  'data': '📈',
  'statistics': '📊',
  'research': '🔍',
  'analysis': '🔬',
  
  // General
  'general': '📌',
  'miscellaneous': '📦',
  'other': '📎',
  'new': '🆕',
  'basic': '🔰',
  'fundamentals': '🧱',
  'introduction': '👋',
  'beginner': '👶',
};

// Function to get emoji for a category with intelligent fallback
export const getCategoryEmoji = (categoryName: string): string => {
  if (categoryEmojis[categoryName]) {
    return categoryEmojis[categoryName];
  }
  const words = categoryName.toLowerCase().replace(/_/g, ' ').split(' ');
  for (const word of words) {
    if (wordEmojis[word]) {
      return wordEmojis[word];
    }
  }
  return '❓';
};

// Subtle gradient classes (unchanged)
const gradientClasses = [
  'bg-gradient-to-r from-green-100 to-emerald-100',
  'bg-gradient-to-r from-blue-100 to-indigo-100',
  'bg-gradient-to-r from-yellow-100 to-amber-100',
  'bg-gradient-to-r from-purple-100 to-fuchsia-100',
  'bg-gradient-to-r from-cyan-100 to-blue-100',
  'bg-gradient-to-r from-red-100 to-orange-100',
  'bg-gradient-to-r from-indigo-100 to-purple-100',
  'bg-gradient-to-r from-pink-100 to-rose-100',
  'bg-gradient-to-r from-teal-100 to-cyan-100',
  'bg-gradient-to-r from-lime-100 to-green-100'
];

// Function to generate a consistent color based on category name
export const getCategoryColor = (categoryName: string): string => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradientClasses.length;
  return gradientClasses[index];
};

// Get unique categories from questions
export const getCategories = (): string[] => {
  return [...new Set(questions.map(q => q.category))];
};

// Get questions by category
export const getQuestionsByCategory = (category: string): Question[] => {
  const difficultyOrder = ['easy', 'medium', 'hard'] as const;
  return questions
    .filter(q => q.category === category)
    .sort((a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty));
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

// Get random questions
export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get questions count by category
export const getQuestionsCountByCategory = (): Record<string, number> => {
  return questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

// Get questions count by difficulty
export const getQuestionsCountByDifficulty = (): Record<string, number> => {
  return questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export default questions;
