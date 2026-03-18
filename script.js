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
    title: 'about.md',
    color: 'blue',
    defaultW: 600, defaultH: 500,
    svgPath: 'M4 2h12l6 6v22H4V2zM16 2v6h6M7 13h10M7 17h10M7 21h6',
  },
  career: {
    title: 'Arbeitsplatz',
    color: 'amber',
    defaultW: 780, defaultH: 520,
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
    defaultW: 560, defaultH: 480,
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
  network: {
    title: 'Netzwerk',
    color: 'cyan',
    defaultW: 500, defaultH: 420,
    svgPath: 'M14 3a11 11 0 100 22A11 11 0 0014 3zM14 3c-3 0-5 5-5 11s2 11 5 11M14 3c3 0 5 5 5 11s-2 11-5 11M3 14h22M5 9h18M5 19h18',
  },
  trash: {
    title: 'Papierkorb',
    color: 'red',
    defaultW: 540, defaultH: 460,
    svgPath: 'M5 8h18M10 8V6a2 2 0 012-2h4a2 2 0 012 2v2M9 8l1 16h8l1-16M12 12v8M16 12v8',
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
    about:         buildAbout,
    career:        buildCareer,
    terminal:      buildTerminal,
    sysmon:        buildSysmon,
    bambu:         buildBambu,
    homeassistant: buildHA,
    packages:      buildPackages,
    changelog:     buildChangelog,
    network:       buildNetwork,
    trash:         buildTrash,
  };
  if (contentFns[id]) contentFns[id](body, id);
}

// ─────────────────────────────────────────────────
// ABOUT.MD CONTENT
// ─────────────────────────────────────────────────
function buildAbout(body) {
  body.innerHTML = `
    <div class="about-toolbar">
      <span>Niklas</span>
      <span class="bc-sep">/</span>
      <span style="color:#2d6a4f;font-weight:600">about.md</span>
    </div>
    <div class="about-content">
      <h1>Niklas Fauteck</h1>
      <div class="about-role">Head of Digital Transformation &middot; RTL Deutschland</div>
      <hr class="about-hr">
      <p>
        Ich übersetze zwischen Kommunikation und Technologie – und baue Systeme,
        die Menschen wirklich nutzen. Seit über 16 Jahren an der Schnittstelle
        zwischen Medien, Kommunikation und digitaler Transformation.
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
        <button class="btn-ghost"   onclick="openWindow('network')">→ Kontakt</button>
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
    name: '2023 – heute',
    sub: 'RTL Deutschland',
    title: 'Head of Digital Transformation',
    company: 'RTL Deutschland GmbH',
    period: '2023 – heute',
    responsibilities: [
      'Führung digitaler Transformationsinitiativen für eine der größten Mediengruppen Deutschlands',
      'Schnittstellenfunktion zwischen Redaktion, Produktentwicklung und Technologie',
      'Aufbau und Skalierung KI-gestützter Workflows und Automation-Pipelines',
      'Strategische Begleitung von Tool-Einführungen mit Fokus auf Nutzeradoption',
      'Brückenbauer zwischen technischen Teams und Nicht-Technikern',
    ],
    impact: [
      'Nachhaltige Adoption neuer Tools durch konsequenten Fokus auf Anwenderperspektive',
      'Systematische Prozessautomation im redaktionellen und operativen Umfeld',
      'Kulturwandel hin zu datengetriebenen, pragmatisch umgesetzten Entscheidungen',
    ],
  },
  {
    id: 'newsdesk',
    icon: '📰',
    name: '2020 – 2023',
    sub: 'Newsdesk Kommunikation',
    title: 'Digital Project Management',
    company: 'Newsdesk Kommunikation',
    period: '2020 – 2023',
    responsibilities: [
      'Projektleitung für digitale Kommunikationslösungen mit Fokus auf Tool-Integration',
      'Prozessoptimierung und Digitalisierung von Kommunikations-Workflows',
      'Einführung und Adoption digitaler Werkzeuge in bestehenden Teams',
      'Schnittstellenarbeit zwischen Kunden, Konzept und Entwicklung',
    ],
    impact: [
      'Erfolgreiche Tool-Rollouts mit hoher Nutzerakzeptanz und nachhaltiger Nutzung',
      'Strukturierte digitale Kommunikationsprozesse mit messbarer Effizienzsteigerung',
    ],
  },
  {
    id: 'vox2',
    icon: '📺',
    name: '2019 – 2020',
    sub: 'VOX & RTL+',
    title: 'Online Redaktion',
    company: 'VOX & RTL+',
    period: '2019 – 2020',
    responsibilities: [
      'Redaktionelle und digitale Content-Arbeit für TV-Sender und Streaming-Plattform',
      'Digitale Content-Strategie und -Produktion für unterschiedliche Zielgruppen',
      'Schnittstellenarbeit zwischen Content-Teams und Plattformtechnologie',
    ],
    impact: [
      'Fundiertes Verständnis für Plattform-Logiken und digitale Verbreitungswege',
      'Erste systematische Verbindung von Content-Denken und technischen Möglichkeiten',
    ],
  },
  {
    id: 'vox1',
    icon: '📣',
    name: '2015 – 2019',
    sub: 'VOX',
    title: 'PR & Kommunikation',
    company: 'VOX Fernsehen GmbH',
    period: '2015 – 2019',
    responsibilities: [
      'Pressearbeit und Kommunikationsstrategie für einen der bekanntesten deutschen TV-Sender',
      'Digitale PR, Social Media und Onlinekommunikation',
      'Aufbau erster digitaler Workflows und Kommunikationsprozesse',
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
    title: 'B.A. Wirtschaftskommunikation',
    company: 'Hochschule Bonn-Rhein-Sieg',
    period: '2009 – 2013',
    responsibilities: [
      'Studium der Wirtschaftskommunikation an der Hochschule Bonn-Rhein-Sieg',
      'Schwerpunkte: Marketing, PR, Medien und Wirtschaft',
      'Grundlage für das Verständnis von Kommunikation als wirtschaftliche Disziplin',
    ],
    impact: [
      'Solide Basis für die Verbindung von Kommunikation, Marketing und Business-Logik',
    ],
  },
];

function buildCareer(body) {
  body.style.padding = '0';
  body.style.overflow = 'hidden';
  body.style.display = 'flex';
  body.style.flexDirection = 'column';

  const html = `
    <div class="fm-wrap">
      <div class="fm-toolbar">
        <div class="fm-toolbar-btns">
          <div class="fm-toolbar-btn" title="Zurück">‹</div>
          <div class="fm-toolbar-btn" title="Vor">›</div>
          <div class="fm-toolbar-btn" title="Hoch">↑</div>
        </div>
        <div class="fm-path">/Niklas/Karriere</div>
      </div>
      <div class="fm-body">
        <div class="fm-sidebar">
          <div class="fm-sidebar-section">Orte</div>
          <div class="fm-sidebar-item active" data-nav="career"><span class="fm-si-icon">💼</span> Karriere</div>
          <div class="fm-sidebar-item" data-nav="sysmon"><span class="fm-si-icon">📊</span> System Monitor</div>
          <div class="fm-sidebar-item" data-nav="packages"><span class="fm-si-icon">📦</span> Installierte Apps</div>
          <div class="fm-sidebar-section" style="margin-top:8px">Schnell</div>
          <div class="fm-sidebar-item" data-nav="network"><span class="fm-si-icon">🌐</span> Netzwerk</div>
          <div class="fm-sidebar-item" data-nav="trash"><span class="fm-si-icon">🗑️</span> Papierkorb</div>
        </div>
        <div class="fm-main">
          <div class="fm-list" id="fm-entry-list">
            <div class="fm-list-header"><span>Zeitraum &amp; Position</span></div>
            ${CAREER_DATA.map((e, i) => `
              <div class="fm-entry${i === 0 ? ' active' : ''}" data-career-id="${e.id}">
                <span class="fm-entry-icon">${e.icon}</span>
                <div class="fm-entry-info">
                  <div class="fm-entry-name">${e.name}</div>
                  <div class="fm-entry-sub">${e.sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="fm-detail" id="fm-detail-pane"></div>
        </div>
      </div>
    </div>
  `;
  body.innerHTML = html;

  // Show first entry by default
  showCareerDetail(body, CAREER_DATA[0].id);

  // Entry click
  body.querySelectorAll('.fm-entry').forEach(el => {
    el.addEventListener('click', () => {
      body.querySelectorAll('.fm-entry').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      showCareerDetail(body, el.dataset.careerId);
    });
  });

  // Sidebar navigation
  body.querySelectorAll('.fm-sidebar-item[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;
      if (target !== 'career') openWindow(target);
    });
  });
}

function showCareerDetail(body, careerId) {
  const data = CAREER_DATA.find(e => e.id === careerId);
  const pane = body.querySelector('#fm-detail-pane');
  if (!data || !pane) return;

  pane.innerHTML = `
    <div class="fm-detail-title">${data.title}</div>
    <div class="fm-detail-company">${data.company}</div>
    <div class="fm-detail-period">${data.period}</div>
    <div class="fm-detail-section">
      <h4>Verantwortung</h4>
      <ul class="fm-detail-list">
        ${data.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    <div class="fm-detail-section">
      <h4>Wirkung</h4>
      <ul class="fm-detail-list">
        ${data.impact.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
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
    { t: 'accent',  v: '  skills          → Skill-Übersicht' },
    { t: 'accent',  v: '  skills --verbose → Detaillierte Skills' },
    { t: 'accent',  v: '  now             → Aktueller Fokus' },
    { t: 'accent',  v: '  anti_patterns   → Was ich ablehne' },
    { t: 'accent',  v: '  history         → Interaktionshistorie' },
    { t: 'accent',  v: '  fortune         → Weisheit des Tages' },
    { t: 'accent',  v: '  man niklas      → Manual Page' },
    { t: 'accent',  v: '  clear           → Terminal leeren' },
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
// BAMBU STUDIO (3D PRINT)
// ─────────────────────────────────────────────────
function buildBambu(body) {
  body.innerHTML = `
    <div class="bambu">
      <div class="bambu-header">
        <h3>Bambu Studio — 3D-Druck</h3>
        <span class="bambu-status" id="bambu-status">Bereit</span>
      </div>
      <div class="bambu-viewport">
        <div class="print-cube-scene">
          <div class="print-cube" id="print-cube">
            <div class="cube-face front"></div>
            <div class="cube-face back"></div>
            <div class="cube-face right"></div>
            <div class="cube-face left"></div>
            <div class="cube-face top"></div>
            <div class="cube-face bottom"></div>
          </div>
        </div>
      </div>
      <div class="bambu-controls">
        <div class="bambu-row">
          <span class="bambu-label">Druckfortschritt</span>
          <span class="bambu-val" id="bambu-pct">0%</span>
        </div>
        <div class="bambu-row">
          <div class="bambu-progress-track">
            <div class="bambu-progress-fill" id="bambu-fill"></div>
          </div>
        </div>
        <div class="bambu-row">
          <span class="bambu-label">Modell</span>
        </div>
        <div class="bambu-selector">
          <div class="bambu-chip active" data-model="bracket">Halterung</div>
          <div class="bambu-chip" data-model="case">Gehäuse</div>
          <div class="bambu-chip" data-model="tool">Werkzeug</div>
          <div class="bambu-chip" data-model="deco">Dekor</div>
        </div>
        <button class="bambu-start-btn" id="bambu-btn">▶ Druck starten</button>
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

  body.querySelectorAll('.bambu-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      body.querySelectorAll('.bambu-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  btn.addEventListener('click', () => {
    if (printing) return;
    printing = true;
    progress = 0;
    btn.disabled = true;
    btn.textContent = '⏳ Druckt...';
    status.textContent = 'Druckt';

    interval = setInterval(() => {
      progress += Math.random() * 2.5 + 0.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        printing = false;
        btn.disabled = false;
        btn.textContent = '▶ Erneut drucken';
        status.textContent = '✓ Fertig!';
        setTimeout(() => { progress = 0; fill.style.width = '0%'; pctEl.textContent = '0%'; status.textContent = 'Bereit'; btn.textContent = '▶ Druck starten'; }, 3000);
      }
      fill.style.width = progress + '%';
      pctEl.textContent = Math.round(progress) + '%';
    }, 200);
  });
}

// ─────────────────────────────────────────────────
// HOME ASSISTANT
// ─────────────────────────────────────────────────
const HA_ROOMS = [
  { id: 'wohnzimmer', name: 'Wohnzimmer', on: true,  temp: 21 },
  { id: 'kueche',     name: 'Küche',      on: false, temp: 20 },
  { id: 'schlafzimmer',name: 'Schlafzimmer', on: false, temp: 18 },
  { id: 'buero',      name: 'Büro',       on: true,  temp: 22 },
];

function buildHA(body) {
  const roomsHtml = HA_ROOMS.map(r => `
    <div class="ha-room${r.on ? ' lit' : ''}" id="ha-room-${r.id}">
      <div class="ha-room-top">
        <span class="ha-room-name">${r.name}</span>
        <button class="ha-light-btn${r.on ? ' on' : ''}" data-room="${r.id}"
                aria-label="Licht ${r.name} ${r.on ? 'an' : 'aus'}"></button>
      </div>
      <div class="ha-temp-row">
        <span class="ha-temp-label">Temp</span>
        <input class="ha-temp-slider" type="range" min="16" max="26"
               value="${r.temp}" data-room="${r.id}">
        <span class="ha-temp-val" id="ha-temp-${r.id}">${r.temp}°C</span>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="ha-wrap">
      <div class="ha-header">
        <div class="ha-pulse"></div>
        <h3>Home Assistant</h3>
      </div>
      <div class="ha-status-bar">
        <div class="ha-stat"><span class="ha-stat-label">Räume</span><span class="ha-stat-val" id="ha-lights-on">2 an</span></div>
        <div class="ha-stat"><span class="ha-stat-label">Ø Temperatur</span><span class="ha-stat-val" id="ha-avg-temp">20.3°C</span></div>
        <div class="ha-stat"><span class="ha-stat-label">Status</span><span class="ha-stat-val">● verbunden</span></div>
      </div>
      <div class="ha-rooms">${roomsHtml}</div>
    </div>
  `;

  const state = {};
  HA_ROOMS.forEach(r => { state[r.id] = { on: r.on, temp: r.temp }; });

  function updateStats() {
    const on = Object.values(state).filter(r => r.on).length;
    const avg = Object.values(state).reduce((s, r) => s + r.temp, 0) / HA_ROOMS.length;
    const el1 = body.querySelector('#ha-lights-on');
    const el2 = body.querySelector('#ha-avg-temp');
    if (el1) el1.textContent = on + ' an';
    if (el2) el2.textContent = avg.toFixed(1) + '°C';
  }

  body.querySelectorAll('.ha-light-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.room;
      state[id].on = !state[id].on;
      btn.classList.toggle('on', state[id].on);
      const room = body.querySelector(`#ha-room-${id}`);
      if (room) room.classList.toggle('lit', state[id].on);
      updateStats();
    });
  });

  body.querySelectorAll('.ha-temp-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const id = slider.dataset.room;
      state[id].temp = parseInt(slider.value);
      const val = body.querySelector(`#ha-temp-${id}`);
      if (val) val.textContent = slider.value + '°C';
      updateStats();
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
  const html = CHANGELOG_DATA.map(v => `
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

  body.innerHTML = `<div class="changelog">${html}</div>`;
}

// ─────────────────────────────────────────────────
// NETWORK / CONTACT
// ─────────────────────────────────────────────────
function buildNetwork(body) {
  body.innerHTML = `
    <div class="network">
      <div class="network-status">
        <span>●</span>
        <span class="net-online">niklas-fauteck</span>
        <span>ist erreichbar</span>
        <span class="net-ping">Response &lt; 48h</span>
      </div>
      <div class="net-connections">
        <div class="net-conn">
          <div class="net-conn-icon" style="background:rgba(10,102,194,0.12);font-size:22px">in</div>
          <div class="net-conn-info">
            <div class="net-conn-name">LinkedIn</div>
            <div class="net-conn-desc">Niklas Fauteck · Head of Digital Transformation</div>
          </div>
          <a class="net-conn-action" href="https://linkedin.com/in/niklas-fauteck" target="_blank" rel="noopener noreferrer">Verbinden</a>
        </div>
        <div class="net-conn">
          <div class="net-conn-icon" style="background:rgba(82,183,136,0.12);font-size:20px">✉</div>
          <div class="net-conn-info">
            <div class="net-conn-name">E-Mail</div>
            <div class="net-conn-desc">niklas@fauteck.eu · direkt &amp; unkompliziert</div>
          </div>
          <a class="net-conn-action" href="mailto:niklas@fauteck.eu">Schreiben</a>
        </div>
      </div>
      <div style="margin-top:16px;padding:12px 14px;background:rgba(82,183,136,0.06);border-radius:8px;font-size:13px;color:#4a5568;line-height:1.6">
        <strong style="color:#2d6a4f">Gesprächsthemen:</strong> Digitale Transformation · KI-Workflows · Smart Home · 3D-Druck · Automationen · pragmatische Systemarbeit
      </div>
    </div>
  `;
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
}

// ─────────────────────────────────────────────────
// TASKBAR APP BUTTON (shows/opens all windows)
// ─────────────────────────────────────────────────
function initTaskbarAppsBtn() {
  const btn = document.getElementById('tb-apps-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Show a quick overlay listing all windows, or just open about
    openWindow('about');
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
  about:         'About',
  career:        'Karriere',
  terminal:      'Terminal',
  sysmon:        'System',
  bambu:         'Bambu',
  homeassistant: 'Home',
  packages:      'Apps',
  changelog:     'Changelog',
  network:       'Kontakt',
  trash:         'Papierkorb',
};

// Page 1 apps (main homescreen), Page 2 remainder
const MOB_PAGE1 = ['about', 'career', 'terminal', 'homeassistant', 'bambu', 'sysmon'];
const MOB_PAGE2 = ['packages', 'changelog', 'network', 'trash'];
const MOB_DOCK  = ['terminal', 'network', 'about', 'career'];

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
  red: 'linear-gradient(135deg,#dc2626,#991b1b)',
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
  div.addEventListener('click', () => openMobileWindow(id));
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

  // Status bar tap → Quick Settings
  const statusBar = document.getElementById('mob-status-bar');
  if (statusBar) {
    statusBar.addEventListener('click', toggleQuickSettings);
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

  // Close QS on tap outside
  document.getElementById('mob-pages-wrap')?.addEventListener('click', () => {
    document.getElementById('mob-quick-settings')?.classList.remove('open');
    document.getElementById('mob-quick-settings')?.setAttribute('aria-hidden', 'true');
  });

  // Back button
  const backBtn = document.getElementById('mob-back');
  if (backBtn) backBtn.addEventListener('click', closeMobileWindow);
}

function toggleQuickSettings() {
  const qs = document.getElementById('mob-quick-settings');
  if (!qs) return;
  const isOpen = qs.classList.toggle('open');
  qs.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

function openMobileWindow(id) {
  const cfg = WIN_CONFIGS[id];
  if (!cfg) return;

  const mw    = document.getElementById('mobile-window');
  const body  = document.getElementById('mob-win-body');
  const title = document.getElementById('mob-win-title');

  // Close quick settings if open
  const qs = document.getElementById('mob-quick-settings');
  if (qs) { qs.classList.remove('open'); qs.setAttribute('aria-hidden', 'true'); }

  body.innerHTML = '';
  title.textContent = MOB_LABELS[id] || cfg.title;
  mw.setAttribute('aria-hidden', 'false');
  mw.classList.add('show');
  document.getElementById('mobile-home').setAttribute('aria-hidden', 'true');

  const contentFns = {
    about:         buildAbout,
    career:        buildCareer,
    terminal:      buildTerminal,
    sysmon:        buildSysmon,
    bambu:         buildBambu,
    homeassistant: buildHA,
    packages:      buildPackages,
    changelog:     buildChangelog,
    network:       buildNetwork,
    trash:         buildTrash,
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

// ─────────────────────────────────────────────────
// BOOT SEQUENCE
// ─────────────────────────────────────────────────
function boot() {
  const bootScreen = document.getElementById('boot-screen');
  const bootBar    = document.getElementById('boot-bar');
  const bootStatus = document.getElementById('boot-status');

  const steps = [
    [0,    'Initialisierung...'],
    [300,  'Kernel laden...'],
    [700,  'Prozesse starten...'],
    [1100, 'Fenster-Manager laden...'],
    [1500, 'Desktop einrichten...'],
    [1900, 'Bereit.'],
  ];

  steps.forEach(([delay, msg]) => {
    setTimeout(() => {
      if (bootStatus) bootStatus.textContent = msg;
      if (bootBar) bootBar.style.width = ((delay / 1900) * 100) + '%';
    }, delay);
  });

  setTimeout(() => {
    if (bootBar) bootBar.style.width = '100%';
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      bootScreen.addEventListener('transitionend', () => {
        bootScreen.remove();
      }, { once: true });

      // Init everything after boot
      updateClock();
      setInterval(updateClock, 10000);
      initDesktopIcons();
      initContextMenu();
      initTaskbarAppsBtn();
      initMobile();

      // Open about.md after short delay
      setTimeout(() => openWindow('about'), 350);
    }, 300);
  }, 2100);
}

// ─────────────────────────────────────────────────
// ENTRY POINT
// ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);
