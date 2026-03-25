# Snake

## Beschreibung
Klassisches Snake-Spiel. Die Schlange bewegt sich ueber ein Raster, frisst Futter und waechst dabei. Das Spiel endet bei Kollision mit der Wand oder dem eigenen Koerper.

## Regeln & Mechanik
- 15x15 Raster auf einem 300x300px Canvas
- Schlange startet mit 3 Segmenten bei Position (7,7), bewegt sich nach rechts
- Futter erscheint zufaellig, nie auf der Schlange
- +10 Punkte pro gefressenem Futter
- Game Over bei Wand- oder Selbstkollision
- Bester Score wird pro Session gespeichert
- Update-Intervall: 200ms

## Steuerung
- **Tastatur:** Pfeiltasten oder WASD
- **Touch-Buttons:** Richtungstasten (Dreieck-Symbole)
- **Swipe:** Wischen auf dem Canvas fuer Richtungswechsel
- Umkehr der aktuellen Richtung ist nicht erlaubt

## Technische Details
- **Typ:** HTML5 Canvas
- **Canvas-Groesse:** 300x300px
- **Zellgroesse:** 20px (300/15)
- **Empfohlene Fenstergroesse:** 420x500px
- **Farben:**
  - Hintergrund: `#1a1a2e`
  - Rasterlinien: `rgba(255,255,255,0.04)`
  - Schlange (Kopf): `#4ade80` mit Glow
  - Schlange (Koerper): `rgba(74, 222, 128, alpha)` mit abnehmender Opazitaet
  - Futter: `#ef4444` mit Glow-Effekt
  - Score-Anzeige: `#4ade80`
  - Best-Score: `#6b7280`
  - Overlay-Hintergrund: `rgba(15,15,35,0.9)`

## CSS

```css
.snake-game {
  display: flex; flex-direction: column; align-items: center;
  background: #0f0f23; height: 100%; position: relative;
  overflow: hidden;
}
.snake-header {
  display: flex; justify-content: space-between; width: 100%;
  padding: 12px 20px; font-family: 'JetBrains Mono', monospace; font-size: 13px;
  color: #4ade80;
}
.snake-best { color: #6b7280; }
#snake-canvas {
  border: 2px solid rgba(74,222,128,0.2); border-radius: 8px;
  max-width: 90%; aspect-ratio: 1;
}
.snake-controls {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; margin-top: 16px;
}
.snake-ctrl-row { display: flex; gap: 4px; }
.snake-btn {
  width: 72px; height: 72px; border-radius: 14px;
  background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8); font-size: 26px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.snake-btn:active { background: rgba(74,222,128,0.2); }
.snake-overlay {
  position: absolute; inset: 0; background: rgba(15,15,35,0.9);
  display: none; align-items: center; justify-content: center;
  cursor: pointer; z-index: 2;
}
.snake-overlay.show { display: flex; }
.snake-overlay-text { text-align: center; }
.snake-overlay-title {
  font-family: 'JetBrains Mono', monospace; font-size: 28px; font-weight: 700;
  color: #4ade80; margin-bottom: 8px;
}
.snake-overlay-sub {
  font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #6b7280;
}
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');
  container.innerHTML = `
    <div class="snake-game">
      <div class="snake-header">
        <div class="snake-score">Score: <span id="snake-score-val">0</span></div>
        <div class="snake-best">Best: <span id="snake-best-val">0</span></div>
      </div>
      <canvas id="snake-canvas" width="300" height="300"></canvas>
      <div class="snake-controls">
        <div class="snake-ctrl-row"><button class="snake-btn" data-dir="up">&#9650;</button></div>
        <div class="snake-ctrl-row">
          <button class="snake-btn" data-dir="left">&#9664;</button>
          <button class="snake-btn" data-dir="down">&#9660;</button>
          <button class="snake-btn" data-dir="right">&#9654;</button>
        </div>
      </div>
      <div class="snake-overlay show" id="snake-overlay">
        <div class="snake-overlay-text">
          <div class="snake-overlay-title">Snake</div>
          <div class="snake-overlay-sub">Tap to start</div>
        </div>
      </div>
    </div>
  `;

  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('snake-score-val');
  const bestEl = document.getElementById('snake-best-val');
  const overlay = document.getElementById('snake-overlay');
  const overlayTitle = overlay.querySelector('.snake-overlay-title');
  const overlaySub = overlay.querySelector('.snake-overlay-sub');

  const GRID = 15;
  const CELL = canvas.width / GRID;
  let snake, dir, nextDir, food, score, best = 0, gameLoop, running = false;

  function reset() {
    snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = '0';
    placeFood();
  }

  function placeFood() {
    do {
      food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some(s => s.x === food.x && s.y === food.y));
  }

  function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(canvas.width, i * CELL); ctx.stroke();
    }
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    snake.forEach((seg, i) => {
      const alpha = 1 - (i / snake.length) * 0.5;
      ctx.fillStyle = i === 0 ? '#4ade80' : `rgba(74, 222, 128, ${alpha})`;
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = i === 0 ? 6 : 0;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  function update() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) return gameOver();
    if (snake.some(s => s.x === head.x && s.y === head.y)) return gameOver();
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreEl.textContent = score;
      placeFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function gameOver() {
    running = false;
    clearInterval(gameLoop);
    if (score > best) { best = score; bestEl.textContent = best; }
    overlayTitle.textContent = 'Game Over';
    overlaySub.textContent = `Score: ${score} — Tap to retry`;
    overlay.classList.add('show');
  }

  function start() {
    overlay.classList.remove('show');
    reset();
    draw();
    running = true;
    gameLoop = setInterval(update, 200);
  }

  function setDir(x, y) {
    if (dir.x === -x && dir.y === -y) return;
    nextDir = { x, y };
  }

  document.querySelectorAll('.snake-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (!running) return;
      const d = btn.dataset.dir;
      if (d === 'up') setDir(0, -1);
      if (d === 'down') setDir(0, 1);
      if (d === 'left') setDir(-1, 0);
      if (d === 'right') setDir(1, 0);
    });
  });

  document.addEventListener('keydown', e => {
    if (!running) return;
    if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); setDir(0, -1); }
    if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); setDir(0, 1); }
    if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); setDir(-1, 0); }
    if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); setDir(1, 0); }
  });

  let touchStartX = 0, touchStartY = 0;
  canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener('touchend', e => {
    if (!running) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      setDir(dx > 0 ? 1 : -1, 0);
    } else {
      setDir(0, dy > 0 ? 1 : -1);
    }
  }, { passive: true });

  overlay.addEventListener('click', start);
  reset();
  draw();
})();
```

## HTML-Grundstruktur

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0f0f23; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
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
