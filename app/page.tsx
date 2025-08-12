"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems as portfolioItemsStatic } from "@/data/portfolio";
import { supabase } from "@/lib/supabaseClient";

// Optimized dynamic imports with better loading states
const Header = dynamic(() => import("./components/Header"), {
  ssr: false,
  loading: () => <div className="h-16 bg-[#0a2449]/60 backdrop-blur-xl" />,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
  loading: () => <div className="h-64 bg-[#efede7]" />,
});

const Preloader = dynamic(() => import("./components/Preloader"), {
  ssr: false,
  loading: () => null,
});

const AboutSection = dynamic(() => import("./components/About"), {
  ssr: false,
  loading: () => <div className="h-96 bg-[#efede7] animate-pulse" />,
});

const ServicesCarousel = dynamic(
  () => import("./components/ServicesCarousel"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-[#efede7] animate-pulse" />,
  }
);

const EnhancedMobileServices = dynamic(
  () => import("./components/EnhancedMobileServices"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-[#efede7] animate-pulse" />,
  }
);

// Memoized static data
const companies = [
  {
    title: "Infinite Real Estate",
    image: "/infinite-real-estate.jpg",
  },
  {
    title: "Paramount International LLC",
    image: "/paramount-international.jpg",
  },
  {
    title: "Infinite International",
    image: "/infinite-international.jpg",
  },
];

const initialTestimonials = [
  {
    name: "Sarah Johnson",
    company: "Tech Innovations Inc.",
    text: "Ideator Events transformed our annual conference into an unforgettable experience. Their attention to detail and global perspective is unmatched.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Rajesh Patel",
    company: "Global Enterprises",
    text: "From concept to execution, the team delivered beyond our expectations. Our Dubai event was flawless and left a lasting impression on all attendees.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Maria Santos",
    company: "Creative Solutions",
    text: "Working with Ideator Events was a game-changer. They understood our vision and brought it to life with precision and creativity.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
];

const locations = [
  {
    country: "India",
    cities: ["Kochi", "Mumbai", "Delhi"],
    flag: "🇮🇳",
  },
  {
    country: "UAE",
    cities: ["Dubai"],
    flag: "🇦🇪",
  },
  {
    country: "Thailand",
    cities: ["Bangkok"],
    flag: "🇹🇭",
  },
  {
    country: "Indonesia",
    cities: ["Jakarta"],
    flag: "🇮🇩",
  },
];

export default function IdeatorEventsWebsite() {
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] =
    useState<any[]>(portfolioItemsStatic);
  const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
  const [pageLoading, setPageLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize AOS with optimized loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAOS = async () => {
      try {
        const [AOS] = await Promise.all([
          import("aos"),
          import("aos/dist/aos.css"),
        ]);
        AOS.default.init({
          duration: 800,
          once: true,
          easing: "ease-out-quart",
        });
      } catch (error) {
        console.error("Failed to load AOS:", error);
      }
    };

    initAOS();
  }, []);

  // Optimized video loading check
  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll("video")
    ) as HTMLVideoElement[];

    if (videos.length === 0) {
      setPageLoading(false);
      return;
    }

    let loaded = 0;
    const handleLoaded = () => {
      loaded += 1;
      if (loaded === videos.length) {
        setPageLoading(false);
      }
    };

    videos.forEach((video) => {
      if (video.readyState >= 3) {
        handleLoaded();
      } else {
        video.addEventListener("canplaythrough", handleLoaded, { once: true });
      }
    });

    // Reduced timeout for faster loading
    const timeout = setTimeout(() => setPageLoading(false), 5000);

    return () => {
      videos.forEach((video) =>
        video.removeEventListener("canplaythrough", handleLoaded)
      );
      clearTimeout(timeout);
    };
  }, []);

  // Optimized data fetching with error handling
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [portfolioResult, testimonialsResult] = await Promise.allSettled([
          supabase
            .from("portfolio")
            .select("id, title, location, image, videourl, category")
            .order("id", { ascending: false }),
          supabase
            .from("testimonials")
            .select("id, name, company, text, rating, image")
            .order("id", { ascending: false }),
        ]);

        if (
          portfolioResult.status === "fulfilled" &&
          portfolioResult.value.data
        ) {
          setPortfolioItems(portfolioResult.value.data);
        }

        if (
          testimonialsResult.status === "fulfilled" &&
          testimonialsResult.value.data
        ) {
          setTestimonials(testimonialsResult.value.data);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };

    fetchContent();
  }, []);

  // Memoized portfolio items for better performance
  const displayedPortfolioItems = useMemo(
    () => portfolioItems.slice(0, 4),
    [portfolioItems]
  );

  // Memoized testimonials for marquee
  const marqueeTestimonials = useMemo(
    () => testimonials.concat(testimonials),
    [testimonials]
  );

  return (
    <div className="min-h-screen bg-[#efede7]">
      <Suspense fallback={null}>{pageLoading && <Preloader />}</Suspense>

      <Suspense
        fallback={<div className="h-16 bg-[#0a2449]/60 backdrop-blur-xl" />}
      >
        <Header />
      </Suspense>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16 mt-20">
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            width="1920"
            height="1080"
            poster="/banners.mp4"
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <source src="/banners.mp4" type="video/mp4" />
            <source src="/banners.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 pointer-events-none" />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a2449]/60 via-[#0a2449]/30 to-transparent pointer-events-none"></div>

        {/* Hero Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-end w-full px-4 pb-12">
          <h1
            className={`
              text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#efede7]
              text-center mb-4 drop-shadow-lg animate-fade-in-up
            `}
          >
            Elevate Your{" "}
            <span className="text-[#FFFFFFFF] px-2 rounded">Events</span>
            <br />
            Inspire{" "}
            <span className="text-[#FFFFFFFF] px-2 rounded">Audiences</span>
          </h1>
          <p
            className={`
              text-base sm:text-lg md:text-2xl text-[#efede7]/80
              text-center mb-8 max-w-2xl animate-fade-in-up delay-150
            `}
          >
            Unforgettable experiences, crafted with passion and precision—across
            India, UAE, Thailand, and Indonesia.
          </p>
          <a href="#about">
            <Button
              size="lg"
              className={`
                bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90
                px-8 py-5 text-lg
                rounded-full font-semibold shadow-lg animate-fade-in-up delay-300
              `}
            >
              Know More
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .delay-150 {
            animation-delay: 0.15s;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
      </section>

      <div id="about">
        <Suspense
          fallback={<div className="h-96 bg-[#efede7] animate-pulse" />}
        >
          <AboutSection />
        </Suspense>
      </div>

      {/* Services Section */}
      <div id="services">
        <div className="hidden lg:block">
          <Suspense
            fallback={<div className="h-96 bg-[#efede7] animate-pulse" />}
          >
            <ServicesCarousel />
          </Suspense>
        </div>

        <Suspense
          fallback={<div className="h-96 bg-[#efede7] animate-pulse" />}
        >
          <EnhancedMobileServices />
        </Suspense>
      </div>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-4 rounded-full px-4 py-2">
              Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2449] mb-4">
              Our Work
            </h2>
            <p className="text-xl text-[#0a2449]/70 max-w-3xl mx-auto">
              Discover the extraordinary events we've brought to life across the
              globe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPortfolioItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                onClick={() => item.videourl && setVideoModalUrl(item.videourl)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={350}
                    height={280}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/90 via-[#0a2449]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-[#efede7]">
                      <Badge className="bg-[#efede7]/25 text-[#efede7] mb-3 text-xs px-3 py-1 backdrop-blur-sm">
                        {item.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[#efede7]/90 flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay with play icon for videos */}
                  {item.videourl && (
                    <div className="absolute inset-0 bg-[#0a2449]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 rounded-full group px-8"
              >
                View All Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Video Modal */}
          {videoModalUrl && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setVideoModalUrl(null)}
            >
              <div
                className="relative w-full max-w-4xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Outer frame */}
                <div className="w-full h-full rounded-2xl shadow-2xl border-4 border-[#efede7] bg-black flex items-center justify-center relative">
                  {/* Inner frame with video */}
                  <div className="w-[90%] h-[90%] rounded-xl overflow-hidden border-2 border-[#0a2449] bg-black flex items-center justify-center relative">
                    <iframe
                      src={`${videoModalUrl}?autoplay=1`}
                      title="Portfolio video"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
                <button
                  className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300 focus:outline-none bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={() => setVideoModalUrl(null)}
                  aria-label="Close video modal"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials - Horizontal Marquee */}
      <section className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-4 rounded-full px-4 py-2">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2449] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-[#0a2449]/70 max-w-3xl mx-auto">
              Don't just take our word for it — hear from the clients who've
              experienced our exceptional service.
            </p>
          </div>
          <div className="relative overflow-hidden py-4 md:py-8 group">
            {/* Fade overlays for left/right edges */}
            {/* Cross-fade overlays for left/right edges */}
            <div className="hidden sm:block pointer-events-none absolute top-0 left-0 h-full w-16 z-20 bg-gradient-to-r from-[#efede7] via-[#efede7]/80 to-transparent transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />
            <div className="hidden sm:block pointer-events-none absolute top-0 right-0 h-full w-16 z-20 bg-gradient-to-l from-[#efede7] via-[#efede7]/80 to-transparent transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />
            <div className="hidden sm:block absolute top-2 md:top-4 left-1/2 -translate-x-1/2 bg-white/80 text-[#0a2449] text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 backdrop-blur-sm shadow-[0_2px_8px_rgba(10,36,73,0.04)]">
              Hover to pause
            </div>
            <div
              className="flex items-stretch animate-marquee-scroll whitespace-normal hover:[animation-play-state:paused]"
              style={{ animation: "marquee-scroll 15s linear infinite" }}
            >
              {marqueeTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`${
                    index > 1 ? "hidden sm:flex" : ""
                  } relative min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-[0_4px_24px_rgba(10,36,73,0.03)] rounded-[40px] md:rounded-[60px] p-6 sm:p-8 md:p-10 flex flex-col justify-between mx-3 sm:mx-4 md:mx-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(10,36,73,0.06)]`}
                  onMouseEnter={() => {
                    const parent = document.querySelector(
                      ".animate-marquee-scroll"
                    ) as HTMLElement;
                    if (parent) parent.style.animationPlayState = "paused";
                  }}
                  onMouseLeave={() => {
                    const parent = document.querySelector(
                      ".animate-marquee-scroll"
                    ) as HTMLElement;
                    if (parent) parent.style.animationPlayState = "running";
                  }}
                  onTouchStart={() => {
                    const parent = document.querySelector(
                      ".animate-marquee-scroll"
                    ) as HTMLElement;
                    if (parent) parent.style.animationPlayState = "paused";
                  }}
                  onTouchEnd={() => {
                    const parent = document.querySelector(
                      ".animate-marquee-scroll"
                    ) as HTMLElement;
                    if (parent) parent.style.animationPlayState = "running";
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0a2449] text-[#0a2449] opacity-80"
                      />
                    ))}
                  </div>
                  <p className="text-[#0a2449]/70 mb-6 sm:mb-8 md:mb-10 leading-relaxed italic text-base sm:text-sm line-clamp-3 sm:line-clamp-4 h-[72px] sm:h-[96px]">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center pt-4 sm:pt-6 md:pt-8 border-t border-[#0a2449]/5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#0a2449]/5 flex items-center justify-center mr-3 sm:mr-4">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a2449]/40">
                          👤
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0a2449] text-base sm:text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#0a2449]/50 text-xs sm:text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <style jsx>{`
              @keyframes marquee-scroll {
                0% {
                  transform: translateX(calc(0% + 0.75rem));
                }
                100% {
                  transform: translateX(calc(-50% - 0.75rem));
                }
              }

              @media (min-width: 640px) {
                @keyframes marquee-scroll {
                  0% {
                    transform: translateX(calc(0% + 1rem));
                  }
                  100% {
                    transform: translateX(calc(-50% - 1rem));
                  }
                }
              }

              @media (min-width: 768px) {
                @keyframes marquee-scroll {
                  0% {
                    transform: translateX(calc(0% + 1.5rem));
                  }
                  100% {
                    transform: translateX(calc(-50% - 1.5rem));
                  }
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-[#efede7] text-[#0a2449] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,36,73,0.1),transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Eager to Craft Something Unique?
          </h2>
          <p className="text-xl text-[#0a2449]/70 mb-12 max-w-3xl mx-auto">
            Let's explore how we can transform your ideas into a memorable experience for your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 px-8 py-6 text-lg rounded-full group"
            >
              Kickstart Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#0a2449] text-[#0a2449] hover:bg-[#0a2449]/10 px-8 py-6 text-lg rounded-full"
            >
              Grab Our Brochure
            </Button>
          </div>
        </div>
      </section> */}

      <Suspense fallback={<div className="h-64 bg-[#efede7]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
