'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@shared/ui/modal';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return <div className="text-center text-text-light">Изображения отсутствуют</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`${propertyName} - фото ${index + 1}`}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        size="xl"
        className="bg-transparent"
      >
        {selectedImage && (
          <div className="relative aspect-video w-full">
            <Image
              src={selectedImage}
              alt={`${propertyName} - увеличенное фото`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )}
      </Modal>
    </>
  );
}
