import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useQuestions } from '../hooks/useQuestions';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyOption {
  value: Difficulty;
  label: string;
  description: string;
  color: string;
  questionCount: number;
}

const difficultyColors = {
  easy: 'bg-success/20 border-success/30 text-success-content hover:bg-success/30',
  medium: 'bg-info/20 border-info/30 text-info-content hover:bg-info/30',
  hard: 'bg-error/20 border-error/30 text-error-content hover:bg-error/30',
};

export default function DifficultyScreen() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { setCurrentQuiz } = useQuiz();
  const { getQuestionsByCategory } = useQuestions();
  const { t } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [availableDifficulties, setAvailableDifficulties] = useState<DifficultyOption[]>([]);

  // Get available difficulties based on questions in the category
  useEffect(() => {
    if (!categoryId) {
      navigate('/categories');
      return;
    }

    const questions = getQuestionsByCategory(categoryId);
    const difficulties = new Set(questions.map(q => q.difficulty));

    const options: DifficultyOption[] = Array.from(difficulties).map(diff => ({
      value: diff as Difficulty,
      label: diff.charAt(0).toUpperCase() + diff.slice(1),
      description: t(`difficultyDescriptions.${diff}`),
      color: difficultyColors[diff as Difficulty],
      questionCount: questions.filter(q => q.difficulty === diff).length,
    }));

    // Sort by difficulty level: easy -> medium -> hard
    options.sort((a, b) => {
      const order = { easy: 0, medium: 1, hard: 2 };
      return order[a.value] - order[b.value];
    });

    setAvailableDifficulties(options);

    // Select the first available difficulty by default
    if (options.length > 0 && !selectedDifficulty) {
      setSelectedDifficulty(options[0].value);
    }
  }, [categoryId, navigate]);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStart = () => {
    if (!selectedDifficulty || !categoryId) return;

    setCurrentQuiz({
      category: categoryId,
      difficulty: selectedDifficulty,
      progress: 0,
      score: 0,
    });
    navigate('/quiz');
  };

  if (availableDifficulties.length === 0) {
    return (
      <div className="pt-4 px-4 pb-20">
        <Header title={t('difficultyScreen.title')} />
        <p className="text-center text-base-content/80 mt-8">
          {t('difficultyScreen.noQuestions')}
        </p>
      </div>
    );
  }

  return (
    <div className="pt-4 pb-20">
      <Header title={t('difficultyScreen.title')} />

      {/* Difficulty Options */}
      <div className="px-4 space-y-4">
        {availableDifficulties.map((option) => (
          <button
            key={option.value}
            onClick={() => handleDifficultySelect(option.value)}
            className={`w-full p-6 rounded-xl border transition-all
                       ${option.color}
                       ${
                         selectedDifficulty === option.value
                           ? 'ring-2 ring-primary border-transparent'
                           : ''
                       }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">{option.label}</span>
              <span className="text-sm opacity-75">{option.description}</span>
              <span className="text-xs mt-2">
                {option.questionCount} {t('difficultyScreen.questionsAvailable')}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Start Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <button
          onClick={handleStart}
          disabled={!selectedDifficulty}
          className="w-full bg-primary text-primary-content py-4 rounded-xl font-medium
                   hover:bg-primary-focus transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('difficultyScreen.startQuiz')}
        </button>
      </div>
    </div>
  );
}
