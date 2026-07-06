/*
 * blog/render.js — gemeinsame Blog-Bausteine für /blog/ und /admin/.
 *
 * Enthält den Markdown-Renderer (identisch zur früheren Inline-Version in
 * blog/index.html), einen kleinen Frontmatter-Parser (analog parseBlogMarkdown
 * in ../script.js) sowie Helfer für Datumsformat und Slug-Erzeugung.
 * Kein Build-Schritt, kein Framework — reines ES5-taugliches Vanilla-JS, damit
 * es überall auf der statischen Seite ohne Transpilation läuft.
 */
(function (global) {
  'use strict';

  // Markdown → HTML. Unterstützt Überschriften, Fett/Kursiv, Links, blanke
  // URLs, Listen, Blockzitate und block-level Bilder — genau der Umfang, den
  // die Blog-Posts nutzen.
  function renderMarkdown(md) {
    // Frontmatter entfernen
    md = md.replace(/^---[\s\S]*?---\s*/, '');

    var lines = md.split('\n');
    var html = [];
    var inList = false;
    var inBlockquote = false;
    var listType = '';

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Überschriften
      if (line.match(/^### /)) {
        closeList(); closeBlockquote();
        html.push('<h3>' + inline(line.slice(4)) + '</h3>');
        continue;
      }
      if (line.match(/^## /)) {
        closeList(); closeBlockquote();
        html.push('<h2>' + inline(line.slice(3)) + '</h2>');
        continue;
      }
      if (line.match(/^# /)) {
        closeList(); closeBlockquote();
        html.push('<h1>' + inline(line.slice(2)) + '</h1>');
        continue;
      }

      // Blockzitat
      if (line.match(/^> /)) {
        closeList();
        if (!inBlockquote) { html.push('<blockquote>'); inBlockquote = true; }
        html.push('<p>' + inline(line.slice(2)) + '</p>');
        continue;
      } else if (inBlockquote) {
        closeBlockquote();
      }

      // Ungeordnete Liste
      if (line.match(/^[-*] /)) {
        if (!inList || listType !== 'ul') { closeList(); html.push('<ul>'); inList = true; listType = 'ul'; }
        html.push('<li>' + inline(line.slice(2)) + '</li>');
        continue;
      }

      // Geordnete Liste
      var olMatch = line.match(/^\d+\. /);
      if (olMatch) {
        if (!inList || listType !== 'ol') { closeList(); html.push('<ol>'); inList = true; listType = 'ol'; }
        html.push('<li>' + inline(line.replace(/^\d+\. /, '')) + '</li>');
        continue;
      }

      // Leerzeile
      if (line.trim() === '') {
        closeList();
        continue;
      }

      // Block-Bild: ![alt](url)
      var imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (imgMatch) {
        closeList();
        html.push('<figure class="post-figure"><img src="' + imgMatch[2] + '" alt="' + imgMatch[1] + '" loading="lazy"></figure>');
        continue;
      }

      // Absatz
      closeList();
      html.push('<p>' + inline(line) + '</p>');
    }

    closeList();
    closeBlockquote();
    return html.join('\n');

    function closeList() {
      if (inList) {
        html.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = '';
      }
    }

    function closeBlockquote() {
      if (inBlockquote) {
        html.push('</blockquote>');
        inBlockquote = false;
      }
    }

    function inline(text) {
      // Fett
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Kursiv
      text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Links
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      // Blanke URLs
      text = text.replace(/(^|[^"=])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
      return text;
    }
  }

  // Eine umschließende Anführungszeichen-Paarung (") oder (') entfernen.
  function stripQuotes(val) {
    if (val.length >= 2) {
      var first = val.charAt(0);
      var last = val.charAt(val.length - 1);
      if ((first === '"' || first === "'") && first === last) {
        return val.slice(1, -1);
      }
    }
    return val;
  }

  // Frontmatter parsen. Erkennt title, date, tags, excerpt, thumb, thumbAlt.
  // Gibt { data, body } zurück (body = Markdown ohne Frontmatter-Block).
  function parseFrontmatter(md) {
    var data = { title: '', date: '', tags: [], excerpt: '', thumb: '', thumbAlt: '' };
    var body = md;
    var fm = md.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
    if (fm) {
      body = md.slice(fm[0].length);
      fm[1].split('\n').forEach(function (line) {
        var kv = line.match(/^(\w+):\s*(.*)$/);
        if (!kv) return;
        var key = kv[1];
        var val = stripQuotes(kv[2].trim());
        if (key === 'title') data.title = val;
        else if (key === 'date') data.date = val;
        else if (key === 'excerpt') data.excerpt = val;
        else if (key === 'thumb') data.thumb = val;
        else if (key === 'thumbAlt') data.thumbAlt = val;
        else if (key === 'tags') {
          data.tags = val.replace(/^\[|\]$/g, '')
            .split(',')
            .map(function (t) { return stripQuotes(t.trim()); })
            .filter(Boolean);
        }
      });
    }
    return { data: data, body: body };
  }

  // ISO-Datum (YYYY-MM-DD) → DD.MM.YYYY. Andere Formate unverändert zurück.
  function formatDateDE(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso || '').trim());
    if (!m) return iso || '';
    return m[3] + '.' + m[2] + '.' + m[1];
  }

  // Titel → Slug. Deutsche Umlaute werden transliteriert (ä→ae, ö→oe, ü→ue,
  // ß→ss), passend zu bestehenden Slugs wie "raeuberhoehle".
  function slugify(text) {
    return (text || '')
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '') // übrige Diakritika entfernen
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
  }

  global.BlogRender = {
    renderMarkdown: renderMarkdown,
    parseFrontmatter: parseFrontmatter,
    formatDateDE: formatDateDE,
    slugify: slugify
  };
})(typeof window !== 'undefined' ? window : this);
