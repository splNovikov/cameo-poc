'use client';

import { ChevronRight } from 'lucide-react';
import styles from './scroll-hint-button.module.css';

export interface ScrollHintButtonProps {
  /**
   * Callback when button is clicked
   */
  onClick: () => void;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * ScrollHintButton Component
 * Displays clickable scroll hint button
 * Mobile-first responsive design
 */
export function ScrollHintButton({ onClick, className }: ScrollHintButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.scrollHint} ${className || ''}`}
      aria-label="Прокрутить вправо"
    >
      <ChevronRight className={styles.scrollHintIcon} />
    </button>
  );
}
