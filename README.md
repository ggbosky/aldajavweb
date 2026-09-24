# Aleš Javorský — cinematic editing portfolio

Interactive portfolio for **Aleš Javorský** — freelance video editor, videomaker and motion
designer. A single-page Next.js app built around one idea: the portrait is the hero, everything
else gets out of its way.

```bash
npm install
npm run dev        # http://localhost:3210
npm run build      # production build
npm run typecheck  # tsc --noEmit, strict
```

## Stack

`next` (App Router) · `framer-motion` · hand-written CSS (no UI framework). TypeScript strict,
including `noUncheckedIndexedAccess`.

## How it fits together

```
app/
  layout.tsx          fonts, metadata, fixed chrome (header, grain)
  page.tsx            section order
  globals.css         the whole design system — tokens, layout, motion
components/
  motion/
    HardCutTransition.tsx  the 0.3 s "cut" reveal + shared stagger variants
    MagneticCard.tsx       cursor-leaning card with a radial highlight
  layout/SiteHeader.tsx    fixed, numberless nav on mix-blend-difference
  sections/           Hero, StatsStrip, TimelineSection, ArsenalSection, ProcessSection, ContactSection
lib/
  site.ts             all copy and portfolio data — edit here, nowhere else
public/images/        ales-blue-portrait.png — the hero portrait
```

### Type

Two faces. **Archivo** carries everything the reader looks at — the hero name and every
section title at 900, body copy at 400. **JetBrains Mono** takes metadata only: section
labels, phase labels, timecodes, the nav.

### The hero

The source frame is a square photo on a lit blue backdrop. A radial `mask-image` throws that
hard edge away and keeps only the lit core, so what survives reads as a key light in a dark
room rather than a photo pasted onto the page. The gradient is sized `closest-side`, which pins
its 100% to the nearest box edge: the disc is then exactly inscribed in the square and the
photo's own straight edges reach zero alpha. A farthest-corner or off-centre circle leaves one
of them showing as a hard cut.

Layout is asymmetric — the name runs down the left in heavy caps, the portrait sits off to the
right and bleeds past the viewport edge. Nothing in it tracks the cursor; the frame holds
still. Below 900 px the portrait moves behind the copy and drops to 60% opacity.

### The arsenal

A spec sheet, not an inventory. Three phases of the job — Koncept, Natáčení, Postprodukce — in
the order they happen, each with the things that happen in it. The grouping does the work an
index column used to do, so no row carries its own number or repeats its own category. Hovering
an item runs an accent bar down its leading edge rather than lighting the whole row.

### Motion

Every reveal is a hard cut — 0.3 s, `cubic-bezier(0.25, 1, 0.5, 1)`, blur and scale collapsing
at once. `prefers-reduced-motion` is honoured throughout.

## Before it goes live

- **The portrait is 400 × 400.** The hero renders it up to ~670 px wide, so it is already
  upscaled ~1.7× — and about 3.4× on a 2× display. Drop in a version at 1600 px or larger
  (same framing) at `public/images/ales-blue-portrait.png`; nothing else has to change.
- `lib/site.ts` — the `SOCIALS` hrefs still point at bare domains rather than real profiles.
- `WORK` describes **types of work, not references** — no client is named anywhere on the site.
  Swapping in real projects means rewriting `title` and `body`; nothing else has to change.
- The `STATS` numbers are estimates, not measured data. Confirm them before publishing.
- The clip previews are CSS-drawn film frames. Drop in real stills or looping `<video>` posters
  in `TimelineSection.tsx` (`.clip__preview`) when the footage is available.
- Add an OG image (`app/opengraph-image.png`) — the metadata is wired up, the asset is not.
