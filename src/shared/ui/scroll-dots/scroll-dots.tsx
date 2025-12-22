'use client';

import styles from './scroll-dots.module.css';

export interface ScrollDotsProps {
  /**
   * Total number of items
   */
  count: number;
  /**
   * Current active index
   */
  currentIndex: number;
  /**
   * Callback when dot is clicked
   */
  onDotClick: (index: number) => void;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * ScrollDots Component
 * Displays pagination dots for horizontal scroll navigation
 * Mobile-first responsive design
 */
export function ScrollDots({ count, currentIndex, onDotClick, className }: ScrollDotsProps) {
  if (count === 0) return null;

  return (
    <div className={`${styles.scrollDots} ${className || ''}`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.scrollDot} ${index === currentIndex ? styles.scrollDotActive : ''}`}
          onClick={() => onDotClick(index)}
          aria-label={`Показать элемент ${index + 1}`}
        />
      ))}
    </div>
  );
}
