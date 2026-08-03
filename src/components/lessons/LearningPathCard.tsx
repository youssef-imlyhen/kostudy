import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { CurriculumPath } from '../../data/curriculumPaths';
import { Lesson } from '../../types/lesson';
import { LessonProgressState, getLessonCompletion } from '../../utils/lessonProgress';

export default function LearningPathCard({ path, lessons, progress }: { path: CurriculumPath; lessons: Lesson[]; progress: LessonProgressState }) {
  const pathLessons = path.lessonIds.map((lessonId) => lessons.find((lesson) => lesson.id === lessonId)).filter((lesson): lesson is Lesson => !!lesson);
  const completed = pathLessons.filter((lesson) => getLessonCompletion(lesson, progress[lesson.id]) >= 100).length;
  const nextLesson = pathLessons.find((lesson) => getLessonCompletion(lesson, progress[lesson.id]) < 100) || pathLessons[0];
  const percentage = pathLessons.length ? Math.round((completed / pathLessons.length) * 100) : 0;

  return <article className="flex h-full flex-col rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-wider text-secondary">Guided path</p><h3 className="mt-1 text-xl font-black leading-tight">{path.title}</h3></div>
      <div className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{completed}/{pathLessons.length}</div>
    </div>
    <p className="mt-3 text-sm leading-6 text-base-content/65">{path.description}</p>

    <ol className="mt-5 space-y-2">
      {pathLessons.map((lesson, index) => {
        const completion = getLessonCompletion(lesson, progress[lesson.id]);
        const complete = completion >= 100;
        return <li key={lesson.id}>
          <Link
            to={`/lessons/${lesson.id}`}
            aria-label={`Open ${lesson.title}`}
            className="group flex items-center gap-3 rounded-2xl bg-base-200/45 px-3 py-2.5 transition hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${complete ? 'bg-success text-success-content' : 'bg-base-300 text-base-content/60'}`}>{complete ? <CheckCircleIcon className="h-4 w-4" /> : index + 1}</div>
            <span className="text-base" aria-hidden>{lesson.emoji}</span>
            <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold group-hover:text-secondary">{lesson.title}</div><div className="text-[11px] text-base-content/45">{lesson.field} · {lesson.durationMinutes} min</div></div>
            {completion > 0 && !complete ? <span className="text-[11px] font-semibold text-primary">{completion}%</span> : <ArrowRightIcon className="h-4 w-4 shrink-0 text-base-content/30 transition group-hover:translate-x-0.5 group-hover:text-secondary" />}
          </Link>
        </li>;
      })}
    </ol>

    <div className="mt-5 rounded-2xl bg-secondary/5 p-3 text-xs leading-5 text-base-content/60"><span className="font-semibold text-base-content/75">Outcome:</span> {path.outcome}</div>
    <div className="mt-auto pt-5">
      <div className="mb-2 flex justify-between text-xs text-base-content/50"><span>Path progress</span><span>{percentage}%</span></div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-base-200"><div className="h-full rounded-full bg-secondary" style={{ width: `${percentage}%` }} /></div>
      {nextLesson ? <Link className="btn btn-secondary btn-sm w-full" to={`/lessons/${nextLesson.id}`}>{percentage >= 100 ? 'Review path' : completed > 0 ? 'Continue path' : 'Start path'}<ArrowRightIcon className="h-4 w-4" /></Link> : null}
    </div>
  </article>;
}
