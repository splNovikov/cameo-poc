import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Некорректный email адрес');

/**
 * Phone validation schema (Russian format)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/, {
    message: 'Некорректный номер телефона',
  });

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
