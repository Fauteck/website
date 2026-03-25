# Memory

## Beschreibung
Klassisches Memory-Spiel. Finde 8 Emoji-Paare auf einem 4x4 Raster. Karten werden umgedreht und muessen paarweise zugeordnet werden.

## Regeln & Mechanik
- 4x4 Raster = 16 Karten (8 Emoji-Paare)
- Emojis: Rakete, Zielscheibe, Blitz, Feuer, Stern, Gluehbirne, Palette, Schraubenschluessel
- Zwei Karten aufdecken: Bei Match bleiben sie offen, sonst nach 800ms wieder umdrehen
- Brett ist gesperrt waehrend der Umdreh-Animation
- Zuege-Zaehler und Timer (MM:SS)
- Gewonnen wenn alle 16 Karten aufgedeckt sind
- Gewinn-Screen zeigt Zeit und Zuege

## Steuerung
- **Klick:** Karte umdrehen
- **Neues Spiel:** Button auf Gewinn-Screen

## Technische Details
- **Typ:** DOM-basiert mit CSS 3D-Flip-Animation
- **Flip-Dauer:** 0.4s (CSS transition)
- **Mismatch-Delay:** 800ms
- **Empfohlene Fenstergroesse:** 440x480px
- **Emojis:** `['🚀','🎯','⚡','🔥','🌟','💡','🎨','🔧']`
- **Farben:**
  - Hintergrund: `#1a1a2e`
  - Karten-Vorderseite (verdeckt): `linear-gradient(135deg, #3b82f6, #7c3aed)`
  - Karten-Rueckseite (aufgedeckt): `#2a2a4a`
  - Matched: `rgba(34,197,94,0.2)` mit gruenem Glow
  - Gewinn-Screen: `#1a1a2e`
  - Neues-Spiel-Button: `#7c3aed`

## CSS

```css
.mem-wrap {
  height: 100%; background: #1a1a2e; padding: 16px;
  display: flex; flex-direction: column; gap: 16px;
}
.mem-header {
  display: flex; justify-content: space-between;
  color: rgba(255,255,255,0.7); font-size: 13px; font-family: 'JetBrains Mono', monospace;
}
.mem-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 10px; flex: 1; align-content: center;
}
.mem-card { aspect-ratio: 1; perspective: 600px; cursor: pointer; }
.mem-card-inner {
  width: 100%; height: 100%; position: relative;
  transition: transform 0.4s; transform-style: preserve-3d;
}
.mem-card-flipped .mem-card-inner { transform: rotateY(180deg); }
.mem-card-front, .mem-card-back {
  position: absolute; inset: 0; backface-visibility: hidden;
  border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 28px;
}
.mem-card-front {
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  color: rgba(255,255,255,0.5); font-size: 22px; font-weight: 700;
}
.mem-card-back { background: #2a2a4a; transform: rotateY(180deg); }
.mem-card-matched .mem-card-back {
  background: rgba(34,197,94,0.2); box-shadow: 0 0 12px rgba(34,197,94,0.3);
}
.mem-win {
  height: 100%; background: #1a1a2e;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; color: #fff;
}
.mem-win-icon { font-size: 48px; }
.mem-win-title { font-size: 22px; font-weight: 700; }
.mem-win-stats { font-size: 14px; color: rgba(255,255,255,0.6); }
.mem-new-game {
  background: #7c3aed; color: #fff; border: none; padding: 8px 20px;
  border-radius: 6px; cursor: pointer; font-size: 14px; margin-top: 8px;
}
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');

  const EMOJIS = ['\u{1F680}','\u{1F3AF}','\u26A1','\u{1F525}','\u{1F31F}','\u{1F4A1}','\u{1F3A8}','\u{1F527}'];
  let cards, flipped, matched, moves, startTime, timerInt, lockBoard;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    return arr;
  }

  function init() {
    cards = shuffle([...EMOJIS, ...EMOJIS].map((emoji, i) => ({ emoji, id: i, flipped: false, matched: false })));
    flipped = []; matched = 0; moves = 0; lockBoard = false;
    startTime = Date.now();
    clearInterval(timerInt);
    render();
    timerInt = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const el = container.querySelector('#mem-timer');
    if (el) {
      const secs = Math.floor((Date.now() - startTime) / 1000);
      el.textContent = `${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`;
    }
  }

  function flipCard(idx) {
    if (lockBoard || cards[idx].flipped || cards[idx].matched) return;
    cards[idx].flipped = true;
    flipped.push(idx);

    if (flipped.length === 2) {
      moves++;
      lockBoard = true;
      const [a, b] = flipped;
      if (cards[a].emoji === cards[b].emoji) {
        cards[a].matched = true;
        cards[b].matched = true;
        matched += 2;
        flipped = [];
        lockBoard = false;
        render();
        if (matched === cards.length) {
          clearInterval(timerInt);
          setTimeout(() => showWin(), 500);
        }
      } else {
        render();
        setTimeout(() => {
          cards[a].flipped = false;
          cards[b].flipped = false;
          flipped = [];
          lockBoard = false;
          render();
        }, 800);
      }
    } else {
      render();
    }
  }

  function showWin() {
    const secs = Math.floor((Date.now() - startTime) / 1000);
    const time = `${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`;
    container.innerHTML = `
      <div class="mem-win">
        <div class="mem-win-icon">\u{1F389}</div>
        <div class="mem-win-title">Gewonnen!</div>
        <div class="mem-win-stats">Zeit: ${time} \u00B7 Z\u00FCge: ${moves}</div>
        <button class="mem-new-game" id="mem-restart">Neues Spiel</button>
      </div>
    `;
    container.querySelector('#mem-restart').addEventListener('click', init);
  }

  function render() {
    container.innerHTML = `
      <div class="mem-wrap">
        <div class="mem-header">
          <span class="mem-stat">Z\u00FCge: ${moves}</span>
          <span class="mem-stat" id="mem-timer">0:00</span>
        </div>
        <div class="mem-grid">
          ${cards.map((c, i) => `
            <div class="mem-card ${c.flipped || c.matched ? 'mem-card-flipped' : ''} ${c.matched ? 'mem-card-matched' : ''}" data-idx="${i}">
              <div class="mem-card-inner">
                <div class="mem-card-front">?</div>
                <div class="mem-card-back">${c.emoji}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.querySelectorAll('.mem-card').forEach(el => {
      el.addEventListener('click', () => flipCard(+el.dataset.idx));
    });
  }

  init();
})();
```

## HTML-Grundstruktur

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 440px; height: 480px; }
    /* ... CSS von oben hier einfuegen ... */
  </style>
</head>
<body>
  <div id="game"></div>
  <script>
    // ... JavaScript von oben hier einfuegen ...
  </script>
</body>
</html>
```
