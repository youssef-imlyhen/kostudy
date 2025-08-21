import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-primary-content mb-12">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-20 right-40 w-16 h-16 rounded-full bg-white"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Kostudy</h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4">AI-Powered Learning Platform</h2>
        
        <p className="text-lg mb-6 opacity-90">
          Transform your learning experience with our cutting-edge AI technology. 
          Personalized quizzes, interactive lessons, and intelligent feedback all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGetStarted}
            className="btn btn-primary bg-white text-primary hover:bg-gray-100 border-none font-bold py-3 px-8 rounded-xl text-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Get Started Free
          </button>
          
          <button className="btn btn-outline border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl text-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.64l-3-2z" clipRule="evenodd" />
            </svg>
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
}