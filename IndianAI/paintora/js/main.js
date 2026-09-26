/* ============================================================
   Paintora - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia | Year: 2026
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. Navbar Scroll Effect
     ---------------------------------------------------------- */
  const navbar = document.querySelector('.navbar-paintora');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run on load

  /* ----------------------------------------------------------
     2. Footer Year Auto-Update
     ---------------------------------------------------------- */
  const yearEls = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ----------------------------------------------------------
     3. Scroll-to-Top Button
     ---------------------------------------------------------- */
  const scrollBtn = document.getElementById('scrollToTop');

  function handleScrollToTopVisibility() {
    if (!scrollBtn) return;
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', handleScrollToTopVisibility, { passive: true });
  handleScrollToTopVisibility(); // Run on load

  /* ----------------------------------------------------------
     4. Contact Form Validation
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    function showFeedback(el, message) {
      if (!el) return;
      el.textContent = message;
      el.style.display = 'block';
      setTimeout(function () {
        el.style.display = 'none';
      }, 5000);
    }

    function validateField(field) {
      const value = field.value.trim();
      const feedbackEl = document.querySelector('[data-for="' + field.id + '"]');
      let valid = true;
      let message = '';

      if (field.required && value === '') {
        valid = false;
        message = 'This field is required.';
      } else if (field.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          valid = false;
          message = 'Please enter a valid email address.';
        }
      } else if (field.dataset.minlength && value.length < parseInt(field.dataset.minlength)) {
        valid = false;
        message = 'Minimum ' + field.dataset.minlength + ' characters required.';
      }

      if (feedbackEl) {
        feedbackEl.textContent = message;
        feedbackEl.className = 'form-feedback' + (valid ? '' : ' error');
      }

      field.classList.toggle('is-invalid', !valid);
      field.classList.toggle('is-valid', valid && value !== '');

      return valid;
    }

    // Live validation on blur
    const fields = contactForm.querySelectorAll('input, textarea, select');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });

      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) {
        if (formError) {
          showFeedback(formError, 'Please fix the errors above before submitting.');
        }
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          fields.forEach(function (field) {
            field.classList.remove('is-valid', 'is-invalid');
          });
          if (formSuccess) {
            showFeedback(formSuccess, 'Thank you! Your message has been sent. We will get back to you shortly.');
          }
        }, 1800);
      }
    });
  }

  /* ----------------------------------------------------------
     5. Intersection Observer - Card Animations
     ---------------------------------------------------------- */
  const animatedCards = document.querySelectorAll('.animate-card');

  if (animatedCards.length > 0 && 'IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedCards.forEach(function (card, idx) {
      if (!card.dataset.delay) {
        card.dataset.delay = idx * 80;
      }
      cardObserver.observe(card);
    });
  } else {
    // Fallback: show all cards if IntersectionObserver not supported
    animatedCards.forEach(function (card) {
      card.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     6. Color Palette Swatch Interaction
     ---------------------------------------------------------- */
  const swatches = document.querySelectorAll('.swatch');

  if (swatches.length > 0) {
    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        // Remove active from all swatches in the same group
        const parentRow = swatch.closest('.swatches-row');
        if (parentRow) {
          parentRow.querySelectorAll('.swatch').forEach(function (s) {
            s.classList.remove('active');
          });
        }
        swatch.classList.toggle('active');

        // Show selected color info
        const color = swatch.dataset.color;
        const colorName = swatch.dataset.name;
        const activeDisplay = document.getElementById('activeColorDisplay');
        if (activeDisplay && color) {
          activeDisplay.style.background = color;
          const label = document.getElementById('activeColorLabel');
          if (label) label.textContent = colorName || color;
        }
      });
    });
  }

  /* ----------------------------------------------------------
     7. Smooth Anchor Scrolling
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     8. Active Nav Link Highlight
     ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     9. Tool Item Hover Pulse
     ---------------------------------------------------------- */
  const toolItems = document.querySelectorAll('.tool-item');
  toolItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      const icon = item.querySelector('.tool-icon');
      if (icon) {
        icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    });
  });

  /* ----------------------------------------------------------
     10. Navbar mobile auto-close on link click
     ---------------------------------------------------------- */
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      });
    });
  }

});
