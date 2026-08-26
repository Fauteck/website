/**
 * scripts/build.mjs — leitet alles aus blog/*.md ab, was bisher von Hand
 * gepflegt wurde: die Slug-Liste, den Feed, die Sitemap und je Beitrag eine
 * eigene Seite.
 *
 * Hintergrund: Vier Mengen mussten deckungsgleich sein (26 Markdown-Dateien,
 * posts.json, feed.xml, sitemap.xml) und wurden alle von Hand gepflegt. Die
 * Sitemap lief still 26 Beitraege hinterher — nicht weil sie falsch
 * geschrieben wurde, sondern weil sie nicht mitgewachsen ist.
 *
 * Die ausgelieferte Seite bleibt statisch und build-frei. Dieser Schritt
 * erzeugt nur eingecheckte Dateien; `node scripts/guard.mjs` prueft in CI, ob
 * sie zum Bestand passen.
 *
 * Aufruf:  node scripts/build.mjs          schreibt
 *          node scripts/build.mjs --check  vergleicht nur (Exit 1 bei Drift)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { imageSize } from './lib/image-size.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://niklasfauteck.de';
const BLOG = join(ROOT, 'blog');

// Genau ein Markdown-Renderer im Repo: der, den auch der Browser laedt.
// blog/render.js haengt sich an `window` oder — in Node — an `this`, also an
// module.exports. Eine zweite Implementierung hier waere die naechste Menge,
// die auseinanderlaeuft.
const require = createRequire(import.meta.url);
const { BlogRender } = require('../blog/render.js');

const check = process.argv.includes('--check');
const drift = [];

function emit(relPath, content) {
  const abs = join(ROOT, relPath);
  const current = existsSync(abs) ? readFileSync(abs, 'utf8') : null;
  if (current === content) return;
  if (check) { drift.push(relPath); return; }
  writeFileSync(abs, content, 'utf8');
  console.log((current === null ? 'neu    ' : 'geaendert ') + relPath);
}

/* ── Beitraege einlesen ──────────────────────────────────────────────────── */

const posts = readdirSync(BLOG)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const slug = file.replace(/\.md$/, '');
    const md = readFileSync(join(BLOG, file), 'utf8');
    const { data } = BlogRender.parseFrontmatter(md);
    if (!data.title) throw new Error(`blog/${file}: title fehlt im Frontmatter`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test((data.date || '').trim())) {
      throw new Error(`blog/${file}: date fehlt oder ist nicht YYYY-MM-DD`);
    }
    return {
      slug,
      title: data.title,
      date: data.date.trim(),
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      thumb: data.thumb || '',
      thumbAlt: data.thumbAlt || '',
      md,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

/* ── Bildmasse ───────────────────────────────────────────────────────────── */

// Jedes Bild, das in einem Beitrag vorkommt, mit seinen echten Massen. Ohne
// width/height schiebt jedes nachladende Bild das Layout (CLS) — und die
// clientseitigen Renderer koennen die Masse nicht kennen, also bekommen sie
// sie hier mitgeliefert.
const sizes = {};
for (const p of posts) {
  for (const m of p.md.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const src = m[1];
    if (/^https?:/.test(src) || sizes[src]) continue;
    const abs = join(BLOG, src);
    if (!existsSync(abs)) throw new Error(`blog/${p.slug}.md verweist auf ${src} — Datei fehlt`);
    const d = imageSize(abs);
    if (!d) throw new Error(`${src}: Masse nicht lesbar`);
    sizes[src] = [d.width, d.height];
  }
  if (p.thumb && !sizes[p.thumb]) {
    const abs = join(BLOG, p.thumb);
    if (!existsSync(abs)) throw new Error(`blog/${p.slug}.md: thumb ${p.thumb} fehlt`);
    const d = imageSize(abs);
    if (d) sizes[p.thumb] = [d.width, d.height];
  }
}

/* ── Helfer ──────────────────────────────────────────────────────────────── */

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Letzter Sonntag im Maerz bis letzter Sonntag im Oktober = Sommerzeit.
function berlinOffset(y, m, d) {
  const lastSunday = (month) => {
    const last = new Date(Date.UTC(y, month + 1, 0));
    return last.getUTCDate() - last.getUTCDay();
  };
  if (m > 3 && m < 10) return '+0200';
  if (m < 3 || m > 10) return '+0100';
  if (m === 3) return d >= lastSunday(2) ? '+0200' : '+0100';
  return d < lastSunday(9) ? '+0200' : '+0100';
}

function rfc822(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${wd}, ${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y} 00:00:00 ${berlinOffset(y, m, d)}`;
}

// Masse und WebP-Quelle setzt render.js selbst — dieselbe Ausgabe wie im
// Browser. Fuer den Feed muessen die Pfade zusaetzlich absolut werden: ein
// Feedreader loest nichts relativ auf.
BlogRender.setImageSizes(sizes);

function absolutize(html, prefix) {
  return html
    .replace(/(<img[^>]+src=")(?!https?:)/g, `$1${prefix}`)
    .replace(/(<source[^>]+srcset=")(?!https?:)/g, `$1${prefix}`);
}

// Ueberschrift 1 steht bereits im <title> und im Seitenkopf; im Rumpf waere sie
// doppelt.
const bodyOf = (p) => BlogRender.renderMarkdown(p.md).replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, '');

/* ── 1. posts.json — die Slug-Liste ──────────────────────────────────────── */

emit('blog/posts.json', JSON.stringify(posts.map((p) => p.slug), null, 2) + '\n');

/* ── 2. blog/images/sizes.json — Masse fuer die clientseitigen Renderer ──── */

emit('blog/images/sizes.json', JSON.stringify(sizes, null, 2) + '\n');

/* ── 3. feed.xml ─────────────────────────────────────────────────────────── */

const feedItems = posts.map((p) => {
  const body = absolutize(bodyOf(p), `${SITE}/blog/`);
  return [
    '    <item>',
    `      <title>${esc(p.title)}</title>`,
    `      <link>${SITE}/blog/${p.slug}.html</link>`,
    // guid bleibt die alte Hash-Form: ein Feedreader erkennt Beitraege daran
    // wieder. Wuerde sie sich aendern, saehen alle Abonnenten 26 neue Beitraege.
    `      <guid isPermaLink="false">${SITE}/blog/#${p.slug}</guid>`,
    `      <pubDate>${rfc822(p.date)}</pubDate>`,
    ...p.tags.map((t) => `      <category>${esc(t)}</category>`),
    '      <description><![CDATA[',
    body,
    '      ]]></description>',
    '    </item>',
  ].join('\n');
});

emit('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NiklasOS Blog — Niklas Fauteck</title>
    <link>${SITE}/</link>
    <description>Projektmanager &amp; Coach für Digitale Transformation und KI-gestütztes Vibecoding. Niklas Fauteck verbindet seit über zehn Jahren Kommunikation, Technologie und digitale Transformation.</description>
    <language>de-de</language>
    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>

${feedItems.join('\n\n')}
  </channel>
</rss>
`);

/* ── 4. sitemap.xml ──────────────────────────────────────────────────────── */

// Die Rechtsseiten stehen bewusst nicht drin: sie tragen noindex, und eine
// Sitemap ist die Bitte um Indexierung. Beides zusammen meldet die Search
// Console als Widerspruch.
const staticUrls = [
  { loc: `${SITE}/`, lastmod: '2026-06-04', priority: '1.0' },
  { loc: `${SITE}/full/`, lastmod: '2026-06-04', priority: '0.9' },
  { loc: `${SITE}/blog/`, lastmod: posts[0].date, priority: '0.8' },
  { loc: `${SITE}/os/`, lastmod: '2026-06-04', priority: '0.6' },
  { loc: `${SITE}/kontakt.html`, lastmod: '2026-06-04', priority: '0.5' },
];
const postUrls = posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}.html`, lastmod: p.date, priority: '0.7' }));

emit('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`);

/* ── 5. blog/<slug>.html — eine echte Seite je Beitrag ───────────────────── */

const FAVICON = readFileSync(join(BLOG, 'index.html'), 'utf8')
  .match(/<link rel="icon" type="image\/svg\+xml"[^>]*>/)[0];

for (const [i, p] of posts.entries()) {
  const prev = posts[i + 1]; // aelter
  const next = posts[i - 1]; // neuer
  const body = bodyOf(p);
  const ogImage = p.thumb ? `${SITE}/blog/${p.thumb}` : `${SITE}/full/niklas-fauteck-profile.jpg`;
  const desc = p.excerpt || `${p.title} — Blog von Niklas Fauteck.`;

  emit(`blog/${p.slug}.html`, `<!DOCTYPE html>
<!-- Erzeugt von scripts/build.mjs aus blog/${p.slug}.md — nicht von Hand aendern. -->
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)} — Blog — Niklas Fauteck</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="author" content="Niklas Fauteck">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${SITE}/blog/${p.slug}.html">
  <meta property="og:image" content="${ogImage}">
  <meta property="article:published_time" content="${p.date}">
${p.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}">`).join('\n')}
  <link rel="canonical" href="${SITE}/blog/${p.slug}.html">
  <link rel="alternate" type="application/rss+xml" title="Blog — Niklas Fauteck" href="../feed.xml">
  <link rel="stylesheet" href="../fonts/fonts.css">
  <link rel="stylesheet" href="../shared.css">
  ${FAVICON}
  <link rel="icon" type="image/x-icon" href="../full/favicon.ico">
  <link rel="apple-touch-icon" href="../full/favicon-192.png">
  <link rel="stylesheet" href="blog.css">
</head>
<body>
  <!-- Skip to content (Accessibility) -->
  <a href="#inhalt" class="sr-only sr-only-focusable">Zum Inhalt springen</a>

  <div id="shared-nav"></div>

  <div class="container">
    <main id="inhalt">
      <div class="post-view active">
        <a href="./" class="back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Alle Beiträge
        </a>
        <div class="blog-layout">
          <div class="blog-main">
            <article class="post-content">
              <h1>${esc(p.title)}</h1>
              <div class="post-content-meta"><time datetime="${p.date}">${BlogRender.formatDateDE(p.date)}</time>${p.tags.map((t) => `<span class="post-tag">${esc(t)}</span>`).join('')}</div>
${body}
            </article>
            <nav class="post-nav" aria-label="Weitere Beiträge">
              ${prev ? `<a class="post-nav-prev" href="${prev.slug}.html" rel="prev"><span>Älterer Beitrag</span>${esc(prev.title)}</a>` : '<span></span>'}
              ${next ? `<a class="post-nav-next" href="${next.slug}.html" rel="next"><span>Neuerer Beitrag</span>${esc(next.title)}</a>` : '<span></span>'}
            </nav>
          </div>
          <aside class="blog-sidebar">
            <div class="rss-cta rss-cta-sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
              <div>
                <strong>Keine neuen Beiträge verpassen</strong>
                <p>Abonniere den Blog per RSS Feed und erhalte neue Posts direkt in deinem Feedreader.</p>
              </div>
              <a href="../feed.xml" class="rss-cta-btn" target="_blank" rel="noopener">RSS Feed abonnieren</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
    <div id="shared-footer">
      <!-- Statische Fassung: components.js ersetzt diesen Block per outerHTML.
           Steht hier, damit die Pflichtangaben nicht am JavaScript haengen. -->
      <footer class="footer">
        <a href="../kontakt.html" class="footer-contact">Kontakt</a>
        <a href="../impressum.html">Impressum</a>
        &middot;
        <a href="../datenschutz.html">Datenschutz</a>
        &middot;
        <a href="../agb.html">AGB</a>
        &middot;
        <a href="../NOTICE" target="_blank" rel="noopener">Open-Source-Lizenzen</a>
      </footer>
    </div>
  </div>

  <div id="shared-overlays"></div>
  <script src="../components.js"></script>
  <script src="../shared.js"></script>
</body>
</html>
`);
}

/* ── Ergebnis ────────────────────────────────────────────────────────────── */

if (check) {
  if (drift.length) {
    console.error('Abgeleitete Dateien passen nicht zu blog/*.md:');
    drift.forEach((f) => console.error('  ' + f));
    console.error('\nBeheben mit: node scripts/build.mjs');
    process.exit(1);
  }
  console.log(`ok — ${posts.length} Beiträge, abgeleitete Dateien aktuell`);
} else {
  console.log(`fertig — ${posts.length} Beiträge, ${Object.keys(sizes).length} Bilder vermessen`);
}
