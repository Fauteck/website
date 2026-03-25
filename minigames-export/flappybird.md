# Flappy Bird

## Beschreibung
Flappy-Bird-Klon. Steuere einen Vogel durch Rohrleitungen, indem du klickst/tippst um zu fliegen. Jede passierte Rohrleitung gibt einen Punkt.

## Regeln & Mechanik
- Canvas: 280x400px
- Schwerkraft: 0.35 px/Frame
- Flap-Geschwindigkeit: -6 px/Frame
- Rohrbreite: 40px, Luecke: 120px
- Rohrgeschwindigkeit: 2 px/Frame
- Neue Rohre alle 90 Frames (~1.5 Sekunden)
- Obere Rohrhoehe: zufaellig zwischen 50 und (H - GAP - 120)
- Vogelgroesse: 14px Radius, Position X=60
- Boden bei Y = H-30
- Kollision mit Rohren, Boden oder Decke = Game Over
- Bester Score wird pro Session gespeichert

## Steuerung
- **Klick:** Auf Canvas klicken zum Fliegen
- **Touch:** Tippen auf Canvas
- **Tastatur:** Leertaste oder Pfeil-Hoch

## Technische Details
- **Typ:** HTML5 Canvas mit `requestAnimationFrame`
- **Canvas-Groesse:** 280x400px
- **Empfohlene Fenstergroesse:** 360x540px
- **Farben:**
  - Himmel: `#1a1a2e`
  - Boden: `#2d4a22` mit `#3d6b2e` Oberkante
  - Rohre: `#22c55e` mit `#16a34a` Kappen
  - Vogel (Koerper): `#facc15` (Gelb)
  - Vogel (Auge weiss): `#fff`, Pupille: `#1a1a2e`
  - Vogel (Schnabel): `#f97316`
  - Wrap-Hintergrund: `#4ec0ca` (Cyan)

## CSS

```css
.fb-wrap { display:flex; flex-direction:column; align-items:center; height:100%; background:#4ec0ca; padding:8px; box-sizing:border-box; position:relative; }
.fb-scores { color:#fff; font:bold 14px/1 system-ui; padding:4px 0 6px; display:flex; gap:16px; }
.fb-scores span { opacity:.7; }
.fb-scores strong { font-size:18px; text-shadow:1px 1px 2px rgba(0,0,0,.3); }
.fb-wrap canvas { display:block; border-radius:4px; }
.fb-overlay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,.6); z-index:2; cursor:pointer; }
.fb-overlay-title { color:#fff; font:bold 22px/1 system-ui; margin-bottom:6px; }
.fb-overlay-sub { color:#ddd; font:13px/1 system-ui; }
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');
  container.innerHTML = `
    <div class="fb-wrap">
      <div class="fb-scores"><span>Score: <strong id="fb-score">0</strong></span><span>Best: <strong id="fb-best">0</strong></span></div>
      <canvas id="fb-canvas" width="280" height="400"></canvas>
      <div class="fb-overlay" id="fb-overlay">
        <div class="fb-overlay-title">Flappy Bird</div>
        <div class="fb-overlay-sub">Tap or Space to start</div>
      </div>
    </div>
  `;

  const canvas = document.getElementById('fb-canvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('fb-overlay');
  const W = canvas.width, H = canvas.height;
  const GRAVITY = 0.35, FLAP = -6, PIPE_W = 40, GAP = 120, PIPE_SPEED = 2, BIRD_SIZE = 14;
  let birdY, birdV, pipes, score, best = 0, running, animId, frameCount;

  function reset() {
    birdY = H / 2; birdV = 0; pipes = []; score = 0; frameCount = 0;
    document.getElementById('fb-score').textContent = '0';
  }

  function addPipe() {
    const topH = 50 + Math.random() * (H - GAP - 120);
    pipes.push({ x: W + 10, topH, scored: false });
  }

  function draw() {
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#2d4a22'; ctx.fillRect(0, H - 30, W, 30);
    ctx.fillStyle = '#3d6b2e'; ctx.fillRect(0, H - 30, W, 4);
    pipes.forEach(p => {
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(p.x, 0, PIPE_W, p.topH);
      ctx.fillRect(p.x, p.topH + GAP, PIPE_W, H - p.topH - GAP - 30);
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(p.x - 3, p.topH - 16, PIPE_W + 6, 16);
      ctx.fillRect(p.x - 3, p.topH + GAP, PIPE_W + 6, 16);
    });
    ctx.fillStyle = '#facc15';
    ctx.beginPath(); ctx.arc(60, birdY, BIRD_SIZE, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(66, birdY - 3, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath(); ctx.arc(68, birdY - 3, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.fillRect(72, birdY, 8, 4);
  }

  function update() {
    frameCount++;
    birdV += GRAVITY;
    birdY += birdV;
    if (frameCount % 90 === 0) addPipe();
    pipes.forEach(p => { p.x -= PIPE_SPEED; });
    pipes = pipes.filter(p => p.x + PIPE_W > -10);
    pipes.forEach(p => {
      if (!p.scored && p.x + PIPE_W < 60) { p.scored = true; score++; document.getElementById('fb-score').textContent = score; }
    });
    const hit = pipes.some(p => {
      if (60 + BIRD_SIZE > p.x && 60 - BIRD_SIZE < p.x + PIPE_W) {
        if (birdY - BIRD_SIZE < p.topH || birdY + BIRD_SIZE > p.topH + GAP) return true;
      }
      return false;
    });
    if (hit || birdY + BIRD_SIZE > H - 30 || birdY - BIRD_SIZE < 0) {
      running = false;
      if (score > best) { best = score; document.getElementById('fb-best').textContent = best; }
      overlay.querySelector('.fb-overlay-title').textContent = 'Game Over';
      overlay.querySelector('.fb-overlay-sub').textContent = `Score: ${score} \u00B7 Tap to retry`;
      overlay.style.display = 'flex';
      return;
    }
    draw();
    if (running) animId = requestAnimationFrame(update);
  }

  function flap() { if (running) birdV = FLAP; }
  function start() { overlay.style.display = 'none'; reset(); running = true; addPipe(); animId = requestAnimationFrame(update); }

  canvas.addEventListener('click', () => { if (running) flap(); });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); if (running) flap(); }, { passive: false });
  document.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); if (running) flap(); } });
  overlay.addEventListener('click', start);
  reset(); draw();
})();
```

## HTML-Grundstruktur

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flappy Bird</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #4ec0ca; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 360px; height: 540px; position: relative; }
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
