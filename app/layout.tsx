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
  // The mark is black on transparent, which would vanish on a dark browser tab,
  // so dark mode gets a white copy. favicon.ico covers anything older.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-light.png', type: 'image/png', sizes: '192x192', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', type: 'image/png', sizes: '192x192', media: '(prefers-color-scheme: dark)' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
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
