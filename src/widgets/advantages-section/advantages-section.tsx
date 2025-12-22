'use client';

import { MapPin, Shield, Car, Coffee, Wifi, Sparkles, Home, Users } from 'lucide-react';
import { type Advantage } from '@entities/advantage';
import { useAdvantagesSection } from './use-advantages-section';
import styles from './advantages-section.module.css';

interface AdvantagesSectionProps {
  className?: string;
}

/**
 * Icon mapping for advantages
 */
const ADVANTAGE_ICONS = {
  location: MapPin,
  service: Users,
  parking: Car,
  breakfast: Coffee,
  wifi: Wifi,
  security: Shield,
  cleaning: Sparkles,
  concierge: Home,
} as const;

/**
 * Advantages Section Widget
 * Displays key advantages: location, service, parking, breakfast, etc.
 * Mobile-first responsive design
 */
export function AdvantagesSection({ className }: AdvantagesSectionProps) {
  const { advantages } = useAdvantagesSection();

  return (
    <section className={styles.section} id="advantages">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Наши преимущества</h2>
          <p className={styles.subtitle}>Все, что нужно для комфортного и приятного пребывания</p>
        </div>
        <div className={styles.grid}>
          {advantages.map((advantage) => {
            const IconComponent = ADVANTAGE_ICONS[advantage.icon];
            return (
              <div key={advantage.id} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{advantage.title}</h3>
                <p className={styles.cardDescription}>{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
