"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, MapPin, Play, Calendar, Users, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const PortfolioPage = () => {
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

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
    <>
      <Header />
      
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#0a2449]/5 via-transparent to-transparent"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-[#0a2449]/10 via-transparent to-[#0a2449]/5"
          animate={{ 
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-[#efede7] via-[#f5f3ec] to-[#e8e5de] relative z-10">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
               
              </div>
              
              <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-6 rounded-full px-4 py-2">
                Our Work
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#0a2449] mb-6 leading-tight">
                Showcasing
                <span className="block bg-gradient-to-r from-[#0a2449] to-[#1a3458] bg-clip-text text-transparent">
                  Our Portfolio
                </span>
              </h1>
              <p className="text-xl text-[#0a2449]/70 max-w-3xl mx-auto mb-8">
                Discover our diverse collection of successful events, from intimate gatherings to grand celebrations that have left lasting impressions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => item.videourl && setVideoModalUrl(item.videourl)}
                >
                  <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2449]/5 via-transparent to-[#0a2449]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-[300px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/90 via-[#0a2449]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="flex justify-between items-end w-full">
                            <div className="flex-1">
                              <Badge className="bg-white/20 text-white mb-3 border-0 backdrop-blur-sm">
                                {item.category}
                              </Badge>
                              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                              <p className="text-white/80 flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-2" />
                                {item.location}
                              </p>
                            </div>
                            {item.videourl && (
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#0a2449]/10 text-[#0a2449] border-0">
                          {item.category}
                        </Badge>
                        {item.videourl && (
                          <div className="text-[#0a2449]/60 group-hover:text-[#0a2449] transition-colors">
                            <Play className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#0a2449] mb-3 group-hover:text-[#1a3458] transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-[#0a2449]/70 text-sm mb-4 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#0a2449]/50" />
                        {item.location}
                      </p>

                      <div className="flex items-center justify-between text-sm text-[#0a2449]/60">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Event</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>Guests</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>Featured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0a2449]">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#efede7] mb-6">
                Ready to Create Your Next Event?
              </h2>
              <p className="text-xl text-[#efede7]/80 mb-8 max-w-2xl mx-auto">
                Let's turn your vision into reality with our expert event planning services.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-[#efede7] text-[#0a2449] hover:bg-[#efede7]/90 rounded-full group px-8">
                  Start Planning
                  <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        {videoModalUrl && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setVideoModalUrl(null)}>
            <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`${videoModalUrl}?autoplay=1`}
                title="Portfolio video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded-2xl shadow-2xl"
              />
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

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage; 