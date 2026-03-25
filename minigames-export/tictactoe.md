# Tic-Tac-Toe

## Beschreibung
Tic-Tac-Toe gegen eine unschlagbare KI. Der Spieler spielt X (beginnt), die KI spielt O und nutzt den Minimax-Algorithmus fuer perfekte Zuege.

## Regeln & Mechanik
- 3x3 Spielfeld
- Spieler ist X, KI ist O
- Spieler beginnt immer
- KI berechnet optimalen Zug mit Minimax (unschlagbar)
- Gewinnlinien werden visuell hervorgehoben
- Erkennt Sieg, Niederlage und Unentschieden
- Texte: "Dein Zug (X)", "KI denkt...", "Du gewinnst!", "KI gewinnt!", "Unentschieden!"

## Steuerung
- **Klick:** Auf eine leere Zelle klicken, um X zu setzen
- **Neues Spiel:** Button zum Neustart

## Technische Details
- **Typ:** DOM-basiert (Buttons in CSS-Grid)
- **Zellengroesse:** 90x90px
- **Empfohlene Fenstergroesse:** 380x460px
- **Farben:**
  - Hintergrund: `#1a1a2e`
  - Zellen: `#16213e`, Hover: `#1a2744`
  - X-Farbe: `#e94560`
  - O-Farbe: `#0f3460`
  - Gewinn-Highlight: `#e9456033` mit Glow
  - Neues-Spiel-Button: `#e94560`

## CSS

```css
.ttt-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:12px; background:#1a1a2e; padding:12px; box-sizing:border-box; }
.ttt-status { color:#fff; font:bold 16px/1 system-ui; min-height:24px; }
.ttt-grid { display:grid; grid-template-columns:repeat(3,90px); grid-template-rows:repeat(3,90px); gap:4px; }
.ttt-cell { width:90px; height:90px; background:#16213e; border:none; border-radius:6px; cursor:pointer; font:bold 40px/1 system-ui; color:#fff; display:flex; align-items:center; justify-content:center; transition:background .15s; }
.ttt-cell:hover { background:#1a2744; }
.ttt-cell.ttt-x { color:#e94560; }
.ttt-cell.ttt-o { color:#0f3460; }
.ttt-cell.ttt-win { background:#e9456033; box-shadow:0 0 12px #e94560aa; }
.ttt-new-game { margin-top:8px; padding:8px 20px; background:#e94560; color:#fff; border:none; border-radius:6px; font:bold 13px/1 system-ui; cursor:pointer; }
.ttt-new-game:hover { background:#d6345a; }
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');
  let board, gameOver, turn;

  function checkWin(b) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,c,d] of lines) { if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line: [a,c,d] }; }
    return b.includes('') ? null : { winner: 'draw', line: [] };
  }

  function minimax(b, isMax) {
    const result = checkWin(b);
    if (result) { if (result.winner === 'O') return 10; if (result.winner === 'X') return -10; return 0; }
    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) { if (b[i] === '') { b[i] = 'O'; best = Math.max(best, minimax(b, false)); b[i] = ''; } }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) { if (b[i] === '') { b[i] = 'X'; best = Math.min(best, minimax(b, true)); b[i] = ''; } }
      return best;
    }
  }

  function aiMove() {
    let bestScore = -Infinity, bestIdx = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') { board[i] = 'O'; const score = minimax(board, false); board[i] = ''; if (score > bestScore) { bestScore = score; bestIdx = i; } }
    }
    if (bestIdx >= 0) board[bestIdx] = 'O';
  }

  function render() {
    const result = checkWin(board);
    let statusText = turn === 'X' ? 'Dein Zug (X)' : 'KI denkt...';
    if (result) {
      gameOver = true;
      if (result.winner === 'X') statusText = 'Du gewinnst! \u{1F389}';
      else if (result.winner === 'O') statusText = 'KI gewinnt!';
      else statusText = 'Unentschieden!';
    }
    container.innerHTML = `
      <div class="ttt-wrap">
        <div class="ttt-status">${statusText}</div>
        <div class="ttt-grid">
          ${board.map((c, i) => {
            const win = result && result.line.includes(i) ? ' ttt-win' : '';
            const cls = c === 'X' ? ' ttt-x' : c === 'O' ? ' ttt-o' : '';
            return `<button class="ttt-cell${cls}${win}" data-idx="${i}" ${c || gameOver ? 'disabled' : ''}>${c}</button>`;
          }).join('')}
        </div>
        <button class="ttt-new-game">Neues Spiel</button>
      </div>
    `;
    container.querySelector('.ttt-new-game').addEventListener('click', init);
    container.querySelectorAll('.ttt-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const idx = +cell.dataset.idx;
        if (board[idx] || gameOver) return;
        board[idx] = 'X';
        turn = 'O';
        const r = checkWin(board);
        if (!r) { aiMove(); turn = 'X'; }
        render();
      });
    });
  }

  function init() { board = Array(9).fill(''); gameOver = false; turn = 'X'; render(); }
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
  <title>Tic-Tac-Toe</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 380px; height: 460px; }
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
