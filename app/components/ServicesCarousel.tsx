import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: "HOTEL GROUP BOOKINGS AND GROUND MANAGEMENT",
    description: "Comprehensive accommodation and ground management services",
    image: "/hotel.mp4"
  },
  {
    id: 2,
    title: "CORPORATE EVENTS & CONFERENCES",
    description: "Professional gatherings that drive meaningful business connections",
    image: "/conference.mp4"
  },
  {
    id: 3,
    title: "PRODUCT LAUNCHES & BRAND ACTIVATIONS",
    description: "Strategic events that create buzz and elevate brand presence",
    image: "/productlaunch.mp4"
  },
  {
    id: 4,
    title: "EXHIBITIONS & BRANDING",
    description: "Impactful displays and experiences that showcase your brand",
    image: "/exhibition.mp4"
  },
  {
    id: 5,
    title: "CONCERTS & ARTIST MANAGEMENT",
    description: "End-to-end entertainment event and talent coordination",
    image: "/concerts.mp4"
  },
  {
    id: 6,
    title: "INTERNATIONAL TOURS AND EVENTS",
    description: "Expertly planned global business travel and events",
    image: "/tours.mp4"
  },
  {
    id: 7,
    title: "AWARD SHOWS & GALA DINNERS",
    description: "Prestigious ceremonies that celebrate achievement in style",
    image: "/awards.mp4"
  },
  {
    id: 8,
    title: "FASHION SHOWS & LIFESTYLE EVENTS",
    description: "Sophisticated showcases of style and luxury experiences",
    image: "/fashion.mp4"
  }
];

const ServiceCard = React.memo(
  ({ service, isActive = false }: { service: Service; isActive?: boolean }) => {
    const isVideo = service.image.endsWith('.mp4');
    
    return (
      <div
        className={`relative h-full aspect-[3/4] max-h-full ${
          isActive
            ? 'lg:h-auto lg:w-[750px] xl:w-[900px] 2xl:w-[1100px] max-w-none transition-all duration-300'
            : 'max-w-[350px] transition-all duration-300'
        }
        rounded-2xl overflow-hidden shadow-2xl shadow-black/50
        bg-gray-800`}
      >
        {isVideo ? (
          <video
            src={service.image}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
    );
  }
);
ServiceCard.displayName = 'ServiceCard';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoPlayInterval = 4000;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SERVICES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide, autoPlayInterval]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseEnter = useCallback(() => setIsAutoPlay(false), []);
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlay(true);
    setIsDragging(false);
  }, []);

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    if (x > 100) {
      prevSlide();
      setIsDragging(false);
    } else if (x < -100) {
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="relative w-full min-h-[25vh] md:min-h-[20vh] overflow-hidden bg-gray-900 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full scale-110">
        {SERVICES.map((service, index) => {
          const isVideo = service.image.endsWith('.mp4');
          return (
            <div
              key={service.id}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                opacity: index === currentIndex ? 1 : 0,
              }}
            >
              {isVideo ? (
                <video
                  src={service.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${service.image})`,
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

      {/* Main Content */}
      <div
        className="relative z-10 w-full h-full flex flex-col justify-center items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <span className="text-sm font-semibold tracking-widest text-white/60 uppercase">Our Services</span>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
            What We Do
          </h1>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full h-[25vh] max-h-[250px] lg:h-[35vh] lg:max-h-[400px] xl:h-[45vh] xl:max-h-[550px] 2xl:h-[50vh] 2xl:max-h-[650px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
            {SERVICES.map((service, index) => {
              const offset = index - currentIndex;
              const isVisible = Math.abs(offset) <= 2;
              const isActive = index === currentIndex;

              const getCardStyle = () => {
                if (!isVisible)
                  return {
                    transform: `translateX(${offset > 0 ? 200 : -200}%) scale(0.5)`,
                    opacity: 0,
                    visibility: 'hidden' as const,
                  };

                const xOffset = offset * 55;
                const scale = isActive ? 1 : 1 - Math.abs(offset) * 0.25;
                const z = 100 - Math.abs(offset);
                const cardOpacity = Math.abs(offset) > 1 ? 0 : 1;

                return {
                  transform: `translateX(${xOffset}%) scale(${scale})`,
                  zIndex: z,
                  opacity: cardOpacity,
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  visibility: 'visible' as const,
                };
              };

              return (
                <div
                  key={service.id}
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  style={getCardStyle()}
                >
                  <ServiceCard service={service} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Text Content for Active Slide */}
        <div className="relative w-full max-w-xl text-center mt-6 md:mt-10 h-28 md:h-32">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-start"
              style={{ opacity: index === currentIndex ? 1 : 0, pointerEvents: index === currentIndex ? 'auto' : 'none' }}
            >
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">
                {service.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/80 max-w-md">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation and Indicators */}
        <div className="flex flex-col items-center mt-auto pt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300 disabled:opacity-50"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300 disabled:opacity-50"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {SERVICES.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesCarousel);