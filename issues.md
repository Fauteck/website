# Verbesserungsvorschläge — fauteck.eu

Priorisierte Liste potenzieller Issues aus einer Code-Analyse vom 2026-04-23.
Severity: **P0 = Blocker**, **P1 = wichtig**, **P2 = nice-to-have**.
Effort: **S** (< 1h), **M** (halber Tag), **L** (> 1 Tag).

---

## P0 — Blocker

### 1. Domain-Inkonsistenz zwischen CNAME, canonical, og:url und CLAUDE.md
**Severity:** P0 · **Effort:** S

Im Repo existieren **drei verschiedene Domain-Angaben** parallel:
- `CNAME` → `niklasfauteck.de` (das ist die aktive Produktiv-Domain)
- `canonical` und `og:url` in allen HTML-Dateien → `https://fauteck.github.io/website/…`
- `CLAUDE.md` → spricht von `fauteck.eu`

Folgen: Google dedupliziert auf die Canonical-URL (`fauteck.github.io`), nicht auf `niklasfauteck.de`. OG/Twitter-Scraper, RSS-Reader und Schema.org-Parser zeigen auf die falsche Domain. `feed.xml` nutzt ebenfalls `fauteck.github.io/website/` (z. B. `<link>`, `<guid>`).

**Fix:** Klären, welche Domain die kanonische ist, und dann **konsistent** in:
- `index.html`, `kontakt.html`, `impressum.html`, `agb.html`, `datenschutz.html`, `blog/index.html` → `<link rel="canonical">` und `<meta property="og:url">`
- `feed.xml` → `<link>`, `<atom:link href>`, `<guid>`
- `CLAUDE.md` → Domain-Nennung
- JSON-LD in `index.html:22` → `url`-Feld

---

### 2. Fehlende `og:image` / Twitter Cards
**Severity:** P0 · **Effort:** S

Keine Datei enthält `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` oder `og:image`. Beim Teilen auf LinkedIn, Mastodon (`bonn.social`), X oder in Slack/iMessage entsteht nur ein reiner Text-Preview ohne Bild.

**Fix:** In jede HTML-Seite (index, kontakt, impressum, agb, datenschutz, blog/index):
```html
<meta property="og:image" content="https://niklasfauteck.de/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="…">
<meta name="twitter:description" content="…">
<meta name="twitter:image" content="https://niklasfauteck.de/og-image.png">
```
Plus ein 1200×630 PNG/JPG im Repo-Root (`og-image.png`).

---

## P1 — Wichtig

### 3. Event-Listener ohne Cleanup in `script.js` (OS-Simulation)
**Severity:** P1 · **Effort:** M

`script.js` enthält **131 `addEventListener`-Aufrufe** und **0 `removeEventListener`-Aufrufe**. Da die Datei nur in `os/index.html` eingebunden wird, betrifft das nur die Desktop-OS-Simulation — dort aber kritisch: Fenster werden dynamisch erzeugt/geschlossen, und tote Listener auf zerstörten DOM-Elementen akkumulieren bei langer Nutzung.

**Fix:**
- Beim Schließen eines Fensters/Overlays alle eigenen Listener mit `removeEventListener` abhängen, oder einen `AbortController`-Pattern einführen (`el.addEventListener('click', fn, { signal: controller.signal })` → `controller.abort()` beim Teardown).
- Alternativ Event-Delegation auf einen stabilen Parent-Container statt pro-Element-Listener.

Betroffen: `/home/user/website/script.js` (6.674 Zeilen).

---

### 4. `script.js` und `style.css` sind Monolithen ohne Splitting
**Severity:** P1 · **Effort:** L

- `script.js`: 306 KB, 6.674 Zeilen — wird nur in `os/` gebraucht, liegt aber im Repo-Root.
- `style.css`: 180 KB, 5.919 Zeilen — enthält Regeln für OS-Desktop, Portfolio (`full/`), Blog und Hauptseiten gemischt.
- `shared.css` (4.7 KB) wird von den Hauptseiten genutzt — gut. Aber `style.css` wird (wahrscheinlich nur) von `os/` gezogen.

**Fix:**
- `script.js` nach `os/os.js` verschieben (oder in Module zerlegen: `os-wm.js`, `os-apps.js`, …).
- `style.css` ebenso nach `os/os.css` verschieben — bzw. aufteilen in `os-core.css`, `os-apps.css`.
- Prüfen, ob `full/` und `blog/` eigene CSS haben — ansonsten isolieren.

Ziel: Hauptseiten (`index.html`, `kontakt.html`, …) laden nur `shared.css` + `fonts/fonts.css` (aktuell schon so) und keinen 180-KB-Ballast.

---

### 5. Accessibility — fehlende Skip-Links und ARIA-Label auf Icons
**Severity:** P1 · **Effort:** S

- Kein `<a class="skip-link" href="#main">`-Sprungziel für Keyboard/Screenreader-Nutzer.
- Inline-SVG-Icons in `kontakt.html`/`impressum.html` haben keine `aria-label` oder `<title>`.
- `components.js:20` setzt `aria-label="Menu Toggle"` auf den Hamburger-Button — gut —, aber der Button ist ein `<div>`, nicht `<button>` (kein Keyboard-Fokus, keine Enter/Space-Semantik).

**Fix:**
- Skip-Link vor `<nav>` einfügen (in `components.js`).
- Hamburger-`<div class="mobile-toggle">` → `<button type="button" aria-expanded="false" aria-controls="nav-menu">`.
- SVG-Icons: entweder `role="img"` + `<title>` ergänzen oder `aria-hidden="true"`, wenn dekorativ.

---

### 6. WCAG-Kontrast für `--text-secondary` / `--text-muted` ungeprüft
**Severity:** P1 · **Effort:** M

`shared.css` und `style.css` definieren CSS-Variablen für abgestufte Textfarben. Ohne Audit mit z. B. `axe`/Lighthouse ist nicht belegbar, dass alle Kombinationen AA-Kontrast (4.5:1) erreichen — besonders auf farbigen Karten/Buttons.

**Fix:** Lighthouse- oder `pa11y`-Lauf gegen deployte Seite + Korrektur der Variablen. Kann in einer CI-Action automatisiert werden (siehe #12).

---

### 7. `feed.xml` manuell gepflegt — Sync-Risiko
**Severity:** P1 · **Effort:** M

Aktuell sind `blog/*.md` (9 Dateien) und `feed.xml` (9 `<item>`) synchron — aber `feed.xml` wird per Hand gepflegt. Bei jedem neuen Post muss der/die Autor:in daran denken. `<lastBuildDate>` wird nicht automatisch aktualisiert.

**Fix:**
- Kleines Python/Node-Script (`scripts/build-feed.js`), das aus `blog/*.md` (Frontmatter oder Heuristik) die Items generiert und auf GitHub-Action-Run bei jedem Push auf `main` ausführt.
- Alternativ: Checkliste in `CLAUDE.md` + `CONTRIBUTING.md` für redaktionelle Schritte.

---

### 8. Keine `<meta name="robots">`-Strategie für OS/Minigames
**Severity:** P1 · **Effort:** S

`impressum.html`, `datenschutz.html`, `agb.html` haben korrekt `noindex, follow`. Aber:
- `os/index.html`, `full/index.html`, `minigames-export/*.md` — unklar, ob bewusst indexiert.
- `os/` ist eine Tech-Demo, keine SEO-Zielseite. Ggf. mit `noindex` von der Hauptindex-Ergebnisseite fernhalten.

**Fix:** Strategie definieren und per `<meta robots>` oder `robots.txt`-`Disallow` umsetzen.

---

## P2 — Nice-to-have

### 9. Kein `defer` / `async` auf `<script>`-Tags
**Severity:** P2 · **Effort:** S

Alle HTML-Dateien laden `components.js` und `shared.js` am Ende von `<body>`, also nicht render-blocking. Trotzdem ist `<script src="components.js" defer>` (+ DOMContentLoaded-Garantie) zukunftssicherer, vor allem wenn einmal `async`-Third-Parties dazukämen.

---

### 10. Kein `preload` / `preconnect` für Webfonts
**Severity:** P2 · **Effort:** S

`fonts/fonts.css` wird verlinkt, darin `@font-face`-Regeln mit `font-display: swap` — gut. Aber ohne `<link rel="preload" as="font" href="fonts/…woff2" crossorigin>` im `<head>` entsteht beim First Paint ein FOIT/FOUT.

**Fix:** Für die 1–2 kritischen Schriftschnitte (Regular + Bold) `preload` setzen.

---

### 11. `style.css` enthält 20× `!important`
**Severity:** P2 · **Effort:** M

Nicht grundsätzlich schlimm, aber ein Indikator für Spezifitäts-Workarounds. Beim Splitten von `style.css` (#4) parallel beheben: Stattdessen Quelltext-Reihenfolge und BEM/utility-Namespaces nutzen.

---

### 12. Kein CI/Tooling — weder Lint, Format, Minify noch Link-Checker
**Severity:** P2 · **Effort:** L

Kein `package.json`, keine GitHub-Action außer Pages-Default. Zero Dependencies ist angenehm schlank, aber:
- Kein `prettier`/`eslint` → Stil-Drift
- Kein `html-validate` / `lighthouse-ci` → A11y- und SEO-Regressionen unentdeckt
- Kein Minify → 480 KB JS+CSS unkomprimiert ausgeliefert (gzip/brotli durch GitHub Pages hilft, aber minify spart zusätzlich)
- Kein `lychee`/`linkinator` → tote Links (z. B. nach Domain-Umzug, siehe #1) bleiben unentdeckt

**Fix:** Minimale `.github/workflows/ci.yml` mit:
- `prettier --check` (HTML/CSS/JS/MD)
- `lychee` für Link-Check
- `pa11y-ci` gegen deployte Staging-URL oder lokalen Python-Server

---

### 13. CSP via `<meta>` für Defense-in-Depth
**Severity:** P2 · **Effort:** S

GitHub Pages setzt keine CSP. Da die Site vollständig self-hosted ist (keine CDN-Skripte, kein Analytics), wäre eine strikte Content-Security-Policy problemlos:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none';">
```

Schutz gegen versehentlich eingeschleustes externes Script/iframe. Vorher testen, ob inline-JSON-LD und data:-Icons bleiben funktionsfähig.

---

### 14. Blog-Posts haben keine individuellen `<meta>` / Schema.org
**Severity:** P2 · **Effort:** M

`blog/*.md` werden vermutlich clientseitig gerendert (Markdown → HTML via JS). Dadurch kriegen einzelne Artikel:
- Keinen eigenen `<title>` auf URL-Ebene (Suchmaschine/Scraper sieht nur `blog/index.html`-Meta).
- Kein `BlogPosting`-JSON-LD.
- Keine individuellen OG-Tags → LinkedIn-Previews eines Artikellinks zeigen immer dieselbe Blog-Übersicht.

**Fix:** Entweder statische HTML-Seiten pro Post generieren (kleiner Build-Step, passt zu #7+#12) oder — falls clientseitig bleiben soll — `history.pushState` + `document.title` / dynamisch gesetzte Meta-Tags (hilft allerdings nicht für Social-Scraper, die kein JS ausführen).

---

### 15. Redundante Inline-Styles in rechtlichen Seiten
**Severity:** P2 · **Effort:** M

`kontakt.html`, `impressum.html`, `datenschutz.html`, `agb.html` haben jeweils ähnliche inline-`<style>`-Blöcke (Container/Card/Section-Styling), die bereits in `shared.css` existieren oder dort hingehören.

**Fix:** Duplikate in `shared.css` konsolidieren, inline-`<style>` in den HTMLs ersatzlos entfernen.

---

### 16. Kein Lazy-Loading auf Bildern
**Severity:** P2 · **Effort:** S

`grep loading="lazy"` findet 5 Treffer — alle vermutlich in `blog/` oder `full/`. Auf `index.html` gibt es aber nur 1 `<img>` (Profilfoto) ohne `loading`-Attribut. Profilfoto ist above-the-fold → kein `lazy`, aber ggf. `fetchpriority="high"` + `decoding="async"`.

Für Blog-Posts und `full/`: systematisch `loading="lazy"` + `width`/`height`-Attribute (CLS-Vermeidung).

---

### 17. `style.css` als Desktop-first statt Mobile-first
**Severity:** P2 · **Effort:** L

5 Media-Queries am Dateiende (`@media (max-width: …)`) deuten auf Desktop-first-Overrides hin. Bei einer Personal-Site mit wachsendem Mobile-Anteil führt das zu unnötig viel CSS-Parsing auf Mobilgeräten.

**Fix:** In einem größeren Refactor (zusammen mit #4) auf Mobile-first (`min-width`) umstellen.

---

## Zusammenfassung

| # | Titel | Sev | Effort |
|---|---|---|---|
| 1 | Domain-Inkonsistenz CNAME/canonical/og:url/CLAUDE.md | P0 | S |
| 2 | og:image / Twitter Cards fehlen | P0 | S |
| 3 | Event-Listener ohne Cleanup in script.js | P1 | M |
| 4 | script.js + style.css Monolithen → nach `os/` verschieben/splitten | P1 | L |
| 5 | Skip-Links, `<button>` statt `<div>` für Hamburger, SVG-ARIA | P1 | S |
| 6 | WCAG-Kontrast-Audit CSS-Variablen | P1 | M |
| 7 | feed.xml Auto-Generation aus blog/*.md | P1 | M |
| 8 | robots-Strategie für os/, full/, minigames-export/ | P1 | S |
| 9 | defer auf `<script>`-Tags | P2 | S |
| 10 | preload für Webfonts | P2 | S |
| 11 | !important-Cleanup in style.css | P2 | M |
| 12 | CI-Tooling: prettier, lychee, pa11y | P2 | L |
| 13 | CSP via `<meta>` | P2 | S |
| 14 | Blog-Posts ohne individuelle Meta/Schema | P2 | M |
| 15 | Inline-`<style>`-Duplikate konsolidieren | P2 | M |
| 16 | Lazy-Loading + width/height auf Bildern | P2 | S |
| 17 | Mobile-first CSS-Refactor | P2 | L |

**Stärken, die bewahrt bleiben sollten:**
- Zero external dependencies (keine Tracker, keine CDNs)
- `lang="de"`, `<main>`/`<nav>`/`<header>`/`<footer>` sauber gesetzt
- `font-display: swap` korrekt
- `rel="noopener"` auf externen Links durchgängig
- `noindex` auf Impressum/Datenschutz/AGB
- JSON-LD (Person) auf der Startseite
- Selbstgehostete Schriften mit korrekter Lizenz-Auszeichnung in NOTICE
