import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches
 * @param query - Media query string (e.g., '(min-width: 768px)')
 * @returns boolean - true if media query matches, false otherwise
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create listener function
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Hook to detect if device is mobile
 * Mobile: < 768px (md breakpoint)
 */
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)');
}

/**
 * Hook to detect if device is tablet or larger
 * Tablet+: >= 768px
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

/**
 * Hook to detect if device is desktop
 * Desktop: >= 1024px (lg breakpoint)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * Hook to detect if device is large desktop
 * Large Desktop: >= 1280px (xl breakpoint)
 */
export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)');
}
