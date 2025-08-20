import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type ImportQuestionsModalProps = {
  onClose: () => void;
  onImport: (data: string, format: 'json' | 'csv') => void;
  error?: string | null;
};

const jsonFormatHint = `
[
  {
    "type": "multiple-choice",
    "question": "What is the capital of France?",
    "category": "Geography",
    "difficulty": "easy",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "correctAnswer": "Paris",
    "explanation": "Paris is the capital and most populous city of France."
  },
  {
    "type": "true-false",
    "question": "The Earth is flat.",
    "category": "Science",
    "difficulty": "easy",
    "correctAnswer": false,
    "explanation": "The Earth is an oblate spheroid."
  }
]
`;

const csvFormatHint = `
type,question,category,difficulty,options,correctAnswer,explanation
multiple-choice,"What is 2+2?","Math","easy","[""3"",""4"",""5""]","4","It's basic addition."
true-false,"Is the sky blue?","Science","easy",,"true","Rayleigh scattering causes the sky to appear blue."
fill-in-the-blank,"The first president of the USA was ___ Washington.","History","medium",,"George","George Washington was the first president."
`;

const aiPromptHint = `
Tip: You can ask an AI to help you create questions in the correct format. Just copy the text below and paste it into your favorite AI chat tool.

"Please generate [number] quiz questions about [topic] in the following ${'{format}'} format:
${'{hint}'}"

Note: The JSON format supports importing custom category emojis, while CSV does not.
`;

export default function ImportQuestionsModal({ onClose, onImport, error }: ImportQuestionsModalProps) {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('');
  const { designTokens } = useTheme();
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setRawText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    if (rawText.trim()) {
      onImport(rawText, format);
    }
  };

  const hintText = format === 'json' ? jsonFormatHint : csvFormatHint;
  const finalAiPrompt = aiPromptHint.replace('{format}', format.toUpperCase()).replace('{hint}', hintText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-base-100 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-b-4 border-base-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-questions-title"
      >
        <div className="p-6">
          <h3
            id="import-questions-title"
            className="text-2xl font-bold mb-6"
            style={{ color: designTokens.colors.text }}
          >
            {t('importQuestionsModal.title')}
          </h3>
        
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">{t('importQuestionsModal.importFormat')}</span>
            </label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input 
                  type="radio" 
                  name="format" 
                  className="radio radio-primary" 
                  checked={format === 'json'} 
                  onChange={() => setFormat('json')} 
                />
                <span className="label-text ml-2">{t('importQuestionsModal.json')}</span>
              </label>
              <label className="label cursor-pointer">
                <input 
                  type="radio" 
                  name="format" 
                  className="radio radio-primary" 
                  checked={format === 'csv'} 
                  onChange={() => setFormat('csv')} 
                />
                <span className="label-text ml-2">{t('importQuestionsModal.csv')}</span>
              </label>
            </div>
          </div>

          <div className="form-control mt-4">
            <label htmlFor="file-upload" className="btn btn-outline rounded-2xl border-2 border-b-4">
              {fileName ? `Selected: ${fileName}` : t('importQuestionsModal.dropFile', { format: format.toUpperCase() })}
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".json,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="divider">{t('importQuestionsModal.or')}</div>

          <div className="form-control">
            <textarea
              className="textarea textarea-bordered h-32"
              placeholder={t('importQuestionsModal.pasteRaw')}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            ></textarea>
          </div>

          <div className="collapse collapse-arrow border border-base-300 bg-base-200 mt-4">
            <input type="checkbox" /> 
            <div className="collapse-title text-md font-medium flex justify-between items-center">
              {t('importQuestionsModal.formatInfo', { format: format.toUpperCase() })}
              <ChevronDownIcon className="w-5 h-5 transition-transform duration-300" />
            </div>
            <div className="collapse-content bg-base-100"> 
              <p className="text-sm mt-2">{t('importQuestionsModal.formatInfo', { format: format.toUpperCase() })}</p>
              <pre className="text-xs bg-neutral text-neutral-content p-2 rounded-md my-2 overflow-x-auto">
                {hintText}
              </pre>
              <p className="text-sm mt-2">{finalAiPrompt}</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error mt-4 max-h-40 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{error}</pre>
            </div>
          )}

          <div className="modal-action">
            <button onClick={onClose} className="btn btn-ghost rounded-2xl">{t('importQuestionsModal.cancel')}</button>
            <button onClick={handleImportClick} className="btn btn-primary rounded-2xl border-b-4 border-primary-focus
                      hover:shadow-elevated active:translate-y-0.5 transition-all duration-150">{t('importQuestionsModal.import')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}