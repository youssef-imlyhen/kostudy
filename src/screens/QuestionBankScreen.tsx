import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { useLanguage } from '../context/LanguageContext';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CpuChipIcon,
  Bars3Icon,
  TrashIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  DocumentPlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import ImportQuestionsModal from '../components/ImportQuestionsModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { parseAndValidate } from '../utils/import';
import AIGenerationTab from '../components/AIGenerationTab';
import { config } from '../config';
import { Question } from '../types/question';
import Header from '../components/Header';

type ViewMode = 'manual' | 'ai';

export default function QuestionBankScreen() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { customQuestions, deleteQuestion, addBulkQuestions, bulkDeleteQuestions } = useCustomQuestions();
  const [searchTerm, setSearchTerm] = useState('');
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('manual');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const handleImport = (data: string, format: 'json' | 'csv') => {
    setImportError(null);
    
    if (format === 'json') {
      try {
        const parsedData = JSON.parse(data);
        
        // Check if the imported data has the new format with customEmojis
        if (parsedData.questions && parsedData.customEmojis) {
          // Handle new format
          const { validQuestions, errors } = parseAndValidate(JSON.stringify(parsedData.questions), 'json');
          
          if (errors.length > 0) {
            // Format the error message for better readability
            const formattedError = `${t('questionBankScreen.importModal.importFailed')}\n\n- ${errors.join('\n- ')}`;
            setImportError(formattedError);
            return; // Keep the modal open to show the error
          }
          
          // Save custom emojis to localStorage
          localStorage.setItem('customCategoryEmojis', JSON.stringify(parsedData.customEmojis));
          
          if (validQuestions.length > 0) {
            addBulkQuestions(validQuestions);
          }
        } else {
          // Handle old format (only questions)
          const { validQuestions, errors } = parseAndValidate(data, 'json');
          
          if (errors.length > 0) {
            // Format the error message for better readability
            const formattedError = `${t('questionBankScreen.importModal.importFailed')}\n\n- ${errors.join('\n- ')}`;
            setImportError(formattedError);
            return; // Keep the modal open to show the error
          }
          
          if (validQuestions.length > 0) {
            addBulkQuestions(validQuestions);
          }
        }
      } catch (e) {
        setImportError(t('questionBankScreen.importModal.invalidJson'));
        return;
      }
    } else {
      // For CSV, use the existing logic
      const { validQuestions, errors } = parseAndValidate(data, format);
      
      if (errors.length > 0) {
        // Format the error message for better readability
        const formattedError = `${t('questionBankScreen.importModal.importFailed')}\n\n- ${errors.join('\n- ')}`;
        setImportError(formattedError);
        return; // Keep the modal open to show the error
      }
      
      if (validQuestions.length > 0) {
        addBulkQuestions(validQuestions);
      }
    }
    
    setImportModalOpen(false);
  };

  const handleExport = () => {
    // Get custom emojis from localStorage
    const customEmojis = JSON.parse(localStorage.getItem('customCategoryEmojis') || '{}');
    
    // Create export data object
    const exportData = {
      questions: customQuestions,
      customEmojis: customEmojis
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'quiz_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredQuestions = customQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAiQuestionsGenerated = (questions: Question[]) => {
    addBulkQuestions(questions);
    setViewMode('manual'); // Switch back to manual view after adding
  };

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestions(prev =>
      prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id));
    }
  };

  const handleDeleteSelected = () => {
    bulkDeleteQuestions(selectedQuestions);
    setSelectedQuestions([]);
  };

  const isAllSelected = useMemo(() => {
    return filteredQuestions.length > 0 && selectedQuestions.length === filteredQuestions.length;
  }, [selectedQuestions, filteredQuestions]);

  return (
    <div className="pb-20">
      <Header title={t('questionBankScreen.title')} />

      {/* Tabs */}
      {config.aiFeatures?.enableAIGeneration && (
        <div className="px-4 mb-4">
          <div className="tabs tabs-boxed bg-base-200/50">
            <a className={`tab tab-lg flex-1 ${viewMode === 'manual' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onClick={() => setViewMode('manual')}>
              <Bars3Icon className="w-5 h-5 mr-2" />
              {t('questionBankScreen.manual')}
            </a>
            <a className={`tab tab-lg flex-1 ${viewMode === 'ai' ? 'tab-active !bg-primary !text-primary-content' : ''}`} onClick={() => setViewMode('ai')}>
              <CpuChipIcon className="w-5 h-5 mr-2" />
              {t('questionBankScreen.aiMode')}
            </a>
          </div>
        </div>
      )}

      {/* Action Bar */}
      {viewMode === 'manual' && (
        <div className="px-4 mb-4">
          <div className="flex gap-2 justify-center items-center mb-2">
            <button onClick={() => navigate('/questions/new')} className="btn btn-primary">
              <DocumentPlusIcon className="w-5 h-5" />
              {t('questionBankScreen.addNew')}
            </button>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline">
                {t('questionBankScreen.options')}
                <ChevronDownIcon className="w-5 h-5" />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
                <li>
                  <a onClick={() => setImportModalOpen(true)}>
                    <ArrowUpTrayIcon className="w-5 h-5" />
                    {t('questionBankScreen.import')}
                  </a>
                </li>
                <li>
                  <a onClick={handleExport}>
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    {t('questionBankScreen.export')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-base-content/70">
            {t('questionBankScreen.markdownSupport')}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {viewMode === 'manual' ? (
          <>
            {/* Search and Select All */}
            <div className="px-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-4">
              <div className="relative flex-grow">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder={t('questionBankScreen.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    disabled={filteredQuestions.length === 0}
                    id="select-all-checkbox"
                  />
                  <label htmlFor="select-all-checkbox" className="ml-2 cursor-pointer">{t('questionBankScreen.selectAll')}</label>
                </div>
                {selectedQuestions.length > 0 && (
                  <button onClick={handleDeleteSelected} className="btn btn-error ml-4">
                    <TrashIcon className="w-5 h-5 mr-2" />
                    {t('questionBankScreen.delete')} ({selectedQuestions.length})
                  </button>
                )}
              </div>
            </div>

            {/* Question List */}
            <div className="px-4 space-y-3 pb-24">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map(question => (
                  <div key={question.id} className={`card flex items-start p-4 ${selectedQuestions.includes(question.id) ? 'ring-2 ring-primary' : ''}`}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-4 mt-1"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => handleSelectQuestion(question.id)}
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-base-content">{question.question}</p>
                      <div className="flex flex-wrap gap-2 items-center mt-2 text-sm text-base-content/80">
                        <span className="badge badge-ghost">{question.category}</span>
                        <span className="badge badge-outline">{question.difficulty}</span>
                      </div>
                      <div className="flex justify-end items-center mt-3 space-x-2 border-t border-base-200/50 pt-3">
                        <button
                          onClick={() => navigate(`/questions/edit/${question.id}`)}
                          className="btn btn-sm btn-ghost text-primary"
                        >
                          {t('questionBankScreen.edit')}
                        </button>
                        <button
                          onClick={() => {
                            setQuestionToDelete(question.id);
                            setDeleteModalOpen(true);
                          }}
                          className="btn btn-sm btn-ghost text-error"
                        >
                          {t('questionBankScreen.delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-base-content/70">{t('questionBankScreen.noQuestions')}</h3>
                  <p className="text-base-content/50 mt-2">
                    {searchTerm ? t('questionBankScreen.noResults', { searchTerm: searchTerm }) : t('questionBankScreen.emptyBank')}
                  </p>
                  {!searchTerm && (
                    <button onClick={() => navigate('/questions/new')} className="btn btn-primary mt-6">
                      <PlusIcon className="w-5 h-5 mr-2" />
                      {t('questionBankScreen.addFirstQuestion')}
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <AIGenerationTab onQuestionsGenerated={handleAiQuestionsGenerated} />
        )}
      </div>

      {isImportModalOpen && (
        <ImportQuestionsModal
          onClose={() => {
            setImportModalOpen(false);
            setImportError(null);
          }}
          onImport={handleImport}
          error={importError}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (questionToDelete) {
            deleteQuestion(questionToDelete);
            setQuestionToDelete(null);
          }
        }}
        title={t('questionBankScreen.confirmDelete.title')}
        message={t('questionBankScreen.confirmDelete.message')}
      />

    </div>
  );
}