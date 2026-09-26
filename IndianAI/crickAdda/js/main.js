/**
 * CrickAdda - Main JavaScript
 * Developer: Mohd Rijvan Khan Mogia
 * Year: 2026
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ===================================================
     1. NAVBAR SCROLL EFFECT
     =================================================== */
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  /* ===================================================
     2. FOOTER YEAR
     =================================================== */
  const yearEls = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ===================================================
     3. SCROLL-TO-TOP BUTTON
     =================================================== */
  const scrollToTopBtn = document.getElementById('scrollToTop');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     4. CONTACT FORM VALIDATION
     =================================================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      let isValid = true;

      // Clear previous validation states
      contactForm.querySelectorAll('.form-control, .form-select').forEach(function (field) {
        field.classList.remove('is-invalid', 'is-valid');
      });

      // Validate Name
      const nameField = contactForm.querySelector('#contactName');
      if (nameField) {
        const nameVal = nameField.value.trim();
        if (!nameVal || nameVal.length < 2) {
          nameField.classList.add('is-invalid');
          isValid = false;
        } else {
          nameField.classList.add('is-valid');
        }
      }

      // Validate Email
      const emailField = contactForm.querySelector('#contactEmail');
      if (emailField) {
        const emailVal = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          emailField.classList.add('is-invalid');
          isValid = false;
        } else {
          emailField.classList.add('is-valid');
        }
      }

      // Validate Subject
      const subjectField = contactForm.querySelector('#contactSubject');
      if (subjectField) {
        if (!subjectField.value || subjectField.value === '') {
          subjectField.classList.add('is-invalid');
          isValid = false;
        } else {
          subjectField.classList.add('is-valid');
        }
      }

      // Validate Message
      const messageField = contactForm.querySelector('#contactMessage');
      if (messageField) {
        const msgVal = messageField.value.trim();
        if (!msgVal || msgVal.length < 10) {
          messageField.classList.add('is-invalid');
          isValid = false;
        } else {
          messageField.classList.add('is-valid');
        }
      }

      // If valid, show success
      if (isValid) {
        const successMsg = document.getElementById('formSuccessMsg');
        if (successMsg) {
          successMsg.classList.add('show');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset after delay
        setTimeout(function () {
          contactForm.reset();
          contactForm.querySelectorAll('.is-valid').forEach(function (el) {
            el.classList.remove('is-valid');
          });
          if (successMsg) {
            successMsg.classList.remove('show');
          }
        }, 5000);
      }
    });

    // Live field validation on blur
    contactForm.querySelectorAll('.form-control, .form-select').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.value.trim() !== '') {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        }
      });
    });
  }

  /* ===================================================
     5. INTERSECTION OBSERVER - SCROLL ANIMATIONS
     =================================================== */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling index
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll'))
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = index * 80;

          setTimeout(function () {
            entry.target.classList.add('in-view');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all if IntersectionObserver not supported
    animatedElements.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ===================================================
     6. LIVE SCORE BADGE PULSING ANIMATION
     =================================================== */
  const liveScoreBadges = document.querySelectorAll('.live-score-badge');

  if (liveScoreBadges.length > 0) {
    // Add pulsing class (CSS animation already defined)
    liveScoreBadges.forEach(function (badge) {
      badge.classList.add('pulsing');
    });

    // Simulate periodic "score update" visual blink for demo purposes
    setInterval(function () {
      liveScoreBadges.forEach(function (badge) {
        badge.style.opacity = '0.5';
        setTimeout(function () {
          badge.style.opacity = '1';
        }, 200);
      });
    }, 4000);
  }

  /* ===================================================
     7. ACTIVE NAV LINK HIGHLIGHTING
     =================================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ===================================================
     8. SMOOTH ANCHOR SCROLL (for legal pages TOC)
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ===================================================
     9. NAVBAR COLLAPSE ON LINK CLICK (mobile)
     =================================================== */
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      });
    });
  }

  /* ===================================================
     10. FEATURE CARD HOVER ELEVATION (accessibility)
     =================================================== */
  document.querySelectorAll('.feature-card').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.toggle('hovered');
      }
    });
    card.setAttribute('tabindex', '0');
  });

});
