import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    // Enable full-width, no horizontal scroll while on Landing
    document.body.classList.add('landing-active');

    // Auto-rotate screenshots
    const interval = setInterval(() => {
      setCurrentScreenshot(prev => (prev + 1) % 13);
    }, 3000);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('landing-active');
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const screenshots = [
    { id: 1, src: "/assets/screenshots/frame_005_15.23s.jpg", title: "Dashboard Overview", description: "Get a comprehensive view of your learning progress" },
    { id: 2, src: "/assets/screenshots/frame_006_64.34s.jpg", title: "Quiz Interface", description: "Interactive quizzes with multiple question types" },
    { id: 3, src: "/assets/screenshots/frame_008_80.42s.jpg", title: "AI Chat Assistant", description: "Get instant help and explanations from our AI" },
    { id: 4, src: "/assets/screenshots/frame_009_28.95s.jpg", title: "Learning Analytics", description: "Track your progress with detailed insights" },
    { id: 5, src: "/assets/screenshots/frame_012_112.59s.jpg", title: "Category Selection", description: "Browse and select from various learning categories" },
    { id: 6, src: "/assets/screenshots/frame_015_43.43s.jpg", title: "Quiz Results", description: "Detailed feedback on your performance" },
    { id: 7, src: "/assets/screenshots/frame_022_104.55s.jpg", title: "Achievements", description: "Earn badges and rewards as you progress" },
    { id: 8, src: "/assets/screenshots/frame_023_67.56s.jpg", title: "Mistakes Review", description: "Review and learn from your mistakes" },
    { id: 9, src: "/assets/screenshots/frame_023_112.59s.jpg", title: "Settings", description: "Customize your learning experience" },
    { id: 10, src: "/assets/screenshots/frame_040_115.81s.jpg", title: "AI Question Generation", description: "Generate questions on any topic with AI" },
    { id: 11, src: "/assets/screenshots/frame_041_118.64s.jpg", title: "SagaLearn Adventure", description: "Interactive choose-your-own-adventure learning" },
    { id: 12, src: "/assets/screenshots/frame_046_132.42s.jpg", title: "AI App Studio", description: "Create custom learning apps with AI" },
    { id: 13, src: "/assets/screenshots/frame_048_139.32s.jpg", title: "Performance Chart", description: "Visualize your learning progress over time" }
 ];

  // Features data
  const aiFeatures = [
    {
      title: "🤖 AI Question Generation",
      description: "Dynamically generate challenging questions on any topic using Google Gemini API",
      icon: "🧠",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "💬 AI Chat Assistant",
      description: "Interactive chat with AI that explains quiz concepts with rich media context",
      icon: "🗨️",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "📞 Live AI Call",
      description: "Real-time voice conversations with AI for dynamic Q&A sessions",
      icon: "🎙️",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "🎮 AI App Studio",
      description: "Generate complete game apps from scratch based on user prompts",
      icon: "🔧",
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "📖 Interactive SagaLearn",
      description: "Choose-your-own-adventure style games with evolving storylines",
      icon: "📜",
      color: "from-red-500 to-pink-600"
    }
  ];

  const coreFeatures = [
    {
      title: "📝 Multiple Question Types",
      description: "Multiple Choice, True/False, Fill-in-the-Blank with image options",
      icon: "📋",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "🏷️ Custom Questions & Categories",
      description: "Easily add, edit, and delete questions with emoji categories",
      icon: "✏️",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "🎨 Dynamic Theming",
      description: "Switch between light and dark themes with customizable colors",
      icon: "🌈",
      color: "from-amber-500 to-yellow-600"
    },
    {
      title: "🌐 Localization Support",
      description: "Supports 15+ languages including English, French, Spanish, Arabic",
      icon: "🌍",
      color: "from-teal-500 to-cyan-600"
    },
    {
      title: "📱 Responsive Design",
      description: "Optimized for devices from mobile phones to desktops",
      icon: "💻",
      color: "from-emerald-500 to-green-600"
    }
  ];

  const useCases = [
    {
      title: "👤 Personal Learning",
      description: "Feed your own materials and learn interactively with quizzes, explanations, chat, and voice",
      icon: "📚",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "👨‍👩‍👧‍👦 Family & Kids",
      description: "Set up profiles for family members with age-appropriate content and track progress",
      icon: "👪",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "🏫 Classroom & Cohorts",
      description: "Teachers prepare question banks and share via import/export for students",
      icon: "🎓",
      color: "from-amber-500 to-yellow-600"
    },
    {
      title: "💼 Teams & Onboarding",
      description: "Curate domain knowledge and SOPs to train new hires quickly",
      icon: "👥",
      color: "from-emerald-500 to-green-600"
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", color: "text-blue-500" },
    { name: "TypeScript", icon: "📝", color: "text-blue-600" },
    { name: "Tailwind CSS", icon: "🎨", color: "text-cyan-50" },
    { name: "Vite", icon: "⚡", color: "text-yellow-500" },
    { name: "daisyUI", icon: "🌸", color: "text-pink-500" },
    { name: "Google Gemini API", icon: "🔮", color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 overflow-x-hidden w-screen max-w-full">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce delay-300">🎓</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce delay-700">📚</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-10 animate-bounce delay-1000">🧠</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-bounce delay-500">🎯</div>
      </div>

      <div className="relative z-10 pt-4 pb-20 w-full max-w-full">
        {/* Navigation */}
        <nav className="px-4 md:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-xl">
              <div className="bg-base-100 rounded-lg p-2">
                <img src="/kostudy.png" alt="Kostudy logo" className="w-12 h-12 rounded-lg" />
              </div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Kostudy
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="font-medium hover:text-primary transition-colors">Features</a>
            <a href="#screenshots" className="font-medium hover:text-primary transition-colors">Screenshots</a>
            <a href="#about" className="font-medium hover:text-primary transition-colors">About</a>
            <a href="#contact" className="font-medium hover:text-primary transition-colors">Contact</a>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden btn btn-ghost btn-circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-6">
            <div className="bg-base-100 rounded-2xl shadow-xl p-6">
              <a href="#features" className="block py-3 font-medium hover:text-primary transition-colors">Features</a>
              <a href="#screenshots" className="block py-3 font-medium hover:text-primary transition-colors">Screenshots</a>
              <a href="#about" className="block py-3 font-medium hover:text-primary transition-colors">About</a>
              <a href="#contact" className="block py-3 font-medium hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-4 md:px-8 min-h-screen flex items-center justify-center py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                  <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-3xl shadow-2xl relative">
                    <div className="bg-base-100 rounded-2xl p-5">
                      <img src="/kostudy.png" alt="Kostudy logo" className="w-32 h-32 rounded-2xl" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Kostudy
              </h1>
              
              <p className="text-2xl md:text-4xl font-bold mb-6 text-base-content">
                AI-Powered Learning Platform 🚀
              </p>
              
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-base-content/80">
                Transform your learning experience with cutting-edge AI technology.
                Personalized quizzes, interactive lessons, and intelligent feedback all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mx-auto">
                <button
                  onClick={handleGetStarted}
                  className="btn btn-primary btn-lg"
                >
🚀 Get Started Free
                </button>
                
                <button className="btn btn-outline btn-lg">
              ▶️ Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Carousel */}
        <section id="screenshots" className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">See Kostudy In Action 📸</h2>
              
              <div className="relative">
                {/* Main screenshot */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-base-100">
                  <img
                    src={screenshots[currentScreenshot].src}
                    alt={screenshots[currentScreenshot].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white">{screenshots[currentScreenshot].title}</h3>
                    <p className="text-white/90">{screenshots[currentScreenshot].description}</p>
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-13 gap-4">
                  {screenshots.map((screenshot, index) => (
                    <div
                      key={screenshot.id}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg border-4 transition-all duration-300 ${
                        index === currentScreenshot
                          ? 'border-primary scale-105 shadow-primary/30'
                          : 'border-base-20 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={screenshot.src}
                        alt={screenshot.title}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Powerful Features 🚀</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-5 gap-8">
                {aiFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-3xl shadow-xl p-8 border border-base-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden flex flex-col h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-5xl mb-6">{feature.icon}</div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-base-content/80 flex-grow">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-5 gap-8 mt-12">
                {coreFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-3xl shadow-xl p-8 border border-base-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden flex flex-col h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-5xl mb-6">{feature.icon}</div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-base-content/80 flex-grow">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-2xl p-8 md:p-12 border border-base-200">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">About Kostudy 📘</h2>
              <div className="prose max-w-none text-lg">
                <p className="mb-6 text-base-content text-xl">
                  Most of today's learning tools fall short. They either hook you with cheap gamification to sell more ads, 
                  or they slap a chatbot onto a decade-old quiz and call it an "AI education app." <strong className="text-primary">You deserve better.</strong>
                </p>
                <p className="mb-6 text-base-content text-xl">
                  That's why we built <strong>KoStudy</strong>. It's an AI-first, feature-rich, open-source learning application 
                  built with React, TypeScript, and Tailwind CSS. It leverages the Google Gemini API and other advanced AI 
                  capabilities to deliver an intelligent, context-aware, and engaging learning experience.
                </p>
                <p className="text-base-content text-xl">
                  This is our attempt to reimagine what a learning app should be in the age of AI. It's a glimpse into the 
                  future of AI-powered education—and we hope you find it useful. 🌟
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Backstory Section */}
        <section className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Our Backstory 📖</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-24 -translate-x-24"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-8">📅 2021</div>
                    <h3 className="text-3xl font-bold mb-6">The Beginning</h3>
                    <p className="text-base-content/90 text-xl leading-relaxed">
                      After learning just the basics of programming, I was eager to use this new skill to help myself and my close ones. 
                      It began with learning English. I created WordTrainer — a simple web app to practice the most-used words and phrases in a language.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-3xl p-10 border border-accent/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-24 -translate-x-24"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-8">🤖 2022-2024</div>
                    <h3 className="text-3xl font-bold mb-6">The Journey</h3>
                    <p className="text-base-content/90 text-xl leading-relaxed">
                      I joined an ed‑tech startup working with AI and robotics to teach languages. Three years later, I found myself 
                      returning to this field with Kostudy. A family member approached me to help build a religious learning app, 
                      sparking the idea for an open‑source learning platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Use Cases 🎯</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {useCases.map((useCase, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-base-100 to-base-200 rounded-3xl shadow-xl p-8 border border-base-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-6">{useCase.icon}</div>
                      <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                      <p className="text-base-content/80">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Built with Modern Technologies ⚙️</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {technologies.map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-base-100 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center border border-base-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                  >
                    <div className={`text-6xl mb-6 ${tech.color}`}>{tech.icon}</div>
                    <div className="text-xl font-bold text-center">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 mb-24">
          <div className={`transition-all duration-1000 delay-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl shadow-2xl p-16 border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-5"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your Learning? 🚀</h2>
                <p className="text-2xl mb-12 max-w-2xl mx-auto text-base-content/90">
                  Join thousands of learners who have already transformed their education with Kostudy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="px-4 md:px-8 pt-16 pb-8 border-t border-base-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-xl">
                    <div className="bg-base-100 rounded-lg p-2">
                      <img src="/kostudy.png" alt="Kostudy logo" className="w-10 h-10 rounded-lg" />
                    </div>
                  </div>
                  <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Kostudy
                  </span>
                </div>
                <p className="text-base-content/80">
                  AI-powered learning platform for the future of education.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Features</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">AI Question Generation</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">AI Chat Assistant</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">SagaLearn Adventure</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Performance Analytics</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Community</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Connect</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Discord</a></li>
                  <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors">Email</a></li>
                </ul>
              </div>
            
            <div className="border-t border-base-200 mt-16 pt-8 text-center text-base-content/60">
              <p>© 2024 Kostudy. All rights reserved. MIT Licensed.</p>
            </div>
          </div>
          </div>
        </footer>
      </div>
    </div>
  );
}