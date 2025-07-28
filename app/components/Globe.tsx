"use client";

import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";

// Our offices data (from ContactSidebar)
const offices = [
  {
    city: 'Kochi',
    country: 'India',
    code: 'IN',
    lat: 9.9312,
    lng: 76.2673,
    featured: true,
  },
  {
    city: 'Dubai',
    country: 'UAE',
    code: 'AE',
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    city: 'Bangkok',
    country: 'Thailand',
    code: 'TH',
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    code: 'ID',
    lat: -8.3405,
    lng: 115.0920,
  },
];

// Helper: Convert lat/lng to x/y on a 2D circle (simple equirectangular projection)
function latLngToXY(lat: number, lng: number, size: number) {
  // Center of the globe
  const r = size / 2 * 0.92; // 92% of radius for padding
  // Convert degrees to radians
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  // Spherical to Cartesian (simple, not 3D)
  const x = r * Math.cos(latRad) * Math.sin(lngRad) + size / 2;
  const y = r * Math.sin(latRad) * -1 + size / 2;
  return { x, y };
}

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

        {/* Office Markers */}
        {offices.map((office, idx) => {
          const { x, y } = latLngToXY(office.lat, office.lng, size);
          return (
            <motion.div
              key={office.city}
              className={`absolute flex flex-col items-center group`}
              style={{
                left: x,
                top: y,
                zIndex: 10,
                pointerEvents: "auto",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-lg
                  ${office.featured ? "bg-[#0a2449] border-[#0a2449]" : "bg-white border-[#0a2449]/60"}
                  group-hover:scale-110 transition-transform duration-200`}
                title={`${office.city}, ${office.country}`}
              >
                <ReactCountryFlag
                  countryCode={office.code}
                  svg
                  style={{
                    width: "1.1em",
                    height: "1.1em",
                    borderRadius: "50%",
                  }}
                  aria-label={office.country}
                />
              </div>
              {/* Tooltip */}
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20">
                <div className="px-2 py-1 rounded bg-[#0a2449] text-white text-xs shadow-lg whitespace-nowrap">
                  {office.city}, {office.country}
                </div>
              </div>
            </motion.div>
          );
        })}
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