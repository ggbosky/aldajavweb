import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import SceneMount from '@/components/canvas/SceneMount';
import SiteHeader from '@/components/layout/SiteHeader';
import TimecodeHUD from '@/components/hud/TimecodeHUD';
import TransportBar from '@/components/hud/TransportBar';
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
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="cs" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <SceneMount />
        <SiteHeader />
        <TimecodeHUD />
        {children}
        <TransportBar />
        <div className="overlay" aria-hidden="true" />
        <div className="overlay overlay--lines" aria-hidden="true" />
      </body>
    </html>
  );
}
