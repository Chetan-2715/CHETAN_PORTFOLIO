# Visual Design Specification

## 1. Color Palette & Design Tokens

### Core Sci-Fi Dark Mode Tokens
| Token Name | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--color-sci-base` | `#030305` | Deep void background |
| `--color-sci-panel` | `rgba(10, 10, 12, 0.75)` | Glassmorphism panel backdrop |
| `--color-sci-border` | `rgba(255, 255, 255, 0.08)`| Subtle glowing borders |
| `--color-sci-accent` | `#ffffff` | Primary text & intense particle highlights |
| `--color-sci-dim` | `#888888` | Secondary labels & sub-hud indicators |

### Particle Simulation Color Palettes
1. **Indigo / Teal (Default)**:
   - Primary Color: `#818cf8` (Indigo 400)
   - Secondary Color: `#2dd4bf` (Teal 400)
2. **Pink / Blue**:
   - Primary Color: `#f472b6` (Pink 400)
   - Secondary Color: `#60a5fa` (Blue 400)
3. **Orange / Rose**:
   - Primary Color: `#fb923c` (Orange 400)
   - Secondary Color: `#e11d48` (Rose 600)

---

## 2. Typography

- **Primary Sans Font**: `Inter`, sans-serif (Weights: 300, 400, 500, 600)
  - Used for Hero Headings, Subheadlines, CTA buttons, and UI labels.
- **Monospace Font**: `JetBrains Mono`, monospace (Weights: 400, 500)
  - Used for node counters, simulation mode labels, status badges, and credits.

```css
font-family: 'Inter', sans-serif;
font-family: 'JetBrains Mono', monospace;
```

---

## 3. Glassmorphism & Visual Effects

### Sci-Panel Glass Spec
```css
.sci-panel {
  background: rgba(10, 10, 12, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}
```

### Scanline & Vignette Overlay
```css
.scanlines {
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.06) 50%,
    rgba(0,0,0,0.06)
  );
  background-size: 100% 4px;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 10;
  opacity: 0.4;
  mix-blend-mode: overlay;
}

.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 120%);
}
```

---

## 4. UI Component Layout & Breakdown

- **Header HUD**: Positioned fixed top (`top-0 left-0 w-full`), padding `p-4 md:p-6`, flex layout.
- **Hero Centerpiece**: Centered overlay (`absolute inset-0 flex flex-col items-center justify-center pointer-events-none`). Text elements use `pointer-events-none` while buttons activate `pointer-events-auto`.
- **Bottom Controls**: Positioned fixed bottom (`bottom-0 left-0 w-full`), flex layout splitting Mode Selector on left and Color Switcher on right.
