import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe } from '@/components/magicui/globe';
import ReactCountryFlag from 'react-country-flag';

const STATS = [
  { label: 'Years Experience', value: 18, suffix: '+' },
  { label: 'Countries Served', value: 25, suffix: '+' },
  { label: 'Events Completed', value: 2642, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' }
];

const LOCATIONS = [
  { city: "Kochi", country: "India", code: "IN" },
  { city: "Dubai", country: "UAE", code: "AE" },
  { city: "Bangkok", country: "Thailand", code: "TH" },
  { city: "Bali", country: "Indonesia", code: "ID" }
];

export default function AboutSectionRevamp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-[#f7f6f2] via-[#f5f3ec] to-[#e8e5de] py-16 md:py-24 overflow-hidden"
    >
      {/* Animated Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#0a2449]/10 rounded-full blur-3xl z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#0a2449]/20 rounded-full blur-3xl z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          {/* Left: Globe & Locations */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="rounded-[2.5rem] shadow-2xl bg-gradient-to-br from-white/60 to-[#e8e5de]/60 border border-[#0a2449]/10 p-6 pb-0">
                <div className="flex items-center justify-center h-[400px]">
                  <Globe className="w-full h-full" />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/90 border border-[#0a2449]/10 px-4 py-1.5 md:px-5 md:py-2 rounded-full shadow-lg flex items-center gap-2 text-[#0a2449] text-xs md:text-sm font-semibold backdrop-blur-sm whitespace-nowrap">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Global Presence
              </div>
            </div>
            {/* Locations */}
            <div className="w-full flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2 md:mt-4 max-w-xs">
                {LOCATIONS.map((loc) => (
                  <span
                    key={loc.city}
                    className="flex items-center gap-1 bg-[#0a2449]/10 text-[#0a2449] px-2.5 py-1 rounded-full text-xs md:text-sm font-medium"
                  >
                    <ReactCountryFlag countryCode={loc.code} svg />
                    {loc.city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: About Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-[#0a2449]/10 text-[#0a2449] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-[#0a2449] rounded-full"></div>
                About Us
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0a2449] mb-4 leading-tight">
                <span className="block">
                  Crafting{" "}
                  <span className="bg-gradient-to-r from-[#0a2449] to-[#1a3458] bg-clip-text text-transparent">
                    Unforgettable Events
                  </span>
                </span>
                <span className="block text-xl md:text-3xl font-light text-[#0a2449]/70 mt-2">
                  Across the Globe
                </span>
              </h2>
              <p className="text-base md:text-xl text-[#0a2449]/80 font-medium mb-3">
                Since 2007, Ideator Events has been a trailblazer in the world of corporate and creative events, delivering excellence in over 25 countries.
              </p>
              <p className="text-sm md:text-lg text-[#0a2449]/70 mb-2">
                From our roots in Kochi to our vibrant hubs in Dubai, Bangkok, and Jakarta, we orchestrate everything from intimate boardroom sessions to spectacular international summits.
              </p>
              <p className="text-sm md:text-lg text-[#0a2449]/70 mb-2">
                Our team blends local expertise with global standards, ensuring every event is a seamless, memorable experience—no matter where your vision takes you.
              </p>
              <p className="text-sm md:text-lg text-[#0a2449]/70">
                As a registered Destination Management Company, we deliver creative impact and measurable ROI for every client, every time.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6 mb-8">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/90 border border-[#0a2449]/10 rounded-xl p-3 md:p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="text-lg md:text-2xl font-bold text-[#0a2449] mb-1">{stat.value}{stat.suffix}</div>
                  <div className="text-xs md:text-sm text-[#0a2449]/70 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
              <a
                href="#contact"
                className="group bg-[#0a2449] text-[#efede7] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#0a2449]/90 w-full sm:w-auto"
              >
                Start Your Project
              </a>
              <a
                href="#portfolio"
                className="group border-2 border-[#0a2449]/20 text-[#0a2449] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-center hover:border-[#0a2449] hover:bg-[#0a2449]/5 transition-all duration-300 w-full sm:w-auto"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
