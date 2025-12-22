import { useState, useCallback } from 'react';

interface UseMobileBookingStickyReturn {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Custom hook for mobile booking sticky component business logic
 * Manages collapse state and keyboard interactions
 */
export function useMobileBookingSticky(): UseMobileBookingStickyReturn {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCollapse();
      }
    },
    [toggleCollapse]
  );

  return {
    isCollapsed,
    toggleCollapse,
    handleKeyDown,
  };
}
