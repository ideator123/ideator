"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Play } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Portfolio data is now fetched from Supabase
import { supabase } from "@/lib/supabaseClient";

const PortfolioPage = () => {
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  // Fetch portfolio items on mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("id, title, location, image, videourl, category")
        .order("id", { ascending: false });

      if (error) {
        console.error("Failed to fetch portfolio items:", error.message);
      } else if (data) {
        setPortfolioItems(data);
      }
    };

    fetchPortfolio();
  }, []);

  // Color schemes for Rubik's cube effect
  const colorSchemes = [
    { bg: "from-orange-400 to-pink-500", text: "text-white" },
    { bg: "from-slate-700 to-slate-900", text: "text-white" },
    { bg: "from-red-500 to-red-600", text: "text-white" },
    { bg: "from-blue-600 to-blue-800", text: "text-white" },
    { bg: "from-cyan-400 to-blue-500", text: "text-white" },
    { bg: "from-indigo-600 to-purple-700", text: "text-white" },
  ];

  return (
    <div className="min-h-screen bg-[#efede7]">
      <Header />

      <section className="pt-28 pb-16 bg-[#efede7]">
        <div className="container mx-auto px-0 max-w-full">
          <div className="flex items-center justify-between mb-12 px-8">
            <Link href="/" className="flex items-center text-[#0a2449] hover:text-[#0a2449]/70 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0a2449]">Portfolio</h1>
          </div>

          {/* Rubik's Cube Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {portfolioItems.map((item, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <div
                  key={index}
                  className="group cursor-pointer relative h-[400px] md:h-[500px]"
                  onClick={() => item.videourl && setVideoModalUrl(item.videourl)}
                >
                  <div className={`relative w-full h-full bg-gradient-to-br ${colorScheme.bg} overflow-hidden`}>
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                      {/* Project Number */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className={`text-6xl md:text-8xl font-bold ${colorScheme.text} opacity-20`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                        {item.videourl && (
                          <div className={`${colorScheme.text} opacity-70 group-hover:opacity-100 transition-opacity`}>
                            <Play className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="space-y-4">
                        <div>
                          <h2 className={`text-4xl md:text-5xl font-bold ${colorScheme.text} mb-2`}>
                            Project
                          </h2>
                          <div className={`text-6xl md:text-8xl font-bold ${colorScheme.text}`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className={`text-xl md:text-2xl font-bold ${colorScheme.text}`}>
                            {item.title}
                          </h3>
                          <p className={`${colorScheme.text} opacity-80 flex items-center text-sm md:text-base`}>
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </p>
                          <Badge className={`bg-white/20 ${colorScheme.text} border-0`}>
                            {item.category}
                          </Badge>
                        </div>

                        <button className={`${colorScheme.text} opacity-70 hover:opacity-100 transition-opacity text-sm font-medium flex items-center`}>
                          VIEW <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </button>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Modal */}
        {videoModalUrl && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setVideoModalUrl(null)}>
            <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`${videoModalUrl}?autoplay=1`}
                title="Portfolio video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full shadow-2xl"
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
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage; 