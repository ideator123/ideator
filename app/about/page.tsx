"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Award, Clock, Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Data constants for re-use and clarity
const HIGHLIGHTS = [
  { icon: Clock, label: "18+ Years", value: "Experience" },
  { icon: Globe, label: "25+ Countries", value: "Global Reach" },
  { icon: Users, label: "2642+ Events", value: "Completed" },
  { icon: Star, label: "98%", value: "Satisfaction" }
];

const ECOSYSTEM = [
  {
    title: "Festival Cinema",
    description: "A pioneering force in Indian film production, creating compelling narratives that captivate audiences worldwide.",
    features: ["Film Production", "Creative Direction", "Storytelling", "Visual Excellence"],
    image: "/festive.jpeg"
  },
  {
    title: "Forwardslash Digital",
    description: "Innovators in digital and social media marketing strategies, driving engagement and brand growth.",
    features: ["Digital Marketing", "Social Media", "Brand Strategy", "Content Creation"],
    image: "/forward.jpeg"
  },
  {
    title: "Liquid 9",
    description: "A leader in media and event production, delivering innovative experiences and creative solutions across 25+ countries.",
    features: ["Media Production", "Event Management", "Creative Direction", "Storytelling"],
    image: "/Liquid-Logo.png"
  }
];

// Memoized highlight card for performance
const HighlightCard = React.memo(
  ({ Icon, label, value, index }: { Icon: React.ElementType; label: string; value: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
    >
      <div className="text-[#0a2449] mb-2 md:mb-3 flex justify-center">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="text-lg md:text-2xl font-bold text-[#0a2449] mb-1">
        {label}
      </div>
      <div className="text-xs md:text-sm text-[#0a2449]/60">
        {value}
      </div>
    </motion.div>
  )
);

const EcosystemCard = React.memo(
  ({
    company,
    index,
    isCentered
  }: {
    company: typeof ECOSYSTEM[number];
    index: number;
    isCentered: boolean;
  }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`relative bg-white/10 border border-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-2xl ${
        isCentered ? "md:col-span-2 md:mx-auto md:w-1/2" : ""
      }`}
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(10,36,73,0.10), 0 1.5px 8px 0 rgba(10,36,73,0.08)"
      }}
    >
      {/* Glassmorphic Card background image */}
      <div
        className="absolute inset-0 z-0 rounded-2xl md:rounded-3xl"
        style={{
          backgroundImage: `url(${company.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          filter: "blur(2px)",
          pointerEvents: "none"
        }}
      />
      {/* Glass overlay for extra glassmorphism */}
      <div className="absolute inset-0 z-0 rounded-2xl md:rounded-3xl bg-white/30 backdrop-blur-xl" />
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-[#0a2449] mb-3 md:mb-4 drop-shadow-sm">
          {company.title}
        </h3>
        <p className="text-[#0a2449]/70 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
          {company.description}
        </p>
        <div className="space-y-2 md:space-y-3">
          {company.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 drop-shadow" />
              <span className="text-[#0a2449]/80 text-sm md:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
);

const AboutPage = () => {
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
              <Badge className="bg-[#0a2449]/10 text-[#0a2449] mb-6 rounded-full px-4 py-2">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-[#0a2449] mb-6 leading-tight">
                About
                <span className="block bg-gradient-to-r from-[#0a2449] to-[#1a3458] bg-clip-text text-transparent">
                  Ideator Events
                </span>
              </h1>
              <p className="text-xl text-[#0a2449]/70 max-w-3xl mx-auto mb-8">
                Designing Remarkable Events Across the Globe for over 18 years with passion, creativity, and unwavering commitment to excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Content - Text */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                    <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-[#0a2449] to-[#1a3458]"></div>
                    <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                      About Us
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2449] leading-tight">
                    Who We Are
                  </h2>
                  <p className="text-lg md:text-xl text-[#0a2449]/60 font-medium">
                    Our Story of Excellence
                  </p>
                </div>
                <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[#0a2449]/70 leading-relaxed">
                  <p>
                    Ideator Events emerged from an audacious vision: revolutionizing the
                    corporate events landscape across Asia and the Middle East. Originating
                    in Kochi, we have evolved over 18 transformative years into a global
                    powerhouse with strategic offices and production facilities in India,
                    Dubai, Bangkok, and Indonesia.
                  </p>
                  <p>
                    Our philosophy at Ideator is simple yet profound: every event is a
                    narrative waiting to unfold. Whether orchestrating intimate executive
                    retreats, grand international conferences, or spectacular concerts, we
                    meticulously craft experiences that blend creativity, precision, and
                    unbridled passion.
                  </p>
                  <p>
                    Under the strategic leadership of our Managing Director, Mr. Mathews
                    Joseph — a distinguished hotelier — we seamlessly integrate hospitality,
                    entertainment, and flawless execution into every project we undertake.
                  </p>
                </div>
              </motion.div>

              {/* Right Content - Image */}
              <motion.div
                className="flex justify-center order-first lg:order-last"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full max-w-md lg:max-w-none">
                  <div className="bg-gradient-to-br from-[#0a2449]/10 to-[#0a2449]/5 rounded-2xl md:rounded-3xl p-3 md:p-4">
                    <Image
                      src="/about-image.jpeg"
                      alt="About Ideator Events"
                      width={500}
                      height={600}
                      className="rounded-xl md:rounded-2xl shadow-2xl object-cover w-full h-auto"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white/90 backdrop-blur-xl border border-white/60 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="bg-[#0a2449]/10 rounded-full p-1.5 md:p-2">
                        <Award className="w-4 h-4 md:w-6 md:h-6 text-[#0a2449]" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-semibold text-[#0a2449]">Award Winning</div>
                        <div className="text-xs text-[#0a2449]/60">Event Excellence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Key Highlights - Common Bottom Area */}
            <div className="mt-10 md:mt-14">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 pt-4 md:pt-6">
                {HIGHLIGHTS.map((stat, index) => (
                  <HighlightCard
                    key={stat.label}
                    Icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Ecosystem */}
        <section className="py-12 md:py-20 bg-white/50">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a2449] mb-4">
                Our Creative Ecosystem
              </h2>
              <p className="text-lg md:text-xl text-[#0a2449]/70 max-w-2xl mx-auto px-4">
                We are more than an events company; we are a dynamic creative ecosystem comprising three interconnected enterprises.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {ECOSYSTEM.map((company, index) => (
                <EcosystemCard
                  key={company.title}
                  company={company}
                  index={index}
                  isCentered={ECOSYSTEM.length % 2 === 1 && index === ECOSYSTEM.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-[#0a2449] to-[#1a3458] rounded-2xl md:rounded-3xl p-8 md:p-12 text-[#efede7]">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl leading-relaxed mb-6 md:mb-8 opacity-90 px-2">
                  To inspire, connect, and create extraordinary experiences that resonate across industries and platforms, transforming abstract ideas into unforgettable moments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services">
                    <Button size="lg" className="bg-[#efede7] text-[#0a2449] hover:bg-[#efede7]/90 rounded-full group px-6 md:px-8 text-sm md:text-base">
                      Our Services
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-[#efede7] text-[#efede7] hover:bg-[#efede7] hover:text-[#0a2449] rounded-full px-6 md:px-8 text-sm md:text-base">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;