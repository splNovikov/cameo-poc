import { useState, useCallback } from 'react';

interface UseMobileNavigationReturn {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

/**
 * Custom hook for mobile navigation state management
 */
export function useMobileNavigation(): UseMobileNavigationReturn {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
  };
}
