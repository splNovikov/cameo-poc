import { useEffect, useState } from 'react';

/**
 * Hook for hero section entrance animations
 * Triggers animations when component mounts
 */
export function useHeroAnimations() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after a short delay for smooth entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    isVisible,
  };
}
