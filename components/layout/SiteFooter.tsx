import Image from 'next/image';
import { BRAND, SOCIALS } from '@/lib/site';

const LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '#top', label: 'Úvod' },
  { href: '#o-mne', label: 'O mně' },
  { href: '#prace', label: 'Práce' },
  { href: '#recenze', label: 'Recenze' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function SiteFooter(): React.JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__statement">Prvních pár vteřin rozhoduje.</p>

        <div>
          <p className="footer__col-title mono">Rozcestník</p>
          <nav className="footer__links" aria-label="Patička">
            {LINKS.map((link) => (
              <a key={link.href} className="footer__chip" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="footer__col-title mono">Kontakt</p>
          <a className="footer__mail" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
          <div className="footer__links">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                className="footer__chip"
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The mark, blown up and bled off the bottom edge. */}
      <div className="footer__watermark" aria-hidden="true">
        <Image src="/images/alda-napis.png" alt="" width={1960} height={365} />
      </div>
    </footer>
  );
}
