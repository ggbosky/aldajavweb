# Aleš Javorský — cinematic editing portfolio

Interactive portfolio for **Aleš Javorský** — freelance video editor, videomaker and motion
designer. Built as a single-page Next.js app where the page behaves like a cut sequence: the
document scroll *is* the playhead, and a WebGL film strip runs through a gate as you scrub.

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
    Filmstrip.tsx     30 instanced frames + perforations + glow twin + reflection + gate
  motion/
    HardCutTransition.tsx  the 0.3 s "cut" reveal + shared stagger variants
    MagneticCard.tsx       cursor-leaning card with a radial highlight
  hud/                TimecodeHUD (broadcast read-out), TransportBar (scrub + clip markers)
  layout/SiteHeader.tsx
  sections/           Hero, StatsStrip, TimelineSection, ArsenalSection, ProcessSection, ContactSection
lib/
  site.ts             all copy and portfolio data — edit here, nowhere else
  playhead.ts         scroll → playhead bridge, timecode formatting
  framing.ts          strip geometry + aspect-aware camera distance
```

### The scroll playhead

`lib/playhead.ts` runs **one** `requestAnimationFrame` loop for the whole page. It reads
`window.scrollY`, damps it, tracks scrub velocity and pointer position, and exposes them on a
plain mutable object. The R3F scene reads it inside `useFrame`; the HUD writes straight to the
DOM. Neither path triggers a React render, so the 25 fps timecode and the 30-frame strip cost
nothing in reconciliation.

**Why not `useScroll()` from drei:** that hook needs `<ScrollControls>`, which replaces native
page scrolling with its own transformed container — that breaks `position: sticky` (the timeline
ruler), native anchor links, keyboard scrolling and the prerendered document flow. The playhead
store exposes the identical `0 → 1` value without giving any of that up. Per-section progress
(the sticky ruler) uses framer-motion's `useScroll` with a target ref.

### The film strip

Scroll pulls the strip through a fixed gate at screen centre, so scrolling *is* scrubbing.
A frame lights up as it reaches the gate and fades as it leaves; colour lerps teal → orange as
the sequence plays, and the whole strip dims as you scroll so it never competes with the text.
At rest the strip stays evenly lit, so the hero copy has no bright cluster behind it — the gate
highlight resolves in over the first few percent of scroll.

Frames never change size, so their instance matrices are written once and only the instance
colours are touched per frame. Three more draw calls carry the look: a wider additive twin
behind each frame (fake bloom, no post-processing dependency), a squashed mirrored copy for the
reflection, and one instanced mesh for the backlit perforations. The frame image is a shared
canvas-drawn luminance mask — a lit sky, a horizon flare and a dark foreground — tinted per
instance, so the strip reads as exposed film without shipping a single image asset.

`lib/framing.ts` holds the strip geometry and picks the camera distance. On a phone the rig
stops backing off and simply shows fewer, larger frames — the strip runs off both edges, which
is what a film strip should do anyway.

Pointer events stay with the DOM: the canvas is `pointer-events: none` and tracks the cursor
through the shared store, so the scene reacts everywhere without stealing a single click.

### Motion

Every reveal is a hard cut — 0.3 s, `cubic-bezier(0.25, 1, 0.5, 1)`, blur and scale collapsing
at once. `prefers-reduced-motion` is honoured in both CSS and the WebGL loop (the strip stops
weaving, the camera stops drifting).

## Before it goes live

- `lib/site.ts` — `BRAND.email` and `BRAND.phone` are placeholders, and the `SOCIALS` hrefs point
  at bare domains.
- `WORK` describes **types of work, not references** — no client is named anywhere on the site.
  Swapping in real projects means rewriting `title` and `body`; nothing else has to change.
- The `STATS` numbers are estimates, not measured data. Confirm them before publishing.
- The clip previews are CSS-drawn film frames. Drop in real stills or looping `<video>` posters
  in `TimelineSection.tsx` (`.clip__preview`) when the footage is available.
- Add an OG image (`app/opengraph-image.png`) — the metadata is wired up, the asset is not.
