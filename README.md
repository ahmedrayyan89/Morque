<p align="center">
  <br>
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&duration=3000&pause=1000&color=00C8FF&center=true&vCenter=true&width=435&lines=WIND+TUNNEL+CALIBRATION+COMPLETE;MORQUE;ENGINEERED+IN+THE+WIND.;PERFECTED+IN+SILENCE." alt="Typing SVG" />
</p>

<h1 align="center">MORQUE</h1>

<p align="center">
  <em>A scroll-driven cinematic experience for a fictional hypercar.</em><br>
  <em>193 frames. One perfect form. Zero drag.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white&labelColor=080C12" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=080C12" />
  <img src="https://img.shields.io/badge/Framer_Motion-Scroll_Linked-EFEFEF?style=flat-square&logo=framer&logoColor=black&labelColor=00C8FF" />
  <img src="https://img.shields.io/badge/HTML5_Canvas-Hardware_Accelerated-E34F26?style=flat-square&logo=html5&logoColor=white&labelColor=080C12" />
  <img src="https://img.shields.io/badge/Awwwards-Ready-FF4D00?style=flat-square&labelColor=080C12" />
</p>

<p align="center">
  <a href="https://morque.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-morque.netlify.app-00C8FF?style=flat-square&labelColor=080C12&logoColor=white" />
  </a>
</p>

---

## 🏁 The Experience

**MORQUE** is not a website. It is a **wind tunnel simulation** that happens to run in a browser.

As you scroll, a 193-frame cinematic sequence plays inside a steel-and-glass testing facility. The hypercar begins as a glowing wireframe ghost. Wind smoke floods the tunnel. Carbon fiber panels materialize section by section. The camera locks into a dramatic side-profile money shot. Then the car launches into white light.

Every pixel is synchronized to the scroll position. Every text block is mapped to a specific frame range. The background shifts from cold cyan to plasma orange as the story progresses.

**No snapping. No slides. One continuous timeline.**

---

## Architecture

This project treats the browser as a **real-time playback engine**, not a document renderer.

| Layer | Responsibility | Tech |
|-------|---------------|------|
| **Playback Engine** | 193-frame image sequence, synced to scroll | HTML5 Canvas 2D + `requestAnimationFrame` |
| **Scroll Physics** | Global progress (0→1), velocity, direction | Custom hook with `rAF`-throttled scroll |
| **Preload Manager** | Batched image decoding, priority queue | `useImageSequence` (20 frames initial → background loading) |
| **Story Beats** | Section entrance/exit timing, copy opacity | Framer Motion + custom `beatProgress` math |
| **Ambient Layer** | Reactive glow, tunnel ceiling, flow lines | SVG + CSS radial gradients |
| **UI Chrome** | Glassmorphism nav, progress bar, cursor | Framer Motion + CSS backdrop-filter |

### The Canvas Engine

The core renderer uses a **floating-point frame index** with linear interpolation for buttery, hardware-accelerated playback:

```typescript
currentFrameF.current = lerp(currentFrameF, targetFrame, 0.10)
```

### Scroll-Linked Storytelling

The 2000vh scroll container is divided into 5 beats:
HERO           (0–15%)   → Wireframe reveal, brand drop
AERODYNAMICS   (15–40%)  → Wind smoke, live data panel
MATERIALIZATION(40–60%)  → Carbon fiber build-up
MONEY SHOT     (60–80%)  → Locked side profile, hero frame
LAUNCH         (80–100%) → Acceleration, plasma CTA

Each section calculates its own `localProgress` from the global scroll value. Opacity and transform are interpolated dynamically, no scroll-snapping, no jarring transitions.

---

## Design System

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Void | `#080C12` | Page background — matches tunnel for seamless blending |
| Ice | `#E8F4FF` | Tunnel strip lighting, primary typography |
| Cyan | `#00C8FF` | Wireframe glow, data overlays, accents |
| Plasma | `#FF4D00` | Exhaust fire, launch climax |
| Steel | `#4A7FA5` | Borders, dividers, technical readouts |

### Typography

- **Bebas Neue** — Display headlines (aggressive, automotive editorial)
- **Space Grotesk** — Body copy (sharp, technical, geometric)
- **JetBrains Mono** — Data readouts, labels, micro-copy

### Effects

- Custom crosshair cursor with lag-ring physics
- Per-beat ambient glow shifting from cyan to orange
- Animated SVG aerodynamic flow lines during wind tunnel beat
- Perspective tunnel ceiling grid with fluorescent strip lighting
- Subtle film grain overlay for cinematic texture
- Vignette and watermark masking on canvas

---

## Performance

- **Batched preloading** — First 20 frames load immediately; remaining 173 load in background chunks to prevent main-thread blocking
- **Skip-frame rendering** — Canvas skips `drawImage` calls if the rounded frame index hasn't changed
- **Hardware acceleration** — All UI layers use `transform` and `opacity` only, no `top`/`left` animations
- **Passive event listeners** — Scroll and resize listeners are non-blocking
- **DPR cap** — Canvas scales to `min(devicePixelRatio, 2)` to prevent 4K performance cliffs

Target: 60fps on desktop, smooth degradation on lower-end hardware.

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/ahmedrayyan89/Morque.git
cd Morque

# 2. Install
npm install

# 3. Add your frames
# Place frame_0001.webp through frame_0193.webp into:
# /public/frames/

# 4. Run dev server
npm run dev

# 5. Build for production
npm run build
```

> **Note:** This project uses a 193-frame image sequence. The frames are not included in this repository due to file size. Place your own sequence in `/public/frames/` following the naming convention `frame_0001.webp` → `frame_0193.webp`.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript (strict)
- **Styling** — Tailwind CSS + CSS variables for design tokens
- **Animation** — Framer Motion for scroll-linked text and layout transitions
- **Rendering** — HTML5 Canvas 2D for image sequence playback
- **Fonts** — Bebas Neue, Space Grotesk, JetBrains Mono (Google Fonts)

---

## Browser Support

- Chrome / Edge / Safari / Firefox (latest)
- Desktop-first experience
- Mobile: responsive typography and simplified layout — custom cursor and data panels hidden on small screens

---

## Credits

**Concept & Development** — Rayyan Ahmed 

**Design Direction** — Apple-level editorial meets Aston Martin engineering documentation

**Inspiration** — Wind tunnel aesthetics, Awwwards automotive showcases, VFX reels
