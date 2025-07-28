"use client";

import { motion } from "framer-motion";

interface GlobeProps {
  className?: string;
  size?: number;
  speed?: number;
}

export default function Globe({ className = "", size = 400, speed = 1 }: GlobeProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      style={{ width: size, height: size }}
    >
      {/* Main Globe Circle */}
      <div className="relative w-full h-full">
        {/* Base Globe */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0a2449]/10 to-[#0a2449]/5 border-2 border-[#0a2449]/30" />
        
        {/* Latitude Lines */}
        <div className="absolute inset-0 rounded-full border border-[#0a2449]/20" style={{ margin: '20%' }} />
        <div className="absolute inset-0 rounded-full border border-[#0a2449]/20" style={{ margin: '40%' }} />
        <div className="absolute inset-0 rounded-full border border-[#0a2449]/20" style={{ margin: '60%' }} />
        <div className="absolute inset-0 rounded-full border border-[#0a2449]/20" style={{ margin: '80%' }} />
        
        {/* Longitude Lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20 / speed, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 h-full bg-[#0a2449]/20 origin-bottom"
              style={{
                transform: `translate(-50%, -50%) rotate(${(i * 45)}deg)`,
              }}
            />
          ))}
        </motion.div>
        
        {/* Rotating Dots */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 15 / speed, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#0a2449]/60 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${(i * 30)}deg) translateY(-35%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
        
        {/* Center Point */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#0a2449]/80 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Floating Particles */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 25 / speed, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#0a2449]/30 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${(i * 45)}deg) translateY(-45%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Connection Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-[#0a2449]/40 to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${(i * 90)}deg) translateY(-50%)`,
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
} 