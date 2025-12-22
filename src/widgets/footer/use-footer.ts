import { useMemo } from 'react';
import { siteConfig } from '@shared/config';

/**
 * Hook for footer business logic
 * Extracts calculations and data transformations
 */
export function useFooter() {
  const copyrightYear = useMemo(() => new Date().getFullYear(), []);

  return {
    copyrightYear,
    siteName: siteConfig.name,
    description: siteConfig.description,
    contact: siteConfig.contact,
    social: siteConfig.social,
  };
}
