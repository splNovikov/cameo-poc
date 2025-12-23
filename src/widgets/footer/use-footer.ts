import { useMemo } from 'react';
import { siteConfig } from '@shared/config';

/**
 * Hook for footer business logic
 * Extracts calculations and data transformations
 * Memoizes return value to prevent unnecessary re-renders
 */
export function useFooter() {
  return useMemo(
    () => ({
      copyrightYear: new Date().getFullYear(),
      siteName: siteConfig.name,
      description: siteConfig.description,
      contact: siteConfig.contact,
      social: siteConfig.social,
    }),
    []
  );
}
