import { Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import { useLessons } from '../hooks/useLessons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LearningState } from '../utils/learningState';
import { LessonProgressState } from '../utils/lessonProgress';
import { buildConceptMastery } from '../utils/mastery';
import { getQuestionIdsForConcept } from '../data/questionConceptMap';

const statusLabel = { new: 'Not explored', exposed: 'Seen in lesson', weak: 'Needs work', developing: 'Developing', strong: 'Strong' } as const;

export default function MasteryOverview() {
  const { allQuestions } = useQuestions();
  const { allLessons } = useLessons();
  const [learningState] = useLocalStorage<LearningState>('questionLearningState', {});
  const [lessonProgress] = useLocalStorage<LessonProgressState>('lessonProgress', {});
  const concepts = buildConceptMastery(allLessons, allQuestions, learningState, lessonProgress).sort((a, b) => {
    const rank = { weak: 0, developing: 1, exposed: 2, new: 3, strong: 4 };
    return rank[a.status] - rank[b.status] || (a.score ?? 101) - (b.score ?? 101);
  });
  if (!concepts.length) return null;
  const strong = concepts.filter((concept) => concept.status === 'strong').length;
  const practiced = concepts.filter((concept) => concept.attempts > 0).length;

  return (
    <section className="px-4 mb-8">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Concept mastery</p><h2 className="mt-1 text-xl font-bold">What is becoming durable?</h2><p className="mt-1 text-sm text-base-content/60">{practiced} practiced · {strong} strong · unseen concepts stay unscored.</p></div>
          <Link to="/categories" className="text-sm font-semibold text-primary">Learn concepts</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {concepts.slice(0, 8).map((concept) => {
            const lessonId = concept.lessonIds[0];
            const mappedQuestions = getQuestionIdsForConcept(concept.id).length;
            const shownValue = concept.score ?? concept.exposure;
            const valueLabel = concept.score !== undefined ? `${concept.score}%` : concept.exposure > 0 ? `${concept.exposure}% seen` : '—';
            return (
              <div key={concept.id} className="rounded-2xl bg-base-200/55 p-4">
                <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{concept.label}</h3><p className="mt-1 text-xs text-base-content/55">{statusLabel[concept.status]}{concept.dueQuestions ? ` · ${concept.dueQuestions} due` : ''}</p></div><div className="text-sm font-bold text-primary">{valueLabel}</div></div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-base-300"><div className="h-full rounded-full bg-primary" style={{ width: `${shownValue}%` }} /></div>
                <div className="mt-3 flex flex-wrap gap-2">{mappedQuestions > 0 && <Link to={`/quiz?mode=concept&concept=${encodeURIComponent(concept.id)}`} className="btn btn-primary btn-xs">Practice concept · {mappedQuestions}</Link>}{lessonId && <Link to={`/lessons/${lessonId}`} className="btn btn-ghost btn-xs">Relearn</Link>}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
