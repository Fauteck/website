# Banner & Navigationsmenü – Design-Dokumentation

## Kontext
Dokumentation des bestehenden Banner/Header-Designs mit Navigationsmenü der Website fauteck.github.io, damit das gleiche Design auf einer anderen Website reproduziert werden kann.

---

## Gesamtstruktur

Fixierte Top-Navigation (always visible), weißer Hintergrund, dezenter Schatten. Flexbox-Layout mit Logo links, Nav-Links rechts, Hamburger-Menü auf Mobile.

---

## 1. HTML-Struktur

```html
<nav role="navigation" aria-label="Hauptnavigation">
  <div class="nav-inner">
    <!-- Logo: Zweizeilig (Name + Subtitle) -->
    <a href="./" class="logo">
      <span class="logo-name">Niklas Fauteck</span>
      <span class="logo-subtitle">Digital Transformation</span>
    </a>
    <!-- Desktop-Navigation -->
    <ul>
      <li><a href="...">Link 1</a></li>
      <li><a href="...">Link 2</a></li>
      <li><a href="...">Link 3</a></li>
      <li><a href="...">Link 4</a></li>
    </ul>
    <!-- Mobile Hamburger (3 Striche) -->
    <div class="mobile-toggle" aria-label="Menu Toggle">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
```

## 2. Farbschema (CSS Custom Properties)

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--primary` | `#2C3E50` | Logo-Text, Hamburger-Striche |
| `--accent` | `#4ECDC4` | CTA-Buttons, Highlights |
| `--accent-dark` | `#3AB0A7` | Hover-Farbe für Logo & Links |
| `--text-secondary` | `#6C757D` | Nav-Link-Farbe (Standard) |
| `--border` | `#E5E7EB` | Unterer Rand der Nav |
| `--bg` | `#FFFFFF` | Hintergrund |

## 3. Schriftarten

- **Primär:** DM Sans (Google Font, variable weight 100–1000)
- **Mono:** JetBrains Mono (für Code/Labels)

## 4. Navigation CSS

```css
nav[role="navigation"] {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--bg);
  z-index: 1000;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Logo
```css
.logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: color 0.2s ease;
}
.logo-name {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--primary);
}
.logo-subtitle {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.logo:hover .logo-name,
.logo:hover .logo-subtitle {
  color: var(--accent-dark);
}
```

### Nav-Links
```css
nav[role="navigation"] ul {
  display: flex;
  list-style: none;
  gap: 3rem;
  margin: 0;
  padding: 0;
}
nav[role="navigation"] ul a {
  text-decoration: none;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
nav[role="navigation"] ul a:hover {
  color: var(--accent-dark);
}
```

### Hamburger-Menü
```css
.mobile-toggle {
  display: none; /* Auf Desktop versteckt */
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}
.mobile-toggle span {
  width: 24px;
  height: 1px;
  background: var(--primary);
}
```

## 5. Responsive Breakpoints

### ≤968px (Tablet/Mobile)
```css
@media (max-width: 968px) {
  nav[role="navigation"] ul {
    display: none; /* Links versteckt */
  }
  .mobile-toggle {
    display: flex; /* Hamburger sichtbar */
  }
  nav[role="navigation"] ul.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 1rem 2rem;
    gap: 1rem;
    z-index: 999;
  }
}
```

### ≤600px (Kleines Mobile)
```css
@media (max-width: 600px) {
  .nav-inner {
    padding: 1rem 1.5rem;
  }
}
```

## 6. JavaScript (Hamburger Toggle)

```javascript
document.querySelector('.mobile-toggle').addEventListener('click', function() {
  document.querySelector('nav[role="navigation"] ul').classList.toggle('open');
});
```

## 7. Wichtige Details

- **Content-Offset:** `padding-top: 4.5rem` auf dem Body/Main-Content, damit Inhalt nicht hinter der fixed Nav verschwindet
- **Kein Scroll-Effekt:** Nav bleibt immer gleich (keine Hide/Show-Animation beim Scrollen)
- **Accessibility:** `role="navigation"`, `aria-label` auf Nav und Hamburger, `rel="noopener"` auf externen Links
- **Transitions:** Alle Hover-Effekte nutzen `transition: color 0.2s ease`
- **Shadow:** Sehr dezent (`0 1px 8px rgba(0,0,0,0.04)`) für subtile Tiefe

## 8. Vibecoding-Prompt (Copy-Paste-Ready)

> Erstelle eine fixierte Top-Navigation mit weißem Hintergrund und dezentem Schatten (box-shadow: 0 1px 8px rgba(0,0,0,0.04)). Layout: Flexbox, max-width 1200px zentriert, padding 1rem 3rem. Links ein zweizeiliges Logo (Name fett 1.5rem + Subtitle klein 0.75rem uppercase in Grau). Rechts horizontale Nav-Links (0.9rem, grau #6C757D, hover: teal #3AB0A7, gap 3rem). Farbschema: Primary #2C3E50, Accent #4ECDC4, Border #E5E7EB. Font: DM Sans. Auf Mobile (≤968px): Links verstecken, Hamburger-Icon zeigen (3 Striche, 24px breit, 1px hoch). Klick auf Hamburger togglet ein vertikales Dropdown-Menü (position absolute, unterhalb der Nav, weißer Hintergrund). Zweiter Breakpoint bei ≤600px: Padding auf 1rem 1.5rem reduzieren. Body braucht padding-top: 4.5rem als Offset. Alle Hover-Transitions: color 0.2s ease.
