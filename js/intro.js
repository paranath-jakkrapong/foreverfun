// Opening screen: bokeh, gold glitter and the "open invitation" transition; starts petals after opening
(function () {
  'use strict';

  var SPARKLE_COUNT = 18;
  var GLINT_COUNT = 120;
  var BOKEH_COUNT = 9;
  var BOKEH_COLORS = ['rgba(255, 214, 110, .65)', 'rgba(255, 255, 255, .6)', 'rgba(255, 150, 195, .55)', 'rgba(233, 200, 255, .6)'];
  var PETAL_COUNT = 16;
  var PETAL_LIGHT_RATIO = 0.35;
  var GOLD_DUST_COUNT = 12; // gold specks falling among the petals
  var OPEN_DURATION_MS = 900; // matches the .intro transition in css/intro.css
  var SPARKLE_COLORS = ['#FFC83D', '#FFD970', '#FFFFFF'];
  var CARD_THEME_COLOR = '#FFD3E6'; // browser bar: pale blush while the intro shows, pink once the card is open

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function spawn(container, count, build) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) frag.appendChild(build(i));
    container.appendChild(frag);
  }

  function makeSparkle() {
    var el = document.createElement('span');
    el.className = 'sparkle';
    el.style.left = rand(4, 96) + '%';
    el.style.top = rand(6, 94) + '%';
    el.style.setProperty('--size', rand(10, 22).toFixed(0) + 'px');
    el.style.setProperty('--color', SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]);
    el.style.setProperty('--dur', rand(3, 6).toFixed(2) + 's');
    el.style.setProperty('--delay', rand(0, 5).toFixed(2) + 's');
    return el;
  }

  // tiny glowing gold speck that flickers quickly
  function makeGlint() {
    var el = document.createElement('span');
    el.className = 'glint';
    el.style.left = rand(2, 98) + '%';
    el.style.top = rand(2, 98) + '%';
    el.style.setProperty('--size', rand(2, 5).toFixed(1) + 'px');
    el.style.setProperty('--dur', rand(0.9, 2.6).toFixed(2) + 's');
    el.style.setProperty('--delay', rand(0, 3).toFixed(2) + 's');
    return el;
  }

  // large soft light that drifts slowly
  function makeBokeh() {
    var el = document.createElement('span');
    el.className = 'bokeh';
    el.style.left = rand(-6, 96) + '%';
    el.style.top = rand(-4, 96) + '%';
    el.style.setProperty('--size', rand(36, 130).toFixed(0) + 'px');
    el.style.setProperty('--color', BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)]);
    el.style.setProperty('--alpha', rand(0.18, 0.4).toFixed(2));
    el.style.setProperty('--dx', rand(-30, 30).toFixed(0) + 'px');
    el.style.setProperty('--dur', rand(7, 13).toFixed(2) + 's');
    el.style.setProperty('--delay', rand(-8, 0).toFixed(2) + 's');
    return el;
  }

  function makeGoldDust() {
    var el = makePetal();
    el.className = 'petal petal--gold';
    el.style.setProperty('--size', rand(3, 6).toFixed(1) + 'px');
    return el;
  }

  function makePetal() {
    var el = document.createElement('span');
    el.className = Math.random() < PETAL_LIGHT_RATIO ? 'petal petal--light' : 'petal';
    el.style.left = rand(0, 100) + '%';
    el.style.setProperty('--size', rand(8, 15).toFixed(1) + 'px');
    el.style.setProperty('--dur', rand(10, 18).toFixed(2) + 's');
    el.style.setProperty('--delay', rand(0, 12).toFixed(2) + 's');
    el.style.setProperty('--drift', rand(-80, 120).toFixed(0) + 'px');
    el.style.setProperty('--spin', rand(240, 720).toFixed(0) + 'deg');
    return el;
  }

  function startPetals() {
    var layer = document.getElementById('petals');
    if (!layer || reduceMotion) return;
    spawn(layer, PETAL_COUNT, makePetal);
    spawn(layer, GOLD_DUST_COUNT, makeGoldDust);
  }

  function enterCard() {
    var card = document.querySelector('.card');
    if (card) card.classList.add('is-entered');
    startPetals();
  }

  function initIntro() {
    var intro = document.getElementById('intro');
    var openBtn = document.getElementById('intro-open');
    if (!intro || !openBtn) {
      enterCard();
      return;
    }

    document.body.classList.add('is-locked');
    var sky = intro.querySelector('.intro__sky') || intro;
    spawn(sky, BOKEH_COUNT, makeBokeh);
    if (!reduceMotion) {
      spawn(sky, SPARKLE_COUNT, makeSparkle);
      spawn(sky, GLINT_COUNT, makeGlint);
    }

    openBtn.addEventListener('click', function () {
      openBtn.disabled = true;
      intro.classList.add('is-opening');
      var themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute('content', CARD_THEME_COLOR);
      window.scrollTo(0, 0);
      enterCard();
      setTimeout(function () {
        intro.remove();
        document.body.classList.remove('is-locked');
      }, reduceMotion ? 0 : OPEN_DURATION_MS);
    }, { once: true });
  }

  initIntro();
})();
