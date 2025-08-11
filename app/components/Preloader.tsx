"use client";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar"   



const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a2449]">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <AnimatedCircularProgressBar
            min={0}
            max={100}
            value={80}
            gaugePrimaryColor="#efede7"
            gaugeSecondaryColor="#0a2449"
            className="w-32 h-32"
          />
          {/* Logo in center */}
          <img
            src="/logo.png"
            alt="Ideator Events Logo"
            className="w-16 h-16 z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ objectFit: "contain" }}
            draggable={false}
            loading="eager"
            fetchPriority="high"
          />
        </div>
        {/* Loading text */}
        <div className="text-[#efede7] text-sm font-medium animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Preloader;