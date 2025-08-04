"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#0a2449]/10",
        className
      )}
    />
  );
};

// Hero Section Skeleton
export const HeroSkeleton = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16 bg-[#0a2449] mt-10">
      <div className="absolute inset-0 w-full h-full z-0">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="relative z-20 flex flex-col items-start md:items-center justify-center w-full h-full px-4">
        <Skeleton className="h-12 md:h-20 w-3/4 md:w-2/3 mb-6" />
        <Skeleton className="h-6 md:h-8 w-full md:w-2/3 mb-8" />
        <Skeleton className="h-12 md:h-16 w-48 md:w-64 rounded-full" />
      </div>
    </section>
  );
};

// Portfolio Card Skeleton
export const PortfolioCardSkeleton = () => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl">
        <Skeleton className="w-full h-[400px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2449]/80 via-[#0a2449]/40 to-transparent">
          <div className="absolute bottom-8 left-8">
            <Skeleton className="h-6 w-20 mb-4 rounded-full" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Skeleton
export const TestimonialCardSkeleton = () => {
  return (
    <div className="relative min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-[0_4px_24px_rgba(10,36,73,0.03)] rounded-[40px] md:rounded-[60px] p-6 sm:p-8 md:p-10 flex flex-col justify-between mx-3 sm:mx-4 md:mx-6">
      <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 sm:w-5 sm:h-5 rounded" />
        ))}
      </div>
      <div className="space-y-2 mb-6 sm:mb-8 md:mb-10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center pt-4 sm:pt-6 md:pt-8 border-t border-[#0a2449]/5">
        <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

// Service Card Skeleton
export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(10,36,73,0.03)] hover:shadow-[0_8px_40px_rgba(10,36,73,0.06)] transition-all duration-300">
      <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-12 w-32 rounded-full" />
    </div>
  );
};

// About Section Skeleton
export const AboutSectionSkeleton = () => {
  return (
    <section className="py-20 bg-[#efede7]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-32 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-12 w-40 rounded-full mt-6" />
          </div>
          <div className="relative">
            <Skeleton className="w-full h-80 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Header Skeleton
export const SectionHeaderSkeleton = () => {
  return (
    <div className="text-center mb-12">
      <Skeleton className="h-8 w-32 mx-auto mb-4 rounded-full" />
      <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
  );
};

// Grid Skeleton
export const GridSkeleton = ({ 
  columns = 3, 
  items = 6,
  cardComponent: CardComponent = PortfolioCardSkeleton 
}: {
  columns?: number;
  items?: number;
  cardComponent?: React.ComponentType;
}) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-${columns} gap-8`}>
      {[...Array(items)].map((_, index) => (
        <CardComponent key={index} />
      ))}
    </div>
  );
};

// Marquee Skeleton
export const MarqueeSkeleton = ({ items = 6 }: { items?: number }) => {
  return (
    <div className="relative overflow-hidden py-4 md:py-8">
      <div className="flex items-stretch animate-marquee-scroll group whitespace-normal">
        {[...Array(items)].map((_, index) => (
          <TestimonialCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

// CTA Section Skeleton
export const CTASectionSkeleton = () => {
  return (
    <section className="py-20 bg-[#efede7] text-[#0a2449] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
        <Skeleton className="h-16 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-8 w-2/3 mx-auto mb-12" />
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Skeleton className="h-16 w-48 rounded-full" />
          <Skeleton className="h-16 w-48 rounded-full" />
        </div>
      </div>
    </section>
  );
};

// Full Page Skeleton
export const FullPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#efede7]">
      {/* Header placeholder */}
      <div className="h-20 bg-white shadow-sm" />
      
      {/* Hero Section */}
      <HeroSkeleton />
      
      {/* About Section */}
      <AboutSectionSkeleton />
      
      {/* Services Section */}
      <section className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeaderSkeleton />
          <GridSkeleton columns={3} items={3} cardComponent={ServiceCardSkeleton} />
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeaderSkeleton />
          <GridSkeleton columns={3} items={3} />
          <div className="text-center mt-16">
            <Skeleton className="h-16 w-48 mx-auto rounded-full" />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeaderSkeleton />
          <MarqueeSkeleton items={6} />
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASectionSkeleton />
      
      {/* Footer placeholder */}
      <div className="h-64 bg-[#0a2449]" />
    </div>
  );
};

export default Skeleton; 