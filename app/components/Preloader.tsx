"use client";

import Image from "next/image";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a2449]">
      {/* Replace logo.png with any loading animation if desired */}
      <Image
        src="/logo.png"
        alt="Loading..."
        width={220}
        height={80}
        className="h-20 w-auto animate-pulse brightness-200"
        priority
      />
    </div>
  );
};

export default Preloader; 