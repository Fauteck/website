# Sudoku

## Beschreibung
Klassisches Sudoku-Raetsel. Ein 9x9-Gitter muss mit den Zahlen 1-9 so gefuellt werden, dass jede Zahl in jeder Zeile, Spalte und jedem 3x3-Block genau einmal vorkommt.

## Regeln & Mechanik
- 9x9 Gitter mit 3x3 Bloecken
- Generator erzeugt valide Loesung per Backtracking mit zufaelliger Reihenfolge
- 42-48 Zahlen werden entfernt fuer das Raetsel
- Vorgegebene Zahlen sind nicht aenderbar (fett, grauer Hintergrund)
- Konflikterkennung: Doppelte Zahlen in Zeile/Spalte/Block werden rot markiert
- Nummernpad mit Tasten 1-9 und Loeschen-Taste
- "Loesen"-Button zeigt die vollstaendige Loesung
- "Neues Spiel"-Button generiert neues Raetsel
- Gewonnen-Anzeige wenn alle Zellen korrekt gefuellt sind

## Steuerung
- **Klick:** Zelle auswaehlen (nur nicht-vorgegebene)
- **Nummernpad:** Zahl 1-9 eingeben oder mit X loeschen
- **Buttons:** "Neues Spiel" und "Loesen"

## Technische Details
- **Typ:** DOM-basiert (CSS-Grid)
- **Zellengroesse:** 38x38px
- **Empfohlene Fenstergroesse:** 440x540px
- **Farben:**
  - Hintergrund: `#faf8ef` (Warm-Weiss)
  - Gitter-Rand: `#333`
  - Zelle: `#fff`, Hover: `#e8e8e0`
  - Vorgegebene Zelle: `#e8e8e0`, Text `#111`
  - Ausgewaehlte Zelle: `#d4edfc`
  - Konflikt: Text `#e63946`, Hintergrund `#fde8e8`
  - Nummernpad: `#2a9d8f`, Loeschen: `#e63946`
  - Gewonnen-Text: `#2a9d8f`

## CSS

```css
.sdk-wrap { display:flex; flex-direction:column; align-items:center; height:100%; background:#faf8ef; padding:10px; box-sizing:border-box; gap:8px; overflow-y:auto; }
.sdk-header { display:flex; align-items:center; gap:10px; }
.sdk-title { font:bold 18px/1 system-ui; color:#333; }
.sdk-won { color:#2a9d8f; }
.sdk-grid { display:grid; grid-template-columns:repeat(9,38px); grid-template-rows:repeat(9,38px); border:2px solid #333; background:#333; gap:1px; flex-shrink:0; }
.sdk-cell { width:38px; height:38px; background:#fff; border:none; font:16px/1 system-ui; text-align:center; color:#333; cursor:pointer; padding:0; outline:none; transition:background .12s; display:flex; align-items:center; justify-content:center; }
.sdk-cell:hover { background:#e8e8e0; }
.sdk-given { background:#e8e8e0; font-weight:700; color:#111; cursor:default; }
.sdk-conflict { color:#e63946 !important; background:#fde8e8 !important; }
.sdk-selected { background:#d4edfc !important; }
.sdk-box-right { border-right:2px solid #333; }
.sdk-box-bottom { border-bottom:2px solid #333; }
.sdk-numpad { display:flex; gap:4px; flex-wrap:wrap; justify-content:center; }
.sdk-num-btn { width:36px; height:36px; background:#2a9d8f; color:#fff; border:none; border-radius:6px; font:bold 16px/1 system-ui; cursor:pointer; }
.sdk-num-btn:hover { background:#238b7e; }
.sdk-num-del { background:#e63946; }
.sdk-num-del:hover { background:#d12836; }
.sdk-actions { display:flex; gap:6px; }
.sdk-action-btn { padding:6px 14px; background:#555; color:#fff; border:none; border-radius:6px; font:12px/1 system-ui; cursor:pointer; }
.sdk-action-btn:hover { background:#444; }
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');
  let solution, puzzle, selected, givenCells;

  function generateBoard() {
    const b = Array.from({ length: 9 }, () => Array(9).fill(0));
    function isValid(b, r, c, n) {
      for (let i = 0; i < 9; i++) { if (b[r][i] === n || b[i][c] === n) return false; }
      const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
      for (let i = br; i < br + 3; i++) for (let j = bc; j < bc + 3; j++) { if (b[i][j] === n) return false; }
      return true;
    }
    function fill(b) {
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
          for (const n of nums) { if (isValid(b, r, c, n)) { b[r][c] = n; if (fill(b)) return true; b[r][c] = 0; } }
          return false;
        }
      }
      return true;
    }
    fill(b);
    return b;
  }

  function makePuzzle(sol) {
    const p = sol.map(r => [...r]);
    let remove = 42 + Math.floor(Math.random() * 6);
    while (remove > 0) {
      const r = Math.floor(Math.random() * 9), c = Math.floor(Math.random() * 9);
      if (p[r][c] !== 0) { p[r][c] = 0; remove--; }
    }
    return p;
  }

  function hasConflict(r, c) {
    const val = puzzle[r][c];
    if (!val) return false;
    for (let i = 0; i < 9; i++) { if (i !== c && puzzle[r][i] === val) return true; if (i !== r && puzzle[i][c] === val) return true; }
    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++) for (let j = bc; j < bc + 3; j++) { if (!(i === r && j === c) && puzzle[i][j] === val) return true; }
    return false;
  }

  function isComplete() {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) { if (puzzle[r][c] === 0 || hasConflict(r, c)) return false; }
    return true;
  }

  function render() {
    const won = isComplete();
    container.innerHTML = `
      <div class="sdk-wrap">
        <div class="sdk-header">
          <span class="sdk-title">Sudoku</span>
          ${won ? '<span class="sdk-won">\u{1F389} Gel\u00F6st!</span>' : ''}
        </div>
        <div class="sdk-grid">
          ${puzzle.map((row, r) => row.map((val, c) => {
            const isGiven = givenCells[r][c];
            const conflict = val !== 0 && hasConflict(r, c) ? ' sdk-conflict' : '';
            const sel = selected && selected[0] === r && selected[1] === c ? ' sdk-selected' : '';
            const boxRight = c % 3 === 2 && c < 8 ? ' sdk-box-right' : '';
            const boxBottom = r % 3 === 2 && r < 8 ? ' sdk-box-bottom' : '';
            return `<div class="sdk-cell${isGiven ? ' sdk-given' : ''}${conflict}${sel}${boxRight}${boxBottom}" data-r="${r}" data-c="${c}">${val || ''}</div>`;
          }).join('')).join('')}
        </div>
        <div class="sdk-numpad">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<button class="sdk-num-btn" data-num="${n}">${n}</button>`).join('')}
          <button class="sdk-num-btn sdk-num-del" data-num="0">\u2715</button>
        </div>
        <div class="sdk-actions">
          <button class="sdk-action-btn" id="sdk-new">Neues Spiel</button>
          <button class="sdk-action-btn" id="sdk-solve">L\u00F6sen</button>
        </div>
      </div>
    `;

    container.querySelectorAll('.sdk-cell:not(.sdk-given)').forEach(cell => {
      cell.addEventListener('click', () => {
        selected = [+cell.dataset.r, +cell.dataset.c];
        render();
      });
    });
    container.querySelectorAll('.sdk-num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!selected) return;
        const [r, c] = selected;
        if (givenCells[r][c]) return;
        puzzle[r][c] = +btn.dataset.num;
        render();
      });
    });
    document.getElementById('sdk-new')?.addEventListener('click', init);
    document.getElementById('sdk-solve')?.addEventListener('click', () => {
      puzzle = solution.map(r => [...r]);
      selected = null;
      render();
    });
  }

  function init() {
    solution = generateBoard();
    puzzle = makePuzzle(solution);
    givenCells = puzzle.map(r => r.map(v => v !== 0));
    selected = null;
    render();
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
  <title>Sudoku</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #faf8ef; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 440px; height: 540px; }
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
