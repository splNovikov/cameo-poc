'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { type Property } from '@entities/property';
import { usePropertiesCards } from './use-properties-cards';
import { Button } from '@shared/ui/button';
import styles from './properties-cards.module.css';

interface PropertiesCardsProps {
  properties: Property[];
  className?: string;
}

/**
 * Properties Cards Widget
 * Displays hotel and apartments cards with addresses
 * Mobile-first responsive design
 */
export function PropertiesCards({ properties, className: _className }: PropertiesCardsProps) {
  const { groupedProperties } = usePropertiesCards({ properties });

  return (
    <section className={styles.section} id="properties">
      <div className={styles.container}>
        <h2 className={styles.title}>Наши объекты</h2>
        <div className={styles.cardsGrid}>
          {groupedProperties.map((group) => (
            <div key={group.type} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                {group.property.images && group.property.images.length > 0 ? (
                  <Image
                    src={group.property.images[0]}
                    alt={group.property.name}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={group.type === 'hotel'}
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder} />
                )}
                <div className={styles.cardOverlay}>
                  <span className={styles.cardType}>{group.label}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{group.property.name}</h3>
                <p className={styles.cardDescription}>
                  {group.property.shortDescription || group.property.description}
                </p>
                <div className={styles.cardAddress}>
                  <MapPin className={styles.addressIcon} />
                  <span className={styles.addressText}>{group.property.address}</span>
                </div>
                {group.property.amenities && group.property.amenities.length > 0 && (
                  <div className={styles.cardAmenities}>
                    {group.property.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className={styles.amenityTag}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
                <Link href={`/properties/${group.property.slug}`} className={styles.cardLink}>
                  <Button variant="outline" fullWidth>
                    Подробнее
                    <ArrowRight className={styles.linkIcon} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
