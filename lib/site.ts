/**
 * Single source of truth for all copy + portfolio data.
 * Swap the placeholder contact details / metrics here — nothing else needs to change.
 */

export const BRAND = {
  name: 'Aleš Javorský',
  /** The hero sets each word on its own line. */
  nameLines: ['Aleš', 'Javorský'] as const,
  role: 'Video Editor · Videomaker · Motion Designer',
  /** Short form for the header, where the full role line does not fit. */
  roleShort: 'Video Editor · Motion Design',
  tagline: 'Prvních pět vteřin rozhoduje o všem ostatním.',
  intro:
    'Freelance střihač a videomaker. Krátké formáty pro sociální sítě, dlouhá videa i komerční kampaně. Nejde o techniku, jde o emoci a o to udržet pozornost.', // TODO: přepsat vlastními slovy
  email: 'ales.javorsky@example.com', // TODO: nahradit reálným kontaktem
  phone: '+420 000 000 000', // TODO
  location: 'Česká republika · remote',
  focus: 'Krátké formáty · brand video · motion',
} as const;

// TODO: doplnit odkazy na reálné profily — teď míří jen na holé domény.
export const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Vimeo', href: 'https://vimeo.com/' },
];

// TODO: ověřit čísla, než to půjde live — jsou to zatím odhady, ne měřená data.
export const STATS: ReadonlyArray<{ value: string; label: string; note: string }> = [
  { value: '5+', label: 'let praxe', note: 'freelance · on set · post' },
  { value: '4K', label: 'delivery', note: '9:16 · 1:1 · 16:9' },
  { value: '24h', label: 'rychlý turnaround', note: 'u krátkých formátů' },
  { value: '1', label: 'člověk na projekt', note: 'natočím · sestříhám · dodám' },
];

export type WorkBlock = {
  readonly id: string;
  readonly title: string;
  readonly kind: string;
  readonly format: string;
  readonly headline: string;
  readonly body: string;
  readonly role: ReadonlyArray<string>;
  readonly deliverables: ReadonlyArray<string>;
  readonly timecodeIn: string;
  readonly duration: string;
  readonly accent: 'orange' | 'teal';
};

/**
 * Typy práce, ne reference. Až budou k dispozici reálné projekty, stačí
 * `title` přepsat na jméno klienta a `body` na to, co se pro něj dělalo.
 */
export const WORK: ReadonlyArray<WorkBlock> = [
  {
    id: 'kratke-formaty',
    title: 'Krátké formáty',
    kind: 'Reels · Shorts · TikTok',
    format: '9:16 · 1:1',
    headline: 'Hook v první vteřině, pointa dřív než palec',
    body:
      'Vertikální video stavěné na jediný cíl: udržet divákovi palec nad displejem. Rychlý střih, čitelné titulky, rytmus navázaný na hudbu. Verze pro každou platformu zvlášť.',
    role: ['Střih', 'Titulky', 'Grafika'],
    deliverables: ['Reels / Shorts', 'Sestřihy z delšího videa', 'Verze pro platformy'],
    timecodeIn: '00:00:24:12',
    duration: '00:01:06',
    accent: 'orange',
  },
  {
    id: 'brand-video',
    title: 'Brand & komerce',
    kind: 'Kampaně · produkt · promo',
    format: '16:9 · 9:16',
    headline: 'Sdělení, které přežije i ztlumený zvuk',
    body:
      'Komerční video od konceptu po export. Kinetická typografie, tempo podle sdělení a grafika, která nese značku i ve chvíli, kdy divák kouká bez zvuku.',
    role: ['Koncept', 'Střih', 'After Effects'],
    deliverables: ['Performance ads', 'Brand filmy', 'Produktová videa'],
    timecodeIn: '00:01:38:04',
    duration: '00:02:14',
    accent: 'teal',
  },
  {
    id: 'dlouhe-formaty',
    title: 'Dlouhé formáty',
    kind: 'YouTube · rozhovory · multicam',
    format: '16:9',
    headline: 'Retence jako řemeslo, ne náhoda',
    body:
      'Dlouhá videa, rozhovory a multicam scény. Práce s křivkou pozornosti — hook, tempo, pauza, pointa. Střih, který se pozná podle toho, že si ho divák nevšimne.',
    role: ['Střih', 'Multicam', 'Retention pass'],
    deliverables: ['Long-form videa', 'Rozhovory', 'Sériová intra'],
    timecodeIn: '00:02:51:19',
    duration: '00:03:28',
    accent: 'orange',
  },
  {
    id: 'motion',
    title: 'Motion design',
    kind: 'Grafika · typografie · packaging',
    format: 'Všechny poměry',
    headline: 'Vrstva, po které video vypadá dodělaně',
    body:
      'Animovaná typografie, přechody, lower thirds a grafický balíček, který drží pohromadě celou sérii. Od jednoho titulku po kompletní vizuální styl formátu.',
    role: ['Motion design', 'Typografie', 'Color'],
    deliverables: ['Kinetic typografie', 'Grafické balíčky', 'Titulkové sady'],
    timecodeIn: '00:03:47:02',
    duration: '00:01:42',
    accent: 'teal',
  },
];

export type ArsenalItem = {
  readonly id: string;
  readonly label: string;
  readonly spec: string;
  readonly group: 'POST' | 'ON SET' | 'CONCEPT';
};

export const ARSENAL: ReadonlyArray<ArsenalItem> = [
  { id: 'ppro', label: 'Premiere Pro', spec: 'Primární NLE · multicam · proxy workflow', group: 'POST' },
  { id: 'ae', label: 'After Effects', spec: 'Motion grafika · kinetická typografie · cleanup', group: 'POST' },
  { id: 'grade', label: 'Color grading', spec: 'Cinematic look · match mezi kamerami', group: 'POST' },
  { id: 'sound', label: 'Sound design', spec: 'Rytmus střihu · SFX · mix pod hudbu', group: 'POST' },
  { id: 'titulky', label: 'Titulky & captions', spec: 'Sazba do safe zones · verze pro ztlumený zvuk', group: 'POST' },
  { id: 'gimbal', label: 'Gimbal', spec: 'Plynulé jízdy · reveal shoty · follow', group: 'ON SET' },
  { id: 'mobile', label: 'Mobilní natáčení', spec: 'Rychlé nasazení · social-first framing', group: 'ON SET' },
  { id: 'multicam', label: 'Multicam setup', spec: 'Rozhovory · sync · záložní stopy', group: 'ON SET' },
  { id: 'idea', label: 'Ideace & scénář', spec: 'Koncept · storyboard · hook first', group: 'CONCEPT' },
  { id: 'rytmus', label: 'Rytmus & tempo', spec: 'Stavba scény · pauza · pointa', group: 'CONCEPT' },
  { id: 'vertical', label: 'Vertikální formáty', spec: '9:16 · 1:1 · safe zones · titulky', group: 'CONCEPT' },
  { id: 'delivery', label: 'Delivery', spec: 'Master · verze pro platformy · archiv', group: 'CONCEPT' },
];

export type ProcessStep = {
  readonly index: string;
  readonly title: string;
  readonly body: string;
};

export const PROCESS: ReadonlyArray<ProcessStep> = [
  {
    index: '01',
    title: 'Ideace',
    body: 'Zjistíme, co má video způsobit. Až potom řešíme, jak vypadá. Hook je součást zadání, ne dodatek.',
  },
  {
    index: '02',
    title: 'Natáčení',
    body: 'Gimbal, mobil, lehký setup. Výbava, která se dostane všude — do studia, do kanceláře i do terénu.',
  },
  {
    index: '03',
    title: 'Střih',
    body: 'Rytmus, tempo, pauzy. Sestavím kostru, která funguje i bez grafiky a bez hudby.',
  },
  {
    index: '04',
    title: 'Motion & grade',
    body: 'Typografie, přechody, barva. Vrstva, která z funkčního videa dělá video, co si pamatujete.',
  },
  {
    index: '05',
    title: 'Delivery',
    body: 'Verze pro každý formát a platformu. Exporty, titulky, archiv. Připravené k publikaci.',
  },
];
