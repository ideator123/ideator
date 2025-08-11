"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SERVICES } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, PlayCircle, PauseCircle, ArrowRight, Eye } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";

interface ServiceCardProps {
  service: any;
  index: number;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isActive, onToggle }) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isTouchDevice } = useMobile();
  
  // Intersection observer for performance
  const { ref: cardRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });



  // Video controls
  const toggleVideo = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  }, [videoPlaying]);

  const isVideo = service.image.endsWith('.mp4');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      whileTap={{ scale: 0.99 }}
    >
      {/* Compact Header */}
      <motion.div 
        className="p-4 cursor-pointer"
        onClick={() => onToggle(service.id)}
        whileTap={{ backgroundColor: "rgba(10, 36, 73, 0.02)" }}
      >
        <div className="flex items-center justify-between">
          {/* Service Number Badge */}
          <motion.div 
            className="flex-shrink-0 w-8 h-8 bg-[#0a2449] rounded-full flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#0a2449] mb-1 uppercase tracking-wide leading-tight truncate">
              {service.title}
            </h3>
            <p className="text-xs text-[#0a2449]/60 leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>
          
          {/* Expand Indicator */}
          <motion.div 
            className="flex-shrink-0 ml-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ChevronRight className="w-4 h-4 text-[#0a2449]/40" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Touch indicator for mobile */}
        {isTouchDevice && (
          <motion.div 
            className="mt-3 h-0.5 bg-gray-100 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="h-full bg-[#0a2449]/30 rounded-full"
              initial={{ width: "20%" }}
              animate={{ width: isActive ? "100%" : "20%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden border-t border-gray-100"
          >
            {/* Media Section */}
            <div className="relative">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100">
                {isVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      src={service.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      onLoadedData={() => setVideoPlaying(true)}
                      onLoadStart={() => setImageLoaded(false)}
                      onCanPlay={() => setImageLoaded(true)}
                    />
                    
                    {/* Video Controls */}
                    <motion.button
                      className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white"
                      onClick={toggleVideo}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
                    >
                      {videoPlaying ? (
                        <PauseCircle className="w-4 h-4" />
                      ) : (
                        <PlayCircle className="w-4 h-4" />
                      )}
                    </motion.button>
                  </>
                ) : (
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                
                {/* Loading state */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#0a2449]/20 border-t-[#0a2449] rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Action Bar */}
              <div className="p-4 bg-gray-50/50">
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 bg-[#0a2449] text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    whileHover={{ backgroundColor: "#083a5c" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                  <motion.button
                    className="px-4 py-2.5 border border-[#0a2449]/20 rounded-xl text-[#0a2449] text-sm font-medium flex items-center gap-2 hover:border-[#0a2449]/40 hover:bg-[#0a2449]/5"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Portfolio
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      

    </motion.div>
  );
};

const EnhancedMobileServices: React.FC = () => {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTouchDevice, orientation } = useMobile();
  
  // Section intersection observer
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  const toggleService = useCallback((serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [serviceId] // Only allow one expanded at a time for better mobile UX
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-12 bg-gradient-to-br from-[#efede7] via-[#efede7]/98 to-[#efede7]/95 lg:hidden relative overflow-hidden min-h-screen"
    >
      {/* Simplified background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-4 w-32 h-32 bg-[#0a2449]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-4 w-40 h-40 bg-[#0a2449]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-lg sm:max-w-2xl relative z-10" ref={containerRef}>
        {/* Compact Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={sectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
          >
            <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-3 rounded-full px-4 py-1.5 text-xs font-medium">
              Our Services
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-[#0a2449] mb-3 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            What We Create
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base text-[#0a2449]/70 max-w-sm sm:max-w-lg mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 15 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Comprehensive event management services tailored for unforgettable experiences.
          </motion.p>
        </motion.div>

        {/* Mobile-Optimized Services List */}
        <motion.div 
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={expandedServices.includes(service.id)}
              onToggle={toggleService}
            />
          ))}
        </motion.div>

        {/* Mobile-friendly footer */}
        <motion.div 
          className="text-center mt-8 sm:mt-12 pb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 text-[#0a2449]/50 text-xs sm:text-sm">
            <motion.div 
              className="w-6 h-px bg-[#0a2449]/20"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-medium"
            >
              {expandedServices.length > 0 
                ? "Tap to close • Explore other services" 
                : "Tap to explore each service"
              }
            </motion.span>
            <motion.div 
              className="w-6 h-px bg-[#0a2449]/20"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
          </div>
          
          {/* Service counter */}
          <motion.div 
            className="mt-4 text-xs text-[#0a2449]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {SERVICES.length} Services Available
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedMobileServices; 