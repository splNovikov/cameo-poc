import { type Advantage } from '@entities/advantage';

/**
 * Hook for Advantages Section business logic
 * Manages advantages data
 */
export function useAdvantagesSection() {
  // In production, this would fetch from CMS or API
  const advantages: Advantage[] = [
    {
      id: '1',
      title: 'Удобная локация',
      description:
        'Расположение в центре Санкт-Петербурга, рядом с основными достопримечательностями и транспортной развязкой',
      icon: 'location',
    },
    {
      id: '2',
      title: 'Высокий уровень сервиса',
      description: 'Профессиональный и дружелюбный персонал, готовый помочь в любой ситуации 24/7',
      icon: 'service',
    },
    {
      id: '3',
      title: 'Парковка',
      description: 'Охраняемая парковка для гостей отеля и апартаментов',
      icon: 'parking',
    },
    {
      id: '4',
      title: 'Завтраки',
      description:
        'Вкусные и разнообразные завтраки в нашем кафе, включенные в стоимость проживания',
      icon: 'breakfast',
    },
    {
      id: '5',
      title: 'Бесплатный Wi-Fi',
      description: 'Высокоскоростной интернет во всех номерах и общественных зонах',
      icon: 'wifi',
    },
    {
      id: '6',
      title: 'Безопасность',
      description: 'Круглосуточная охрана и система видеонаблюдения для вашей безопасности',
      icon: 'security',
    },
    {
      id: '7',
      title: 'Ежедневная уборка',
      description: 'Регулярная уборка номеров и смена постельного белья',
      icon: 'cleaning',
    },
    {
      id: '8',
      title: 'Консьерж-сервис',
      description: 'Помощь в организации экскурсий, трансферов и других дополнительных услуг',
      icon: 'concierge',
    },
  ];

  return {
    advantages,
  };
}
