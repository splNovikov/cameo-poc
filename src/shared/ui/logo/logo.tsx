import Image from 'next/image';
import Link from 'next/link';
import { pathKeys } from '@shared/router';
import { siteConfig } from '@shared/config';
import { cn } from '@shared/lib/utils';

interface LogoProps {
  /**
   * Whether the logo should be a link to home page
   * @default true
   */
  linkToHome?: boolean;
  /**
   * Custom height for the logo
   * @default 'h-10'
   */
  height?: string;
  /**
   * Custom width for the logo (auto if not specified)
   */
  width?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show text fallback alongside logo
   * @default false
   */
  showText?: boolean;
}

/**
 * Logo component for the site
 * Displays the Cameo Hotel logo with optional text fallback
 */
export function Logo({
  linkToHome = true,
  height = 'h-10',
  width,
  className,
  showText = false,
}: LogoProps) {
  const logoContent = (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/logo/cameo-logo.png"
        alt={siteConfig.name}
        width={120}
        height={40}
        className={cn(height || 'h-10', width || 'w-auto')}
        priority
      />
      {showText && <span className="text-text-primary text-xl font-bold">{siteConfig.name}</span>}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href={pathKeys.home} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
