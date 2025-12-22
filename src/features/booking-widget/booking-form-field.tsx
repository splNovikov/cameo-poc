import { type FieldError } from 'react-hook-form';
import { cn } from '@shared/lib/utils';

interface BookingFormFieldProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  error?: FieldError;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable booking form field component
 */
export function BookingFormField({
  id,
  label,
  icon,
  error,
  children,
  className,
}: BookingFormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn(
          'text-text-primary mb-1 flex items-center gap-1 text-xs font-medium',
          icon && 'gap-1'
        )}
      >
        {icon}
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
}
