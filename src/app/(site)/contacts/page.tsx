'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YandexMapComponent } from '@widgets/yandex-map-component';
import { Button } from '@shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { contactFormSchema, type ContactFormData } from '@shared/lib/utils/validation';
import { siteConfig } from '@shared/config';
import { type Property } from '@entities/property';

const mockProperties: Property[] = [
  {
    id: '1',
    slug: 'cameo-hotel',
    name: 'Отель Камея',
    type: 'hotel',
    description: '',
    address: siteConfig.contact.address,
    images: [],
    coordinates: {
      lat: 55.7558,
      lng: 37.6173,
    },
  },
];

export default function ContactsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In production, this would send to API route
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Сообщение отправлено!');
        reset();
      } else {
        alert('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при отправке сообщения');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Контакты</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Свяжитесь с нами</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Имя
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2"
                />
                {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2"
                />
                {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Телефон (необязательно)
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2"
                />
                {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Адрес</h3>
                <p className="text-text-light">{siteConfig.contact.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Телефон</h3>
                <p className="text-text-light">{siteConfig.contact.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-text-light">{siteConfig.contact.email}</p>
              </div>
            </CardContent>
          </Card>

          <YandexMapComponent properties={mockProperties} />
        </div>
      </div>
    </div>
  );
}
