import { format as dateFnsFormat, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

/**
 * Format price in Russian locale
 */
export function formatPrice(price: number, currency: string = '₽'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace('RUB', currency);
}

/**
 * Format date in Russian locale
 */
export function formatDate(date: Date | string, format: string = 'dd.MM.yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(dateObj, format, { locale: ru });
}

/**
 * Format relative time (e.g., "2 дня назад")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ru });
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  return phone;
}

/**
 * Format phone number for tel: link (removes spaces, parentheses, and dashes)
 * @param phone - Phone number string (e.g., "+7 (812) 328 15 15")
 * @returns Formatted phone number for tel: links (e.g., "+78123281515")
 */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s/g, '').replace(/[()]/g, '').replace(/-/g, '');
}
