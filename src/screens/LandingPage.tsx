import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
    // Enable full-width, no horizontal scroll while on Landing
    document.body.classList.add('landing-active');

    // Auto-rotate screenshots
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % 13);
    }, 3500);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('landing-active');
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  // Screenshots (from /public/assets/screenshots)
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

  // AI features (detailed, accurate per README)
  const aiFeatures = [
    {
      title: "AI Question Generation",
      subtitle: "Context-aware questions from your materials",
      description:
        "Generate challenging questions on any topic using the Google Gemini API. Bring your own context: YouTube links or videos, PDFs, web articles, or audio files—Kostudy ingests them to produce relevant, high‑quality questions and explanations.",
      bullets: [
        "Multiple question types including multi-select and image options",
        "Leverages rich media context for higher relevance",
        "Great for rapid course creation and study prep"
      ],
      icon: "🧠",
      color: "from-purple-500/20 to-indigo-600/20"
    },
    {
      title: "AI Chat Assistant",
      subtitle: "Explain, tutor, and clarify with context",
      description:
        "Chat with an AI that references the same context you provide to quizzes (videos, PDFs, audio). Get step‑by‑step explanations, alternative takes, and practical examples tied to your materials.",
      bullets: [
        "Cites details drawn from your uploaded context",
        "Great for “explain like I’m 5” or deep‑dive answers",
        "Works alongside quizzes for targeted learning"
      ],
      icon: "💬",
      color: "from-blue-500/20 to-cyan-600/20"
    },
    {
      title: "Live AI Call",
      subtitle: "Real-time voice tutoring",
      description:
        "Hold real‑time voice conversations with the AI for dynamic Q&A and quick iterations. Perfect when you want to talk through problems instead of typing.",
      bullets: [
        "Instant verbal feedback and guidance",
        "Pairs with quizzes for hands‑on practice",
        "Great for language learning and interview prep"
      ],
      icon: "🎙️",
      color: "from-emerald-500/20 to-green-600/20"
    },
    {
      title: "AI App Studio",
      subtitle: "Generate complete learning mini‑apps",
      description:
        "Turn ideas into interactive learning or game apps. Provide prompts, lessons learned from mistakes, or curated inputs—the studio scaffolds a playable experience to accelerate experimentation.",
      bullets: [
        "Rapid prototyping for edu‑games",
        "Saves and previews generated apps",
        "Shareable experiences for cohorts"
      ],
      icon: "🎮",
      color: "from-amber-500/20 to-orange-600/20"
    },
    {
      title: "SagaLearn Adventure",
      subtitle: "Choose‑your‑own‑adventure learning",
      description:
        "A narrative mode that blends quizzes with branching stories. Your choices influence the plot while your performance adapts the challenge.",
      bullets: [
        "Immersive learning through narrative",
        "Adaptive difficulty with feedback",
        "Great for engagement and retention"
      ],
      icon: "📜",
      color: "from-rose-500/20 to-pink-600/20"
    }
  ];

  // Core features (expanded per README)
  const coreFeatures = [
    {
      title: "Multiple Question Types",
      subtitle: "MCQ, True/False, Fill‑in‑the‑Blank",
      description:
        "Single or multi‑select, rich image options, and optional question images. Designed for recall, recognition, and conceptual understanding.",
      bullets: [
        "Support for images on options and questions",
        "Configurable difficulty per item",
        "Detailed explanations for each answer"
      ],
      icon: "📋",
      color: "from-indigo-500/20 to-purple-600/20"
    },
    {
      title: "Question Bank & Categories",
      subtitle: "Create, edit, import, export",
      description:
        "Intuitive UI for CRUD operations, plus import/export via JSON or CSV. Organize by emoji categories with smart fallbacks.",
      bullets: [
        "Bulk import for fast setup",
        "Export for backup or sharing",
        "Emoji‑mapped categories"
      ],
      icon: "✏️",
      color: "from-pink-500/20 to-rose-600/20"
    },
    {
      title: "Achievements & Analytics",
      subtitle: "Progress, badges, and insights",
      description:
        "Earn points and badges, review mistakes, and track performance trends. Feedback loops that guide deliberate practice.",
      bullets: [
        "Achievement notifications",
        "Mistake review workflow",
        "Charts to visualize progress"
      ],
      icon: "🏆",
      color: "from-amber-500/20 to-yellow-600/20"
    },
    {
      title: "Themes & PWA",
      subtitle: "Dynamic theming + installable app",
      description:
        "Light/dark themes, primary color customization, and PWA support for offline, installable experiences.",
      bullets: [
        "One‑file theme configuration",
        "Fast Vite build with Tailwind",
        "Responsive on all devices"
      ],
      icon: "🎨",
      color: "from-emerald-500/20 to-green-600/20"
    },
    {
      title: "Localization",
      subtitle: "Learn in your language",
      description:
        "Broad localization coverage including English, French, Spanish, Arabic, German, Hindi, Portuguese, Chinese, Russian, Japanese, Korean, Italian, Dutch, Polish, Turkish, Czech, and more.",
      bullets: [
        "Switch languages on the fly",
        "Community‑friendly translations",
        "Accessible UI patterns"
      ],
      icon: "🌍",
      color: "from-teal-500/20 to-cyan-600/20"
    },
    {
      title: "Data Import/Export",
      subtitle: "Own your data",
      description:
        "Backup and restore questions, progress, and settings. Move seamlessly between devices or share setups for classes and teams.",
      bullets: [
        "Portable learning setups",
        "Great for cohorts & teams",
        "JSON/CSV compatibility"
      ],
      icon: "🗂️",
      color: "from-sky-500/20 to-blue-600/20"
    }
  ];

  const useCases = [
    {
      title: "Personal Learning",
      description:
        "Feed your own materials (notes, PDFs, videos, links) and learn interactively with quizzes, explanations, chat, and voice.",
      icon: "📚",
      color: "from-blue-500/20 to-indigo-600/20"
    },
    {
      title: "Family & Kids",
      description:
        "Set up profiles for family members or children, curate age‑appropriate content, and track progress.",
      icon: "👪",
      color: "from-pink-500/20 to-rose-600/20"
    },
    {
      title: "Classroom & Cohorts",
      description:
        "Teachers prepare question banks and share via import/export so students can practice anywhere.",
      icon: "🎓",
      color: "from-amber-500/20 to-yellow-600/20"
    },
    {
      title: "Teams & Onboarding",
      description:
        "Curate domain knowledge, SOPs, and product docs to train new hires quickly with measurable progress.",
      icon: "👥",
      color: "from-emerald-500/20 to-green-600/20"
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", color: "text-blue-500" },
    { name: "TypeScript", icon: "📝", color: "text-blue-600" },
    { name: "Tailwind CSS", icon: "🎨", color: "text-cyan-500" },
    { name: "Vite", icon: "⚡", color: "text-yellow-500" },
    { name: "daisyUI", icon: "🌸", color: "text-pink-500" },
    { name: "Google Gemini API", icon: "🔮", color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden w-screen max-w-full">
      {/* Layered animated background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Gradient mesh blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-gradient-to-br from-secondary/20 to-primary/10 blur-3xl rounded-full animate-pulse delay-700"></div>
        {/* Subtle radial grid mask */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,theme(colors.gray.200)/.35,transparent_60%)] dark:[background:radial-gradient(ellipse_at_center,theme(colors.gray.700)/.25,transparent_60%)]"></div>
        {/* Animated conic highlight */}
        <div className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[conic-gradient(from_0deg,theme(colors.primary.DEFAULT)_0%,theme(colors.accent)_25%,theme(colors.secondary)_50%,theme(colors.primary.DEFAULT)_75%,theme(colors.accent)_100%)] animate-[spin_30s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 pt-2 pb-16 w-full max-w-full">
        {/* Navigation */}
        <nav className="px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-primary to-accent p-[2px] rounded-xl">
              <div className="bg-base-100 rounded-lg p-2">
                <img src="/kostudy.png" alt="Kostudy logo" className="w-9 h-9 rounded-lg" />
              </div>
            </div>
            <span className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Kostudy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="font-medium hover:text-primary transition-colors">Features</a>
            <a href="#screenshots" className="font-medium hover:text-primary transition-colors">Screenshots</a>
            <a href="#about" className="font-medium hover:text-primary transition-colors">About</a>
            <a href="#contact" className="font-medium hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtu.be/VsXnGYEopW0?si=qPlHpDq75T32G-RJ"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn btn-ghost btn-sm"
            >
              ▶ Demo
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden btn btn-ghost btn-circle"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="bg-base-100 rounded-2xl shadow-xl p-4">
              <a href="#features" className="block py-2 font-medium hover:text-primary transition-colors">Features</a>
              <a href="#screenshots" className="block py-2 font-medium hover:text-primary transition-colors">Screenshots</a>
              <a href="#about" className="block py-2 font-medium hover:text-primary transition-colors">About</a>
              <a href="#contact" className="block py-2 font-medium hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-4 md:px-8 min-h-[70vh] flex items-center justify-center py-10">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-25 animate-pulse"></div>
                  <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-3xl shadow-xl relative">
                    <div className="bg-base-100 rounded-2xl p-4">
                      <img src="/kostudy.png" alt="Kostudy logo" className="w-20 h-20 rounded-2xl" />
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                AI‑First Learning, Built Right
              </h1>

              <p className="text-lg md:text-xl font-semibold mb-3 text-base-content">
                Personalized quizzes, interactive modes, chat and voice—powered by the Google Gemini API.
              </p>

              <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-base-content/80">
                Bring your own materials (videos, PDFs, audio, links). Kostudy generates targeted questions and explanations,
                tracks progress, and keeps you engaged with achievements and narrative learning.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-auto">
                <button
                  onClick={handleGetStarted}
                  className="btn btn-primary btn-md"
                >
                  🚀 Get Started Free
                </button>
                <a
                  href="https://github.com/youssef-imlyhen/kostudy"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-md"
                >
                  ⭐ Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots + Video */}
        <section id="screenshots" className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">See Kostudy In Action</h2>

              {/* Video */}
              <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-base-200 mb-8">
                <div className="relative w-full pb-[56.25%] bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/VsXnGYEopW0?rel=0"
                    title="Kostudy Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Carousel */}
              <div className="relative" ref={carouselRef}>
                <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl border-8 border-base-100">
                  <img
                    src={screenshots[currentScreenshot].src}
                    alt={screenshots[currentScreenshot].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{screenshots[currentScreenshot].title}</h3>
                    <p className="text-white/90 text-sm md:text-base">{screenshots[currentScreenshot].description}</p>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {screenshots.map((screenshot, index) => (
                    <button
                      aria-label={`Show ${screenshot.title}`}
                      key={screenshot.id}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`cursor-pointer rounded-xl overflow-hidden shadow-md border-2 transition-all duration-300 ${
                        index === currentScreenshot
                          ? 'border-primary scale-[1.03] shadow-primary/30'
                          : 'border-base-200 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={screenshot.src}
                        alt={screenshot.title}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Powerful, Practical Features</h2>

              {/* AI features */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {aiFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="relative bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} pointer-events-none`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">{feature.icon}</div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-base-content/70 mb-3">{feature.subtitle}</p>
                      <p className="text-base-content/80 text-sm md:text-[0.95rem] leading-relaxed">{feature.description}</p>
                      <ul className="mt-4 space-y-1.5 text-sm text-base-content/70 list-disc list-inside">
                        {feature.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core features */}
              <h3 className="text-2xl font-bold mt-12 mb-6 text-center">Core Quiz & Platform</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {coreFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="relative bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} pointer-events-none`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">{feature.icon}</div>
                        <h4 className="text-lg font-bold">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-base-content/70 mb-3">{feature.subtitle}</p>
                      <p className="text-base-content/80 text-sm md:text-[0.95rem] leading-relaxed">{feature.description}</p>
                      <ul className="mt-4 space-y-1.5 text-sm text-base-content/70 list-disc list-inside">
                        {feature.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section (condensed, accurate) */}
        <section id="about" className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl p-8 md:p-10 border border-base-200">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Why Kostudy</h2>
              <div className="prose max-w-none">
                <p className="mb-4 text-base-content/90">
                  Most learning tools either lean on shallow gamification or bolt a chatbot onto a dated quiz. Kostudy is different:
                  an AI‑first, open‑source platform that uses modern web tech (React, TypeScript, Tailwind) and the Google Gemini API
                  to deliver context‑aware learning that actually helps you remember, understand, and apply.
                </p>
                <p className="mb-0 text-base-content/90">
                  It’s a reimagining of what an education app should be in the age of AI—practical, extensible, and fun to use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Use Cases</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-br from-base-100 to-base-200 rounded-2xl shadow-lg p-6 border border-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color}`}></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{useCase.icon}</div>
                      <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                      <p className="text-base-content/80 text-sm md:text-[0.95rem]">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Built with Modern Technologies</h2>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`text-4xl mb-3 ${tech.color}`}>{tech.icon}</div>
                    <div className="text-base font-semibold text-center">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 mb-16">
          <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl shadow-xl p-10 border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 [background:radial-gradient(circle_at_20%_20%,theme(colors.primary.DEFAULT)/.6_0,transparent_40%),radial-gradient(circle_at_80%_30%,theme(colors.accent)/.6_0,transparent_35%)]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
                <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-base-content/90">
                  Install as a PWA, import your materials, and start learning with AI today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-auto">
                  <button onClick={handleGetStarted} className="btn btn-primary btn-md">Start Free</button>
                  <a
                    href="https://github.com/youssef-imlyhen/kostudy"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-md"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="px-4 md:px-8 pt-12 pb-6 border-t border-base-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-primary to-accent p-[2px] rounded-xl">
                    <div className="bg-base-100 rounded-lg p-2">
                      <img src="/kostudy.png" alt="Kostudy logo" className="w-8 h-8 rounded-lg" />
                    </div>
                  </div>
                  <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Kostudy
                  </span>
                </div>
                <p className="text-base-content/80 text-sm">
                  AI‑powered, open‑source learning for the future of education.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold mb-4">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#features" className="text-base-content/80 hover:text-primary transition-colors">AI Question Generation</a></li>
                  <li><a href="#features" className="text-base-content/80 hover:text-primary transition-colors">AI Chat Assistant</a></li>
                  <li><a href="#features" className="text-base-content/80 hover:text-primary transition-colors">SagaLearn Adventure</a></li>
                  <li><a href="#features" className="text-base-content/80 hover:text-primary transition-colors">Achievements & Analytics</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://github.com/youssef-imlyhen/kostudy" target="_blank" rel="noreferrer" className="text-base-content/80 hover:text-primary transition-colors">GitHub</a></li>
                  <li><a href="https://youtu.be/VsXnGYEopW0?si=qPlHpDq75T32G-RJ" target="_blank" rel="noreferrer" className="text-base-content/80 hover:text-primary transition-colors">Demo Video</a></li>
                  <li><a href="#screenshots" className="text-base-content/80 hover:text-primary transition-colors">Screenshots</a></li>
                  <li><a href="#about" className="text-base-content/80 hover:text-primary transition-colors">About</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold mb-4">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-base-content/60">Twitter (coming soon)</span></li>
                  <li><span className="text-base-content/60">LinkedIn (coming soon)</span></li>
                  <li><span className="text-base-content/60">Discord (coming soon)</span></li>
                  <li><a href="mailto:contact@example.com" className="text-base-content/80 hover:text-primary transition-colors">Email</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-base-200 mt-10 pt-6 text-center text-base-content/60 text-sm">
              <p>© 2025 Kostudy. MIT Licensed.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}