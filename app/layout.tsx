import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import SiteHeader from '@/components/layout/SiteHeader';
import { BRAND } from '@/lib/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono-jb',
  display: 'swap',
});

/** Editorial display face — carries the hero and every section title. */
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Video Editor & Motion Designer`,
  description:
    'Freelance střihač, videomaker a motion designer. Krátké formáty pro sociální sítě, brand video, dlouhé formáty a motion grafika.',
  keywords: ['video editor', 'střihač', 'videomaker', 'motion design', 'After Effects', 'Premiere Pro'],
  openGraph: {
    title: `${BRAND.name} — Video Editor & Motion Designer`,
    description: 'Střih, motion grafika a produkce videa. Prvních pět vteřin rozhoduje o všem ostatním.',
    type: 'website',
    locale: 'cs_CZ',
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
      className={`${archivo.variable} ${jetbrains.variable} ${playfair.variable}`}
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
