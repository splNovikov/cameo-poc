'use client';

import Image from 'next/image';
import { useAboutSection } from './use-about-section';
import styles from './about-section.module.css';

interface AboutSectionProps {
  className?: string;
}

/**
 * About Section Widget
 * Displays information about Камея
 * Mobile-first responsive design
 */
export function AboutSection({ className: _className }: AboutSectionProps) {
  const { content } = useAboutSection();

  return (
    <section className={`${styles.section} sectionBand`} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className="sectionHeader">
            <div className="sectionLabel">О нас</div>
            <h2 className={`sectionTitle ${styles.title}`}>{content.title}</h2>
          </div>
          <div className={styles.text}>
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {content.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={500}
              height={500}
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
