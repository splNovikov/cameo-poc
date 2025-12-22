import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from './providers/query-provider';
import { SeasonalEffects } from '@widgets/seasonal-effects';
import { siteConfig } from '@shared/config';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['отель', 'бронирование', 'Отель Камея', 'номера'],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicons/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicons/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <SeasonalEffects />
        </QueryProvider>
      </body>
    </html>
  );
}
