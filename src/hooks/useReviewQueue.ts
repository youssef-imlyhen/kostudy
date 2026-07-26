import { useEffect, useMemo, useState } from 'react';
import { LearningState, getDueQuestionIds } from '../utils/learningState';

export function useReviewQueue(learningState: LearningState) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(interval); window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh); };
  }, []);
  const dueQuestionIds = useMemo(() => getDueQuestionIds(learningState, now), [learningState, now]);
  return { dueQuestionIds, dueCount: dueQuestionIds.length };
}
