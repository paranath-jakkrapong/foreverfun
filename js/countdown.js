// Live split-flap countdown to the ceremony (markup: #countdown in index.html)
(function () {
  'use strict';

  // 19 Dec 2026 (19-12-2569), Bangkok time (UTC+7)
  // สิ่งที่ต้องเติมข้อมูล: เวลาเริ่มพิธีจริง — ตอนนี้นับถอยหลังถึงเที่ยงคืนของวันงาน
  var WEDDING_START = new Date('2026-12-19T00:00:00+07:00');
  // After the day is over we switch to a thank-you message
  var WEDDING_END = new Date('2026-12-20T00:00:00+07:00');
  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_DAY = 24 * MS_PER_HOUR;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function remainingParts(ms) {
    return {
      days: String(Math.floor(ms / MS_PER_DAY)),
      hours: pad(Math.floor((ms % MS_PER_DAY) / MS_PER_HOUR)),
      minutes: pad(Math.floor((ms % MS_PER_HOUR) / MS_PER_MINUTE)),
      seconds: pad(Math.floor((ms % MS_PER_MINUTE) / MS_PER_SECOND))
    };
  }

  function statusMessage(now) {
    if (now >= WEDDING_END) return 'ขอบคุณที่ร่วมเป็นเกียรติ · Thank you';
    return 'วันนี้ · Today is the day';
  }

  var FLIP_DURATION_MS = 640;

  // Split-flap card: static halves + two flaps that rotate over them
  function buildFlip(el) {
    el.innerHTML =
      '<div class="flip__half flip__half--top"><span></span></div>' +
      '<div class="flip__half flip__half--bottom"><span></span></div>' +
      '<div class="flip__flap flip__flap--top"><span></span></div>' +
      '<div class="flip__flap flip__flap--bottom"><span></span></div>';
    var spans = el.querySelectorAll('span');
    return { el: el, top: spans[0], bottom: spans[1], flapTop: spans[2], flapBottom: spans[3], value: null, timer: null };
  }

  function setFlip(card, next) {
    if (card.value === next) return;
    var prev = card.value === null ? next : card.value;
    card.value = next;
    card.el.setAttribute('aria-label', next);
    card.top.textContent = next;
    card.bottom.textContent = prev;
    card.flapTop.textContent = prev;
    card.flapBottom.textContent = next;
    card.el.classList.remove('is-flipping');
    void card.el.offsetWidth; // restart the flip animation
    card.el.classList.add('is-flipping');
    clearTimeout(card.timer);
    card.timer = setTimeout(function () {
      card.bottom.textContent = next;
      card.el.classList.remove('is-flipping');
    }, FLIP_DURATION_MS);
  }

  function renderParts(cards, parts) {
    cards.forEach(function (card) { setFlip(card, parts[card.el.dataset.unit]); });
  }

  function initCountdown() {
    var box = document.getElementById('countdown');
    var message = document.getElementById('countdown-message');
    if (!box || !message) return;
    var nums = Array.prototype.slice.call(box.querySelectorAll('[data-unit]')).map(buildFlip);
    var timer = null;

    function update() {
      var now = Date.now();
      var remaining = WEDDING_START - now;
      if (remaining > 0) {
        box.hidden = false;
        message.hidden = true;
        renderParts(nums, remainingParts(remaining));
        return;
      }
      box.hidden = true;
      message.textContent = statusMessage(now);
      message.hidden = false;
      if (timer) clearInterval(timer);
    }

    update();
    timer = setInterval(update, MS_PER_SECOND);
  }

  initCountdown();
})();
