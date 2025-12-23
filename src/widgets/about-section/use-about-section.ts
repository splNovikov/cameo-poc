/**
 * Hook for About Section business logic
 * Separates data and logic from presentation
 */

interface AboutContent {
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt: string;
}

export function useAboutSection() {
  // In production, this would fetch from CMS or API
  const content: AboutContent = {
    title: '',
    paragraphs: [
      'Камея — это современный отель, расположенный в самом сердце Санкт-Петербурга. Мы предлагаем комфортабельные номера и отличный сервис для наших гостей.',
      'Наша команда стремится создать незабываемый опыт для каждого гостя, обеспечивая высокий уровень комфорта и гостеприимства. Мы гордимся тем, что можем предложить уникальное сочетание современного дизайна, удобного расположения и безупречного сервиса.',
      'Камея — это не просто место для ночлега, это ваш дом вдали от дома, где каждая деталь продумана для вашего комфорта и удовольствия.',
    ],
    image: '/images/logo/cameo-logo-hotel.png',
    imageAlt: 'Камея логотип',
  };

  return {
    content,
  };
}
