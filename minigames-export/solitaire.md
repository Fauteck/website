# Solitaer (Klondike)

## Beschreibung
Klassisches Klondike-Solitaer mit Klick-zum-Bewegen-Mechanik. Sortiere alle 52 Karten auf die vier Ablagestapel (Foundations), aufsteigend nach Farbe von Ass bis Koenig.

## Regeln & Mechanik
- **52 Karten:** 4 Farben (Pik, Herz, Karo, Kreuz), 13 Raenge (A-K)
- **Tableau:** 7 Spalten, Spalte N hat N Karten (unterste aufgedeckt)
- **Stock/Waste:** Restliche Karten als Nachziehstapel, einzeln aufdecken
- **Foundations:** 4 Stapel, aufsteigend nach Farbe (A, 2, 3, ... K)
- **Tableau-Regel:** Abwechselnde Farben (schwarz/rot), absteigend
- **Nur Koenig** darf auf leere Tableau-Spalte gelegt werden
- **Klick-Mechanik:** Karte anklicken zum Auswaehlen, dann Ziel anklicken
- Ausgewaehlte Karte wird gelb hervorgehoben
- Verdeckte Karten werden automatisch aufgedeckt
- Stock recycelt sich wenn leer
- Gewonnen wenn alle 4 Foundations 13 Karten haben

## Steuerung
- **Klick auf Stock:** Karte aufdecken
- **Klick auf Karte:** Auswaehlen (gelber Rahmen)
- **Klick auf Ziel:** Karte dorthin bewegen
- **Klick ins Leere:** Auswahl aufheben

## Technische Details
- **Typ:** DOM-basiert
- **Kartengroesse:** 56x78px
- **Tableau-Versatz:** 22px pro Karte vertikal
- **Empfohlene Fenstergroesse:** 720x560px
- **Farben:**
  - Spieltisch: `#1a5c2e` (Gruen)
  - Kartenruecken: `linear-gradient(135deg, #1e40af, #3b82f6)`
  - Kartenvorderseite: `#fff` mit `#d1d5db` Rand
  - Rote Karten (Herz/Karo): `#dc2626`
  - Schwarze Karten (Pik/Kreuz): `#1a1a2e`
  - Auswahl: Gelber Glow `#facc15`
  - Leere Slots: `rgba(255,255,255,0.08)` gestrichelt
  - Hinweisleiste: `rgba(255,255,255,0.12)`

## CSS

```css
.sol-wrap {
  height: 100%; background: #1a5c2e; padding: 12px;
  display: flex; flex-direction: column; gap: 10px; overflow: auto; position: relative;
}
.sol-hint-bar {
  background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8);
  font-size: 12px; text-align: center; padding: 5px 10px; border-radius: 6px; flex-shrink: 0;
}
.sol-top-row { display: flex; gap: 8px; align-items: flex-start; }
.sol-spacer { flex: 1; }
.sol-stock, .sol-waste, .sol-foundation { cursor: pointer; }
.sol-card {
  width: 56px; height: 78px; border-radius: 6px; font-size: 12px;
  display: flex; flex-direction: column; justify-content: space-between; user-select: none;
}
.sol-card-back {
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border: 2px solid rgba(255,255,255,0.2);
}
.sol-card-face {
  background: #fff; border: 1px solid #d1d5db; padding: 4px;
  cursor: pointer; transition: box-shadow 0.15s;
}
.sol-card-face:hover { box-shadow: 0 0 0 2px rgba(59,130,246,0.5); }
.sol-card-selected {
  box-shadow: 0 0 0 3px #facc15, 0 0 12px rgba(250,204,21,0.5) !important;
  transform: translateY(-2px);
}
.sol-card-empty {
  background: rgba(255,255,255,0.08); border: 2px dashed rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.sol-card-refresh { font-size: 22px; cursor: pointer; }
.sol-card-corner { font-size: 11px; font-weight: 700; line-height: 1; }
.sol-card-center { font-size: 20px; text-align: center; line-height: 1; }
.sol-tableau { display: flex; gap: 8px; flex: 1; }
.sol-tableau-col { position: relative; width: 56px; min-height: 78px; cursor: pointer; }
.sol-tableau-card { position: absolute; left: 0; }
.sol-win-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.7);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; z-index: 10;
}
.sol-win-msg { font-size: 24px; color: #fff; font-weight: 700; }
.sol-new-game {
  background: #22c55e; color: #fff; border: none; padding: 8px 20px;
  border-radius: 6px; cursor: pointer; font-size: 14px;
}
```

## JavaScript

```javascript
(function() {
  const container = document.getElementById('game');

  const SUITS = ['\u2660','\u2665','\u2666','\u2663'];
  const SUIT_COLORS = { '\u2660':'black','\u2663':'black','\u2665':'red','\u2666':'red' };
  const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  let deck, stock, waste, foundations, tableau, selected;

  function makeDeck() {
    const d = [];
    for (const s of SUITS) for (const r of RANKS) d.push({ suit: s, rank: r, faceUp: false });
    for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [d[i],d[j]]=[d[j],d[i]]; }
    return d;
  }

  function rankVal(r) { return RANKS.indexOf(r); }

  function init() {
    deck = makeDeck();
    stock = []; waste = [];
    foundations = [[],[],[],[]];
    tableau = [[],[],[],[],[],[],[]];
    selected = null;

    let idx = 0;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = deck[idx++];
        card.faceUp = row === col;
        tableau[col].push(card);
      }
    }
    stock = deck.slice(idx);
    stock.forEach(c => c.faceUp = false);
    render();
  }

  function canPlaceOnTableau(card, destCol) {
    const dest = tableau[destCol];
    if (dest.length === 0) return card.rank === 'K';
    const top = dest[dest.length - 1];
    if (!top.faceUp) return false;
    return SUIT_COLORS[card.suit] !== SUIT_COLORS[top.suit] && rankVal(card.rank) === rankVal(top.rank) - 1;
  }

  function canPlaceOnFoundation(card, fi) {
    const f = foundations[fi];
    if (f.length === 0) return card.rank === 'A';
    const top = f[f.length - 1];
    return card.suit === top.suit && rankVal(card.rank) === rankVal(top.rank) + 1;
  }

  function handleSelect(type, colIdx, cardIdx) {
    if (selected) {
      if (type === 'tableau') {
        const cards = selected.type === 'tableau'
          ? tableau[selected.col].slice(selected.cardIdx)
          : [selected.card];
        if (canPlaceOnTableau(cards[0], colIdx)) {
          if (selected.type === 'tableau') {
            tableau[selected.col].splice(selected.cardIdx);
            const srcCol = tableau[selected.col];
            if (srcCol.length && !srcCol[srcCol.length-1].faceUp) srcCol[srcCol.length-1].faceUp = true;
          } else if (selected.type === 'waste') {
            waste.pop();
          }
          tableau[colIdx].push(...cards);
          selected = null; render(); return;
        }
      } else if (type === 'foundation') {
        const card = selected.type === 'tableau'
          ? tableau[selected.col][tableau[selected.col].length-1]
          : selected.card;
        if (selected.type === 'tableau' && selected.cardIdx !== tableau[selected.col].length - 1) { selected = null; render(); return; }
        if (canPlaceOnFoundation(card, colIdx)) {
          if (selected.type === 'tableau') {
            tableau[selected.col].pop();
            const srcCol = tableau[selected.col];
            if (srcCol.length && !srcCol[srcCol.length-1].faceUp) srcCol[srcCol.length-1].faceUp = true;
          } else if (selected.type === 'waste') {
            waste.pop();
          }
          foundations[colIdx].push(card);
          selected = null; render(); checkWin(); return;
        }
      }
      selected = null; render(); return;
    }
    if (type === 'waste' && waste.length) {
      selected = { type: 'waste', card: waste[waste.length-1] };
    } else if (type === 'tableau' && tableau[colIdx].length && tableau[colIdx][cardIdx] && tableau[colIdx][cardIdx].faceUp) {
      selected = { type: 'tableau', col: colIdx, cardIdx: cardIdx, card: tableau[colIdx][cardIdx] };
    }
    render();
  }

  function drawFromStock() {
    if (stock.length === 0) {
      stock = waste.reverse();
      stock.forEach(c => c.faceUp = false);
      waste = [];
    } else {
      const card = stock.pop();
      card.faceUp = true;
      waste.push(card);
    }
    selected = null; render();
  }

  function checkWin() {
    if (foundations.every(f => f.length === 13)) {
      setTimeout(() => {
        const overlay = container.querySelector('.sol-win-overlay');
        if (overlay) overlay.style.display = 'flex';
      }, 300);
    }
  }

  function renderCard(card, isSelected) {
    if (!card.faceUp) return '<div class="sol-card sol-card-back"></div>';
    const color = SUIT_COLORS[card.suit] === 'red' ? '#dc2626' : '#1a1a2e';
    const sel = isSelected ? ' sol-card-selected' : '';
    return `<div class="sol-card sol-card-face${sel}" style="color:${color}">
      <span class="sol-card-corner">${card.rank}${card.suit}</span>
      <span class="sol-card-center">${card.suit}</span>
    </div>`;
  }

  function render() {
    const foundationHtml = foundations.map((f, fi) => {
      const top = f.length ? renderCard(f[f.length-1], false) : '<div class="sol-card sol-card-empty">\u2660</div>';
      return `<div class="sol-foundation" data-fi="${fi}">${top}</div>`;
    }).join('');

    const stockHtml = stock.length
      ? '<div class="sol-card sol-card-back"></div>'
      : '<div class="sol-card sol-card-empty sol-card-refresh">\u21BA</div>';

    const wasteHtml = waste.length
      ? renderCard(waste[waste.length-1], selected && selected.type === 'waste')
      : '<div class="sol-card sol-card-empty"></div>';

    const tableauHtml = tableau.map((col, ci) => {
      if (!col.length) return `<div class="sol-tableau-col" data-col="${ci}"><div class="sol-card sol-card-empty"></div></div>`;
      return `<div class="sol-tableau-col" data-col="${ci}">
        ${col.map((card, idx) => {
          const isSel = selected && selected.type === 'tableau' && selected.col === ci && idx >= selected.cardIdx;
          return `<div class="sol-tableau-card" data-idx="${idx}" style="top:${idx * 22}px">${renderCard(card, isSel)}</div>`;
        }).join('')}
      </div>`;
    }).join('');

    const hintText = selected ? 'Klicke auf das Ziel, um die Karte zu legen' : 'Klicke eine Karte zum Ausw\u00E4hlen';
    container.innerHTML = `
      <div class="sol-wrap">
        <div class="sol-hint-bar">${hintText}</div>
        <div class="sol-top-row">
          <div class="sol-stock" id="sol-stock">${stockHtml}</div>
          <div class="sol-waste" id="sol-waste">${wasteHtml}</div>
          <div class="sol-spacer"></div>
          ${foundationHtml}
        </div>
        <div class="sol-tableau" id="sol-tableau">${tableauHtml}</div>
        <div class="sol-win-overlay" style="display:none">
          <div class="sol-win-msg">\u{1F389} Gewonnen!</div>
          <button class="sol-new-game">Neues Spiel</button>
        </div>
      </div>
    `;

    container.querySelector('#sol-stock').addEventListener('click', drawFromStock);
    container.querySelector('#sol-waste').addEventListener('click', () => handleSelect('waste'));
    container.querySelectorAll('.sol-foundation').forEach(el => {
      el.addEventListener('click', () => handleSelect('foundation', +el.dataset.fi));
    });
    container.querySelectorAll('.sol-tableau-col').forEach(col => {
      col.addEventListener('click', e => {
        const cardEl = e.target.closest('.sol-tableau-card');
        const ci = +col.dataset.col;
        if (cardEl) {
          handleSelect('tableau', ci, +cardEl.dataset.idx);
        } else {
          handleSelect('tableau', ci, 0);
        }
      });
    });
    const winBtn = container.querySelector('.sol-new-game');
    if (winBtn) winBtn.addEventListener('click', init);
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
  <title>Solit\u00E4r</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #1a5c2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    #game { width: 720px; height: 560px; }
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
