/* ═══════════════════════════════════════════════════
   NiklasOS — script.js
   Pure Vanilla JS — No dependencies
═══════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────────
// WINDOW CONFIGS
// ─────────────────────────────────────────────────
const WIN_CONFIGS = {
  about: {
    title: 'Brave',
    color: 'orange',
    defaultW: 640, defaultH: 640,
    svgPath: 'M12 2L4 6v6c0 5.5 3.4 10.7 8 13 4.6-2.3 8-7.5 8-13V6L12 2zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z',
  },
  career: {
    title: 'Arbeitsplatz',
    color: 'amber',
    defaultW: 960, defaultH: 640,
    svgPath: 'M2 8h24v17H2zM9 8V6a2 2 0 012-2h6a2 2 0 012 2v2M2 14h24',
  },
  terminal: {
    title: 'Terminal',
    color: 'green',
    defaultW: 720, defaultH: 460,
    svgPath: 'M2 4h24v20H2zM7 11l4 4-4 4M13 19h8',
  },
  sysmon: {
    title: 'System Monitor',
    color: 'purple',
    defaultW: 640, defaultH: 500,
    svgPath: 'M2 4h24v20H2zM4 20l4-7 4 4 4-8 4 6 4-12',
  },
  bambu: {
    title: 'Bambu Studio',
    color: 'teal',
    defaultW: 760, defaultH: 580,
    svgPath: 'M4 14h20v10H4zM8 14V8l6-4 6 4v6M14 4v10',
  },
  homeassistant: {
    title: 'Home Assistant',
    color: 'orange',
    defaultW: 620, defaultH: 500,
    svgPath: 'M3 13L14 4l11 9M7 13h14v11H7zM11 18h6v6h-6z',
  },
  packages: {
    title: 'Installierte Apps',
    color: 'indigo',
    defaultW: 560, defaultH: 520,
    svgPath: 'M3 3h10v10H3zM15 3h10v10H15zM3 15h10v10H3zM15 15h10v10H15z',
  },
  changelog: {
    title: 'Changelog',
    color: 'pink',
    defaultW: 520, defaultH: 480,
    svgPath: 'M14 3a11 11 0 100 22A11 11 0 0014 3zM14 8v6l4 4',
  },
  trash: {
    title: 'Papierkorb',
    color: 'red',
    defaultW: 540, defaultH: 460,
    svgPath: 'M5 8h18M10 8V6a2 2 0 012-2h4a2 2 0 012 2v2M9 8l1 16h8l1-16M12 12v8M16 12v8',
  },
  eigenedateien: {
    title: 'Eigene Dateien',
    color: 'yellow',
    defaultW: 580, defaultH: 460,
    svgPath: 'M3 7h8l2 3h12v15H3V7z',
  },
  // Mobile-only apps
  chatgpt: {
    title: 'ChatGPT',
    color: 'green',
    defaultW: 460, defaultH: 500,
    svgPath: 'M14 3a11 11 0 100 22A11 11 0 0014 3zM9 14l3-6 3 6M10.5 11.5h5',
  },
  claudeapp: {
    title: 'Claude',
    color: 'orange',
    defaultW: 460, defaultH: 500,
    svgPath: 'M12 3C7 3 4 7 4 12s3 9 8 9c2 0 4-1 5.5-2.5M20 9c0-3-2-6-5-7',
  },
  outlook: {
    title: 'Outlook',
    color: 'blue',
    defaultW: 900, defaultH: 600,
    svgPath: 'M2 6h20v16H2zM22 6L12 14 2 6M7 10h6M7 14h4',
  },
  teams: {
    title: 'Teams',
    color: 'indigo',
    defaultW: 520, defaultH: 480,
    svgPath: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 20v-1a7 7 0 0114 0v1M20 8a3 3 0 110 6M23 20v-1a5 5 0 00-3-4.6',
  },
  jira: {
    title: 'Jira',
    color: 'blue',
    defaultW: 540, defaultH: 500,
    svgPath: 'M14 4L4 14l4 4 10-10-4-4zM10 8l-6 6 4 4 6-6',
  },
  github: {
    title: 'GitHub',
    color: 'purple',
    defaultW: 520, defaultH: 480,
    svgPath: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  },
  rss: {
    title: 'Feedly',
    color: 'teal',
    defaultW: 460, defaultH: 480,
    svgPath: 'M4 11a9 9 0 019 9M4 4a16 16 0 0116 16M5 19h.01',
  },
  filesapp: {
    title: 'Dateien',
    color: 'amber',
    defaultW: 460, defaultH: 460,
    svgPath: 'M3 7h8l2 3h12v15H3V7z',
  },
  photos: {
    title: 'Google Fotos',
    color: 'blue',
    defaultW: 580, defaultH: 520,
    svgPath: 'M14 3a11 11 0 100 22A11 11 0 0014 3zM8 10h12M14 4v10',
  },
  // Game apps
  snake: {
    title: 'Snake',
    color: 'green',
    defaultW: 420, defaultH: 500,
    svgPath: 'M6 20c0-4 3-4 3-8s-3-4-3-8M10 4h4c2 0 3 1 3 3v2c0 2-1 3-3 3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3h4M22 8a2 2 0 100-4 2 2 0 000 4',
  },
  minesweeper: {
    title: 'Minesweeper',
    color: 'red',
    defaultW: 460, defaultH: 540,
    svgPath: 'M14 3v4M7 7l3 3M21 7l-3 3M14 11a3 3 0 100 6 3 3 0 000-6zM5 21h18M8 21l2-7M20 21l-2-7',
  },
  games: {
    title: 'Games',
    color: 'red',
    defaultW: 500, defaultH: 420,
    svgPath: 'M6 4h16v16H6zM2 8h4M2 12h4M2 16h4M11 9v6M8 12h6',
  },
  solitaire: {
    title: 'Solitär',
    color: 'green',
    defaultW: 720, defaultH: 560,
    svgPath: 'M4 4h6v8H4zM14 4h6v8H14zM9 12h6v8H9z',
  },
  memory: {
    title: 'Memory',
    color: 'purple',
    defaultW: 440, defaultH: 480,
    svgPath: 'M4 4h8v8H4zM16 4h8v8H16zM4 16h8v8H4zM16 16h8v8H16z',
  },
  tetris: {
    title: 'Tetris',
    color: 'teal',
    defaultW: 380, defaultH: 540,
    svgPath: 'M6 2h4v4H6zM10 2h4v4H10zM10 6h4v4H10zM14 6h4v4H14z',
  },
  network: {
    title: 'Netzwerk',
    color: 'cyan',
    defaultW: 620, defaultH: 500,
    svgPath: 'M14 14m-4 0a4 4 0 108 0 4 4 0 00-8 0M14 3v7M14 18v7M3 14h7M18 14h7M6 6l5 5M17 17l5 5M6 22l5-5M17 11l5-5',
  },
  blog: {
    title: 'Texteditor',
    color: 'green',
    defaultW: 960, defaultH: 680,
    svgPath: 'M4 4h20v20H4zM8 8h12M8 12h8M8 16h10',
  },
  projects: {
    title: 'Projekte',
    color: 'blue',
    defaultW: 800, defaultH: 580,
    svgPath: 'M3 7h8l2 3h12v15H3V7zM10 15h8M10 19h5',
  },
  testimonials: {
    title: 'Empfehlungen',
    color: 'cyan',
    defaultW: 640, defaultH: 520,
    svgPath: 'M4 6h20v12H13l-5 4v-4H4V6zM8 10h12M8 14h8',
  },
  placeholder: {
    title: 'Mehr',
    color: 'indigo',
    defaultW: 0, defaultH: 0,
    svgPath: 'M3 7h8l2 3h12v15H3V7z',
  },
};

// ─────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────
let zCounter = 100;
let activeWindowId = null;
const openWindows = new Map(); // id → { el, state, savedPos, savedSize }
let windowOpenCount = 0;

// ─────────────────────────────────────────────────
// WINDOW MANAGER
// ─────────────────────────────────────────────────
function openWindow(id) {
  if (!WIN_CONFIGS[id]) return;

  // If already open: restore/focus
  if (openWindows.has(id)) {
    const w = openWindows.get(id);
    if (w.state === 'minimized') restoreWindow(id);
    else focusWindow(id);
    return;
  }

  const cfg = WIN_CONFIGS[id];
  const el = createWindowEl(id, cfg);
  document.getElementById('windows-layer').appendChild(el);

  const taskbarH = 44;
  const maxW = window.innerWidth;
  const maxH = window.innerHeight - taskbarH;
  const w = Math.min(cfg.defaultW, maxW - 40);
  const h = Math.min(cfg.defaultH, maxH - 40);
  const offsetN = windowOpenCount % 8;
  const x = Math.min(Math.max(20, (maxW - w) / 2 + offsetN * 22 - 88), maxW - w - 20);
  const y = Math.min(Math.max(20, (maxH - h) / 2 + offsetN * 22 - 88), maxH - h - 20);

  el.style.width  = w + 'px';
  el.style.height = h + 'px';
  el.style.left   = x + 'px';
  el.style.top    = y + 'px';

  openWindows.set(id, { el, state: 'open', savedPos: { x, y }, savedSize: { w, h } });
  windowOpenCount++;

  focusWindow(id);
  updateTaskbar();
  initWindowContent(id, el);

  // Multitasking achievement
  if (openWindows.size >= 8 && typeof showAchievement === 'function') {
    showAchievement('Multitasking-Experte', 'RAM: 97%. Aber es läuft.');
  }
}

function closeWindow(id) {
  const w = openWindows.get(id);
  if (!w) return;
  w.el.classList.add('closing');
  w.el.addEventListener('animationend', () => {
    w.el.remove();
  }, { once: true });
  openWindows.delete(id);
  if (activeWindowId === id) activeWindowId = null;
  updateTaskbar();
}

function minimizeWindow(id) {
  const w = openWindows.get(id);
  if (!w || w.state === 'minimized') return;
  w.state = 'minimized';
  w.el.classList.add('minimized');
  if (activeWindowId === id) {
    activeWindowId = null;
    // Focus topmost remaining
    const remaining = [...openWindows.entries()].filter(([, v]) => v.state === 'open');
    if (remaining.length) focusWindow(remaining[remaining.length - 1][0]);
  }
  updateTaskbar();
}

function restoreWindow(id) {
  const w = openWindows.get(id);
  if (!w) return;
  w.el.classList.remove('minimized', 'maximized');
  w.state = 'open';
  if (w.savedPos && !w.maximized) {
    w.el.style.left   = w.savedPos.x + 'px';
    w.el.style.top    = w.savedPos.y + 'px';
    w.el.style.width  = w.savedSize.w + 'px';
    w.el.style.height = w.savedSize.h + 'px';
  }
  w.maximized = false;
  focusWindow(id);
  updateTaskbar();
}

function toggleMaximize(id) {
  const w = openWindows.get(id);
  if (!w) return;
  if (w.maximized) {
    w.el.classList.remove('maximized');
    w.el.style.left   = w.savedPos.x + 'px';
    w.el.style.top    = w.savedPos.y + 'px';
    w.el.style.width  = w.savedSize.w + 'px';
    w.el.style.height = w.savedSize.h + 'px';
    w.maximized = false;
  } else {
    w.savedPos  = { x: parseInt(w.el.style.left), y: parseInt(w.el.style.top) };
    w.savedSize = { w: w.el.offsetWidth, h: w.el.offsetHeight };
    w.el.classList.add('maximized');
    w.maximized = true;
  }
}

function focusWindow(id) {
  const w = openWindows.get(id);
  if (!w) return;
  zCounter++;
  w.el.style.zIndex = zCounter;
  // Remove active from others
  openWindows.forEach((ow, oid) => {
    ow.el.classList.toggle('active', oid === id);
  });
  activeWindowId = id;
  updateTaskbar();
}

function minimizeAll() {
  [...openWindows.keys()].forEach(id => minimizeWindow(id));
}

// ─────────────────────────────────────────────────
// CREATE WINDOW ELEMENT
// ─────────────────────────────────────────────────
function createWindowEl(id, cfg) {
  const el = document.createElement('div');
  el.className = 'window';
  el.dataset.windowId = id;

  // mini icon SVG for title bar
  const colorMap = { blue: '#2563eb', amber: '#d97706', green: '#059669', purple: '#7c3aed', teal: '#0d9488', orange: '#ea580c', indigo: '#4f46e5', pink: '#db2777', cyan: '#0891b2', red: '#dc2626' };
  const iconColor = colorMap[cfg.color] || '#52b788';

  el.innerHTML = `
    <div class="win-titlebar" data-window-id="${id}">
      <div class="win-btns">
        <button class="win-btn close-btn" data-action="close" aria-label="Schließen"></button>
        <button class="win-btn min-btn"   data-action="min"   aria-label="Minimieren"></button>
        <button class="win-btn max-btn"   data-action="max"   aria-label="Maximieren"></button>
      </div>
      <div class="win-icon" style="background:${iconColor}">
        <svg viewBox="0 0 28 28" fill="none" style="width:16px;height:16px">
          <path d="${cfg.svgPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="win-title">${cfg.title}</div>
      <div class="win-meta" id="win-meta-${id}"></div>
    </div>
    <div class="win-body" id="win-body-${id}"></div>
  `;

  // Title bar button events
  el.querySelector('.close-btn').addEventListener('click', e => { e.stopPropagation(); closeWindow(id); });
  el.querySelector('.min-btn').addEventListener('click',   e => { e.stopPropagation(); minimizeWindow(id); });
  el.querySelector('.max-btn').addEventListener('click',   e => { e.stopPropagation(); toggleMaximize(id); });

  // Double-click titlebar to maximize
  el.querySelector('.win-titlebar').addEventListener('dblclick', () => toggleMaximize(id));

  // Focus on click
  el.addEventListener('mousedown', () => focusWindow(id));

  // Drag
  setupDrag(el, el.querySelector('.win-titlebar'), id);

  return el;
}

// ─────────────────────────────────────────────────
// DRAG
// ─────────────────────────────────────────────────
function setupDrag(windowEl, titlebarEl, id) {
  let dragging = false;
  let startX, startY, origX, origY;

  titlebarEl.addEventListener('mousedown', e => {
    if (e.target.classList.contains('win-btn')) return;
    const w = openWindows.get(id);
    if (w && w.maximized) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = parseInt(windowEl.style.left) || 0;
    origY = parseInt(windowEl.style.top)  || 0;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newX = origX + dx;
    const newY = origY + dy;
    const taskbarH = 44;
    const maxX = window.innerWidth  - windowEl.offsetWidth;
    const maxY = window.innerHeight - taskbarH - 34; // keep titlebar visible
    windowEl.style.left = Math.max(-windowEl.offsetWidth + 80, Math.min(newX, maxX + windowEl.offsetWidth - 80)) + 'px';
    windowEl.style.top  = Math.max(0, Math.min(newY, maxY)) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      const w = openWindows.get(id);
      if (w && !w.maximized) {
        w.savedPos  = { x: parseInt(windowEl.style.left), y: parseInt(windowEl.style.top) };
        w.savedSize = { w: windowEl.offsetWidth, h: windowEl.offsetHeight };
      }
    }
  });
}

// ─────────────────────────────────────────────────
// TASKBAR
// ─────────────────────────────────────────────────
function updateTaskbar() {
  const container = document.getElementById('tb-windows');
  container.innerHTML = '';
  const colorMap = { blue: '#2563eb', amber: '#d97706', green: '#059669', purple: '#7c3aed', teal: '#0d9488', orange: '#ea580c', indigo: '#4f46e5', pink: '#db2777', cyan: '#0891b2', red: '#dc2626' };

  openWindows.forEach((w, id) => {
    const cfg = WIN_CONFIGS[id];
    const btn = document.createElement('button');
    btn.className = 'tb-win-btn' + (id === activeWindowId ? ' active' : '') + (w.state === 'minimized' ? ' minimized-btn' : '');
    const iconColor = colorMap[cfg.color] || '#52b788';
    btn.innerHTML = `
      <div class="tb-win-icon" style="background:${iconColor}">
        <svg viewBox="0 0 28 28" fill="none" style="width:14px;height:14px">
          <path d="${cfg.svgPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>${cfg.title}</span>
    `;
    btn.title = cfg.title;
    btn.addEventListener('click', () => {
      if (w.state === 'minimized') restoreWindow(id);
      else if (id === activeWindowId) minimizeWindow(id);
      else focusWindow(id);
    });
    container.appendChild(btn);
  });
}

// ─────────────────────────────────────────────────
// INIT WINDOW CONTENT
// ─────────────────────────────────────────────────
function initWindowContent(id, el) {
  const body = el.querySelector('.win-body');
  const contentFns = {
    about:          buildAbout,
    career:         buildCareer,
    terminal:       buildTerminal,
    sysmon:         buildSysmon,
    bambu:          buildBambu,
    homeassistant:  buildHA,
    packages:       buildPackages,
    changelog:      buildChangelog,
    trash:          buildTrash,
    eigenedateien:  buildEigeneDateien,
    chatgpt:        buildChatGPT,
    claudeapp:      buildClaudeApp,
    outlook:        buildOutlook,
    teams:          buildTeams,
    jira:           buildJira,
    github:         buildGitHub,
    rss:            buildRSS,
    filesapp:       buildFilesApp,
    snake:          buildSnake,
    minesweeper:    buildMinesweeper,
    photos:         buildPhotos,
    games:          buildGames,
    solitaire:      buildSolitaire,
    memory:         buildMemory,
    tetris:         buildTetris,
    network:        buildNetwork,
    blog:           buildBlog,
    projects:       buildProjects,
    testimonials:   buildTestimonials,
  };
  if (contentFns[id]) contentFns[id](body, id);
}

// ─────────────────────────────────────────────────
// ABOUT.MD CONTENT
// ─────────────────────────────────────────────────
function buildAbout(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.innerHTML = `
    <div class="brave-chrome">
      <div class="brave-toolbar">
        <div class="brave-nav-btns">
          <button class="brave-nav-btn" disabled aria-label="Zurück">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="brave-nav-btn" disabled aria-label="Vorwärts">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="brave-nav-btn" aria-label="Aktualisieren">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8A5 5 0 103 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 5v3h-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="brave-address-bar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="color:#52b788;flex-shrink:0"><path d="M7 1.5C4 1.5 2 4 2 7s2 5.5 5 5.5 5-2.5 5-5.5-2-5.5-5-5.5zM7 1.5v11M2 7h10M2.5 4.5Q4.5 6 7 6t4.5-1.5M2.5 9.5Q4.5 8 7 8t4.5 1.5" stroke="currentColor" stroke-width="1.2"/></svg>
          <span class="brave-url">fauteck.eu/about</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="color:#52b788;margin-left:auto;flex-shrink:0"><path d="M7 1l1.5 3 3.5.5-2.5 2.5.6 3.5L7 9l-3.1 1.5.6-3.5L2 4.5 5.5 4z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
        </div>
        <div class="brave-toolbar-right">
          <button class="brave-nav-btn" aria-label="Brave Shields">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 3v4c0 3 2.5 5.7 6 7 3.5-1.3 6-4 6-7V3L8 1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M5.5 8l1.5 1.5L10.5 6" stroke="#fb923c" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="brave-nav-btn" aria-label="Menü">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="12" r="1.2" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="brave-content">
      <div class="about-content">
        <h1>Niklas Fauteck</h1>
        <div class="about-role">Head of Digital Transformation Kommunikation &middot; RTL Deutschland</div>
        <hr class="about-hr">
        <p>
          Bei RTL Deutschland baue ich die digitalen Systeme, die unsere Kommunikation
          am Laufen halten – Media Hub, PICTRON, MDC. Ich verstehe sowohl, was Redakteure
          brauchen, als auch was IT liefern kann. Das macht mich zur Schnittstelle, die
          beide Seiten versteht – und übersetzt.
        </p>
        <h2>Kernthesen</h2>
        <ul class="about-theses">
          <li>Digitalisierung ist kein Selbstzweck, sondern Mittel für Wirkung</li>
          <li>Das beste Tool ist das, das Reibung reduziert</li>
          <li>Technologie versteht man nur, wenn man sie selbst anfasst</li>
          <li>Komplexität verstehen – Einfachheit liefern</li>
          <li>Systeme, die laufen, sind besser als solche, die präsentiert werden</li>
        </ul>
        <div class="about-cta">
          <button class="btn-primary" onclick="openWindow('career')">💼 Arbeitsplatz öffnen</button>
          <button class="btn-ghost"   onclick="openWindow('terminal')">$ Terminal starten</button>
          <button class="btn-ghost"   onclick="openWindow('outlook')">→ Kontakt</button>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────
// CAREER / FILE MANAGER
// ─────────────────────────────────────────────────
const CAREER_DATA = [
  {
    id: 'rtl',
    icon: '🏢',
    name: 'seit 08/2023',
    sub: 'RTL Deutschland',
    title: 'Head of Digital Transformation Kommunikation',
    company: 'RTL Deutschland',
    period: 'seit 08/2023',
    responsibilities: [
      'Verantwortlich für die strategische und operative Weiterentwicklung digitaler Systeme und Prozesse innerhalb der Unternehmenskommunikation',
      'Konzeption und Umsetzung skalierbarer digitaler Plattformen und Workflows (Media Hub, PICTRON, MDC)',
      'Einführung und Weiterentwicklung automatisierter sowie KI-gestützter Prozesse',
      'Product Owner für zentrale Kommunikationssysteme inkl. Roadmap-Planung und Go-Live-Verantwortung',
      'Budget-, Stakeholder- und Schnittstellenmanagement in interdisziplinären Projektteams',
    ],
    impact: [
      'Zentrale digitale Plattform für 1.700+ Journalist:innen aufgebaut und weiterentwickelt',
      'Systematische Prozessautomation und KI-Integration im redaktionellen Umfeld',
      'Kulturwandel hin zu datengetriebenen, pragmatisch umgesetzten Entscheidungen',
    ],
  },
  {
    id: 'newsdesk',
    icon: '📰',
    name: '08/2020 – 08/2023',
    sub: 'RTL Deutschland',
    title: 'Leiter Newsdesk Kommunikation / Senior Manager Kommunikation & PR',
    company: 'RTL Deutschland',
    period: '08/2020 – 08/2023',
    responsibilities: [
      'Leitung des zentralen Newsdesk Kommunikation und Weiterentwicklung der Kommunikationsprozesse',
      'Weiterentwicklung des Media Hub als zentrale digitale Plattform für Presse- und Unternehmenskommunikation',
      'Steuerung komplexer Kommunikations- und Digitalprojekte in enger Zusammenarbeit mit IT und Fachbereichen',
      'Etablierung klarer Prozesse, Rollen und Schnittstellen zur Verbesserung von Effizienz und Transparenz',
    ],
    impact: [
      'Erfolgreiche Tool-Rollouts mit hoher Nutzerakzeptanz und nachhaltiger Nutzung',
      'Strukturierte digitale Kommunikationsprozesse mit messbarer Effizienzsteigerung',
    ],
  },
  {
    id: 'vox2',
    icon: '📺',
    name: '03/2019 – 08/2020',
    sub: 'VOX / RTL+',
    title: 'Senior Manager Kommunikation & PR',
    company: 'VOX / RTL+',
    period: '03/2019 – 08/2020',
    responsibilities: [
      'Verantwortung für strategische und operative Kommunikationsarbeit im Umfeld nationaler TV- und Streamingformate',
      'Themenkoordination und strategische Planung der externen Kommunikation',
      'Krisenkommunikation sowie Entwicklung konsistenter Narrative über verschiedene Kanäle',
      'Digitale Formatkommunikation in enger Abstimmung mit Redaktion, Marketing und Produktion',
    ],
    impact: [
      'Fundiertes Verständnis für Plattform-Logiken und digitale Verbreitungswege',
      'Erste systematische Verbindung von Content-Denken und technischen Möglichkeiten',
    ],
  },
  {
    id: 'vox1',
    icon: '📣',
    name: '08/2015 – 03/2019',
    sub: 'VOX',
    title: 'Presse- & Junior-Pressereferent',
    company: 'VOX',
    period: '08/2015 – 03/2019',
    responsibilities: [
      'Mitarbeit in der Presse- und Öffentlichkeitsarbeit für TV-Formate und Senderkommunikation',
      'Planung und Umsetzung von Pressearbeit und Kommunikationskampagnen',
      'Koordination von Inhalten zwischen Redaktion, Produktion und externen Partnern',
    ],
    impact: [
      'Entdeckung der Leidenschaft für Schnittstellen zwischen Kommunikation und Technologie',
      'Erste systematische Prozessoptimierung und Digitalisierung im PR-Umfeld',
    ],
  },
  {
    id: 'hbrs',
    icon: '🎓',
    name: '2009 – 2013',
    sub: 'H-BRS',
    title: 'B.Sc. Technikjournalismus / PR',
    company: 'Hochschule Bonn-Rhein-Sieg',
    period: '2009 – 2013',
    responsibilities: [
      'Studium Technikjournalismus / PR an der Hochschule Bonn-Rhein-Sieg',
      'Schwerpunkt: Vermittlung komplexer technischer und wissenschaftlicher Inhalte für unterschiedliche Zielgruppen',
      'Bachelorarbeit: "Technikkommunikation in populärkulturellen Referaten. Eine Untersuchung zum Unterhaltungswert und zur wissenschaftlichen Informationsvermittlung in Science Slam Kurzvorträgen"',
    ],
    impact: [
      'Fundiertes Fundament für die Verbindung von Technologie, Wissenschaftskommunikation und PR',
    ],
  },
];

function buildCareerMobile(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.background = '#f7f8f6';

  body.innerHTML = `
    <div class="mob-career-wrap">
      <div class="mob-career-header">
        <span>💼</span>
        <span>Karriere</span>
      </div>
      <div class="mob-career-timeline">
        ${CAREER_DATA.map((e, i) => `
          <div class="mob-career-item" data-career-idx="${i}">
            <div class="mob-career-connector">
              <div class="mob-career-dot"></div>
              ${i < CAREER_DATA.length - 1 ? '<div class="mob-career-line"></div>' : ''}
            </div>
            <div class="mob-career-card">
              <div class="mob-career-card-header">
                <div>
                  <div class="mob-career-period">${e.period}</div>
                  <div class="mob-career-title">${e.title}</div>
                  <div class="mob-career-company">${e.company}</div>
                </div>
                <div class="mob-career-toggle">▼</div>
              </div>
              <div class="mob-career-details" style="display:none">
                <div class="mob-career-section-label">Verantwortung</div>
                <ul class="mob-career-list">
                  ${e.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
                ${e.impact.length ? `
                  <div class="mob-career-section-label" style="margin-top:10px">Impact</div>
                  <ul class="mob-career-list mob-career-list-impact">
                    ${e.impact.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Expand/collapse on tap
  body.querySelectorAll('.mob-career-item').forEach(item => {
    const header  = item.querySelector('.mob-career-card-header');
    const details = item.querySelector('.mob-career-details');
    const toggle  = item.querySelector('.mob-career-toggle');
    header.addEventListener('click', () => {
      const open = details.style.display !== 'none';
      details.style.display = open ? 'none' : 'block';
      toggle.textContent = open ? '▼' : '▲';
      item.querySelector('.mob-career-dot').classList.toggle('active', !open);
    });
  });

  // Open first item by default
  const firstItem = body.querySelector('.mob-career-item');
  if (firstItem) {
    const d = firstItem.querySelector('.mob-career-details');
    const t = firstItem.querySelector('.mob-career-toggle');
    const dot = firstItem.querySelector('.mob-career-dot');
    if (d) d.style.display = 'block';
    if (t) t.textContent = '▲';
    if (dot) dot.classList.add('active');
  }
}

// Drive letters for career entries
const CAREER_DRIVES = ['C:', 'D:', 'E:', 'F:', 'G:'];
const CAREER_DRIVE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
const CAREER_DRIVE_FILLS  = [85, 60, 40, 30, 20]; // fake usage %

function buildCareer(body) {
  if (window.innerWidth < 768) return buildCareerMobile(body);

  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.background = '#f0f0f0';

  const drivesHtml = CAREER_DATA.map((e, i) => `
    <div class="ap-drive${i === 0 ? ' active' : ''}" data-career-id="${e.id}" tabindex="0">
      <div class="ap-drive-icon">
        <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
          <rect x="4" y="14" width="40" height="26" rx="3" fill="${CAREER_DRIVE_COLORS[i]}" opacity="0.15" stroke="${CAREER_DRIVE_COLORS[i]}" stroke-width="1.8"/>
          <rect x="4" y="14" width="40" height="10" rx="3" fill="${CAREER_DRIVE_COLORS[i]}" opacity="0.3"/>
          <circle cx="38" cy="19" r="3" fill="${CAREER_DRIVE_COLORS[i]}"/>
          <circle cx="30" cy="19" r="3" fill="${CAREER_DRIVE_COLORS[i]}" opacity="0.5"/>
          <rect x="8" y="30" width="${Math.round(32 * CAREER_DRIVE_FILLS[i] / 100)}" height="5" rx="2" fill="${CAREER_DRIVE_COLORS[i]}" opacity="0.7"/>
          <rect x="8" y="30" width="32" height="5" rx="2" stroke="${CAREER_DRIVE_COLORS[i]}" stroke-width="1" fill="none"/>
        </svg>
      </div>
      <div class="ap-drive-info">
        <div class="ap-drive-label">${e.sub}</div>
        <div class="ap-drive-letter">(${CAREER_DRIVES[i] || '?:'})</div>
        <div class="ap-drive-period">${e.period}</div>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="ap-wrap">
      <div class="ap-toolbar">
        <div class="ap-toolbar-btns">
          <div class="ap-toolbar-btn" title="Zurück">‹</div>
          <div class="ap-toolbar-btn" title="Vor">›</div>
          <div class="ap-toolbar-btn" title="Hoch">↑</div>
        </div>
        <div class="ap-path">/Niklas/Arbeitsplatz</div>
        <a href="full/cv-niklas-fauteck.pdf" download="Niklas_Fauteck_CV.pdf" class="ap-cv-download" title="Lebenslauf herunterladen">
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          CV (PDF)
        </a>
        <div class="ap-view-btns">
          <div class="ap-toolbar-btn ap-btn-active" title="Symbole">⊞</div>
          <div class="ap-toolbar-btn" title="Liste">☰</div>
        </div>
      </div>
      <div class="ap-body">
        <div class="ap-sidebar">
          <div class="ap-sidebar-section">Orte</div>
          <div class="ap-sidebar-item active" data-nav="career">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><rect x="1" y="5" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 5V4a2 2 0 014 0v1" stroke="currentColor" stroke-width="1.3"/></svg>
            Arbeitsplatz
          </div>
          <div class="ap-sidebar-item" data-nav="eigenedateien">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M1 4h6l1.5 2H15v8H1V4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
            Eigene Dateien
          </div>
          <div class="ap-sidebar-item" data-nav="outlook">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><rect x="1" y="3" width="14" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1 3l7 5 7-5" stroke="currentColor" stroke-width="1.3"/></svg>
            Outlook
          </div>
          <div class="ap-sidebar-item" data-nav="trash">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 5h10M6 5V3a1 1 0 011-1h2a1 1 0 011 1v2M5 5l.7 9h4.6l.7-9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Papierkorb
          </div>
        </div>
        <div class="ap-main">
          <div class="ap-section-label">Laufwerke</div>
          <div class="ap-drives-grid" id="ap-drives-grid">
            ${drivesHtml}
          </div>
          <div class="ap-detail-pane" id="ap-detail-pane" style="display:none"></div>
        </div>
      </div>
      <div class="ap-statusbar" id="ap-statusbar">5 Objekte</div>
    </div>
  `;

  // Show first by default
  showCareerDetail(body, CAREER_DATA[0].id);

  body.querySelectorAll('.ap-drive').forEach(el => {
    el.addEventListener('click', () => {
      body.querySelectorAll('.ap-drive').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      showCareerDetail(body, el.dataset.careerId);
    });
    el.addEventListener('dblclick', () => {
      // double click could expand detail, same as single for now
    });
  });

  body.querySelectorAll('.ap-sidebar-item[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const t = el.dataset.nav;
      if (t !== 'career') openWindow(t);
    });
  });
}

function showCareerDetail(body, careerId) {
  const data = CAREER_DATA.find(e => e.id === careerId);
  // Support both old fm-detail-pane and new ap-detail-pane
  const pane = body.querySelector('#ap-detail-pane') || body.querySelector('#fm-detail-pane');
  if (!data || !pane) return;

  pane.style.display = 'block';
  pane.innerHTML = `
    <div class="ap-detail-header">
      <span class="ap-detail-icon">${data.icon}</span>
      <div>
        <div class="ap-detail-title">${data.title}</div>
        <div class="ap-detail-company">${data.company}</div>
        <div class="ap-detail-period">${data.period}</div>
      </div>
    </div>
    <div class="ap-detail-section">
      <h4>Verantwortung</h4>
      <ul class="ap-detail-list">
        ${data.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    ${data.impact.length ? `
    <div class="ap-detail-section">
      <h4>Wirkung</h4>
      <ul class="ap-detail-list">
        ${data.impact.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>` : ''}
  `;
}

// ─────────────────────────────────────────────────
// TERMINAL
// ─────────────────────────────────────────────────
const TERM_COMMANDS = {
  help: () => [
    { t: 'success', v: 'Verfügbare Befehle:' },
    { t: 'empty' },
    { t: 'accent',  v: '  whoami          → Kurze Selbstbeschreibung' },
    { t: 'accent',  v: '  ls              → Verzeichnisse anzeigen' },
    { t: 'accent',  v: '  cat values.txt  → Werte und Prinzipien' },
    { t: 'accent',  v: '  cat about.txt   → Kurzprofil' },
    { t: 'accent',  v: '  cat README.md   → Projekt-Dokumentation' },
    { t: 'accent',  v: '  skills          → Skill-Übersicht' },
    { t: 'accent',  v: '  skills --verbose → Detaillierte Skills' },
    { t: 'accent',  v: '  now             → Aktueller Fokus' },
    { t: 'accent',  v: '  anti_patterns   → Was ich ablehne' },
    { t: 'accent',  v: '  history         → Interaktionshistorie' },
    { t: 'accent',  v: '  fortune         → Weisheit des Tages' },
    { t: 'accent',  v: '  man niklas      → Manual Page' },
    { t: 'accent',  v: '  neofetch        → System-Info' },
    { t: 'accent',  v: '  cowsay <text>   → ASCII-Kuh' },
    { t: 'accent',  v: '  apt list        → Paket-Verwaltung' },
    { t: 'accent',  v: '  matrix          → 🐇' },
    { t: 'accent',  v: '  coffee          → ☕' },
    { t: 'accent',  v: '  clear           → Terminal leeren' },
    { t: 'empty' },
    { t: 'success', v: 'Für Recruiter & Auftraggeber:' },
    { t: 'empty' },
    { t: 'accent',  v: '  download cv     → Lebenslauf herunterladen (PDF)' },
    { t: 'accent',  v: '  references      → Empfehlungen' },
    { t: 'accent',  v: '  availability    → Verfügbarkeit' },
    { t: 'accent',  v: '  contact         → Kontaktdaten' },
    { t: 'accent',  v: '  projects        → Ausgewählte Projekte' },
    { t: 'accent',  v: '  interview       → Gespräch vereinbaren' },
  ],
  whoami: () => [
    { t: 'out', v: 'niklas-fauteck' },
    { t: 'empty' },
    { t: 'out', v: 'Brückenbauer zwischen Kommunikation und Technologie.' },
    { t: 'out', v: 'Head of Digital Transformation @ RTL Deutschland.' },
    { t: 'empty' },
    { t: 'dim', v: 'Systemdenker. Pragmatiker. Neugierig.' },
  ],
  ls: () => [
    { t: 'accent', v: 'career/       interests/    stack/        values/       contact/' },
    { t: 'dim',    v: 'README.md     about.txt     values.txt' },
  ],
  'ls career': () => [
    { t: 'dim',    v: '# /Niklas/Karriere/' },
    { t: 'accent', v: '2023-heute/   2020-2023/   2019-2020/   2015-2019/   2009-2013/' },
  ],
  'ls interests': () => [
    { t: 'accent', v: '3d-printing/   smart-home/   darts/   ki-vibecoding/   automation/' },
  ],
  'ls stack': () => [
    { t: 'accent', v: 'ai/   collaboration/   infrastructure/   analytics/' },
  ],
  'cat about.txt': () => [
    { t: 'bold', v: '# Niklas Fauteck — Kurzprofil' },
    { t: 'empty' },
    { t: 'out', v: 'Seit über 16 Jahren an der Schnittstelle zwischen Medien,' },
    { t: 'out', v: 'Kommunikation und digitaler Transformation.' },
    { t: 'empty' },
    { t: 'out', v: 'Ich übersetze zwischen Kommunikation und Technologie –' },
    { t: 'out', v: 'und baue Systeme, die Menschen wirklich nutzen.' },
    { t: 'empty' },
    { t: 'dim', v: 'Standort: Köln, Deutschland' },
    { t: 'dim', v: 'Verfügbar: Gespräche, Projekte, Kaffee' },
  ],
  'cat readme.md': () => [
    { t: 'bold',    v: '# NiklasOS — Personal Branding OS' },
    { t: 'empty' },
    { t: 'dim',     v: 'Statische Portfolio-Website als interaktives Betriebssystem.' },
    { t: 'dim',     v: 'Vanilla HTML · CSS · JavaScript — Zero Dependencies.' },
    { t: 'empty' },
    { t: 'success', v: '[Features]' },
    { t: 'out',     v: '  Boot-Sequenz & Login       Terminal (~20 Befehle)' },
    { t: 'out',     v: '  Fenstermanager (Drag/Resize)  Spiele (Snake, Tetris, ...)' },
    { t: 'out',     v: '  System Monitor             Bambu Studio & Home Assistant' },
    { t: 'out',     v: '  Desktop-Kontextmenü        Globale Suche' },
    { t: 'out',     v: '  Mobile Lock/Home-Screen    Fake Calls & Messages' },
    { t: 'empty' },
    { t: 'success', v: '[Architektur]' },
    { t: 'out',     v: '  index.html   → Semantisches HTML5, Schema.org' },
    { t: 'out',     v: '  style.css    → CSS3, Custom Properties, Responsive' },
    { t: 'out',     v: '  script.js    → Vanilla JS, ~4.500 Zeilen' },
    { t: 'out',     v: '  /full/       → Klassische Portfolio-Variante' },
    { t: 'empty' },
    { t: 'success', v: '[Stack]' },
    { t: 'out',     v: '  HTML5 · CSS3 · Vanilla JS · Google Fonts' },
    { t: 'out',     v: '  Kein Build-Prozess · Kein Backend · Kein Framework' },
    { t: 'empty' },
    { t: 'success', v: '[Sicherheit]' },
    { t: 'out',     v: '  Kein Tracking · Keine Cookies · Keine API' },
    { t: 'out',     v: '  KI-Crawler blockiert (robots.txt)' },
    { t: 'out',     v: '  Input-Sanitierung via escapeHtml()' },
    { t: 'empty' },
    { t: 'dim',     v: '© Niklas Fauteck — Alle Rechte vorbehalten.' },
    { t: 'dim',     v: 'Vollständige README: github.com/Fauteck/website' },
  ],
  'cat values.txt': () => [
    { t: 'bold',    v: '# values.txt' },
    { t: 'empty' },
    { t: 'success', v: '→ Menschen vor Tools' },
    { t: 'success', v: '→ Wirkung vor Buzzwords' },
    { t: 'success', v: '→ Verstehen vor Empfehlen' },
    { t: 'success', v: '→ Systeme, die laufen, nicht nur präsentiert werden' },
    { t: 'success', v: '→ Pragmatismus vor Perfektion' },
    { t: 'success', v: '→ Adoption ist wichtiger als Implementierung' },
  ],
  skills: () => [
    { t: 'bold', v: 'niklas@niklasos:~$ skills' },
    { t: 'empty' },
    { t: 'accent',  v: 'Languages:   DE (native), EN (professional)' },
    { t: 'accent',  v: 'AI:          Claude, ChatGPT, Cursor, n8n, Make.com' },
    { t: 'accent',  v: 'Project:     Confluence, Jira, Notion, Miro' },
    { t: 'accent',  v: 'Infra:       Docker, GitHub Actions, Home Assistant' },
    { t: 'accent',  v: 'Analytics:   Power BI, Google Analytics' },
    { t: 'dim',     v: '' },
    { t: 'dim',     v: 'Für Details: skills --verbose' },
  ],
  'skills --verbose': () => [
    { t: 'bold',    v: '# Capability Report — niklas-fauteck v2026.03' },
    { t: 'empty' },
    { t: 'success', v: '[AI & Automation]' },
    { t: 'out',     v: '  Prompt Engineering      ████████████████████ expert' },
    { t: 'out',     v: '  AI Workflow Design      ████████████████████ expert' },
    { t: 'out',     v: '  n8n / Make.com          ████████████████░░░░ advanced' },
    { t: 'out',     v: '  Vibecoding              █████████████████░░░ advanced' },
    { t: 'empty' },
    { t: 'success', v: '[Digital Transformation]' },
    { t: 'out',     v: '  Strategy & Roadmapping  ████████████████████ expert' },
    { t: 'out',     v: '  Change Management       ████████████████████ expert' },
    { t: 'out',     v: '  Tool Adoption           ████████████████████ expert' },
    { t: 'out',     v: '  Stakeholder Mgmt        █████████████████░░░ advanced' },
    { t: 'empty' },
    { t: 'success', v: '[Technical]' },
    { t: 'out',     v: '  Docker / Containerizing ████████████░░░░░░░░ intermediate' },
    { t: 'out',     v: '  GitHub / GitOps         █████████████░░░░░░░ intermediate' },
    { t: 'out',     v: '  Home Assistant          █████████████████░░░ advanced' },
    { t: 'out',     v: '  3D Printing (FDM)       ████████████████░░░░ advanced' },
  ],
  now: () => [
    { t: 'bold', v: '# Aktueller Fokus — v2026.03' },
    { t: 'empty' },
    { t: 'success', v: '● KI-gestützte Workflows und interne Tool-Adoption' },
    { t: 'success', v: '● Automation von redaktionellen Prozessen' },
    { t: 'success', v: '● Smart Home Optimierungen mit Home Assistant' },
    { t: 'success', v: '● 3D-Druck Prototypen für Alltagsprobleme' },
    { t: 'empty' },
    { t: 'dim', v: 'Status: aktiv · offen für Gespräche' },
    { t: 'dim', v: 'Timezone: Europe/Berlin (CET)' },
  ],
  anti_patterns: () => [
    { t: 'bold', v: '# anti_patterns — was hier in den Papierkorb kommt:' },
    { t: 'empty' },
    { t: 'err', v: '⚠ Digitalisierung nur für PowerPoint-Decks' },
    { t: 'err', v: '⚠ Tool-Einführungen ohne Nutzer-Adoption-Plan' },
    { t: 'err', v: '⚠ Meetings ohne Entscheidung oder klaren Output' },
    { t: 'err', v: '⚠ KI als Show-Feature statt als echter Workflow' },
    { t: 'err', v: '⚠ Buzzword-Projekte ohne konkreten Nutzwert' },
    { t: 'err', v: '⚠ Prozessoptimierung am echten Anwender vorbei' },
    { t: 'err', v: '⚠ Komplexität als Selbstzweck' },
    { t: 'empty' },
    { t: 'dim', v: 'sudo rm -rf buzzwords   →  Permission denied (aber wir arbeiten daran)' },
  ],
  history: () => [
    { t: 'dim', v: '    1  wake-up' },
    { t: 'dim', v: '    2  coffee --double-shot' },
    { t: 'dim', v: '    3  read-news --filter=relevant' },
    { t: 'dim', v: '    4  open jira' },
    { t: 'dim', v: '    5  close jira  # zu viele Tickets ohne Kontext' },
    { t: 'dim', v: '    6  build-automation --pragmatic' },
    { t: 'dim', v: '    7  solve-problem --user-first' },
    { t: 'dim', v: '    8  document-it --briefly' },
    { t: 'dim', v: '    9  automate --so-I-dont-do-it-again' },
    { t: 'dim', v: '   10  git commit -m "works and actually helps users"' },
  ],
  fortune: () => {
    const quotes = [
      'Technologie ist nur gut, wenn Menschen sie wirklich nutzen.',
      'Das beste Tool ist das, das Reibung reduziert.',
      'Adoption ist wichtiger als Implementierung.',
      'Komplexität verstehen – Einfachheit liefern.',
      'Systeme, die laufen, sind besser als solche, die präsentiert werden.',
      'Kein Tool rettet eine schlechte Strategie.',
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    return [
      { t: 'accent', v: `"${q}"` },
      { t: 'dim',    v: '    — niklas-wisdom v2026.03' },
    ];
  },
  'man niklas': () => [
    { t: 'bold',    v: 'NIKLAS(1)              User Manual              NIKLAS(1)' },
    { t: 'empty' },
    { t: 'success', v: 'NAME' },
    { t: 'out',     v: '       niklas - bridge between communication and technology' },
    { t: 'empty' },
    { t: 'success', v: 'SYNOPSIS' },
    { t: 'out',     v: '       niklas [--team] [--stakeholder] [--problem] [--deadline]' },
    { t: 'empty' },
    { t: 'success', v: 'DESCRIPTION' },
    { t: 'out',     v: '       Niklas is a digital transformation specialist who translates' },
    { t: 'out',     v: '       between communication teams and technology departments.' },
    { t: 'empty' },
    { t: 'out',     v: '       He can be found solving real problems, building automations,' },
    { t: 'out',     v: '       or experimenting with 3D printers at 11pm.' },
    { t: 'empty' },
    { t: 'success', v: 'OPTIONS' },
    { t: 'out',     v: '       --team           Works well with diverse teams' },
    { t: 'out',     v: '       --stakeholder    Translates tech to human' },
    { t: 'out',     v: '       --problem        Finds pragmatic solutions' },
    { t: 'out',     v: '       --deadline       Delivery-oriented' },
    { t: 'empty' },
    { t: 'success', v: 'EXIT CODES' },
    { t: 'out',     v: '       0  Successfully shipped something useful' },
    { t: 'out',     v: '       1  Deployed Buzzword (rare)' },
    { t: 'empty' },
    { t: 'success', v: 'BUGS' },
    { t: 'out',     v: '       Known to get very excited about automations.' },
    { t: 'out',     v: '       Sometimes opens too many terminal windows.' },
    { t: 'empty' },
    { t: 'dim',     v: 'Niklas v2026.03              2026                   NIKLAS(1)' },
  ],
  'sudo hire niklas': () => [
    { t: 'dim', v: '[sudo] Passwort für universe: ****' },
    { t: 'empty' },
    { t: 'success', v: 'Das klingt nach einem ausgezeichneten Plan.' },
    { t: 'out', v: 'Schreib mir: niklas@fauteck.eu' },
    { t: 'out', v: 'Oder direkt: linkedin.com/in/niklas-fauteck' },
  ],
  'rm bureaucracy': () => [
    { t: 'err', v: "rm: cannot remove 'bureaucracy': Permission denied" },
    { t: 'dim', v: '# aber wir arbeiten konsequent daran.' },
  ],
  'ping linkedin.com': () => [
    { t: 'out', v: 'PING linkedin.com: 56 data bytes' },
    { t: 'out', v: '64 bytes from niklas-fauteck: time=12ms' },
    { t: 'out', v: '64 bytes from niklas-fauteck: time=9ms' },
    { t: 'out', v: '64 bytes from niklas-fauteck: time=11ms' },
    { t: 'success', v: 'Status: reachable · Response: fast · Connection: open' },
  ],
  'apt list --installed': () => {
    const lines = [{ t: 'bold', v: 'Installierte Pakete:' }, { t: 'empty' }];
    PACKAGES.forEach(cat => {
      lines.push({ t: 'success', v: `[${cat.cat}]` });
      cat.items.forEach(p => {
        lines.push({ t: 'out', v: `  ${p.name}/${p.ver} [installiert]` });
      });
      lines.push({ t: 'empty' });
    });
    return lines;
  },
  'apt list': () => [
    { t: 'dim', v: 'Hinweis: Nutze --installed für alle installierten Pakete.' },
  ],
  'sudo apt update': () => [
    { t: 'success', v: 'Hit:1 https://niklasos.dev stable InRelease' },
    { t: 'success', v: 'Hit:2 https://niklasos.dev/ai stable InRelease' },
    { t: 'success', v: 'Hit:3 https://niklasos.dev/tools stable InRelease' },
    { t: 'out', v: 'Paketlisten werden gelesen... Fertig' },
    { t: 'out', v: 'Abhängigkeitsbaum wird aufgebaut... Fertig' },
    { t: 'success', v: 'Alle Pakete sind aktuell.' },
  ],
  'neofetch': () => [
    { t: 'accent', v: '        ╭──────────────╮' },
    { t: 'accent', v: '        │   ███╗  ██╗  │    OS: NiklasOS 2026 LTS' },
    { t: 'accent', v: '        │   ████╗ ██║  │    Host: Niklas Fauteck' },
    { t: 'accent', v: '        │   ██╔████║   │    Uptime: 6 Jahre (RTL)' },
    { t: 'accent', v: '        │   ██║╚████║  │    Shell: bash (Pragmatismus)' },
    { t: 'accent', v: '        │   ██║ ╚███║  │    CPU: bridge_business_tech @ 98%' },
    { t: 'accent', v: '        │   ╚═╝  ╚══╝  │    Memory: 12/16 GB (Ideen/Kapazität)' },
    { t: 'accent', v: '        ╰──────────────╯    GPU: curiosity_engine (ALWAYS ON)' },
    { t: 'empty' },
    { t: 'dim', v: '  ██ ██ ██ ██ ██ ██ ██ ██' },
  ],
  'cowsay': () => [
    { t: 'err', v: 'Usage: cowsay <message>' },
    { t: 'dim', v: 'Beispiel: cowsay niklas' },
  ],
  'cowsay niklas': () => {
    const theses = [
      'Technologie ist nur gut, wenn Menschen sie nutzen.',
      'Adoption > Implementierung.',
      'Pragmatismus schlägt Perfektion.',
      'Systeme bauen, die laufen.',
      'Wirkung statt Buzzwords.',
    ];
    const t = theses[Math.floor(Math.random() * theses.length)];
    return [
      { t: 'out', v: ' _' + '_'.repeat(t.length + 2) + '_' },
      { t: 'out', v: '< ' + t + ' >' },
      { t: 'out', v: ' -' + '-'.repeat(t.length + 2) + '-' },
      { t: 'out', v: '        \\   ^__^' },
      { t: 'out', v: '         \\  (oo)\\_______' },
      { t: 'out', v: '            (__)\\       )\\/\\' },
      { t: 'out', v: '                ||----w |' },
      { t: 'out', v: '                ||     ||' },
    ];
  },
  'sudo rm -rf /': () => [
    { t: 'err', v: 'Netter Versuch. 😏' },
    { t: 'dim', v: 'Läuft in einer VM. Keine Chance.' },
  ],
  'coffee': () => [
    { t: 'out', v: '    ( (' },
    { t: 'out', v: '     ) )' },
    { t: 'out', v: '  ........' },
    { t: 'out', v: '  |      |]' },
    { t: 'out', v: '  \\      /' },
    { t: 'out', v: '   `----´' },
    { t: 'empty' },
    { t: 'success', v: 'Energiepegel: ████████░░ 80%' },
    { t: 'dim', v: 'Optimal für komplexe Systemarchitektur.' },
  ],
  // ── Recruiter Commands ──
  'download cv': () => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'full/cv-niklas-fauteck.pdf';
      a.download = 'Niklas_Fauteck_CV.pdf';
      a.click();
    }, 300);
    return [
      { t: 'success', v: 'Lebenslauf wird heruntergeladen...' },
      { t: 'dim', v: '→ Niklas_Fauteck_CV.pdf' },
      { t: 'empty' },
      { t: 'dim', v: 'Alternativ: Karrierefenster öffnen für interaktive Version.' },
    ];
  },
  'references': () => [
    { t: 'bold', v: '# Empfehlungen' },
    { t: 'empty' },
    { t: 'accent', v: '"Niklas hat die seltene Fähigkeit, technische Komplexität in' },
    { t: 'accent', v: ' verständliche Lösungen zu übersetzen, die von Teams tatsächlich' },
    { t: 'accent', v: ' angenommen werden."' },
    { t: 'dim', v: '    — Kolleg:in bei RTL Deutschland' },
    { t: 'empty' },
    { t: 'accent', v: '"Pragmatisch, lösungsorientiert und immer mit dem Blick auf den' },
    { t: 'accent', v: ' echten Nutzen für die Anwender."' },
    { t: 'dim', v: '    — Stakeholder Digital Projects' },
    { t: 'empty' },
    { t: 'success', v: 'Ausführliche Empfehlungen: linkedin.com/in/niklas-fauteck' },
  ],
  'availability': () => [
    { t: 'bold', v: '# Verfügbarkeit' },
    { t: 'empty' },
    { t: 'success', v: 'Status:   Aktuell in Festanstellung bei RTL Deutschland' },
    { t: 'accent', v: 'Offen für: Spannende Gespräche, Projekte und neue Perspektiven' },
    { t: 'empty' },
    { t: 'out', v: 'Reaktionszeit: In der Regel innerhalb von 24h' },
    { t: 'out', v: 'Timezone:      Europe/Berlin (CET/CEST)' },
    { t: 'empty' },
    { t: 'dim', v: 'Kontakt: niklas@fauteck.eu · linkedin.com/in/niklas-fauteck' },
  ],
  'contact': () => [
    { t: 'bold', v: '# Kontakt' },
    { t: 'empty' },
    { t: 'success', v: 'E-Mail:     niklas@fauteck.eu' },
    { t: 'success', v: 'LinkedIn:   linkedin.com/in/niklas-fauteck' },
    { t: 'empty' },
    { t: 'out', v: 'Reaktionszeit: In der Regel innerhalb von 24h' },
    { t: 'out', v: 'Bevorzugt:     E-Mail oder LinkedIn-Nachricht' },
    { t: 'empty' },
    { t: 'dim', v: 'Auch erreichbar via: sudo hire niklas' },
  ],
  'projects': () => {
    const lines = [
      { t: 'bold', v: '# Ausgewählte Projekte' },
      { t: 'empty' },
    ];
    PROJECTS_DATA.forEach(p => {
      lines.push({ t: 'success', v: `[${p.name}] ${p.period}` });
      lines.push({ t: 'out', v: `  Rolle: ${p.role}` });
      lines.push({ t: 'accent', v: `  Impact: ${p.impact}` });
      lines.push({ t: 'empty' });
    });
    return lines;
  },
  'interview': () => [
    { t: 'success', v: 'Am besten per E-Mail vereinbaren:' },
    { t: 'out', v: '→ niklas@fauteck.eu' },
    { t: 'empty' },
    { t: 'dim', v: 'Ich freue mich auf das Gespräch.' },
  ],
};

function buildTerminal(body) {
  body.style.padding = '0';
  body.innerHTML = `
    <div class="terminal">
      <div class="term-output" id="term-out"></div>
      <div class="term-input-row">
        <span class="term-prompt-label">niklas@niklasos:~$</span>
        <input class="term-input" id="term-in" type="text"
               placeholder="help eingeben..." autocomplete="off"
               autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
    </div>
  `;

  const output = body.querySelector('#term-out');
  const input  = body.querySelector('#term-in');
  const history = [];
  let historyIdx = -1;

  // Welcome message
  appendTermLines(output, [
    { t: 'success bold', v: 'NiklasOS Terminal — v2026.03' },
    { t: 'dim',          v: '─────────────────────────────────────────────' },
    { t: 'out',          v: 'Willkommen. Tippe <span style="color:#52b788">help</span> für verfügbare Befehle.' },
    { t: 'empty' },
  ]);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      input.value = '';
      historyIdx = -1;
      if (!cmd) return;
      history.unshift(cmd);

      // Echo prompt
      appendTermLines(output, [
        { t: 'prompt', v: `niklas@niklasos:~$ ${escapeHtml(cmd)}` },
      ]);

      processTermCmd(cmd.toLowerCase(), output);
      output.scrollTop = output.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      } else {
        historyIdx = -1;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase().trim();
      const match = Object.keys(TERM_COMMANDS).find(k => k.startsWith(partial) && k !== partial);
      if (match) input.value = match;
    }
  });

  // Focus input when clicking terminal area
  body.addEventListener('click', () => input.focus());
  setTimeout(() => input.focus(), 100);
}

function processTermCmd(cmd, output) {
  if (cmd === 'clear') {
    output.innerHTML = '';
    return;
  }
  if (cmd === 'matrix') {
    runMatrixEffect(output);
    return;
  }
  const handler = TERM_COMMANDS[cmd];
  if (handler) {
    const result = typeof handler === 'function' ? handler() : handler;
    appendTermLines(output, result);
  } else {
    appendTermLines(output, [
      { t: 'err', v: `bash: ${escapeHtml(cmd)}: Befehl nicht gefunden. Tippe 'help'.` },
    ]);
  }
  appendTermLines(output, [{ t: 'empty' }]);
  output.scrollTop = output.scrollHeight;

  // Easter egg tracking
  if (typeof trackTermCmd === 'function') trackTermCmd(cmd);
}

function runMatrixEffect(output) {
  const container = document.createElement('div');
  container.className = 'matrix-rain';
  container.style.cssText = 'position:relative;height:120px;overflow:hidden;background:#000;border-radius:4px;margin:4px 0;';
  output.appendChild(container);

  const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEF';
  const cols = 30;
  for (let i = 0; i < cols; i++) {
    const col = document.createElement('span');
    col.style.cssText = `position:absolute;left:${(i/cols)*100}%;top:-20px;color:#4ade80;font-family:var(--font-mono);font-size:11px;writing-mode:vertical-rl;opacity:${0.3+Math.random()*0.7};animation:matrix-fall ${1+Math.random()*2}s linear ${Math.random()*2}s infinite;`;
    let text = '';
    for (let j = 0; j < 8; j++) text += chars[Math.floor(Math.random()*chars.length)];
    col.textContent = text;
    container.appendChild(col);
  }

  setTimeout(() => {
    container.remove();
    appendTermLines(output, [
      { t: 'success', v: 'Wake up, Niklas...' },
      { t: 'dim', v: 'The Matrix has you.' },
    ]);
    appendTermLines(output, [{ t: 'empty' }]);
    output.scrollTop = output.scrollHeight;
    if (typeof showAchievement === 'function') showAchievement('Dev Mode', 'Du hast die Matrix betreten.');
  }, 3000);
}

function appendTermLines(output, lines) {
  lines.forEach(line => {
    const el = document.createElement('div');
    el.className = 'term-line ' + (line.t || 'out');
    el.innerHTML = line.v || '';
    output.appendChild(el);
  });
}

// ─────────────────────────────────────────────────
// SYSTEM MONITOR
// ─────────────────────────────────────────────────
const SYSMON_PROCESSES = [
  { name: 'bridge_business_tech',   val: '98%',    pct: 98, status: '✓ aktiv' },
  { name: 'automation_daemon',      val: 'HIGH',   pct: 85, status: '✓ läuft' },
  { name: 'curiosity_process',      val: 'ALWAYS', pct: 100,status: '✓ läuft' },
  { name: 'pragmatism_engine',      val: 'ACTIVE', pct: 88, status: '✓ aktiv' },
  { name: 'stakeholder_translate',  val: 'HIGH',   pct: 82, status: '✓ aktiv' },
  { name: 'system_thinking',        val: 'HIGH',   pct: 92, status: '✓ aktiv' },
  { name: 'focus_mode',             val: 'ON',     pct: 90, status: '✓ aktiv' },
  { name: 'noise_filter',           val: 'ACTIVE', pct: 75, status: '✓ aktiv' },
];

function buildSysmon(body) {
  body.style.overflow = 'auto';
  const rows = SYSMON_PROCESSES.map(p => `
    <tr>
      <td class="sysmon-proc">${p.name}</td>
      <td class="sysmon-bar-cell">
        <div class="sysmon-bar-track">
          <div class="sysmon-bar-fill" data-pct="${p.pct}"></div>
        </div>
      </td>
      <td class="sysmon-val">${p.val}</td>
      <td class="sysmon-status">${p.status}</td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div class="sysmon">
      <div class="sysmon-header">
        <div class="sysmon-title">SYSTEM MONITOR — Niklas Fauteck</div>
        <div class="sysmon-uptitle">UPTIME: 16+ Jahre</div>
      </div>
      <table class="sysmon-table">
        <thead>
          <tr>
            <th>PROZESS</th>
            <th>AUSLASTUNG</th>
            <th>WERT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="sysmon-footer">
        <div class="sysmon-kv"><span class="k">Kernel</span><span class="v">Communication × Technology</span></div>
        <div class="sysmon-kv"><span class="k">Shell</span><span class="v">Pragmatism 2026.03</span></div>
        <div class="sysmon-kv"><span class="k">Standort</span><span class="v">Köln, Deutschland</span></div>
        <div class="sysmon-kv"><span class="k">Erreichbar</span><span class="v">niklas@fauteck.eu</span></div>
      </div>
    </div>
  `;

  // Animate bars after a brief delay
  setTimeout(() => {
    body.querySelectorAll('.sysmon-bar-fill').forEach(el => {
      el.style.width = el.dataset.pct + '%';
    });
  }, 200);
}

// ─────────────────────────────────────────────────
// BAMBU STUDIO (3D PRINT — redesigned)
// ─────────────────────────────────────────────────
function buildBambuMobile(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.background = '#111';
  body.style.color = '#fff';
  body.style.height = '100%';

  body.innerHTML = `
    <div class="bambu-mob-wrap">
      <!-- Top bar -->
      <div class="bambu-mob-topbar">
        <div class="bambu-mob-printer-info">
          <div class="bambu-mob-printer-icon">
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <rect x="3" y="12" width="18" height="9" rx="1.5" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="1.3"/>
              <path d="M7 12V7l5-3 5 3v5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="16" r="1.5" fill="white" opacity="0.7"/>
            </svg>
          </div>
          <div>
            <div class="bambu-mob-printer-name">P1S</div>
            <div class="bambu-mob-printer-status"><span class="bambu-mob-online-dot"></span>Online</div>
          </div>
        </div>
        <div class="bambu-mob-topbar-actions">
          <button class="bambu-mob-icon-btn">+</button>
          <button class="bambu-mob-icon-btn">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <button class="bambu-mob-icon-btn" style="position:relative">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><path d="M10 2c-2.8 0-5 2.2-5 5v4.5l-1.2 1.2c-.3.3-.1.8.3.8h11.8c.4 0 .6-.5.3-.8L15 11.5V7c0-2.8-2.2-5-5-5zM8.5 16a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.3"/></svg>
            <span class="bambu-mob-notif-dot"></span>
          </button>
        </div>
      </div>

      <!-- Camera / Preview section -->
      <div class="bambu-mob-camera">
        <button class="bambu-mob-timelapse">
          <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><rect x="2" y="4" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M14 7l4-2v10l-4-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Zeitraffer
          <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="bambu-mob-camera-inner">
          <div class="bambu-mob-logo">
            <svg viewBox="0 0 60 30" fill="none" width="90" height="45">
              <path d="M4 4h8v8H4zM14 4h8v8h-8zM4 14h8v8H4z" fill="white" opacity="0.9"/>
              <text x="26" y="22" font-size="14" font-weight="600" fill="white" font-family="Arial, sans-serif">Bambu</text>
              <text x="26" y="28" font-size="8" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif">Lab</text>
            </svg>
          </div>
          <button class="bambu-mob-play-btn">
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="12" r="10" fill="white"/><path d="M10 8l6 4-6 4V8z" fill="#111"/></svg>
          </button>
        </div>
      </div>

      <!-- Job card -->
      <div class="bambu-mob-scroll">
        <div class="bambu-mob-card">
          <div class="bambu-mob-job-row">
            <div class="bambu-mob-job-thumb">
              <div style="width:44px;height:44px;background:#1a1a1a;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666">11</div>
            </div>
            <div class="bambu-mob-job-info">
              <div class="bambu-mob-job-title">Gridfinity Box Lite – Filamentfreundliche Behälter</div>
              <div class="bambu-mob-job-sub">ORIGINAL – Box Lite 1x</div>
              <div class="bambu-mob-job-progress-row">
                <span class="bambu-mob-pct">100%</span>
                <span class="bambu-mob-success">Erfolgreich</span>
              </div>
              <div class="bambu-mob-progress-track"><div class="bambu-mob-progress-fill" style="width:100%"></div></div>
            </div>
          </div>
          <button class="bambu-mob-reprint">
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M4 10a6 6 0 116 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 14V10H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Erneut drucken
          </button>
        </div>

        <div class="bambu-mob-divider"></div>

        <!-- Rating section -->
        <div class="bambu-mob-card">
          <div class="bambu-mob-rating-title">Wie würden Sie das Druckprofil bewerten?</div>
          <div class="bambu-mob-stars">
            ${[1,2,3,4,5].map(i => `<svg class="bambu-mob-star" viewBox="0 0 24 24" fill="none" width="36" height="36" data-star="${i}"><path d="M12 2l2.9 6.3L22 9.3l-5 4.8 1.2 6.9L12 18l-6.2 3 1.2-6.9-5-4.8 7.1-1z" stroke="#666" stroke-width="1.5" stroke-linejoin="round"/></svg>`).join('')}
          </div>
        </div>

        <div class="bambu-mob-divider"></div>

        <!-- Drucker section -->
        <div class="bambu-mob-card">
          <div class="bambu-mob-section-header">
            <div class="bambu-mob-section-title">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><rect x="2" y="9" width="16" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 9V6l5-3 5 3v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              Drucker
            </div>
            <span class="bambu-mob-see-all">Alles ansehen <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </div>
          <div class="bambu-mob-stats-row">
            <div class="bambu-mob-stat-chip">
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 2 Q10 18 10 2" stroke="none"/><path d="M5 16V6M10 16V3M15 16V9" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/></svg>
              <div class="bambu-mob-stat-val">21 <span>°C / 0°C</span></div>
            </div>
            <div class="bambu-mob-stat-chip">
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M4 16c0-4 2.5-6 6-6s6 2 6 6" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12c0-2 2.5-4 6-4s6 2 6 4" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" stroke-linecap="round"/></svg>
              <div class="bambu-mob-stat-val">17 <span>°C / 0°C</span></div>
            </div>
            <div class="bambu-mob-stat-chip">
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="6" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><path d="M10 4a6 6 0 014.2 10.2" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/></svg>
              <div class="bambu-mob-stat-val">100<span>%</span></div>
            </div>
          </div>
        </div>

        <div class="bambu-mob-divider"></div>

        <!-- Filament section -->
        <div class="bambu-mob-card">
          <div class="bambu-mob-section-header">
            <div class="bambu-mob-section-title">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.3"/></svg>
              Filament
            </div>
            <span class="bambu-mob-see-all">Alles ansehen <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>
          </div>
        </div>

        <div style="height:70px"></div>
      </div>

      <!-- Bottom Nav -->
      <div class="bambu-mob-nav">
        <button class="bambu-mob-nav-btn">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
          <span>Modelle</span>
        </button>
        <button class="bambu-mob-nav-btn bambu-mob-nav-active">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="3" y="12" width="18" height="9" rx="1.5" fill="rgba(34,197,94,0.2)" stroke="#22c55e" stroke-width="1.5"/><path d="M7 12V7l5-3 5 3v5" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Geräte</span>
        </button>
        <button class="bambu-mob-nav-btn">
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20v-1a8 8 0 0116 0v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Ich</span>
        </button>
      </div>
    </div>
  `;

  // Star rating interaction
  body.querySelectorAll('.bambu-mob-star').forEach((star, idx, arr) => {
    star.addEventListener('click', () => {
      arr.forEach((s, i) => {
        const path = s.querySelector('path');
        if (i <= idx) {
          path.setAttribute('fill', '#22c55e');
          path.setAttribute('stroke', '#22c55e');
        } else {
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', '#666');
        }
      });
    });
  });
}

function buildBambu(body) {
  if (window.innerWidth < 768) return buildBambuMobile(body);
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.innerHTML = `
    <div class="bam-wrap">
      <!-- Top Tabs -->
      <div class="bam-tabs">
        <span class="bam-tab">Vorbereiten</span>
        <span class="bam-tab active">Vorschau ✦</span>
        <span class="bam-tab">Gerät</span>
        <span class="bam-tab">Projekt</span>
        <span class="bam-tab">Kalibrierung</span>
        <div style="flex:1"></div>
        <span class="bam-status-badge" id="bambu-status">Bereit</span>
      </div>

      <!-- Main layout: sidebar | viewport | results -->
      <div class="bam-main">

        <!-- Left Sidebar -->
        <div class="bam-sidebar">
          <div class="bam-sidebar-section">Drucker</div>
          <div class="bam-sidebar-item bam-printer">
            <div class="bam-printer-icon">🖨️</div>
            <div>
              <div class="bam-sidebar-label">Bambu Lab P1S</div>
              <div class="bam-sidebar-sub">Cool Plate</div>
            </div>
          </div>
          <div class="bam-sync-btn">↺ Sync Infos</div>

          <div class="bam-sidebar-section" style="margin-top:10px">Projekt Filamente</div>
          <div class="bam-sidebar-item">
            <span class="bam-filament-dot" style="background:#e5e5e5"></span>
            <div>
              <div class="bam-sidebar-label">1 · TPU 95A</div>
              <div class="bam-sidebar-sub">0.4 · Standard</div>
            </div>
          </div>

          <div class="bam-sidebar-section" style="margin-top:10px">Prozess</div>
          <div class="bam-sidebar-item">
            <div>
              <div class="bam-sidebar-label">0.08mm High Quality</div>
              <div class="bam-sidebar-sub">@BBL X1C</div>
            </div>
          </div>

          <div class="bam-sidebar-section" style="margin-top:10px">Schichthöhe</div>
          <div class="bam-kv-row"><span class="bam-k">Schichthöhe</span><span class="bam-v">0,08 mm</span></div>
          <div class="bam-kv-row"><span class="bam-k">Erste Schicht</span><span class="bam-v">0,2 mm</span></div>
        </div>

        <!-- Center: 3D Print Animation -->
        <div class="bam-viewport">
          <div class="bam-model-scene" id="bam-scene">
            <svg viewBox="0 0 300 260" class="bam-model-svg">
              <defs>
                <clipPath id="print-clip">
                  <rect class="print-clip-rect" x="75" y="180" width="150" height="0"/>
                </clipPath>
                <linearGradient id="plate-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2a2a3a"/>
                  <stop offset="100%" stop-color="#1a1a2a"/>
                </linearGradient>
              </defs>
              <!-- Build plate grid -->
              <g class="bam-plate">
                <path d="M50 200 L150 240 L250 200 L150 160 Z" fill="url(#plate-grad)" stroke="#3a3a5a" stroke-width="1"/>
                <line x1="70" y1="196" x2="170" y2="236" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="90" y1="192" x2="190" y2="232" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="110" y1="188" x2="210" y2="228" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="130" y1="184" x2="230" y2="224" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="90" y1="216" x2="190" y2="176" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="110" y1="224" x2="210" y2="184" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
                <line x1="130" y1="232" x2="230" y2="192" stroke="#2a2a4a" stroke-width="0.5" opacity="0.4"/>
              </g>
              <!-- Model body (clipped by print animation) -->
              <g clip-path="url(#print-clip)">
                <!-- Isometric holder shape -->
                <path d="M120 180 L120 120 L150 105 L180 120 L180 180 L150 195 Z" fill="#4ade80" opacity="0.85"/>
                <path d="M180 120 L180 180 L150 195 L150 135 Z" fill="#22c55e" opacity="0.7"/>
                <path d="M120 120 L150 105 L180 120 L150 135 Z" fill="#86efac" opacity="0.6"/>
                <!-- Hole in the holder -->
                <ellipse cx="150" cy="150" rx="12" ry="8" fill="#12131a" opacity="0.8"/>
              </g>
              <!-- Print head line -->
              <line class="bam-print-head" x1="100" y1="180" x2="200" y2="180" stroke="#f59e0b" stroke-width="2" opacity="0.8" stroke-dasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.3s" repeatCount="indefinite"/>
              </line>
            </svg>
            <div class="bam-model-label">Katheterspiegelhalter_v3</div>
            <a href="https://www.linkedin.com/posts/activity-7439337480501477376-niwS" target="_blank" rel="noopener" class="bam-fallback-link">→ Post auf LinkedIn ansehen</a>
          </div>
        </div>

        <!-- Right: Slicing Result -->
        <div class="bam-results">
          <div class="bam-results-title">Slicing-Ergebnis</div>

          <div class="bam-results-section">Farbschema · Filament</div>
          <div class="bam-result-row">
            <span class="bam-filament-dot" style="background:#e5e5e5"></span>
            <span class="bam-r-label">Filament</span>
            <span class="bam-r-val">1</span>
          </div>

          <div class="bam-results-section" style="margin-top:8px">Filamentverbrauch</div>
          <div class="bam-result-row"><span class="bam-r-label">Modell</span><span class="bam-r-val">12,22 g</span></div>
          <div class="bam-result-row"><span class="bam-r-label">Stützen</span><span class="bam-r-val">0,21 g</span></div>
          <div class="bam-result-row"><span class="bam-r-label">Gesamt</span><span class="bam-r-val bam-r-bold">12,43 g</span></div>
          <div class="bam-result-row"><span class="bam-r-label">Kosten</span><span class="bam-r-val">0,52 €</span></div>

          <div class="bam-results-section" style="margin-top:8px">Geschätzte Zeit</div>
          <div class="bam-result-row"><span class="bam-r-label">Vorbereitung</span><span class="bam-r-val">7m 47s</span></div>
          <div class="bam-result-row"><span class="bam-r-label">Modell</span><span class="bam-r-val">1h 25m</span></div>
          <div class="bam-result-row"><span class="bam-r-label">Gesamt</span><span class="bam-r-val bam-r-bold">1h 33m</span></div>

          <div class="bam-progress-row" style="margin-top:10px">
            <span class="bam-r-label">Fortschritt</span>
            <span class="bam-r-val" id="bambu-pct">0%</span>
          </div>
          <div class="bam-progress-track"><div class="bam-progress-fill" id="bambu-fill"></div></div>

          <button class="bam-print-btn" id="bambu-btn">Druckplatte drucken</button>
        </div>

      </div>
    </div>
  `;

  let printing = false;
  let progress = 0;
  let interval = null;

  const btn    = body.querySelector('#bambu-btn');
  const fill   = body.querySelector('#bambu-fill');
  const pctEl  = body.querySelector('#bambu-pct');
  const status = body.querySelector('#bambu-status');

  const scene = body.querySelector('#bam-scene');
  const clipRect = body.querySelector('.print-clip-rect');
  const printHead = body.querySelector('.bam-print-head');

  btn.addEventListener('click', () => {
    if (printing) return;
    printing = true;
    progress = 0;
    btn.disabled = true;
    btn.textContent = '⏳ Druckt...';
    status.textContent = 'Druckt';
    status.style.background = 'rgba(251,146,60,0.15)';
    status.style.color = '#c2410c';

    if (scene) scene.classList.add('printing');
    if (clipRect) clipRect.setAttribute('height', '0');

    interval = setInterval(() => {
      progress += Math.random() * 2.5 + 0.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        printing = false;
        btn.disabled = false;
        btn.textContent = '▶ Erneut drucken';
        status.textContent = '✓ Fertig!';
        status.style.background = 'rgba(82,183,136,0.15)';
        status.style.color = '#2d6a4f';
        if (scene) scene.classList.remove('printing');
        setTimeout(() => {
          progress = 0;
          fill.style.width = '0%';
          pctEl.textContent = '0%';
          status.textContent = 'Bereit';
          status.style.background = '';
          status.style.color = '';
          btn.textContent = 'Druckplatte drucken';
          if (clipRect) clipRect.setAttribute('height', '0');
        }, 3000);
      }
      fill.style.width = progress + '%';
      pctEl.textContent = Math.round(progress) + '%';
      if (clipRect) {
        const h = (progress / 100) * 80;
        clipRect.setAttribute('height', String(h));
        clipRect.setAttribute('y', String(180 - h));
      }
      if (printHead) {
        const headY = 180 - (progress / 100) * 80;
        printHead.setAttribute('y1', String(headY));
        printHead.setAttribute('y2', String(headY));
      }
    }, 200);
  });
}

// ─────────────────────────────────────────────────
// HOME ASSISTANT
// ─────────────────────────────────────────────────
function buildHA(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.background = '#111827';
  body.style.color = '#f3f4f6';

  const HA_DOORS = [
    { id: 'vorne',    label: 'Vorne',   open: true,  color: '#ef4444' },
    { id: 'garten',  label: 'Garten',  open: true,  color: '#ef4444' },
    { id: 'keller',  label: 'Keller',  open: false, color: '#22c55e' },
    { id: 'garage',  label: 'Garage',  open: false, color: '#22c55e' },
    { id: 'carport', label: 'Carport', open: false, color: '#22c55e' },
    { id: 'hinten',  label: 'Hinten',  open: false, color: '#22c55e' },
  ];

  const doorSvgOpen  = `<svg viewBox="0 0 28 28" fill="none" width="28" height="28"><rect x="4" y="2" width="14" height="22" rx="1.5" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="1.3"/><path d="M18 4l6 2v16l-6 2V4z" fill="rgba(255,255,255,0.25)" stroke="white" stroke-width="1.3" stroke-linejoin="round"/><circle cx="16.5" cy="14" r="1.5" fill="white" opacity="0.8"/></svg>`;
  const doorSvgClosed = `<svg viewBox="0 0 28 28" fill="none" width="28" height="28"><rect x="4" y="2" width="20" height="24" rx="1.5" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="1.3"/><circle cx="20" cy="14" r="1.5" fill="white" opacity="0.8"/></svg>`;

  body.innerHTML = `
    <div class="ha-dash-wrap">
      <!-- Status row -->
      <div class="ha-dash-status-row">
        <div class="ha-dash-chip ha-dash-chip-gray">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M8 1L2 4v4c0 3.5 2.5 6.7 6 8 3.5-1.3 6-4.5 6-8V4L8 1z" stroke="white" stroke-width="1.2"/></svg>
          Bereit
        </div>
        <div class="ha-dash-chip ha-dash-chip-green">
          <svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="8" cy="8" r="4" fill="#22c55e"/></svg>
          aktiv
        </div>
        <div class="ha-dash-chip ha-dash-chip-orange">
          <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M8 2L3 7v7h10V7L8 2z" stroke="#fb923c" stroke-width="1.2" stroke-linejoin="round"/><rect x="6" y="10" width="4" height="4" rx="0.5" stroke="#fb923c" stroke-width="1.2"/></svg>
          Zuhause
        </div>
      </div>

      <!-- Weather -->
      <div class="ha-dash-weather">
        <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="4" stroke="#fbbf24" stroke-width="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M4.9 15.1l1.4-1.4M13.7 6.3l1.4-1.4" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="ha-dash-temp">10,8 °C</span>
      </div>

      <!-- Mindfulness quote -->
      <div class="ha-dash-quote">
        <p>Fühle, wie deine Füße den Boden berühren – Schritt für Schritt. – Achte dabei bewusst auf deinen Atem und die Sinneseindrücke um dich.</p>
        <button class="ha-dash-share-btn" title="Teilen">
          <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M15 7a2 2 0 100-4 2 2 0 000 4zM5 12a2 2 0 100-4 2 2 0 000 4zM15 17a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" stroke-width="1.4"/><path d="M7 11l6 3M13 6L7 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Section separator -->
      <div class="ha-dash-sep">
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M10 2L4 7v11h12V7L10 2z" stroke="rgba(255,255,255,0.4)" stroke-width="1.3" stroke-linejoin="round"/><rect x="7" y="12" width="6" height="6" rx="0.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/></svg>
        <div class="ha-dash-sep-line"></div>
        <div class="ha-dash-sep-icons">
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M1 9 Q4 5 8 5 Q12 5 15 9" stroke="rgba(255,255,255,0.5)" stroke-width="1.3" stroke-linecap="round"/><path d="M3 11 Q5.5 8 8 8 Q10.5 8 13 11" stroke="rgba(255,255,255,0.5)" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="13.5" r="1.2" fill="rgba(255,255,255,0.5)"/></svg>
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><path d="M1 9 Q4 5 8 5 Q12 5 15 9" stroke="rgba(255,255,255,0.5)" stroke-width="1.3" stroke-linecap="round"/><path d="M3 11 Q5.5 8 8 8 Q10.5 8 13 11" stroke="rgba(255,255,255,0.5)" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="13.5" r="1.2" fill="rgba(255,255,255,0.5)"/></svg>
        </div>
        <span class="ha-dash-outdoor-temp">6,3 °C</span>
      </div>

      <!-- Door controls -->
      <div class="ha-dash-doors-wrap">
        <div class="ha-dash-doors">
          ${HA_DOORS.map(d => `
            <div class="ha-door-btn" data-door="${d.id}" data-open="${d.open}">
              <div class="ha-door-icon" style="border-color:${d.open ? '#ef4444' : '#22c55e'}">
                ${d.open ? doorSvgOpen : doorSvgClosed}
              </div>
              <span class="ha-door-label">${d.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick icons row -->
      <div class="ha-dash-quick-row">
        <button class="ha-dash-quick-btn">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="7" r="3" stroke="rgba(255,79,79,0.9)" stroke-width="1.4"/><path d="M4 18v-1a6 6 0 0112 0v1" stroke="rgba(255,79,79,0.9)" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
        <button class="ha-dash-quick-btn">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.6 5.6l2.1 2.1M12.3 12.3l2.1 2.1M5.6 14.4l2.1-2.1M12.3 7.7l2.1-2.1" stroke="rgba(255,255,255,0.5)" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
        <button class="ha-dash-quick-btn">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="10" r="3" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="rgba(255,255,255,0.5)" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
        <button class="ha-dash-quick-btn">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><circle cx="10" cy="7" r="3" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/><path d="M4 18v-1a6 6 0 0112 0v1" stroke="rgba(255,255,255,0.5)" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Water / status chips -->
      <div class="ha-dash-status-chips">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M8 2C5 8 3 10 3 12a5 5 0 0010 0c0-2-2-4-5-10z" stroke="rgba(96,165,250,0.8)" stroke-width="1.3" stroke-linejoin="round" fill="rgba(96,165,250,0.15)"/></svg>
        <span class="ha-dash-sc">Aus</span>
        <span class="ha-dash-sc ha-dash-sc-active">Auto</span>
        <span class="ha-dash-sc">Aus</span>
        <span class="ha-dash-sc">Aus</span>
        <span class="ha-dash-sc ha-dash-sc-active">Ein</span>
      </div>

      <!-- Wohnzimmer section -->
      <div class="ha-dash-room-section">
        <div class="ha-dash-room-header">
          <div class="ha-dash-room-title">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M2 9h16v9H2zM2 9l8-7 8 7" stroke="rgba(255,255,255,0.7)" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 18v-5a1 1 0 011-1h6a1 1 0 011 1v5" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/></svg>
            Wohnzimmer
          </div>
          <div class="ha-dash-room-meta">
            <span class="ha-dash-heat-badge">🔴 Heizbetrieb · 19,8 °C</span>
            <span class="ha-dash-tv-badge">📱 MagentaTV</span>
          </div>
        </div>
        <div class="ha-dash-dials">
          ${[
            { label: 'Couch', svgPath: 'M3 13h14v4H3zM3 13c0-2 1-3 3-3h8c2 0 3 1 3 3M3 17v1M17 17v1', val: 62 },
            { label: 'Tisch', svgPath: 'M2 10h16v2H2zM4 12v6M14 12v6M3 10V6h14v4', val: 40 },
            { label: 'Küche', svgPath: 'M4 4h16v3H4zM5 7v13M10 7v13M15 7v13M4 13h16', val: 55 },
          ].map(d => `
            <div class="ha-dial-item">
              <div class="ha-dial-circle">
                <svg viewBox="0 0 80 80" width="80" height="80" class="ha-dial-svg">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#06b6d4" stroke-width="6"
                    stroke-dasharray="${Math.round(d.val * 2.01)} 201"
                    stroke-dashoffset="50" stroke-linecap="round" transform="rotate(-90 40 40)"/>
                </svg>
                <div class="ha-dial-icon">
                  <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
                    <path d="${d.svgPath}" stroke="rgba(255,255,255,0.7)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <button class="ha-dial-menu">⋮</button>
              </div>
              <span class="ha-dial-label">${d.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  // Door toggle
  body.querySelectorAll('.ha-door-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.dataset.open === 'true';
      const newOpen = !isOpen;
      btn.dataset.open = String(newOpen);
      const iconEl = btn.querySelector('.ha-door-icon');
      iconEl.style.borderColor = newOpen ? '#ef4444' : '#22c55e';
      iconEl.innerHTML = newOpen ? doorSvgOpen : doorSvgClosed;
    });
  });
}

// ─────────────────────────────────────────────────
// PACKAGES / INSTALLED APPS
// ─────────────────────────────────────────────────
const PACKAGES = [
  { cat: 'KI & Automation', items: [
    { name: 'claude',         ver: '4.0+',  },
    { name: 'chatgpt',        ver: '4o',    },
    { name: 'cursor',         ver: '1.x',   },
    { name: 'n8n',            ver: '1.x',   },
    { name: 'make.com',       ver: 'latest',},
  ]},
  { cat: 'Kollaboration', items: [
    { name: 'confluence',     ver: 'cloud', },
    { name: 'jira',           ver: 'cloud', },
    { name: 'notion',         ver: 'cloud', },
    { name: 'miro',           ver: 'cloud', },
  ]},
  { cat: 'Infrastruktur', items: [
    { name: 'docker',         ver: '26',    },
    { name: 'github-actions', ver: 'cloud', },
    { name: 'portainer',      ver: 'latest',},
    { name: 'home-assistant', ver: '2025',  },
  ]},
  { cat: 'Analytics', items: [
    { name: 'power-bi',       ver: 'cloud', },
    { name: 'google-analytics', ver: '4',  },
  ]},
];

function buildPackages(body) {
  const cats = PACKAGES.map(cat => `
    <div class="pkg-category">
      <div class="pkg-cat-title">${cat.cat}</div>
      <div class="pkg-list">
        ${cat.items.map(p => `
          <div class="pkg-item">
            <span class="pkg-name">${p.name}</span>
            <span class="pkg-version">${p.ver}</span>
            <span class="pkg-check">✓ installiert</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="pkg-wrap">
      <div class="pkg-header">
        <h3>Installierte Apps</h3>
        <span class="pkg-header-cmd">apt list --installed</span>
      </div>
      ${cats}
    </div>
  `;
}

// ─────────────────────────────────────────────────
// CHANGELOG
// ─────────────────────────────────────────────────
const CHANGELOG_DATA = [
  {
    ver: 'v2026.03',
    date: 'März 2026',
    current: true,
    items: [
      'Weitere KI-gestützte Workflows produktiv gesetzt',
      'Automation-Denken in breiteren Teamkontext skaliert',
      'Personal Lab ausgebaut: 3D-Druck + Smart Home Optimierungen',
      'NiklasOS — neue persönliche Website veröffentlicht',
    ],
  },
  {
    ver: 'v2025.06',
    date: 'Juni 2025',
    items: [
      'Smart Home Flows mit Home Assistant weiter optimiert',
      'n8n Automation-Wissen systematisch ausgebaut',
      'Vibecoding als produktiven Workflow etabliert',
    ],
  },
  {
    ver: 'v2024.01',
    date: 'Januar 2024',
    items: [
      'KI-Tooling Adoption in Teams vorangetrieben',
      'Interne Wissenssysteme und Prozesse strukturiert',
      'Power BI Dashboards für datengetriebene Entscheidungen aufgebaut',
    ],
  },
  {
    ver: 'v2023.01',
    date: 'Januar 2023',
    items: [
      'Einstieg bei RTL Deutschland: Head of Digital Transformation',
      'Fokus: Brücke zwischen Redaktion und Technologie-Teams',
      'Erste Bestandsaufnahme digitaler Reifegrad der Organisation',
    ],
  },
  {
    ver: 'v2020.00',
    date: '2020',
    items: [
      'Newsdesk Kommunikation: erster dedizierter Digital-PM-Fokus',
      'Systematischer Ansatz für Tool-Adoption entwickelt',
      'Foundation: Verstehen, wie Menschen Tools wirklich nutzen',
    ],
  },
];

function buildChangelog(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';

  const changelogHtml = CHANGELOG_DATA.map(v => `
    <div class="cl-version${v.current ? ' cl-ver-current' : ''}">
      <div class="cl-ver-header">
        <span class="cl-ver-tag">${v.ver}</span>
        <span class="cl-ver-date">${v.date}</span>
        ${v.current ? '<span class="cl-current-badge">current</span>' : ''}
      </div>
      <ul class="cl-items">
        ${v.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const karriereHtml = CAREER_DATA.map(e => `
    <div class="cl-career-item">
      <div class="cl-career-dot-wrap">
        <div class="cl-career-dot"></div>
        <div class="cl-career-line"></div>
      </div>
      <div class="cl-career-card">
        <div class="cl-career-period">${e.period}</div>
        <div class="cl-career-title">${e.title}</div>
        <div class="cl-career-company">${e.icon} ${e.company}</div>
        <ul class="cl-career-list">
          ${e.impact.slice(0,2).map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="cl-tabs-bar">
      <button class="cl-tab active" data-tab="changelog">Changelog</button>
      <button class="cl-tab" data-tab="karriere">Karriere</button>
    </div>
    <div class="cl-tab-content" id="cl-content-changelog" style="flex:1;overflow-y:auto">
      <div class="changelog">${changelogHtml}</div>
    </div>
    <div class="cl-tab-content" id="cl-content-karriere" style="flex:1;overflow-y:auto;display:none;padding:16px">
      <div class="cl-career-timeline">${karriereHtml}</div>
    </div>
  `;

  body.querySelectorAll('.cl-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      body.querySelectorAll('.cl-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      body.querySelectorAll('.cl-tab-content').forEach(c => {
        c.style.display = c.id === `cl-content-${target}` ? 'block' : 'none';
      });
    });
  });
}


// ─────────────────────────────────────────────────
// TRASH / PAPIERKORB
// ─────────────────────────────────────────────────
const TRASH_ITEMS = [
  { icon: '📄', name: 'buzzword_projekt.exe', desc: 'Projekte, die nur für Präsentationen existieren, ohne messbaren Mehrwert.' },
  { icon: '📊', name: 'powerpoint_digitalisierung.pptx', desc: 'Digitalisierungskonzepte, die nie deployt werden.' },
  { icon: '💿', name: 'tool_ohne_adoption.msi', desc: 'Neue Tools, die niemand wirklich nutzt — weil Einführung ≠ Adoption.' },
  { icon: '📅', name: 'meeting_ohne_entscheidung.ics', desc: 'Kalenderblöcke ohne Output, Ergebnis oder nächste Schritte.' },
  { icon: '🎥', name: 'ki_als_show.mp4', desc: 'KI-Demos für den Wow-Effekt — ohne echten Workflow-Nutzen.' },
  { icon: '🗺️', name: 'prozess_ohne_anwender.bpmn', desc: 'Prozessoptimierung am echten Nutzer vorbei.' },
];

function buildTrash(body) {
  const items = TRASH_ITEMS.map(i => `
    <div class="trash-item">
      <span class="trash-item-icon">${i.icon}</span>
      <div>
        <div class="trash-item-name">${i.name}</div>
        <div class="trash-item-desc">${i.desc}</div>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="trash-wrap">
      <div class="trash-header">
        <h3>Papierkorb</h3>
        <span class="trash-count">${TRASH_ITEMS.length} Elemente</span>
      </div>
      <div class="trash-items">${items}</div>
      <div class="trash-footer">
        <em>"Papierkorb leeren"</em> ist leider nicht möglich.<br>
        Diese Anti-Patterns tauchen immer wieder auf — deshalb: immer wieder darauf hinweisen.
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────
// MOBILE APP CONTENT BUILDERS
// ─────────────────────────────────────────────────

function buildChatGPT(body) {
  body.innerHTML = `
    <div class="mob-chat-wrap">
      <div class="mob-chat-header">
        <div class="mob-chat-title">ChatGPT</div>
        <div class="mob-chat-model">GPT-4o</div>
      </div>
      <div class="mob-chat-messages">
        <div class="mob-msg mob-msg-user">Erstelle mir eine Rückgabe-Meldung für mein 3D-Druck-Filament. Das TPU ist nach dem Drucken sehr klebrig geworden.</div>
        <div class="mob-msg mob-msg-ai">
          <div class="mob-msg-icon">🤖</div>
          <div>Hier ist eine höfliche Rückgabe-Meldung:<br><br>
          <em>"Sehr geehrte Damen und Herren, leider muss ich das erworbene TPU 95A zurückgeben. Nach dem Druckvorgang wies das Filament eine ungewöhnlich hohe Klebrigkeit auf, die auf einen Qualitätsmangel hindeutet. Ich bitte um Rückerstattung oder Umtausch..."</em><br><br>
          Soll ich noch einen freundlicheren Ton wählen? 😄</div>
        </div>
        <div class="mob-msg mob-msg-user">Nein danke, aber schreib mir lieber einen Docker-Compose-Stack für Home Assistant</div>
        <div class="mob-msg mob-msg-ai">
          <div class="mob-msg-icon">🤖</div>
          <div>Gerne! Hier ist ein minimaler Stack:<br><br>
          <code style="font-size:11px;background:rgba(0,0,0,0.1);padding:2px 4px;border-radius:3px">services:\n  homeassistant:\n    image: ghcr.io/home-assistant/home-assistant:stable\n    restart: unless-stopped\n    network_mode: host\n    volumes:\n      - ./config:/config</code>
          </div>
        </div>
      </div>
      <div class="mob-chat-input">
        <div class="mob-chat-field">Nachricht senden…</div>
      </div>
    </div>
  `;
}

function buildClaudeApp(body) {
  body.innerHTML = `
    <div class="mob-chat-wrap">
      <div class="mob-chat-header">
        <div class="mob-chat-title" style="color:#ea580c">Claude</div>
        <div class="mob-chat-model">claude-sonnet-4</div>
      </div>
      <div class="mob-chat-messages">
        <div class="mob-msg mob-msg-user">Hilf mir meinen Docker-Stack zu optimieren. Ich hab 12 Container und die Response-Times sind zu hoch.</div>
        <div class="mob-msg mob-msg-ai">
          <div class="mob-msg-icon" style="background:linear-gradient(135deg,#ea580c,#c2410c)">C</div>
          <div>12 Container – das klingt nach einem gut durchdachten Setup! 🎉<br><br>
          Für bessere Response-Times würde ich zunächst prüfen:<br>
          1. <strong>Network Mode</strong>: Nutze <code>bridge</code> statt <code>host</code> nur wenn nötig<br>
          2. <strong>Resource Limits</strong>: Setze CPU/Memory-Limits pro Container<br>
          3. <strong>Health Checks</strong>: Vermeide zu häufige /health-Abfragen<br><br>
          Welcher Container macht die meisten Probleme?</div>
        </div>
        <div class="mob-msg mob-msg-user">Portainer reagiert manchmal sehr langsam</div>
        <div class="mob-msg mob-msg-ai">
          <div class="mob-msg-icon" style="background:linear-gradient(135deg,#ea580c,#c2410c)">C</div>
          <div>Klassisches Problem bei Portainer! Das liegt meist daran, dass Portainer alle Container-Stats in Echtzeit abfragt. Versuch mal <code>PORTAINER_POLL_INTERVAL=10</code> zu erhöhen oder die "Live-Statistiken" in den Settings zu deaktivieren. Das reduziert den Overhead deutlich. 🐳</div>
        </div>
      </div>
      <div class="mob-chat-input">
        <div class="mob-chat-field">Nachricht senden…</div>
      </div>
    </div>
  `;
}

function buildOutlook(body) {
  const mails = [
    { from: 'IT-Support RTL', subject: 'Wartungsfenster: Media Hub Update', time: '09:12', date: '19. Mrz 2026, 09:12', unread: true,
      preview: 'Geplantes Wartungsfenster morgen von 22:00-02:00 Uhr...',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: 'Technik-Team',
      body: '<p>Hallo zusammen,</p><p>wir planen ein Wartungsfenster <b>morgen von 22:00 bis 02:00 Uhr</b> für das Media Hub Update auf Version 4.2. Während dieser Zeit kann es zu kurzzeitigen Ausfällen kommen.</p><p>Bitte stellt sicher, dass keine kritischen Prozesse in diesem Zeitraum laufen. Bei Fragen wendet euch an den IT-Support.</p><p>Viele Grüße,<br>IT-Support RTL</p>' },
    { from: 'Produktteam', subject: 'Sprint Review – Einladung', time: '08:47', date: '19. Mrz 2026, 08:47', unread: true,
      preview: 'Hallo Niklas, hiermit lädt das Produktteam zum Sprint-Review ein...',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: null,
      body: '<p>Hallo Niklas,</p><p>hiermit laden wir dich herzlich zum <b>Sprint Review am Freitag, 21. März um 14:00 Uhr</b> ein. Wir werden die Ergebnisse des aktuellen Sprints vorstellen und die nächsten Schritte besprechen.</p><p>Agenda:<br>1. Demo der neuen Suchfunktion<br>2. Performance-Verbesserungen Media Hub<br>3. Ausblick Sprint 12</p><p>Beste Grüße,<br>Das Produktteam</p>' },
    { from: 'Jira Automation', subject: '[KOMM-4821] Status geändert: Done', time: 'Gestern', date: '18. Mrz 2026, 16:30', unread: false,
      preview: 'Das Ticket "Media Hub: Bild-Upload optimieren" wurde auf Done gesetzt.',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: null,
      body: '<p>Das Ticket <b>KOMM-4821</b> &quot;Media Hub: Bild-Upload optimieren&quot; wurde von Sarah K. auf <span style="color:#10b981;font-weight:600">Done</span> gesetzt.</p><p>Änderungen:<br>- Bildkomprimierung auf WebP umgestellt<br>- Upload-Limit auf 25 MB erhöht<br>- Fortschrittsanzeige implementiert</p>' },
    { from: 'Confluence', subject: 'Seite aktualisiert: Systemarchitektur', time: 'Gestern', date: '18. Mrz 2026, 14:15', unread: false,
      preview: 'Max Mustermann hat die Seite "Systemarchitektur 2026" bearbeitet.',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: null,
      body: '<p>Max Mustermann hat die Seite <b>&quot;Systemarchitektur 2026&quot;</b> im Bereich Technik-Dokumentation bearbeitet.</p><p>Änderungen: Neues Diagramm für Microservice-Kommunikation hinzugefügt, API-Gateway-Konfiguration aktualisiert.</p><p><a href="#" style="color:#0078d4">Seite anzeigen</a></p>' },
    { from: 'GitHub', subject: '[docker-configs] PR #47 merged', time: 'Di.', date: '17. Mrz 2026, 11:22', unread: false,
      preview: 'Pull Request #47 "Update Home Assistant to 2026.3" wurde gemergt.',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: null,
      body: '<p>Pull Request <b>#47</b> &quot;Update Home Assistant to 2026.3&quot; wurde erfolgreich in <code>main</code> gemergt.</p><p>Änderungen:<br>- Home Assistant Core auf 2026.3.1<br>- HACS auf v2.1.0<br>- Neue Zigbee2MQTT-Konfiguration</p><p>CI/CD Pipeline: <span style="color:#10b981">&#10003; Alle Checks bestanden</span></p>' },
    { from: 'Bambu Lab', subject: 'Druckauftrag abgeschlossen', time: 'Mo.', date: '16. Mrz 2026, 19:45', unread: false,
      preview: 'Ihr Druckauftrag "Katheterspiegelhalter_v3" wurde erfolgreich abgeschlossen (7h 23min).',
      to: 'Niklas Fauteck &lt;niklas@fauteck.eu&gt;', cc: null,
      body: '<p>Ihr Druckauftrag wurde erfolgreich abgeschlossen!</p><p><b>Datei:</b> Katheterspiegelhalter_v3.3mf<br><b>Drucker:</b> Bambu Lab X1C<br><b>Material:</b> PLA Basic (Weiß)<br><b>Dauer:</b> 7h 23min<br><b>Verbrauch:</b> 48g</p><p>Der Drucker ist bereit für den nächsten Auftrag.</p>' },
  ];

  const isDesktop = !!body.closest('.window');
  if (isDesktop) {
    buildOutlookDesktop(body, mails);
  } else {
    buildOutlookMobile(body, mails);
  }
}

function buildOutlookDesktop(body, mails) {
  body.style.overflow = 'hidden';

  const folders = [
    { name: 'Posteingang', icon: '&#9993;', count: 2, id: 'inbox' },
    { name: 'Entwürfe', icon: '&#9998;', count: 0, id: 'drafts' },
    { name: 'Gesendet', icon: '&#10148;', count: 0, id: 'sent' },
    { name: 'Gelöscht', icon: '&#128465;', count: 0, id: 'deleted' },
    { name: 'Archiv', icon: '&#128451;', count: 0, id: 'archive' },
    { name: 'Junk-E-Mail', icon: '&#9888;', count: 0, id: 'junk' },
  ];

  body.innerHTML = `
    <div class="ol-desk-wrap">
      <div class="ol-desk-toolbar">
        <div class="ol-desk-tabs">
          <span class="ol-desk-tab active">Start</span>
          <span class="ol-desk-tab">Ansicht</span>
          <span class="ol-desk-tab">Hilfe</span>
        </div>
        <div class="ol-desk-actions">
          <button class="ol-desk-action-btn ol-desk-new-mail" title="Neue E-Mail">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 13.5L13.5 3l3.5 3.5L6.5 17H3v-3.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M11 5l3.5 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
            <span>Neue E-Mail</span>
          </button>
          <button class="ol-desk-action-btn" title="Löschen">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 6h10M8 6V4h4v2M6 6v10a1 1 0 001 1h6a1 1 0 001-1V6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Löschen</span>
          </button>
          <button class="ol-desk-action-btn" title="Archivieren">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M4 8v7a1 1 0 001 1h10a1 1 0 001-1V8M8 12h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <span>Archivieren</span>
          </button>
          <button class="ol-desk-action-btn" title="Antworten">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M8 5L3 10l5 5M3 10h10a4 4 0 014 4v1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Antworten</span>
          </button>
          <button class="ol-desk-action-btn" title="Weiterleiten">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M12 5l5 5-5 5M17 10H7a4 4 0 00-4 4v1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Weiterleiten</span>
          </button>
        </div>
      </div>
      <div class="ol-desk-main">
        <div class="ol-desk-sidebar">
          <div class="ol-desk-account">
            <div class="ol-desk-account-avatar">N</div>
            <div class="ol-desk-account-info">
              <div class="ol-desk-account-name">Niklas Fauteck</div>
              <div class="ol-desk-account-mail">niklas@fauteck.eu</div>
            </div>
          </div>
          <div class="ol-desk-folders">
            ${folders.map(f => `
              <div class="ol-desk-folder${f.id === 'inbox' ? ' active' : ''}" data-folder="${f.id}">
                <span class="ol-desk-folder-icon">${f.icon}</span>
                <span class="ol-desk-folder-name">${f.name}</span>
                ${f.count > 0 ? `<span class="ol-desk-folder-count">${f.count}</span>` : ''}
              </div>
            `).join('')}
          </div>
          <div class="ol-desk-sidebar-contact">
            <div class="ol-desk-contact-status"><span class="ol-desk-contact-dot">●</span> Erreichbar</div>
            <a class="ol-desk-contact-link" href="https://linkedin.com/in/niklas-fauteck" target="_blank" rel="noopener noreferrer">
              <span class="ol-desk-contact-icon" style="color:#0a66c2">in</span> LinkedIn
            </a>
            <a class="ol-desk-contact-link" href="mailto:niklas@fauteck.eu">
              <span class="ol-desk-contact-icon" style="color:#52b788">✉</span> E-Mail
            </a>
          </div>
        </div>
        <div class="ol-desk-maillist">
          <div class="ol-desk-maillist-header">
            <span>Posteingang</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style="opacity:0.4;cursor:pointer"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M14 14l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div class="ol-desk-maillist-items">
            ${mails.map((m, i) => `
              <div class="ol-desk-mail-item${m.unread ? ' unread' : ''}${i === 0 ? ' active' : ''}" data-idx="${i}">
                ${m.unread ? '<div class="ol-desk-mail-unread-dot"></div>' : '<div class="ol-desk-mail-unread-dot" style="visibility:hidden"></div>'}
                <div class="ol-desk-mail-avatar">${m.from[0]}</div>
                <div class="ol-desk-mail-content">
                  <div class="ol-desk-mail-from">${m.from}</div>
                  <div class="ol-desk-mail-subject">${m.subject}</div>
                  <div class="ol-desk-mail-preview">${m.preview}</div>
                </div>
                <div class="ol-desk-mail-time">${m.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="ol-desk-readpane">
          <div class="ol-desk-read-content"></div>
        </div>
      </div>
    </div>
  `;

  // --- Reading pane logic ---
  const readPane = body.querySelector('.ol-desk-read-content');
  const mailItems = body.querySelectorAll('.ol-desk-mail-item');

  function showMail(idx) {
    const m = mails[idx];
    readPane.innerHTML = `
      <div class="ol-desk-read-subject">${m.subject}</div>
      <div class="ol-desk-read-meta">
        <div class="ol-desk-read-avatar">${m.from[0]}</div>
        <div class="ol-desk-read-meta-info">
          <div class="ol-desk-read-from">${m.from}</div>
          <div class="ol-desk-read-to">An: ${m.to}${m.cc ? ' &nbsp;|&nbsp; Cc: ' + m.cc : ''}</div>
        </div>
        <div class="ol-desk-read-date">${m.date}</div>
      </div>
      <div class="ol-desk-read-body">${m.body}</div>
    `;
  }

  function selectMail(idx) {
    mailItems.forEach(el => el.classList.remove('active'));
    const target = body.querySelector(`.ol-desk-mail-item[data-idx="${idx}"]`);
    if (target) {
      target.classList.remove('unread');
      target.classList.add('active');
      const dot = target.querySelector('.ol-desk-mail-unread-dot');
      if (dot) dot.style.visibility = 'hidden';
    }
    showMail(idx);
  }

  mailItems.forEach(el => {
    el.addEventListener('click', () => selectMail(parseInt(el.dataset.idx)));
  });

  // Show first mail on load
  showMail(0);

  // --- Folder click ---
  body.querySelectorAll('.ol-desk-folder').forEach(f => {
    f.addEventListener('click', () => {
      body.querySelectorAll('.ol-desk-folder').forEach(ff => ff.classList.remove('active'));
      f.classList.add('active');
      if (f.dataset.folder !== 'inbox') {
        readPane.innerHTML = '<div class="ol-desk-read-empty">Keine E-Mails in diesem Ordner.</div>';
        body.querySelector('.ol-desk-maillist-items').innerHTML = '<div class="ol-desk-read-empty" style="padding:24px;font-size:13px;color:#6b7280">Keine E-Mails</div>';
        body.querySelector('.ol-desk-maillist-header span').textContent = f.querySelector('.ol-desk-folder-name').textContent;
      } else {
        body.querySelector('.ol-desk-maillist-header span').textContent = 'Posteingang';
        body.querySelector('.ol-desk-maillist-items').innerHTML = mails.map((m, i) => `
          <div class="ol-desk-mail-item${m.unread ? ' unread' : ''}${i === 0 ? ' active' : ''}" data-idx="${i}">
            ${m.unread ? '<div class="ol-desk-mail-unread-dot"></div>' : '<div class="ol-desk-mail-unread-dot" style="visibility:hidden"></div>'}
            <div class="ol-desk-mail-avatar">${m.from[0]}</div>
            <div class="ol-desk-mail-content">
              <div class="ol-desk-mail-from">${m.from}</div>
              <div class="ol-desk-mail-subject">${m.subject}</div>
              <div class="ol-desk-mail-preview">${m.preview}</div>
            </div>
            <div class="ol-desk-mail-time">${m.time}</div>
          </div>
        `).join('');
        body.querySelectorAll('.ol-desk-mail-item').forEach(el => {
          el.addEventListener('click', () => selectMail(parseInt(el.dataset.idx)));
        });
        showMail(0);
      }
    });
  });

  // --- Compose (Neue E-Mail) ---
  body.querySelector('.ol-desk-new-mail').addEventListener('click', () => {
    readPane.innerHTML = `
      <div class="ol-desk-compose">
        <div class="ol-desk-compose-field">
          <label>An</label>
          <input type="email" value="me@fauteck.eu" readonly class="ol-desk-compose-input ol-desk-compose-to">
        </div>
        <div class="ol-desk-compose-sep"></div>
        <div class="ol-desk-compose-field">
          <label>Betreff</label>
          <input type="text" class="ol-desk-compose-input" id="ol-desk-subject" placeholder="Betreff...">
        </div>
        <div class="ol-desk-compose-sep"></div>
        <textarea class="ol-desk-compose-textarea" id="ol-desk-message" placeholder="Hallo Niklas,&#10;&#10;ich habe deine Website entdeckt und wollte mich kurz vorstellen..." rows="10"></textarea>
        <div class="ol-desk-compose-footer">
          <div class="ol-desk-compose-success" id="ol-desk-compose-success" style="display:none">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#16a34a" stroke-width="1.5"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Mail-Client wird geöffnet...
          </div>
          <a href="#" class="ol-desk-compose-send" id="ol-desk-compose-send">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M2 9l14-6-6 14-2-5-6-3z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>
            Senden
          </a>
        </div>
      </div>
    `;
    body.querySelector('#ol-desk-subject')?.focus();
    const sendBtn = body.querySelector('#ol-desk-compose-send');
    const success = body.querySelector('#ol-desk-compose-success');
    sendBtn.addEventListener('click', e => {
      e.preventDefault();
      const subj = (body.querySelector('#ol-desk-subject')?.value || '').trim();
      const msg  = (body.querySelector('#ol-desk-message')?.value || '').trim();
      const mailtoUrl = `mailto:me@fauteck.eu?subject=${encodeURIComponent(subj || 'Kontakt über NiklasOS')}&body=${encodeURIComponent(msg)}`;
      sendBtn.style.display = 'none';
      success.style.display = 'flex';
      setTimeout(() => { window.location.href = mailtoUrl; }, 800);
      setTimeout(() => { sendBtn.style.display = ''; success.style.display = 'none'; }, 3000);
    });
  });
}

function buildOutlookMobile(body, mails) {
  body.innerHTML = `
    <div class="mob-mail-wrap" style="position:relative;height:100%;overflow:hidden;">
      <div class="mob-mail-header">
        <span style="font-weight:600">Posteingang</span>
        <span class="mob-mail-badge">2</span>
      </div>

      <div class="mob-mail-tabs">
        <span class="mob-mail-tab active">Fokus</span>
        <span class="mob-mail-tab">Sonstige</span>
        <span class="mob-mail-tab-filter">Filter</span>
      </div>

      <!-- Contact info -->
      <div class="outlook-contact-section">
        <div class="outlook-contact-status">
          <span>●</span>
          <span class="outlook-contact-online">niklas-fauteck</span>
          <span>ist erreichbar</span>
          <span class="outlook-contact-ping">Response &lt; 48h</span>
        </div>
        <div class="outlook-contact-links">
          <a class="outlook-contact-link" href="https://linkedin.com/in/niklas-fauteck" target="_blank" rel="noopener noreferrer">
            <span class="outlook-contact-icon" style="background:rgba(10,102,194,0.12)">in</span>
            <span>LinkedIn</span>
          </a>
          <a class="outlook-contact-link" href="mailto:niklas@fauteck.eu">
            <span class="outlook-contact-icon" style="background:rgba(82,183,136,0.12)">✉</span>
            <span>E-Mail</span>
          </a>
        </div>
        <div class="outlook-contact-topics">
          <strong>Gesprächsthemen:</strong> Digitale Transformation · KI-Workflows · Smart Home · 3D-Druck · Automationen · pragmatische Systemarbeit
        </div>
      </div>

      <div class="mob-mail-list">
        ${mails.map(m => `
          <div class="mob-mail-item${m.unread ? ' unread' : ''}">
            <div class="mob-mail-avatar">${m.from[0]}</div>
            <div class="mob-mail-body">
              <div class="mob-mail-from">${m.from}</div>
              <div class="mob-mail-subject">${m.subject}</div>
              <div class="mob-mail-preview">${m.preview}</div>
            </div>
            <div class="mob-mail-time">${m.time}</div>
          </div>
        `).join('')}
      </div>

      <!-- Compose FAB -->
      <button class="mob-mail-fab" id="mob-mail-fab" aria-label="Neue E-Mail verfassen" title="Neue E-Mail">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 13.5L13.5 3l3.5 3.5L6.5 17H3v-3.5z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M11 5l3.5 3.5" stroke="white" stroke-width="1.5"/>
        </svg>
        <span class="mob-mail-fab-label">Mail schreiben</span>
      </button>

      <!-- Compose overlay -->
      <div class="mob-mail-compose" id="mob-mail-compose" aria-hidden="true">
        <div class="mob-mail-compose-header">
          <button class="mob-mail-compose-close" id="mob-mail-compose-close" aria-label="Schließen">✕</button>
          <span>Neue E-Mail</span>
          <div style="width:28px"></div>
        </div>
        <div class="mob-mail-compose-body">
          <div class="mob-mail-compose-field">
            <label>An</label>
            <input type="email" value="me@fauteck.eu" readonly class="mob-mail-compose-input mob-mail-compose-to">
          </div>
          <div class="mob-mail-compose-sep"></div>
          <div class="mob-mail-compose-field">
            <label>Betreff</label>
            <input type="text" id="mob-mail-subject" placeholder="Betreff…" class="mob-mail-compose-input">
          </div>
          <div class="mob-mail-compose-sep"></div>
          <textarea id="mob-mail-message" class="mob-mail-compose-textarea" placeholder="Hallo Niklas,&#10;&#10;ich habe deine Website entdeckt und wollte mich kurz vorstellen…" rows="8"></textarea>
        </div>
        <div class="mob-mail-compose-footer">
          <div id="mob-mail-compose-success" class="mob-mail-compose-success" style="display:none">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="#16a34a" stroke-width="1.5"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Mail-Client wird geöffnet…
          </div>
          <a class="mob-mail-compose-send" id="mob-mail-compose-send" href="#" aria-label="Senden">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9l14-6-6 14-2-5-6-3z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>
            Senden
          </a>
        </div>
      </div>
    </div>
  `;

  // FAB → open compose
  const fab     = body.querySelector('#mob-mail-fab');
  const compose = body.querySelector('#mob-mail-compose');
  const closeBtn= body.querySelector('#mob-mail-compose-close');
  const sendBtn = body.querySelector('#mob-mail-compose-send');
  const success = body.querySelector('#mob-mail-compose-success');

  fab.addEventListener('click', () => {
    compose.classList.add('open');
    compose.setAttribute('aria-hidden', 'false');
    body.querySelector('#mob-mail-subject')?.focus();
  });

  closeBtn.addEventListener('click', () => {
    compose.classList.remove('open');
    compose.setAttribute('aria-hidden', 'true');
  });

  sendBtn.addEventListener('click', e => {
    e.preventDefault();
    const subj = (body.querySelector('#mob-mail-subject')?.value || '').trim();
    const msg  = (body.querySelector('#mob-mail-message')?.value || '').trim();
    const mailtoUrl = `mailto:me@fauteck.eu?subject=${encodeURIComponent(subj || 'Kontakt über NiklasOS')}&body=${encodeURIComponent(msg)}`;
    sendBtn.style.display = 'none';
    success.style.display = 'flex';
    setTimeout(() => { window.location.href = mailtoUrl; }, 800);
    setTimeout(() => {
      compose.classList.remove('open');
      compose.setAttribute('aria-hidden', 'true');
      sendBtn.style.display = '';
      success.style.display = 'none';
    }, 3000);
  });
}

function buildTeams(body) {
  body.innerHTML = `
    <div class="mob-teams-wrap">
      <div class="mob-teams-header">Teams</div>
      <div class="mob-teams-channels">
        <div class="mob-teams-ch active">💬 Allgemein</div>
        <div class="mob-teams-ch">🖥️ Digital Transformation</div>
        <div class="mob-teams-ch">🤖 KI-Workflows</div>
        <div class="mob-teams-ch">📢 Announcements</div>
      </div>
      <div class="mob-teams-messages">
        <div class="mob-teams-msg">
          <strong>Max M.</strong> <span class="mob-teams-time">10:32</span><br>
          Hat jemand schon das neue Media Hub Deployment getestet?
        </div>
        <div class="mob-teams-msg">
          <strong>Sarah K.</strong> <span class="mob-teams-time">10:35</span><br>
          Ja, lief durch. Portainer hat alles sauber deployt 👍
        </div>
        <div class="mob-teams-msg teams-self">
          <strong>Niklas F.</strong> <span class="mob-teams-time">10:37</span><br>
          Super! Ich check noch den Health-Endpoint und gebe grünes Licht.
        </div>
        <div class="mob-teams-msg">
          <strong>IT-Support</strong> <span class="mob-teams-time">11:04</span><br>
          Reminder: Wartungsfenster heute Nacht 22-02 Uhr für Server-Updates
        </div>
        <div class="mob-teams-msg teams-self">
          <strong>Niklas F.</strong> <span class="mob-teams-time">11:06</span><br>
          Danke! Ich stelle die Monitoring-Alerts entsprechend stumm 🔕
        </div>
      </div>
    </div>
  `;
}

function buildJira(body) {
  const tickets = [
    { id: 'KOMM-4822', title: 'Media Hub: Performance-Optimierung Suchindex', status: 'In Progress', priority: '🔴', assignee: 'NF' },
    { id: 'KOMM-4819', title: 'KI-Workflow: Automatische Textkomprimierung', status: 'Review', priority: '🟠', assignee: 'NF' },
    { id: 'KOMM-4815', title: 'PICTRON: Neue Bildkategorie hinzufügen', status: 'Done', priority: '🟡', assignee: 'MK' },
    { id: 'KOMM-4810', title: 'MDC: Export-Funktion überarbeiten', status: 'Waiting for IT', priority: '🟠', assignee: 'NF' },
    { id: 'KOMM-4808', title: 'Dashboard: Power BI Integration testen', status: 'Todo', priority: '🟡', assignee: 'NF' },
  ];
  const statusColors = {
    'In Progress': '#3b82f6', 'Review': '#8b5cf6', 'Done': '#10b981',
    'Waiting for IT': '#f59e0b', 'Todo': '#6b7280',
  };
  body.innerHTML = `
    <div class="mob-jira-wrap">
      <div class="mob-jira-header">
        <span style="font-weight:600">Sprint: März 2026</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.4)">5 Tickets</span>
      </div>
      <div class="mob-jira-list">
        ${tickets.map(t => `
          <div class="mob-jira-ticket">
            <div class="mob-jira-top">
              <span class="mob-jira-id">${t.id}</span>
              <span class="mob-jira-status" style="background:${statusColors[t.status]}22;color:${statusColors[t.status]}">${t.status}</span>
            </div>
            <div class="mob-jira-title">${t.priority} ${t.title}</div>
            <div class="mob-jira-meta">
              <span class="mob-jira-avatar">${t.assignee}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildGitHub(body) {
  const repos = [
    { name: 'docker-configs', lang: '🐳 YAML', stars: 0, desc: 'GitOps Infra — Portainer, Home Assistant, NiklasOS', updated: 'vor 2h' },
    { name: 'niklas-os-website', lang: '🌐 JS', stars: 0, desc: 'NiklasOS — persönliche Website als Desktop-OS', updated: 'vor 3h' },
    { name: 'n8n-workflows', lang: '⚡ JSON', stars: 0, desc: 'KI-Automatisierungen und Workflow-Templates', updated: 'gestern' },
    { name: 'ha-automations', lang: '🏠 YAML', stars: 0, desc: 'Home Assistant Automationen & Scripts', updated: 'vor 3 Tagen' },
  ];
  const weeks = Array.from({length: 52}, (_, i) => Math.random() > 0.6 ? Math.ceil(Math.random() * 4) : 0);
  const levels = ['#0d1117','#0e4429','#006d32','#26a641','#39d353'];
  body.innerHTML = `
    <div class="mob-gh-wrap">
      <div class="mob-gh-header">
        <span style="font-weight:600">niklasfauteck</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.4)">4 Repositories</span>
      </div>
      <div class="mob-gh-contrib">
        <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px">Contribution-Aktivität</div>
        <div class="mob-gh-grid">
          ${weeks.map(v => `<div class="mob-gh-cell" style="background:${levels[v]}"></div>`).join('')}
        </div>
      </div>
      <div class="mob-gh-repos">
        ${repos.map(r => `
          <div class="mob-gh-repo">
            <div class="mob-gh-repo-name">${r.name}</div>
            <div class="mob-gh-repo-desc">${r.desc}</div>
            <div class="mob-gh-repo-meta">
              <span>${r.lang}</span>
              <span style="color:rgba(255,255,255,0.3)">${r.updated}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildRSS(body) {
  const feeds = [
    { source: 'Heise Online', title: 'KI-Modelle 2026: Was jetzt wirklich produktiv einsetzbar ist', time: 'vor 1h', cat: '🤖' },
    { source: 't3n', title: 'Docker-Alternativen im Test: Podman, Colima und Co.', time: 'vor 3h', cat: '🐳' },
    { source: 'Meedia', title: 'RTL startet neues Streaming-Angebot für Nachrichten', time: 'vor 5h', cat: '📺' },
    { source: 'Home Assistant Blog', title: '2026.3 Release: Matter-Support und neue Energie-Dashboards', time: 'gestern', cat: '🏠' },
    { source: 'GitHub Blog', title: 'GitHub Copilot bekommt neuen Agent-Modus', time: 'gestern', cat: '💻' },
    { source: 'Bambu Lab', title: 'Neues Filament: TPU 95A Transparent jetzt erhältlich', time: 'vor 2 Tagen', cat: '🖨️' },
  ];
  body.innerHTML = `
    <div class="mob-rss-wrap">
      <div class="mob-rss-header">Feedly · Meine Feeds</div>
      <div class="mob-rss-list">
        ${feeds.map(f => `
          <div class="mob-rss-item">
            <div class="mob-rss-meta">
              <span class="mob-rss-cat">${f.cat}</span>
              <span class="mob-rss-source">${f.source}</span>
              <span class="mob-rss-time">${f.time}</span>
            </div>
            <div class="mob-rss-title">${f.title}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildFilesApp(body) {
  if (window.innerWidth < 768) return buildFilesAppMobile(body);
  return buildEigeneDateien(body);
}

function buildFilesAppMobile(body) {
  const files = [
    { icon: '📄', name: 'Niklas_CV.pdf',             type: 'PDF',  size: '142 KB', action: null,    color: '#dc2626' },
    { icon: '📝', name: 'Steuererklärung 2025.docx', type: 'DOCX', size: '88 KB',  action: 'crash', color: '#2563eb' },
    { icon: '📊', name: 'Projektziele_2026.xlsx',    type: 'XLSX', size: '34 KB',  action: null,    color: '#16a34a' },
    { icon: '🗜️', name: 'HomeAssistant_Backup.tar.gz', type: 'GZ', size: '2,3 MB', action: null,   color: '#d97706' },
    { icon: '🖼️', name: 'Katheterspiegelhalter_v3.3mf', type: '3MF', size: '1,1 MB', action: null, color: '#7c3aed' },
  ];

  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.innerHTML = `
    <div class="mob-files-wrap">
      <div class="mob-files-header">
        <span>Eigene Dateien</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="16" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="mob-files-scroll">
        <div class="mob-files-section-label">Zuletzt geöffnet</div>
        <div class="mob-files-recent">
          <div class="mob-files-recent-item">📄 <span>Niklas_CV.pdf</span></div>
          <div class="mob-files-recent-item">📊 <span>Projektziele_2026.xlsx</span></div>
        </div>
        <div class="mob-files-section-label" style="margin-top:16px">Alle Dateien</div>
        <div class="mob-files-grid">
          ${files.map(f => `
            <div class="mob-file-card${f.action === 'crash' ? ' mob-file-card-docx' : ''}">
              <div class="mob-file-card-icon">${f.icon}</div>
              <div class="mob-file-card-name">${f.name}</div>
              <div class="mob-file-card-size">${f.type} · ${f.size}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Word Crash Dialog (reused) -->
    <div class="word-crash-overlay" id="word-crash-overlay" style="display:none">
      <div class="word-crash-dialog">
        <div class="word-crash-titlebar">
          <span class="word-crash-title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right:6px;vertical-align:-3px">
              <rect width="16" height="16" rx="2" fill="#2B579A"/>
              <text x="3" y="12" font-size="10" font-weight="bold" fill="white" font-family="Arial">W</text>
            </svg>
            Microsoft Word — Fehler
          </span>
          <button class="word-crash-close" id="word-crash-close">✕</button>
        </div>
        <div class="word-crash-body">
          <div class="word-crash-icon">⚠️</div>
          <div class="word-crash-content">
            <div class="word-crash-code">FEHLER 0x0000STEUER</div>
            <p>Word konnte <strong>"Steuererklärung 2025.docx"</strong> nicht öffnen.</p>
            <p style="margin-top:8px;font-size:12px;color:#555">
              Das Dokument enthält Ausgaben, die das Finanzamt als "nicht abzugsfähig"
              eingestuft hat (u.a. Docker-Server, 3D-Drucker-Filament, Smart-Home-Geräte).
            </p>
            <p style="margin-top:8px;font-size:12px;color:#555">
              <strong>Mögliche Lösungen:</strong><br>
              • Steuerberater beauftragen (Kosten: abzugsfähig)<br>
              • Datei löschen (nicht empfohlen)<br>
              • Auf nächstes Jahr verschieben (bewährt)
            </p>
          </div>
        </div>
        <div class="word-crash-footer">
          <button class="word-crash-btn" id="word-crash-ok">OK, ich versuchs nächstes Jahr</button>
        </div>
      </div>
    </div>
  `;

  body.querySelectorAll('.mob-file-card-docx').forEach(el => {
    el.addEventListener('click', () => {
      const overlay = body.querySelector('#word-crash-overlay');
      if (overlay) overlay.style.display = 'flex';
    });
  });
  const closeBtn = body.querySelector('#word-crash-close');
  const okBtn    = body.querySelector('#word-crash-ok');
  const overlay  = body.querySelector('#word-crash-overlay');
  if (closeBtn) closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });
  if (okBtn)    okBtn.addEventListener('click',    () => { overlay.style.display = 'none'; });
}

// ─────────────────────────────────────────────────
// EIGENE DATEIEN
// ─────────────────────────────────────────────────
function buildEigeneDateien(body) {
  const EF_ICONS = {
    PDF: `<svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="2" y="2" width="28" height="28" rx="3" fill="#dc2626"/><text x="5" y="22" font-size="10" font-weight="700" fill="white" font-family="Arial">PDF</text></svg>`,
    DOCX: `<svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="2" y="2" width="28" height="28" rx="3" fill="#2563eb"/><text x="8" y="22" font-size="13" font-weight="700" fill="white" font-family="Arial">W</text></svg>`,
    XLSX: `<svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="2" y="2" width="28" height="28" rx="3" fill="#16a34a"/><path d="M8 10l6 12M14 10L8 22" stroke="white" stroke-width="2" stroke-linecap="round"/><rect x="18" y="10" width="7" height="4" rx="1" fill="rgba(255,255,255,0.5)"/><rect x="18" y="16" width="7" height="4" rx="1" fill="rgba(255,255,255,0.7)"/></svg>`,
    GZ: `<svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="2" y="2" width="28" height="28" rx="3" fill="#6b7280"/><path d="M10 8h12v16H10zM14 12h4M14 16h4M14 20h4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M16 6v3M16 23v3" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    '3MF': `<svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="2" y="2" width="28" height="28" rx="3" fill="#0d9488"/><path d="M16 6l8 5v10l-8 5-8-5V11z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 11l8 5 8-5M16 16v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  };

  const files = [
    { svgIcon: EF_ICONS.PDF,  name: 'Niklas_CV.pdf',               type: 'PDF',  size: '142 KB', action: null },
    { svgIcon: EF_ICONS.DOCX, name: 'Steuererklärung 2025.docx',   type: 'DOCX', size: '88 KB',  action: 'crash' },
    { svgIcon: EF_ICONS.XLSX, name: 'Projektziele_2026.xlsx',       type: 'XLSX', size: '34 KB',  action: null },
    { svgIcon: EF_ICONS.GZ,   name: 'HomeAssistant_Backup.tar.gz',  type: 'GZ',   size: '2,3 MB', action: null },
    { svgIcon: EF_ICONS['3MF'], name: 'Katheterspiegelhalter_v3.3mf', type: '3MF', size: '1,1 MB', action: null },
  ];

  body.innerHTML = `
    <div class="ef-wrap">
      <div class="ef-toolbar">
        <div class="ef-toolbar-btns">
          <div class="ef-toolbar-btn" title="Zurück">‹</div>
          <div class="ef-toolbar-btn" title="Vor">›</div>
          <div class="ef-toolbar-btn" title="Hoch">↑</div>
        </div>
        <div class="ef-path">/Niklas/Eigene Dateien</div>
      </div>
      <div class="ef-body">
        <div class="ef-sidebar">
          <div class="ef-sidebar-section">Orte</div>
          <div class="ef-sidebar-item active"><span class="ef-si-icon">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M1 4h5l1.5 2H15v8H1V4z" fill="#fbbf24" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round"/></svg>
          </span> Eigene Dateien</div>
          <div class="ef-sidebar-item"><span class="ef-si-icon">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><rect x="1" y="3" width="14" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 3V2M11 3V2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </span> Desktop</div>
          <div class="ef-sidebar-item"><span class="ef-si-icon">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 5h10M6 5V3a1 1 0 011-1h2a1 1 0 011 1v2M5 5l.7 9h4.6l.7-9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span> Papierkorb</div>
        </div>
        <div class="ef-main">
          <div class="ef-list-header">
            <span class="ef-col-icon"></span>
            <span class="ef-col-name">Name</span>
            <span class="ef-col-type">Typ</span>
            <span class="ef-col-size">Größe</span>
          </div>
          ${files.map(f => `
            <div class="ef-file${f.action === 'crash' ? ' ef-file-docx' : ''}" data-action="${f.action || ''}">
              <span class="ef-col-icon ef-file-icon">${f.svgIcon}</span>
              <span class="ef-col-name ef-file-name">${f.name}</span>
              <span class="ef-col-type">${f.type}</span>
              <span class="ef-col-size">${f.size}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="ef-statusbar">5 Objekte · 3,7 MB</div>
    </div>

    <!-- Word Crash Dialog -->
    <div class="word-crash-overlay" id="word-crash-overlay" style="display:none">
      <div class="word-crash-dialog">
        <div class="word-crash-titlebar">
          <span class="word-crash-title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right:6px;vertical-align:-3px">
              <rect width="16" height="16" rx="2" fill="#2B579A"/>
              <text x="3" y="12" font-size="10" font-weight="bold" fill="white" font-family="Arial">W</text>
            </svg>
            Microsoft Word — Fehler
          </span>
          <button class="word-crash-close" id="word-crash-close">✕</button>
        </div>
        <div class="word-crash-body">
          <div class="word-crash-icon">⚠️</div>
          <div class="word-crash-content">
            <div class="word-crash-code">FEHLER 0x0000STEUER</div>
            <p>Word konnte <strong>"Steuererklärung 2025.docx"</strong> nicht öffnen.</p>
            <p style="margin-top:8px;font-size:12px;color:#555">
              Das Dokument enthält Ausgaben, die das Finanzamt als "nicht abzugsfähig"
              eingestuft hat (u.a. Docker-Server, 3D-Drucker-Filament, Smart-Home-Geräte).
              Word verweigert das Öffnen aus Solidarität mit dem Finanzamt.
            </p>
            <p style="margin-top:8px;font-size:12px;color:#555">
              <strong>Mögliche Lösungen:</strong><br>
              • Steuerberater beauftragen (Kosten: abzugsfähig)<br>
              • Datei löschen (nicht empfohlen)<br>
              • Auf nächstes Jahr verschieben (bewährt)
            </p>
          </div>
        </div>
        <div class="word-crash-footer">
          <button class="word-crash-btn" id="word-crash-ok">OK, ich versuchs nächstes Jahr</button>
        </div>
      </div>
    </div>
  `;

  // Word crash on docx click
  body.querySelectorAll('.ef-file-docx').forEach(el => {
    el.addEventListener('dblclick', () => {
      const overlay = body.querySelector('#word-crash-overlay');
      if (overlay) overlay.style.display = 'flex';
    });
  });
  const closeBtn = body.querySelector('#word-crash-close');
  const okBtn    = body.querySelector('#word-crash-ok');
  const overlay  = body.querySelector('#word-crash-overlay');
  if (closeBtn) closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });
  if (okBtn)    okBtn.addEventListener('click',    () => { overlay.style.display = 'none'; });
}

// ─────────────────────────────────────────────────
// SNAKE GAME
// ─────────────────────────────────────────────────
function buildSnake(body) {
  body.style.padding = '0';
  body.innerHTML = `
    <div class="snake-game">
      <div class="snake-header">
        <div class="snake-score">Score: <span id="snake-score-val">0</span></div>
        <div class="snake-best">Best: <span id="snake-best-val">0</span></div>
      </div>
      <canvas id="snake-canvas" width="300" height="300"></canvas>
      <div class="snake-controls">
        <div class="snake-ctrl-row"><button class="snake-btn" data-dir="up">▲</button></div>
        <div class="snake-ctrl-row">
          <button class="snake-btn" data-dir="left">◀</button>
          <button class="snake-btn" data-dir="down">▼</button>
          <button class="snake-btn" data-dir="right">▶</button>
        </div>
      </div>
      <div class="snake-overlay" id="snake-overlay">
        <div class="snake-overlay-text">
          <div class="snake-overlay-title">Snake</div>
          <div class="snake-overlay-sub">Tap to start</div>
        </div>
      </div>
    </div>
  `;

  const canvas = body.querySelector('#snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = body.querySelector('#snake-score-val');
  const bestEl = body.querySelector('#snake-best-val');
  const overlay = body.querySelector('#snake-overlay');
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
    // Background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(canvas.width, i * CELL); ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
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

    // Wall collision
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) return gameOver();
    // Self collision
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
    gameLoop = setInterval(update, 120);
  }

  function setDir(x, y) {
    if (dir.x === -x && dir.y === -y) return; // no reverse
    nextDir = { x, y };
  }

  // Touch / click controls
  body.querySelectorAll('.snake-btn').forEach(btn => {
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

  // Keyboard controls
  function keyHandler(e) {
    if (!running) return;
    if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); setDir(0, -1); }
    if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); setDir(0, 1); }
    if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); setDir(-1, 0); }
    if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); setDir(1, 0); }
  }
  document.addEventListener('keydown', keyHandler);

  // Swipe controls
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

  // Initial draw
  reset();
  draw();
  overlay.classList.add('show');
}

// ─────────────────────────────────────────────────
// MINESWEEPER GAME
// ─────────────────────────────────────────────────
function buildMinesweeper(body) {
  body.style.padding = '0';

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
    // Calculate numbers
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
          content = '🚩';
        }
        gridHtml += `<div class="${cls}" data-r="${r}" data-c="${c}">${content}</div>`;
      }
    }

    let statusFace = '🙂';
    let statusMsg = '';
    if (gameOver === 'lost') { statusFace = '😵'; statusMsg = 'Game Over!'; }
    if (gameOver === 'won') { statusFace = '😎'; statusMsg = 'Gewonnen!'; }

    body.innerHTML = `
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

    // Event listeners
    body.querySelector('#ms-reset').addEventListener('click', init);
    const playAgain = body.querySelector('.ms-play-again');
    if (playAgain) playAgain.addEventListener('click', init);

    if (!gameOver) {
      body.querySelectorAll('.ms-cell:not(.ms-revealed)').forEach(cell => {
        cell.addEventListener('click', () => {
          const r = +cell.dataset.r, c = +cell.dataset.c;
          if (flagged[r][c]) return;
          if (firstClick) {
            firstClick = false;
            placeMines(r, c);
            timerInt = setInterval(() => { timerVal++; updateTimerDisplay(); }, 1000);
          }
          if (board[r][c] === -1) {
            // Reveal all mines
            for (let rr = 0; rr < ROWS; rr++)
              for (let cc = 0; cc < COLS; cc++)
                if (board[rr][cc] === -1) revealed[rr][cc] = true;
            gameOver = 'lost';
            clearInterval(timerInt);
            if (typeof showAchievement === 'function' && firstClick === false) showAchievement('Pech gehabt', 'Pech. Aber auch das gehört zum Job.');
            render();
            return;
          }
          reveal(r, c);
          if (checkWin()) {
            gameOver = 'won';
            clearInterval(timerInt);
            if (typeof showAchievement === 'function') showAchievement('Minenräumer', 'Kein Zufall. Kein Glück. Nur Logik.');
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
    const el = body.querySelector('.ms-counter:last-child');
    if (el) el.textContent = String(timerVal).padStart(3, '0');
  }

  init();
}

// ─────────────────────────────────────────────────
// DESKTOP ICONS
// ─────────────────────────────────────────────────
function initDesktopIcons() {
  const icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
    const id = icon.dataset.window;
    icon.addEventListener('dblclick', () => openWindow(id));
    icon.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWindow(id); }
    });
    icon.addEventListener('click', () => {
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
    });
  });

  // Deselect on desktop click
  document.getElementById('desktop').addEventListener('click', e => {
    if (!e.target.closest('.desktop-icon')) {
      icons.forEach(i => i.classList.remove('selected'));
    }
  });
}

// ─────────────────────────────────────────────────
// CONTEXT MENU
// ─────────────────────────────────────────────────
function initContextMenu() {
  const menu = document.getElementById('context-menu');

  document.getElementById('desktop').addEventListener('contextmenu', e => {
    if (e.target.closest('.desktop-icon')) return;
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth  - menu.offsetWidth  - 8);
    const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight - 8);
    menu.style.left = x + 'px';
    menu.style.top  = y + 'px';
    menu.classList.add('show');
  });

  menu.querySelectorAll('.ctx-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (action === 'minimize-all') minimizeAll();
      else if (WIN_CONFIGS[action]) openWindow(action);
      menu.classList.remove('show');
    });
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target)) menu.classList.remove('show');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') menu.classList.remove('show');
  });

  // CTA Contact Button in Taskbar
  const contactBtn = document.getElementById('tb-contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => openWindow('outlook'));
  }

  // Keyboard Shortcuts (Ctrl+1..4, Ctrl+0)
  document.addEventListener('keydown', e => {
    if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    const shortcuts = { '1': 'about', '2': 'career', '3': 'terminal', '4': 'sysmon', '0': 'outlook' };
    if (shortcuts[e.key]) {
      e.preventDefault();
      openWindow(shortcuts[e.key]);
    }
  });
}

// ─────────────────────────────────────────────────
// GAMES FOLDER
// ─────────────────────────────────────────────────
function buildGames(body) {
  body.style.padding = '0';
  const games = [
    { id: 'minesweeper', label: 'Minesweeper', icon: '💣', color: '#dc2626' },
    { id: 'solitaire',   label: 'Solitär',     icon: '🃏', color: '#059669' },
    { id: 'memory',      label: 'Memory',       icon: '🧠', color: '#7c3aed' },
    { id: 'snake',       label: 'Snake',         icon: '🐍', color: '#22c55e' },
    { id: 'tetris',      label: 'Tetris',        icon: '🧱', color: '#0d9488' },
  ];

  body.innerHTML = `
    <div class="games-folder">
      <div class="games-folder-header">Games</div>
      <div class="games-folder-grid">
        ${games.map(g => `
          <div class="games-folder-item" data-game="${g.id}">
            <div class="games-folder-icon" style="background:${g.color}">${g.icon}</div>
            <div class="games-folder-label">${g.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  body.querySelectorAll('.games-folder-item').forEach(item => {
    item.addEventListener('click', () => {
      if (document.getElementById('mobile-window')?.classList.contains('show')) {
        openMobileWindow(item.dataset.game);
      } else {
        openWindow(item.dataset.game);
      }
    });
  });
}

// ─────────────────────────────────────────────────
// SOLITAIRE (Klondike — Click-to-Move)
// ─────────────────────────────────────────────────
function buildSolitaire(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';

  const SUITS = ['♠','♥','♦','♣'];
  const SUIT_COLORS = { '♠':'black','♣':'black','♥':'red','♦':'red' };
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
    stock = [];
    waste = [];
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

  function tryAutoFoundation(card, source, sourceIdx) {
    for (let fi = 0; fi < 4; fi++) {
      if (canPlaceOnFoundation(card, fi)) {
        if (source === 'waste') waste.pop();
        else if (source === 'tableau') {
          tableau[sourceIdx].pop();
          const col = tableau[sourceIdx];
          if (col.length > 0 && !col[col.length-1].faceUp) col[col.length-1].faceUp = true;
        }
        foundations[fi].push(card);
        return true;
      }
    }
    return false;
  }

  function handleSelect(type, colIdx, cardIdx) {
    if (selected) {
      // Try to place
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
          selected = null;
          render();
          return;
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
          selected = null;
          render();
          checkWin();
          return;
        }
      }
      selected = null;
      render();
      return;
    }
    // Select
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
    selected = null;
    render();
  }

  function checkWin() {
    if (foundations.every(f => f.length === 13)) {
      setTimeout(() => {
        const overlay = body.querySelector('.sol-win-overlay');
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
      const top = f.length ? renderCard(f[f.length-1], false) : '<div class="sol-card sol-card-empty">♠</div>';
      return `<div class="sol-foundation" data-fi="${fi}">${top}</div>`;
    }).join('');

    const stockHtml = stock.length
      ? '<div class="sol-card sol-card-back"></div>'
      : '<div class="sol-card sol-card-empty sol-card-refresh">↺</div>';

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

    body.innerHTML = `
      <div class="sol-wrap">
        <div class="sol-top-row">
          <div class="sol-stock" id="sol-stock">${stockHtml}</div>
          <div class="sol-waste" id="sol-waste">${wasteHtml}</div>
          <div class="sol-spacer"></div>
          ${foundationHtml}
        </div>
        <div class="sol-tableau" id="sol-tableau">${tableauHtml}</div>
        <div class="sol-win-overlay" style="display:none">
          <div class="sol-win-msg">🎉 Gewonnen!</div>
          <button class="sol-new-game">Neues Spiel</button>
        </div>
      </div>
    `;

    // Events
    body.querySelector('#sol-stock').addEventListener('click', drawFromStock);
    body.querySelector('#sol-waste').addEventListener('click', () => handleSelect('waste'));
    body.querySelectorAll('.sol-foundation').forEach(el => {
      el.addEventListener('click', () => handleSelect('foundation', +el.dataset.fi));
    });
    body.querySelectorAll('.sol-tableau-col').forEach(col => {
      col.addEventListener('click', e => {
        const cardEl = e.target.closest('.sol-tableau-card');
        const ci = +col.dataset.col;
        if (cardEl) {
          const idx = +cardEl.dataset.idx;
          // Double-click to auto-foundation
          handleSelect('tableau', ci, idx);
        } else {
          handleSelect('tableau', ci, 0);
        }
      });
    });
    const winBtn = body.querySelector('.sol-new-game');
    if (winBtn) winBtn.addEventListener('click', init);
  }

  init();
}

// ─────────────────────────────────────────────────
// MEMORY GAME
// ─────────────────────────────────────────────────
function buildMemory(body) {
  body.style.padding = '0';

  const EMOJIS = ['🚀','🎯','⚡','🔥','🌟','💡','🎨','🔧'];
  let cards, flipped, matched, moves, startTime, timerInt, lockBoard;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    return arr;
  }

  function init() {
    cards = shuffle([...EMOJIS, ...EMOJIS].map((emoji, i) => ({ emoji, id: i, flipped: false, matched: false })));
    flipped = [];
    matched = 0;
    moves = 0;
    lockBoard = false;
    startTime = Date.now();
    clearInterval(timerInt);
    render();
    timerInt = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const el = body.querySelector('#mem-timer');
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
    body.innerHTML = `
      <div class="mem-win">
        <div class="mem-win-icon">🎉</div>
        <div class="mem-win-title">Gewonnen!</div>
        <div class="mem-win-stats">Zeit: ${time} · Züge: ${moves}</div>
        <button class="mem-new-game" id="mem-restart">Neues Spiel</button>
      </div>
    `;
    body.querySelector('#mem-restart').addEventListener('click', init);
  }

  function render() {
    body.innerHTML = `
      <div class="mem-wrap">
        <div class="mem-header">
          <span class="mem-stat">Züge: ${moves}</span>
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

    body.querySelectorAll('.mem-card').forEach(el => {
      el.addEventListener('click', () => flipCard(+el.dataset.idx));
    });
  }

  init();
}

// ─────────────────────────────────────────────────
// TETRIS GAME
// ─────────────────────────────────────────────────
function buildTetris(body) {
  body.style.padding = '0';

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
        cleared++;
        r++;
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
      merge();
      clearLines();
      spawnPiece();
    } else {
      piecePos = newPos;
    }
    render();
  }

  function hardDrop() {
    while (!collides(piece, { x: piecePos.x, y: piecePos.y + 1 })) piecePos.y++;
    merge();
    clearLines();
    spawnPiece();
    render();
  }

  function render() {
    const canvas = body.querySelector('#tet-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        ctx.strokeRect(c * CELL, r * CELL, CELL, CELL);

    // Board
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (board[r][c]) {
          ctx.fillStyle = COLORS[board[r][c]];
          ctx.fillRect(c*CELL+1, r*CELL+1, CELL-2, CELL-2);
        }

    // Current piece
    if (!gameOver && piece)
      for (let r = 0; r < piece.length; r++)
        for (let c = 0; c < piece[r].length; c++)
          if (piece[r][c]) {
            ctx.fillStyle = COLORS[piece[r][c]];
            ctx.fillRect((piecePos.x+c)*CELL+1, (piecePos.y+r)*CELL+1, CELL-2, CELL-2);
          }

    // Next piece preview
    const preview = body.querySelector('#tet-next');
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

    // Score display
    const scoreEl = body.querySelector('#tet-score');
    const levelEl = body.querySelector('#tet-level');
    const linesEl = body.querySelector('#tet-lines');
    if (scoreEl) scoreEl.textContent = score;
    if (levelEl) levelEl.textContent = level;
    if (linesEl) linesEl.textContent = lines;

    if (gameOver) {
      const overlay = body.querySelector('.tet-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  }

  body.innerHTML = `
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
          <div class="tet-info-label">Nächstes</div>
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
          ← → Bewegen<br>↑ Drehen<br>↓ Soft Drop<br>Space Hard Drop
        </div>
      </div>
    </div>
  `;

  function keyHandler(e) {
    if (gameOver) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); move(-1); render(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1);  render(); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); rotate(); render(); }
    if (e.key === 'ArrowDown')  { e.preventDefault(); tick(); }
    if (e.key === ' ')          { e.preventDefault(); hardDrop(); }
  }
  document.addEventListener('keydown', keyHandler);

  body.querySelector('#tet-restart').addEventListener('click', () => {
    init();
  });

  init();
}

// ─────────────────────────────────────────────────
// NETWORK WINDOW
// ─────────────────────────────────────────────────
function buildNetwork(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';

  const nodes = [
    { id: 'niklas',  label: 'Niklas',          x: 280, y: 220, r: 28, cat: 'center', desc: 'Head of Digital Transformation' },
    { id: 'rtl',     label: 'RTL Deutschland',  x: 120, y: 100, r: 20, cat: 'work',   desc: 'Arbeitgeber seit 2020' },
    { id: 'claude',  label: 'KI / Claude',      x: 420, y: 100, r: 20, cat: 'tech',   desc: 'AI-gestützte Workflows' },
    { id: 'ha',      label: 'Home Assistant',    x: 480, y: 220, r: 18, cat: 'tech',   desc: 'Smart Home Automation' },
    { id: 'bambu',   label: 'Bambu 3D-Druck',   x: 440, y: 340, r: 18, cat: 'tech',   desc: 'Bambu Lab P1S & X1C' },
    { id: 'github',  label: 'GitHub',            x: 280, y: 380, r: 18, cat: 'tech',   desc: 'Open Source & Projekte' },
    { id: 'linkedin',label: 'LinkedIn',          x: 120, y: 340, r: 18, cat: 'work',   desc: 'Professionelles Netzwerk' },
    { id: 'media',   label: 'Media Hub',         x: 80,  y: 220, r: 18, cat: 'private',desc: 'Medien-Infrastruktur' },
    { id: 'pictron', label: 'PICTRON',           x: 180, y: 160, r: 16, cat: 'work',   desc: 'Ehem. Arbeitgeber' },
    { id: 'mdc',     label: 'MDC',               x: 380, y: 160, r: 16, cat: 'work',   desc: 'Medienmanagement' },
  ];

  const edges = [
    ['niklas','rtl'],['niklas','claude'],['niklas','ha'],['niklas','bambu'],
    ['niklas','github'],['niklas','linkedin'],['niklas','media'],
    ['niklas','pictron'],['niklas','mdc'],
    ['rtl','pictron'],['rtl','mdc'],['claude','github'],['ha','bambu'],
  ];

  const catColors = { center: '#4ade80', work: '#3b82f6', private: '#f59e0b', tech: '#8b5cf6' };

  const edgesHtml = edges.map(([a,b], i) => {
    const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b);
    return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" class="net-edge"/>
      <circle r="3" fill="${catColors[na.cat]}" opacity="0.7">
        <animateMotion dur="${2+i*0.3}s" repeatCount="indefinite" path="M${na.x},${na.y} L${nb.x},${nb.y}"/>
      </circle>`;
  }).join('');

  const nodesHtml = nodes.map(n => {
    const pulse = n.id === 'niklas' ? '<animate attributeName="r" values="28;32;28" dur="2s" repeatCount="indefinite"/>' : '';
    return `<g class="net-node" data-id="${n.id}">
      <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${catColors[n.cat]}" opacity="0.2" stroke="${catColors[n.cat]}" stroke-width="1.5">${pulse}</circle>
      <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" fill="white" font-size="${n.id==='niklas'?'12':'10'}" font-family="var(--font-ui)" font-weight="${n.id==='niklas'?'600':'400'}">${n.label}</text>
    </g>`;
  }).join('');

  body.innerHTML = `
    <div class="net-wrap">
      <svg viewBox="0 0 560 440" class="net-svg">
        ${edgesHtml}
        ${nodesHtml}
      </svg>
      <div class="net-tooltip" id="net-tooltip" style="display:none"></div>
      <div class="net-legend">
        <span class="net-legend-item"><span class="net-legend-dot" style="background:#3b82f6"></span>Arbeit</span>
        <span class="net-legend-item"><span class="net-legend-dot" style="background:#f59e0b"></span>Privat</span>
        <span class="net-legend-item"><span class="net-legend-dot" style="background:#8b5cf6"></span>Technik</span>
      </div>
    </div>
  `;

  const tooltip = body.querySelector('#net-tooltip');
  body.querySelectorAll('.net-node').forEach(nodeEl => {
    nodeEl.style.cursor = 'pointer';
    nodeEl.addEventListener('mouseenter', e => {
      const n = nodes.find(nd => nd.id === nodeEl.dataset.id);
      if (!n) return;
      tooltip.textContent = `${n.label}: ${n.desc}`;
      tooltip.style.display = 'block';
      const rect = body.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
      tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
    });
    nodeEl.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}

// ─────────────────────────────────────────────────
// ACHIEVEMENT / EASTER EGG SYSTEM
// ─────────────────────────────────────────────────
const _achievements = new Set();
function showAchievement(title, desc) {
  if (_achievements.has(title)) return;
  _achievements.add(title);
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `<div class="ach-icon">🏆</div><div class="ach-body"><div class="ach-title">${title}</div><div class="ach-desc">${desc}</div></div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Konami Code
(function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[idx]) { idx++; if (idx === code.length) { idx = 0; triggerDevMode(); } }
    else idx = 0;
  });
})();

function triggerDevMode() {
  showAchievement('Dev Mode', 'Konami Code aktiviert. Du bist ein Profi.');
  // Brief matrix overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:99999;pointer-events:none;display:flex;align-items:center;justify-content:center;';
  overlay.innerHTML = '<div style="color:#4ade80;font-family:var(--font-mono);font-size:24px;text-align:center;animation:fadeIn 0.5s">DEV MODE ACTIVATED<br><span style="font-size:14px;opacity:0.6">↑↑↓↓←→←→BA</span></div>';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2000);
}

// Track open windows for multitasking achievement
const _origOpenWindow = typeof openWindow !== 'undefined' ? null : null;

// Clock click counter
let _clockClicks = 0;
document.addEventListener('click', e => {
  if (e.target.closest('.tb-clock') || e.target.closest('#tb-time') || e.target.closest('#tb-date')) {
    _clockClicks++;
    if (_clockClicks === 5) showAchievement('Zeitverschwendung', 'Du hast 5 Sekunden verschwendet. Gut investiert.');
  }
});

// Terminal command tracking for Easter eggs
let _termCmdHistory = [];
let _manNiklasCount = 0;
function trackTermCmd(cmd) {
  _termCmdHistory.push(cmd);
  if (cmd === 'man niklas') {
    _manNiklasCount++;
    if (_manNiklasCount >= 3) showAchievement('Manual-Leser', 'Das Manual ändert sich nicht. Aber du hast es 3× gelesen.');
  }
  // Check whoami + ls + skills sequence
  const last3 = _termCmdHistory.slice(-3);
  if (last3.length === 3 && last3[0] === 'whoami' && last3[1] === 'ls' && last3[2] === 'skills') {
    showAchievement('Detektiv', 'whoami → ls → skills. Systematisch.');
  }
}

// ─────────────────────────────────────────────────
// GOOGLE PHOTOS
// ─────────────────────────────────────────────────
function buildPhotos(body) {
  const isMob = window.innerWidth < 768;

  const albums = [
    { name: '2025',         count: 48, grad: 'linear-gradient(135deg,#2563eb,#7c3aed)' },
    { name: 'RTL Events',   count: 23, grad: 'linear-gradient(135deg,#dc2626,#d97706)' },
    { name: '3D Druck',     count: 17, grad: 'linear-gradient(135deg,#059669,#0d9488)' },
    { name: 'Zuhause',      count: 34, grad: 'linear-gradient(135deg,#ea580c,#d97706)' },
    { name: 'Reisen',       count: 12, grad: 'linear-gradient(135deg,#0891b2,#2563eb)' },
    { name: 'Smart Home',   count: 9,  grad: 'linear-gradient(135deg,#7c3aed,#db2777)' },
  ];

  // Fake photo tiles: 18 gradient placeholders with subtle pattern variations
  const tilePalettes = [
    '#1d4ed8', '#2563eb', '#7c3aed', '#6d28d9', '#dc2626', '#b91c1c',
    '#059669', '#065f46', '#d97706', '#b45309', '#0891b2', '#0e7490',
    '#db2777', '#9d174d', '#16a34a', '#ea580c', '#4f46e5', '#0f766e',
  ];

  const cols = isMob ? 3 : 4;

  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';

  body.innerHTML = `
    <div class="photos-wrap">
      <div class="photos-header">
        <span class="photos-logo">
          <span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC04">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span>
          &nbsp;Fotos
        </span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="photos-search-icon">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="photos-scroll" id="photos-scroll">

        <!-- Albums -->
        <div class="photos-section-label">Alben</div>
        <div class="photos-albums">
          ${albums.map(a => `
            <div class="photos-album" data-album="${a.name}">
              <div class="photos-album-cover" style="background:${a.grad}">
                <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                  <rect x="4" y="8" width="20" height="14" rx="2" stroke="white" stroke-width="1.5" fill="rgba(255,255,255,0.15)"/>
                  <circle cx="9" cy="13" r="2" fill="white" opacity="0.7"/>
                  <path d="M4 19l5-4 4 3 4-5 5 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
              </div>
              <div class="photos-album-name">${a.name}</div>
              <div class="photos-album-count">${a.count} Fotos</div>
            </div>
          `).join('')}
        </div>

        <!-- Photo grid -->
        <div class="photos-section-label" style="margin-top:16px">Zuletzt · März 2026</div>
        <div class="photos-grid" style="grid-template-columns:repeat(${cols},1fr)">
          ${tilePalettes.map((c, i) => `
            <div class="photos-tile" style="background:${c};opacity:${0.7 + (i % 4) * 0.075}" data-tile="${i}">
              ${i === 3 ? '<div class="photos-tile-icon">🏠</div>' : ''}
              ${i === 7 ? '<div class="photos-tile-icon">🖨️</div>' : ''}
              ${i === 11 ? '<div class="photos-tile-icon">🎬</div>' : ''}
              ${i === 15 ? '<div class="photos-tile-icon">✈️</div>' : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lightbox -->
      <div class="photos-lightbox" id="photos-lightbox" style="display:none">
        <button class="photos-lb-close" id="photos-lb-close">✕</button>
        <div class="photos-lb-img" id="photos-lb-img"></div>
        <div class="photos-lb-caption" id="photos-lb-caption">März 2026</div>
      </div>
    </div>
  `;

  // Album click → filter label
  body.querySelectorAll('.photos-album').forEach(el => {
    el.addEventListener('click', () => {
      body.querySelector('.photos-section-label:last-of-type').textContent =
        el.dataset.album + ' · ' + albums.find(a => a.name === el.dataset.album)?.count + ' Fotos';
      body.querySelectorAll('.photos-album').forEach(a => a.classList.remove('active'));
      el.classList.add('active');
    });
  });

  // Tile click → lightbox
  body.querySelectorAll('.photos-tile').forEach((tile, i) => {
    tile.addEventListener('click', () => {
      const lb     = body.querySelector('#photos-lightbox');
      const lbImg  = body.querySelector('#photos-lb-img');
      const lbCap  = body.querySelector('#photos-lb-caption');
      lb.style.display = 'flex';
      lbImg.style.background = tilePalettes[i];
      lbCap.textContent = `Foto ${i + 1} von 18 · März 2026`;
    });
  });

  body.querySelector('#photos-lb-close')?.addEventListener('click', () => {
    body.querySelector('#photos-lightbox').style.display = 'none';
  });
}

// ─────────────────────────────────────────────────
// START MENU
// ─────────────────────────────────────────────────
function initTaskbarAppsBtn() {
  const btn     = document.getElementById('tb-apps-btn');
  const menu    = document.getElementById('start-menu');
  const appList = document.getElementById('sm-apps-list');
  if (!btn || !menu) return;

  // Populate app list from WIN_CONFIGS
  Object.entries(WIN_CONFIGS).forEach(([id, cfg]) => {
    const bg = COLOR_MAP[cfg.color] || 'linear-gradient(135deg,#52b788,#2d6a4f)';
    const item = document.createElement('div');
    item.className = 'sm-app-item';
    item.setAttribute('role', 'menuitem');
    item.innerHTML = `
      <div class="sm-app-icon" style="background:${bg}">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="${cfg.svgPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>${cfg.title}</span>
    `;
    item.addEventListener('click', () => {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      openWindow(id);
    });
    if (appList) appList.appendChild(item);
  });

  // Toggle menu
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Shutdown button
  const shutdownBtn     = document.getElementById('sm-shutdown');
  const shutdownOverlay = document.getElementById('shutdown-overlay');
  if (shutdownBtn && shutdownOverlay) {
    shutdownBtn.addEventListener('click', () => {
      menu.classList.remove('open');
      shutdownOverlay.classList.add('show');
      shutdownOverlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        window.location.href = 'https://niklasfauteck.de/me/';
      }, 2200);
    });
  }
}

// ─────────────────────────────────────────────────
// MOBILE FAKE CALL & MESSAGE
// ─────────────────────────────────────────────────
function showFakeCall() {
  const overlay = document.getElementById('mob-fake-call');
  if (!overlay) return;
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('visible');

  function dismiss() {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('mfc-decline')?.addEventListener('click', dismiss, { once: true });
  document.getElementById('mfc-accept')?.addEventListener('click', () => {
    // Show "connected" state briefly
    const content = overlay.querySelector('.mfc-content');
    if (content) {
      const actions = content.querySelector('.mfc-actions');
      const labels  = content.querySelector('.mfc-labels');
      const sub     = content.querySelector('.mfc-sub');
      if (actions) actions.style.display = 'none';
      if (labels)  labels.style.display  = 'none';
      if (sub)     sub.textContent = 'Verbunden…';
    }
    setTimeout(dismiss, 3000);
  }, { once: true });
}

function showFakeMessage() {
  const banner = document.getElementById('mob-fake-msg');
  if (!banner) return;
  banner.setAttribute('aria-hidden', 'false');
  banner.classList.add('visible');

  function hideBanner() {
    banner.classList.remove('visible');
    banner.setAttribute('aria-hidden', 'true');
  }

  banner.addEventListener('click', () => {
    hideBanner();
    openMobileWindow('teams');
  }, { once: true });

  setTimeout(hideBanner, 6000);
}

// ─────────────────────────────────────────────────
// SEARCH OVERLAY
// ─────────────────────────────────────────────────
function initSearchOverlay() {
  const searchBtn     = document.getElementById('tb-search-btn');
  const overlay       = document.getElementById('search-overlay');
  const searchInput   = document.getElementById('search-input');
  const resultsBox    = document.getElementById('search-results');
  if (!searchBtn || !overlay || !searchInput || !resultsBox) return;

  let activeIdx = -1;

  function openSearch() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    searchInput.value = '';
    renderResults('');
    setTimeout(() => searchInput.focus(), 50);
    activeIdx = -1;
  }

  function closeSearch() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    searchInput.blur();
  }

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    const entries = Object.entries(WIN_CONFIGS).filter(([id]) => id !== 'placeholder');
    const filtered = q
      ? entries.filter(([, cfg]) => cfg.title.toLowerCase().includes(q))
      : entries;

    if (filtered.length === 0) {
      resultsBox.innerHTML = `<div class="search-no-results">Keine Ergebnisse für „${query}"</div>`;
      activeIdx = -1;
      return;
    }

    resultsBox.innerHTML = filtered.map(([id, cfg], i) => {
      const bg = COLOR_MAP[cfg.color] || 'linear-gradient(135deg,#52b788,#2d6a4f)';
      return `
        <div class="search-result-item" data-id="${id}" data-idx="${i}">
          <div class="search-result-icon" style="background:${bg}">
            <svg viewBox="0 0 28 28" fill="none">
              <path d="${cfg.svgPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div class="search-result-name">${cfg.title}</div>
          </div>
        </div>
      `;
    }).join('');

    resultsBox.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        closeSearch();
        openWindow(item.dataset.id);
      });
    });
    activeIdx = -1;
  }

  function getItems() {
    return Array.from(resultsBox.querySelectorAll('.search-result-item'));
  }

  function setActive(idx) {
    const items = getItems();
    items.forEach(el => el.classList.remove('active'));
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    activeIdx = idx;
  }

  searchBtn.addEventListener('click', e => { e.stopPropagation(); openSearch(); });

  searchInput.addEventListener('input', () => renderResults(searchInput.value));

  searchInput.addEventListener('keydown', e => {
    const items = getItems();
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0 && items[activeIdx]) {
        closeSearch();
        openWindow(items[activeIdx].dataset.id);
      } else if (items.length > 0) {
        closeSearch();
        openWindow(items[0].dataset.id);
      }
    }
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });
}

// ─────────────────────────────────────────────────
// CLOCK
// ─────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hh}:${mm}`;
  const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const dateFullStr = now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const tbTime = document.getElementById('tb-time');
  const tbDate = document.getElementById('tb-date');
  if (tbTime) tbTime.textContent = timeStr;
  if (tbDate) tbDate.textContent = dateStr;

  // Mobile: status bar time
  const mobSbTime = document.getElementById('mob-sb-time');
  if (mobSbTime) mobSbTime.textContent = timeStr;

  // Mobile: clock widget
  const mobClockTime = document.getElementById('mob-clock-time');
  const mobClockDate = document.getElementById('mob-clock-date');
  if (mobClockTime) mobClockTime.textContent = timeStr;
  if (mobClockDate) mobClockDate.textContent = dateFullStr;
}

// ─────────────────────────────────────────────────
// MOBILE
// ─────────────────────────────────────────────────

// Mobile label overrides (shorter/more fitting for homescreen)
const MOB_LABELS = {
  about:         'Brave',
  career:        'Karriere',
  terminal:      'Terminal',
  sysmon:        'System',
  bambu:         'Bambu App',
  homeassistant: 'Home Asst.',
  packages:      'Apps',
  changelog:     'Changelog',
  trash:         'Papierkorb',
  eigenedateien: 'Dateien',
  chatgpt:       'ChatGPT',
  claudeapp:     'Claude',
  outlook:       'Outlook',
  teams:         'Teams',
  jira:          'Jira',
  github:        'GitHub',
  rss:           'Feedly',
  filesapp:      'Dateien',
  snake:         'Snake',
  minesweeper:   'Minesweeper',
  photos:        'Fotos',
  games:         'Games',
  solitaire:     'Solitär',
  memory:        'Memory',
  tetris:        'Tetris',
  network:       'Netzwerk',
  blog:          'Blog',
  projects:      'Projekte',
  testimonials:  'Empfehlungen',
  placeholder:   'Mehr',
};

// Page 1 apps (main homescreen), Page 2: placeholder for future use
const MOB_PAGE1 = ['career', 'photos', 'claudeapp', 'teams', 'jira', 'github', 'games', 'filesapp', 'projects', 'testimonials'];
const MOB_PAGE2 = ['homeassistant', 'chatgpt', 'changelog', 'bambu'];
const MOB_DOCK  = ['about', 'outlook', 'blog'];

const COLOR_MAP = {
  blue: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
  amber: 'linear-gradient(135deg,#d97706,#b45309)',
  green: 'linear-gradient(135deg,#059669,#065f46)',
  purple: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
  teal: 'linear-gradient(135deg,#0d9488,#0f766e)',
  orange: 'linear-gradient(135deg,#ea580c,#c2410c)',
  indigo: 'linear-gradient(135deg,#4f46e5,#3730a3)',
  pink: 'linear-gradient(135deg,#db2777,#9d174d)',
  cyan: 'linear-gradient(135deg,#0891b2,#0e7490)',
  red:    'linear-gradient(135deg,#dc2626,#991b1b)',
  yellow: 'linear-gradient(135deg,#ca8a04,#a16207)',
};

function makeMobAppIcon(id, wrapClass, labelClass) {
  const cfg = WIN_CONFIGS[id];
  if (!cfg) return null;
  const label = MOB_LABELS[id] || cfg.title;
  const bg = COLOR_MAP[cfg.color] || 'linear-gradient(135deg,#52b788,#2d6a4f)';
  const div = document.createElement('div');
  div.className = wrapClass === 'mob-dock-wrap' ? 'mob-dock-icon' : 'mob-app-icon';
  div.setAttribute('role', 'listitem');
  div.setAttribute('aria-label', label);
  div.innerHTML = `
    <div class="${wrapClass}" style="background:${bg}">
      <svg viewBox="0 0 28 28" fill="none">
        <path d="${cfg.svgPath}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <span class="${labelClass}">${label}</span>
  `;
  div.addEventListener('click', () => {
    if (id === 'placeholder') return; // no-op for placeholder
    openMobileWindow(id);
  });
  return div;
}

function initMobile() {
  if (!document.getElementById('mob-app-grid-1')) return;

  // Build Page 1 app grid
  const grid1 = document.getElementById('mob-app-grid-1');
  MOB_PAGE1.forEach(id => {
    const el = makeMobAppIcon(id, 'mob-app-wrap', 'mob-app-label');
    if (el) grid1.appendChild(el);
  });

  // Build Page 2 app grid
  const grid2 = document.getElementById('mob-app-grid-2');
  MOB_PAGE2.forEach(id => {
    const el = makeMobAppIcon(id, 'mob-app-wrap', 'mob-app-label');
    if (el) grid2.appendChild(el);
  });

  // Build Dock
  const dock = document.getElementById('mob-dock');
  MOB_DOCK.forEach(id => {
    const el = makeMobAppIcon(id, 'mob-dock-wrap', 'mob-dock-label');
    if (el) dock.appendChild(el);
  });

  // Page swipe → dot indicator
  const pagesWrap = document.getElementById('mob-pages-wrap');
  const dots = document.querySelectorAll('.mob-dot');
  if (pagesWrap && dots.length) {
    pagesWrap.addEventListener('scroll', () => {
      const idx = Math.round(pagesWrap.scrollLeft / pagesWrap.clientWidth);
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
    }, { passive: true });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        pagesWrap.scrollTo({ left: i * pagesWrap.clientWidth, behavior: 'smooth' });
      });
    });
  }

  // Notification indicator tap → Notification Panel
  const notifBtn = document.getElementById('mob-notif-indicator');
  if (notifBtn) {
    notifBtn.addEventListener('click', e => {
      e.stopPropagation();
      toggleNotifPanel();
    });
  }

  // Status bar tap → Quick Settings (but not on notif button)
  const statusBar = document.getElementById('mob-status-bar');
  if (statusBar) {
    statusBar.addEventListener('click', e => {
      if (e.target.closest('#mob-notif-indicator')) return;
      toggleQuickSettings();
    });
  }

  // QS tiles: tap to show brief tooltip
  document.querySelectorAll('.mob-qs-tile').forEach(tile => {
    tile.addEventListener('click', e => {
      e.stopPropagation();
      tile.classList.toggle('active');
      const state = tile.querySelector('.mob-qs-state');
      const wasActive = tile.classList.contains('active');
      if (state) state.textContent = wasActive ? tile.dataset.qsOn || 'On' : tile.dataset.qsOff || 'Off';
    });
  });

  // Quick settings tile data
  const qsStates = {
    focus:      { on: 'On',      off: 'Off'      },
    automation: { on: 'Enabled', off: 'Disabled' },
    curiosity:  { on: 'Active',  off: 'Paused'   },
    pragmatism: { on: 'Stable',  off: 'Low'      },
    filter:     { on: 'Strict',  off: 'Off'      },
    debug:      { on: 'On',      off: 'Off'      },
  };
  document.querySelectorAll('.mob-qs-tile').forEach(tile => {
    const key = tile.dataset.qs;
    const s = qsStates[key];
    if (s) {
      tile.dataset.qsOn  = s.on;
      tile.dataset.qsOff = s.off;
    }
  });

  // Close QS and Notif Panel on tap outside
  document.getElementById('mob-pages-wrap')?.addEventListener('click', () => {
    document.getElementById('mob-quick-settings')?.classList.remove('open');
    document.getElementById('mob-quick-settings')?.setAttribute('aria-hidden', 'true');
    document.getElementById('mob-notif-panel')?.classList.remove('open');
    document.getElementById('mob-notif-panel')?.setAttribute('aria-hidden', 'true');
  });

  // Swipe-up to close notification panel
  const notifPanel = document.getElementById('mob-notif-panel');
  if (notifPanel) {
    let npStartY = 0;
    let npSwiping = false;
    notifPanel.addEventListener('touchstart', (e) => {
      npStartY = e.touches[0].clientY;
      npSwiping = true;
    }, { passive: true });
    notifPanel.addEventListener('touchmove', (e) => {
      if (!npSwiping) return;
      const dy = npStartY - e.touches[0].clientY;
      if (dy > 0) {
        notifPanel.style.transition = 'none';
        notifPanel.style.transform = `translateY(-${dy}px)`;
      }
    }, { passive: true });
    notifPanel.addEventListener('touchend', (e) => {
      if (!npSwiping) return;
      npSwiping = false;
      const dy = npStartY - e.changedTouches[0].clientY;
      if (dy > 60) {
        notifPanel.style.transition = 'transform 0.25s ease-out';
        notifPanel.style.transform = 'translateY(-110%)';
        setTimeout(() => {
          notifPanel.classList.remove('open');
          notifPanel.setAttribute('aria-hidden', 'true');
          notifPanel.style.transition = '';
          notifPanel.style.transform = '';
        }, 260);
      } else {
        notifPanel.style.transition = 'transform 0.2s ease-out';
        notifPanel.style.transform = 'translateY(0)';
        setTimeout(() => { notifPanel.style.transition = ''; }, 200);
      }
    });
  }

  // Swipe-up to close quick settings panel
  const qsPanel = document.getElementById('mob-quick-settings');
  if (qsPanel) {
    let qsStartY = 0;
    let qsSwiping = false;
    qsPanel.addEventListener('touchstart', (e) => {
      qsStartY = e.touches[0].clientY;
      qsSwiping = true;
    }, { passive: true });
    qsPanel.addEventListener('touchmove', (e) => {
      if (!qsSwiping) return;
      const dy = qsStartY - e.touches[0].clientY;
      if (dy > 0) {
        qsPanel.style.transition = 'none';
        qsPanel.style.transform = `translateY(-${dy}px)`;
      }
    }, { passive: true });
    qsPanel.addEventListener('touchend', (e) => {
      if (!qsSwiping) return;
      qsSwiping = false;
      const dy = qsStartY - e.changedTouches[0].clientY;
      if (dy > 60) {
        qsPanel.style.transition = 'transform 0.25s ease-out';
        qsPanel.style.transform = 'translateY(-110%)';
        setTimeout(() => {
          qsPanel.classList.remove('open');
          qsPanel.setAttribute('aria-hidden', 'true');
          qsPanel.style.transition = '';
          qsPanel.style.transform = '';
        }, 260);
      } else {
        qsPanel.style.transition = 'transform 0.2s ease-out';
        qsPanel.style.transform = 'translateY(0)';
        setTimeout(() => { qsPanel.style.transition = ''; }, 200);
      }
    });
  }

  // Swipe-up on nav pill to close app (Android-style gesture)
  const navBar = document.querySelector('#mobile-window .mob-nav-bar');
  if (navBar) {
    let startY = 0;
    let swiping = false;
    const mw = document.getElementById('mobile-window');

    navBar.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      swiping = true;
      mw.classList.add('swiping');
      navBar.classList.add('dragging');
    }, { passive: true });

    navBar.addEventListener('touchmove', (e) => {
      if (!swiping) return;
      const dy = startY - e.touches[0].clientY;
      if (dy > 0) {
        mw.style.transform = `translateY(-${dy * 0.6}px)`;
        mw.style.opacity = Math.max(0.3, 1 - dy / 400);
      }
    }, { passive: true });

    navBar.addEventListener('touchend', (e) => {
      if (!swiping) return;
      swiping = false;
      mw.classList.remove('swiping');
      navBar.classList.remove('dragging');
      const endY = e.changedTouches[0].clientY;
      const dy = startY - endY;

      if (dy > 80) {
        // Swipe was far enough → animate out then close
        mw.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out';
        mw.style.transform = 'translateY(-100%)';
        mw.style.opacity = '0';
        setTimeout(() => {
          // Reset inline styles, remove show so CSS puts it at translateY(100%)
          mw.style.transition = '';
          mw.style.transform = '';
          mw.style.opacity = '';
          mw.classList.remove('show');
          mw.setAttribute('aria-hidden', 'true');
          document.getElementById('mobile-home').setAttribute('aria-hidden', 'false');
          document.getElementById('mob-win-body').innerHTML = '';
        }, 260);
      } else {
        // Snap back
        mw.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
        mw.style.transform = '';
        mw.style.opacity = '';
        setTimeout(() => { mw.style.transition = ''; }, 200);
      }
    });

    // Tap on pill as fallback
    navBar.addEventListener('click', closeMobileWindow);
  }
}

function toggleNotifPanel() {
  const np = document.getElementById('mob-notif-panel');
  if (!np) return;
  // Close quick settings if open
  const qs = document.getElementById('mob-quick-settings');
  if (qs) { qs.classList.remove('open'); qs.setAttribute('aria-hidden', 'true'); }
  const isOpen = np.classList.toggle('open');
  np.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

function toggleQuickSettings() {
  const qs = document.getElementById('mob-quick-settings');
  if (!qs) return;
  // Close notification panel if open
  const np = document.getElementById('mob-notif-panel');
  if (np) { np.classList.remove('open'); np.setAttribute('aria-hidden', 'true'); }
  const isOpen = qs.classList.toggle('open');
  qs.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

function openMobileWindow(id) {
  const cfg = WIN_CONFIGS[id];
  if (!cfg) return;

  const mw    = document.getElementById('mobile-window');
  const body  = document.getElementById('mob-win-body');

  // Close quick settings and notification panel if open
  const qs = document.getElementById('mob-quick-settings');
  if (qs) { qs.classList.remove('open'); qs.setAttribute('aria-hidden', 'true'); }
  const np = document.getElementById('mob-notif-panel');
  if (np) { np.classList.remove('open'); np.setAttribute('aria-hidden', 'true'); }

  body.innerHTML = '';
  mw.setAttribute('aria-hidden', 'false');
  mw.classList.add('show');
  document.getElementById('mobile-home').setAttribute('aria-hidden', 'true');

  const contentFns = {
    about:          buildAbout,
    career:         buildCareer,
    terminal:       buildTerminal,
    sysmon:         buildSysmon,
    bambu:          buildBambu,
    homeassistant:  buildHA,
    packages:       buildPackages,
    changelog:      buildChangelog,
    trash:          buildTrash,
    eigenedateien:  buildEigeneDateien,
    chatgpt:        buildChatGPT,
    claudeapp:      buildClaudeApp,
    outlook:        buildOutlook,
    teams:          buildTeams,
    jira:           buildJira,
    github:         buildGitHub,
    rss:            buildRSS,
    filesapp:       buildFilesApp,
    snake:          buildSnake,
    minesweeper:    buildMinesweeper,
    photos:         buildPhotos,
    games:          buildGames,
    solitaire:      buildSolitaire,
    memory:         buildMemory,
    tetris:         buildTetris,
    network:        buildNetwork,
    blog:           buildBlog,
    projects:       buildProjects,
    testimonials:   buildTestimonials,
  };
  if (contentFns[id]) contentFns[id](body, id);
}

function closeMobileWindow() {
  const mw = document.getElementById('mobile-window');
  mw.classList.remove('show');
  mw.setAttribute('aria-hidden', 'true');
  document.getElementById('mobile-home').setAttribute('aria-hidden', 'false');
  // Clear body after slide-out animation completes
  setTimeout(() => {
    document.getElementById('mob-win-body').innerHTML = '';
  }, 340);
}

// ─────────────────────────────────────────────────
// BLOG (Texteditor-Fenster)
// ─────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 'gofundme',
    title: 'GoFundMe: Barrierefreier Umbau für unsere Familie',
    date: '2025-10-01',
    tags: ['Persönlich', 'Familie', 'GoFundMe'],
    content: `Manchmal verändert ein einziger Tag das ganze Leben. Im November 2022 erlitt meine Frau Aylin nach einer Tumor-OP eine Teilquerschnittslähmung. Unser Sohn war damals gerade ein Jahr alt. Seitdem kämpfen wir uns Schritt für Schritt durch einen neuen Alltag \u2013 voller zusätzlicher Herausforderungen und Kosten, die weit über das hinausgehen, was ein Pflegegrad abdeckt.

Umbauten am Haus, ein größeres Auto, Therapien und Hilfsmittel \u2013 vieles mussten wir bereits stemmen. Doch eine zentrale Maßnahme steht noch bevor:

→ Wir möchten unseren Anbau im Garten barrierefrei zum Wohnraum umbauen, damit Aylin alles Notwendige im Erdgeschoss hat.

Dafür starten wir eine GoFundMe-Kampagne. Jeder Beitrag hilft uns, unserem Ziel näher zu kommen \u2013 sei es durch eine Spende oder das Teilen des Links in eurem Netzwerk.

→ Hier geht\u2019s zur Kampagne: https://lnkd.in/eX8HATQ9

Vielen Dank für jede Form der Unterstützung!`,
  },
  {
    id: 'depression',
    title: 'Depression',
    date: '2024-10-10',
    tags: ['Persönlich', 'Mental Health'],
    content: `→ Triggerwarnung: Dieser Text handelt von Depression und Panikattacken.

Ich bin in eine Depression gerutscht.

Ich habe lange überlegt, ob ich das schreiben soll. Zum einen bin ich sowieso nicht mehr wahnsinnig in Social Media aktiv. Zum anderen fühlt es sich bei aller eigenen Akzeptanz, dass ich diese Krankheit habe und es eine ist, an, als würde ich eine Schwäche preisgeben. Was natürlich Blödsinn ist. Denn eine Depression sucht sich niemand aus. Und ich bin in guten Momenten stolz auf mich, das schon erkannt zu haben und aktiv dagegen anzugehen. Und vielleicht hilft es jemandem, der noch nicht weiß, warum er sich mies fühlt.

1. Der Hintergrund

Vor zwei Jahren ist unser Leben als Familie ziemlich durchgeschüttelt worden. In Folge einer Tumorbehandlung am Rücken war meine Frau und Mutter unseres damals gerade einjährigen Sohnes teilquerschnittsgelähmt und musste sich zurück ins Leben kämpfen. Während ich vier Monate lang alleinsorgend war.

Seitdem ist viel passiert. Das akute Gefühl direkt nach dem Schicksalsschlag, dass alles immer kurz davor ist, gegen die Wand zu fahren, und ich mehr Verantwortung für uns alle trage, um durch die weitere Zeit zu kommen, konnte ich bei allen Fortschritten meiner Frau offenbar nie ganz ablegen. Vermutlich fing da schon die Depression an, an meinen Kräften zu nagen.

2. Die Energiebilanz bei Null

Denn egal was wir gemeinsam Schönes unternahmen \u2013 es war immer eine riesige Anstrengung für mich. Die Energiebilanz aus Einsatz und Ertrag war für mich meist bei maximal 0. Ich hatte durchgehend eine Grundanspannung in mir, die mir teilweise bis zur Gurgel hochging, auch wenn ich einfach nur nach der Arbeit auf dem Spieleteppich mit meinem Sohn und seinen Autos spielte.

Ich dachte, naja, okay, so ist das halt mit Kind mit der durchgehenden Anspannung, stell dich nicht an, bist du halt schwach, dass das so anstrengend ist, aber das ist für alle so. Musst du eben aushalten, andere schaffen das ja auch.

→ Ich weiß mittlerweile, dass das Quatsch ist.

3. Der Abstieg

Ich habe Ende August an einem Mittwochmorgen gemerkt, das ich so antriebslos und unkonzentriert bin, dass ich nicht arbeiten kann \u2013 und bin zum Hausarzt gegangen. Ach, reicht, wenn sie mich erstmal diese Woche krank schreiben. Nächste Woche geht es sicher wieder. Ging\u2019s nicht. Und es wurde schlechter.

Ich verstehe, wieso man davon spricht, dass man in eine Depression "rutscht". Obwohl ich durch zwei Jahre Gesprächstherapie wusste, dass es gerade in die falsche Richtung läuft \u2013 einmal losgeruscht, war es schwer sie aufzuhalten.

Ich bekam täglich Panikattacken. Ich konnte keine strukturierten, lösungsorientierten Gedanken mehr fassen. In meinem Kopf waren nur Probleme, es war laut, unorganisiert und schnell. Wie ein Feuerwerk, bei dem jeder grell leuchtende Funke ein Gedanke ist. Kurz da, peng, weg. Tausende gleichzeitig. Und dann direkt die nächste Rakete.

Ich war bei der kleinsten Anforderung an mich komplett überfordert. "Kannst du gleich noch die Spülmaschine ausräumen?" \u2013 zack, gelähmt. Ich konnte nicht. Als hätte ich eine Bleiweste an, die mich daran hindert aufzustehen.

Ich konnte abends nicht vor 2 Uhr einschlafen, war früh wach, war wahnsinnig platt und erschöpft, aber der Kopf war so laut und ich so unter Spannung, dass ein Mittagsschlaf nahezu ein Ding der Unmöglichkeit war. Ich kam nicht zur Ruhe. Und wenn ich doch kurz eingenickt war, war ich danach niedergeschlagener als vorher. Diese körperliche Anspannung sorgte zudem für ein andauerndes Körpergefühl wie bei einem heftigen Kater nach durchzechter Nacht.

4. Dagegen ankämpfen

Ich konnte nicht mehr aufs Smartphone schauen, alles überforderte mich. Ich fing an mit Yoga, spazierte stundenlang durch die Felder, versuchte es mit Meditation, Achtsamkeitsübungen, progressiver Muskelentspannung. Ich fuhr Rad. Das powert aus, dachte ich mir, da bist du danach so richtig positiv platt. Denkste. Zehn Minuten nach der Radtour ging\u2019s mit gleichlautem Alarm im Oberstübchen wieder weiter. Trotzdem: Beschäftigt bleiben, damit ich kurz die Gedanken zur Ruhe bringen kann \u2013 wie fürchterlich anstrengend.

Ich konnte in den depressivsten Wochen auch nicht mehr meine Lieblingsmusik hören. Punk und Ska haben mich überreizt. Ich fing dann wieder langsam an, bewusst Low Fi oder Klassik zu hören.

5. Medikamente und Schuldgefühl

Mir war klar: Ich brauche auch medikamentöse Unterstützung, um da rauszukommen, weil die vielen Werkzeuge, die ich kannte, um meine Tage trotzdem aktiv zu gestalten, nicht ausreichten. Und dann machte mir aber die Unbekannte "Antidepressivum" Tage vor der ersten Einnahme noch zusätzlich Bauchschmerzen. Unnötig, weiß ich jetzt.

Ich konnte den meisten Aufgaben im Haushalt und mit Kind nicht mehr nachkommen und meine Frau musste mich hier extrem entlasten. Und dann sagt dir die Depression: Fühl dich doch jetzt mal schuldig dafür, dass du deine Familie gerade im Stich lässt! Was ein Kokolores, weiß ich selbst. Wusste ich im Zweifel auch zwei Stunden vorher und am nächsten Morgen, aber dann sitzt man da abends heulend auf der Couch.

6. Unterstützung

Ich bin so dankbar für mein privates Umfeld, in dem ich immer offen über meine Gefühle sprechen kann. Ich habe einen empathischen Hausarzt, eine kompetente Psychiaterin und eine Psychotherapeutin, die seit zwei Jahren meine Umstände und die Themen kennt. Ich fühle mich gut unterstützt.

7. Es wird besser

Das Antidepressivum beginnt zu wirken. Es ist eben keine Schmerztablette, sondern dauert ein paar Wochen. Faszinierend, dass ich schon innere Ruhe, die ich wirklich gar nicht mehr kannte, in einzelnen Momenten spüre \u2013 auch wenn mein Sohn mal zetert, dann bin ich vielleicht genervt, aber mir hängt die Spannung nicht mehr bis zum Hals. Ein krasses Gefühl.

Wenn meine Frau eine Idee für einen Ausflug hat, ist in guten Momenten nicht mehr spontan der verkrampfte Gedanke an die damit verbundene Anstrengung da, sondern: Ja, können wir machen. Plötzlich ist vorstellbar, dass einem schöne Erlebnisse mehr Energie geben als sie kosten, geil. Dafür lohnt es sich doch, sich da weiter rauszuwühlen.

Aus drei Tage mal krank geschrieben sind mittlerweile sieben Wochen geworden. Und ein paar kommen sicher noch dazu, bis auch wieder an Arbeit zu denken ist. Bis dahin hole ich mir zuhause Stück für Stück meinen Alltag zurück. Zeit, in der ich mich und diese Krankheit besser kennenlerne.

8. Neu lernen, achtsam zu sein

Ich muss neu lernen, achtsam zu mir selbst zu sein und nicht nur zweckmäßig Aufgaben zu erfüllen. Das habe ich in den letzten Jahren verlernt. Ich war die Tage morgens in einem Cafe frühstücken. Alleine irgendwo sitzen und essen, hätte ich früher nie gemacht, wie cringe. Ist es aber gar nicht, verrückt. Tut sogar mal ganz gut. Sich eine Badewanne einlassen und dabei Kerzen und Musik anmachen. Den Kaffee nicht to go trinken, sondern bewusst am Morgen in den Garten setzen und Eichhörnchen beobachten. Mit dem Kleinen in Ruhe Duplo bauen.

→ Alles wird wieder ok.`,
  },
  {
    id: 'neue-position',
    title: 'Neue Position',
    date: '2023-08-01',
    tags: ['Karriere', 'RTL', 'Persönlich'],
    content: `Dieses Jahr ist für mich privat herausfordernd, meine Frau ist nach einer Tumorbehandlung im November letzten Jahres ab der Halswirbelsäule teilquerschnittsgelähmt und kämpft sich zurück ins Leben. Ich war vier Monate lang alleinsorgend mit unserem Sohn zuhause, der zu dem Zeitpunkt gerade 1 Jahr alt geworden war.

Da gehen einem tausend Fragen durch den Kopf, selten hatten wir Antworten.

→ Danke an RTL Deutschland, dass ich mir zumindest zu meinem Job keine Fragen stellen musste und ich nach den ersten Monaten in Teilzeit zurückkommen konnte.

Jetzt freue ich mich auf die Aufgaben in meiner neuen Position als Head of Digital Transformation in der Kommunikation, um mit den Teams noch mehr aus unseren Workflows und Tools herauszuholen und die technischen Produkte in der PR auszubauen.

Danke an Eva Messerschmidt für das Vertrauen und vielen Dank an meine bisherige Teamleiterin Julia Kikillis für die Möglichkeiten, mich in den letzten Jahren immer weiterentwickeln zu können.

→ Der größte Dank gilt aber meiner Frau, die immer weitermacht, egal wie schwer es ist.`,
  },
  {
    id: 'abschied-science-slam',
    title: 'Abschied vom Science Slam',
    date: '2022-03-06',
    tags: ['Science Slam', 'Moderation', 'Abschied'],
    content: `→ 9 Jahre, 38 Events, über 200 Vorträge \u2013 und phantastische Menschen kennengelernt. Danke!

Der Bonner Science Slam im Januar 2020 wird voraussichtlich der letzte gewesen sein, den ich moderiert habe. Anfang Mai würde zwar der nächste stattfinden, bei dem ich auf der Bühne stehen könnte, aber ich mache die Lena. Bei weiter hohen Infektionszahlen und immer weniger Corona-Maßnahmen ist mein Gefühl: Die Zeit ist noch nicht reif.

Seit Juli 2013 habe ich insgesamt 38 Science Slams moderiert, 200 Mal Slammer:innen auf die Bühne geholt, die in nur zehn Minuten ihr Forschungsthema möglichst leicht verständlich und unterhaltsam präsentieren mussten. Und der Applaus des Publikums entschied am Ende des Abends, wer die \u201EGoldenen Boxhandschuhe der Wissenschaft\u201C gewann, wem Ruhm und Ehre zuteilwurde.

1. Wertvolle Erfahrung, schöne Erinnerungen

Wenn mir der Veranstalter LUUPS die nächsten Termine zugerufen hat, war ich am Start. Na klaro. Aber jetzt kommt es wiederholt vor, dass ich doch ein paar Wochen vorher abgesagt habe, weil mich mein persönliches Empfinden, ob so viel Publikum und die aktuelle Corona-Lage zusammenpassen, zweifeln ließ. Doch ich will nicht unzuverlässig erscheinen. Daher wird sich ein:e andere:r freuen, die Termine zu blocken und der Wissenschaft eine Bühne zu geben.

Ich habe das Moderieren immer nur zum Spaß gemacht. Das kann nicht jede:r in der Kulturbranche sagen, daher habe ich volles Verständnis, dass Künstler:innen & Co. versuchen, Veranstaltungen auch unter diesen Bedingungen sicher zu planen und durchzuführen.

Für mich war es eine unglaublich wertvolle Erfahrung, die einen vernünftigen Abschluss verdient hätte. Doch auf Standby zu sein, um doch irgendwann zumindest ein letztes Mal einen Slam zu moderieren \u2013 das erscheint mir nach so langer Pause nicht richtig zu sein. In über zwei Jahren Corona hat sich bei mir so viel verändert, dass ich froh bin über diese schönen Erinnerungen, anstatt Gefahr zu laufen, eingerostet einen für mein Gefühl miesen letzten Slam hinzulegen.

2. Phantastische Menschen auf und hinter der Bühne

Ich habe unglaublich interessante, schlaue, sympathische Menschen kennengelernt: Juli Tkotz, Rufina Fingerhut, Mai Thi Nguyen-Kim, Franca Parianen, Jutta Teuwsen, Elisabeth Mettke, Janina Otto, Carrie Ankerstein, Constantin Wurthmann, Johannes von Borstel, Sebastian Lotzkat, Dong-Seon Chang, Darius Rupalla, Johannes Schildgen, Peter Westerhoff, Reinhard Remfort, Kai Jäger, Johannes Kretzschmar, Aniruddha Dutta und viele viele mehr.

Alles renommierte Wissenschaftler:innen, erfolgreiche Podcaster:innen, Deutsche Science-Slam-Meister:innen, die Bücher geschrieben haben, TV-Sendungen moderieren, zu denen es Wikipedia-Einträge gibt. Und ich Dödel dazwischen. Es war mir eine Ehre, mit ihnen die Bühne geteilt zu haben.

→ Danke auch an das LUUPS-Team hinter der Bühne: Sveda, Julia, Karsten, Sebastian, Nils, Leo, Ronja, Rebecca und alle anderen. Das war locker eine 12 von 10 auf der Applaus-Skala.

3. Die Locations

Hätte ich vorher auch nicht gedacht, dass ich beispielsweise mal auf der Kleinkunstbühne des Bonner Pantheon stehen werde \u2013 und die Location mit insgesamt 18 Abenden sowas wie mein Science-Slam-Wohnzimmer wurde.

Geslamt wurde auch in coolen Läden wie dem Club Bahnhof Ehrenfeld in Köln oder dem Franz in Aachen, in Hörsälen in Bonn und Bochum, es gab Auftritte beim \u201EBochum Total\u201C-Festival, in Museen wie der DASA in Dortmund oder der Bonner Bundeskunsthalle, bei der ExtraSchicht in der Jahrhunderthalle Bochum oder vor fünf Leuten im KulturCafe des AStA Bochum.

4. Highlight: TV-Aufzeichnung für VOX

Eine besondere Erinnerung wird eine Pilotaufzeichnung für VOX bleiben, die ich 2015 moderieren durfte. Eine Mischung aus \u201ELet\u2019s Dance\u201C und Science Slam, mit Jury und prominenten Slammer:innen. Eine Idee, die entstand, als ich im Volontariat Station in der VOX-Redaktion gemacht habe und die Kolleg:innen dort Feuer und Flamme für den Science Slam waren.

Lampenfieber war bei jedem Slam dabei, aber besonders ging mir die Pumpe als sich der damalige VOX-Chefredakteur zum nächsten Slam als Gast ankündigte. Und vor Kameras mit Regie im Ohr war\u2019s dann auch noch mal etwas anderes als bloß vor Publikum im Saal. Aus der Showidee wurde zwar nichts, es lag aber angeblich nicht an mir. Ich will das mal glauben, zumindest ließ VOX mich danach sogar durch Pressekonferenzen moderieren.

5. Der Anfang von allem

Alles nur, weil ich 2013 meine Bachelor-Arbeit zum Thema geschrieben habe: "Technikkommunikation in populärkulturellen Referaten. Eine Untersuchung zum Unterhaltungswert und zur wissenschaftlichen Informationsvermittlung in Science Slam Kurzvorträgen". Sperriger Titel mit einem Kolloquium im Science-Slam-Style.

→ Mach\u2019s gut, Science Slam! Bis bald \u2013 dann als Gast vor der Bühne.`,
  },
  {
    id: 'jahresrueckblick-2021',
    title: 'Jahresrückblick 2021',
    date: '2022-01-01',
    tags: ['Jahresrückblick', 'Persönlich'],
    content: `Zum Start ins neue Jahr ist noch kurz Zeit für einen Rückblick auf 2021. Obwohl die meiste Zeit zuhause hockend ist ganz schön viel passiert.

1. Vater geworden

Ich bin Vater geworden. Das ist vor allem eine Leistung meiner Frau, wow. Nicht in Worte zu fassen. Mit einer nicht einfachen Schwangerschaft und turbulenten ersten Wochen nach der Geburt, bei denen ich hoffentlich so gut es geht unterstützt habe.

Danach kommt erst Mal lange nichts. Noch nie so viel Glück und Verantwortung gespürt wie jetzt. Und so viele Windeln gewechselt. Aber freue mich auf jede weitere. Und alles was kommt. Riesig.

2. Pandemie \u2013 Jahr zwei

Pandemie Schmandemie. Scheiße wie für alle. Kaum physische Kontakte, um schwangere Frau und Kind zu schützen. Noch vorsichtiger als sowieso schon. Setzt ganz schön zu.

→ Aber hey: Geboostert. Lasst euch impfen. Wir schaffen das!

3. Freunde & Familie

Ohne wäre das Jahr ganz schön trist geworden. Egal ob nahezu tägliche Sprachnotizen, feste Sim-Racing-Termine jede Woche, gemeinsame Podcasts, regelmäßige Kaffee-Calls in Teams, schreiben dass man aneinander denkt, auch wenn man sich nicht sieht. Mentale und ganz konkrete Unterstützung im Wochenbett.

→ Unschätzbarer Wert. Dankbar.

4. Sommer

Der war sogar richtig gut. Und trägt einen mit Hoffnung auf einen vergleichbar tollen im eigenen Garten in 2022 durch Herbst und Winter.

5. Newsdesk bei RTL

Zusammen ein geiles Newsdesk-Team in der RTL Kommunikation geformt. Bin als Leiter stolz, was wir 2021 geschafft haben. Und froh, so viel Unterstützung und Rückhalt nicht nur von meinen Vorgesetzten zu spüren, sondern auch aus dem Team.

→ Gutes Gefühl: Die Herausforderungen 2022 werden wir gemeinsam wuppen.

6. Bierbrauen

Ziemlich trivial, aber: Ich habe mein erstes eigenes Bier gebraut. Und mein zweites mit besserem Brau-Equipment. Well, das eskalierte schnell. Und hat am Ende sogar geschmeckt. Fast so gut wie die vielen Craftbiere, die ich so bei untappd einscanne.

7. Lego

Alte Klemmbausteine vom Speicher meiner Eltern gerettet. Ab in die Waschmaschine und versucht, sie wieder in den originalen Sets zu sortieren. Dann kam die Schwangerschaft dazwischen. Aber Plan steht, dass der Kleine dann irgendwann Papas alte Ritterburg aufbauen kann.

Man kann sagen: Das war ein gutes Jahr. Ich lass\u2019 mir das von "Big C" nicht kaputtdeuten. Aber ohne wäre schon schöner gewesen.

→ Jetzt aber auf in ein Jahr 2022, das uns am Ende hoffentlich alle irgendwie positiv überrascht und in dem wir unseren persönlichen Zielen alle näherkommen. Haut rein!`,
  },
];

function buildBlog(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.background = '#ffffff';

  const postListHtml = BLOG_POSTS.map((p, i) => `
    <div class="blog-list-item${i === 0 ? ' active' : ''}" data-post="${p.id}">
      <div class="blog-list-title">${escapeHtml(p.title)}</div>
      <div class="blog-list-meta">${p.date} · ${p.tags.join(', ')}</div>
    </div>
  `).join('');

  const mobileNavHtml = BLOG_POSTS.map((p, i) => `
    <button class="blog-mob-nav-btn${i === 0 ? ' active' : ''}" data-post="${p.id}">
      ${escapeHtml(p.title)}
    </button>
  `).join('');

  function renderPost(post) {
    const lines = post.content.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '<div class="blog-line blog-line-empty">&nbsp;</div>';
      if (/^\d+\./.test(trimmed)) return `<div class="blog-line blog-line-heading">${linkifyText(escapeHtml(trimmed))}</div>`;
      if (trimmed.startsWith('→')) return `<div class="blog-line blog-line-accent">${linkifyText(escapeHtml(trimmed))}</div>`;
      if (trimmed.startsWith('•')) return `<div class="blog-line blog-line-list">${linkifyText(escapeHtml(trimmed))}</div>`;
      return `<div class="blog-line">${linkifyText(escapeHtml(trimmed))}</div>`;
    }).join('');
  }

  body.innerHTML = `
    <div class="blog-wrap">
      <div class="blog-mob-nav">${mobileNavHtml}</div>
      <div class="blog-sidebar">
        <div class="blog-sidebar-header">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M2 2h12v12H2z" stroke="currentColor" stroke-width="1.3"/><path d="M5 5h6M5 8h4M5 11h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          Artikel
        </div>
        <div class="blog-list">${postListHtml}</div>
      </div>
      <div class="blog-main">
        <div class="blog-editor-tabs">
          <span class="blog-tab active" data-post="${BLOG_POSTS[0].id}">${escapeHtml(BLOG_POSTS[0].title.substring(0, 30))}…</span>
        </div>
        <div class="blog-editor-bar">
          <span class="blog-file-path">~/blog/${BLOG_POSTS[0].id}.md</span>
          <span class="blog-file-lang">Markdown</span>
        </div>
        <div class="blog-content" id="blog-content">
          <div class="blog-line-numbers" id="blog-line-nums"></div>
          <div class="blog-text" id="blog-text">${renderPost(BLOG_POSTS[0])}</div>
        </div>
      </div>
    </div>
  `;

  // Line numbers
  function updateLineNums() {
    const textEl = body.querySelector('#blog-text');
    const numsEl = body.querySelector('#blog-line-nums');
    const lineCount = textEl.querySelectorAll('.blog-line').length;
    numsEl.innerHTML = Array.from({length: lineCount}, (_, i) => `<span>${i + 1}</span>`).join('');
  }
  updateLineNums();

  // Sidebar clicks
  body.querySelectorAll('.blog-list-item').forEach(item => {
    item.addEventListener('click', () => {
      body.querySelectorAll('.blog-list-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      body.querySelectorAll('.blog-mob-nav-btn').forEach(b => b.classList.remove('active'));
      const mobBtn = body.querySelector(`.blog-mob-nav-btn[data-post="${item.dataset.post}"]`);
      if (mobBtn) mobBtn.classList.add('active');
      const post = BLOG_POSTS.find(p => p.id === item.dataset.post);
      if (!post) return;
      body.querySelector('#blog-text').innerHTML = renderPost(post);
      body.querySelector('.blog-file-path').textContent = `~/blog/${post.id}.md`;
      body.querySelector('.blog-tab').textContent = post.title.substring(0, 30) + '…';
      body.querySelector('.blog-tab').dataset.post = post.id;
      updateLineNums();
    });
  });

  // Mobile nav clicks
  body.querySelectorAll('.blog-mob-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      body.querySelectorAll('.blog-mob-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      body.querySelectorAll('.blog-list-item').forEach(i => i.classList.remove('active'));
      const sidebarItem = body.querySelector(`.blog-list-item[data-post="${btn.dataset.post}"]`);
      if (sidebarItem) sidebarItem.classList.add('active');
      const post = BLOG_POSTS.find(p => p.id === btn.dataset.post);
      if (!post) return;
      body.querySelector('#blog-text').innerHTML = renderPost(post);
      body.querySelector('.blog-file-path').textContent = `~/blog/${post.id}.md`;
      body.querySelector('.blog-tab').textContent = post.title.substring(0, 30) + '…';
      body.querySelector('.blog-tab').dataset.post = post.id;
      updateLineNums();
    });
  });
}

// ─────────────────────────────────────────────────
// PROJECTS (Case Studies)
// ─────────────────────────────────────────────────
const PROJECTS_DATA = [
  {
    name: 'Media Hub',
    period: '2020 – heute',
    role: 'Product Owner & Projektleitung',
    desc: 'Zentrale digitale Plattform für Presse- und Unternehmenskommunikation bei RTL Deutschland. Aufgebaut als Single Point of Truth für 1.700+ Journalist:innen.',
    tech: ['Confluence', 'Jira', 'Custom CMS', 'Analytics'],
    impact: 'Nutzung durch 1.700+ Journalist:innen · Messbare Effizienzsteigerung in der Kommunikation',
  },
  {
    name: 'KI-Workflow-Integration',
    period: '2024 – heute',
    role: 'Strategische Leitung & Umsetzung',
    desc: 'Systematische Integration von KI-Tools in redaktionelle und kommunikative Workflows. Fokus auf echte Prozessverbesserung statt Tool-Showcase.',
    tech: ['Claude', 'ChatGPT', 'n8n', 'Make.com', 'Custom APIs'],
    impact: 'Automatisierte Content-Prozesse · Reduzierung manueller Routineaufgaben um ca. 40%',
  },
  {
    name: 'Prozessautomation Kommunikation',
    period: '2023 – heute',
    role: 'Konzeption & Implementierung',
    desc: 'Aufbau automatisierter Workflows für wiederkehrende Kommunikationsprozesse — von Monitoring über Distribution bis Reporting.',
    tech: ['n8n', 'Power BI', 'GitHub Actions', 'Docker'],
    impact: 'Durchgängig automatisierte Pipelines · Echtzeit-Dashboards für Entscheidungsträger',
  },
  {
    name: 'Tool-Adoption & Change Management',
    period: '2020 – heute',
    role: 'Strategische Steuerung',
    desc: 'Planung und Durchführung von Tool-Einführungen mit Fokus auf nachhaltige Nutzerakzeptanz. Vom Onboarding über Schulung bis zur iterativen Weiterentwicklung.',
    tech: ['Confluence', 'Notion', 'Miro', 'Custom Trainings'],
    impact: 'Hohe Adoptionsraten bei allen Tool-Rollouts · Nachhaltige Nutzung statt Shelf-Ware',
  },
];

function buildProjects(body) {
  body.style.padding = '0';
  body.style.overflow = 'auto';
  body.style.background = '#f7f8f6';

  const cardsHtml = PROJECTS_DATA.map(p => `
    <div class="proj-card">
      <div class="proj-card-header">
        <div class="proj-card-name">${escapeHtml(p.name)}</div>
        <div class="proj-card-period">${escapeHtml(p.period)}</div>
      </div>
      <div class="proj-card-role">${escapeHtml(p.role)}</div>
      <div class="proj-card-desc">${escapeHtml(p.desc)}</div>
      <div class="proj-card-tech">${p.tech.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="proj-card-impact">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><polyline points="2,12 6,6 10,9 14,3" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${escapeHtml(p.impact)}
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="proj-wrap">
      <div class="proj-toolbar">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M2 5h5l1.5 2H14v8H2V5z" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>
        <span>/Niklas/Projekte</span>
      </div>
      <div class="proj-grid">${cardsHtml}</div>
    </div>
  `;
}

// ─────────────────────────────────────────────────
// TESTIMONIALS / SOCIAL PROOF
// ─────────────────────────────────────────────────
const TESTIMONIALS_DATA = [
  {
    quote: 'Niklas hat die seltene Fähigkeit, technische Komplexität in verständliche Lösungen zu übersetzen, die von Teams tatsächlich angenommen werden.',
    name: 'Empfehlung via LinkedIn',
    role: 'Kolleg:in bei RTL Deutschland',
  },
  {
    quote: 'Pragmatisch, lösungsorientiert und immer mit dem Blick auf den echten Nutzen für die Anwender. Genau so sollte digitale Transformation funktionieren.',
    name: 'Empfehlung via LinkedIn',
    role: 'Stakeholder Digital Projects',
  },
  {
    quote: 'Was Niklas von anderen unterscheidet: Er implementiert nicht nur Tools, er sorgt dafür, dass Menschen sie auch wirklich nutzen.',
    name: 'Empfehlung via LinkedIn',
    role: 'Zusammenarbeit im Bereich Change Management',
  },
];

const ACHIEVEMENTS_DATA = [
  { icon: '📊', label: 'Media Hub', value: '1.700+ Nutzer:innen' },
  { icon: '🤖', label: 'KI-Workflows', value: '~40% weniger Routineaufgaben' },
  { icon: '⚡', label: 'Automatisierung', value: 'Durchgängig automatisierte Pipelines' },
  { icon: '🎯', label: 'Tool-Adoption', value: 'Hohe Akzeptanz bei allen Rollouts' },
];

function buildTestimonials(body) {
  body.style.padding = '0';
  body.style.overflow = 'auto';
  body.style.background = '#f7f8f6';

  const quotesHtml = TESTIMONIALS_DATA.map(t => `
    <div class="testi-card">
      <div class="testi-quote">"${escapeHtml(t.quote)}"</div>
      <div class="testi-author">
        <div class="testi-name">${escapeHtml(t.name)}</div>
        <div class="testi-role">${escapeHtml(t.role)}</div>
      </div>
    </div>
  `).join('');

  const achievementsHtml = ACHIEVEMENTS_DATA.map(a => `
    <div class="testi-achievement">
      <div class="testi-ach-icon">${a.icon}</div>
      <div class="testi-ach-info">
        <div class="testi-ach-label">${escapeHtml(a.label)}</div>
        <div class="testi-ach-value">${escapeHtml(a.value)}</div>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="testi-wrap">
      <div class="testi-section-title">Empfehlungen</div>
      <div class="testi-quotes">${quotesHtml}</div>
      <div class="testi-section-title" style="margin-top:24px">Achievements</div>
      <div class="testi-achievements">${achievementsHtml}</div>
      <div class="testi-note">Ausführliche Empfehlungen auf <a href="https://linkedin.com/in/niklas-fauteck" target="_blank" rel="noopener">LinkedIn</a></div>
    </div>
  `;
}

// ─────────────────────────────────────────────────
// ONBOARDING TOUR
// ─────────────────────────────────────────────────
function startOnboardingTour() {
  if (localStorage.getItem('niklasOS_tourDone')) return;

  const steps = [
    { target: '[data-window="career"]', title: 'Arbeitsplatz', desc: 'Mein Werdegang und meine Karrierestationen.' },
    { target: '[data-window="sysmon"]', title: 'System Monitor', desc: 'Skills und Kompetenzen auf einen Blick.' },
    { target: '[data-window="terminal"]', title: 'Terminal', desc: 'Interaktives Terminal — tippe "help" für Befehle.' },
    { target: '#tb-contact-btn', title: 'Kontakt', desc: 'Direkt Kontakt aufnehmen — per E-Mail oder LinkedIn.' },
  ];

  let currentStep = 0;
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="onb-backdrop"></div>
    <div class="onb-tooltip">
      <div class="onb-step-indicator"></div>
      <div class="onb-title"></div>
      <div class="onb-desc"></div>
      <div class="onb-actions">
        <button class="onb-skip">Tour überspringen</button>
        <button class="onb-next">Weiter</button>
      </div>
    </div>
    <div class="onb-highlight"></div>
  `;
  document.body.appendChild(overlay);

  function showStep(idx) {
    const step = steps[idx];
    const target = document.querySelector(step.target);
    if (!target) { finish(); return; }

    const rect = target.getBoundingClientRect();
    const highlight = overlay.querySelector('.onb-highlight');
    highlight.style.top = (rect.top - 6) + 'px';
    highlight.style.left = (rect.left - 6) + 'px';
    highlight.style.width = (rect.width + 12) + 'px';
    highlight.style.height = (rect.height + 12) + 'px';

    const tooltip = overlay.querySelector('.onb-tooltip');
    overlay.querySelector('.onb-title').textContent = step.title;
    overlay.querySelector('.onb-desc').textContent = step.desc;
    overlay.querySelector('.onb-step-indicator').textContent = `${idx + 1} / ${steps.length}`;
    overlay.querySelector('.onb-next').textContent = idx === steps.length - 1 ? 'Fertig' : 'Weiter';

    // Position tooltip near target
    const tooltipH = 140;
    let top = rect.bottom + 16;
    if (top + tooltipH > window.innerHeight) top = rect.top - tooltipH - 16;
    let left = rect.left;
    if (left + 280 > window.innerWidth) left = window.innerWidth - 296;
    if (left < 16) left = 16;
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';

    requestAnimationFrame(() => overlay.classList.add('visible'));
  }

  function finish() {
    localStorage.setItem('niklasOS_tourDone', '1');
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 400);
  }

  overlay.querySelector('.onb-skip').addEventListener('click', finish);
  overlay.querySelector('.onb-next').addEventListener('click', () => {
    currentStep++;
    if (currentStep >= steps.length) finish();
    else showStep(currentStep);
  });

  setTimeout(() => showStep(0), 600);
}

// ─────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkifyText(escapedHtml) {
  return escapedHtml.replace(
    /(https?:\/\/[^\s<>&"]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

// ─────────────────────────────────────────────────
// LOGIN / LOCK SCREEN
// ─────────────────────────────────────────────────
function updateLoginClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const timeStr = hh + ':' + mm;
  const dateStr = now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const ids = ['login-time', 'login-date', 'lock-time', 'lock-date'];
  const vals = [timeStr, dateStr, timeStr, dateStr];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vals[i];
  });
}

function initLoginScreen(onComplete) {
  const loginScreen = document.getElementById('login-screen');
  if (!loginScreen) { onComplete(); return; }

  loginScreen.style.display = 'flex';
  requestAnimationFrame(() => loginScreen.classList.add('visible'));
  updateLoginClock();

  const form = document.getElementById('login-form');
  const input = document.getElementById('login-password');

  function doLogin() {
    loginScreen.classList.add('hidden');
    loginScreen.addEventListener('transitionend', () => {
      loginScreen.remove();
      onComplete();
    }, { once: true });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    doLogin();
  });

  // Also allow Enter on empty field
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doLogin();
    }
  });
}

function initLockScreen(onComplete) {
  const lockScreen = document.getElementById('lock-screen');
  if (!lockScreen) { onComplete(); return; }

  lockScreen.style.display = 'flex';
  requestAnimationFrame(() => lockScreen.classList.add('visible'));
  updateLoginClock();

  const dots = lockScreen.querySelectorAll('.lock-dot');
  let pin = '';

  function doUnlock() {
    dots.forEach(d => d.classList.add('success'));
    setTimeout(() => {
      lockScreen.classList.add('hidden');
      lockScreen.addEventListener('transitionend', () => {
        lockScreen.remove();
        onComplete();
      }, { once: true });
    }, 300);
  }

  lockScreen.querySelectorAll('.lock-key[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (key === 'del') {
        if (pin.length > 0) {
          pin = pin.slice(0, -1);
          dots[pin.length].classList.remove('filled');
        }
        return;
      }
      if (pin.length >= 4) return;
      pin += key;
      dots[pin.length - 1].classList.add('filled');
      if (pin.length === 4) {
        setTimeout(doUnlock, 200);
      }
    });
  });
}

// ─────────────────────────────────────────────────
// BOOT SEQUENCE
// ─────────────────────────────────────────────────
function boot() {
  const bootScreen = document.getElementById('boot-screen');
  const bootBar    = document.getElementById('boot-bar');
  const bootStatus = document.getElementById('boot-status');
  const isMobile = window.innerWidth < 768;
  let bootAborted = false;

  function initDesktop() {
    updateClock();
    setInterval(updateClock, 10000);
    initDesktopIcons();
    initContextMenu();
    initTaskbarAppsBtn();
    initSearchOverlay();
    initMobile();
    if (isMobile) {
      setTimeout(showFakeCall,    3 * 60 * 1000);
      setTimeout(showFakeMessage, 4 * 60 * 1000);
    }
    // Handle deep-linking via hash
    const hash = window.location.hash.replace('#', '');
    if (hash && WIN_CONFIGS[hash]) {
      setTimeout(() => openWindow(hash), 350);
    } else {
      setTimeout(() => openWindow('about'), 350);
    }
    // Save visited state for return visitors
    localStorage.setItem('niklasOS_visited', '1');
    // Start onboarding tour for first-time desktop visitors
    if (!isMobile) {
      setTimeout(startOnboardingTour, 1200);
    }
  }

  function finishBoot() {
    if (bootAborted) return;
    bootAborted = true;
    if (bootBar) bootBar.style.width = '100%';
    bootScreen.classList.add('hidden');
    bootScreen.addEventListener('transitionend', () => {
      bootScreen.remove();
    }, { once: true });
    if (isMobile) {
      initLockScreen(initDesktop);
    } else {
      initLoginScreen(initDesktop);
    }
  }

  // Returning visitor: skip boot + login entirely
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (localStorage.getItem('niklasOS_visited') || reducedMotion) {
    bootScreen.remove();
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.remove();
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) lockScreen.remove();
    initDesktop();
    return;
  }

  // Boot skip button
  const skipBtn = document.getElementById('boot-skip');
  if (skipBtn) {
    skipBtn.addEventListener('click', finishBoot);
  }

  // Faster boot steps
  const steps = [
    [0,    'Initialisierung...'],
    [200,  'Kernel laden...'],
    [400,  'Prozesse starten...'],
    [600,  'Fenster-Manager laden...'],
    [800,  'Desktop einrichten...'],
    [1000, 'Bereit.'],
  ];

  steps.forEach(([delay, msg]) => {
    setTimeout(() => {
      if (bootAborted) return;
      if (bootStatus) bootStatus.textContent = msg;
      if (bootBar) bootBar.style.width = ((delay / 1000) * 100) + '%';
    }, delay);
  });

  setTimeout(() => {
    finishBoot();
  }, 1200);
}

// ─────────────────────────────────────────────────
// HASH ROUTING
// ─────────────────────────────────────────────────
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && WIN_CONFIGS[hash]) openWindow(hash);
});

// ─────────────────────────────────────────────────
// ENTRY POINT
// ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);
