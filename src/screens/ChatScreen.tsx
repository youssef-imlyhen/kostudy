import React, { useState, useRef, useMemo } from 'react';
import { useChat } from '../hooks/useChat';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useQuestions } from '../hooks/useQuestions';
import { useCustomQuestions } from '../hooks/useCustomQuestions';
import { BookOpenIcon, UserIcon, CpuChipIcon, MicrophoneIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { FiSend } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/Header';
import GeminiLiveComponent from '../components/GeminiLiveComponent';
import { MediaContext } from '../types/media';
import InlineMediaContextSelector from '../components/InlineMediaContextSelector';
import { useLanguage } from '../context/LanguageContext';

const ChatScreen = () => {
  const { t } = useLanguage();
  const [apiKey] = useLocalStorage('geminiApiKey', '');
  const { messages, loading, error, sendMessage, clearChat } = useChat(apiKey);
  const [input, setInput] = useState('');
  const [mediaContext, setMediaContext] = useState<MediaContext>({ type: 'none' });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callError, setCallError] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { getCategories, allQuestions } = useQuestions();
  const { customQuestions } = useCustomQuestions();
  const [mistakes] = useLocalStorage<any>('quizMistakes', {});
  const categories = getCategories();

  const context = useMemo(() => {
    if (!selectedCategory) return undefined;

    if (selectedCategory === 'mistakes') {
      const allMistakes = Object.values(mistakes).flat() as any[];
      const enrichedMistakes = allMistakes.map(mistake => {
        const question = allQuestions.find(q => q.id === mistake.questionId);
        return {
          ...mistake,
          questionData: question,
        };
      });
      return JSON.stringify({
        prompt: t('chatScreen.reviewMistakesPrompt'),
        data: enrichedMistakes
      });
    }
    
    const questions = allQuestions.filter(q => q.category === selectedCategory);
    return JSON.stringify({
      prompt: t('chatScreen.categoryHelpPrompt', { category: selectedCategory }),
      data: questions
    });
  }, [selectedCategory, customQuestions, mistakes, allQuestions, t]);

  const handleSendMessage = () => {
    if (input.trim() || (mediaContext.type !== 'none')) {
      sendMessage(input, mediaContext, context);
      setInput('');
      setMediaContext({ type: 'none' });
    }
  };

  // Live call handlers
  const handleCallStart = () => {
    setIsCallActive(true);
    setCallError('');
  };

  const handleCallEnd = () => {
    setIsCallActive(false);
  };

  const handleCallError = (error: string) => {
    setCallError(error);
    setIsCallActive(false);
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-base-100">
      <Header title={t('chatScreen.title')} />

      {!apiKey && (
        <div className="alert alert-warning rounded-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{t('chatScreen.warning')}</span>
        </div>
      )}

      <main className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 && !loading && (
          <div className="text-center text-base-content/60 mt-8">
            <p className="text-lg">{t('chatScreen.startConversation')}</p>
            <p>{t('chatScreen.prompt')}</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full bg-base-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-base-content" /> : <CpuChipIcon className="w-5 h-5 text-base-content" />}
                  </div>
                </div>
              </div>
              <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : ''}`}>
                <div className="prose max-w-none">
                  {msg.parts.map((part, i) => {
                    if ('text' in part) {
                      return <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>;
                    } else if ('inlineData' in part && part.inlineData) {
                      return (
                        <img
                          key={i}
                          src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`}
                          alt={t('chatScreen.generatedImageAlt')}
                          className="rounded-lg shadow-md"
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full bg-base-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CpuChipIcon className="w-5 h-5 text-base-content" />
                  </div>
                </div>
              </div>
              <div className="chat-bubble">
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {error && <div className="alert alert-error mt-4">{error}</div>}
        {callError && <div className="alert alert-error mt-4">{callError}</div>}
      </main>

      <footer className="bg-base-200 border-t border-base-300 p-4">
        <div className="space-y-4">
          {/* Category Context Selection */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-base-content/60">
              <BookOpenIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{t('chatScreen.quizContext')}</span>
            </div>
            <select
              className="select select-bordered select-sm flex-grow rounded-lg bg-base-100 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">{t('chatScreen.noContext')}</option>
              <option value="mistakes">{t('chatScreen.myMistakes')}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Message Input with Inline Media Context */}
          <div className="flex items-end gap-3">
            {/* Media Context Icon */}
            <div className="flex-shrink-0">
              <InlineMediaContextSelector
                value={mediaContext}
                onChange={setMediaContext}
                disabled={loading || !apiKey}
              />
            </div>
            
            {/* Text Input */}
            <div className="flex-grow">
              <input
                type="text"
                placeholder={t('chatScreen.typeMessage')}
                className="input input-bordered w-full pl-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loading || !apiKey}
              />
            </div>
            {/* Chat Options Menu */}
            {messages.length > 0 && (
              <div className="dropdown dropdown-top dropdown-end">
                <button
                  tabIndex={0}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-base-300 hover:bg-base-400 shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 flex items-center justify-center group overflow-hidden flex-shrink-0"
                  title={t('chatScreen.chatOptions')}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
                  <EllipsisVerticalIcon className="w-6 h-6 text-base-content group-hover:scale-110 group-active:scale-95 transition-all duration-200" />
                </button>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2 border border-base-300">
                  <li>
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-3 text-error hover:bg-error/10"
                    >
                      <TrashIcon className="w-4 h-4" />
                      {t('chatScreen.clearHistory')}
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Voice Call Button */}
            <button
              onClick={() => setIsCallActive(true)}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:from-primary-focus hover:to-primary shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center group overflow-hidden flex-shrink-0"
              disabled={!apiKey}
              title={t('chatScreen.startCall')}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
              <MicrophoneIcon className="w-6 h-6 text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200" />
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:from-primary-focus hover:to-primary shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center group overflow-hidden flex-shrink-0"
              disabled={loading || !apiKey || (!input.trim() && mediaContext.type === 'none')}
              title={t('chatScreen.sendMessage')}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
              {loading ? (
                <span className="loading loading-spinner loading-sm text-white z-10"></span>
              ) : (
                <FiSend className="w-5 h-5 text-white group-hover:scale-110 group-active:scale-95 transition-all duration-200 z-10 translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Gemini Live Component */}
          {isCallActive && (
            <GeminiLiveComponent
              apiKey={apiKey}
              context={context}
              onClose={() => setIsCallActive(false)}
              onCallStart={handleCallStart}
              onCallEnd={handleCallEnd}
              onError={handleCallError}
            />
          )}
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;