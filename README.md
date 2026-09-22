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

Three faces, one job each. **Playfair Display** carries every display line — the hero name,
section titles, work titles, the roster. **Archivo** takes body copy and UI. **JetBrains Mono**
takes metadata only: section labels, group tags, timecodes. Nothing asks for a weight that is
not loaded (Archivo ships 400/600/700), so no face is ever synthesised.

### The hero

The source frame is a square photo on a lit blue backdrop. A radial `mask-image` throws that
hard edge away and keeps only the lit core, so what survives reads as a key light in a dark
room rather than a photo pasted onto the page.

Layout puts the name across the top of the frame and the call to action at the foot, which
leaves the middle — the eyes and the lit glasses — completely clear. The name is set in
`mix-blend-mode: overlay` so the blue light comes through the letterforms; there is an
`@supports` fallback to solid white for engines that cannot be trusted with it.

A spring-damped pointer rig tilts the portrait (±5°) and drifts the copy the other way, which
is what sells the depth. The rig is skipped entirely on a coarse pointer and under
`prefers-reduced-motion`, so neither case pays for a listener it cannot use.

### The roster

`ArsenalSection` is an index until you reach for it: index, title and group are always visible,
the description only resolves on hover or keyboard focus. The reveal animates
`grid-template-rows` from `0fr` to `1fr`, which is the only way to transition into a box whose
height is content-driven — animating `height: auto` would simply snap.

Rows are centre-aligned rather than baseline-aligned, so the description grows *inside* the
height the title already occupies. Hovering therefore never nudges the rows below it, which
would otherwise move the target out from under the cursor. On touch (`hover: none`) the
descriptions are simply always visible.

### Motion

Every reveal is a hard cut — 0.3 s, `cubic-bezier(0.25, 1, 0.5, 1)`, blur and scale collapsing
at once. `prefers-reduced-motion` is honoured throughout.

## Before it goes live

- **The portrait is 400 × 400.** The hero renders it up to ~670 px wide, so it is already
  upscaled ~1.7× — and about 3.4× on a 2× display. Drop in a version at 1600 px or larger
  (same framing) at `public/images/ales-blue-portrait.png`; nothing else has to change.
- `lib/site.ts` — `BRAND.email` and `BRAND.phone` are placeholders, and the `SOCIALS` hrefs
  point at bare domains.
- `WORK` describes **types of work, not references** — no client is named anywhere on the site.
  Swapping in real projects means rewriting `title` and `body`; nothing else has to change.
- The `STATS` numbers are estimates, not measured data. Confirm them before publishing.
- The clip previews are CSS-drawn film frames. Drop in real stills or looping `<video>` posters
  in `TimelineSection.tsx` (`.clip__preview`) when the footage is available.
- Add an OG image (`app/opengraph-image.png`) — the metadata is wired up, the asset is not.
