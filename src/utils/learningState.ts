export interface QuestionLearningState {
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  consecutiveCorrect: number;
  lastAttemptAt: number;
  lastResult: 'correct' | 'incorrect';
  nextReviewAt: number;
}

export type LearningState = Record<string, QuestionLearningState>;

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;
const CORRECT_INTERVALS = [DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];

export const recordQuestionAttempt = (
  state: LearningState,
  questionId: string,
  isCorrect: boolean,
  now: number = Date.now()
): LearningState => {
  const current = state[questionId] || {
    attempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    consecutiveCorrect: 0,
    lastAttemptAt: 0,
    lastResult: 'incorrect' as const,
    nextReviewAt: now,
  };

  const consecutiveCorrect = isCorrect ? current.consecutiveCorrect + 1 : 0;
  const interval = isCorrect
    ? CORRECT_INTERVALS[Math.min(consecutiveCorrect - 1, CORRECT_INTERVALS.length - 1)]
    : 10 * MINUTE;

  return {
    ...state,
    [questionId]: {
      attempts: current.attempts + 1,
      correctAttempts: current.correctAttempts + (isCorrect ? 1 : 0),
      incorrectAttempts: current.incorrectAttempts + (isCorrect ? 0 : 1),
      consecutiveCorrect,
      lastAttemptAt: now,
      lastResult: isCorrect ? 'correct' : 'incorrect',
      nextReviewAt: now + interval,
    },
  };
};

export const getDueQuestionIds = (state: LearningState, now: number = Date.now()): string[] =>
  Object.entries(state)
    .filter(([, item]) => item.attempts > 0 && item.nextReviewAt <= now)
    .sort(([, a], [, b]) => a.nextReviewAt - b.nextReviewAt)
    .map(([questionId]) => questionId);
