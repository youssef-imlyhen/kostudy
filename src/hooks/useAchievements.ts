import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { achievements } from '../data/achievements';
import { Achievement, UserAchievements } from '../types/achievement';

interface AchievementProgress {
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  maxStreak: number;
  categoriesCompleted: Record<string, boolean>;
  perfectScores: number;
  mistakesReviewed: number;
  // Track best (minimum) time to answer a single question, in seconds
  bestTimeSeconds: number;
}

// Create initial user achievements
const initialUserAchievements = achievements.reduce((acc, achievement) => {
  acc[achievement.id] = { ...achievement };
  return acc;
}, {} as UserAchievements);

export const useAchievements = () => {
  const [userAchievements, setUserAchievements] = useLocalStorage<UserAchievements>(
    'userAchievements',
    initialUserAchievements
  );
  
  // Migrate user achievements if needed
  useEffect(() => {
    // Simple check: if the data in localStorage is not an object with the expected structure, reset
    // We expect it to be an object where keys are achievement IDs
    // and values are Achievement objects with at least an 'id' property
    let needsReset = false;
    
    if (typeof userAchievements !== 'object' || userAchievements === null) {
      needsReset = true;
    } else {
      // Check if it has the expected achievement IDs
      const hasExpectedIds = achievements.every(achievement => 
        userAchievements.hasOwnProperty(achievement.id) && 
        typeof userAchievements[achievement.id] === 'object' &&
        (userAchievements[achievement.id] as any).id === achievement.id
      );
      
      if (!hasExpectedIds) {
        needsReset = true;
      }
    }
    
    if (needsReset) {
      // Reset to initial data
      setUserAchievements(initialUserAchievements);
    }
  }, []); // Run only once on mount

  // Check for unlocked achievements
  const checkAchievements = () => {
    const updatedAchievements: UserAchievements = { ...userAchievements };
    let hasNewUnlock = false;
    let newUnlockedAchievement: Achievement | null = null;

    for (const key in updatedAchievements) {
      const achievement = updatedAchievements[key];
      if (achievement.unlocked) continue;

      let shouldUnlock = false;

      switch (achievement.criteria.type) {
        case 'questions_answered':
          shouldUnlock = progress.questionsAnswered >= achievement.criteria.value;
          break;
        case 'correct_answers':
          shouldUnlock = progress.correctAnswers >= achievement.criteria.value;
          break;
        case 'streak':
          shouldUnlock = progress.maxStreak >= achievement.criteria.value;
          break;
        case 'categories_completed': {
          const completedCategories = Object.values(progress.categoriesCompleted).filter(Boolean).length;
          shouldUnlock = completedCategories >= achievement.criteria.value;
          break;
        }
        case 'perfect_score':
          shouldUnlock = progress.perfectScores >= achievement.criteria.value;
          break;
        case 'mistakes_reviewed':
          shouldUnlock = progress.mistakesReviewed >= achievement.criteria.value;
          break;
        case 'speed':
          // Unlock if user's best time is less than or equal to target seconds
          shouldUnlock = progress.bestTimeSeconds <= achievement.criteria.value;
          break;
      }

      if (shouldUnlock) {
        updatedAchievements[achievement.id] = {
          ...achievement,
          unlocked: true,
          unlockedAt: Date.now()
        };
        hasNewUnlock = true;
        newUnlockedAchievement = updatedAchievements[achievement.id];
      }
    }

    if (hasNewUnlock) {
      setUserAchievements(updatedAchievements);
      return newUnlockedAchievement;
    }

    return null;
  };

  // Update progress based on quiz results
  const updateProgress = (results: {
    questionsAnswered?: number;
    correctAnswers?: number;
    // Category identifier (optional)
    category?: string;
    // Mark category as completed explicitly (use when you know completion)
    categoryCompleted?: boolean;
    isPerfectScore?: boolean;
    streak?: number;
    mistakesReviewed?: number;
    // Time to answer the last question, in seconds
    timeToAnswerSec?: number;
  }) => {
    setProgress(prev => {
      const updated = { ...prev };
      
      if (results.questionsAnswered) {
        updated.questionsAnswered += results.questionsAnswered;
      }
      
      if (results.correctAnswers) {
        updated.correctAnswers += results.correctAnswers;
      }
      
      if (results.streak !== undefined) {
        updated.currentStreak = results.streak;
        if (results.streak > updated.maxStreak) {
          updated.maxStreak = results.streak;
        }
      }
      
      if (results.category && results.categoryCompleted) {
        // Only mark category as completed when explicitly instructed
        updated.categoriesCompleted[results.category] = true;
      }
      
      if (results.isPerfectScore) {
        updated.perfectScores += 1;
      }
      
      if (results.mistakesReviewed) {
        updated.mistakesReviewed += results.mistakesReviewed;
      }

      if (typeof results.timeToAnswerSec === 'number') {
        updated.bestTimeSeconds = Math.min(updated.bestTimeSeconds, results.timeToAnswerSec);
      }
      
      return updated;
    });
  };

  const [progress, setProgress] = useLocalStorage<AchievementProgress>(
    'achievementProgress',
    {
      questionsAnswered: 0,
      correctAnswers: 0,
      currentStreak: 0,
      maxStreak: 0,
      categoriesCompleted: {},
      perfectScores: 0,
      mistakesReviewed: 0,
      bestTimeSeconds: Number.POSITIVE_INFINITY
    }
  );

  // Get achievement statistics
  const getAchievementStats = () => {
    const allAchievements = Object.values(userAchievements);
    const unlocked = allAchievements.filter((a: Achievement) => a.unlocked).length;
    const total = allAchievements.length;
    const points = allAchievements
      .filter((a: Achievement) => a.unlocked)
      .reduce((sum, a) => sum + a.reward.points, 0);
    
    return {
      unlocked,
      total,
      percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0,
      points
    };
  };

  // Get unlocked achievements sorted by unlock date
  const getUnlockedAchievements = () => {
    return Object.values(userAchievements)
      .filter((a: Achievement) => a.unlocked)
      .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0));
  };

  // Get locked achievements
  const getLockedAchievements = () => {
    return Object.values(userAchievements)
      .filter((a: Achievement) => !a.unlocked)
      .sort((a, b) => {
        // Sort by tier importance
        const tierOrder: Record<string, number> = { platinum: 4, gold: 3, silver: 2, bronze: 1 };
        return tierOrder[b.tier] - tierOrder[a.tier];
      });
  };

  // Check achievements when progress changes
  const [newlyUnlockedAchievement, setNewlyUnlockedAchievement] = useState<Achievement | null>(null);
  
  useEffect(() => {
    const unlocked = checkAchievements();
    setNewlyUnlockedAchievement(unlocked);
  }, [progress]);

  // Function to clear the newly unlocked achievement notification
  const clearNewlyUnlockedAchievement = () => {
    setNewlyUnlockedAchievement(null);
  };

  return {
    userAchievements,
    progress,
    updateProgress,
    getAchievementStats,
    getUnlockedAchievements,
    getLockedAchievements,
    checkAchievements,
    newlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  };
};