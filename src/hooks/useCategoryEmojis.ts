import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { categoryEmojis as defaultEmojis } from '../data/questions';

// Word to emoji mapping for fallback mechanism
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

export const useCategoryEmojis = () => {
  const [customEmojis, setCustomEmojis] = useLocalStorage<Record<string, string>>('customCategoryEmojis', {});
  const [allEmojis, setAllEmojis] = useState<Record<string, string>>({ ...defaultEmojis });

  useEffect(() => {
    setAllEmojis({ ...defaultEmojis, ...customEmojis });
  }, [customEmojis]);

  const addCustomEmoji = useCallback((category: string, emoji: string) => {
    setCustomEmojis(prev => ({ ...prev, [category]: emoji }));
  }, [setCustomEmojis]);

  const getEmoji = useCallback((categoryName: string): string => {
    const normalizedCategory = categoryName.toLowerCase();

    // Direct match in combined emojis
    if (allEmojis[normalizedCategory]) {
      return allEmojis[normalizedCategory];
    }
    if (allEmojis[categoryName]) {
        return allEmojis[categoryName];
    }

    // Fallback to word-based matching
    const words = normalizedCategory.replace(/_/g, ' ').split(' ');
    for (const word of words) {
      if (wordEmojis[word]) {
        return wordEmojis[word];
      }
    }

    return '❓'; // Default fallback
  }, [allEmojis]);

  return { emojis: allEmojis, addCustomEmoji, getEmoji };
};