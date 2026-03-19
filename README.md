# NiklasOS — fauteck.eu

![Status](https://img.shields.io/website?url=https%3A%2F%2Ffauteck.eu&label=fauteck.eu)
![HTML](https://img.shields.io/badge/HTML5-statisch-orange)
![CSS](https://img.shields.io/badge/CSS3-custom-blue)
![JS](https://img.shields.io/badge/JavaScript-vanilla-yellow)
![Lizenz](https://img.shields.io/badge/Lizenz-propriet%C3%A4r-lightgrey)

---

## Benutzeroberfläche

Die Website simuliert ein vollständiges Betriebssystem:

- **Desktop** — Linux-Mint-/Cinnamon-inspirierte Oberfläche mit Boot-Screen, Login, Fenstermanager, Taskbar und Startmenü
- **Mobil** — Android-ähnliches Interface mit Lockscreen, PIN-Eingabe, App-Grid, Statusleiste, Benachrichtigungen und Quick-Settings

Beide Ansichten sind responsiv und passen sich automatisch an die Bildschirmgröße an.

---

## Feature-Übersicht

| Feature | Beschreibung |
|---|---|
| Boot-Sequenz | Animierter Startbildschirm mit Ladebalken |
| Login / Lockscreen | Desktop-Login und mobiler PIN-Screen |
| Fenstermanager | Drag, Resize, Minimize, Maximize, Close, Z-Index-Management |
| Terminal | Interaktiver Terminal-Emulator mit ~20 Befehlen |
| Spiele | Snake, Minesweeper, Tetris, Memory, Solitaire |
| System Monitor | Fähigkeiten-Dashboard als Prozessmonitor |
| Bambu Studio | 3D-Druck-Interessen mit animiertem Drucker |
| Home Assistant | Smart-Home-Automation-Details |
| Kontextmenü | Rechtsklick-Menü auf dem Desktop |
| Suchfunktion | Globale App-Suche über die Taskbar |
| Easter Eggs | Versteckte Achievements und Befehle |
| Fake Call / Messages | Simulierte Anrufe und Nachrichten (mobil) |
| Changelog | Versionshistorie der Website |

---

## Architektur

```
Browser
  │
  ├── index.html        Semantisches HTML5, Schema.org-Markup
  │     │
  │     ├── style.css    CSS3 mit Custom Properties, Animationen, Responsive
  │     │
  │     └── script.js    Vanilla JS — Fenstermanager, Terminal, Spiele, Mobile-UI
  │
  └── /full/             Alternative klassische Portfolio-Ansicht
        ├── index.html
        └── style.css
```

Statische Website ohne Build-Prozess, ohne Backend, ohne Datenbank. Alle Inhalte werden clientseitig gerendert.

---

## Voraussetzungen

| Anforderung | Details |
|---|---|
| Webserver | Beliebiger HTTP-Server (nginx, Apache, GitHub Pages, etc.) |
| Node.js / npm | **Nicht erforderlich** — kein Build-Prozess |
| Browser | Moderner Browser mit ES6-Support (Chrome, Firefox, Safari, Edge) |

---

## Installation / Schnellstart

```bash
# Repository klonen
git clone https://github.com/Fauteck/website.git
cd website

# Lokalen Webserver starten (beliebige Methode)
python3 -m http.server 8080
# oder
npx serve .
```

Die Seite ist dann unter `http://localhost:8080` erreichbar.

---

## Konfiguration

Die Website benötigt keine Konfigurationsdateien oder Umgebungsvariablen.

Anpassungen erfolgen direkt in den Quelldateien:

| Datei | Zweck |
|---|---|
| `index.html` | Struktur, Meta-Tags, Schema.org-Daten |
| `style.css` | Design, Farben (CSS Custom Properties), Animationen |
| `script.js` | Inhalte, Terminal-Befehle, Fenster-Konfiguration, Spiele |
| `robots.txt` | Suchmaschinen-Steuerung |

---

## Sicherheitsaspekte

- **Keine Nutzereingaben** — kein Backend, keine API, keine Datenbank
- **Kein Tracking** — keine Analytics, keine Cookies (außer ggf. Google Fonts)
- **robots.txt** — KI-Crawler (GPTBot, CCBot, anthropic-ai, Claude-Web, Google-Extended) werden blockiert
- **Content Security** — rein statische Inhalte ohne externe Skripte
- **OWASP** — nicht direkt anwendbar (kein Server-Side-Processing), Input-Sanitierung im Terminal via `escapeHtml()`

---

## Technologie-Stack

| Kategorie | Technologie |
|---|---|
| Markup | HTML5 (semantisch, ARIA-Labels) |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, Animationen) |
| Logik | Vanilla JavaScript (ES6+, zero dependencies) |
| Fonts | DM Sans, JetBrains Mono (Google Fonts) |
| SEO | Schema.org (Person), Open Graph, Canonical URL |
| Hosting | Statisch (beliebiger Webserver) |

---

## Projektstruktur

```
website/
├── index.html          # Hauptseite — NiklasOS Interface
├── script.js           # Gesamte Interaktivität (~4.500 Zeilen)
├── style.css           # Gesamtes Styling (~4.500 Zeilen)
├── robots.txt          # Crawler-Steuerung
├── README.md           # Diese Datei
└── full/               # Klassische Portfolio-Variante
    ├── index.html
    ├── style.css
    ├── favicon.ico
    ├── favicon-192.png
    └── *.jpg / *.png   # Profilbilder und Logos
```

---

## Entwicklung

### Lokale Entwicklung

```bash
# Beliebigen lokalen Server starten
python3 -m http.server 8080
```

Änderungen an HTML, CSS oder JS sind nach Browser-Reload sofort sichtbar — kein Build-Schritt erforderlich.

### Branching

- Entwicklung auf Feature-/Fix-Branches (`feature/...`, `fix/...`)
- Merge via Pull Request in `main`
- `main` ist produktionsnah und geschützt

### Terminal-Befehle erweitern

Neue Befehle werden im `TERM_COMMANDS`-Objekt in `script.js` ergänzt:

```javascript
'mein-befehl': () => [
  { t: 'bold', v: 'Überschrift' },
  { t: 'out',  v: 'Ausgabetext' },
],
```

Verfügbare Typen: `bold`, `out`, `dim`, `accent`, `success`, `err`, `empty`, `prompt`

---

## Lizenz

Proprietär — alle Rechte vorbehalten. Niklas Fauteck.
