/*
 * blog/lightbox.js — Bilder eines Beitrags groß ansehen.
 *
 * Ein Klick (oder Enter) auf ein Bild im Beitrag öffnet es bildschirmfüllend.
 * Pfeiltasten, die Knöpfe links und rechts oder Wischen blättern durch alle
 * Bilder des Beitrags, Escape, der Schließen-Knopf oder ein Klick daneben
 * schließen. Kein Framework, ES5-tauglich wie render.js.
 */
(function () {
  'use strict';

  var ICONS = {
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    prev: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>'
  };

  var images = [];
  var index = 0;
  var box, view, caption, counter, lastFocus, touchX = null;

  function icon(name) {
    return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] + '</svg>';
  }

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Bild vergrößert');
    box.hidden = true;
    box.innerHTML =
      '<button type="button" class="lightbox-btn lightbox-close" aria-label="Schließen">' + icon('close') + '</button>' +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Vorheriges Bild">' + icon('prev') + '</button>' +
      '<figure class="lightbox-figure"><img class="lightbox-img" alt=""><figcaption class="lightbox-caption"></figcaption></figure>' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Nächstes Bild">' + icon('next') + '</button>' +
      '<div class="lightbox-counter" aria-live="polite"></div>';
    document.body.appendChild(box);

    view = box.querySelector('.lightbox-img');
    caption = box.querySelector('.lightbox-caption');
    counter = box.querySelector('.lightbox-counter');

    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', function () { show(index - 1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { show(index + 1); });
    // Klick auf den dunklen Rand schließt, Klick aufs Bild nicht
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.className === 'lightbox-figure') close();
    });
    box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    });
  }

  function show(i) {
    index = (i + images.length) % images.length;
    var img = images[index];
    view.src = img.currentSrc || img.src;
    view.alt = img.alt;
    caption.textContent = img.alt;
    counter.textContent = images.length > 1 ? (index + 1) + ' / ' + images.length : '';
    box.querySelector('.lightbox-prev').hidden = images.length < 2;
    box.querySelector('.lightbox-next').hidden = images.length < 2;
  }

  function open(img) {
    if (!box) build();
    lastFocus = document.activeElement;
    show(images.indexOf(img));
    box.hidden = false;
    document.documentElement.classList.add('lightbox-open');
    box.querySelector('.lightbox-close').focus();
  }

  function close() {
    box.hidden = true;
    view.removeAttribute('src');
    document.documentElement.classList.remove('lightbox-open');
    if (lastFocus) lastFocus.focus();
  }

  function onKey(e) {
    if (!box || box.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') { show(index - 1); return; }
    if (e.key === 'ArrowRight') { show(index + 1); return; }
    // Fokus bleibt im Dialog
    if (e.key === 'Tab') {
      var btns = box.querySelectorAll('button:not([hidden])');
      var first = btns[0], last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }

  function init() {
    images = Array.prototype.slice.call(document.querySelectorAll('.post-content .post-figure img'));
    images.forEach(function (img) {
      img.classList.add('zoomable');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Vergrößern: ' + img.alt);
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    });
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
