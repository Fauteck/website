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
    .replace(/(<source[^>]+srcset=")(?!https?:)/g, `$1${prefix}`)
    .replace(/(<a href=")(?!https?:|mailto:|#)/g, `$1${prefix}`);
}

// Ueberschrift 1 steht bereits im <title> und im Seitenkopf; im Rumpf waere sie
// doppelt.
// Aeltere Beitraege verlinken einander als `#slug` (die Hash-Form des frueheren
// Single-Page-Blogs). Auf einer eigenen Seite waere das ein toter Anker, der
// obendrein in einem neuen Tab oeffnet — also auf die Beitragsseite umbiegen.
const slugSet = new Set(posts.map((p) => p.slug));
const bodyOf = (p) => BlogRender.renderMarkdown(p.md)
  .replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, '')
  .replace(/<a href="#([a-z0-9-]+)" target="_blank" rel="noopener">/g,
    (m, slug) => (slugSet.has(slug) ? `<a href="${slug}.html">` : m));

const PERSON = { '@type': 'Person', name: 'Niklas Fauteck', url: `${SITE}/` };

// JSON-LD in einem <script>: "<" maskieren, damit ein "</script>" im Text den
// Block nicht beenden kann.
const ldScript = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const PROFILE_IMG = 'full/niklas-fauteck-profile.jpg';
const profileSize = imageSize(join(ROOT, PROFILE_IMG));

// Gemeinsame Kopfzeilen fuer Teilen und Suchmaschinen: Open Graph, Twitter-Karte.
function shareMeta({ image, dims, alt }) {
  return [
    `  <meta property="og:image" content="${image}">`,
    dims ? `  <meta property="og:image:width" content="${dims[0]}">` : '',
    dims ? `  <meta property="og:image:height" content="${dims[1]}">` : '',
    alt ? `  <meta property="og:image:alt" content="${esc(alt)}">` : '',
    '  <meta property="og:locale" content="de_DE">',
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:image" content="${image}">`,
  ].filter(Boolean).join('\n');
}

// Der Font-Preload spart die Kette HTML -> CSS -> @font-face -> woff2: ohne ihn
// beginnt der Download der Schrift erst, wenn fonts.css geparst ist.
const FONT_PRELOAD =
  '<link rel="preload" href="../fonts/ibm-plex-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>';


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

/* ── 5. blog/index.html — Kartenliste und Strukturdaten ──────────────────── */

// Die Uebersicht war eine leere Huelle, die per JavaScript 31 Dateien nachlud
// (posts.json, sizes.json, alle .md) und erst danach eine Liste zeigte. Jetzt
// steht die Liste fertig im HTML: kein Skelett, keine Requests, lesbar ohne JS
// und fuer Suchmaschinen sofort vollstaendig. blog/index.html bleibt eine von
// Hand gepflegte Seite; nur die zwei markierten Bloecke werden hier ersetzt.
const IMG_RE = /\.(jpe?g|png)$/i;

function cardHtml(p, featured) {
  let thumb = '';
  if (p.thumb) {
    const webp = IMG_RE.test(p.thumb)
      ? `<source srcset="${esc(p.thumb.replace(IMG_RE, '.webp'))}" type="image/webp">` : '';
    // Die erste Karte ist das groesste Bild oberhalb der Falz: sofort laden,
    // statt es wie die uebrigen nachzuladen.
    const load = featured ? ' fetchpriority="high"' : ' loading="lazy"';
    thumb = `<div class="post-thumb"><picture>${webp}<img src="${esc(p.thumb)}" alt="${esc(p.thumbAlt)}"` +
      `${BlogRender.imageAttrs(p.thumb)}${load}></picture></div>`;
  }
  const cls = ['post-item', p.thumb && 'post-item--with-image', featured && 'post-item--featured']
    .filter(Boolean).join(' ');
  return `<li class="${cls}">` +
    `<a href="${encodeURIComponent(p.slug)}.html">${thumb}` +
    '<div class="post-body">' +
    `<div class="post-meta"><span class="post-date">${BlogRender.formatDateDE(p.date)}</span>` +
    `${p.tags.map((t) => `<span class="post-tag">${esc(t)}</span>`).join('')}</div>` +
    `<h3 class="post-title">${esc(p.title)}</h3>` +
    `<p class="post-excerpt">${esc(p.excerpt)}</p>` +
    '</div></a></li>';
}

const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];
const listHtml = years.map((y) => {
  const inYear = posts.filter((p) => p.date.startsWith(y));
  return `<section class="post-year" aria-labelledby="jahr-${y}">\n` +
    `  <h2 class="post-year-label" id="jahr-${y}">${y}<span class="post-year-count">${inYear.length}</span></h2>\n` +
    `  <ul class="post-list">\n${inYear.map((p) => '    ' + cardHtml(p, p === posts[0])).join('\n')}\n  </ul>\n</section>`;
}).join('\n');

const blogLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE}/blog/`,
  name: 'Blog — Niklas Fauteck',
  url: `${SITE}/blog/`,
  inLanguage: 'de',
  author: PERSON,
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE}/blog/${p.slug}.html`,
    datePublished: p.date,
  })),
};

const seoHead = [
  shareMeta({ image: `${SITE}/${PROFILE_IMG}`, dims: profileSize && [profileSize.width, profileSize.height] }),
  '  ' + ldScript(blogLd),
].join('\n');

function replaceBetween(html, name, content) {
  const re = new RegExp(`(<!-- ${name}:start[^>]*-->)[\\s\\S]*?(<!-- ${name}:end -->)`);
  if (!re.test(html)) throw new Error(`blog/index.html: Marker "${name}:start/end" fehlen`);
  return html.replace(re, (m, a, b) => `${a}\n${content}\n${b}`);
}

{
  const src = readFileSync(join(BLOG, 'index.html'), 'utf8');
  let out = replaceBetween(src, 'seo', seoHead);
  out = replaceBetween(out, 'posts', listHtml);
  emit('blog/index.html', out);
}

/* ── 6. blog/<slug>.html — eine echte Seite je Beitrag ───────────────────── */

const FAVICON = readFileSync(join(BLOG, 'index.html'), 'utf8')
  .match(/<link rel="icon" type="image\/svg\+xml"[^>]*>/)[0];

for (const [i, p] of posts.entries()) {
  const prev = posts[i + 1]; // aelter
  const next = posts[i - 1]; // neuer
  // Das erste Bild liegt meist oberhalb der Falz und ist damit der LCP-Kandidat:
  // nicht nachladen, sondern priorisieren.
  const body = bodyOf(p).replace(' loading="lazy"', ' fetchpriority="high"');
  const ogImage = p.thumb ? `${SITE}/blog/${p.thumb}` : `${SITE}/${PROFILE_IMG}`;
  const ogDims = p.thumb ? sizes[p.thumb] : profileSize && [profileSize.width, profileSize.height];
  const desc = p.excerpt || `${p.title} — Blog von Niklas Fauteck.`;
  const url = `${SITE}/blog/${p.slug}.html`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: desc,
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: 'de',
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [ogImage],
    keywords: p.tags.join(', '),
    author: PERSON,
    publisher: PERSON,
    isPartOf: { '@type': 'Blog', '@id': `${SITE}/blog/`, name: 'Blog — Niklas Fauteck' },
  };

  // Verwandte Beitraege: die meisten gemeinsamen Tags, bei Gleichstand der
  // zeitlich naechste. Ohne gemeinsamen Tag kein Eintrag — lieber nichts als
  // Beliebiges.
  const related = posts
    .filter((q) => q !== p)
    .map((q) => ({ q, shared: q.tags.filter((t) => p.tags.includes(t)) }))
    .filter((x) => x.shared.length)
    .sort((a, b) => b.shared.length - a.shared.length ||
      Math.abs(Date.parse(a.q.date) - Date.parse(p.date)) - Math.abs(Date.parse(b.q.date) - Date.parse(p.date)))
    .slice(0, 3);
  const relatedHtml = related.length
    ? `            <section class="post-related" aria-labelledby="weiterlesen">
              <h2 id="weiterlesen">Weiterlesen</h2>
              <ul>
${related.map(({ q, shared }) => `                <li><a href="${q.slug}.html"><span class="post-related-meta">${BlogRender.formatDateDE(q.date)} · ${shared.map(esc).join(', ')}</span><span class="post-related-title">${esc(q.title)}</span></a></li>`).join('\n')}
              </ul>
            </section>
`
    : '';

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
  <meta property="og:url" content="${url}">
${shareMeta({ image: ogImage, dims: ogDims, alt: p.thumb ? p.thumbAlt : '' })}
  <meta property="article:published_time" content="${p.date}">
  <meta property="article:author" content="${SITE}/">
${p.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}">`).join('\n')}
  <link rel="canonical" href="${url}">
  <link rel="alternate" type="application/rss+xml" title="Blog — Niklas Fauteck" href="../feed.xml">
  ${FONT_PRELOAD}
  <link rel="stylesheet" href="../fonts/fonts.css">
  <link rel="stylesheet" href="../shared.css">
  ${FAVICON}
  <link rel="icon" type="image/x-icon" href="../full/favicon.ico">
  <link rel="apple-touch-icon" href="../full/favicon-192.png">
  <link rel="stylesheet" href="blog.css">
  ${ldScript(ld)}
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
${relatedHtml}            <nav class="post-nav" aria-label="Weitere Beiträge">
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
  <script src="../components.js" defer></script>
  <script src="../shared.js" defer></script>
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
