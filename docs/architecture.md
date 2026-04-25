# Architecture — niklasfauteck.de

## Overview

Static personal portfolio and interactive playground deployed on GitHub Pages.
Zero build tooling — all code runs directly in the browser.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, no preprocessor) |
| Logic | Vanilla JavaScript ES6+ |
| Fonts | Self-hosted DM Sans + JetBrains Mono (OFL 1.1) |
| Hosting | GitHub Pages via CNAME `niklasfauteck.de` |
| Feed | RSS 2.0 (`feed.xml`) |

## Directory structure

```
/
├── index.html          # Landing hub — navigation cards to all areas
├── script.js           # All NiklasOS client-side logic (~6 700 lines)
├── style.css           # NiklasOS styles (~5 900 lines)
├── shared.css          # Shared variables, reset, nav, footer (content layer)
├── os/
│   └── index.html      # NiklasOS desktop simulator entry point
├── full/
│   └── index.html      # Traditional portfolio / CV view
├── blog/
│   ├── index.html      # Blog article viewer
│   └── *.md            # Article source files (rendered client-side)
├── fonts/
│   └── fonts.css       # @font-face declarations
├── docs/               # Technical documentation (this directory)
├── DESIGN.md           # Design system specification
├── CLAUDE.md           # AI assistant working rules
├── robots.txt          # Crawler rules (blocks AI scrapers)
├── sitemap.xml
└── feed.xml            # RSS feed
```

## Two rendering layers

The site has two visually distinct layers that share fonts but use separate
CSS variable sets:

### NiklasOS layer (dark)
- Entry: `os/index.html` + `style.css` + `script.js`
- Linux Mint / Cinnamon-inspired desktop simulator
- Breakpoint `≥ 768 px`: shows desktop, taskbar, window manager
- Breakpoint `< 768 px`: shows Android-inspired mobile interface instead
- Accent: `#52b788` (forest green)

### Content layer (light)
- Shared base: `shared.css` (included by `/full/`, `/blog/`, root `index.html`)
- Clean, document-style layout
- Accent: `#4ECDC4` (teal)

## NiklasOS features

| Feature | Description |
|---------|-------------|
| Boot sequence | Animated loading bar on first visit |
| Login screen | Username/password gate (desktop) |
| Window manager | Drag, resize, minimise, maximise, z-order |
| Terminal | ~20 custom commands, history, tab completion |
| Mini-games | Snake, Tetris, Minesweeper, Memory, Solitaire, Pong, Tic-Tac-Toe, Flappy Bird, Sudoku |
| System Monitor | Skills dashboard rendered as process list |
| Bambu Studio | 3D-printer animation |
| Home Assistant | Fake smart-home integration panel |
| Achievements | Unlock system triggered by terminal commands |
| Mobile UI | Android-like lockscreen, PIN, app grid, notifications |

## Routing

No client-side router. Navigation is file-system based:
- `/` → `index.html` (hub)
- `/os/` → `os/index.html` (NiklasOS)
- `/full/` → `full/index.html` (CV)
- `/blog/` → `blog/index.html` (blog viewer, loads `.md` files via `fetch`)

## SEO & metadata

- `<meta>` Open Graph and Twitter Card tags on all pages
- `schema.org` JSON-LD `Person` structured data on `/full/`
- `sitemap.xml` and `feed.xml` maintained manually
- AI crawlers blocked via `robots.txt` (GPTBot, Claude-Web, anthropic-ai, etc.)
