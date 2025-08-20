import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { useCategoryEmojis } from '../hooks/useCategoryEmojis';
import { Question, QuestionType, MultipleChoiceQuestion, TrueFalseQuestion, FillInTheBlankQuestion } from '../types/question';
import { config } from '../config';
import Header from '../components/Header';
import CategoryEmojiMapping from '../components/CategoryEmojiMapping';

type QuestionFormData = {
  type: QuestionType;
  category: string;
  categoryEmoji?: string;
  question: string;
  imageUrl?: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: { value: string }[];
  correctAnswer: string;
  correctAnswers: string[];
  correctBooleanAnswer: 'true' | 'false';
  isMultiCorrect?: boolean;
};

export default function QuestionFormScreen() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { customQuestions, addQuestion, updateQuestion } = useCustomQuestions();
  const { emojis, addCustomEmoji } = useCategoryEmojis();
  const isEditing = !!questionId;
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [showCategoryMapping, setShowCategoryMapping] = useState(false);

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<QuestionFormData>({
    defaultValues: {
      type: 'multiple-choice',
      difficulty: 'easy',
      options: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
      correctAnswer: '',
      correctAnswers: [],
      correctBooleanAnswer: 'true',
    }
  });

  const questionType = watch('type');
  const categoryValue = watch('category');

  useEffect(() => {
    // Check if the category is new
    if (categoryValue && !isEditing) {
      const isExistingCategory = Object.keys(emojis).some(
        key => key.toLowerCase() === categoryValue.toLowerCase()
      );
      setIsNewCategory(!isExistingCategory);
    } else {
      setIsNewCategory(false);
    }
  }, [categoryValue, emojis, isEditing]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });

  useEffect(() => {
    if (isEditing) {
      const questionToEdit = customQuestions.find(q => q.id === questionId);
      if (questionToEdit) {
        setValue('type', questionToEdit.type);
        setValue('category', questionToEdit.category);
        setValue('question', questionToEdit.question);
        setValue('imageUrl', questionToEdit.imageUrl);
        setValue('explanation', questionToEdit.explanation);
        setValue('difficulty', questionToEdit.difficulty);

        if (questionToEdit.type === 'multiple-choice') {
          setValue('options', questionToEdit.options.map(o => ({ value: o })));
          if (Array.isArray(questionToEdit.correctAnswer)) {
            setValue('correctAnswers', questionToEdit.correctAnswer);
          } else {
            setValue('correctAnswer', questionToEdit.correctAnswer);
          }
        } else if (questionToEdit.type === 'true-false') {
          setValue('correctBooleanAnswer', questionToEdit.correctAnswer ? 'true' : 'false');
        } else if (questionToEdit.type === 'fill-in-the-blank') {
          setValue('correctAnswer', questionToEdit.correctAnswer);
        }
      }
    }
  }, [isEditing, questionId, customQuestions, setValue]);

  const onSubmit = (data: QuestionFormData) => {
    // Save the new category emoji if it's a new category
    if (isNewCategory && data.category && data.categoryEmoji) {
      addCustomEmoji(data.category, data.categoryEmoji);
    }

    let questionData: Omit<Question, 'id' | 'source'>;

    switch (data.type) {
      case 'multiple-choice':
        questionData = {
          type: 'multiple-choice',
          category: data.category,
          question: data.question,
          imageUrl: data.imageUrl,
          explanation: data.explanation,
          difficulty: data.difficulty,
          options: data.options.map(o => o.value),
          correctAnswer: data.correctAnswers.length > 1 ? data.correctAnswers : data.correctAnswer,
        } as Omit<MultipleChoiceQuestion, 'id' | 'source'>;
        break;
      case 'true-false':
        questionData = {
          type: 'true-false',
          category: data.category,
          question: data.question,
          imageUrl: data.imageUrl,
          explanation: data.explanation,
          difficulty: data.difficulty,
          correctAnswer: data.correctBooleanAnswer === 'true',
        } as Omit<TrueFalseQuestion, 'id' | 'source'>;
        break;
      case 'fill-in-the-blank':
        questionData = {
          type: 'fill-in-the-blank',
          category: data.category,
          question: data.question,
          imageUrl: data.imageUrl,
          explanation: data.explanation,
          difficulty: data.difficulty,
          correctAnswer: data.correctAnswer,
        } as Omit<FillInTheBlankQuestion, 'id' | 'source'>;
        break;
      default:
        throw new Error("Invalid question type");
    }

    if (isEditing && questionId) {
      updateQuestion({ ...questionData, id: questionId, source: 'custom' } as Question);
    } else {
      addQuestion(questionData);
    }
    navigate('/questions');
  };

  const handleCategorySelect = (category: string) => {
    setValue('category', category);
    setShowCategoryMapping(false);
  };

  return (
    <div className="pt-4 pb-20">
      <Header title={isEditing ? 'Edit Question' : 'New Question'} />

      {/* Category Emoji Mapping Modal */}
      {showCategoryMapping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CategoryEmojiMapping onCategorySelect={handleCategorySelect} />
            <div className="p-4">
              <button
                onClick={() => setShowCategoryMapping(false)}
                className="btn btn-primary w-full rounded-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
        {/* Question Type */}
        <div>
          <label className="label">Question Type</label>
          <select {...register('type')} className="select select-bordered w-full">
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-in-the-blank">Fill in the Blank</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <div className="flex space-x-2">
            <input
              {...register('category', { required: 'Category is required' })}
              className="input input-bordered w-full"
              placeholder="Enter or select a category"
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowCategoryMapping(true)}
            >
              View Mapping
            </button>
          </div>
          {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Category Emoji (only for new categories) */}
        {isNewCategory && !isEditing && (
          <div>
            <label className="label">Category Emoji</label>
            <input
              {...register('categoryEmoji', { required: 'Emoji is required for new categories' })}
              className="input input-bordered w-full"
              placeholder="Enter an emoji for this new category"
            />
            {errors.categoryEmoji && <p className="text-error text-sm mt-1">{errors.categoryEmoji.message}</p>}
          </div>
        )}

        {/* Question */}
        <div>
          <label className="label">Question</label>
          <textarea {...register('question', { required: 'Question is required' })} className="textarea textarea-bordered w-full" />
          {errors.question && <p className="text-error text-sm mt-1">{errors.question.message}</p>}
        </div>

        {/* Image URL */}
        {config.quizFeatures.enableQuestionImage && (
          <div>
            <label className="label">Image URL (Optional)</label>
            <input {...register('imageUrl')} className="input input-bordered w-full" />
          </div>
        )}

        {/* Type-specific fields */}
        {questionType === 'multiple-choice' && (
          <div>
            <label className="label">Options & Correct Answers</label>
            {config.quizFeatures.enableMultiSelect && (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Allow multiple correct answers</span>
                  <input type="checkbox" className="toggle toggle-primary" {...register('isMultiCorrect')} />
                </label>
              </div>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                {watch('isMultiCorrect') && config.quizFeatures.enableMultiSelect ? (
                  <input type="checkbox" {...register(`correctAnswers`)} value={watch(`options.${index}.value`)} className="checkbox checkbox-primary" />
                ) : (
                  <input type="radio" {...register(`correctAnswer`)} value={watch(`options.${index}.value`)} className="radio radio-primary" />
                )}
                <input {...register(`options.${index}.value`, { required: 'Option is required' })} className="input input-bordered w-full" placeholder={config.quizFeatures.enableImageOptions ? "Enter option text or image URL" : "Enter option text"} />
                <button type="button" onClick={() => remove(index)} className="btn btn-error btn-sm">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => append({ value: '' })} className="btn btn-sm mt-2">Add Option</button>
          </div>
        )}

        {questionType === 'true-false' && (
          <div>
            <label className="label">Correct Answer</label>
            <select {...register('correctBooleanAnswer')} className="select select-bordered w-full">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}

        {questionType === 'fill-in-the-blank' && (
          <div>
            <label className="label">Correct Answer</label>
            <input {...register('correctAnswer', { required: 'Correct answer is required' })} className="input input-bordered w-full" />
          </div>
        )}

        {/* Explanation */}
        <div>
          <label className="label">Explanation</label>
          <textarea {...register('explanation', { required: 'Explanation is required' })} className="textarea textarea-bordered w-full" />
          <p className="text-xs text-base-content/70 mt-1">💡 Supports Markdown formatting for rich text, links, and lists</p>
          {errors.explanation && <p className="text-error text-sm mt-1">{errors.explanation.message}</p>}
        </div>

        {/* Difficulty */}
        <div>
          <label className="label">Difficulty</label>
          <select {...register('difficulty')} className="select select-bordered w-full">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full rounded-2xl border-b-4 border-primary-focus
                  hover:shadow-elevated active:translate-y-0.5 transition-all duration-150">
          {isEditing ? 'Save Changes' : 'Create Question'}
        </button>
      </form>
    </div>
  );
}