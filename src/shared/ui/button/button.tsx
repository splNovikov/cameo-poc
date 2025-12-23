import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@shared/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button size variant
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * Button variant style
   * @default "default"
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

  /**
   * Make button take full width of container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Primary button effect classes - extracted for maintainability
 */
const PRIMARY_BUTTON_EFFECTS =
  'hover:shadow-primary/25 group relative overflow-hidden bg-primary font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-primary-dark hover:shadow-xl';

/**
 * Button - Unified button component for the entire application
 * Mobile-first: Base styles work on mobile, no responsive breakpoints needed
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      size = 'default',
      variant = 'default',
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'default';

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'h-10 px-4 py-2 text-sm': size === 'default',
            'h-9 px-3 text-xs': size === 'sm',
            'h-11 px-8 text-base': size === 'lg',
            // Primary button with attractive effects
            [PRIMARY_BUTTON_EFFECTS]: isPrimary,
            'bg-error text-white hover:bg-red-700': variant === 'destructive',
            // Outline: subtle glass-compatible outline
            'hover:border-primary/40 border border-border bg-white/60 shadow-sm hover:bg-white/80 hover:shadow-md':
              variant === 'outline',
            // Secondary: soft filled alternative
            'hover:bg-secondary-dark/95 bg-secondary text-white shadow-sm hover:shadow-md':
              variant === 'secondary',
            // Ghost: minimal, for light surfaces
            'bg-transparent hover:bg-white/40 hover:shadow-sm': variant === 'ghost',
            'w-full': fullWidth,
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {isPrimary && (
          <>
            {/* Shine effect - slightly softened */}
            <span className="duration-800 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full" />
            {/* Glow effect - softer and more diffuse */}
            <span className="duration-400 absolute inset-0 rounded-md bg-primary opacity-0 blur-md transition-opacity group-hover:opacity-40" />
          </>
        )}
        {/* Text content - wrapped in span for primary buttons to ensure z-index layering */}
        {isPrimary ? <span className="relative z-10">{children}</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
