"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    console.log('Globe component mounting, canvas ref:', canvasRef.current);
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        console.log('Canvas width updated:', width);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) {
      console.warn('Canvas ref is null, cannot create globe');
      return;
    }

    // Ensure canvas has proper dimensions
    if (width === 0) {
      console.warn('Canvas width is 0, waiting for resize');
      setTimeout(onResize, 100);
      return;
    }

    try {
      console.log('Creating globe with width:', width * 2);
      console.log('Canvas element:', canvasRef.current);
      
      // Check if WebGL is available
      const canvas = canvasRef.current;
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      
      console.log('WebGL context available:', gl);
      console.log('Canvas context:', canvas.getContext('2d'));
      
      const globe = createGlobe(canvas, {
        ...config,
        width: width * 2,
        height: width * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phi += 0.005;
          state.phi = phi + rs.get();
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      console.log('Globe created successfully:', globe);

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
          console.log('Globe canvas opacity set to 1');
        }
      }, 0);
      
      return () => {
        console.log('Globe component unmounting, destroying globe');
        try {
          globe.destroy();
        } catch (error) {
          console.error('Error destroying globe:', error);
        }
        window.removeEventListener("resize", onResize);
      };
    } catch (error) {
      console.error('Error creating globe:', error);
      // Fallback: show a simple globe placeholder
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
        canvasRef.current.style.backgroundColor = "#f0f0f0";
        canvasRef.current.style.display = "flex";
        canvasRef.current.style.alignItems = "center";
        canvasRef.current.style.justifyContent = "center";
        canvasRef.current.innerHTML = '<div style="text-align: center; color: #666;">🌍 Globe Loading...</div>';
      }
    }
  }, [rs, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
