/**
 * scripts/guard.mjs — rechnet nach, was sonst niemand nachrechnet.
 *
 * Prueft vier Sorten von Aussagen, die im Repo still veralten koennen:
 *
 *   1. Abgeleitete Dateien (posts.json, feed.xml, sitemap.xml, die
 *      Beitragsseiten) passen zum Bestand in blog/*.md.
 *   2. Die Skalen aus DESIGN.md werden in der CSS auch eingehalten.
 *   3. Jedes statische <img> traegt width und height.
 *   4. Zu jedem JPG/PNG gibt es eine WebP-Variante.
 *
 * Exit-Code 1 bei jeder Abweichung. Laeuft in GitHub Actions mit nichts ausser
 * Node — deshalb keine Abhaengigkeit, auch nicht fuer die Bildmasse.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const fail = (bereich, text) => problems.push(`[${bereich}] ${text}`);

const read = (p) => readFileSync(join(ROOT, p), 'utf8');

function walk(dir, filter, out = []) {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
    if (e.isDirectory()) walk(rel, filter, out);
    else if (filter(rel)) out.push(rel);
  }
  return out;
}

/* ── 1. Abgeleitete Dateien ──────────────────────────────────────────────── */

try {
  execFileSync(process.execPath, [join(ROOT, 'scripts/build.mjs'), '--check'], { stdio: 'pipe' });
} catch (err) {
  const out = `${err.stdout || ''}${err.stderr || ''}`.trim();
  fail('abgeleitet', out || 'scripts/build.mjs --check ist fehlgeschlagen');
}

/* ── 2. Design-Skalen aus DESIGN.md ──────────────────────────────────────── */

// Die Skalen stehen im YAML-Kopf von DESIGN.md. Sie hier zu wiederholen waere
// genau die Kopie, die als naechstes auseinanderlaeuft — also gelesen.
const design = read('DESIGN.md');

function scaleValues(block, unit) {
  const m = design.match(new RegExp(`^${block}:\\n([\\s\\S]*?)\\n(?=\\S|#)`, 'm'));
  if (!m) throw new Error(`DESIGN.md: Block "${block}" nicht gefunden`);
  return new Set([...m[1].matchAll(new RegExp(`(\\d+)${unit}`, 'g'))].map((x) => x[1]));
}

const radien = scaleValues('rounded', 'px');
const dauern = scaleValues('animation', 'ms');
const cssFiles = ['style.css', 'shared.css', 'blog/blog.css'];

for (const file of cssFiles) {
  const css = read(file);

  for (const m of css.matchAll(/border-radius: *([^;]+);/g)) {
    for (const v of m[1].matchAll(/\b(\d+)px\b/g)) {
      if (!radien.has(v[1])) fail('radien', `${file}: border-radius ${v[1]}px steht nicht in der Skala (DESIGN.md rounded)`);
    }
  }

  // Nur transition — Keyframe-Animationen haben eigene, laengere Dauern.
  for (const m of css.matchAll(/transition[^;{}]*/g)) {
    for (const v of m[0].matchAll(/\b(\d*\.?\d+)(m?s)\b/g)) {
      const ms = v[2] === 'ms' ? Number(v[1]) : Number(v[1]) * 1000;
      if (ms < 1) continue; // 0.01ms aus dem reduced-motion-Block
      if (!dauern.has(String(ms))) {
        fail('motion', `${file}: transition-Dauer ${v[0]} (${ms}ms) steht nicht in der Skala (DESIGN.md animation.duration)`);
      }
    }
  }

  // Rohe z-index-Werte oberhalb der Komponenten-Ebene gehoeren auf ein Token.
  for (const m of css.matchAll(/z-index: *(\d+);/g)) {
    if (Number(m[1]) > 1000) fail('z-index', `${file}: z-index ${m[1]} ohne Token — DESIGN.md fuehrt die Skala`);
  }
}

// Der Content-Layer hat keine simulierten Apps und damit keinen Grund fuer
// Hex-Literale. Der OS-Layer hat ihn (siehe DESIGN.md, Do's and Don'ts).
// Der :root-Block ist die Heimat der Werte — dort steht Hex korrekterweise.
// Ausserhalb ist ein Literal ein Token, das jemand nicht angelegt hat.
const sharedOhneRoot = read('shared.css').replace(/:root \{[\s\S]*?\n\}/, '');
const FARB_AUSNAHMEN = ['#fff', '#ffffff', '#000', '#ccc']; // Druck-Stylesheet, Weiss auf Akzent
for (const m of sharedOhneRoot.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
  if (!FARB_AUSNAHMEN.includes(m[0].toLowerCase())) {
    fail('farbe', `shared.css: Hex-Literal ${m[0]} ausserhalb von :root — der Content-Layer arbeitet mit Tokens`);
  }
}

// Schatten im Content-Layer sind ins Gruen getoent (DESIGN.md elevation.content-*).
// Reines Schwarz gehoert dem OS-Layer, wo der Grund fast schwarz ist. Geprueft
// werden auch die <style>-Bloecke der Content-Seiten — dort standen sie zuletzt.
const CONTENT_DATEIEN = [
  'shared.css', 'blog/blog.css', 'index.html', 'full/index.html',
  'kontakt.html', '404.html', 'agb.html', 'impressum.html', 'datenschutz.html',
];
for (const file of CONTENT_DATEIEN) {
  for (const m of read(file).matchAll(/box-shadow: *[^;]*rgba\(0, *0, *0[^;]*/g)) {
    fail('schatten', `${file}: ungetoenter Schatten — ${m[0].slice(0, 60)}`);
  }
}

/* ── 3. Bildmasse in statischem HTML ─────────────────────────────────────── */

const htmlFiles = walk('.', (p) => p.endsWith('.html'));
for (const file of htmlFiles) {
  const html = read(file);
  for (const m of html.matchAll(/<img\s[^>]*>/g)) {
    const tag = m[0];
    if (tag.includes('${') || tag.includes("' +")) continue; // JS-Vorlage, nicht statisch
    if (/^<img[^>]*\bsrc="(https?:|data:)/.test(tag)) continue;
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) {
      fail('bildmasse', `${file}: <img> ohne width/height — ${tag.slice(0, 80)}…`);
    }
  }
}

// Ein Verzeichnisbaum in Prosa ist eine handgepflegte Aufzaehlung und damit
// die Sorte Doku, die still veraltet. Also nachrechnen statt glauben.
const baum = read('docs/architecture.md').match(/```\n\/\n([\s\S]*?)```/);
if (!baum) {
  fail('baum', 'docs/architecture.md: Verzeichnisbaum nicht gefunden');
} else {
  const genannt = new Set([...baum[1].matchAll(/^[├└]── ([^\s#]+)/gm)].map((m) => m[1].replace(/\/$/, '')));
  const IGNORIEREN = new Set(['.git', '.claude']); // Werkzeug-Verzeichnisse, nicht Teil der Seite
  for (const e of readdirSync(ROOT, { withFileTypes: true })) {
    if (IGNORIEREN.has(e.name)) continue;
    if (!genannt.has(e.name)) {
      fail('baum', `docs/architecture.md: ${e.name}${e.isDirectory() ? '/' : ''} fehlt im Verzeichnisbaum`);
    }
  }
  for (const name of genannt) {
    if (name.includes('<') || name.includes('*')) continue; // Platzhalter
    if (!existsSync(join(ROOT, name))) {
      fail('baum', `docs/architecture.md: ${name} steht im Baum, existiert aber nicht`);
    }
  }
}

/* ── 4. WebP-Varianten ───────────────────────────────────────────────────── */

// Eine Ausnahme mit Grund ist eine Entscheidung; eine Ausnahme ohne Grund ist
// der Anfang des naechsten Drifts.
const OHNE_WEBP = {
  'blog/images/todoteck/todoteck-mcp.png':
    'WebP faellt hier groesser aus als das PNG (Screenshot mit wenigen Farben)',
};

for (const img of walk('.', (p) => /\.(jpe?g|png)$/i.test(p))) {
  if (OHNE_WEBP[img]) continue;
  const webp = img.replace(/\.(jpe?g|png)$/i, '.webp');
  if (!existsSync(join(ROOT, webp))) {
    fail('webp', `${img}: keine WebP-Variante — erzeugen oder in OHNE_WEBP begruenden`);
    continue;
  }
  if (statSync(join(ROOT, webp)).size >= statSync(join(ROOT, img)).size) {
    fail('webp', `${webp} ist nicht kleiner als ${img} — dann ist die Variante sinnlos`);
  }
}

/* ── Ergebnis ────────────────────────────────────────────────────────────── */

if (problems.length) {
  console.error(`${problems.length} Abweichung(en):\n`);
  problems.forEach((p) => console.error('  ' + p));
  console.error('\nAbgeleitete Dateien erneuern: node scripts/build.mjs');
  process.exit(1);
}
console.log('guard: alles deckungsgleich');
