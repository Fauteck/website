# Minesweeper

## Beschreibung
Klassisches Minesweeper-Spiel. Decke alle Felder auf, die keine Mine enthalten. Rechtsklick setzt/entfernt eine Flagge.

## Regeln & Mechanik
- 9x9 Raster mit 10 Minen
- Erster Klick ist immer sicher (Minen werden erst danach platziert, nie im 3x3-Bereich um den ersten Klick)
- Aufgedeckte Zellen zeigen die Anzahl angrenzender Minen (1-8) in verschiedenen Farben
- Zellen mit 0 Minen drumherum decken automatisch alle Nachbarn auf (Flood Fill)
- Rechtsklick setzt/entfernt Flagge
- Timer startet nach dem ersten Klick
- Gewonnen wenn alle Nicht-Minen-Zellen aufgedeckt sind
- Status-Emoji: Normal=&#128578;, Verloren=&#128565;, Gewonnen=&#128526;

## Steuerung
- **Linksklick:** Zelle aufdecken
- **Rechtsklick:** Flagge setzen/entfernen
- **Reset-Button:** Neues Spiel starten

## Technische Details
- **Typ:** DOM-basiert (Grid mit divs)
- **Grid:** 9x9 mit `gap: 1px`
- **Max-Breite:** 320px
- **Empfohlene Fenstergroesse:** 420x500px
- **Nummernfarben:**
  - 1: `#2563eb` (Blau)
  - 2: `#059669` (Gruen)
  - 3: `#dc2626` (Rot)
  - 4: `#7c3aed` (Lila)
  - 5: `#b45309` (Braun)
  - 6: `#0891b2` (Cyan)
  - 7: `#1a1a2e` (Dunkel)
  - 8: `#6b7280` (Grau)
- **Farben:**
  - Hintergrund: `#1a1a2e`
  - Zelle (verdeckt): `#2a2a4a`
  - Zelle (hover): `#3a3a5a`
  - Zelle (aufgedeckt): `#1a1a30`
  - Mine: `#dc2626` mit weissem Minen-SVG
  - Counter: `#ef4444` (LED-Stil)

## CSS

```css
.ms-wrap {
  display: flex; flex-direction: column; align-items: center;
  background: #1a1a2e; height: 100%; padding: 16px;
}
.ms-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 320px; padding: 8px 12px;
  background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 12px;
}
.ms-counter {
  font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 700;
  color: #ef4444; letter-spacing: 2px; min-width: 50px; text-align: center;
}
.ms-reset {
  font-size: 24px; background: none; border: none; cursor: pointer;
  padding: 4px 8px; border-radius: 6px; transition: background 0.15s;
}
.ms-reset:hover { background: rgba(255,255,255,0.1); }
.ms-grid {
  display: grid; grid-template-columns: repeat(9, 1fr);
  gap: 1px; background: rgba(255,255,255,0.05);
  border: 2px solid rgba(255,255,255,0.1); border-radius: 6px;
  overflow: hidden; max-width: 320px; width: 100%;
}
.ms-cell {
  aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
  background: #2a2a4a; cursor: pointer; font-size: 13px; font-weight: 700;
  font-family: 'JetBrains Mono', monospace; user-select: none;
  transition: background 0.1s;
}
.ms-cell:hover:not(.ms-revealed) { background: #3a3a5a; }
.ms-cell.ms-revealed { background: #1a1a30; cursor: default; }
.ms-cell.ms-mine { background: #dc2626; color: #fff; }
.ms-cell.ms-flagged { font-size: 14px; }
.ms-status {
  margin-top: 12px; font-family: 'JetBrains Mono', monospace; font-size: 14px;
  color: rgba(255,255,255,0.7); text-align: center;
}
.ms-play-again {
  color: #4ade80; cursor: pointer; text-decoration: underline;
  text-underline-offset: 3px;
}
.ms-play-again:hover { color: #6ee7a0; }
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');

  const ROWS = 9, COLS = 9, MINES = 10;
  let board, revealed, flagged, gameOver, firstClick, minesLeft, timerVal, timerInt;

  function init() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    revealed = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    flagged = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    gameOver = false;
    firstClick = true;
    minesLeft = MINES;
    timerVal = 0;
    clearInterval(timerInt);
    render();
  }

  function placeMines(safeR, safeC) {
    let placed = 0;
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (board[r][c] === -1) continue;
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
      board[r][c] = -1;
      placed++;
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === -1) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === -1) count++;
          }
        }
        board[r][c] = count;
      }
    }
  }

  function reveal(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          reveal(r + dr, c + dc);
    }
  }

  function checkWin() {
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c] !== -1 && !revealed[r][c]) return false;
    return true;
  }

  const NUM_COLORS = ['', '#2563eb', '#059669', '#dc2626', '#7c3aed', '#b45309', '#0891b2', '#1a1a2e', '#6b7280'];

  function render() {
    const minesDisplay = String(minesLeft).padStart(3, '0');
    const timeDisplay = String(timerVal).padStart(3, '0');

    let gridHtml = '';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        let cls = 'ms-cell';
        let content = '';
        if (revealed[r][c]) {
          cls += ' ms-revealed';
          if (board[r][c] === -1) {
            cls += ' ms-mine';
            content = '<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><circle cx="8" cy="8" r="4" fill="currentColor"/><line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="8" x2="5" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="11" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
          } else if (board[r][c] > 0) {
            content = `<span style="color:${NUM_COLORS[board[r][c]]};font-weight:700">${board[r][c]}</span>`;
          }
        } else if (flagged[r][c]) {
          cls += ' ms-flagged';
          content = '\u{1F6A9}';
        }
        gridHtml += `<div class="${cls}" data-r="${r}" data-c="${c}">${content}</div>`;
      }
    }

    let statusFace = '\u{1F642}';
    let statusMsg = '';
    if (gameOver === 'lost') { statusFace = '\u{1F635}'; statusMsg = 'Game Over!'; }
    if (gameOver === 'won') { statusFace = '\u{1F60E}'; statusMsg = 'Gewonnen!'; }

    container.innerHTML = `
      <div class="ms-wrap">
        <div class="ms-toolbar">
          <div class="ms-counter">${minesDisplay}</div>
          <button class="ms-reset" id="ms-reset">${statusFace}</button>
          <div class="ms-counter">${timeDisplay}</div>
        </div>
        <div class="ms-grid" id="ms-grid">${gridHtml}</div>
        ${statusMsg ? `<div class="ms-status">${statusMsg} <span class="ms-play-again">Neues Spiel</span></div>` : ''}
      </div>
    `;

    document.getElementById('ms-reset').addEventListener('click', init);
    const playAgain = container.querySelector('.ms-play-again');
    if (playAgain) playAgain.addEventListener('click', init);

    if (!gameOver) {
      container.querySelectorAll('.ms-cell:not(.ms-revealed)').forEach(cell => {
        cell.addEventListener('click', () => {
          const r = +cell.dataset.r, c = +cell.dataset.c;
          if (flagged[r][c]) return;
          if (firstClick) {
            firstClick = false;
            placeMines(r, c);
            timerInt = setInterval(() => { timerVal++; updateTimerDisplay(); }, 1000);
          }
          if (board[r][c] === -1) {
            for (let rr = 0; rr < ROWS; rr++)
              for (let cc = 0; cc < COLS; cc++)
                if (board[rr][cc] === -1) revealed[rr][cc] = true;
            gameOver = 'lost';
            clearInterval(timerInt);
            render();
            return;
          }
          reveal(r, c);
          if (checkWin()) {
            gameOver = 'won';
            clearInterval(timerInt);
          }
          render();
        });

        cell.addEventListener('contextmenu', e => {
          e.preventDefault();
          const r = +cell.dataset.r, c = +cell.dataset.c;
          if (revealed[r][c] || gameOver) return;
          flagged[r][c] = !flagged[r][c];
          minesLeft += flagged[r][c] ? -1 : 1;
          render();
        });
      });
    }
  }

  function updateTimerDisplay() {
    const el = container.querySelector('.ms-counter:last-child');
    if (el) el.textContent = String(timerVal).padStart(3, '0');
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
  <title>Minesweeper</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 420px; height: 500px; }
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
