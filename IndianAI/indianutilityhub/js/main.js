/* ============================================
   IndianUtilityHub - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer Year ---- */
  const yearEls = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavbarScroll = function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run on load
  }

  /* ---- Scroll To Top ---- */
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Tool Search / Filter ---- */
  const toolSearchInput = document.getElementById('toolSearch');
  if (toolSearchInput) {
    const toolCards = document.querySelectorAll('.tool-card');
    const categoryGroups = document.querySelectorAll('.tool-category-group');
    const noResults = document.getElementById('noResults');

    toolSearchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      let visibleCount = 0;

      toolCards.forEach(function (card) {
        const title = (card.querySelector('.tool-card-title') || {}).textContent || '';
        const desc = (card.querySelector('.tool-card-desc') || {}).textContent || '';
        const badge = (card.querySelector('.tool-badge') || {}).textContent || '';
        const matchText = (title + ' ' + desc + ' ' + badge).toLowerCase();

        if (query === '' || matchText.includes(query)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide category group headers when all cards in them are hidden
      categoryGroups.forEach(function (group) {
        const cards = group.querySelectorAll('.tool-card');
        const anyVisible = Array.from(cards).some(function (c) {
          return c.style.display !== 'none';
        });
        group.style.display = anyVisible ? '' : 'none';
      });

      // Show no-results message
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });

    // Clear on Escape
    toolSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        this.value = '';
        this.dispatchEvent(new Event('input'));
      }
    });
  }

  /* ---- Contact Form Validation ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      let isValid = true;
      const fields = contactForm.querySelectorAll('[required]');

      fields.forEach(function (field) {
        field.classList.remove('is-invalid');

        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        } else if (field.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.classList.add('is-invalid');
            isValid = false;
          }
        }
      });

      contactForm.classList.add('was-validated');

      if (isValid) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const originalHTML = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        }

        // Simulate form submission (no backend - static page)
        setTimeout(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
          }
          contactForm.reset();
          contactForm.classList.remove('was-validated');
          showToast('Message sent successfully! We\'ll get back to you soon.');
        }, 1500);
      }
    });

    // Remove invalid state on input
    contactForm.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('is-invalid');
        }
      });
    });
  }

  /* ---- Toast Notification ---- */
  function showToast(message) {
    let toast = document.querySelector('.form-success-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'form-success-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + message;
    toast.classList.add('show');

    setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ---- Intersection Observer for Animations ---- */
  const animateEls = document.querySelectorAll('.animate-fade-up');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    animateEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Active Navbar Link ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Smooth Collapse Close for mobile nav ---- */
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
