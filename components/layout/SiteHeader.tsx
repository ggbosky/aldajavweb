'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '#o-mne', label: 'O mně' },
  { href: '#prace', label: 'Moje práce' },
  { href: '#recenze', label: 'Recenze' },
  { href: '#kontakt', label: 'Kontakt' },
];

/**
 * "Aleš (logo) Javorský" on the left, the nav on the right. A black fade sits
 * behind the bar so the page dissolves under it as it scrolls past instead of
 * colliding with the name. On a phone the nav folds into a menu button and
 * the bar is solid, tucking away while scrolling down.
 */
export default function SiteHeader(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  /*
   * Scrolling down tucks the bar away, scrolling up brings it back. The CSS
   * only applies the tuck on a phone, where a fixed bar over the content is
   * what got in the way; near the top it always shows.
   */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = (): void => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu, the way any overlay should.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      className={`site-header${open ? ' is-open' : ''}${hidden && !open ? ' is-hidden' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: HARD_CUT_EASE }}
    >
      <a className="site-header__brand" href="#top" aria-label={BRAND.fullName}>
        <span className="site-header__name">Aleš</span>
        <Image src="/images/alda-logo.png" alt="" width={1298} height={1067} priority />
        <span className="site-header__name">Javorský</span>
      </a>

      <button
        type="button"
        className="site-header__toggle"
        aria-expanded={open}
        aria-controls="hlavni-navigace"
        aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="hlavni-navigace" className="site-header__nav" aria-label="Hlavní navigace">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="site-header__link mono"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
