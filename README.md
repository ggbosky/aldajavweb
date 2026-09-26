# ALDA — portfolio Aleše Javorského

Jednostránkový web střihače a videomakera, který vystupuje pod značkou **ALDA**.

```bash
npm install
npm run dev        # http://localhost:3210
npm run build      # produkční build
npm run typecheck  # tsc --noEmit, strict
```

## Stack

`next` (App Router) · `framer-motion` · ručně psané CSS (žádný UI framework).
TypeScript strict včetně `noUncheckedIndexedAccess`.

## Struktura

```
app/
  layout.tsx          fonty, metadata, fixní chrome (hlavička, zrno)
  page.tsx            pořadí sekcí
  globals.css         celý designsystém — tokeny, layout, pohyb
components/
  motion/             HardCutTransition (0,3s střih) + MagneticCard
  layout/SiteHeader   fixní navigace, logo vlevo
  sections/           Hero, StatsStrip, About, Work, Clients, Reviews, Contact
lib/site.ts           veškerý text a data — edituje se jen tady
public/images/        alda-logo.png (značka), alda-napis.png (nápis), ales-portret.jpg
public/klienti/       loga klientů
```

## Barva

Jedna značková barva: **azurová `#00ffff`** na černé `#050505`. Dřívější tyrkysová
a oranžová jsou pryč — nápis ALDA je čistě bílý a dvě další barvy se s ním praly.
Token je `--cyan` v `globals.css`.

## Na co si dát pozor

**Loga klientů** přicházejí každé v jiné barvě — Inside Games v tmavě modré, Hitrádio
v červené. Na černém pozadí jedno z nich zmizí a druhé si konkuruje s akcentem, proto
je `.clients__logo` sráží přes `filter: brightness(0) invert(1)` na jednotnou bílou.
Nové logo stačí nahrát do `public/klienti/` a přidat do `CLIENTS`; barvu řeší CSS.

**Portrét v sekci O mně** se nerozplývá maskou, ale překryvem v barvě stránky. Pozadí
je plochá `#050505`, takže výsledek vypadá stejně — a narozdíl od masky se dá vrstvit,
což je potřeba, aby dojely všechny čtyři hrany.

**Přepínač v sekci Práce** nese `aria-pressed`. Aktivní stav pozná oko podle azurové
výplně, čtečka podle atributu — barva sama o sobě informaci nenese.

## Co ještě chybí

- **`CONTACT_ENDPOINT` v `lib/site.ts` je prázdný.** Statický web e-mail sám odeslat
  neumí. Dokud je konstanta prázdná, odeslání formuláře otevře předvyplněný e-mail
  v poštovním klientovi. Po vložení endpointu z Formspree nebo Web3Forms (registrace
  zdarma) začne formulář odesílat na pozadí, včetně stavové hlášky.
- **`WORK` má prázdné seznamy videí.** Aleš dodá výběr. Formát jedné položky je
  v komentáři u konstanty; do té doby sekce vykreslí „Výběr videí připravujeme."
- **`REVIEWS` je prázdné pole.** Stejný princip.
- **Logo FAČR** ve sdílené složce nebylo. Místo něj jede textová značka; až logo
  dorazí, stačí doplnit `logo` do položky v `CLIENTS`.
- **Čísla ve `STATS` jsou odhady**, ne měřená data. Před spuštěním ověřit.
- **Portrét je 747 × 1024.** V sekci O mně se vykresluje do zhruba 420 px šířky,
  takže je v pohodě; pro větší použití by chtěl větší originál.
