"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FullPageSkeleton,
  HeroSkeleton,
  AboutSectionSkeleton,
  PortfolioCardSkeleton,
  TestimonialCardSkeleton,
  ServiceCardSkeleton,
  SectionHeaderSkeleton,
  GridSkeleton,
  MarqueeSkeleton,
  CTASectionSkeleton,
} from "../components/Skeleton";

export default function SkeletonDemo() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentDemo, setCurrentDemo] = useState<"full" | "hero" | "about" | "portfolio" | "testimonials" | "services" | "cta">("full");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const resetDemo = () => {
    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);
  };

  const renderDemo = () => {
    if (showSkeleton) {
      switch (currentDemo) {
        case "full":
          return <FullPageSkeleton />;
        case "hero":
          return <HeroSkeleton />;
        case "about":
          return <AboutSectionSkeleton />;
        case "portfolio":
          return (
            <section className="py-20 bg-[#efede7]">
              <div className="container mx-auto px-4 max-w-6xl">
                <SectionHeaderSkeleton />
                <GridSkeleton columns={3} items={3} />
              </div>
            </section>
          );
        case "testimonials":
          return (
            <section className="py-20 bg-[#efede7]">
              <div className="container mx-auto px-4 max-w-6xl">
                <SectionHeaderSkeleton />
                <MarqueeSkeleton items={6} />
              </div>
            </section>
          );
        case "services":
          return (
            <section className="py-20 bg-[#efede7]">
              <div className="container mx-auto px-4 max-w-6xl">
                <SectionHeaderSkeleton />
                <GridSkeleton columns={3} items={3} cardComponent={ServiceCardSkeleton} />
              </div>
            </section>
          );
        case "cta":
          return <CTASectionSkeleton />;
        default:
          return <FullPageSkeleton />;
      }
    }

    // Show actual content when skeleton is hidden
    return (
      <div className="min-h-screen bg-[#efede7] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0a2449] mb-8">
            Skeleton Loading Demo
          </h1>
          <p className="text-lg text-[#0a2449]/70 mb-8">
            This page demonstrates the skeleton loading components. The skeleton will show for 3 seconds, then display this content.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => setCurrentDemo("full")}
              className={currentDemo === "full" ? "bg-[#0a2449]" : ""}
            >
              Full Page
            </Button>
            <Button
              onClick={() => setCurrentDemo("hero")}
              className={currentDemo === "hero" ? "bg-[#0a2449]" : ""}
            >
              Hero
            </Button>
            <Button
              onClick={() => setCurrentDemo("about")}
              className={currentDemo === "about" ? "bg-[#0a2449]" : ""}
            >
              About
            </Button>
            <Button
              onClick={() => setCurrentDemo("portfolio")}
              className={currentDemo === "portfolio" ? "bg-[#0a2449]" : ""}
            >
              Portfolio
            </Button>
            <Button
              onClick={() => setCurrentDemo("testimonials")}
              className={currentDemo === "testimonials" ? "bg-[#0a2449]" : ""}
            >
              Testimonials
            </Button>
            <Button
              onClick={() => setCurrentDemo("services")}
              className={currentDemo === "services" ? "bg-[#0a2449]" : ""}
            >
              Services
            </Button>
            <Button
              onClick={() => setCurrentDemo("cta")}
              className={currentDemo === "cta" ? "bg-[#0a2449]" : ""}
            >
              CTA
            </Button>
          </div>
          <Button onClick={resetDemo} className="bg-[#0a2449] text-white">
            Reset Demo
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderDemo()}
    </div>
  );
} 