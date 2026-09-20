# ALDA — cinematic editing portfolio

Interactive portfolio for **Aleš Javorský (ALDA)** — freelance video editor, videomaker and
motion designer. Built as a single-page Next.js app where the page behaves like a cut sequence:
the document scroll *is* the playhead, and a WebGL waveform scrubs with it.

```bash
npm install
npm run dev        # http://localhost:3210
npm run build      # production build
npm run typecheck  # tsc --noEmit, strict
```

## Stack

`next` (App Router) · `three` · `@react-three/fiber` · `@react-three/drei` · `framer-motion` ·
hand-written CSS (no UI framework). TypeScript strict, including `noUncheckedIndexedAccess`.

## How it fits together

```
app/
  layout.tsx          fonts, metadata, fixed chrome (scene, header, HUD, transport, grain)
  page.tsx            section order
  globals.css         the whole design system — tokens, layout, motion
components/
  canvas/
    SceneMount.tsx    defers Three.js to idle so the hero paints first
    SceneCanvas.tsx   fixed full-viewport <Canvas>, camera rig, dust
    DynamicWaveform.tsx  150 instanced bars + glow twin + reflection + playhead marker
  motion/
    HardCutTransition.tsx  the 0.3 s "cut" reveal + shared stagger variants
    MagneticCard.tsx       cursor-leaning card with a radial highlight
  hud/                TimecodeHUD (broadcast read-out), TransportBar (scrub + clip markers)
  layout/SiteHeader.tsx
  sections/           Hero, StatsStrip, TimelineSection, ArsenalSection, ProcessSection, ContactSection
lib/
  site.ts             all copy and portfolio data — edit here, nowhere else
  playhead.ts         scroll → playhead bridge, timecode formatting
  framing.ts          aspect-aware camera distance + compensating waveform scale
```

### The scroll playhead

`lib/playhead.ts` runs **one** `requestAnimationFrame` loop for the whole page. It reads
`window.scrollY`, damps it, tracks scrub velocity and pointer position, and exposes them on a
plain mutable object. The R3F scene reads it inside `useFrame`; the HUD writes straight to the
DOM. Neither path triggers a React render, so the 25 fps timecode and the 150-bar array cost
nothing in reconciliation.

**Why not `useScroll()` from drei:** that hook needs `<ScrollControls>`, which replaces native
page scrolling with its own transformed container — that breaks `position: sticky` (the timeline
ruler), native anchor links, keyboard scrolling and the prerendered document flow. The playhead
store exposes the identical `0 → 1` value without giving any of that up. Per-section progress
(the sticky ruler) uses framer-motion's `useScroll` with a target ref.

### The waveform

Bar height = base frequency × proximity to the playhead × live pulse × scrub jitter. At rest the
array is flat and even so the hero copy has no bright cluster behind it; the spike resolves in
over the first few percent of scroll. Colour lerps teal → orange as the sequence plays, and the
whole array dims as you scroll so it never competes with the text.

Three draw calls do the glow: the bars, a wider additive twin (fake bloom, no post-processing
dependency) and a squashed mirrored copy for the reflection. `lib/framing.ts` keeps the apparent
bar size constant across viewports — on a phone the array simply runs off both edges.

Pointer events stay with the DOM: the canvas is `pointer-events: none` and tracks the cursor
through the shared store, so the scene reacts everywhere without stealing a single click.

### Motion

Every reveal is a hard cut — 0.3 s, `cubic-bezier(0.25, 1, 0.5, 1)`, blur and scale collapsing
at once. `prefers-reduced-motion` is honoured in both CSS and the WebGL loop (the array freezes,
the camera stops drifting).

## Before it goes live

- `lib/site.ts` — `BRAND.email` and `BRAND.phone` are placeholders, and the `SOCIALS` hrefs point
  at bare domains.
- Case-study copy is written from the brief; the client names are real, the wording is a draft.
- The clip previews are CSS-drawn placeholders. Drop in real stills or looping `<video>` posters
  in `TimelineSection.tsx` (`.clip__preview`) when the footage is available.
- Add an OG image (`app/opengraph-image.png`) — the metadata is wired up, the asset is not.
