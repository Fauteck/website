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
    defaultW: 500, defaultH: 480,
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
    about:          buildAbout,
    career:         buildCareer,
    terminal:       buildTerminal,
    sysmon:         buildSysmon,
    bambu:          buildBambu,
    homeassistant:  buildHA,
    packages:       buildPackages,
    changelog:      buildChangelog,
    network:        buildNetwork,
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
// BAMBU STUDIO (3D PRINT — redesigned)
// ─────────────────────────────────────────────────
function buildBambu(body) {
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

        <!-- Center: LinkedIn Post Embed -->
        <div class="bam-viewport">
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7439337480501477376"
            frameborder="0"
            allowfullscreen
            title="LinkedIn Post: 3D-Druck Katheterspiegelhalter"
            loading="lazy"
          ></iframe>
          <div class="bam-viewport-fallback">
            <div class="bam-fallback-icon">🖨️</div>
            <div class="bam-fallback-title">Katheterspiegelhalter_v3</div>
            <div class="bam-fallback-sub">TPU 95A · Bambu Lab P1S · 1h 33min</div>
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

  btn.addEventListener('click', () => {
    if (printing) return;
    printing = true;
    progress = 0;
    btn.disabled = true;
    btn.textContent = '⏳ Druckt...';
    status.textContent = 'Druckt';
    status.style.background = 'rgba(251,146,60,0.15)';
    status.style.color = '#c2410c';

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
        setTimeout(() => {
          progress = 0;
          fill.style.width = '0%';
          pctEl.textContent = '0%';
          status.textContent = 'Bereit';
          status.style.background = '';
          status.style.color = '';
          btn.textContent = 'Druckplatte drucken';
        }, 3000);
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
    { from: 'IT-Support RTL', subject: 'Wartungsfenster: Media Hub Update', time: '09:12', unread: true, preview: 'Geplantes Wartungsfenster morgen von 22:00-02:00 Uhr...' },
    { from: 'Produktteam', subject: 'Sprint Review – Einladung', time: '08:47', unread: true, preview: 'Hallo Niklas, hiermit lädt das Produktteam zum Sprint-Review ein...' },
    { from: 'Jira Automation', subject: '[KOMM-4821] Status geändert: Done', time: 'Gestern', unread: false, preview: 'Das Ticket "Media Hub: Bild-Upload optimieren" wurde auf Done gesetzt.' },
    { from: 'Confluence', subject: 'Seite aktualisiert: Systemarchitektur', time: 'Gestern', unread: false, preview: 'Max Mustermann hat die Seite "Systemarchitektur 2026" bearbeitet.' },
    { from: 'GitHub', subject: '[docker-configs] PR #47 merged', time: 'Di.', unread: false, preview: 'Pull Request #47 "Update Home Assistant to 2026.3" wurde gemergt.' },
    { from: 'Bambu Lab', subject: 'Druckauftrag abgeschlossen', time: 'Mo.', unread: false, preview: 'Ihr Druckauftrag "Katheterspiegelhalter_v3" wurde erfolgreich abgeschlossen (7h 23min).' },
  ];
  body.innerHTML = `
    <div class="mob-mail-wrap">
      <div class="mob-mail-header">
        <span style="font-weight:600">Posteingang</span>
        <span class="mob-mail-badge">2</span>
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
    </div>
  `;
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
  return buildEigeneDateien(body);
}

// ─────────────────────────────────────────────────
// EIGENE DATEIEN
// ─────────────────────────────────────────────────
function buildEigeneDateien(body) {
  const files = [
    { icon: '📄', name: 'Niklas_CV.pdf',             type: 'PDF',  size: '142 KB', action: null },
    { icon: '📝', name: 'Steuererklärung 2025.docx', type: 'DOCX', size: '88 KB',  action: 'crash' },
    { icon: '📊', name: 'Projektziele_2026.xlsx',    type: 'XLSX', size: '34 KB',  action: null },
    { icon: '🗜️', name: 'HomeAssistant_Backup.tar.gz', type: 'GZ', size: '2,3 MB', action: null },
    { icon: '🖼️', name: 'Katheterspiegelhalter_v3.3mf', type: '3MF', size: '1,1 MB', action: null },
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
          <div class="ef-sidebar-item active"><span class="ef-si-icon">📁</span> Eigene Dateien</div>
          <div class="ef-sidebar-item"><span class="ef-si-icon">🖥️</span> Desktop</div>
          <div class="ef-sidebar-item"><span class="ef-si-icon">🗑️</span> Papierkorb</div>
        </div>
        <div class="ef-main">
          <div class="ef-list-header">
            <span class="ef-col-name">Name</span>
            <span class="ef-col-type">Typ</span>
            <span class="ef-col-size">Größe</span>
          </div>
          ${files.map(f => `
            <div class="ef-file${f.action === 'crash' ? ' ef-file-docx' : ''}" data-action="${f.action || ''}">
              <span class="ef-file-icon">${f.icon}</span>
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
  homeassistant: 'Home Asst.',
  packages:      'Apps',
  changelog:     'Changelog',
  network:       'Kontakt',
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
};

// Page 1 apps (main homescreen), Page 2 remainder
const MOB_PAGE1 = ['about', 'career', 'chatgpt', 'claudeapp', 'outlook', 'teams'];
const MOB_PAGE2 = ['jira', 'github', 'homeassistant', 'rss', 'filesapp', 'snake'];
const MOB_DOCK  = ['outlook', 'network', 'about', 'github'];

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

  // Back button
  const backBtn = document.getElementById('mob-back');
  if (backBtn) backBtn.addEventListener('click', closeMobileWindow);
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
  const title = document.getElementById('mob-win-title');

  // Close quick settings and notification panel if open
  const qs = document.getElementById('mob-quick-settings');
  if (qs) { qs.classList.remove('open'); qs.setAttribute('aria-hidden', 'true'); }
  const np = document.getElementById('mob-notif-panel');
  if (np) { np.classList.remove('open'); np.setAttribute('aria-hidden', 'true'); }

  body.innerHTML = '';
  title.textContent = MOB_LABELS[id] || cfg.title;
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
    network:        buildNetwork,
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

  function initDesktop() {
    updateClock();
    setInterval(updateClock, 10000);
    initDesktopIcons();
    initContextMenu();
    initTaskbarAppsBtn();
    initMobile();
    setTimeout(() => openWindow('about'), 350);
  }

  const isMobile = window.innerWidth < 768;

  setTimeout(() => {
    if (bootBar) bootBar.style.width = '100%';
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      bootScreen.addEventListener('transitionend', () => {
        bootScreen.remove();
      }, { once: true });

      if (isMobile) {
        initLockScreen(initDesktop);
      } else {
        initLoginScreen(initDesktop);
      }
    }, 300);
  }, 2100);
}

// ─────────────────────────────────────────────────
// ENTRY POINT
// ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);
