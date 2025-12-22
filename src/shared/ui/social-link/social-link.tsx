import { ReactNode } from 'react';

interface SocialLinkProps {
  /**
   * Social network URL
   */
  href: string;
  /**
   * Icon component (ReactNode)
   */
  icon: ReactNode;
  /**
   * Accessible label for the link
   */
  ariaLabel: string;
  /**
   * Optional text label to display
   */
  label?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Show text label (for larger displays)
   */
  showLabel?: boolean;
}

/**
 * Reusable social link component
 * Handles social media links with consistent styling and accessibility
 */
export function SocialLink({
  href,
  icon,
  ariaLabel,
  label,
  className = '',
  showLabel = false,
}: SocialLinkProps) {
  const baseClasses = 'text-text-light transition-colors hover:text-primary';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {icon}
      {showLabel && label && <span>{label}</span>}
    </a>
  );
}
