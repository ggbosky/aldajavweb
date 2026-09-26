'use client';

import { useState, type FormEvent } from 'react';
import HardCutTransition from '@/components/motion/HardCutTransition';
import { BRAND, CONTACT_ENDPOINT, SOCIALS } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

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
        <h2 className="contact__title">
          Pojďme se <em>spojit</em>
        </h2>
      </HardCutTransition>

      <HardCutTransition delay={0.06}>
        <p className="contact__lead">
          Napiš, co potřebuješ dodat a do kdy. Ozvu se s termínem, cenou a návrhem, jak to
          natočit tak, aby se to dalo dobře sestříhat.
        </p>
      </HardCutTransition>

      <HardCutTransition delay={0.12}>
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

      <HardCutTransition delay={0.18}>
        <ul className="contact__socials mono">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </HardCutTransition>
    </section>
  );
}
