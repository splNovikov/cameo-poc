import { HeroSection } from '@widgets/hero-section';
import { type Property } from '@entities/property';

// Mock data - in production, this would come from CMS or API
const mockProperties: Property[] = [
  {
    id: '1',
    slug: 'cameo-hotel',
    name: 'Cameo Hotel',
    type: 'hotel',
    description: 'Комфортабельный отель в центре города',
    shortDescription: 'Отель с современными номерами и отличным сервисом',
    address: 'Москва, ул. Примерная, д. 1',
    images: ['/images/hotel/1.jpg'],
    amenities: ['Wi-Fi', 'Завтрак', 'Парковка'],
    rating: 4.5,
    reviewCount: 120,
    coordinates: {
      lat: 55.7558,
      lng: 37.6173,
    },
  },
  {
    id: '2',
    slug: 'cameo-apartments',
    name: 'Cameo Apartments',
    type: 'apartments',
    description: 'Современные апартаменты для длительного проживания',
    shortDescription: 'Просторные апартаменты с кухней',
    address: 'Москва, ул. Примерная, д. 2',
    images: ['/images/apartments/1.jpg'],
    amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина'],
    rating: 4.8,
    reviewCount: 85,
    coordinates: {
      lat: 55.7568,
      lng: 37.6183,
    },
  },
];

export default function HomePage() {
  return (
    <HeroSection
      title="Cameo Hotel"
      subtitle="Комфортабельные номера в центре города"
      properties={mockProperties}
    />
  );
}
