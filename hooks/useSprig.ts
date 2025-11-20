import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Types for Sprig global interface
declare global {
  interface Window {
    Sprig: {
      (method: string, ...args: any[]): void;
      appId?: string;
      _API_URL?: string;
      _queue?: any[];
    };
  }
}

// Track last event time to prevent duplicates
let lastEventTime = 0;
const EVENT_DEBOUNCE_MS = 1000; // 1 second

export const useSprig = () => {
  const router = useRouter();
  const sprigEnvironmentId = process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID;

  // Early return for server-side rendering
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize Sprig script
  useEffect(() => {
    if (!sprigEnvironmentId || typeof window === 'undefined') return;

    // Check if Sprig is already initialized
    if (window.Sprig) return;

    try {
      // Official Sprig initialization pattern
      window.Sprig = function(method: string, ...args: any[]) {
        (window.Sprig._queue = window.Sprig._queue || []).push([method, ...args]);
      };

      // Configure with environment ID
      window.Sprig.appId = sprigEnvironmentId;
      window.Sprig._API_URL = 'https://api.sprig.com';

      // Load the Sprig script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.sprig.com/shim.js';

      script.onerror = () => {
        console.error('Failed to load Sprig script');
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error('Sprig initialization failed:', error);
    }
  }, [sprigEnvironmentId]);

  // Track page visits for specific documentation pages
  useEffect(() => {
    if (!sprigEnvironmentId || typeof window === 'undefined') return;

    const trackPageView = (eventName: string) => {
      const now = Date.now();

      // Prevent duplicate events within debounce period
      if (now - lastEventTime < EVENT_DEBOUNCE_MS) {
        return;
      }

      if (!window.Sprig) {
        return;
      }

      try {
        lastEventTime = now;
        window.Sprig('track', eventName);
      } catch (error) {
        console.error('Sprig track failed:', error);
      }
    };

    const handleRouteChange = (url: string) => {
      if (url.includes('/docs/experiments')) {
        trackPageView('viewed_experimentation_docs');
      } else if (url.includes('/docs/featureflags')) {
        trackPageView('viewed_featureflags_docs');
      }
    };

    // Track if already on a tracked page
    if (router.asPath.includes('/docs/experiments')) {
      trackPageView('viewed_experimentation_docs');
    } else if (router.asPath.includes('/docs/featureflags')) {
      trackPageView('viewed_featureflags_docs');
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router, sprigEnvironmentId]);
};