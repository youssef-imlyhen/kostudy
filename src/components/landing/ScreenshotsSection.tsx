import { useState, useEffect } from 'react';

export default function ScreenshotsSection() {
  const screenshots = [
    { id: 1, src: "/assets/screenshots/frame_005_15.23s.jpg", alt: "Dashboard view" },
    { id: 2, src: "/assets/screenshots/frame_015_43.43s.jpg", alt: "Quiz interface" },
    { id: 3, src: "/assets/screenshots/frame_023_67.56s.jpg", alt: "Learning progress" },
    { id: 4, src: "/assets/screenshots/frame_041_118.64s.jpg", alt: "Achievements" },
    { id: 5, src: "/assets/screenshots/frame_008_80.42s.jpg", alt: "AI Chat" },
    { id: 6, src: "/assets/screenshots/frame_02_104.55s.jpg", alt: "Categories" },
    { id: 7, src: "/assets/screenshots/frame_006_64.34s.jpg", alt: "Settings" },
    { id: 8, src: "/assets/screenshots/frame_048_139.32s.jpg", alt: "Results" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobile, screenshots.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1));
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">See Kostudy In Action</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Experience the power of AI-powered learning with our intuitive interface
        </p>
      </div>

      {/* Carousel for mobile */}
      {isMobile ? (
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 10}%)` }}
            >
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="w-full flex-shrink-0">
                  <img 
                    src={screenshot.src} 
                    alt={screenshot.alt} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-base-300'}`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-primary btn-outline btn-circle btn-sm"
            aria-label="Previous screenshot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-outline btn-circle btn-sm"
            aria-label="Next screenshot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        /* Grid for desktop */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="card bg-base-100 shadow-xl overflow-hidden group">
              <figure className="transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt} 
                  className="w-full h-48 object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}