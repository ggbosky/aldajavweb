'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '#o-mne', label: 'O mně' },
  { href: '#prace', label: 'Práce' },
  { href: '#recenze', label: 'Recenze' },
  { href: '#kontakt', label: 'Kontakt' },
];

/**
 * The mark sits top-left and the nav runs opposite it. `mix-blend-difference`
 * keeps both legible over anything without a backdrop of its own.
 */
export default function SiteHeader(): React.JSX.Element {
  return (
    <motion.header
      className="site-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: HARD_CUT_EASE }}
    >
      <a className="site-header__brand" href="#top" aria-label={BRAND.name}>
        <Image
          src="/images/alda-logo.png"
          alt={BRAND.name}
          width={1298}
          height={1067}
          priority
        />
      </a>

      <nav className="site-header__nav" aria-label="Hlavní navigace">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="site-header__link mono">
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
