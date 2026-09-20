/**
 * Single source of truth for all copy + portfolio data.
 * Swap the placeholder contact details / metrics here — nothing else needs to change.
 */

export const BRAND = {
  name: 'ALDA',
  fullName: 'Aleš Javorský',
  role: 'Video Editor · Videomaker · Motion Designer',
  tagline: 'Prvních pět vteřin rozhoduje o všem ostatním.',
  intro:
    'Freelance střihač a videomaker. Přes pět let stříhám desítky videí měsíčně — od sportu a gamingu po komerční kampaně pro sociální sítě. Nejde o techniku, jde o emoci a o to udržet pozornost.',
  email: 'ales.javorsky@example.com', // TODO: nahradit reálným kontaktem
  phone: '+420 000 000 000', // TODO
  location: 'Česká republika · remote',
} as const;

export const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Vimeo', href: 'https://vimeo.com/' },
];

export const STATS: ReadonlyArray<{ value: string; label: string; note: string }> = [
  { value: '5+', label: 'let praxe', note: 'freelance / on-set / post' },
  { value: '10s', label: 'videí měsíčně', note: 'sport · social · podcast' },
  { value: '4K', label: 'delivery', note: '9:16 · 1:1 · 16:9' },
  { value: '24h', label: 'rychlý turnaround', note: 'u matchday obsahu' },
];

export type CaseStudy = {
  readonly id: string;
  readonly client: string;
  readonly sector: string;
  readonly year: string;
  readonly headline: string;
  readonly body: string;
  readonly role: ReadonlyArray<string>;
  readonly deliverables: ReadonlyArray<string>;
  readonly timecodeIn: string;
  readonly duration: string;
  /** 0–1 position of this clip on the master timeline. */
  readonly mark: number;
  readonly accent: 'orange' | 'teal';
};

export const CASE_STUDIES: ReadonlyArray<CaseStudy> = [
  {
    id: 'facr',
    client: 'FAČR',
    sector: 'Sport / Fotbalová asociace ČR',
    year: '2022 — nyní',
    headline: 'Matchday obsah, který drží tempo zápasu',
    body:
      'Sestřihy, highlighty a matchday balíčky pro sociální sítě. Krátké formáty stavěné na jediný cíl: dostat divákovi adrenalin ze stadionu do telefonu dřív, než stihne palcem odjet dál.',
    role: ['Střih', 'Motion grafika', 'Sound design'],
    deliverables: ['Highlight reels', 'Matchday 9:16', 'Sponzorské bumpery'],
    timecodeIn: '00:00:24:12',
    duration: '00:01:06',
    mark: 0.18,
    accent: 'orange',
  },
  {
    id: 'hitradio',
    client: 'Hitrádio',
    sector: 'Rádio / Broadcast',
    year: '2021 — nyní',
    headline: 'Z rozhlasového studia rovnou do feedu',
    body:
      'Kompletní produkce podcastů a video obsahu pro rádio — od nastavení multicam scény a lavalier zvuku po střih, grafiku a nasekání klipů pro Reels a Shorts.',
    role: ['Produkce podcastu', 'Multicam střih', 'Grafický balíček'],
    deliverables: ['Podcast epizody', 'Shorts / Reels', 'Studiová grafika'],
    timecodeIn: '00:01:38:04',
    duration: '00:02:14',
    mark: 0.42,
    accent: 'teal',
  },
  {
    id: 'inside-media',
    client: 'Inside Media',
    sector: 'Komerce / Social campaigns',
    year: '2020 — nyní',
    headline: 'Kampaně stavěné na hook v první vteřině',
    body:
      'Komerční kampaně pro sociální sítě: rychlý střih, kinetická typografie a rytmus navázaný na hudbu. Verze pro každý formát a každou platformu, bez ztráty čitelnosti sdělení.',
    role: ['Koncept', 'Střih', 'After Effects'],
    deliverables: ['Performance ads', 'Brand filmy', 'Kinetic typografie'],
    timecodeIn: '00:02:51:19',
    duration: '00:01:42',
    mark: 0.64,
    accent: 'orange',
  },
  {
    id: 'creators',
    client: 'YouTube tvůrci',
    sector: 'Creator economy / Gaming',
    year: '2019 — nyní',
    headline: 'Retence jako řemeslo, ne náhoda',
    body:
      'Dlouhé formáty pro tvůrce a gaming obsah. Práce s křivkou pozornosti — hook, tempo, pauza, pointa. Střih, který se pozná podle toho, že si ho divák nevšimne.',
    role: ['Střih', 'Retention pass', 'Thumbnail input'],
    deliverables: ['Long-form videa', 'Gaming sestřihy', 'Serialové intra'],
    timecodeIn: '00:03:47:02',
    duration: '00:03:28',
    mark: 0.86,
    accent: 'teal',
  },
];

export type ArsenalItem = {
  readonly id: string;
  readonly label: string;
  readonly spec: string;
  readonly group: 'POST' | 'ON SET' | 'AUDIO' | 'CONCEPT';
};

export const ARSENAL: ReadonlyArray<ArsenalItem> = [
  { id: 'ppro', label: 'Premiere Pro', spec: 'Primární NLE · multicam · proxy workflow', group: 'POST' },
  { id: 'ae', label: 'After Effects', spec: 'Motion grafika · kinetická typografie · cleanup', group: 'POST' },
  { id: 'grade', label: 'Color grading', spec: 'Cinematic look · match mezi kamerami', group: 'POST' },
  { id: 'gimbal', label: 'Gimbal', spec: 'Plynulé jízdy · reveal shoty · follow', group: 'ON SET' },
  { id: 'mobile', label: 'Mobilní natáčení', spec: 'Rychlé nasazení · social-first framing', group: 'ON SET' },
  { id: 'multicam', label: 'Multicam setup', spec: 'Podcast scéna · sync · záložní stopy', group: 'ON SET' },
  { id: 'lav', label: 'Lavalier audio', spec: 'Čistá stopa · denoise · levelling', group: 'AUDIO' },
  { id: 'sound', label: 'Sound design', spec: 'Rytmus střihu · SFX · mix pod hudbu', group: 'AUDIO' },
  { id: 'podcast', label: 'Podcast produkce', spec: 'Od setupu studia po publikaci', group: 'AUDIO' },
  { id: 'idea', label: 'Ideace & scénář', spec: 'Koncept · storyboard · hook first', group: 'CONCEPT' },
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
    body: 'Gimbal, mobil, lavalier. Lehký setup, který se dostane všude — na stadion, do studia i do kanceláře.',
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
