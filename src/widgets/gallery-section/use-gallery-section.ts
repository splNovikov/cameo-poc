/**
 * Hook for Gallery Section business logic
 * Manages gallery images data
 */

interface GalleryImage {
  src: string;
  alt: string;
}

export function useGallerySection() {
  // In production, this would fetch from CMS or API
  // Combining images from both hotel and apartments
  const images: GalleryImage[] = [
    {
      src: '/images/hotel/1.jpg',
      alt: 'Общий вид отеля Камея',
    },
    {
      src: '/images/hotel/2.jpeg',
      alt: 'Фасад отеля Камея',
    },
    {
      src: '/images/apartments/1.jpg',
      alt: 'Апартаменты Камея',
    },
    {
      src: '/images/apartments/2.jpeg',
      alt: 'Интерьер апартаментов',
    },
    {
      src: '/images/hotel/3.jpeg',
      alt: 'Внутренний двор отеля',
    },
    {
      src: '/images/apartments/3.jpeg',
      alt: 'Гостиная в апартаментах',
    },
    {
      src: '/images/hotel/4.jpeg',
      alt: 'Рекреационная зона отеля',
    },
    {
      src: '/images/apartments/4.jpeg',
      alt: 'Спальня в апартаментах',
    },
  ];

  return {
    images,
  };
}
