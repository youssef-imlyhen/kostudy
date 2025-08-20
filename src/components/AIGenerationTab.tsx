import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GoogleGenAI } from '@google/genai';
import { Question } from '../types/question';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { config } from '../config';
import { useCategoryEmojis } from '../hooks/useCategoryEmojis';
import { MediaContext } from '../types/media';
import { mediaContextToParts, getMediaContextPrompt, isMediaContextReady } from '../utils/mediaUtils';
import MediaContextSelector from './MediaContextSelector';
import { useLanguage } from '../context/LanguageContext';

interface AIGenerationTabProps {
  onQuestionsGenerated: (questions: Question[]) => void;
}

interface CategoryEmojiMap {
  [category: string]: string;
}

export default function AIGenerationTab({ onQuestionsGenerated }: AIGenerationTabProps) {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useLocalStorage('geminiApiKey', '');
  const [prompt, setPrompt] = useState('');
  const [mediaContext, setMediaContext] = useState<MediaContext>({ type: 'none' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [newCategoryEmojis, setNewCategoryEmojis] = useState<CategoryEmojiMap>({});
  const [showEmojiReview, setShowEmojiReview] = useState(false);
  const { designTokens } = useTheme();
  const { emojis, addCustomEmoji } = useCategoryEmojis();

  useEffect(() => {
    setIsKeyValid(!!apiKey);
    setShowKeyInput(!apiKey);
  }, [apiKey]);

  const handleGenerate = async () => {
    if (!apiKey) {
      setError(t('aiGenerationTab.errors.apiKeyMissing'));
      return;
    }
    if (!prompt) {
      setError(t('aiGenerationTab.errors.promptMissing'));
      return;
    }
    if (!isMediaContextReady(mediaContext)) {
      setError(t('aiGenerationTab.errors.mediaContextMissing'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedQuestions(null);
    setNewCategoryEmojis({});
    setShowEmojiReview(false);

    try {
      const genAI = new GoogleGenAI({ apiKey });

      const featureInstructions = [
        config.quizFeatures.enableQuestionImage && `"imageUrl": "An optional URL to an image for the question"`,
        config.quizFeatures.enableImageOptions && `"options": ["Option 1", "Option 2", "Option 3", "Option 4"], // Can be text or image URLs`,
        config.quizFeatures.enableMultiSelect && `"correctAnswer": "Correct Answer", // or ["Correct Answer 1", "Correct Answer 2"] for multi-select`
      ].filter(Boolean).join(',\n          ');

      // Get media context parts
      const mediaParts = await mediaContextToParts(mediaContext, genAI);
      const mediaPromptPrefix = getMediaContextPrompt(mediaContext);

      const fullPrompt = `
        ${mediaPromptPrefix}generate a list of quiz questions in JSON format.
        The user's text will specify the topic and the number of questions to generate.
        Each question object must have the following structure:
        {
          "id": "a-unique-uuid",
          "category": "A relevant category based on the content, with ' (AI Gen)' appended",
          "question": "The question text",
          ${featureInstructions ? `${featureInstructions},` : ''}
          "type": "multiple-choice", // or "true-false" or "fill-in-the-blank"
          "difficulty": "medium", // or "easy" or "hard"
          "explanation": "A brief explanation of why the answer is correct. Supports markdown formatting for rich text, links, and lists."
        }
        Ensure the JSON is well-formed and respects the number of questions requested in the text. You can use markdown in explanations for better formatting.

        User's request:
        ---
        ${prompt}
        ---
      `;

      // Prepare content parts
      const contentParts = [
        ...mediaParts,
        { text: fullPrompt }
      ];

      const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{
          parts: contentParts
        }]
      });
      const text = result.text || '';

      // Clean the response to get valid JSON
      const jsonString = text.replace(/```json|```/g, '').trim();
      const questions = JSON.parse(jsonString);

      setGeneratedQuestions(questions);
    } catch (e) {
      console.error(e);
      setError(t('aiGenerationTab.errors.generationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    // Check for new categories that need emoji assignment
    if (generatedQuestions) {
      const newCategories = generatedQuestions
        .map(q => q.category)
        .filter((category, index, self) => self.indexOf(category) === index) // Get unique categories
        .filter(category => !Object.keys(emojis).some(key => key.toLowerCase() === category.toLowerCase()));

      if (newCategories.length > 0) {
        // Initialize newCategoryEmojis with empty strings for new categories
        const initialEmojis: CategoryEmojiMap = {};
        newCategories.forEach(category => {
          initialEmojis[category] = '';
        });
        setNewCategoryEmojis(initialEmojis);
        setShowEmojiReview(true);
      } else {
        // No new categories, proceed directly
        onQuestionsGenerated(generatedQuestions);
        setGeneratedQuestions(null);
        setPrompt('');
      }
    }
  };

  const handleSaveEmojisAndQuestions = () => {
    // Save new category emojis
    Object.entries(newCategoryEmojis).forEach(([category, emoji]) => {
      if (emoji) {
        addCustomEmoji(category, emoji);
      }
    });

    // Proceed with saving questions
    if (generatedQuestions) {
      onQuestionsGenerated(generatedQuestions);
      setGeneratedQuestions(null);
      setPrompt('');
      setShowEmojiReview(false);
      setNewCategoryEmojis({});
    }
  };

  const handleEmojiChange = (category: string, emoji: string) => {
    setNewCategoryEmojis(prev => ({
      ...prev,
      [category]: emoji
    }));
  };

  return (
    <div className="p-4" style={{ fontFamily: designTokens.typography.fontFamily }}>
      <div className="mb-4 p-4 bg-base-200 rounded-lg" style={{ borderRadius: designTokens.borderRadius.md }}>
        {isKeyValid && !showKeyInput ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6" style={{ color: designTokens.colors.success }} />
              <span className="font-medium" style={{ fontWeight: designTokens.typography.fontWeight.medium }}>
                {t('aiGenerationTab.apiKey.set')}
              </span>
            </div>
            <button
              onClick={() => setShowKeyInput(true)}
              className="btn btn-sm btn-ghost"
              style={{
                fontFamily: designTokens.typography.fontFamily,
                fontWeight: designTokens.typography.fontWeight.regular,
              }}
            >
              {t('aiGenerationTab.apiKey.change')}
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1" style={{ color: designTokens.colors.textMuted }}>
              {t('aiGenerationTab.apiKey.label')}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-field flex-grow"
                placeholder={t('aiGenerationTab.apiKey.placeholder')}
                style={{
                  borderRadius: designTokens.borderRadius.md,
                  fontFamily: designTokens.typography.fontFamily,
                }}
              />
              <button
                onClick={() => {
                  if (apiKey) {
                    setIsKeyValid(true);
                    setShowKeyInput(false);
                  }
                }}
                className="btn btn-primary"
                style={{
                  borderRadius: designTokens.borderRadius.md,
                  fontFamily: designTokens.typography.fontFamily,
                  fontWeight: designTokens.typography.fontWeight.medium,
                }}
              >
                {t('aiGenerationTab.apiKey.save')}
              </button>
            </div>
            <p className="mt-2 text-xs" style={{ color: designTokens.colors.textMuted }}>
              {t('aiGenerationTab.apiKey.info')}{' '}
              <a
                href="https://ai.dev/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
                style={{ color: designTokens.colors.primary }}
              >
                ai.google.dev
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Media Context Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: designTokens.colors.text }}>
          {t('aiGenerationTab.mediaContext.title')}
        </h3>
        <MediaContextSelector
          value={mediaContext}
          onChange={setMediaContext}
          disabled={isLoading}
          className="mb-4"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium" style={{ color: designTokens.colors.text }}>
          {t('aiGenerationTab.prompt.label')}
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input-field mt-1"
          placeholder={
            mediaContext.type === 'none'
              ? t('aiGenerationTab.prompt.placeholder')
              : t('aiGenerationTab.prompt.placeholderWithContext', { context: mediaContext.type })
          }
          style={{
            borderRadius: designTokens.borderRadius.md,
            fontFamily: designTokens.typography.fontFamily,
          }}
        />
        {mediaContext.type !== 'none' && (
          <p className="text-xs text-base-content/60 mt-2">
            {t('aiGenerationTab.prompt.contextInfo', { context: mediaContext.type })}
          </p>
        )}
      </div>

      <button
        onClick={handleGenerate}
        className="btn btn-primary w-full rounded-2xl hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
        disabled={isLoading}
      >
        {isLoading ? t('aiGenerationTab.buttons.generating') : t('aiGenerationTab.buttons.generate')}
      </button>

      {error && <p className="text-error text-sm mt-4" style={{ color: designTokens.colors.error }}>{error}</p>}

      {showEmojiReview && generatedQuestions && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4" style={{
            fontWeight: designTokens.typography.fontWeight.bold,
            color: designTokens.colors.text,
          }}>
            {t('aiGenerationTab.buttons.assignEmojis')}
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-base-200 rounded-lg" style={{ borderRadius: designTokens.borderRadius.md }}>
            {Object.entries(newCategoryEmojis).map(([category, emoji]) => (
              <div key={category} className="p-3 bg-base-100 rounded-md shadow flex items-center space-x-4" style={{ borderRadius: designTokens.borderRadius.md }}>
                <span className="text-2xl">{emoji || '❓'}</span>
                <div className="flex-grow">
                  <p className="font-semibold" style={{ fontWeight: designTokens.typography.fontWeight.semibold }}>{category}</p>
                  <input
                    type="text"
                    value={emoji}
                    onChange={(e) => handleEmojiChange(category, e.target.value)}
                    className="input input-bordered w-full mt-2"
                    placeholder={t('aiGenerationTab.buttons.enterEmoji')}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowEmojiReview(false)}
              className="btn btn-ghost rounded-2xl"
            >
              {t('aiGenerationTab.buttons.back')}
            </button>
            <button
              onClick={handleSaveEmojisAndQuestions}
              className="btn btn-primary rounded-2xl border-b-4 border-primary-focus
                        hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
              disabled={Object.values(newCategoryEmojis).some(emoji => !emoji)}
            >
              {t('aiGenerationTab.buttons.saveAndAdd')}
            </button>
          </div>
        </div>
      )}

      {generatedQuestions && !showEmojiReview && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4" style={{
            fontWeight: designTokens.typography.fontWeight.bold,
            color: designTokens.colors.text,
          }}>
            {t('aiGenerationTab.buttons.preview')}
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-base-200 rounded-lg" style={{ borderRadius: designTokens.borderRadius.md }}>
            {generatedQuestions.map((q, index) => (
              <div key={index} className="p-3 bg-base-100 rounded-md shadow" style={{ borderRadius: designTokens.borderRadius.md }}>
                <p className="font-semibold" style={{ fontWeight: designTokens.typography.fontWeight.semibold }}>{q.question}</p>
                <p className="text-sm" style={{ color: designTokens.colors.textMuted }}>{q.category} - {q.difficulty}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setGeneratedQuestions(null)}
              className="btn btn-ghost rounded-2xl"
            >
              {t('aiGenerationTab.buttons.discard')}
            </button>
            <button
              onClick={handleApprove}
              className="btn btn-primary rounded-2xl border-b-4 border-primary-focus
                        hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
            >
              {Object.keys(newCategoryEmojis).length > 0 ? t('aiGenerationTab.buttons.nextAssign') : t('aiGenerationTab.buttons.approveAndAdd')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}