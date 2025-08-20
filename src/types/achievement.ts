export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface AchievementCriteria {
  type: 'questions_answered' | 'correct_answers' | 'streak' | 'categories_completed' | 'perfect_score' | 'mistakes_reviewed' | 'speed';
  value: number;
  category?: string;
}

export interface AchievementReward {
  points: number;
  badge?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  criteria: AchievementCriteria;
  reward: AchievementReward;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface UserAchievements {
  [key: string]: Achievement;
}

// Tier localization keys for consistent translation
export const ACHIEVEMENT_TIER_KEYS: Record<AchievementTier, string> = {
  bronze: 'achievementTiers.bronze',
  silver: 'achievementTiers.silver',
  gold: 'achievementTiers.gold',
  platinum: 'achievementTiers.platinum'
};