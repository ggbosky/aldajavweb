/**
 * Single source of truth for all copy + portfolio data.
 * Everything the client edits lives here — nothing else needs to change.
 */

export const BRAND = {
  /** The handle he works under; the wordmark in `public/images` spells it. */
  name: 'ALDA',
  fullName: 'Aleš Javorský',
  role: 'Video Editor · Videomaker · Motion Designer',
  tagline: 'Prvních pár vteřin rozhoduje o všem ostatním.',
  email: 'alda.jav@seznam.cz',
  location: 'Česká republika · remote',
} as const;

export const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Instagram', href: 'https://instagram.com/ja.alesh' },
  { label: 'Facebook', href: 'https://www.facebook.com/ja.alesh' },
  {
    label: 'LinkedIn',
    // Percent-encoded: the profile slug carries the diacritics of the name.
    href: 'https://www.linkedin.com/in/ale%C5%A1-javorsk%C3%BD-123978258/',
  },
];

export type Stat = {
  /** Číslo, na které se počítadlo roztočí. */
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
};

export const STATS: ReadonlyArray<Stat> = [
  { value: 6, suffix: '+', label: 'let zkušeností' },
  { value: 1000, prefix: '+', label: 'zpracovaných videí' },
  { value: 4, suffix: 'K', label: 'dodání' },
];

export const ABOUT = {
  body:
    'Jsem Aleš a střih videí mě baví více jak 6 let. Vystudoval jsem marketingovou komunikaci a mám zkušenosti z tvorby obchodních promo videí, marketingových kampaní nebo klasických reels ať už pro Hitrádio nebo FAČR. Baví mě ze surového materiálu vytvořit takové video, které zaujme na první pohled. Ke každému projektu přistupuji s citem jak pro obraz, tak pro to, komu je určen.',
  portrait: '/images/ales-portret.jpg',
} as const;

/** The icon is drawn inline in the component; this picks which one. */
export type ExpertiseIcon = 'reels' | 'youtube' | 'podcast';

export const EXPERTISE: ReadonlyArray<{ icon: ExpertiseIcon; label: string; note: string }> = [
  { icon: 'reels', label: 'Reels', note: 'Vertikální formáty pro sociální sítě' },
  { icon: 'youtube', label: 'YouTube', note: 'Dlouhá videa a sestřihy' },
  { icon: 'podcast', label: 'Podcasty', note: 'Multicam záznam a střih' },
];

export type Client = {
  readonly name: string;
  /** Chybí-li logo, vykreslí se jméno jako textová značka. */
  readonly logo?: string;
};

export const CLIENTS: ReadonlyArray<Client> = [
  { name: 'Hitrádio', logo: '/klienti/hitradio.png' },
  // TODO: logo FAČR ve sdílené složce nebylo — dokud nedorazí, jede textová značka.
  { name: 'FAČR' },
];

export type Review = {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
};

/**
 * TODO: Aleš dodá recenze od klientů. Formát:
 *   { quote: 'Text recenze.', author: 'Jméno', role: 'Pozice, firma' }
 * Dokud je pole prázdné, sekce ukáže tři prázdné rámečky.
 */
export const REVIEWS: ReadonlyArray<Review> = [];

/**
 * Kam se odesílá kontaktní formulář.
 *
 * Statický web sám e-mail odeslat neumí. Vlož sem endpoint z Formspree nebo
 * Web3Forms (registrace je zdarma a na dvě minuty) a formulář začne odesílat
 * na pozadí. Dokud je prázdný, odeslání otevře předvyplněný e-mail v poštovním
 * klientovi — funguje to hned, jen to projde přes jeho aplikaci.
 */
export const CONTACT_ENDPOINT = '';
