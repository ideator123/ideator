"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#efede7]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] pt-24 bg-[#0a2449] text-[#efede7]">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Ideator Events</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-80">
            Designing Remarkable Events Across the Globe for over 18 years.
          </p>
        </div>
      </section>

      {/* About Content (adapted from the home page) */}
      <section className="py-20 bg-[#efede7] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="px-4 md:px-0">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-[#0a2449]"></div>
                <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-4 py-2">
                  About Us
                </Badge>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-[#0a2449] mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-[#0a2449]/60 mb-8">
                Our Story of Excellence
              </p>

              <div className="space-y-6 text-lg text-[#0a2449]/70 leading-relaxed text-justify">
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

                <p>
                  We are more than an events company; we are a dynamic creative ecosystem
                  comprising three interconnected enterprises:
                </p>

                <ul className="list-disc pl-6">
                  <li>Festival Cinema: A pioneering force in Indian film production</li>
                  <li>Forwardslash Digital: Innovators in digital and social media marketing strategies</li>
                </ul>

                <p>
                  Our collective mission transcends individual boundaries: to inspire,
                  connect, and create extraordinary experiences that resonate across
                  industries and platforms.
                </p>

                <p>
                  With comprehensive in-house design studios and production units, we
                  guarantee meticulous execution without external dependencies. Our
                  pristine zero-complaint record stands as a testament to our unwavering
                  commitment to quality and client satisfaction.
                </p>

                <p>
                  At Ideator Events, we understand that a truly exceptional event is
                  defined by the guest experience. Leveraging over 18 years of expertise
                  and a passionate, dedicated team, we transform abstract ideas into
                  unforgettable moments — allowing you to immerse yourself fully in the
                  celebration.
                </p>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="flex justify-center px-4 md:px-0">
              <Image
                src="/about.jpg"
                alt="About Ideator Events"
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage; 