'use client';

import HardCutTransition from '@/components/motion/HardCutTransition';
import { BRAND, SOCIALS } from '@/lib/site';

export default function ContactSection(): React.JSX.Element {
  return (
    <section className="contact" id="kontakt">
      <HardCutTransition>
        <p className="section-label mono">Kontakt</p>
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
        <div className="contact__details">
          <a className="contact__link" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
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
        </footer>
      </HardCutTransition>
    </section>
  );
}
