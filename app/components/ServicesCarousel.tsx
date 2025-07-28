import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";

const AUTOPLAY_INTERVAL = 4000;
const MIN_SWIPE_DISTANCE = 50;
const VISIBLE_OFFSET = 2;

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SERVICES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + SERVICES.length) % SERVICES.length
    );
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseEnter = useCallback(() => setIsAutoPlay(false), []);
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlay(true);
    setIsDragging(false);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - startX;
      if (x > MIN_SWIPE_DISTANCE) {
        prevSlide();
        setIsDragging(false);
      } else if (x < -MIN_SWIPE_DISTANCE) {
        nextSlide();
        setIsDragging(false);
      }
    },
    [isDragging, startX, nextSlide, prevSlide]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > MIN_SWIPE_DISTANCE) {
      nextSlide();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  // Memoize the card style calculation function
  const getCardStyle = useCallback(
    (offset: number, isVisible: boolean, isActive: boolean) => {
      if (!isVisible) {
        return {
          transform: `translateX(${offset > 0 ? 200 : -200}%) scale(0.5)`,
          opacity: 0,
          visibility: "hidden" as const,
        };
      }

      const xOffset = offset * 55;
      const scale = isActive ? 1 : 1 - Math.abs(offset) * 0.25;
      const z = 100 - Math.abs(offset);
      const cardOpacity = Math.abs(offset) > 1 ? 0 : 1;

      return {
        transform: `translateX(${xOffset}%) scale(${scale})`,
        zIndex: z,
        opacity: cardOpacity,
        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        visibility: "visible" as const,
      };
    },
    []
  );

  // Memoize the background videos
  const backgroundVideos = useMemo(
    () => (
      <div className="absolute inset-0 w-full h-full scale-110">
        {SERVICES.map((service, index) => {
          const isVideo = service.image.endsWith(".mp4");
          return (
            <div
              key={service.id}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                opacity: index === currentIndex ? 1 : 0,
              }}
            >
              {isVideo ? (
                <>
                  <video
                    src={service.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </>
              ) : (
                <>
                  <div
                    style={{
                      backgroundImage: `url(${service.image})`,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </>
              )}
            </div>
          );
        })}
      </div>
    ),
    [currentIndex]
  );

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[20vh] overflow-hidden bg-gray-900 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      {backgroundVideos}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

      <div
        className="relative z-10 w-full h-full flex flex-col justify-center items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-center mb-6 md:mb-10">
          <span className="text-sm font-semibold tracking-widest text-white/60 uppercase">
            Our Services
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
            What We Do
          </h1>
        </div>

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
          <div
            className="relative w-full h-full"
            style={{ perspective: "1000px" }}
          >
            {SERVICES.map((service, index) => {
              const offset = index - currentIndex;
              const isVisible = Math.abs(offset) <= VISIBLE_OFFSET;
              const isActive = index === currentIndex;

              return (
                <div
                  key={service.id}
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  style={getCardStyle(offset, isVisible, isActive)}
                >
                  <ServiceCard service={service} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

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
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
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
