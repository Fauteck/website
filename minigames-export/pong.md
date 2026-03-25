# Pong

## Beschreibung
Klassisches Pong-Spiel: Spieler (unten, gruen) gegen KI (oben, blau). Wer zuerst 5 Punkte erreicht, gewinnt.

## Regeln & Mechanik
- Canvas: 300x400px
- Paddle: 60x8px
- Ball: Radius 5px, startet in der Mitte
- Ball prallt an Seiten- und Paddle-Oberflaechen ab
- Aufprallwinkel abhaengig von Trefferposition auf dem Paddle
- KI verfolgt den Ball mit Toleranz von 8px und Geschwindigkeit 2.5px
- Sieg bei 5 Punkten
- Punkt fuer KI wenn Ball unten rausfliegt, Punkt fuer Spieler wenn Ball oben rausfliegt

## Steuerung
- **Maus:** Horizontale Mausbewegung steuert Spieler-Paddle
- **Touch:** Horizontales Wischen auf dem Canvas
- **Tastatur:** Links/Rechts-Pfeiltasten (20px pro Tastendruck)

## Technische Details
- **Typ:** HTML5 Canvas mit `requestAnimationFrame`
- **Canvas-Groesse:** 300x400px
- **Empfohlene Fenstergroesse:** 420x500px
- **Ball-Startgeschwindigkeit:** 3px in zufaelliger Richtung
- **Farben:**
  - Hintergrund: `#0f172a`
  - Mittellinie: `rgba(255,255,255,0.15)` gestrichelt
  - KI-Paddle: `#3b82f6` (Blau)
  - Spieler-Paddle: `#22c55e` (Gruen)
  - Ball: `#fff`
  - Wrap-Hintergrund: `#111`

## CSS

```css
.pong-wrap { display:flex; flex-direction:column; align-items:center; height:100%; background:#111; padding:8px; box-sizing:border-box; }
.pong-scores { display:flex; justify-content:space-between; width:300px; color:#fff; font:bold 14px/1 system-ui; padding:4px 0 6px; }
.pong-scores span { opacity:.7; }
.pong-scores strong { font-size:18px; }
.pong-wrap canvas { background:#000; border-radius:4px; display:block; }
.pong-overlay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,.72); z-index:2; cursor:pointer; }
.pong-overlay-title { color:#fff; font:bold 22px/1 system-ui; margin-bottom:6px; }
.pong-overlay-sub { color:#aaa; font:13px/1 system-ui; }
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');
  container.innerHTML = `
    <div class="pong-wrap">
      <div class="pong-scores"><span id="pong-ai-score">0</span> — <span id="pong-player-score">0</span></div>
      <canvas id="pong-canvas" width="300" height="400"></canvas>
      <div class="pong-overlay" id="pong-overlay">
        <div class="pong-overlay-title">Pong</div>
        <div class="pong-overlay-sub">Tap to start</div>
      </div>
    </div>
  `;

  const canvas = document.getElementById('pong-canvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('pong-overlay');
  const W = canvas.width, H = canvas.height;
  const PADDLE_W = 60, PADDLE_H = 8, BALL_R = 5, WIN_SCORE = 5;
  let playerX, aiX, ballX, ballY, ballVX, ballVY, playerScore, aiScore, running, animId;

  function reset() {
    playerX = W / 2 - PADDLE_W / 2;
    aiX = W / 2 - PADDLE_W / 2;
    ballX = W / 2; ballY = H / 2;
    const angle = (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1);
    ballVX = 3 * angle; ballVY = 3 * (Math.random() < 0.5 ? 1 : -1);
    playerScore = 0; aiScore = 0;
    document.getElementById('pong-player-score').textContent = '0';
    document.getElementById('pong-ai-score').textContent = '0';
  }

  function resetBall() {
    ballX = W / 2; ballY = H / 2;
    const angle = (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1);
    ballVX = 3 * angle; ballVY = 3 * (Math.random() < 0.5 ? 1 : -1);
  }

  function draw() {
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);
    ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(aiX, 12, PADDLE_W, PADDLE_H);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(playerX, H - 20, PADDLE_W, PADDLE_H);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ballX, ballY, BALL_R, 0, Math.PI * 2); ctx.fill();
  }

  function update() {
    ballX += ballVX; ballY += ballVY;
    if (ballX - BALL_R < 0 || ballX + BALL_R > W) ballVX = -ballVX;
    const aiCenter = aiX + PADDLE_W / 2;
    if (aiCenter < ballX - 8) aiX += 2.5;
    else if (aiCenter > ballX + 8) aiX -= 2.5;
    aiX = Math.max(0, Math.min(W - PADDLE_W, aiX));
    if (ballY + BALL_R >= H - 20 && ballX >= playerX && ballX <= playerX + PADDLE_W && ballVY > 0) {
      ballVY = -ballVY; ballVX += ((ballX - (playerX + PADDLE_W / 2)) / (PADDLE_W / 2)) * 2;
    }
    if (ballY - BALL_R <= 20 && ballX >= aiX && ballX <= aiX + PADDLE_W && ballVY < 0) {
      ballVY = -ballVY;
    }
    if (ballY > H + 10) { aiScore++; document.getElementById('pong-ai-score').textContent = aiScore; resetBall(); }
    if (ballY < -10) { playerScore++; document.getElementById('pong-player-score').textContent = playerScore; resetBall(); }
    if (playerScore >= WIN_SCORE || aiScore >= WIN_SCORE) {
      running = false;
      overlay.querySelector('.pong-overlay-title').textContent = playerScore >= WIN_SCORE ? 'Du gewinnst!' : 'KI gewinnt!';
      overlay.querySelector('.pong-overlay-sub').textContent = `${playerScore} \u2014 ${aiScore} \u00B7 Tap to retry`;
      overlay.style.display = 'flex';
      return;
    }
    draw();
    if (running) animId = requestAnimationFrame(update);
  }

  function start() {
    overlay.style.display = 'none'; reset(); running = true; animId = requestAnimationFrame(update);
  }

  canvas.addEventListener('mousemove', e => { if (!running) return; const r = canvas.getBoundingClientRect(); playerX = ((e.clientX - r.left) / r.width) * W - PADDLE_W / 2; playerX = Math.max(0, Math.min(W - PADDLE_W, playerX)); });
  canvas.addEventListener('touchmove', e => { if (!running) return; e.preventDefault(); const r = canvas.getBoundingClientRect(); playerX = ((e.touches[0].clientX - r.left) / r.width) * W - PADDLE_W / 2; playerX = Math.max(0, Math.min(W - PADDLE_W, playerX)); }, { passive: false });
  document.addEventListener('keydown', e => { if (!running) return; if (e.key === 'ArrowLeft') playerX = Math.max(0, playerX - 20); if (e.key === 'ArrowRight') playerX = Math.min(W - PADDLE_W, playerX + 20); });
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
  <title>Pong</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #111; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 420px; height: 500px; position: relative; }
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
