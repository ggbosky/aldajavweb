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
    'Střih videa mě baví více jak 6 let. Vystudoval jsem marketingovou komunikaci a mám zkušenosti z tvorby obchodních promo videí, marketingových kampaní nebo klasických reels ať už pro Hitrádio nebo FAČR. Baví mě ze surového materiálu vytvořit takové video, které zaujme na první pohled. Ke každému projektu přistupuji s citem jak pro obraz, tak pro to, komu je určen.',
  /** Výřez 4:5 (960 × 1200) z Alešovy fotky na černém pozadí. */
  portrait: '/images/ales-foto.jpg',
} as const;

/** The icon is drawn inline in the component; this picks which one. */
export type ExpertiseIcon = 'reels' | 'youtube' | 'podcast';

export const EXPERTISE: ReadonlyArray<{ icon: ExpertiseIcon; label: string; note: string }> = [
  { icon: 'reels', label: 'Reels', note: 'Vertikální formáty pro sociální sítě' },
  { icon: 'youtube', label: 'YouTube', note: 'Dlouhá videa a sestřihy' },
  { icon: 'podcast', label: 'Podcasty', note: 'Multicam záznam a střih' },
];

export type WorkVideo = {
  /** Název — na stránce se nezobrazuje, slouží pro čtečky obrazovky. */
  readonly title: string;
  /**
   * Složka videa v `public/video` — v ní leží `index.m3u8`, `init.mp4` a krátké
   * úseky `.mp4`, které z originálu vyrobí ffmpeg (viz README). Video se přehraje
   * přímo na stránce, bez Disku a bez YouTube.
   */
  readonly slug: string;
  /** Náhled v `public/prace`. */
  readonly thumb: string;
};

export type WorkCategory = {
  readonly id: string;
  /** Text na přepínači. */
  readonly label: string;
  /** Poměr stran náhledů: Reels na výšku, YouTube na šířku. */
  readonly aspect: 'vertical' | 'horizontal';
  readonly videos: ReadonlyArray<WorkVideo>;
};

/**
 * Vybraná videa — po pěti na kategorii, každé pro jiného klienta. Originály
 * leží na Alešově Disku (složka VIDEA); na web jdou zmenšené na 720p a
 * rozdělené na krátké úseky (HLS), takže se přehrají přímo na stránce.
 */
export const WORK: ReadonlyArray<WorkCategory> = [
  {
    id: 'reels',
    label: 'Reels',
    aspect: 'vertical',
    videos: [
      {
        title: 'Hitrádio – Ranní show 2.0',
        slug: 'hitradio-ranni-show',
        thumb: '/prace/hitradio-ranni-show.jpg',
      },
      {
        title: 'Jakubeoff – Video 9',
        slug: 'jakubeoff-video-9',
        thumb: '/prace/jakubeoff-video-9.jpg',
      },
      {
        title: 'Matěj Cihlář – Náhledovky',
        slug: 'matej-cihlar-nahledovky',
        thumb: '/prace/matej-cihlar-nahledovky.jpg',
      },
      {
        title: 'Radio House – Radioprojekt 2025',
        slug: 'radio-house-radioprojekt',
        thumb: '/prace/radio-house-radioprojekt.jpg',
      },
      {
        title: 'Repre – Fotbal+ FAQ: Kolik',
        slug: 'repre-fotbal-faq',
        thumb: '/prace/repre-fotbal-faq.jpg',
      },
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube',
    aspect: 'horizontal',
    videos: [
      {
        title: 'AMBIS – Mediální gramotnost a dezinformace',
        slug: 'ambis-medialni-gramotnost',
        thumb: '/prace/ambis-medialni-gramotnost.jpg',
      },
      {
        title: 'Hitrádio – Obchodní promo',
        slug: 'hitradio-obchodni-promo',
        thumb: '/prace/hitradio-obchodni-promo.jpg',
      },
      {
        title: 'Matěj Cihlář – 7 úrovní monetizace',
        slug: 'matej-cihlar-7-urovni',
        thumb: '/prace/matej-cihlar-7-urovni.jpg',
      },
      {
        title: 'MOL Cup – Teaser 2025/26',
        slug: 'mol-cup-teaser',
        thumb: '/prace/mol-cup-teaser.jpg',
      },
      {
        title: 'Radio House – Chytrý jak rádio',
        slug: 'radio-house-chytry-jak-radio',
        thumb: '/prace/radio-house-chytry-jak-radio.jpg',
      },
    ],
  },
];

export type Client = {
  readonly name: string;
  /** Chybí-li logo, vykreslí se jméno jako textová značka. */
  readonly logo?: string;
};

export const CLIENTS: ReadonlyArray<Client> = [
  { name: 'Inside Games', logo: '/klienti/inside-games.png' },
  { name: 'Hitrádio', logo: '/klienti/hitradio.png' },
  // TODO: logo FAČR ve sdílené složce nebylo — dokud nedorazí, jede textová značka.
  { name: 'FAČR' },
];

export type Review = {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  /** Čtvercová fotka v `public/recenze`, vykreslí se jako kolečko. */
  readonly photo?: string;
};


/**
 * Na stránce jsou jen recenze, které tu opravdu jsou — žádná prázdná místa.
 * TODO: další dvě pošle Aleš. Formát:
 *   { quote: 'Text.', author: 'Jméno', role: 'Pozice', photo: '/recenze/jmeno.jpg' }
 */
export const REVIEWS: ReadonlyArray<Review> = [
  {
    quote:
      'Alda vždy všechno zvládl na jedničku, neustále se učil nové techniky střihu a má cit pro detail. Nebál bych se mu kdykoliv svěřit další projekty, doporučuju.',
    author: 'Matěj „Straty“ Cihlář',
    role: 'Content creator a komentátor',
    photo: '/recenze/matej-cihlar.jpg',
  },
];

/**
 * Kam se odesílá kontaktní formulář.
 *
 * Statický web sám e-mail odeslat neumí. Vlož sem endpoint z Formspree nebo
 * Web3Forms (registrace je zdarma a na dvě minuty) a formulář začne odesílat
 * na pozadí. Dokud je prázdný, odeslání otevře předvyplněný e-mail v poštovním
 * klientovi — funguje to hned, jen to projde přes jeho aplikaci.
 */
export const CONTACT_ENDPOINT = '';
