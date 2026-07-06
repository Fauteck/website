/*
 * admin.js — Blog-Beitrag im Browser anlegen und als Pull Request auf GitHub
 * veröffentlichen. Nutzt die GitHub Git-Data-API für einen atomaren
 * Multi-File-Commit (neue .md + Bilder + posts.json + feed.xml + sitemap.xml)
 * auf einem neuen Branch, dann einen PR gegen main. Kein Backend.
 */
(function () {
  'use strict';

  var OWNER = 'Fauteck';
  var REPO = 'website';
  var BASE_BRANCH = 'main';
  var SITE = 'https://niklasfauteck.de';
  var TOKEN_KEY = 'gh_blog_token';
  var B = window.BlogRender;

  var $ = function (id) { return document.getElementById(id); };
  var images = []; // { name, path (repo), rel (images/slug/..), b64, isThumb }

  // ---------- Helfer ----------

  function utf8ToB64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function b64ToUtf8(b64) {
    return decodeURIComponent(escape(atob(b64.replace(/\s+/g, ''))));
  }
  function xmlEscape(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function sanitizeFilename(name) {
    var dot = name.lastIndexOf('.');
    var base = dot > 0 ? name.slice(0, dot) : name;
    var ext = dot > 0 ? name.slice(dot).toLowerCase() : '';
    base = base.toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return (base || 'bild') + ext;
  }
  function currentSlug() {
    return (B.slugify($('slug').value || $('title').value) || '').trim();
  }
  function setStatus(el, msg, kind) {
    el.textContent = msg;
    el.className = 'status' + (kind ? ' ' + kind : '');
  }
  function log(msg) {
    var el = $('log');
    el.classList.add('show');
    el.textContent += msg + '\n';
    el.scrollTop = el.scrollHeight;
  }

  // ---------- Token ----------

  function loadToken() {
    var t = localStorage.getItem(TOKEN_KEY);
    if (t) { $('token').value = t; setStatus($('tokenStatus'), 'Token aus diesem Browser geladen.', 'ok'); }
  }
  $('saveToken').addEventListener('click', function () {
    var t = $('token').value.trim();
    if (!t) { setStatus($('tokenStatus'), 'Kein Token eingegeben.', 'err'); return; }
    localStorage.setItem(TOKEN_KEY, t);
    setStatus($('tokenStatus'), 'Token gespeichert.', 'ok');
  });
  $('clearToken').addEventListener('click', function () {
    localStorage.removeItem(TOKEN_KEY);
    $('token').value = '';
    setStatus($('tokenStatus'), 'Token gelöscht.', 'ok');
  });

  // ---------- Slug / Datum ----------

  var slugTouched = false;
  $('slug').addEventListener('input', function () { slugTouched = true; });
  $('title').addEventListener('input', function () {
    if (!slugTouched) $('slug').value = B.slugify($('title').value);
    updatePreview();
  });
  (function initDate() {
    var d = new Date();
    var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    $('date').value = iso;
  })();

  // ---------- Bilder ----------

  function readFileB64(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(String(fr.result).split(',')[1]); };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }
  function renderImgList() {
    var ul = $('imglist');
    ul.innerHTML = '';
    images.forEach(function (img, i) {
      var li = document.createElement('li');
      var badge = img.isThumb ? '<span class="thumb-badge">Titelbild</span>' : '';
      li.innerHTML = badge + '<code>' + img.rel + '</code>';
      if (!img.isThumb) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'In Text einfügen';
        btn.addEventListener('click', function () { insertAtCursor('\n![' + (img.name) + '](' + img.rel + ')\n'); });
        li.appendChild(btn);
      }
      ul.appendChild(li);
    });
  }
  function recomputePaths() {
    var slug = currentSlug();
    images.forEach(function (img) {
      img.rel = 'images/' + slug + '/' + img.file;
      img.path = 'blog/images/' + slug + '/' + img.file;
    });
    renderImgList();
  }
  $('thumbFile').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    readFileB64(file).then(function (b64) {
      images = images.filter(function (x) { return !x.isThumb; });
      var fname = sanitizeFilename(file.name);
      images.unshift({ name: file.name, file: fname, b64: b64, isThumb: true });
      recomputePaths();
    });
  });
  $('inlineFiles').addEventListener('change', function (e) {
    var files = Array.prototype.slice.call(e.target.files);
    Promise.all(files.map(function (file) {
      return readFileB64(file).then(function (b64) {
        return { name: file.name, file: sanitizeFilename(file.name), b64: b64, isThumb: false };
      });
    })).then(function (added) {
      images = images.concat(added);
      recomputePaths();
    });
  });
  function insertAtCursor(text) {
    var ta = $('body');
    var start = ta.selectionStart, end = ta.selectionEnd;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    ta.selectionStart = ta.selectionEnd = start + text.length;
    ta.focus();
    updatePreview();
  }

  // ---------- Vorschau ----------

  function bodyWithTitle() {
    var body = $('body').value;
    var title = $('title').value.trim();
    if (!/^\s*#\s+/.test(body) && title) {
      return '# ' + title + '\n\n' + body;
    }
    return body;
  }
  function updatePreview() {
    $('preview').innerHTML = B.renderMarkdown(bodyWithTitle());
  }
  $('body').addEventListener('input', updatePreview);
  ['excerpt', 'tags', 'date', 'thumbAlt', 'slug'].forEach(function (id) {
    $(id).addEventListener('input', function () { if (id === 'slug') recomputePaths(); });
  });

  // ---------- Markdown / Frontmatter zusammenbauen ----------

  function buildMarkdown() {
    var title = $('title').value.trim();
    var date = $('date').value.trim();
    var tags = $('tags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    var excerpt = $('excerpt').value.trim().replace(/\s+/g, ' ');
    var thumb = images.filter(function (x) { return x.isThumb; })[0];
    var thumbAlt = $('thumbAlt').value.trim();

    var fm = ['---'];
    fm.push('title: "' + title.replace(/"/g, "'") + '"');
    fm.push('date: ' + date);
    fm.push('tags: [' + tags.join(', ') + ']');
    if (excerpt) fm.push('excerpt: "' + excerpt.replace(/"/g, "'") + '"');
    if (thumb) {
      fm.push('thumb: ' + thumb.rel);
      if (thumbAlt) fm.push('thumbAlt: "' + thumbAlt.replace(/"/g, "'") + '"');
    }
    fm.push('---');
    return fm.join('\n') + '\n\n' + bodyWithTitle().replace(/\s*$/, '') + '\n';
  }

  // ---------- RFC-822-Datum mit Europe/Berlin-Offset ----------

  function rfc822(dateIso) {
    var d = new Date(dateIso + 'T00:00:00');
    // Offset für Europe/Berlin an diesem Datum bestimmen
    var off = '+0100';
    try {
      var s = d.toLocaleString('en-US', { timeZone: 'Europe/Berlin', timeZoneName: 'shortOffset' });
      var m = s.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
      if (m) off = m[1] + String(m[2]).padStart(2, '0') + (m[3] || '00');
    } catch (e) {}
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + ' ' + months[d.getMonth()] +
      ' ' + d.getFullYear() + ' 00:00:00 ' + off;
  }

  // ---------- Body → Feed-HTML (absolute Bild-URLs, ohne Titel-H1) ----------

  function feedHtml(slug) {
    var body = $('body').value;
    body = body.replace(/^\s*#\s+.*(\r?\n)+/, ''); // führende H1 (Titel) entfernen
    var html = B.renderMarkdown(body);
    // Bildpfade absolut machen
    html = html.replace(/src="images\//g, 'src="' + SITE + '/blog/images/');
    // <figure class="post-figure"><img …></figure> → <p><img … /></p> (Feed-Stil)
    html = html.replace(/<figure class="post-figure">(<img[^>]*>)<\/figure>/g, function (_, img) {
      return '<p>' + img.replace(/>$/, ' />') + '</p>';
    });
    return html.replace(/\]\]>/g, ']]&gt;'); // CDATA schützen
  }

  function buildFeedItem(slug, title, dateIso, tags) {
    var lines = [];
    lines.push('    <item>');
    lines.push('      <title>' + xmlEscape(title) + '</title>');
    lines.push('      <link>' + SITE + '/blog/#' + slug + '</link>');
    lines.push('      <guid isPermaLink="false">' + SITE + '/blog/#' + slug + '</guid>');
    lines.push('      <pubDate>' + rfc822(dateIso) + '</pubDate>');
    tags.forEach(function (t) { lines.push('      <category>' + xmlEscape(t) + '</category>'); });
    lines.push('      <description><![CDATA[');
    lines.push(feedHtml(slug));
    lines.push('      ]]></description>');
    lines.push('    </item>');
    return lines.join('\n');
  }

  function insertFeedItem(feedXml, itemXml, dateIso) {
    var out = feedXml.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, '<lastBuildDate>' + rfc822(dateIso) + '</lastBuildDate>');
    var idx = out.indexOf('    <item>');
    if (idx === -1) throw new Error('feed.xml: kein <item> gefunden');
    return out.slice(0, idx) + itemXml + '\n\n' + out.slice(idx);
  }

  function updateSitemap(xml, dateIso) {
    return xml.replace(
      /(<loc>https:\/\/niklasfauteck\.de\/blog\/<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/,
      '$1' + dateIso + '$2'
    );
  }

  // ---------- GitHub-API ----------

  function api(path, opts) {
    opts = opts || {};
    var token = $('token').value.trim();
    var headers = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
    if (opts.body) headers['Content-Type'] = 'application/json';
    return fetch('https://api.github.com' + path, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (r) {
      return r.text().then(function (txt) {
        var data = txt ? JSON.parse(txt) : {};
        if (!r.ok) {
          var msg = data.message || r.statusText;
          if (data.errors) msg += ' — ' + JSON.stringify(data.errors);
          throw new Error('GitHub ' + r.status + ': ' + msg);
        }
        return data;
      });
    });
  }

  function getContent(path) {
    return api('/repos/' + OWNER + '/' + REPO + '/contents/' + path + '?ref=' + BASE_BRANCH)
      .then(function (d) { return b64ToUtf8(d.content); });
  }

  function createBlob(content, encoding) {
    return api('/repos/' + OWNER + '/' + REPO + '/git/blobs', {
      method: 'POST', body: { content: content, encoding: encoding }
    }).then(function (d) { return d.sha; });
  }

  // ---------- Veröffentlichen ----------

  function validate() {
    var errs = [];
    if (!$('token').value.trim()) errs.push('Token fehlt');
    if (!$('title').value.trim()) errs.push('Titel fehlt');
    if (!currentSlug()) errs.push('Slug fehlt');
    if (!/^\d{4}-\d{2}-\d{2}$/.test($('date').value.trim())) errs.push('Datum ungültig');
    if (!$('tags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean).length) errs.push('mindestens ein Tag');
    if (!$('excerpt').value.trim()) errs.push('Anrisstext fehlt');
    if (!$('body').value.trim()) errs.push('Inhalt fehlt');
    return errs;
  }

  function publish() {
    var errs = validate();
    if (errs.length) { setStatus($('publishStatus'), 'Bitte prüfen: ' + errs.join(', '), 'err'); return; }

    var slug = currentSlug();
    var title = $('title').value.trim();
    var dateIso = $('date').value.trim();
    var tags = $('tags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    var branch = 'blog/' + slug;

    $('log').textContent = '';
    setStatus($('publishStatus'), 'Veröffentliche …', '');
    $('publish').disabled = true;

    var repo = '/repos/' + OWNER + '/' + REPO;
    var ctx = {};

    recomputePaths();

    api(repo + '/git/ref/heads/' + BASE_BRANCH)
      .then(function (ref) {
        ctx.baseCommit = ref.object.sha;
        log('Basis-Commit: ' + ctx.baseCommit.slice(0, 7));
        return api(repo + '/git/commits/' + ctx.baseCommit);
      })
      .then(function (commit) {
        ctx.baseTree = commit.tree.sha;
        // Abgeleitete Dateien holen
        return Promise.all([
          getContent('blog/posts.json'),
          getContent('feed.xml'),
          getContent('sitemap.xml')
        ]);
      })
      .then(function (files) {
        var postsArr = JSON.parse(files[0]);
        if (postsArr.indexOf(slug) === -1) postsArr.unshift(slug);
        ctx.postsJson = JSON.stringify(postsArr, null, 2) + '\n';
        var item = buildFeedItem(slug, title, dateIso, tags);
        ctx.feed = insertFeedItem(files[1], item, dateIso);
        ctx.sitemap = updateSitemap(files[2], dateIso);
        log('Abgeleitete Dateien aktualisiert (posts.json, feed.xml, sitemap.xml)');

        // Blobs anlegen: Text (utf-8) + Bilder (base64)
        var jobs = [];
        ctx.tree = [];
        function addText(path, content) {
          jobs.push(createBlob(content, 'utf-8').then(function (sha) {
            ctx.tree.push({ path: path, mode: '100644', type: 'blob', sha: sha });
          }));
        }
        addText('blog/' + slug + '.md', buildMarkdown());
        addText('blog/posts.json', ctx.postsJson);
        addText('feed.xml', ctx.feed);
        addText('sitemap.xml', ctx.sitemap);
        images.forEach(function (img) {
          jobs.push(createBlob(img.b64, 'base64').then(function (sha) {
            ctx.tree.push({ path: img.path, mode: '100644', type: 'blob', sha: sha });
          }));
        });
        return Promise.all(jobs);
      })
      .then(function () {
        log(ctx.tree.length + ' Dateien als Blobs angelegt');
        return api(repo + '/git/trees', { method: 'POST', body: { base_tree: ctx.baseTree, tree: ctx.tree } });
      })
      .then(function (tree) {
        return api(repo + '/git/commits', {
          method: 'POST',
          body: { message: 'Blog: ' + title, tree: tree.sha, parents: [ctx.baseCommit] }
        });
      })
      .then(function (commit) {
        ctx.newCommit = commit.sha;
        log('Commit: ' + commit.sha.slice(0, 7));
        return api(repo + '/git/refs', {
          method: 'POST', body: { ref: 'refs/heads/' + branch, sha: ctx.newCommit }
        }).catch(function (e) {
          // Branch existiert evtl. schon → eindeutigen Namen wählen
          if (/Reference already exists/i.test(e.message) || /422/.test(e.message)) {
            branch = 'blog/' + slug + '-' + Date.now();
            log('Branch existierte, nutze: ' + branch);
            return api(repo + '/git/refs', { method: 'POST', body: { ref: 'refs/heads/' + branch, sha: ctx.newCommit } });
          }
          throw e;
        });
      })
      .then(function () {
        log('Branch: ' + branch);
        return api(repo + '/pulls', {
          method: 'POST',
          body: {
            title: 'Blog: ' + title,
            head: branch,
            base: BASE_BRANCH,
            body: 'Neuer Blogbeitrag **' + title + '** (`' + slug + '`), erstellt über /admin/.\n\n' +
                  '- Datum: ' + dateIso + '\n- Tags: ' + tags.join(', ') + '\n\n' +
                  'Nach dem Merge deployt GitHub Pages automatisch.'
          }
        });
      })
      .then(function (pr) {
        log('Pull Request #' + pr.number + ' erstellt.');
        var el = $('publishStatus');
        el.className = 'status ok';
        el.innerHTML = 'Pull Request erstellt: <a href="' + pr.html_url + '" target="_blank" rel="noopener">#' + pr.number + ' ansehen</a>';
        $('publish').disabled = false;
      })
      .catch(function (err) {
        log('FEHLER: ' + err.message);
        setStatus($('publishStatus'), err.message, 'err');
        $('publish').disabled = false;
      });
  }

  $('publish').addEventListener('click', publish);

  // ---------- Init ----------
  loadToken();
  updatePreview();
})();
