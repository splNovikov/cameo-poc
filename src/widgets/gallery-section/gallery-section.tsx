'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useHorizontalScroll } from '@shared/lib/hooks';
import { ScrollDots } from '@shared/ui/scroll-dots';
import { ScrollHintButton } from '@shared/ui/scroll-hint-button';
import { useGallerySection } from './use-gallery-section';
import { Modal } from '@shared/ui/modal';
import styles from './gallery-section.module.css';

type GallerySectionProps = Record<string, never>;

/**
 * Gallery Section Widget
 * Displays general views gallery with lightbox
 * Mobile-first responsive design
 */
export function GallerySection({}: GallerySectionProps) {
  const { images } = useGallerySection();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    scrollContainerRef,
    scrollWrapperRef,
    showRightGradient,
    currentScrollIndex,
    scrollRight,
    scrollToIndex,
  } = useHorizontalScroll({
    itemSelector: '[data-gallery-image]',
    gap: 16,
    itemCount: images?.length,
  });

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <section className={`${styles.section} sectionBand`} id="gallery">
        <div className={styles.container}>
          <div className="sectionHeader">
            <div className="sectionLabel">Фотогалерея</div>
          </div>
          <p className={styles.subtitle}>Общие виды наших объектов</p>
          <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
              <div className={styles.gallery}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={styles.imageWrapper}
                    data-gallery-image
                    onClick={() => setSelectedImage(image.src)}
                    aria-label={`Открыть изображение ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, (max-width: 1024px) 380px, 400px"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.overlayText}>Просмотр</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {showRightGradient && <ScrollHintButton onClick={scrollRight} />}
            {images && images.length > 0 && (
              <ScrollDots
                count={images.length}
                currentIndex={currentScrollIndex}
                onDotClick={scrollToIndex}
              />
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
