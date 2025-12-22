'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useGallerySection } from './use-gallery-section';
import { Modal } from '@shared/ui/modal';
import styles from './gallery-section.module.css';

interface GallerySectionProps {
  className?: string;
}

/**
 * Gallery Section Widget
 * Displays general views gallery with lightbox
 * Mobile-first responsive design
 */
export function GallerySection({ className }: GallerySectionProps) {
  const { images } = useGallerySection();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [showRightGradient, setShowRightGradient] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.classList.toggle('scrolledStart', isAtStart);
        scrollWrapperRef.current.classList.toggle('scrolledEnd', isAtEnd);
      }
      setShowRightGradient(!isAtEnd);
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <section className={styles.section} id="gallery">
        <div className={styles.container}>
          <h2 className={styles.title}>Галерея</h2>
          <p className={styles.subtitle}>Общие виды наших объектов</p>
          <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
              <div className={styles.gallery}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={styles.imageWrapper}
                    onClick={() => setSelectedImage(image.src)}
                    aria-label={`Открыть изображение ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.overlayText}>Просмотр</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {showRightGradient && (
              <div className={styles.scrollHint}>
                <ChevronRight className={styles.scrollHintIcon} />
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        size="xl"
        className={styles.modal}
      >
        {selectedImage && (
          <div className={styles.modalContent}>
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedImage}
                alt="Увеличенное изображение"
                fill
                className={styles.modalImage}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
