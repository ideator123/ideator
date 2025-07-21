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

          {/* Corporate Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={() => item.videourl && setVideoModalUrl(item.videourl)}
              >
                <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/80 via-[#0a2449]/40 to-transparent">
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex justify-between items-end w-full">
                        <div>
                          <Badge className="bg-white/20 text-white mb-4 border-0">
                            {item.category}
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                          <p className="text-white/80 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </p>
                        </div>
                        {item.videourl && (
                          <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage; 