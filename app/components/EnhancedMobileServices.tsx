"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { SERVICES } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, PlayCircle, PauseCircle } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";

interface ServiceCardProps {
  service: any;
  index: number;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isActive, onToggle }) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isTouchDevice } = useMobile();
  
  // Intersection observer for performance
  const { ref: cardRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Motion values for drag interactions
  const x = useMotionValue(0);
  const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);
  const rotate = useTransform(x, [-100, 0, 100], [-2, 0, 2]);

  // Gesture handling for swipe interactions using Framer Motion
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Swipe threshold
    if (Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        // Swiped right - expand/toggle
        onToggle(service.id);
      } else {
        // Swiped left - collapse if open
        if (isActive) onToggle(service.id);
      }
    }
    
    // Reset position
    x.set(0);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(info.offset.x);
  };

  // Video play/pause handling
  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  }, [videoPlaying]);

  // Spring animation for content expansion
  const contentSpring = useSpring({
    height: isActive ? 'auto' : 0,
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 250, friction: 32 }
  });

  const isVideo = service.image.endsWith('.mp4');

  return (
    <motion.div
      ref={cardRef}
      style={{ x, scale, rotate }}
      drag={isTouchDevice ? "x" : false}
      dragConstraints={{ left: -150, right: 150 }}
      dragElastic={0.3}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-white/20"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header - Always Visible */}
      <motion.div 
        className="p-6 cursor-pointer select-none"
        onClick={() => onToggle(service.id)}
        whileTap={{ backgroundColor: "rgba(10, 36, 73, 0.05)" }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <motion.h3 
              className="text-lg font-bold text-[#0a2449] mb-2 uppercase tracking-wide leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {service.title}
            </motion.h3>
            <motion.p 
              className="text-[#0a2449]/70 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {service.description}
            </motion.p>
          </div>
          
          <motion.div 
            className="flex-shrink-0 flex flex-col items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ChevronDown className="w-6 h-6 text-[#0a2449]/60" />
            </motion.div>
            
            {isTouchDevice && (
              <div className="w-8 h-1 bg-[#0a2449]/20 rounded-full">
                <motion.div 
                  className="h-full bg-[#0a2449]/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '100%' : '30%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isActive && (
          <animated.div 
            style={contentSpring}
            className="border-t border-[#0a2449]/10 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Media Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#0a2449]/5 to-[#0a2449]/10">
                {isVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      src={service.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onLoadedData={() => setVideoPlaying(true)}
                    />
                    
                    {/* Video Controls */}
                    <motion.button
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white"
                      onClick={toggleVideo}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {videoPlaying ? (
                        <PauseCircle className="w-5 h-5" />
                      ) : (
                        <PlayCircle className="w-5 h-5" />
                      )}
                    </motion.button>
                  </>
                ) : (
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Service number indicator */}
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-[#0a2449] font-bold text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {index + 1}
                </motion.div>
              </div>
              
              {/* Action buttons */}
              <div className="p-4 bg-gradient-to-r from-[#0a2449]/5 to-transparent">
                <motion.div 
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className="flex-1 bg-[#0a2449] text-white px-4 py-2 rounded-xl text-sm font-medium"
                    whileHover={{ backgroundColor: "#0a2449", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border border-[#0a2449]/20 rounded-xl text-[#0a2449] text-sm font-medium"
                    whileHover={{ borderColor: "#0a2449", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Portfolio
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </animated.div>
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
    threshold: 0.1,
    triggerOnce: true
  });

  const toggleService = useCallback((serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-[#efede7] via-[#efede7]/95 to-[#efede7]/90 lg:hidden relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(10,36,73,0.05),transparent),radial-gradient(circle_at_80%_20%,rgba(10,36,73,0.05),transparent)]" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={sectionInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-4 rounded-full px-6 py-2 backdrop-blur-sm">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Our Services
              </motion.span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#0a2449] mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            What We Create
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[#0a2449]/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isTouchDevice 
              ? "Tap to explore our comprehensive event management services, or swipe for quick interactions."
              : "Comprehensive event management services tailored to create unforgettable experiences across the globe."
            }
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
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

        {/* Interactive hint */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-[#0a2449]/60 text-sm">
            <motion.div 
              className="w-8 h-[1px] bg-[#0a2449]/30"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {isTouchDevice ? "Tap to explore • Swipe for quick actions" : "Tap to explore each service"}
            </motion.span>
            <motion.div 
              className="w-8 h-[1px] bg-[#0a2449]/30"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedMobileServices; 