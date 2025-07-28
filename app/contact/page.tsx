'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import ContactSidebar from '../components/ContactSidebar';
import ContactHero from '../components/ContactHero';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ContactUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <>
      <Header />

      {/* Animated Background - Simplified for better mobile performance */}
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
        <ContactHero />

        {/* Main Content */}
        <section 
          ref={sectionRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 pt-8 sm:pt-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <ContactForm />
            </div>

            <div className="lg:col-span-4 order-1 lg:order-2">
              <ContactSidebar />
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}
