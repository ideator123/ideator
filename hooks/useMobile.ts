import { useState, useEffect } from 'react';

interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  viewportWidth: number;
  viewportHeight: number;
  orientation: 'portrait' | 'landscape';
}

export const useMobile = (): MobileDetection => {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    viewportWidth: 1024,
    viewportHeight: 768,
    orientation: 'landscape',
  });

  useEffect(() => {
    const updateDetection = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Modern breakpoints aligned with Tailwind CSS
      const isMobile = width < 768; // sm
      const isTablet = width >= 768 && width < 1024; // md to lg
      const isDesktop = width >= 1024; // lg+
      
      // Touch detection
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;

      const orientation = height > width ? 'portrait' : 'landscape';

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        viewportWidth: width,
        viewportHeight: height,
        orientation,
      });
    };

    // Initial detection
    updateDetection();

    // Listen for resize events with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDetection, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', updateDetection);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', updateDetection);
      clearTimeout(timeoutId);
    };
  }, []);

  return detection;
};

// Hook for container queries (modern CSS feature)
export const useContainerQuery = (breakpoint: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Modern container query support
    if (typeof window !== 'undefined' && window.CSS?.supports?.('container-type', 'inline-size')) {
      // Browser supports container queries
      const updateMatches = () => {
        // This would need actual container query implementation
        // For now, fall back to viewport queries
        const width = window.innerWidth;
        switch (breakpoint) {
          case 'mobile':
            setMatches(width < 768);
            break;
          case 'tablet':
            setMatches(width >= 768 && width < 1024);
            break;
          case 'desktop':
            setMatches(width >= 1024);
            break;
          default:
            setMatches(false);
        }
      };

      updateMatches();
      window.addEventListener('resize', updateMatches);
      return () => window.removeEventListener('resize', updateMatches);
    }
  }, [breakpoint]);

  return matches;
}; 