'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

const NAV: ReadonlyArray<{ href: string; label: string; index: string }> = [
  { href: '#prace', label: 'Práce', index: '01' },
  { href: '#arsenal', label: 'Arsenal', index: '02' },
  { href: '#proces', label: 'Proces', index: '03' },
  { href: '#kontakt', label: 'Kontakt', index: '04' },
];

export default function SiteHeader(): React.JSX.Element {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.9, ease: HARD_CUT_EASE }}
    >
      <a className="site-header__brand" href="#top">
        <span className="site-header__mark">{BRAND.name}</span>
        <span className="site-header__name">{BRAND.fullName}</span>
      </a>

      <nav className="site-header__nav" aria-label="Hlavní navigace">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="site-header__link">
            <span className="site-header__index">{item.index}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
