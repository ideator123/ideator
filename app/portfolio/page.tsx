"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center text-[#0a2449] hover:text-[#0a2449]/70 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0a2449]">Portfolio</h1>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/80 via-[#0a2449]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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