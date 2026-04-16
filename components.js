/**
 * Shared Components
 * Injiziert Navigation, Footer und Confirmation-Overlays in Platzhalter-Elemente.
 * Muss vor shared.js eingebunden werden.
 */
(function() {
  // Pfad-Prefix fuer Unterverzeichnisse (blog/, full/)
  var base = '';
  var path = window.location.pathname;
  if (/\/(blog|full)\//.test(path)) {
    base = '../';
  }

  // --- Navigation ---
  var navEl = document.getElementById('shared-nav');
  if (navEl) {
    navEl.outerHTML =
      '<nav role="navigation" aria-label="Hauptnavigation">' +
        '<div class="nav-inner">' +
          '<a href="' + base + './" class="logo">' +
            '<span class="logo-name">Niklas Fauteck</span>' +
            '<span class="logo-subtitle">Digital Transformation</span>' +
          '</a>' +
          '<ul>' +
            '<li><a href="' + base + 'full/">CV</a></li>' +
            '<li><a href="https://fauteck.github.io/vibecoding-academy/" target="_blank" rel="noopener" data-overlay="academy">Vibecoding Academy</a></li>' +
            '<li><a href="' + base + 'blog/">Blog</a></li>' +
            '<li><a href="' + base + 'os/" data-overlay="os">OS</a></li>' +
          '</ul>' +
          '<div class="mobile-toggle" aria-label="Menu Toggle">' +
            '<span></span><span></span><span></span>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  // --- Footer ---
  var footerEl = document.getElementById('shared-footer');
  if (footerEl) {
    footerEl.outerHTML =
      '<footer class="footer">' +
        '<a href="' + base + 'kontakt.html" class="footer-contact">Kontakt</a>' +
        '<a href="' + base + 'impressum.html">Impressum</a>' +
        ' &middot; ' +
        '<a href="' + base + 'datenschutz.html">Datenschutz</a>' +
        ' &middot; ' +
        '<a href="' + base + 'agb.html">AGB</a>' +
        ' &middot; ' +
        '<a href="' + base + 'NOTICE" target="_blank" rel="noopener">Open-Source-Lizenzen</a>' +
      '</footer>';
  }

  // --- Confirmation Overlays ---
  var overlayEl = document.getElementById('shared-overlays');
  if (overlayEl) {
    overlayEl.outerHTML =
      '<!-- Confirmation Overlay: OS -->' +
      '<div class="confirm-overlay" id="overlay-os">' +
        '<div class="confirm-box">' +
          '<div class="confirm-icon os-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' +
          '</div>' +
          '<h3>Mein Desktop wird gestartet\u00a0...</h3>' +
          '<p>Du verl\u00e4sst jetzt die klassische Website und betrittst ein interaktives Desktop-Erlebnis. Die Seite sieht bewusst v\u00f6llig anders aus \u2014 wie ein pers\u00f6nlicher Computer, der gerade hochf\u00e4hrt.</p>' +
          '<div class="confirm-buttons">' +
            '<button class="confirm-btn confirm-btn-cancel" id="overlay-os-cancel">Abbrechen</button>' +
            '<button class="confirm-btn confirm-btn-ok" id="overlay-os-ok">Weiter</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<!-- Confirmation Overlay: Vibecoding Academy -->' +
      '<div class="confirm-overlay" id="overlay-academy">' +
        '<div class="confirm-box">' +
          '<div class="confirm-icon academy-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>' +
          '</div>' +
          '<h3>Weiterleitung zur Vibecoding Academy</h3>' +
          '<p>Du wirst jetzt zur Vibecoding Academy weitergeleitet \u2014 der Workshop-Website rund um KI-gest\u00fctztes Vibecoding. Die Seite hat ein eigenst\u00e4ndiges Design und \u00f6ffnet sich in einem neuen Tab.</p>' +
          '<div class="confirm-buttons">' +
            '<button class="confirm-btn confirm-btn-cancel" id="overlay-academy-cancel">Abbrechen</button>' +
            '<button class="confirm-btn confirm-btn-ok" id="overlay-academy-ok">Weiter</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
})();
