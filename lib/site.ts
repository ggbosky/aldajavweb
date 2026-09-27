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

// TODO: ověřit čísla, než to půjde live — jsou to zatím odhady, ne měřená data.
export const STATS: ReadonlyArray<{ value: string; label: string; note: string }> = [
  { value: '6+', label: 'let u střihu', note: 'freelance · on set · post' },
  { value: '4K', label: 'delivery', note: '9:16 · 1:1 · 16:9' },
  { value: '24h', label: 'rychlý turnaround', note: 'u krátkých formátů' },
  { value: '1', label: 'člověk na projekt', note: 'natočím · sestříhám · dodám' },
];

export const ABOUT = {
  heading: 'O mně',
  body:
    'Jsem Aleš a střih videí mě baví více jak 6 let. Vystudoval jsem marketingovou komunikaci a mám zkušenosti z tvorby obchodních promo videí, marketingových kampaní nebo klasických reels ať už pro Hitrádio nebo FAČR. Baví mě ze surového materiálu vytvořit takové video, které zaujme na první pohled. Ke každému projektu přistupuji s citem jak pro obraz, tak pro to, komu je určen.',
  portrait: '/images/ales-portret.jpg',
  /** Krátké fakty pod textem — co, pro koho a odkud. */
  facts: [
    { label: 'Studium', value: 'Marketingová komunikace' },
    { label: 'Klienti', value: 'Hitrádio · FAČR · Inside Games' },
    { label: 'Působím', value: 'Česká republika · remote' },
  ],
} as const;

/** The icon is drawn inline in the component; this picks which one. */
export type ExpertiseIcon = 'reels' | 'youtube' | 'podcast';

export type Expertise = {
  readonly icon: ExpertiseIcon;
  readonly label: string;
  readonly note: string;
  /** Co v té službě konkrétně dostaneš — krátké body, žádné věty. */
  readonly includes: ReadonlyArray<string>;
};

// TODO: Aleš ať projde body v `includes` — ať sedí na to, co opravdu dodává.
export const EXPERTISE: ReadonlyArray<Expertise> = [
  {
    icon: 'reels',
    label: 'Reels',
    note: 'Vertikální formáty pro sociální sítě',
    includes: ['Hook na první vteřiny', 'Titulky a motion grafika', 'Color grading', 'Export 9:16'],
  },
  {
    icon: 'youtube',
    label: 'YouTube',
    note: 'Dlouhá videa a sestřihy',
    includes: ['Střih a dramaturgie', 'Sestřihy a highlighty', 'Grafika a titulky', 'Zvuk a barvy'],
  },
  {
    icon: 'podcast',
    label: 'Podcasty',
    note: 'Multicam záznam a střih',
    includes: ['Multicam střih', 'Čištění a mix zvuku', 'Krátké klipy na sítě', 'Titulky'],
  },
];

export type WorkVideo = {
  readonly title: string;
  /** Klient a rok, např. 'Hitrádio · 2024'. */
  readonly note: string;
  /** Watch link — YouTube, Instagram, Drive, cokoliv. */
  readonly href: string;
  /** Náhled videa (volitelné), např. '/prace/nazev.jpg' v `public/`. */
  readonly thumb?: string;
  /** Co jsem na videu dělal, např. ['Střih', 'Motion', 'Color']. */
  readonly role?: ReadonlyArray<string>;
};

export type WorkCategory = {
  readonly id: string;
  readonly label: string;
  readonly videos: ReadonlyArray<WorkVideo>;
};

/**
 * TODO: Aleš dodá výběr videí. Formát jedné položky:
 *   {
 *     title: 'Název videa',
 *     note: 'Hitrádio · 2024',
 *     href: 'https://…',
 *     thumb: '/prace/nazev.jpg',          // volitelné
 *     role: ['Střih', 'Motion', 'Color'], // volitelné
 *   }
 * Dokud je pole prázdné, sekce vykreslí stav „připravujeme“ — nic se nerozbije.
 */
export const WORK: ReadonlyArray<WorkCategory> = [
  { id: 'reels', label: 'Reels', videos: [] },
  { id: 'youtube', label: 'YouTube', videos: [] },
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
};

/**
 * TODO: Aleš dodá recenze od klientů. Formát:
 *   { quote: 'Text recenze.', author: 'Jméno', role: 'Pozice, firma' }
 * Prázdné pole vykreslí stav „připravujeme“.
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
