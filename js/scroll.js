// Scroll-driven effects: fade-up reveals, progress bar
(function () {
  'use strict';

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  }

  // Thin holographic bar at the top showing how far down the card you are
  function initProgress() {
    var bar = document.getElementById('progress');
    if (!bar) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
      });
    }, { passive: true });
  }

  initReveal();
  initProgress();
})();
