import { Achievement } from '../types/achievement';

export const achievements: Achievement[] = [
  {
    id: 'first_quiz',
    title: 'achievements.firstSteps.title',
    description: 'achievements.firstSteps.description',
    icon: '🏃',
    tier: 'bronze',
    criteria: {
      type: 'questions_answered',
      value: 1
    },
    reward: {
      points: 10
    },
    unlocked: false
  },
  {
    id: 'quiz_master',
    title: 'achievements.quizMaster.title',
    description: 'achievements.quizMaster.description',
    icon: '🎓',
    tier: 'silver',
    criteria: {
      type: 'correct_answers',
      value: 50
    },
    reward: {
      points: 100
    },
    unlocked: false
  },
  {
    id: 'speed_demon',
    title: 'achievements.speedDemon.title',
    description: 'achievements.speedDemon.description',
    icon: '⚡',
    tier: 'bronze',
    criteria: {
      type: 'speed',
      value: 5
    },
    reward: {
      points: 25
    },
    unlocked: false
  },
  {
    id: 'streak_champion',
    title: 'achievements.streakChampion.title',
    description: 'achievements.streakChampion.description',
    icon: '🔥',
    tier: 'gold',
    criteria: {
      type: 'streak',
      value: 7
    },
    reward: {
      points: 200
    },
    unlocked: false
  },
  {
    id: 'category_conqueror',
    title: 'achievements.categoryConqueror.title',
    description: 'achievements.categoryConqueror.description',
    icon: '🏆',
    tier: 'gold',
    criteria: {
      type: 'categories_completed',
      value: 1
    },
    reward: {
      points: 150
    },
    unlocked: false
  },
  {
    id: 'perfect_score',
    title: 'achievements.perfectScore.title',
    description: 'achievements.perfectScore.description',
    icon: '💯',
    tier: 'platinum',
    criteria: {
      type: 'perfect_score',
      value: 1
    },
    reward: {
      points: 300
    },
    unlocked: false
  },
  {
    id: 'dedicated_learner',
    title: 'achievements.dedicatedLearner.title',
    description: 'achievements.dedicatedLearner.description',
    icon: '📚',
    tier: 'silver',
    criteria: {
      type: 'questions_answered',
      value: 100
    },
    reward: {
      points: 150
    },
    unlocked: false
  },
  {
    id: 'mistake_master',
    title: 'achievements.mistakeMaster.title',
    description: 'achievements.mistakeMaster.description',
    icon: '🔄',
    tier: 'bronze',
    criteria: {
      type: 'mistakes_reviewed',
      value: 20
    },
    reward: {
      points: 50
    },
    unlocked: false
  },
  {
    id: 'well_rounded',
    title: 'achievements.wellRounded.title',
    description: 'achievements.wellRounded.description',
    icon: '🌈',
    tier: 'silver',
    criteria: {
      type: 'categories_completed',
      value: 3
    },
    reward: {
      points: 120
    },
    unlocked: false
  }
];