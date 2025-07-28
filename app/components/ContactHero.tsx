// components/contact/ContactHero.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
    },
  },
};

export default function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20"
    >
      {/* Floating decorative elements - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#0a2449]/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-[#0a2449]/5 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-12 h-12 sm:w-16 sm:h-16 bg-[#0a2449]/15 rounded-full blur-lg"
          animate={{
            y: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center space-y-6 sm:space-y-8"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md text-[#0a2449] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#0a2449]/20 shadow-lg"
            variants={textVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(10, 36, 73, 0.2)" 
            }}
          >
            <motion.span 
              className="w-2 h-2 bg-[#0a2449] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Get In Touch
          </motion.div>

          {/* Hero title */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#0a2449] leading-none"
              variants={textVariants}
            >
              <motion.span 
                className="block"
                variants={textVariants}
              >
                Let's Create
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-[#0a2449] to-[#0a2449]/70 bg-clip-text text-transparent"
                variants={textVariants}
              >
                Something
              </motion.span>
              
              <motion.span 
                className="block text-[#0a2449]/80"
                variants={textVariants}
              >
                Amazing
              </motion.span>
            </motion.h1>
          </div>

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-[#0a2449]/70 max-w-3xl mx-auto leading-relaxed px-4"
            variants={textVariants}
          >
            Ready to bring your vision to life? Our global team is here to craft an unforgettable experience tailored to your needs.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div 
            className="flex justify-center mt-12 sm:mt-16"
            variants={textVariants}
          >
            <div className="flex flex-col items-center gap-2 text-[#0a2449]/60">
              <span className="text-xs sm:text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-[#0a2449]/30 rounded-full flex justify-center">
                <motion.div 
                  className="w-1 h-3 bg-[#0a2449]/60 rounded-full mt-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
