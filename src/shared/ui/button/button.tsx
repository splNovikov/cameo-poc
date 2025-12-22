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
 * Button - Unified button component for the entire application
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
            'hover:shadow-primary/30 group relative overflow-hidden bg-primary font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-primary-dark hover:shadow-lg':
              isPrimary,
            'bg-error text-white hover:bg-red-700': variant === 'destructive',
            'border border-border bg-transparent hover:bg-bg-secondary': variant === 'outline',
            'bg-secondary text-white hover:bg-secondary-dark': variant === 'secondary',
            'hover:bg-bg-secondary': variant === 'ghost',
            'w-full': fullWidth,
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {isPrimary && (
          <>
            {/* Shine effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {/* Glow effect */}
            <span className="absolute inset-0 rounded-md bg-primary opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50" />
          </>
        )}
        {/* Text content - wrapped in span for primary buttons to ensure z-index layering */}
        {isPrimary ? <span className="relative z-10">{children}</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
