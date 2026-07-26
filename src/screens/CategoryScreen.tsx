import { useNavigate, useParams } from 'react-router-dom';
import { ShieldCheckIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useQuiz } from '../context/QuizContext';
import { getLessonsForCategory } from '../data/lessons';
import { useQuestions } from '../hooks/useQuestions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { LessonProgressState, getLessonCompletion } from '../utils/lessonProgress';
import Header from '../components/Header';
import LessonCard from '../components/lessons/LessonCard';

interface Progress { [key: string]: { [key: string]: { completed: number; correct: number } } }
const difficultyIcons = { easy: StarIcon, medium: ShieldCheckIcon, hard: TrophyIcon };

export default function CategoryScreen() {
  const navigate = useNavigate(); const { categoryId = '' } = useParams(); const { setCurrentQuiz } = useQuiz(); const [progress] = useLocalStorage<Progress>('quizProgress', {}); const [lessonProgress] = useLocalStorage<LessonProgressState>('lessonProgress', {}); const { getQuestionsByCategory } = useQuestions(); const { t } = useLanguage(); const questions = getQuestionsByCategory(categoryId); const relatedLessons = getLessonsForCategory(categoryId);
  if (!questions.length && !relatedLessons.length) return <div className="p-6">{t('categoryScreen.categoryNotFound')}</div>;
  const difficulties = [...new Set(questions.map((question) => question.difficulty))];
  return <div className="pb-24 pt-4"><Header title={categoryId.replace(/_/g,' ')} /><div className="space-y-9 px-4">{relatedLessons.length>0 && <section><p className="text-xs font-semibold uppercase tracking-wider text-primary">Learn the model</p><h2 className="mt-1 text-xl font-bold">Understand before you test it</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{relatedLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} completion={getLessonCompletion(lesson,lessonProgress[lesson.id])} compact />)}</div></section>}<section><p className="text-xs font-semibold uppercase tracking-wider text-secondary">Practice</p><h2 className="mt-1 text-xl font-bold">Retrieve by difficulty</h2><p className="mt-2 text-sm leading-6 text-base-content/65">Use questions to check whether the idea survives without the lesson in front of you.</p><div className="mt-4 space-y-3">{difficulties.map((difficulty) => { const list=questions.filter((q)=>q.difficulty===difficulty); const done=Math.min(progress[categoryId]?.[difficulty]?.completed||0,list.length); const percent=list.length?Math.round(done/list.length*100):0; const Icon=difficultyIcons[difficulty]; return <button key={difficulty} type="button" onClick={()=>{setCurrentQuiz({category:categoryId,difficulty,progress:0,score:0,currentLevel:`${categoryId}_${difficulty}`});navigate('/quiz');}} className="w-full rounded-2xl border border-base-300 bg-base-100 p-4 text-left shadow-sm transition hover:border-primary/35 hover:shadow-md sm:p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2.5"><Icon className="h-5 w-5 text-primary" /></div><div className="flex-1"><div className="flex items-center justify-between gap-3"><h3 className="font-bold">{difficulty.charAt(0).toUpperCase()+difficulty.slice(1)} practice</h3><span className="text-xs text-base-content/55">{list.length} questions</span></div><p className="mt-1 text-sm text-base-content/65">{t(`difficultyDescriptions.${difficulty}`)}</p></div></div><div className="mt-4 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-200"><div className="h-full rounded-full bg-primary" style={{width:`${percent}%`}} /></div><span className="w-10 text-right text-xs text-base-content/55">{percent}%</span></div></button>;})}</div></section></div></div>;
}
