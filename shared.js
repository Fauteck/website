/**
 * Shared Interaktionslogik
 * Mobile-Menu-Toggle und Confirmation-Overlay-Handler.
 * Muss nach components.js eingebunden werden.
 */
(function() {
  // Pfad-Prefix fuer Unterverzeichnisse (blog/, full/)
  var base = '';
  var path = window.location.pathname;
  if (/\/(blog|full)\//.test(path)) {
    base = '../';
  }

  // --- Mobile Menu Toggle ---
  var toggle = document.querySelector('.mobile-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      document.querySelector('nav ul').classList.toggle('open');
    });
  }

  // --- Confirmation Overlay Handler ---
  var osOverlay = document.getElementById('overlay-os');
  var academyOverlay = document.getElementById('overlay-academy');

  if (osOverlay && academyOverlay) {
    var osUrl = base + 'os/index.html';
    var academyUrl = 'https://fauteck.github.io/vibecoding-academy/';

    // Intercept OS links (data-overlay and direct href)
    document.querySelectorAll('[data-overlay="os"], a[href="' + base + 'os/index.html"], a[href="' + base + 'os/"]').forEach(function(link) {
      link.addEventListener('click', function(e) { e.preventDefault(); osOverlay.classList.add('active'); });
    });
    // Intercept Academy links (data-overlay and direct href)
    document.querySelectorAll('[data-overlay="academy"], a[href="' + academyUrl + '"]').forEach(function(link) {
      link.addEventListener('click', function(e) { e.preventDefault(); academyOverlay.classList.add('active'); });
    });

    document.getElementById('overlay-os-cancel').addEventListener('click', function() { osOverlay.classList.remove('active'); });
    document.getElementById('overlay-os-ok').addEventListener('click', function() { window.location.href = osUrl; });
    document.getElementById('overlay-academy-cancel').addEventListener('click', function() { academyOverlay.classList.remove('active'); });
    document.getElementById('overlay-academy-ok').addEventListener('click', function() { window.open(academyUrl, '_blank', 'noopener'); academyOverlay.classList.remove('active'); });

    [osOverlay, academyOverlay].forEach(function(overlay) {
      overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.classList.remove('active'); });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { osOverlay.classList.remove('active'); academyOverlay.classList.remove('active'); }
    });
  }
})();
