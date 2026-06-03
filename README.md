# QTL Homepage Animation Test

A vanilla HTML/CSS/JS sandbox for prototyping homepage animations, served with Vite for hot module replacement.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Stat Card Load Animation

Each stat card contains three independently animated elements: a circular icon, a header (the stat number), and a sub-header (the label). The card container itself does **not** animate — it is always visible and stationary.

### Stagger
Cards animate left-to-right with an 80ms stagger. Each card has a CSS custom property `--stat-card-index` (0, 1, 2, 3, 4…) set via `:nth-child` selectors. The delay for each card is:
```
animation-delay: calc(80ms * var(--stat-card-index))
```

### Icon animation
- **Keyframe:** fades in (`opacity: 0 → 1`) while rising up (`translateY(35px) → translateY(0)`) and scaling up (`scale(0.6) → scale(1.0)`)
- **Duration:** 250ms
- **Easing:** `cubic-bezier(0.34, 2.0, 0.64, 1)` — a spring curve that overshoots past the final position before settling back
- **Fill mode:** `backwards` (element stays at the `from` state during its stagger delay)
- **Delay:** `80ms × index`

### Header + sub-header animation
- **Keyframe:** fades in (`opacity: 0 → 1`) while rising up (`translateY(20px) → translateY(0)`). No scale change.
- **Duration:** 250ms
- **Easing:** same spring curve `cubic-bezier(0.34, 2.0, 0.64, 1)`
- **Fill mode:** `backwards`
- **Delay:** `80ms × index + 50ms` — starts 50ms after the icon

### Hover effect
On hover, the card scales up to `scale(1.1)` with an animated `box-shadow`. Both transition smoothly:
```
transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1);
```
The hovered card gets `z-index: 2` so it layers above its neighbors. The link bar below the cards sits at `z-index: 1` to stay above cards during the load animation but below hovered cards.

### Reduced motion
All three animations are disabled (`animation: none`, `opacity: 1`, `transform: none`) under `prefers-reduced-motion: reduce`.
