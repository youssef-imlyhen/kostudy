export interface QuestionLearningState {
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  consecutiveCorrect: number;
  reviewStage: number;
  lapses: number;
  lastAttemptAt: number;
  lastResult: 'correct' | 'incorrect';
  nextReviewAt: number;
  lastResponseTimeSec?: number;
  averageResponseTimeSec?: number;
}

export type LearningState = Record<string, QuestionLearningState>;
const MINUTE = 60 * 1000; const DAY = 24 * 60 * MINUTE; const CORRECT_INTERVALS = [DAY, 3*DAY, 7*DAY, 14*DAY, 30*DAY];

export const recordQuestionAttempt = (state: LearningState, questionId: string, isCorrect: boolean, options: { now?: number; responseTimeSec?: number } = {}): LearningState => {
  const now = options.now ?? Date.now(); const current = state[questionId]; const attempts = (current?.attempts || 0) + 1; const consecutiveCorrect = isCorrect ? (current?.consecutiveCorrect || 0) + 1 : 0; const reviewStage = isCorrect ? Math.min((current?.reviewStage ?? current?.consecutiveCorrect ?? 0) + 1, CORRECT_INTERVALS.length) : 0; const interval = isCorrect ? CORRECT_INTERVALS[Math.max(0, reviewStage-1)] : 10*MINUTE; const responseTime = options.responseTimeSec; const previousAverage = current?.averageResponseTimeSec; const averageResponseTimeSec = responseTime === undefined ? previousAverage : previousAverage === undefined ? responseTime : Math.round(((previousAverage*(attempts-1))+responseTime)/attempts*10)/10;
  return { ...state, [questionId]: { attempts, correctAttempts:(current?.correctAttempts||0)+(isCorrect?1:0), incorrectAttempts:(current?.incorrectAttempts||0)+(isCorrect?0:1), consecutiveCorrect, reviewStage, lapses:(current?.lapses||0)+(!isCorrect && (current?.correctAttempts||0)>0?1:0), lastAttemptAt:now, lastResult:isCorrect?'correct':'incorrect', nextReviewAt:now+interval, lastResponseTimeSec:responseTime??current?.lastResponseTimeSec, averageResponseTimeSec } };
};

export const getDueQuestionIds = (state: LearningState, now = Date.now()): string[] => Object.entries(state).filter(([,item]) => item.attempts>0 && item.nextReviewAt<=now).sort(([,a],[,b]) => a.nextReviewAt-b.nextReviewAt).map(([questionId]) => questionId);
