"use client";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a2449]">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Optimized spinning border */}
          <div className="absolute inset-0 w-full h-full border-8 border-gray-300 border-t-blue-400 rounded-full animate-spin" />
          {/* Logo in center with optimized loading */}
          <img
            src="/logo.png"
            alt="Ideator Events Logo"
            className="w-16 h-16 z-10"
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