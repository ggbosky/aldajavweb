import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import SiteHeader from '@/components/layout/SiteHeader';
import { BRAND } from '@/lib/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono-jb',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  alternates: { canonical: '/' },
  title: `${BRAND.name} — ${BRAND.fullName} · Video Editor`,
  description:
    'Freelance střihač a videomaker. Reels pro sociální sítě, dlouhá videa na YouTube a záznamy podcastů.',
  keywords: ['ALDA', 'video editor', 'střihač', 'videomaker', 'reels', 'YouTube', 'podcast'],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.fullName}`,
    description: 'Střih a produkce videa. Prvních pár vteřin rozhoduje o všem ostatním.',
    type: 'website',
    locale: 'cs_CZ',
    url: '/',
    siteName: BRAND.name,
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html
      lang="cs"
      className={`${archivo.variable} ${jetbrains.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        {/* The only thing left over the content: a touch of cinematic grain. */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
