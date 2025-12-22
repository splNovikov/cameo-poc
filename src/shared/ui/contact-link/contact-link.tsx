import { ReactNode } from 'react';
import { formatPhoneForTel } from '@shared/lib/utils/format';

interface ContactLinkProps {
  /**
   * Phone number or address text
   */
  value: string;
  /**
   * Icon component
   */
  icon: ReactNode;
  /**
   * Link type - determines href format
   */
  type: 'phone' | 'address';
  /**
   * Map URL for address links
   */
  mapUrl?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Reusable contact link component
 * Handles phone and address links with consistent styling
 */
export function ContactLink({ value, icon, type, mapUrl, className = '' }: ContactLinkProps) {
  const href = type === 'phone' ? `tel:${formatPhoneForTel(value)}` : mapUrl || '#';
  const linkClasses =
    'flex items-center gap-1.5 text-text-light transition-colors hover:text-primary';

  return (
    <a
      href={href}
      target={type === 'address' ? '_blank' : undefined}
      rel={type === 'address' ? 'noopener noreferrer' : undefined}
      className={`${linkClasses} ${className}`}
    >
      {icon}
      <span className="text-xs lg:text-sm">{value}</span>
    </a>
  );
}
