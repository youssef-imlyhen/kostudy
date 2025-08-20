### Upgrade UI/UX style

```markdown
Here is some context and references:
'use client'

import { useState, useEffect } from 'react'

interface QuizOption {
  id: string
  label: string
  text: string
}

interface Category {
  id: string
  name: string
  icon: string
  description: string
  progress: number
  gradient: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  isNew?: boolean
}

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function QuizApp() {
  const [selectedOption, setSelectedOption] = useState<string>('B')
  const [currentQuestion, setCurrentQuestion] = useState(3)
  const [totalQuestions] = useState(10)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you study. What topic would you like to practice today?",
      isUser: false,
      timestamp: new Date()
    },
    {
      id: '2',
      text: "I need help with algebra equations",
      isUser: true,
      timestamp: new Date()
    },
    {
      id: '3',
      text: "Great! Let's start with linear equations. Can you solve: 2x + 5 = 13?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const quizOptions: QuizOption[] = [
    { id: 'A', label: 'A', text: 'London' },
    { id: 'B', label: 'B', text: 'Paris' },
    { id: 'C', label: 'C', text: 'Berlin' },
    { id: 'D', label: 'D', text: 'Madrid' }
  ]

  const categories: Category[] = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: 'fas fa-calculator',
      description: 'Algebra, Geometry, Calculus',
      progress: 75,
      gradient: 'from-blue-600 to-blue-400'
    },
    {
      id: 'science',
      name: 'Science',
      icon: 'fas fa-flask',
      description: 'Physics, Chemistry, Biology',
      progress: 45,
      gradient: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: 'fas fa-globe',
      description: 'Countries, Capitals, Landmarks',
      progress: 90,
      gradient: 'from-yellow-400 to-green-500'
    }
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Math Master',
      description: 'Completed 100 math questions',
      icon: 'fas fa-trophy',
      gradient: 'from-yellow-400 to-green-500',
      isNew: true
    },
    {
      id: '2',
      title: 'Speed Demon',
      description: 'Answered 10 questions in under 2 minutes',
      icon: 'fas fa-medal',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: '3',
      title: '7-Day Streak',
      description: 'Studied for 7 consecutive days',
      icon: 'fas fa-fire',
      gradient: 'from-purple-600 to-indigo-600'
    }
  ]

  const progress = (currentQuestion / totalQuestions) * 100

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedOption('')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedOption('')
    }
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput,
        isUser: true,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, newMessage])
      setChatInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    })

    const cards = document.querySelectorAll('.card')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Navigation Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
                QuizMaster
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <i className="fas fa-fire text-red-500"></i>
                <span className="font-semibold text-gray-700">7</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-gem text-blue-500"></i>
                <span className="font-semibold text-gray-700">1,250</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quiz Screen Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            Quiz Screen
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion} of {totalQuestions}
                </span>
                <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="card bg-white rounded-3xl shadow-lg p-8 mb-8 animate-bounce-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <i className="fas fa-question text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What is the capital of France?</h3>
                <p className="text-gray-600">Choose the correct answer below</p>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`card bg-white rounded-2xl p-4 border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-green-500 ${
                      selectedOption === option.id 
                        ? 'border-green-500 bg-green-50 ring-4 ring-green-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        selectedOption === option.id ? 'bg-green-500' : 'bg-blue-400'
                      }`}>
                        {option.label}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 1}
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Previous
                </button>
                <button 
                  onClick={handleNextQuestion}
                  className="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-2xl font-semibold transition-all duration-300 px-8"
                >
                  Next Question
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={category.id} className={`card bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${index === 0 ? 'animate-pulse' : ''}`}>
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${category.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-semibold text-green-500">{category.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.progress}%` }}
                    ></div>
                  </div>
                  <button className={`btn bg-gradient-to-r ${category.gradient} text-white border-0 rounded-2xl font-semibold transition-all duration-300 w-full hover:shadow-lg`}>
                    {category.progress > 80 ? 'Review & Test' : category.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Progress & Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            Progress & Achievements
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Stats */}
            <div className="card bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Progress</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-chart-line text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Total Score</p>
                      <p className="text-sm text-gray-600">This week</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">2,450</p>
                    <p className="text-sm text-gray-600">+15% from last week</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-target text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Accuracy Rate</p>
                      <p className="text-sm text-gray-600">Last 50 questions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-500">87%</p>
                    <p className="text-sm text-gray-600">+3% improvement</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-clock text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Study Time</p>
                      <p className="text-sm text-gray-600">This week</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">12h 30m</p>
                    <p className="text-sm text-gray-600">Goal: 15h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-3 rounded-2xl ${
                      achievement.isNew ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${achievement.gradient} rounded-full flex items-center justify-center ${
                      achievement.isNew ? 'shadow-lg shadow-green-200' : ''
                    }`}>
                      <i className={`${achievement.icon} text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.isNew && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">New!</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Settings Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            Settings
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="card bg-white rounded-3xl shadow-lg p-6">
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                      <i className="fas fa-user text-white text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="input input-bordered w-full mb-2 rounded-xl border-gray-300 focus:border-green-500" 
                        defaultValue="John Doe"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="input input-bordered w-full rounded-xl border-gray-300 focus:border-green-500" 
                        defaultValue="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Dark Mode</p>
                        <p className="text-sm text-gray-600">Switch to dark theme</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Sound Effects</p>
                        <p className="text-sm text-gray-600">Enable quiz sound effects</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={soundEffects}
                        onChange={(e) => setSoundEffects(e.target.checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-sm text-gray-600">Remind me to study</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary" 
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Default Difficulty</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl">Easy</button>
                    <button className="btn bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-xl">Medium</button>
                    <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl">Hard</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chat Component */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            AI Study Assistant
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="card bg-white rounded-3xl shadow-lg p-6 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Study Buddy AI</h3>
                  <p className="text-sm text-gray-600">Online • Ready to help</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}>
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-robot text-white text-sm"></i>
                      </div>
                    )}
                    <div className={`rounded-2xl p-3 max-w-xs ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-user text-gray-600 text-sm"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="input input-bordered flex-1 rounded-xl border-gray-300 focus:border-green-500" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="btn bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-xl"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Question Entry */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            Create Question
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="card bg-white rounded-3xl shadow-lg p-6">
              <form className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Question Category</span>
                  </label>
                  <select className="select select-bordered w-full rounded-xl border-gray-300 focus:border-green-500">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>Geography</option>
                    <option>History</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Difficulty Level</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl">Easy</button>
                    <button type="button" className="btn bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-xl">Medium</button>
                    <button type="button" className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl">Hard</button>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Question Text</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full h-24 rounded-xl border-gray-300 focus:border-green-500" placeholder="Enter your question here..."></textarea>
                </div>

                <div className="space-y-3">
                  <label className="label">
                    <span className="label-text font-semibold">Answer Options</span>
                  </label>
                  
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <input type="radio" name="correct" className="radio radio-primary" />
                        <input type="text" placeholder={`Option ${option}`} className="input input-bordered flex-1 rounded-xl border-gray-300 focus:border-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Explanation (Optional)</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full h-20 rounded-xl border-gray-300 focus:border-green-500" placeholder="Explain why this is the correct answer..."></textarea>
                </div>

                <div className="flex space-x-3">
                  <button type="button" className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl flex-1">Preview</button>
                  <button type="submit" className="btn bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-xl flex-1">Save Question</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* AI Question Generator */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent mb-8 text-center">
            AI Question Generator
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="card bg-white rounded-3xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <i className="fas fa-magic text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Generate Questions with AI</h3>
                <p className="text-gray-600">Let AI create personalized questions for you</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Topic or Subject</span>
                  </label>
                  <input type="text" placeholder="e.g., Quadratic equations, World War II, Photosynthesis..." className="input input-bordered w-full rounded-xl border-gray-300 focus:border-green-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Difficulty</span>
                    </label>
                    <select className="select select-bordered w-full rounded-xl border-gray-300 focus:border-green-500">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Number of Questions</span>
                    </label>
                    <select className="select select-bordered w-full rounded-xl border-gray-300 focus:border-green-500">
                      <option>5 questions</option>
                      <option>10 questions</option>
                      <option>15 questions</option>
                      <option>20 questions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Question Type</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="cursor-pointer flex items-center">
                      <input type="checkbox" className="checkbox checkbox-primary mr-2" defaultChecked />
                      <span className="label-text">Multiple Choice</span>
                    </label>
                    <label className="cursor-pointer flex items-center">
                      <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                      <span className="label-text">True/False</span>
                    </label>
                    <label className="cursor-pointer flex items-center">
                      <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                      <span className="label-text">Fill in the Blank</span>
                    </label>
                    <label className="cursor-pointer flex items-center">
                      <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                      <span className="label-text">Short Answer</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Additional Instructions (Optional)</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full h-20 rounded-xl border-gray-300 focus:border-green-500" placeholder="Any specific requirements or focus areas..."></textarea>
                </div>

                <button type="submit" className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 rounded-xl w-full">
                  <i className="fas fa-magic mr-2"></i>
                  Generate Questions
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="btn btn-circle bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 w-14 h-14 shadow-lg hover:shadow-xl animate-float">
          <i className="fas fa-plus text-xl"></i>
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}
-----
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App - Duolingo x Brilliant Fusion</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            200: '#bbf7d0',
                            300: '#86efac',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                            800: '#166534',
                            900: '#14532d',
                            950: '#052e16',
                        },
                        secondary: {
                            50: '#f5f3ff',
                            100: '#ede9fe',
                            200: '#ddd6fe',
                            300: '#c4b5fd',
                            400: '#a78bfa',
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9',
                            800: '#5b21b6',
                            900: '#4c1d95',
                            950: '#2e1065',
                        },
                        accent: {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            200: '#fde68a',
                            300: '#fcd34d',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309',
                            800: '#92400e',
                            900: '#78350f',
                            950: '#451a03',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Poppins', 'sans-serif']
                    }
                }
            },
            daisyui: {
                themes: [
                    {
                        light: {
                            "primary": "#22c55e",
                            "secondary": "#8b5cf6",
                            "accent": "#f59e0b",
                            "neutral": "#191d24",
                            "base-100": "#ffffff",
                            "info": "#3abff8",
                            "success": "#36d399",
                            "warning": "#fbbf24",
                            "error": "#f87272",
                        }
                    }
                ]
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --duolingo-green: #58cc02;
            --duolingo-dark-green: #46a302;
            --brilliant-purple: #6a0dad;
            --brilliant-blue: #0066cc;
        }
        
        .card-gradient {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }
        
        .progress-ring {
            transition: stroke-dashoffset 0.35s;
        }
        
        .floating-card {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .floating-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .duolingo-btn {
            background-color: var(--duolingo-green);
            border-bottom: 4px solid var(--duolingo-dark-green);
            transition: all 0.15s ease;
        }
        
        .duolingo-btn:hover {
            background-color: var(--duolingo-dark-green);
            transform: translateY(2px);
            border-bottom-width: 2px;
        }
        
        .brilliant-btn {
            background: linear-gradient(135deg, var(--brilliant-purple) 0%, var(--brilliant-blue) 100%);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .brilliant-btn:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 15px -3px rgba(106, 13, 173, 0.3);
        }
        
        .streak-counter {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .wave-animation {
            animation: wave 3s ease-in-out infinite;
        }
        
        @keyframes wave {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #f59e0b;
            border-radius: 50%;
            animation: fall 5s linear infinite;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .achievement-badge {
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            border: 2px solid #f59e0b;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .category-card {
            background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
            border: 1px solid #bae6fd;
        }
        
        .category-card:hover {
            background: linear-gradient(135deg, #bae6fd 0%, #e0f2fe 100%);
        }
    </style>
</head>
<body class="bg-base-100 min-h-screen font-sans">
    <div class="max-w-6xl mx-auto p-4">
        <!-- Header -->
        <header class="flex justify-between items-center py-6 mb-8">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span class="text-white font-bold text-xl">Q</span>
                </div>
                <h1 class="text-2xl font-display font-bold text-primary">QuizMaster</h1>
            </div>
            
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 bg-accent/20 px-3 py-1 rounded-full">
                    <i class="fas fa-fire text-accent"></i>
                    <span class="font-bold text-accent">7</span>
                </div>
                <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span>U</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="mb-12 text-center py-8">
            <h2 class="text-4xl font-display font-bold mb-4">Master Knowledge Through Play</h2>
            <p class="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
                Experience the perfect fusion of Duolingo's gamification and Brilliant's deep learning approach
            </p>
            
            <div class="flex justify-center space-x-4">
                <button class="duolingo-btn btn btn-lg text-white font-bold px-8 py-3 rounded-xl">
                    Start Learning
                </button>
                <button class="btn btn-outline btn-lg rounded-xl">
                    Explore Categories
                </button>
            </div>
        </section>

        <!-- Quiz Screen Component -->
        <section class="mb-16">
            <h3 class="text-2xl font-bold mb-6">Quiz Interface</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Quiz Card -->
                <div class="card floating-card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <i class="fas fa-lightbulb text-primary"></i>
                                </div>
                                <span class="font-medium">Science & Tech</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="radial-progress text-primary" style="--value:70; --size:2.5rem;">70%</div>
                            </div>
                        </div>
                        
                        <h4 class="text-xl font-bold mb-4">What is the primary function of mitochondria in a cell?</h4>
                        
                        <div class="space-y-3 mb-6">
                            <button class="w-full text-left p-4 rounded-xl border border-base-300 hover:bg-primary/5 transition-colors">
                                Protein synthesis
                            </button>
                            <button class="w-full text-left p-4 rounded-xl border border-base-300 hover:bg-primary/5 transition-colors">
                                Energy production
                            </button>
                            <button class="w-full text-left p-4 rounded-xl border border-base-300 hover:bg-primary/5 transition-colors">
                                Waste removal
                            </button>
                            <button class="w-full text-left p-4 rounded-xl border border-base-300 hover:bg-primary/5 transition-colors">
                                Genetic storage
                            </button>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <button class="btn btn-ghost">
                                <i class="fas fa-lightbulb mr-2"></i> Hint
                            </button>
                            <button class="duolingo-btn btn btn-md text-white font-bold px-6">
                                Check Answer
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Progress & Explanation -->
                <div class="space-y-6">
                    <div class="card floating-card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-bold">Your Progress</h4>
                            <span class="badge badge-primary">Level 3</span>
                        </div>
                        
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-1">
                                <span>Science</span>
                                <span>72%</span>
                            </div>
                            <div class="w-full bg-base-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: 72%"></div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-1">
                                <span>Technology</span>
                                <span>45%</span>
                            </div>
                            <div class="w-full bg-base-200 rounded-full h-2">
                                <div class="bg-secondary h-2 rounded-full" style="width: 45%"></div>
                            </div>
                        </div>
                        
                        <div class="mt-6 pt-4 border-t border-base-200">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                    <i class="fas fa-trophy text-accent"></i>
                                </div>
                                <div>
                                    <p class="font-medium">Next Milestone</p>
                                    <p class="text-sm text-base-content/70">Complete 5 more lessons</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card floating-card bg-gradient-to-br from-accent/5 to-primary/5 shadow-lg rounded-2xl p-6">
                        <h4 class="font-bold mb-3">Explanation</h4>
                        <p class="text-base-content/80 mb-4">
                            Mitochondria are often called the "powerhouses of the cell" because their primary function is to produce ATP (adenosine triphosphate), the cell's main energy currency, through cellular respiration.
                        </p>
                        <div class="flex items-center justify-between">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-book mr-2"></i> Learn More
                            </button>
                            <div class="flex space-x-2">
                                <button class="btn btn-sm btn-circle btn-ghost">
                                    <i class="fas fa-thumbs-up"></i>
                                </button>
                                <button class="btn btn-sm btn-circle btn-ghost">
                                    <i class="fas fa-thumbs-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="mb-16">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Learning Categories</h3>
                <button class="btn btn-sm btn-ghost">
                    View All <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="category-card card floating-card rounded-2xl p-5 text-center">
                    <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-flask text-primary text-2xl"></i>
                    </div>
                    <h4 class="font-bold mb-1">Science</h4>
                    <p class="text-sm text-base-content/70">12 lessons</p>
                </div>
                
                <div class="category-card card floating-card rounded-2xl p-5 text-center">
                    <div class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-calculator text-secondary text-2xl"></i>
                    </div>
                    <h4 class="font-bold mb-1">Math</h4>
                    <p class="text-sm text-base-content/70">8 lessons</p>
                </div>
                
                <div class="category-card card floating-card rounded-2xl p-5 text-center">
                    <div class="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-history text-accent text-2xl"></i>
                    </div>
                    <h4 class="font-bold mb-1">History</h4>
                    <p class="text-sm text-base-content/70">15 lessons</p>
                </div>
                
                <div class="category-card card floating-card rounded-2xl p-5 text-center">
                    <div class="w-16 h-16 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-language text-info text-2xl"></i>
                    </div>
                    <h4 class="font-bold mb-1">Languages</h4>
                    <p class="text-sm text-base-content/70">20 lessons</p>
                </div>
            </div>
        </section>

        <!-- Achievements Section -->
        <section class="mb-16">
            <h3 class="text-2xl font-bold mb-6">Your Achievements</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="card floating-card bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg rounded-2xl p-6">
                    <div class="flex items-start space-x-4">
                        <div class="achievement-badge w-16 h-16 rounded-full flex items-center justify-center">
                            <i class="fas fa-fire text-2xl text-amber-800"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">7-Day Streak</h4>
                            <p class="text-sm text-base-content/70 mb-2">Complete a lesson every day for a week</p>
                            <div class="w-full bg-base-200 rounded-full h-2">
                                <div class="bg-accent h-2 rounded-full" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card floating-card bg-gradient-to-br from-secondary/5 to-primary/5 shadow-lg rounded-2xl p-6">
                    <div class="flex items-start space-x-4">
                        <div class="achievement-badge w-16 h-16 rounded-full flex items-center justify-center">
                            <i class="fas fa-crown text-2xl text-amber-800"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">Quiz Master</h4>
                            <p class="text-sm text-base-content/70 mb-2">Answer 50 questions correctly</p>
                            <div class="w-full bg-base-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card floating-card bg-gradient-to-br from-accent/5 to-secondary/5 shadow-lg rounded-2xl p-6">
                    <div class="flex items-start space-x-4">
                        <div class="achievement-badge w-16 h-16 rounded-full flex items-center justify-center">
                            <i class="fas fa-bolt text-2xl text-amber-800"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">Speed Demon</h4>
                            <p class="text-sm text-base-content/70 mb-2">Complete 10 lessons in one day</p>
                            <div class="w-full bg-base-200 rounded-full h-2">
                                <div class="bg-secondary h-2 rounded-full" style="width: 40%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- AI Features Section -->
        <section class="mb-16">
            <h3 class="text-2xl font-bold mb-6">AI-Powered Learning</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- AI Chat Component -->
                <div class="card floating-card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg rounded-2xl overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="avatar">
                                <div class="w-10 rounded-full bg-gradient-to-r from-primary to-secondary">
                                    <i class="fas fa-robot text-white p-3"></i>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold">Learning Assistant</h4>
                                <p class="text-sm text-base-content/70">Ask me anything!</p>
                            </div>
                        </div>
                        
                        <div class="bg-base-100 rounded-xl p-4 mb-4 h-48 overflow-y-auto">
                            <div class="chat chat-start mb-3">
                                <div class="chat-bubble chat-bubble-secondary">
                                    Hi there! I'm your AI tutor. How can I help you today?
                                </div>
                            </div>
                            <div class="chat chat-end mb-3">
                                <div class="chat-bubble">
                                    Can you explain photosynthesis?
                                </div>
                            </div>
                            <div class="chat chat-start">
                                <div class="chat-bubble chat-bubble-secondary">
                                    Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water, releasing oxygen as a byproduct. Would you like me to break it down further?
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex">
                            <input type="text" placeholder="Ask a question..." class="input input-bordered flex-1 rounded-l-xl">
                            <button class="brilliant-btn btn text-white rounded-r-xl">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- AI Question Generator -->
                <div class="card floating-card bg-gradient-to-br from-accent/5 to-primary/5 shadow-lg rounded-2xl p-6">
                    <h4 class="font-bold text-lg mb-4">Generate Custom Questions</h4>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Topic</span>
                        </label>
                        <input type="text" placeholder="e.g., World War II" class="input input-bordered rounded-xl">
                    </div>
                    
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Difficulty</span>
                        </label>
                        <select class="select select-bordered rounded-xl">
                            <option>Beginner</option>
                            <option selected>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    
                    <div class="form-control mb-6">
                        <label class="label">
                            <span class="label-text">Question Type</span>
                        </label>
                        <div class="flex space-x-2">
                            <button class="btn btn-sm flex-1">Multiple Choice</button>
                            <button class="btn btn-sm btn-outline flex-1">True/False</button>
                        </div>
                    </div>
                    
                    <button class="brilliant-btn btn btn-block text-white font-bold py-3 rounded-xl">
                        <i class="fas fa-magic mr-2"></i> Generate Questions
                    </button>
                </div>
            </div>
        </section>

        <!-- Manual Entry Form -->
        <section class="mb-16">
            <h3 class="text-2xl font-bold mb-6">Create Your Own Question</h3>
            <div class="card floating-card bg-gradient-to-br from-base-100 to-base-200 shadow-lg rounded-2xl p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text font-medium">Question</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24 rounded-xl" placeholder="Enter your question here..."></textarea>
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text font-medium">Correct Answer</span>
                            </label>
                            <input type="text" placeholder="Enter the correct answer" class="input input-bordered rounded-xl">
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text font-medium">Explanation</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24 rounded-xl" placeholder="Explain why this is the correct answer..."></textarea>
                        </div>
                    </div>
                    
                    <div>
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text font-medium">Wrong Answers</span>
                            </label>
                            <input type="text" placeholder="Wrong answer 1" class="input input-bordered mb-2 rounded-xl">
                            <input type="text" placeholder="Wrong answer 2" class="input input-bordered mb-2 rounded-xl">
                            <input type="text" placeholder="Wrong answer 3" class="input input-bordered rounded-xl">
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text font-medium">Category</span>
                            </label>
                            <select class="select select-bordered rounded-xl">
                                <option>Science</option>
                                <option>Mathematics</option>
                                <option>History</option>
                                <option>Literature</option>
                                <option>Geography</option>
                            </select>
                        </div>
                        
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">Difficulty</span>
                            </label>
                            <div class="flex space-x-2">
                                <button class="btn btn-sm flex-1 btn-outline">Easy</button>
                                <button class="btn btn-sm flex-1 btn-primary">Medium</button>
                                <button class="btn btn-sm flex-1 btn-outline">Hard</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-end mt-6 pt-4 border-t border-base-200">
                    <button class="duolingo-btn btn btn-md text-white font-bold px-8 rounded-xl">
                        Save Question
                    </button>
                </div>
            </div>
        </section>

        <!-- Settings Section -->
        <section class="mb-16">
            <h3 class="text-2xl font-bold mb-6">Settings</h3>
            <div class="card floating-card bg-gradient-to-br from-base-100 to-base-200 shadow-lg rounded-2xl p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-bold text-lg mb-4">Learning Preferences</h4>
                        
                        <div class="form-control mb-4">
                            <label class="label cursor-pointer justify-between">
                                <span class="label-text">Daily Goal</span>
                                <input type="number" value="10" class="input input-bordered w-24 input-sm rounded-lg">
                            </label>
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label cursor-pointer justify-between">
                                <span class="label-text">Sound Effects</span>
                                <input type="checkbox" class="toggle toggle-primary" checked>
                            </label>
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label cursor-pointer justify-between">
                                <span class="label-text">Push Notifications</span>
                                <input type="checkbox" class="toggle toggle-primary" checked>
                            </label>
                        </div>
                        
                        <div class="form-control">
                            <label class="label cursor-pointer justify-between">
                                <span class="label-text">Dark Mode</span>
                                <input type="checkbox" class="toggle toggle-primary">
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg mb-4">Account</h4>
                        
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" value="user@example.com" class="input input-bordered rounded-xl" disabled>
                        </div>
                        
                        <div class="form-control mb-4">
                            <label class="label">
                                <span class="label-text">Username</span>
                            </label>
                            <input type="text" value="quizmaster_user" class="input input-bordered rounded-xl">
                        </div>
                        
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Language</span>
                            </label>
                            <select class="select select-bordered rounded-xl">
                                <option>English</option>
                                <option>Español</option>
                                <option>Français</option>
                                <option>Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3 mt-8 pt-4 border-t border-base-200">
                    <button class="btn btn-outline rounded-xl">
                        Cancel
                    </button>
                    <button class="duolingo-btn btn text-white font-bold rounded-xl">
                        Save Changes
                    </button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-8 text-center text-base-content/60">
            <div class="flex justify-center space-x-6 mb-4">
                <a href="#" class="hover:text-primary transition-colors">Home</a>
                <a href="#" class="hover:text-primary transition-colors">Categories</a>
                <a href="#" class="hover:text-primary transition-colors">Progress</a>
                <a href="#" class="hover:text-primary transition-colors">Settings</a>
            </div>
            <p>© 2023 QuizMaster. The fusion of Duolingo's engagement and Brilliant's depth.</p>
        </footer>
    </div>

    <script>
        // Simple interaction for demonstration
        document.addEventListener('DOMContentLoaded', function() {
            // Add confetti effect to achievement badges
            const badges = document.querySelectorAll('.achievement-badge');
            badges.forEach(badge => {
                badge.addEventListener('mouseenter', function() {
                    createConfetti(this);
                });
            });
            
            function createConfetti(element) {
                const rect = element.getBoundingClientRect();
                const colors = ['#f59e0b', '#22c55e', '#8b5cf6', '#ef4444'];
                
                for (let i = 0; i < 15; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = rect.left + Math.random() * rect.width + 'px';
                    confetti.style.top = rect.top + 'px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            }
            
            // Simulate progress animation
            const progressBars = document.querySelectorAll('.radial-progress');
            progressBars.forEach(bar => {
                const value = bar.style.getPropertyValue('--value');
                bar.style.setProperty('--value', '0');
                setTimeout(() => {
                    bar.style.setProperty('--value', value);
                }, 300);
            });
        });
    </script>
</body>
</html>

------------------------
@/src/ 
@/package.json 
@/src/config.ts 
@/tailwind.config.js 
....
@/ui/ux_inspiration.md 
---

So I built a quiz app using react, ts, tailwindcss, and daisyui, but it looks basic, right now I'm the research phase to upgrade it to search for a style to use and make it super great, and I found the brilliant, and duolingo as good examples that have good ui/ux that I'm trying to get inspired from a bit, so maybe based on those inspriatoin or evne greateer, to have somehting super great... how to integrate and upgrade our style, the smartest and seamless way, maybe first starting with customizng btn card, etc.. classes or so.. then figureing out what to do for the rest of the screens one by one... and make sure you use daisyui, and tailwindcss for that...

first read our config file, read the stucture of hte project and undestand it well, and think of the flow from the dashboard, to headers, to categories (maybe let's add i nteh data questions and type an emoji or icon...)  think about hte buttons the styles, the quiz scneen, the explantion, the achievemnt screen, the questons bank manual or aia gneernated, the ai chat, the settings, the fist welcome screen and everhitng, and plan first from fist princimepsl and start with reconfigureing some classes like btn, card, etc... but also remember our config file as starting point, etc...

please think step by step to produce a great accurate response that even the top 1% experts in this domain will consider great. this is very important to me and my life relies on it.

```