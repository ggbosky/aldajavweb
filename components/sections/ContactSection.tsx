'use client';

import { useState, type FormEvent } from 'react';
import HardCutTransition from '@/components/motion/HardCutTransition';
import { BRAND, CONTACT_ENDPOINT, SOCIALS } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** The three network marks, drawn inline so they take the page colour. */
function SocialIcon({ name }: { name: string }): React.JSX.Element | null {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  if (name === 'Instagram') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'Facebook') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
      </svg>
    );
  }
  if (name === 'LinkedIn') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96zM3 9.75h3.96V21H3V9.75zM9.5 9.75h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-3.96v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21H9.5V9.75z" />
      </svg>
    );
  }
  return null;
}

export default function ContactSection(): React.JSX.Element {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string): string => String(data.get(key) ?? '');

    // No endpoint configured yet: hand the message to the visitor's mail client
    // so the form is never a dead end while the service is being set up.
    if (!CONTACT_ENDPOINT) {
      const body = `Jméno: ${get('jmeno')}\nE-mail: ${get('email')}\n\n${get('zprava')}`;
      window.location.href =
        `mailto:${BRAND.email}?subject=${encodeURIComponent(get('predmet'))}` +
        `&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="contact" id="kontakt">
      <HardCutTransition>
        <h2 className="section-title">
          Pojďme se <em>spojit</em>
        </h2>
      </HardCutTransition>

      <HardCutTransition delay={0.08}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <label className="field">
              <span className="field__label mono">Jméno</span>
              <input className="field__input" type="text" name="jmeno" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label mono">E-mail</span>
              <input className="field__input" type="email" name="email" required autoComplete="email" />
            </label>
          </div>

          <label className="field">
            <span className="field__label mono">Předmět</span>
            <input className="field__input" type="text" name="predmet" required />
          </label>

          <label className="field">
            <span className="field__label mono">Zpráva</span>
            <textarea className="field__input field__input--area" name="zprava" rows={6} required />
          </label>

          <div className="form__foot">
            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Odesílám…' : 'Odeslat zprávu'}
              <span className="btn__glyph" aria-hidden="true">
                ↗
              </span>
            </button>

            {/* Announced politely so a screen reader hears the result without a jump. */}
            <p className="form__status mono" role="status">
              {status === 'sent' && 'Odesláno. Ozvu se co nejdřív.'}
              {status === 'error' && `Nepovedlo se odeslat. Napiš prosím na ${BRAND.email}.`}
            </p>
          </div>
        </form>
      </HardCutTransition>

      <HardCutTransition delay={0.14}>
        <footer className="footer">
          <ul className="footer__socials">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  className="footer__social"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialIcon name={social.label} />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </HardCutTransition>
    </section>
  );
}
