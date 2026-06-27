/* ===== A.U.C. Water Purifier — interactions ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* Current year in footer */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Purifier finder ---- */
  var choices = { source: null, want: null };

  var recommendations = {
    'municipal|basic': {
      title: 'UF + UV',
      desc: 'For clean municipal water, UF + UV removes cysts and kills bacteria — a simple, reliable choice.'
    },
    'municipal|taste': {
      title: 'RO + UF + UF + TDS + Alkaline',
      desc: 'A full multi-stage system with TDS control and alkaline balancing gives you the best-tasting water.'
    },
    'municipal|wellness': {
      title: 'Zinc + Copper Adding Filter',
      desc: 'Adds zinc and copper back into purified water for an extra wellness boost in every glass.'
    },
    'borewell|basic': {
      title: 'RO + UF + UV',
      desc: 'Hard or high-TDS borewell water needs reverse osmosis — RO + UF + UV handles it safely.'
    },
    'borewell|taste': {
      title: 'RO + UF + UF + TDS + Alkaline',
      desc: 'For tough water plus great taste, the full RO system with TDS and alkaline stages is ideal.'
    },
    'borewell|wellness': {
      title: 'Zinc + Copper Adding Filter',
      desc: 'Pair strong RO purification with a Zinc + Copper stage to add healthy minerals back in.'
    },
    'unknown|basic': {
      title: 'RO + UF + UV',
      desc: "When you're not sure of your water quality, RO + UF + UV is the safest all-round choice."
    },
    'unknown|taste': {
      title: 'RO + UF + UF + TDS + Alkaline',
      desc: 'A complete multi-stage system adapts to most water types while keeping taste balanced.'
    },
    'unknown|wellness': {
      title: 'Zinc + Copper Adding Filter',
      desc: 'Get full purification plus added zinc and copper minerals — great when in doubt.'
    }
  };

  function handleOption(btn) {
    var group = btn.closest('.option-row').getAttribute('data-group');
    var siblings = btn.closest('.option-row').querySelectorAll('.opt');
    siblings.forEach(function (s) { s.classList.remove('active'); });
    btn.classList.add('active');
    choices[group] = btn.getAttribute('data-value');
    maybeShowResult();
  }

  function maybeShowResult() {
    if (!choices.source || !choices.want) return;
    var rec = recommendations[choices.source + '|' + choices.want];
    if (!rec) return;
    var box = document.getElementById('finderResult');
    document.getElementById('resultTitle').textContent = rec.title;
    document.getElementById('resultDesc').textContent = rec.desc;
    box.hidden = false;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  document.querySelectorAll('.opt').forEach(function (btn) {
    btn.addEventListener('click', function () { handleOption(btn); });
  });

  /* ---- Scroll reveal ---- */
  var revealTargets = document.querySelectorAll(
    '.filter-card, .offer-card, .product-card, .finder-box, .contact-card, .map-wrap, .section-head'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('show'); });
  }

  /* ---- Close mobile navbar after clicking a link ---- */
  var navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });
});
