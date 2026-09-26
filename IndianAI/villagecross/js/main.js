/* ============================================================
   VillageCross - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Navbar Scroll Effect ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 2. Footer Year ── */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ── 3. Scroll-to-Top Button ── */
  const scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 4. Intersection Observer Animations ── */
  const animatedEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show all
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. Interactive 5x5 Game Board Demo ── */
  const demoBoard = document.getElementById('demoBoard');
  if (demoBoard) {
    const cells = demoBoard.querySelectorAll('.board-cell');
    // Player cycle: 0=empty, 1=p1(green), 2=p2(red), 3=p3(blue), 4=p4(orange)
    const playerClasses = ['', 'p1', 'p2', 'p3', 'p4'];
    const crossSymbol = '✕';

    // Track state for each cell
    const cellState = Array.from({ length: cells.length }, () => 0);

    // Current turn tracker
    let currentTurn = 1;
    const turnDot   = document.getElementById('turnDot');
    const turnLabel = document.getElementById('turnLabel');
    const playerNames = ['', 'Player 1', 'Player 2', 'Player 3', 'Player 4'];
    const dotColors   = ['', 'var(--player1-color)', 'var(--player2-color)', 'var(--player3-color)', 'var(--player4-color)'];

    function updateTurnIndicator() {
      if (turnLabel) turnLabel.textContent = playerNames[currentTurn] + "'s Turn";
      if (turnDot)   turnDot.style.background = dotColors[currentTurn];
    }

    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (cellState[index] === 0) {
          // Place current player's cross
          cellState[index] = currentTurn;
          applyPlayerState(cell, currentTurn);
          currentTurn = (currentTurn % 4) + 1;
          updateTurnIndicator();
        } else {
          // Cycle to next player OR clear
          const next = (cellState[index] % 4) + 1;
          cellState[index] = next;
          applyPlayerState(cell, next);
        }

        // Pop animation
        cell.classList.remove('demo-active');
        void cell.offsetWidth; // reflow trick
        cell.classList.add('demo-active');
      });
    });

    function applyPlayerState(cell, player) {
      // Remove all player classes
      cell.classList.remove('p1', 'p2', 'p3', 'p4', 'empty');
      if (player === 0) {
        cell.classList.add('empty');
        cell.innerHTML = '';
      } else {
        cell.classList.add('p' + player);
        cell.innerHTML = '<i class="cross-mark">' + crossSymbol + '</i>';
      }
    }

    // Reset board button
    const resetBtn = document.getElementById('resetBoard');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        cells.forEach((cell, i) => {
          cellState[i] = 0;
          applyPlayerState(cell, 0);
        });
        currentTurn = 1;
        updateTurnIndicator();
      });
    }

    updateTurnIndicator();
  }

  /* ── 6. Contact Form Validation ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successMsg = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-control, .form-select').forEach(el => {
        el.classList.remove('is-invalid');
      });

      // Validate each required field
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          emailField.classList.add('is-invalid');
          const feedback = emailField.nextElementSibling;
          if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = 'Please enter a valid email address.';
          }
          valid = false;
        }
      }

      // Phone validation (optional field but if filled, validate)
      const phoneField = contactForm.querySelector('#phone');
      if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[+\d\s\-()]{7,20}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
          phoneField.classList.add('is-invalid');
          valid = false;
        }
      }

      if (valid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();
            if (successMsg) {
              successMsg.style.display = 'flex';
              successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
            }
          }, 1500);
        }
      } else {
        // Scroll to first error
        const firstError = contactForm.querySelector('.is-invalid');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          firstError.focus();
        }
      }
    });

    // Live validation: remove error on input
    contactForm.querySelectorAll('.form-control, .form-select').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('is-invalid');
        }
      });
    });
  }

  /* ── 7. Active Nav Link Highlight ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 8. Smooth Anchor Scrolling ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
