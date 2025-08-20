import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LanguageProvider } from './context/LanguageContext';
import { UserContext } from './context/UserContext';
import { QuizContext, QuizContextType } from './context/QuizContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import { config } from './config';

// Screens
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryScreen from './screens/CategoryScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import SettingsScreen from './screens/SettingsScreen';
import MistakesScreen from './screens/MistakesScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ShareScreen from './screens/ShareScreen';
import DashboardScreen from './screens/DashboardScreen'; // Import the new screen
import QuestionBankScreen from './screens/QuestionBankScreen';
import QuestionFormScreen from './screens/QuestionFormScreen';
import ChatScreen from './screens/ChatScreen';
import SagaLearnScreen from './screens/SagaLearnScreen';
import AIGeneratorScreen from './screens/AIGeneratorScreen';
import AchievementNotification from './components/AchievementNotification';

function App() {
  // State for contexts
  const [username, setUsername] = useLocalStorage('quizUsername', '');
  const [currentQuiz, setCurrentQuiz] = useState<QuizContextType['currentQuiz']>({});

  useEffect(() => {
    document.title = config.appName;
  }, []);

  // Check if user has entered their name
  const isAuthenticated = !!username;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserContext.Provider value={{ username, setUsername }}>
          <QuizContext.Provider value={{ currentQuiz, setCurrentQuiz }}>
            <BrowserRouter>
              <div className="relative min-h-screen">
                <AchievementNotification />
                <Routes>
                {!isAuthenticated ? (
                  <>
                    <Route path="/" element={
                      <Layout hideNav>
                        <HomeScreen />
                      </Layout>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={
                      <Layout>
                        <DashboardScreen /> {/* Use DashboardScreen for root */}
                      </Layout>
                    } />
                    <Route path="/categories" element={
                      <Layout>
                        <CategoriesScreen /> {/* Keep /categories route */}
                      </Layout>
                    } />
                    <Route path="/categories/:categoryId" element={
                      <Layout>
                        <CategoryScreen />
                      </Layout>
                    } />
                    <Route path="/quiz" element={
                      <Layout hideNav>
                        <QuizScreen />
                      </Layout>
                    } />
                    <Route path="/play-all" element={
                      <Layout hideNav>
                        <QuizScreen />
                      </Layout>
                    } />
                    <Route path="/results" element={
                      <Layout>
                        <ResultsScreen />
                      </Layout>
                    } />
                    <Route path="/achievements" element={
                      <Layout>
                        <AchievementsScreen />
                      </Layout>
                    } />
                    <Route path="/mistakes" element={
                      <Layout>
                        <MistakesScreen />
                      </Layout>
                    } />
                    <Route path="/questions" element={
                      <Layout>
                        <QuestionBankScreen />
                      </Layout>
                    } />
                    <Route path="/questions/new" element={
                      <Layout>
                        <QuestionFormScreen />
                      </Layout>
                    } />
                    <Route path="/questions/edit/:questionId" element={
                      <Layout>
                        <QuestionFormScreen />
                      </Layout>
                    } />
                    <Route path="/settings" element={
                      <Layout>
                        <SettingsScreen />
                      </Layout>
                    } />
                    <Route path="/about" element={
                      <Layout>
                        <AboutScreen />
                      </Layout>
                    } />
                    <Route path="/contact" element={
                      <Layout>
                        <ContactScreen />
                      </Layout>
                    } />
                     <Route path="/share" element={
                      <Layout>
                        <ShareScreen />
                      </Layout>
                    } />
                    <Route path="/chat" element={
                      <Layout>
                        <ChatScreen />
                      </Layout>
                    } />
                    <Route path="/sagalearn" element={
                      <Layout>
                        <SagaLearnScreen />
                      </Layout>
                    } />
                    <Route path="/ai-generator" element={
                      <Layout>
                        <AIGeneratorScreen />
                      </Layout>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                 )}
              </Routes>
            </div>
            </BrowserRouter>
          </QuizContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
