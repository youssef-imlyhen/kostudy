import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useQuiz } from '../context/QuizContext';
import { useQuestions } from '../hooks/useQuestions';
import { Question } from '../types/question';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { normalizeUrl } from '../utils/helpers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MultipleChoiceDisplay from '../components/question-types/MultipleChoiceDisplay';
import TrueFalseDisplay from '../components/question-types/TrueFalseDisplay';
import FillInTheBlankDisplay from '../components/question-types/FillInTheBlankDisplay';
import Header from '../components/Header';
import soundManager from '../utils/soundManager';
import { useAchievements } from '../hooks/useAchievements';

interface Progress {
  [key: string]: {
    [key: string]: {
      completed: number;
      correct: number;
    };
  };
}

interface Mistake {
  questionId: string;
  category: string;
  difficulty: string;
  selectedAnswer: string | string[];
  timestamp: number;
}

export default function QuizScreen() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getQuestionsByCategory, getRandomQuestions } = useQuestions();
  const { currentQuiz, setCurrentQuiz } = useQuiz();
  const [progress, setProgress] = useLocalStorage<Progress>('quizProgress', {});
  const [mistakes, setMistakes] = useLocalStorage<{ [key: string]: Mistake[] }>('quizMistakes', {});
  const [maxStreak, setMaxStreak] = useLocalStorage<number>('maxStreak', 0);
  const [soundEnabled] = useLocalStorage<boolean>('soundEnabled', true);
  const { updateProgress } = useAchievements();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Set<string>>(new Set());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Check modes
  const isMistakesMode = searchParams.get('mode') === 'mistakes';
  const isPlayAllMode = window.location.pathname === '/play-all';

  // Load questions based on mode
  useEffect(() => {
    if (isPlayAllMode) {
      setCurrentQuiz({ ...currentQuiz, playAllMode: true, currentStreak: 0 });
      const randomQuestion = getRandomQuestions(1);
      setQuestions(randomQuestion);
      setCurrentStreak(0);
    } else if (isMistakesMode) {
      const mistakesJson = sessionStorage.getItem('currentMistakes');
      if (!mistakesJson) {
        navigate('/mistakes');
        return;
      }
      const mistakes = JSON.parse(mistakesJson) as Mistake[];
      const category = searchParams.get('category');
      const filteredMistakes = category ? mistakes.filter(m => m.category === category) : mistakes;
      const mistakeQuestions = filteredMistakes.map(mistake => {
        const categoryQuestions = getQuestionsByCategory(mistake.category);
        return categoryQuestions.find(q => q.id === mistake.questionId);
      }).filter((q): q is Question => q !== undefined);
      setQuestions(mistakeQuestions);
    } else {
      const categoryQuestions = getQuestionsByCategory(currentQuiz.category || '');
      const filteredQuestions = categoryQuestions.filter(q => q.difficulty === currentQuiz.difficulty);
      const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 10));
    }
    setIsLoading(false);
  }, [currentQuiz.category, currentQuiz.difficulty, isMistakesMode, isPlayAllMode, navigate, setCurrentQuiz]);

  useEffect(() => {
    if (!isLoading && questions.length === 0) {
      navigate(isMistakesMode ? '/mistakes' : '/categories');
    }
  }, [isLoading, questions, navigate, isMistakesMode]);

  useEffect(() => {
    // Reset timer whenever the current question changes
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex, questions]);

  const isAnswerCorrect = (question: Question, answer: string | string[]): boolean => {
    if (!answer) return false;

    const isImageOption = (option: string) => option.startsWith('http');

    switch (question.type) {
      case 'multiple-choice':
        const normalize = (s: string) => isImageOption(s) ? normalizeUrl(s) : s.toLowerCase();
        
        if (Array.isArray(question.correctAnswer)) {
          if (!Array.isArray(answer)) return false;
          const correctAnswerSet = new Set(question.correctAnswer.map(normalize));
          const answerSet = new Set(answer.map(normalize));
          return correctAnswerSet.size === answerSet.size && [...correctAnswerSet].every(a => answerSet.has(a));
        }
        return normalize(answer.toString()) === normalize(question.correctAnswer);
      case 'true-false':
        return answer.toString().toLowerCase() === String(question.correctAnswer).toLowerCase();
      case 'fill-in-the-blank':
        return answer.toString().toLowerCase() === question.correctAnswer.toLowerCase();
      default:
        return false;
    }
  };

  const handleNext = (answerOverride?: string | string[]) => {
    const finalAnswer = answerOverride || selectedAnswer;
    if (!finalAnswer || (Array.isArray(finalAnswer) && finalAnswer.length === 0)) return;

    setShowExplanation(false);
    setShowAnswerResult(false);

    const isCorrect = isAnswerCorrect(currentQuestion, finalAnswer);

    // Track incorrect answers in real-time
    if (!isCorrect && !isPlayAllMode && !isMistakesMode) {
      setIncorrectAnswers(prev => new Set(prev).add(currentQuestion.id));
    }

   const timeToAnswerSec = Math.max(0, Math.round((Date.now() - questionStartTime) / 1000));

   if (isPlayAllMode) {
      if (isCorrect) {
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);

        // Update achievements progress (per-question)
        updateProgress({
          questionsAnswered: 1,
          correctAnswers: 1,
          streak: newStreak,
          timeToAnswerSec,
        });
        
        // Play streak sound effect for milestones
        if (soundEnabled && (newStreak === 5 || newStreak === 10 || newStreak === 15)) {
          soundManager.play('streak');
        }
        
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        const nextQuestion = getRandomQuestions(1);
        setQuestions(nextQuestion);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setCurrentQuiz({ ...currentQuiz, currentStreak: newStreak, maxStreak: Math.max(newStreak, maxStreak) });
      } else {
        // Update achievements progress on streak end
        updateProgress({
          questionsAnswered: 1,
          correctAnswers: 0,
          streak: currentStreak,
          timeToAnswerSec,
        });

        // Play level complete sound when streak ends
        if (soundEnabled && currentStreak > 0) {
          soundManager.play('levelComplete');
        }
        
        navigate('/results', {
          state: {
            playAllMode: true,
            finalStreak: currentStreak,
            maxStreak: Math.max(currentStreak, maxStreak),
            lastQuestion: currentQuestion,
            lastAnswer: finalAnswer
          }
        });
      }
    } else if (!isMistakesMode) {
      const category = currentQuiz.category || '';
      const difficulty = currentQuiz.difficulty || '';
      const categoryProgress = progress[category] || {};
      const difficultyProgress = categoryProgress[difficulty] || { completed: 0, correct: 0 };
      setProgress({
        ...progress,
        [category]: {
          ...categoryProgress,
          [difficulty]: {
            completed: difficultyProgress.completed + 1,
            correct: difficultyProgress.correct + (isCorrect ? 1 : 0)
          }
        }
      });

      // Update achievements per answered question in normal quiz
      updateProgress({
        questionsAnswered: 1,
        correctAnswers: isCorrect ? 1 : 0,
        timeToAnswerSec,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        // To ensure the final answer is included in the score, create an updated answers object for calculation.
        const finalAnswers = {
          ...answers,
          [currentQuestion.id]: finalAnswer,
        };

        const score = Object.entries(finalAnswers).reduce((acc, [questionId, answer]) => {
          const question = questions.find(q => q.id === questionId);
          if (!question) return acc;
          return acc + (isAnswerCorrect(question, answer) ? 1 : 0);
        }, 0);

        // Mark perfect score milestone if applicable (10+ questions and 100%)
        const isPerfect = score === questions.length && questions.length >= 10;
        if (isPerfect) {
          updateProgress({ isPerfectScore: true });
        }

        // Play level complete sound when quiz is finished
        if (soundEnabled) {
          soundManager.play('levelComplete');
        }

        navigate('/results', {
          state: {
            score,
            total: questions.length,
            answers: finalAnswers,
            questions,
            incorrectQuestionIds: Array.from(incorrectAnswers)
          }
        });
      }
    } else if (isCorrect && isMistakesMode) {
      const updatedMistakes = { ...mistakes };
      let hasChanges = false;
      Object.keys(updatedMistakes).forEach(category => {
        const categoryMistakes = updatedMistakes[category];
        const filteredMistakes = categoryMistakes.filter(
          mistake => !(mistake.questionId === currentQuestion.id && mistake.category === currentQuestion.category && mistake.difficulty === currentQuestion.difficulty)
        );
        if (filteredMistakes.length !== categoryMistakes.length) {
          hasChanges = true;
          if (filteredMistakes.length === 0) {
            delete updatedMistakes[category];
          } else {
            updatedMistakes[category] = filteredMistakes;
          }
        }
      });
      if (hasChanges) {
        setMistakes(updatedMistakes);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        navigate('/mistakes');
      }
    } else { // Handle incorrect answers in mistakes mode
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex(prev => prev + 1);
         setSelectedAnswer(null);
       } else {
         navigate('/mistakes');
       }
    }
  };

  const handleAnswerSelect = (answer: string | string[]) => {
    if (showAnswerResult) return;

    const isMultiSelect = Array.isArray(currentQuestion.correctAnswer);

    if (isMultiSelect) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer(answer);
      setShowAnswerResult(true);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
      
      // Play sound effect immediately
      const isCorrect = isAnswerCorrect(currentQuestion, answer);
      if (soundEnabled) {
        if (isCorrect) {
          soundManager.play('correct');
        } else {
          soundManager.play('incorrect');
        }
      }
      
      // Persist mistake immediately for all incorrect answers (covers MCQ, True/False, Fill-in-the-Blank)
      if (!isCorrect && !isPlayAllMode && !isMistakesMode) {
        const categoryKey = currentQuiz.category || currentQuestion.category || '';
        const entry: Mistake = {
          questionId: currentQuestion.id,
          category: currentQuestion.category,
          difficulty: currentQuestion.difficulty,
          selectedAnswer: answer,
          timestamp: Date.now(),
        };
        const existing = mistakes[categoryKey] || [];
        setMistakes({
          ...mistakes,
          [categoryKey]: [...existing, entry],
        });
      }

      setTimeout(() => {
        if (isCorrect) {
          handleNext(answer);
        } else {
          setShowExplanation(true);
        }
      }, 2000);
    }
  };

  const handleMultiSubmit = () => {
    if (showAnswerResult || !selectedAnswer) return;

    setShowAnswerResult(true);

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    // Play sound effect immediately
    const isCorrect = isAnswerCorrect(currentQuestion, selectedAnswer);
    if (soundEnabled) {
      if (isCorrect) {
        soundManager.play('correct');
      } else {
        soundManager.play('incorrect');
      }
    }

    // Persist mistake immediately for multi-select incorrect answers too
    if (!isCorrect && !isPlayAllMode && !isMistakesMode) {
      const categoryKey = currentQuiz.category || currentQuestion.category || '';
      const entry: Mistake = {
        questionId: currentQuestion.id,
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        selectedAnswer: selectedAnswer,
        timestamp: Date.now(),
      };
      const existing = mistakes[categoryKey] || [];
      setMistakes({
        ...mistakes,
        [categoryKey]: [...existing, entry],
      });
    }

    setTimeout(() => {
      if (isCorrect) {
        handleNext(selectedAnswer);
      } else {
        setShowExplanation(true);
      }
    }, 2000);
  };

  if (isLoading || questions.length === 0) {
    return <div>{t('quizScreen.loading')}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        const isMultiSelect = Array.isArray(currentQuestion.correctAnswer);
        return (
          <MultipleChoiceDisplay
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showResult={showAnswerResult}
            onSubmit={isMultiSelect ? handleMultiSubmit : undefined}
          />
        );
      case 'true-false':
        return (
          <TrueFalseDisplay
            question={currentQuestion}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            onAnswerSelect={handleAnswerSelect}
            showResult={showAnswerResult}
          />
        );
      case 'fill-in-the-blank':
        return (
          <FillInTheBlankDisplay
            question={currentQuestion}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            onAnswerSelect={handleAnswerSelect}
            showResult={showAnswerResult}
          />
        );
      default:
        return <p>{t('quizScreen.unsupportedQuestionType')}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-4 pb-20">
      <Header title={isPlayAllMode ? t('dashboard.playAll') : isMistakesMode ? t('mistakesScreen.title') : `${currentQuiz.category ? currentQuiz.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Quiz'} ${currentQuiz.difficulty ? `- ${currentQuiz.difficulty.charAt(0).toUpperCase() + currentQuiz.difficulty.slice(1)}` : ''}`} />

      {/* Question Number Indicator */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-lg">
          <span className="text-3xl font-bold text-primary-content">{currentQuestionIndex + 1}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="px-4">
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 relative border-2 border-b-4 border-base-300">
          <button onClick={() => setShowExplanation(true)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-base-200 transition-colors" aria-label={t('quizScreen.showExplanation')}>
            <InformationCircleIcon className="w-6 h-6 text-base-content/40 hover:text-base-content/60 transition-colors" />
          </button>
          {currentQuestion.imageUrl && <img src={currentQuestion.imageUrl} alt="Question" className="w-full h-auto object-cover rounded-t-2xl mb-4" />}
          <h2 className="text-xl font-medium text-base-content mb-6 pr-10">{currentQuestion.question}</h2>
          {renderQuestion()}
        </div>
      </div>

      {/* The main "Next" button is no longer needed as flow is handled by the explanation modal or an automatic timeout. */}

      {/* Explanation Modal */}
      {showExplanation && (
        <div className="fixed inset-0 bg-base-200/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border-2 border-b-4 border-base-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              <h3 className="text-xl font-bold text-base-content">{t('resultsScreen.explanation')}</h3>
              </div>
              <div className="prose max-w-none text-base-content/80 mb-6 bg-base-200/50 p-4 rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentQuestion.explanation}</ReactMarkdown>
              </div>
            </div>
            <div className="bg-base-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setShowExplanation(false);
                  handleNext(selectedAnswer || undefined);
                }}
                className="btn btn-primary rounded-2xl font-bold border-2 border-b-4"
              >
                {t('quizScreen.understood')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
