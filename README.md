# ALDA — portfolio Aleše Javorského

Jednostránkový web střihače a videomakera, který vystupuje pod značkou **ALDA**.

```bash
npm install
npm run dev        # http://localhost:3210
npm run build      # hotový statický web do out/
npm run preview    # out/ na http://localhost:3210
npm run typecheck  # tsc --noEmit, strict
```

## Stack

`next` (App Router) · `framer-motion` · `hls.js` (jen pro přehrávání videí, načte se až po kliknutí) · ručně psané CSS (žádný UI framework).
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
public/prace/         náhledy videí
public/video/<slug>/  videa jako HLS: index.m3u8 + init.mp4 + úseky 000.mp4, 001.mp4, …
public/recenze/       fotky lidí z recenzí
```

## Nasazení — aldastrih.cz

**GitHub Pages:** `.github/workflows/pages.yml` při každém pushi do `main`
sestaví web (`npm run build` → `out/`) a vystaví ho. V repozitáři je potřeba
jednou nastavit *Settings → Pages → Source: GitHub Actions* a *Custom domain:
aldastrih.cz*. DNS u Active24: `A` záznamy domény na 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 a `CNAME` pro `www` na
`ggbosky.github.io`. GitHub Pages neumí vlastní hlavičky, `public/_headers`
platí jen pro Cloudflare.

Alternativa — **Cloudflare Pages:**

Web je statický (`output: 'export'` v `next.config.mjs`): `npm run build` vyrobí
do `out/` hotové soubory a ty servíruje **Cloudflare Pages** (zdarma, komerční
použití povolené, bez limitu přenosu dat — důležité kvůli videím).

Nastavení projektu v Cloudflare Pages:

| | |
|---|---|
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node | 22 (z `.nvmrc`) |

`public/_headers` nastaví správný typ pro HLS playlisty (bez něj by je Safari
nepřehrálo nativně) a dlouhou cache pro videa a balíčky. Adresa webu pro
metadata, `robots.txt` a `sitemap.xml` je `BRAND.url` v `lib/site.ts`.

## Videa

Videa se přehrávají přímo na stránce v obyčejném `<video>` — žádný Disk ani
YouTube. Originály z Alešova Disku mají stovky MB až 2,8 GB, proto jdou na web
zmenšené na 720p a rozdělené na šestivteřinové úseky (HLS s úseky v MP4). Prohlížeč stáhne jen
to, co se zrovna přehrává, a celých deset videí má dohromady ~180 MB. Safari a
iPhone umí HLS samy, ostatním prohlížečům ho přehraje `hls.js`.

Nové video (reels na výšku `720:1280`, YouTube na šířku `1280:720`):

```bash
ffmpeg -nostdin -i original.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
  -c:v libx264 -preset veryfast -crf 25 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p \
  -g 48 -keyint_min 48 -sc_threshold 0 -c:a aac -b:a 96k -ac 2 \
  -f hls -hls_time 6 -hls_playlist_type vod \
  -hls_segment_type fmp4 -hls_fmp4_init_filename init.mp4 \
  -hls_segment_filename "public/video/<slug>/%03d.mp4" public/video/<slug>/index.m3u8
```

Pak náhled do `public/prace/<slug>.jpg` a položka `{ title, slug, thumb }` do `WORK`
v `lib/site.ts`. (`-nostdin` je nutné, když se to pouští ve smyčce — jinak ffmpeg
sežere vstup smyčky.)

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
- **Recenze jsou zatím jedna**, další dvě pošle Aleš. Na stránce se ukazují jen ty,
  které v `REVIEWS` opravdu jsou — žádná prázdná místa.
- **Logo FAČR** ve sdílené složce nebylo. Místo něj jede textová značka; až logo
  dorazí, stačí doplnit `logo` do položky v `CLIENTS`.
- **Čísla ve `STATS` jsou odhady**, ne měřená data. Před spuštěním ověřit.
- **Portrét je 747 × 1024.** V sekci O mně se vykresluje do zhruba 420 px šířky,
  takže je v pohodě; pro větší použití by chtěl větší originál.
