# Tetris

## Beschreibung
Klassisches Tetris-Spiel. Fallende Bloecke muessen so gestapelt werden, dass vollstaendige Reihen entstehen, die dann verschwinden.

## Regeln & Mechanik
- 10x20 Spielfeld, Zellgroesse 22px
- 7 Tetris-Teile: I, J, L, O, S, T, Z
- Naechstes Teil wird als Vorschau angezeigt
- Reihen-Punkte (multipliziert mit Level):
  - 1 Reihe: 100 Punkte
  - 2 Reihen: 300 Punkte
  - 3 Reihen: 500 Punkte
  - 4 Reihen: 800 Punkte
- Level = floor(Reihen / 10) + 1
- Fallgeschwindigkeit: max(100ms, 800ms - (Level-1) * 70ms)
- Game Over wenn neues Teil bei Spawn kollidiert
- Rotation ohne Wall-Kick

## Steuerung
- **Links/Rechts-Pfeil:** Teil bewegen
- **Pfeil-Hoch:** Drehen
- **Pfeil-Runter:** Soft Drop (eine Zeile runter)
- **Leertaste:** Hard Drop (sofort ganz runter)

## Technische Details
- **Typ:** HTML5 Canvas
- **Spielfeld-Canvas:** 220x440px (10*22 x 20*22)
- **Vorschau-Canvas:** 80x60px
- **Empfohlene Fenstergroesse:** 380x540px
- **Teile-Farben:**
  - 0: transparent
  - 1 (I): `#00f0f0` (Cyan)
  - 2 (J): `#0000f0` (Blau)
  - 3 (L): `#f0a000` (Orange)
  - 4 (O): `#f0f000` (Gelb)
  - 5 (S): `#00f000` (Gruen)
  - 6 (T): `#a000f0` (Lila)
  - 7 (Z): `#f00000` (Rot)
- **Farben:**
  - Spielfeld-Hintergrund: `#0d1117`
  - Rasterlinien: `rgba(255,255,255,0.04)`
  - Sidebar: `#0d1117`
  - Info-Boxen: `rgba(255,255,255,0.04)`
  - Labels: `rgba(255,255,255,0.4)`
  - Werte: `#fff`
  - Restart-Button: `#0d9488`

## CSS

```css
.tet-wrap {
  display: flex; height: 100%; background: #0d1117; gap: 12px; padding: 12px;
}
.tet-main { position: relative; flex-shrink: 0; }
.tet-main canvas { display: block; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; }
.tet-sidebar {
  display: flex; flex-direction: column; gap: 10px; flex: 1; min-width: 80px;
}
.tet-info-box {
  background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px;
}
.tet-info-label {
  font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px;
}
.tet-info-val {
  font-size: 18px; font-weight: 700; color: #fff; font-family: 'JetBrains Mono', monospace;
}
.tet-info-box canvas { display: block; margin-top: 4px; border-radius: 4px; }
.tet-controls-hint {
  font-size: 10px; color: rgba(255,255,255,0.3); line-height: 1.6; margin-top: auto;
}
.tet-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.8);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border-radius: 4px;
}
.tet-game-over { font-size: 20px; font-weight: 700; color: #fff; }
.tet-final-score { font-size: 14px; color: rgba(255,255,255,0.6); }
.tet-restart {
  background: #0d9488; color: #fff; border: none; padding: 8px 20px;
  border-radius: 6px; cursor: pointer; font-size: 14px;
}
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');

  const COLS = 10, ROWS = 20, CELL = 22;
  const COLORS = ['#00000000','#00f0f0','#0000f0','#f0a000','#f0f000','#00f000','#a000f0','#f00000'];
  const PIECES = [
    [[1,1,1,1]],
    [[2,0,0],[2,2,2]],
    [[0,0,3],[3,3,3]],
    [[4,4],[4,4]],
    [[0,5,5],[5,5,0]],
    [[0,6,0],[6,6,6]],
    [[7,7,0],[0,7,7]],
  ];

  let board, piece, piecePos, nextPiece, score, level, lines, gameOver, dropInterval, gameLoop;

  function init() {
    board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    score = 0; level = 1; lines = 0; gameOver = false;
    clearInterval(gameLoop);
    nextPiece = randomPiece();
    spawnPiece();
    dropInterval = 800;
    gameLoop = setInterval(tick, dropInterval);
    render();
  }

  function randomPiece() {
    return JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random() * PIECES.length)]));
  }

  function spawnPiece() {
    piece = nextPiece;
    nextPiece = randomPiece();
    piecePos = { x: Math.floor((COLS - piece[0].length) / 2), y: 0 };
    if (collides(piece, piecePos)) {
      gameOver = true;
      clearInterval(gameLoop);
    }
  }

  function collides(p, pos) {
    for (let r = 0; r < p.length; r++)
      for (let c = 0; c < p[r].length; c++)
        if (p[r][c]) {
          const nx = pos.x + c, ny = pos.y + r;
          if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
          if (ny >= 0 && board[ny][nx]) return true;
        }
    return false;
  }

  function merge() {
    for (let r = 0; r < piece.length; r++)
      for (let c = 0; c < piece[r].length; c++)
        if (piece[r][c] && piecePos.y + r >= 0)
          board[piecePos.y + r][piecePos.x + c] = piece[r][c];
  }

  function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every(c => c !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++; r++;
      }
    }
    if (cleared) {
      const pts = [0, 100, 300, 500, 800];
      score += (pts[cleared] || 800) * level;
      lines += cleared;
      level = Math.floor(lines / 10) + 1;
      clearInterval(gameLoop);
      dropInterval = Math.max(100, 800 - (level - 1) * 70);
      gameLoop = setInterval(tick, dropInterval);
    }
  }

  function rotate() {
    const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse());
    if (!collides(rotated, piecePos)) piece = rotated;
  }

  function move(dx) {
    const newPos = { x: piecePos.x + dx, y: piecePos.y };
    if (!collides(piece, newPos)) piecePos = newPos;
  }

  function tick() {
    const newPos = { x: piecePos.x, y: piecePos.y + 1 };
    if (collides(piece, newPos)) {
      merge(); clearLines(); spawnPiece();
    } else {
      piecePos = newPos;
    }
    render();
  }

  function hardDrop() {
    while (!collides(piece, { x: piecePos.x, y: piecePos.y + 1 })) piecePos.y++;
    merge(); clearLines(); spawnPiece(); render();
  }

  function render() {
    const canvas = container.querySelector('#tet-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        ctx.strokeRect(c * CELL, r * CELL, CELL, CELL);

    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c]) {
          ctx.fillStyle = COLORS[board[r][c]];
          ctx.fillRect(c*CELL+1, r*CELL+1, CELL-2, CELL-2);
        }

    if (!gameOver && piece)
      for (let r = 0; r < piece.length; r++)
        for (let c = 0; c < piece[r].length; c++)
          if (piece[r][c]) {
            ctx.fillStyle = COLORS[piece[r][c]];
            ctx.fillRect((piecePos.x+c)*CELL+1, (piecePos.y+r)*CELL+1, CELL-2, CELL-2);
          }

    const preview = container.querySelector('#tet-next');
    if (preview) {
      const pctx = preview.getContext('2d');
      pctx.fillStyle = '#0d1117';
      pctx.fillRect(0, 0, preview.width, preview.height);
      if (nextPiece)
        for (let r = 0; r < nextPiece.length; r++)
          for (let c = 0; c < nextPiece[r].length; c++)
            if (nextPiece[r][c]) {
              pctx.fillStyle = COLORS[nextPiece[r][c]];
              pctx.fillRect(c*18+4, r*18+4, 16, 16);
            }
    }

    const scoreEl = container.querySelector('#tet-score');
    const levelEl = container.querySelector('#tet-level');
    const linesEl = container.querySelector('#tet-lines');
    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (linesEl) linesEl.textContent = lines;

    if (gameOver) {
      const overlay = container.querySelector('.tet-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  }

  container.innerHTML = `
    <div class="tet-wrap">
      <div class="tet-main">
        <canvas id="tet-canvas" width="${COLS*CELL}" height="${ROWS*CELL}"></canvas>
        <div class="tet-overlay" style="display:none">
          <div class="tet-game-over">Game Over</div>
          <div class="tet-final-score">Score: <span id="tet-final">0</span></div>
          <button class="tet-restart" id="tet-restart">Neues Spiel</button>
        </div>
      </div>
      <div class="tet-sidebar">
        <div class="tet-info-box">
          <div class="tet-info-label">N\u00E4chstes</div>
          <canvas id="tet-next" width="80" height="60"></canvas>
        </div>
        <div class="tet-info-box">
          <div class="tet-info-label">Score</div>
          <div class="tet-info-val" id="tet-score">0</div>
        </div>
        <div class="tet-info-box">
          <div class="tet-info-label">Level</div>
          <div class="tet-info-val" id="tet-level">1</div>
        </div>
        <div class="tet-info-box">
          <div class="tet-info-label">Lines</div>
          <div class="tet-info-val" id="tet-lines">0</div>
        </div>
        <div class="tet-controls-hint">
          \u2190 \u2192 Bewegen<br>\u2191 Drehen<br>\u2193 Soft Drop<br>Space Hard Drop
        </div>
      </div>
    </div>
  `;

  document.addEventListener('keydown', e => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); move(-1); render(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1);  render(); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); rotate(); render(); }
    if (e.key === 'ArrowDown')  { e.preventDefault(); tick(); }
    if (e.key === ' ')          { e.preventDefault(); hardDrop(); }
  });

  container.querySelector('#tet-restart').addEventListener('click', () => { init(); });
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
  <title>Tetris</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0d1117; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 380px; height: 540px; }
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
