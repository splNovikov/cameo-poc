import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';

/**
 * Site Layout
 * Main layout component for the site pages
 * Follows FSD architecture - thin wrapper that composes widgets
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
