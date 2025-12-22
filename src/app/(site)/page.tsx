import { HeroSection } from '@widgets/hero-section';
import { AboutSection } from '@widgets/about-section';
import { PropertiesCards } from '@widgets/properties-cards';
import { GallerySection } from '@widgets/gallery-section';
import { ReviewsSection } from '@widgets/reviews-section';
import { AdvantagesSection } from '@widgets/advantages-section';
import { ContactsSection } from '@widgets/contacts-section';
import { type Property } from '@entities/property';
import { siteConfig } from '@shared/config';

// Mock data - in production, this would come from CMS or API
const mockProperties: Property[] = [
  {
    id: '1',
    slug: 'cameo-hotel',
    name: 'Отель Камея',
    type: 'hotel',
    description: 'Комфортабельный отель в центре города',
    shortDescription: 'Отель с современными номерами и отличным сервисом',
    address: siteConfig.contact.addresses.hotel[0].address,
    images: [
      '/images/hotel/1.jpg',
      '/images/hotel/2.jpeg',
      '/images/hotel/3.jpeg',
      '/images/hotel/4.jpeg',
    ],
    amenities: ['Wi-Fi', 'Завтрак', 'Парковка'],
    rating: 4.5,
    reviewCount: 120,
    coordinates: siteConfig.contact.addresses.hotel[0].coordinates,
  },
  {
    id: '2',
    slug: 'cameo-apartments',
    name: 'Апартаменты Камея',
    type: 'apartments',
    description: 'Современные апартаменты для длительного проживания',
    shortDescription: 'Просторные апартаменты с кухней',
    address: siteConfig.contact.addresses.apartments[0].address,
    images: [
      '/images/apartments/1.jpg',
      '/images/apartments/2.jpeg',
      '/images/apartments/3.jpeg',
      '/images/apartments/4.jpeg',
    ],
    amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина'],
    rating: 4.8,
    reviewCount: 85,
    coordinates: siteConfig.contact.addresses.apartments[0].coordinates,
  },
];

/**
 * Home Page
 * Composes all main sections: Hero, About, Properties, Gallery, Reviews, Advantages, Contacts
 */
export default function HomePage() {
  return (
    <>
      <HeroSection properties={mockProperties} />
      <AboutSection />
      <PropertiesCards properties={mockProperties} />
      <GallerySection />
      <AdvantagesSection />
      <ReviewsSection orgId={process.env.NEXT_PUBLIC_YANDEX_ORG_ID} />
      <ContactsSection />
    </>
  );
}
