'use client';

import HardCutTransition from '@/components/motion/HardCutTransition';
import { BRAND, SOCIALS } from '@/lib/site';

export default function ContactSection(): React.JSX.Element {
  return (
    <section className="contact" id="kontakt">
      <HardCutTransition>
        <p className="section-label mono">
          <span>SEQ 04</span>
          <i />
          Konec sekvence
        </p>
      </HardCutTransition>

      <HardCutTransition delay={0.06}>
        <h2 className="contact__title">
          Máš materiál.
          <br />
          <em>Udělám z něj hook.</em>
        </h2>
      </HardCutTransition>

      <HardCutTransition delay={0.12}>
        <p className="contact__lead">
          Napiš, co potřebuješ dodat a do kdy. Ozvu se s termínem, cenou a návrhem, jak to
          natočit tak, aby se to dalo dobře sestříhat.
        </p>
      </HardCutTransition>

      <HardCutTransition delay={0.18}>
        <div className="contact__actions">
          <a className="btn btn--primary btn--lg" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
            <span className="btn__glyph" aria-hidden="true">
              ↗
            </span>
          </a>
          <a className="btn btn--ghost btn--lg" href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>
            {BRAND.phone}
          </a>
        </div>
      </HardCutTransition>

      <HardCutTransition delay={0.24}>
        <footer className="footer">
          <ul className="footer__socials mono">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__legal mono">
            © {new Date().getFullYear()} {BRAND.name} · All rights reserved
          </p>
          <p className="footer__tc mono">TC OUT 00:04:12:00 · END OF SEQUENCE</p>
        </footer>
      </HardCutTransition>
    </section>
  );
}
