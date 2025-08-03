import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  videoLoadTime: number;
  errorCount: number;
  slowLoads: number;
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

export const usePerformanceMonitor = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    videoLoadTime: 0,
    errorCount: 0,
    slowLoads: 0,
  });

  const startTime = useRef<number>(0);

  useEffect(() => {
    // Start timing when component mounts
    startTime.current = performance.now();

    // Monitor video loading performance
    const handleVideoLoad = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      const loadTime = performance.now() - startTime.current;
      
      metricsRef.current.videoLoadTime = loadTime;
      
      if (loadTime > 3000) { // 3 seconds threshold
        metricsRef.current.slowLoads++;
        console.warn(`Slow video load detected: ${loadTime.toFixed(2)}ms for ${video.src}`);
      }
    };

    const handleVideoError = (event: Event) => {
      metricsRef.current.errorCount++;
      console.error('Video loading error:', event);
    };

    // Add event listeners for video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('loadstart', () => {
        startTime.current = performance.now();
      });
      video.addEventListener('canplay', handleVideoLoad);
      video.addEventListener('error', handleVideoError);
    });

    // Cleanup
    return () => {
      videos.forEach(video => {
        video.removeEventListener('canplay', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      });
    };
  }, []);

  const getMetrics = () => {
    return { ...metricsRef.current };
  };

  const logMetrics = () => {
    const metrics = getMetrics();
    console.log('Performance Metrics:', metrics);
    
    // Send to analytics if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metrics', {
        event_category: 'loading',
        event_label: 'mobile_services',
        value: metrics.loadTime,
        custom_parameters: {
          video_load_time: metrics.videoLoadTime,
          error_count: metrics.errorCount,
          slow_loads: metrics.slowLoads,
        },
      });
    }
  };

  return {
    getMetrics,
    logMetrics,
  };
};

// Network performance monitoring
export const useNetworkMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        console.log('Network Info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });

        // Adjust video quality based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // Use lower quality videos for slow connections
          const videos = document.querySelectorAll('video');
          videos.forEach(video => {
            // You could implement quality switching here
            console.log('Slow connection detected, consider using lower quality videos');
          });
        }
      }
    }
  }, []);
}; 