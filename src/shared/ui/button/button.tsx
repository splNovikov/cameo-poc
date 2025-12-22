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
            'bg-primary text-white hover:bg-primary-dark': variant === 'default',
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
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
