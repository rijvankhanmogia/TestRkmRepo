/* ============================================================
   InshortAI - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia
   Platform: IndianAI
   ============================================================ */

'use strict';

/* ---- Helper: count words ---- */
function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/* ---- Demo answers dictionary ---- */
const demoAnswers = {
  india: "India is the world's largest democracy, located in South Asia with a population exceeding 1.4 billion. It has a rich cultural heritage spanning over 5,000 years. India is known for its diverse languages, religions, cuisine, and festivals. It's the 5th largest economy globally and a major hub for technology and innovation.",

  ai: "Artificial Intelligence (AI) is the simulation of human intelligence in machines. It enables computers to learn, reason, and solve problems. AI powers voice assistants, recommendation engines, medical diagnostics, and self-driving cars. Machine learning, a subset of AI, trains systems on data to improve performance automatically.",

  artificial_intelligence: "Artificial Intelligence (AI) is the simulation of human intelligence in machines. It enables computers to learn, reason, and solve problems. AI powers voice assistants, recommendation engines, medical diagnostics, and self-driving cars. Machine learning, a subset of AI, trains systems on data to improve performance automatically.",

  solar: "Solar energy is electricity generated from sunlight using photovoltaic (PV) panels or solar thermal systems. Sunlight photons knock electrons in silicon cells, creating an electric current. It's renewable, emission-free, and increasingly affordable. Solar energy now powers homes, industries, and even satellites worldwide.",

  flag: "The Indian flag has three horizontal bands: saffron (courage), white (peace and truth), and green (prosperity). At the centre is a navy-blue Ashoka Chakra with 24 spokes, representing the wheel of law and progress. Designed by Pingali Venkayya, it was officially adopted on July 22, 1947.",

  gdp: "GDP (Gross Domestic Product) measures the total monetary value of all goods and services produced within a country in a specific period. It's the primary indicator of a nation's economic health. Rising GDP signals growth; declining GDP indicates recession. It's calculated using consumption, investment, government spending, and net exports.",

  climate: "Climate change refers to long-term shifts in global temperatures and weather patterns. Primarily driven by human activities like burning fossil fuels, it causes rising sea levels, extreme weather, and ecosystem disruption. Reducing carbon emissions, adopting renewable energy, and reforestation are key solutions to combat climate change.",

  health: "Good health requires balanced nutrition, regular physical activity, adequate sleep, stress management, and routine medical check-ups. The WHO defines health as complete physical, mental, and social well-being. Avoiding tobacco, limiting alcohol, staying hydrated, and maintaining a healthy weight significantly reduce the risk of chronic diseases.",

  blockchain: "Blockchain is a distributed digital ledger that records transactions across many computers securely and transparently. Each block contains data, a timestamp, and a cryptographic hash of the previous block. This chain makes records tamper-resistant. Bitcoin pioneered blockchain technology, which now powers cryptocurrencies, smart contracts, and supply chains.",

  default: "This is a simulated demo response. InshortAI uses Google Gemini AI to deliver concise, accurate answers in 60 words or fewer. The real app sends your question to the Gemini API and returns a precise, verified answer instantly. No account required — just type, ask, and get your answer in seconds."
};

/* ---- Pick best demo answer ---- */
function getDemoAnswer(question) {
  const q = question.toLowerCase();
  if (q.includes('india') || q.includes('indian')) return demoAnswers.india;
  if (q.includes('artificial intelligence') || q.includes('what is ai')) return demoAnswers.artificial_intelligence;
  if (q.includes(' ai ') || q.startsWith('ai ') || q.endsWith(' ai')) return demoAnswers.ai;
  if (q.includes('solar')) return demoAnswers.solar;
  if (q.includes('flag')) return demoAnswers.flag;
  if (q.includes('gdp') || q.includes('gross domestic')) return demoAnswers.gdp;
  if (q.includes('climate') || q.includes('global warming')) return demoAnswers.climate;
  if (q.includes('health') || q.includes('healthy')) return demoAnswers.health;
  if (q.includes('blockchain') || q.includes('bitcoin') || q.includes('crypto')) return demoAnswers.blockchain;
  return demoAnswers.default;
}

/* ---- DOMContentLoaded handler ---- */
document.addEventListener('DOMContentLoaded', function () {

  /* ------ Footer year ------ */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ------ Navbar scroll effect ------ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ------ Scroll-to-top button ------ */
  const scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------ Intersection Observer for fade-in animations ------ */
  const animatedEls = document.querySelectorAll('.fade-in-up');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: make all visible immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ------ Demo Section ------ */
  initDemoSection();

  /* ------ Contact Form ------ */
  initContactForm();

});

/* ============================================================
   DEMO SECTION
   ============================================================ */
function initDemoSection() {
  const demoForm = document.getElementById('demoForm');
  const demoSubmitBtn = document.getElementById('demoSubmit');
  const questionInput = document.getElementById('questionInput');
  const typingIndicator = document.getElementById('typingIndicator');
  const answerArea = document.getElementById('answerArea');
  const answerText = document.getElementById('answerText');
  const wordCountBadge = document.getElementById('wordCountBadge');
  const copyBtn = document.getElementById('copyBtn');
  const sampleChips = document.querySelectorAll('.sample-chip');

  if (!demoForm && !demoSubmitBtn) return; // Not on a page with demo

  /* Sample chip click */
  sampleChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (questionInput) {
        questionInput.value = chip.dataset.question || chip.textContent.trim();
        questionInput.focus();
        // Highlight active chip briefly
        sampleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        setTimeout(() => chip.classList.remove('active'), 800);
      }
    });
  });

  /* Submit handler */
  function handleDemoSubmit(e) {
    if (e) e.preventDefault();
    const question = questionInput ? questionInput.value.trim() : '';

    if (!question) {
      if (questionInput) {
        questionInput.style.borderColor = '#ef4444';
        questionInput.placeholder = 'Please type a question first...';
        setTimeout(() => {
          questionInput.style.borderColor = '';
          questionInput.placeholder = 'Ask any question...';
        }, 2000);
      }
      return;
    }

    /* Disable button and show typing */
    if (demoSubmitBtn) demoSubmitBtn.disabled = true;
    if (typingIndicator) typingIndicator.style.display = 'flex';
    if (answerArea) answerArea.style.display = 'none';

    /* After 1.5s reveal answer */
    setTimeout(function () {
      const answer = getDemoAnswer(question);
      const wc = countWords(answer);

      if (answerText) answerText.textContent = answer;
      if (wordCountBadge) wordCountBadge.textContent = wc + ' words';

      if (typingIndicator) typingIndicator.style.display = 'none';
      if (answerArea) answerArea.style.display = 'block';
      if (demoSubmitBtn) demoSubmitBtn.disabled = false;

      // Smooth scroll to answer
      if (answerArea) {
        answerArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1500);
  }

  if (demoForm) demoForm.addEventListener('submit', handleDemoSubmit);
  if (demoSubmitBtn && !demoForm) demoSubmitBtn.addEventListener('click', handleDemoSubmit);

  /* Copy button */
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const text = answerText ? answerText.textContent : '';
      if (!text) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          showCopied(copyBtn);
        }).catch(function () {
          fallbackCopy(text, copyBtn);
        });
      } else {
        fallbackCopy(text, copyBtn);
      }
    });
  }
}

function showCopied(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
  btn.style.background = 'var(--primary-color)';
  btn.style.color = '#fff';
  setTimeout(function () {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showCopied(btn);
  } catch (err) {
    console.warn('Copy failed', err);
  }
  document.body.removeChild(ta);
}

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    /* Validate each required field */
    const fields = contactForm.querySelectorAll('[data-validate]');
    fields.forEach(function (field) {
      const rule = field.dataset.validate;
      const msgEl = document.getElementById(field.id + 'Error');
      let fieldValid = true;

      if (rule === 'required') {
        fieldValid = field.value.trim().length > 0;
      } else if (rule === 'email') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      } else if (rule === 'minlength') {
        fieldValid = field.value.trim().length >= parseInt(field.dataset.min || 10);
      }

      if (!fieldValid) {
        field.classList.add('is-invalid');
        if (msgEl) msgEl.classList.add('show');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
        if (msgEl) msgEl.classList.remove('show');
      }
    });

    if (!valid) return;

    /* Simulate form submission */
    const submitBtn = contactForm.querySelector('[type="submit"]');
    if (submitBtn) {
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Sending...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        contactForm.reset();
        if (formSuccess) formSuccess.classList.add('show');
        setTimeout(function () {
          if (formSuccess) formSuccess.classList.remove('show');
        }, 5000);
      }, 1800);
    }
  });

  /* Live validation on input */
  const fields = contactForm.querySelectorAll('[data-validate]');
  fields.forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
        const msgEl = document.getElementById(field.id + 'Error');
        if (msgEl) msgEl.classList.remove('show');
      }
    });
  });
}
