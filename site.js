/* Happy Emily motion layer — progressive enhancement, no external libraries */
(function () {
  'use strict';
  function boot(root) {
    root = root || document;
    var targets = root.querySelectorAll('.hero > div:first-child, .hero-photo, .title-row, .cat, .intro-card, .quote, .portrait, .about-split > div:last-child, .newsletter > div, .newsletter form, .page-banner, .post, .contact-card, .contact-form, .container-narrow, .section > .note');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    targets.forEach(function (el, i) {
      if (el.dataset.heObserved) return;
      el.dataset.heObserved = '1';
      el.classList.add('he-reveal');
      el.style.setProperty('--he-delay', ((i % 3) * 85) + 'ms');
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('he-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
    targets.forEach(function (el) { obs.observe(el); });
  }
  function init() {
    boot(document);
    /* Elementor can insert widgets after initial DOM readiness. */
    if (window.elementorFrontend && window.elementorFrontend.hooks) {
      window.elementorFrontend.hooks.addAction('frontend/element_ready/html.default', function (scope) {
        boot(scope && scope[0] ? scope[0] : document);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
