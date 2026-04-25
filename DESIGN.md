---
name: "niklasfauteck.de"
version: "1.0.0"

# ── Colors ──────────────────────────────────────────────────────────────────
# Two palette layers: "os" (dark, NiklasOS desktop) and "content" (light,
# shared.css — used by /full/, /blog/, and the root hub).

colors:
  # OS layer — accent
  os-accent:           "#52b788"
  os-accent-light:     "#74c69d"
  os-accent-dark:      "#2d6a4f"
  os-accent-dim:       "rgba(82, 183, 136, 0.15)"

  # OS layer — surfaces
  os-surface-desktop:  "#0c1218"
  os-surface-panel:    "rgba(10, 14, 22, 0.97)"
  os-surface-win-body: "#f7f8f6"
  os-win-tb-active:    "#1f3d2e"
  os-win-tb-idle:      "#182c21"
  os-win-border:       "rgba(82, 183, 136, 0.22)"

  # OS layer — text
  os-text-primary:     "#1a1f2c"
  os-text-secondary:   "#4a5568"
  os-text-muted:       "#718096"
  os-text-titlebar:    "#d4ede2"

  # OS layer — terminal / semantic
  os-term-bg:          "#0d1117"
  os-term-text:        "#e6edf3"
  os-status-success:   "#52b788"
  os-status-error:     "#ff7b72"
  os-status-warning:   "#e3b341"
  os-status-info:      "#79c0ff"
  os-term-gray:        "#8b949e"

  # OS layer — traffic-light buttons
  os-btn-close:        "#ff6058"
  os-btn-min:          "#febc2e"
  os-btn-max:          "#28c840"

  # Content layer — accent
  content-accent:      "#4ECDC4"
  content-accent-dark: "#3AB0A7"

  # Content layer — surfaces
  content-bg:          "#FFFFFF"
  content-bg-light:    "#F8F9FA"
  content-bg-alt:      "#FAFBFC"

  # Content layer — text & borders
  content-primary:     "#2C3E50"
  content-text-secondary: "#6C757D"
  content-border:      "#E5E7EB"

# ── Typography ───────────────────────────────────────────────────────────────
typography:
  fonts:
    ui:   "'DM Sans', system-ui, sans-serif"
    mono: "'JetBrains Mono', 'Courier New', monospace"

  # DM Sans is the workhorse UI font.
  # JetBrains Mono doubles as both terminal font and large display type
  # (headlines, clock, lock-screen counter) — the monospaced rhythm adds
  # a deliberate "tech terminal" aesthetic to oversized numbers.
  scale:
    xs:      { size: "10px", weight: 400 }
    sm:      { size: "11px", weight: 400, letter-spacing: "0.5px" }
    base:    { size: "13px", weight: 400, line-height: 1.5 }
    md:      { size: "14px", weight: 400, line-height: 1.6 }
    lg:      { size: "20px", weight: 500, letter-spacing: "0.5px" }
    xl:      { size: "24px", weight: 600, line-height: 1.3 }
    "2xl":   { size: "36px", weight: 300, letter-spacing: "2px", font: mono }
    "3xl":   { size: "48px", weight: 300, letter-spacing: "2px", font: mono }
    display: { size: "56px", weight: 300, letter-spacing: "2px", font: mono }

# ── Spacing ──────────────────────────────────────────────────────────────────
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "15": "60px"

# ── Border radius ─────────────────────────────────────────────────────────────
rounded:
  none:   "0px"
  xs:     "2px"
  sm:     "4px"
  md:     "6px"
  lg:     "8px"
  xl:     "10px"
  "2xl":  "12px"
  pill:   "9999px"
  circle: "50%"

# ── Elevation / shadows ───────────────────────────────────────────────────────
elevation:
  "1": "0 1px 3px rgba(0,0,0,0.06)"
  "2": "0 4px 12px rgba(0,0,0,0.40)"
  "3": "0 8px 32px rgba(0,0,0,0.50)"
  "4": "0 16px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(82,183,136,0.22)"
  "5": "0 24px 72px rgba(0,0,0,0.65), 0 0 0 1.5px #52b788"
  modal: "0 24px 64px rgba(0,0,0,0.60)"
  focus-ring: "0 0 0 3px rgba(82,183,136,0.25)"

# ── Z-index scale ─────────────────────────────────────────────────────────────
z-index:
  base:       0
  elevated:   10
  app:        200
  drawer:     500
  modal:      800
  panel:      1000
  overlay:    5000
  lockscreen: 8000
  system:     9999

# ── Motion ───────────────────────────────────────────────────────────────────
animation:
  duration:
    instant:      "100ms"
    fast:         "120ms"
    normal:       "150ms"
    slow:         "200ms"
    slower:       "300ms"
    window-open:  "220ms"
    window-close: "150ms"
    progress:     "1200ms"
  easing:
    linear:   "linear"
    default:  "ease"
    snap:     "cubic-bezier(0.34, 1.56, 0.64, 1)"
    material: "cubic-bezier(0.4, 0, 0.2, 1)"
    scroll:   "cubic-bezier(0.25, 0.46, 0.45, 0.94)"

# ── Breakpoints ───────────────────────────────────────────────────────────────
breakpoints:
  mobile:  "max-width: 767px"
  desktop: "min-width: 768px"

# ── Components ────────────────────────────────────────────────────────────────
components:
  window:
    description: "Draggable, resizable application window with traffic-light buttons"
    radius:         "rounded.xl"
    shadow-idle:    "elevation.4"
    shadow-active:  "elevation.5"
    titlebar-height: "28px"
    border:         "1px solid colors.os-win-border"
    animation-open: "animation.duration.window-open animation.easing.snap"
    animation-close: "animation.duration.window-close animation.easing.default"

  panel:
    description: "Fixed taskbar anchored to the bottom of the desktop"
    height:      "44px"
    background:  "colors.os-surface-panel"
    z-index:     "z-index.overlay"

  desktop-icon:
    description: "App launcher tile on the desktop surface"
    size:        "72px"
    icon-size:   "40px"
    radius:      "rounded.xl"
    shadow:      "elevation.2"
    shadow-hover: "elevation.3"

  terminal:
    description: "Full-featured terminal emulator running inside a Window"
    background:  "colors.os-term-bg"
    text:        "colors.os-term-text"
    font:        "typography.fonts.mono"
    font-size:   "typography.scale.base.size"
    radius:      "rounded.sm"

  context-menu:
    description: "Right-click popup with action items"
    background:  "colors.os-surface-panel"
    radius:      "rounded.lg"
    shadow:      "elevation.3"
    border:      "1px solid colors.os-win-border"
    item-transition: "background animation.duration.instant"

  button:
    description: "Interactive button — used in dialogs, toolbars, and forms"
    radius:      "rounded.md"
    padding:     "5px 12px"
    transition:  "background animation.duration.normal, border-color animation.duration.normal"

  badge:
    description: "Inline status label or tag"
    radius:      "rounded.pill"
    font-size:   "typography.scale.xs.size"
    padding:     "2px 8px"

  nav:
    description: "Fixed top navigation bar (content layer — shared.css)"
    background:  "colors.content-bg"
    border-bottom: "1px solid colors.content-border"
    shadow:      "elevation.1"
    z-index:     "z-index.panel"
---

# niklasfauteck.de Design System

## Overview

**niklasfauteck.de** is the personal portfolio of Niklas Fauteck — project
manager, digital transformation coach, and AI-assisted developer. The design
philosophy: *a portfolio that is itself the best application piece.*

The site is engineered to demonstrate craft rather than merely describe it.
Every interaction is intentional: the desktop simulator shows systems
thinking, the terminal proves technical depth, the mini-games prove patience.

**Primary audiences:** recruiters and HR professionals, potential coaching
clients looking for a credible digital-transformation partner.

---

## Color system

The palette is split across two rendering layers that never coexist on screen.

### NiklasOS layer (dark)
The OS layer targets `≥ 768 px` viewports. Deep near-black surfaces
(`#0c1218`) create a focused, immersive workspace. The single accent
`#52b788` (forest green) is used for focus rings, active window borders,
terminal prompt, and progress indicators — enough to guide the eye without
decorating.

Terminal semantics reuse the accent as `success`, supplemented by
`#ff7b72` (error), `#e3b341` (warning), and `#79c0ff` (info) — a palette
intentionally close to GitHub's dark-mode syntax colors so developers feel
at home.

Traffic-light window buttons (`#ff6058` / `#febc2e` / `#28c840`) follow the
macOS convention; they are purely decorative on this Linux-themed UI, which
is part of the joke.

### Content layer (light)
The content layer (`shared.css`) serves `/full/`, `/blog/`, and the root hub
on all viewports that load those pages. White surfaces with `#F8F9FA`
alternates keep the CV readable in ambient light. The accent shifts to
`#4ECDC4` (teal) — warmer and more approachable than the OS green, matching
the coaching / human-side of the brand.

### Semantic color roles
| Token | Hex | Role |
|-------|-----|------|
| `os-status-success` | `#52b788` | Confirmation, completion |
| `os-status-error` | `#ff7b72` | Failures, destructive actions |
| `os-status-warning` | `#e3b341` | Degraded state, caution |
| `os-status-info` | `#79c0ff` | Neutral information, links |

---

## Typography

Two typefaces cover every use case:

**DM Sans** — geometric sans-serif, used for all UI chrome, labels, body
copy, and navigation. Friendly but precise; works at 10 px captions and 24 px
headings without adjustment.

**JetBrains Mono** — monospaced, used for the terminal, code snippets, and
— deliberately — for all large display numbers (clock, lock-screen countdown,
loading counter). The monospaced rhythm makes oversized numerals feel like
system readouts rather than decorative headings.

Display sizes (`2xl`, `3xl`, `display`) always use `weight: 300` (light) to
counteract the visual mass at large sizes. Tight `letter-spacing: 2px` adds a
broadcast-style cadence.

---

## Layout & spacing

A simple 8-point base grid. The panel height (44 px) and the primary spacing
steps (8, 16, 24, 32, 48 px) all land on multiples of 4. Exceptions (`12 px`
gap, `60 px` section padding) are used sparingly for optical corrections.

**Breakpoints:** a single split at `768 px`. Below that threshold the desktop
UI is hidden entirely and the mobile interface renders instead — these are two
separate UIs, not a responsive adaptation of one.

---

## Elevation & depth

Five shadow levels create a clear hierarchy. Levels 1–3 are general-purpose;
levels 4–5 are exclusive to the window manager.

| Level | Use case |
|-------|---------|
| 1 | Cards, nav border (content layer) |
| 2 | Desktop icons, tooltips |
| 3 | Context menus, dropdowns |
| 4 | Inactive window |
| 5 | Active (focused) window — accent border replaces neutral |
| `modal` | Full-screen overlays (login, lock screen) |

The accent-colored border on level 5 (`0 0 0 1.5px #52b788`) is the only
place the accent color appears on a shadow — it doubles as a focus indicator
for the window system.

---

## Shapes

Corner radii follow the perceived size of the element: small controls get
`sm` (4 px) or `md` (6 px), application windows get `xl` (10 px), badges get
`pill` (9999 px). The consistent use of `circle` (50 %) for avatars and
status dots signals "person or live data" across both layers.

---

## Motion

Motion is used functionally, not decoratively. Three principles:

1. **Instant feedback** (100–150 ms): button states, menu highlights,
   icon hover lifts. The user should never wait for a UI response.
2. **Contextual transitions** (200–300 ms): sidebar widths, panel reveals,
   progress bars. Long enough to communicate change, short enough not to
   feel sluggish.
3. **Expressive entrances** (220 ms, `snap` easing): window open animation
   uses `cubic-bezier(0.34, 1.56, 0.64, 1)` — a subtle overshoot that
   mimics a physical object landing. Used only for the window open; the
   close is a plain `ease` fade to avoid the bounce feeling when dismissing.

`prefers-reduced-motion` must disable all transitions and animations.

---

## Components

### Window
The core UI primitive of NiklasOS. Windows are draggable and resizable.
The active window receives `elevation.5` (accent border) and a stronger
drop shadow. The titlebar uses green-tinted dark surfaces to tie back to
the accent without painting every pixel green.

### Terminal
Hosted inside a Window. Font is `JetBrains Mono` at 13 px, background is
the deepest surface color (`#0d1117`) to distinguish it from window body.
Command output uses semantic colors: prompts in `os-accent`, paths in
`os-status-info`, errors in `os-status-error`.

### Panel / Taskbar
44 px tall, near-opaque dark glass (`rgba(10,14,22,0.97)`), pinned to the
viewport bottom at `z-index: 5000`. No blur effect — performance on
low-end devices matters more than the glassmorphism aesthetic.

### Desktop icons
72×72 px tiles with a centered 40×40 px icon graphic. A `translateY(-2px)`
lift on hover plus a larger shadow gives tactile feedback without animation
complexity.

### Context menu
Matches panel background for visual continuity. `border-radius: lg` (8 px)
and a green-tinted border tie it to the OS accent. Items transition
background in `instant` (100 ms) to feel snappy.

---

## Do's and Don'ts

**Do** use `os-accent` exclusively for interactive affordances in the OS
layer (focus rings, active borders, progress fills). Avoid using it purely
decoratively — every green pixel should answer the question "can I interact
with this?"

**Do** keep the OS layer completely dark. No light surfaces inside `os/`.

**Don't** mix OS-layer tokens (`os-*`) into content-layer pages and vice
versa. The two palettes are intentionally separate.

**Don't** animate elements that are off-screen or hidden. Respect
`prefers-reduced-motion` with a single media query block at the end of each
CSS file.

**Do** use `JetBrains Mono` only for terminal output, code, and display
numerals. Body copy in a mono font degrades readability.

**Don't** add new z-index values ad hoc. Use the defined scale; if a new
layer is genuinely needed, add it to `z-index` in this file first.
