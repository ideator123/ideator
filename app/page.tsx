"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Globe,
  Users,
  Sparkles,
  Award,
  Rocket,
  MapPin,
  Star,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import ServicesCarousel from "./components/ServicesCarousel"; // Import the ServicesCarousel component
import { portfolioItems as portfolioItemsStatic } from "@/data/portfolio";
import { supabase } from "@/lib/supabaseClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults    // ← correct name 
} from "next-cloudinary";

export default function IdeatorEventsWebsite() {
  // Navigation menu state is now handled inside Header component
  const [animationData, setAnimationData] = useState(null);
  // Video modal state for portfolio section
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  // Dynamic data from Supabase with static fallback
  const [portfolioItems, setPortfolioItems] = useState<any[]>(portfolioItemsStatic);

  // The testimonials array below will be renamed; we initialise dynamic state first
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Initialize AOS once on mount (dynamic import to avoid type issues)
  useEffect(() => {
    if (typeof window === "undefined") return;
    Promise.all([import("aos"), import("aos/dist/aos.css")]).then(([AOS]) => {
      AOS.default.init({
        duration: 800,
        once: true,
        easing: "ease-out-quart",
      });
    });
  }, []);

  // Load Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/animation-data.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };
    loadAnimation();
  }, []);

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
      image: "/placeholder.svg?height=60&width=60", // Add image for each testimonial
    },
    {
      name: "Rajesh Patel",
      company: "Global Enterprises",
      text: "From concept to execution, the team delivered beyond our expectations. Our Dubai event was flawless and left a lasting impression on all attendees.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60", // Add image for each testimonial
    },
    {
      name: "Maria Santos",
      company: "Creative Solutions",
      text: "Working with Ideator Events was a game-changer. They understood our vision and brought it to life with precision and creativity.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60", // Add image for each testimonial
    },
  ];

  // set fallback testimonials only once (on first render)
  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, []);

  // Fetch dynamic content from Supabase on mount
  useEffect(() => {
    const fetchContent = async () => {
      // Portfolio data
      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolio")
        .select("id, title, location, image, videourl, category") 
        .order("id", { ascending: false });

      if (portfolioError) {
        console.error("Failed to fetch portfolio items:", portfolioError.message);
      } else if (portfolioData) {
        setPortfolioItems(portfolioData);
      }

      // Testimonials data
      const { data: testimonialData, error: testimonialError } = await supabase
        .from("testimonials")
        .select("id, name, company, text, rating, image")
        .order("id", { ascending: false });

      if (testimonialError) {
        console.error("Failed to fetch testimonials:", testimonialError.message);
      } else if (testimonialData) {
        setTestimonials(testimonialData);
      }
    };

    fetchContent();
  }, []);

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

  // portfolioItems imported from centralized data file

  return (
    <div className="min-h-screen bg-[#efede7]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2449]/40 to-[#0a2449]/60 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-3xl md:text-6xl font-light mb-8 leading-tight text-[#efede7]">
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#efede7] to-[#efede7]/70">
              Designing Remarkable Events Across the Globe
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-[#efede7] text-[#0a2449] hover:bg-[#efede7]/90 px-8 py-6 text-lg font-medium transition-all duration-300 rounded-full group"
            >
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-[#efede7]/60 rounded-full flex justify-center">
            <div className="w-1.5 h-2.5 bg-[#efede7]/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section Gradients */}

      {/* Who We Are - Simple & Clean */}
      <section
        id="about"
        className="py-20 bg-[#efede7] relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-[#0a2449]"></div>
                <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-4 py-2">
                  About Us
                </Badge>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-[#0a2449] mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-[#0a2449]/60 mb-8">
                Our Story of Excellence
              </p>

              <div className="space-y-6 text-lg text-[#0a2449]/70 leading-relaxed text-justify">
                <p>
                  Ideator Events was born from a bold vision: to transform the corporate events landscape across Asia and the Middle East. Starting in Kochi, we have grown over the last 18 years into a global force with offices and production houses in India, Dubai, Bangkok, and Indonesia.
                </p>

                <p>
                  At Ideator, we believe every event tells a story. From intimate executive retreats to grand international conferences and spectacular concerts, we craft experiences with creativity, precision, and passion.
                </p>

                <p>
                  Guided by our Managing Director, Mr. Mathews Joseph — a seasoned hotelier — we bring together hospitality, entertainment, and seamless execution.
                </p>

                <p>
                  We are part of a powerful creative ecosystem alongside our sister companies:
                </p>

                <p>
                  Festival Cinema, specializing in Indian film production.
                </p>

                <p>
                  Forwardslash Digital, focusing on digital and social media marketing.
                </p>

                <p>
                  Our three companies share one united motto: to inspire, connect, and create unforgettable experiences across industries and platforms.
                </p>

                <p>
                  With in-house design studios and production units, we ensure every detail is flawlessly executed without third-party dependencies. We take pride in our zero-complaint record, a reflection of our commitment to quality and client satisfaction.
                </p>

                <p>
                  At Ideator Events, we believe a successful event is all about the guest experience. With over 18 years of expertise and a dedicated team, we turn ideas into unforgettable moments — so you can focus on enjoying the celebration.
                </p>
              </div>

              {/* Simple Stats */}

              {/* Leadership */}
          
            </div>

            {/* Right Content - Animation */}
            <div className="flex flex-col gap-12">
              <div className="relative">
                <video
                  src="/about.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-[500px] mx-auto rounded-3xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="bg-[#0a2449]/5 rounded-2xl p-6 text-center transition-all hover:bg-[#0a2449]/10">
                  <div className="text-4xl font-bold text-[#0a2449] mb-2">
                    4
                  </div>
                  <div className="text-sm font-medium text-[#0a2449]/70">
                    Global Offices
                  </div>
                </div>
                <div className="bg-[#0a2449]/5 rounded-2xl p-6 text-center transition-all hover:bg-[#0a2449]/10">
                  <div className="text-4xl font-bold text-[#0a2449] mb-2">
                    15+
                  </div>
                  <div className="text-sm font-medium text-[#0a2449]/70">
                    Years of Excellence
                  </div>
                </div>
                <div className="bg-[#0a2449]/5 rounded-2xl p-6 text-center transition-all hover:bg-[#0a2449]/10">
                  <div className="text-4xl font-bold text-[#0a2449] mb-2">
                    500+
                  </div>
                  <div className="text-sm font-medium text-[#0a2449]/70">
                    Events Delivered
                  </div>
                </div>  
                {/* <div className="bg-[#0a2449]/5 rounded-2xl p-6 text-center transition-all hover:bg-[#0a2449]/10">
                  <div className="text-4xl font-bold text-[#0a2449] mb-2">
                    <Image 
                      src="/eemalogo.png"
                      alt="Platinum Member Logo"
                      width={48}
                      height={48}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-sm font-medium text-[#0a2449]/70">
                    Platinum Member
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

        <ServicesCarousel />

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => item.videourl && setVideoModalUrl(item.videourl)}  
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/80 via-[#0a2449]/40 to-transparent">
                    <div className="absolute bottom-8 left-8 text-[#efede7]">
                      <Badge className="bg-[#efede7]/20 text-[#efede7] mb-4">
                        {item.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-[#efede7]/80 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* View All Portfolio button */}
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
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setVideoModalUrl(null)}
            >
              <div
                className="relative w-full max-w-3xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={`${videoModalUrl}?autoplay=1`}
                  title="Portfolio video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full rounded-xl shadow-2xl"
                />
                <button
                  className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 focus:outline-none"
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
          <div className="relative overflow-hidden py-4 md:py-8">
            {/* Pause indicator */}
            <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 bg-white/80 text-[#0a2449] text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 backdrop-blur-sm shadow-[0_2px_8px_rgba(10,36,73,0.04)]">
              Hover to pause
            </div>
            <div
              className="flex items-stretch animate-marquee-scroll group whitespace-normal hover:[animation-play-state:paused]"
              style={{ animation: 'marquee-scroll 15s linear infinite' }}
            >
              {testimonials.concat(testimonials).map((testimonial, index) => (
                <div
                  key={index}
                  className="relative min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-[0_4px_24px_rgba(10,36,73,0.03)] rounded-[40px] md:rounded-[60px] p-6 sm:p-8 md:p-10 flex flex-col justify-between mx-3 sm:mx-4 md:mx-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(10,36,73,0.06)]"
                  onMouseEnter={() => {
                    const parent = document.querySelector('.animate-marquee-scroll') as HTMLElement;
                    if (parent) parent.style.animationPlayState = 'paused';
                  }}
                  onMouseLeave={() => {
                    const parent = document.querySelector('.animate-marquee-scroll') as HTMLElement;
                    if (parent) parent.style.animationPlayState = 'running';
                  }}
                  onTouchStart={() => {
                    const parent = document.querySelector('.animate-marquee-scroll') as HTMLElement;
                    if (parent) parent.style.animationPlayState = 'paused';
                  }}
                  onTouchEnd={() => {
                    const parent = document.querySelector('.animate-marquee-scroll') as HTMLElement;
                    if (parent) parent.style.animationPlayState = 'running';
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0a2449]/5 flex items-center justify-center mr-3 sm:mr-4">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a2449]/40" /> 
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
                0% { transform: translateX(calc(0% + 0.75rem)); }
                100% { transform: translateX(calc(-50% - 0.75rem)); }
              }
              
              @media (min-width: 640px) {
                @keyframes marquee-scroll {
                  0% { transform: translateX(calc(0% + 1rem)); }
                  100% { transform: translateX(calc(-50% - 1rem)); }
                }
              }
              
              @media (min-width: 768px) {
                @keyframes marquee-scroll {
                  0% { transform: translateX(calc(0% + 1.5rem)); }
                  100% { transform: translateX(calc(-50% - 1.5rem)); }
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0a2449] text-[#efede7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,237,231,0.1),transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Eager to Craft Something Unique?
          </h2>
          <p className="text-xl text-[#efede7]/70 mb-12 max-w-3xl mx-auto">
            Let's explore how we can transform your ideas into a memorable
            experience for your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-[#efede7] text-[#0a2449] hover:bg-[#efede7]/90 px-8 py-6 text-lg rounded-full group"
            >
              Kickstart Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="border-[#efede7] text-[#efede7] hover:bg-[#efede7]/10 px-8 py-6 text-lg rounded-full"
            >
              Grab Our Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
