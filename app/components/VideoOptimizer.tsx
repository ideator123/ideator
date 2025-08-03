"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Loader2, Volume2, VolumeX } from "lucide-react";

interface VideoOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const VideoOptimizer: React.FC<VideoOptimizerProps> = ({
  src,
  alt,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getOptimizedVideoPath = (originalPath: string) => {
    // Use compressed versions when available
    const videoMap: { [key: string]: string } = {
      '/hotel.mp4': '/hotel_compressed.mp4',
      '/conference.mp4': '/conference_compressed.mp4',
      '/exhibition.mp4': '/exhibition_compressed.mp4',
      '/fashion_compressed.mp4': '/fashion_compressed.mp4',
      '/productlaunch.mp4': '/productlaunch_compressed.mp4',
      '/concerts.mp4': '/concerts_compressed.mp4',
      '/tours.mp4': '/tours_compressed.mp4',
      '/awards.mp4': '/awards_compressed.mp4'
    };
    return videoMap[originalPath] || originalPath;
  };

  const getFallbackImage = (videoPath: string) => {
    const fallbackMap: { [key: string]: string } = {
      '/hotel.mp4': '/corporate-events-conferences.jpg',
      '/conference.mp4': '/corporate-events-conferences.jpg',
      '/productlaunch.mp4': '/product-launches-brand-activations.jpg',
      '/exhibition.mp4': '/exhibitions-branding.jpg',
      '/concerts.mp4': '/concerts-artist-management.jpg',
      '/tours.mp4': '/international-corporate-tours.jpg',
      '/awards.mp4': '/award-shows-gala-dinners.jpg',
      '/fashion_compressed.mp4': '/corporate-events-conferences.jpg'
    };
    return fallbackMap[videoPath] || '/placeholder.jpg';
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const optimizedSrc = getOptimizedVideoPath(src);
  const fallbackImage = getFallbackImage(src);

  return (
    <div className="relative w-full h-full">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex items-center gap-2 text-[#0a2449]/60">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading video...</span>
          </div>
        </div>
      )}

      {/* Error State - Show Fallback Image */}
      {hasError && (
        <img
          src={fallbackImage}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          loading="lazy"
        />
      )}

      {/* Video */}
      {!hasError && (
        <video
          ref={videoRef}
          src={optimizedSrc}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline={playsInline}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          preload="metadata"
        />
      )}

      {/* Play Button Overlay */}
      {!isLoaded && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white/90 rounded-full p-3">
            <Play className="w-6 h-6 text-[#0a2449]" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Mute/Unmute Button */}
      {isLoaded && !isLoading && !hasError && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-30"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default VideoOptimizer; 