/* ============================================================
   NewsExpress - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia
   Platform: IndianAI
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Navbar Scroll Effect ---- */
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load in case page is already scrolled


  /* ---- 2. Footer Year Auto-Update ---- */
  const yearEls = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });


  /* ---- 3. Scroll-to-Top Button ---- */
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


  /* ---- 4. Active Nav Link Detection ---- */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();

    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });


  /* ---- 5. Intersection Observer for Card Animations ---- */
  const animatedCards = document.querySelectorAll('.feature-card, .contact-card, .step-card, .news-card');

  if ('IntersectionObserver' in window && animatedCards.length > 0) {
    const cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedCards.forEach(function (card, index) {
      card.style.transitionDelay = (index % 3) * 0.12 + 's';
      cardObserver.observe(card);
    });
  } else {
    // Fallback: show all cards immediately if IntersectionObserver not supported
    animatedCards.forEach(function (card) {
      card.classList.add('animated');
    });
  }


  /* ---- 6. Contact Form Validation ---- */
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccessMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Clear previous invalid states
      contactForm.querySelectorAll('.form-control, .form-select').forEach(function (field) {
        field.classList.remove('is-invalid');
      });

      // Validate Name
      const nameField = document.getElementById('contactName');
      if (nameField && nameField.value.trim().length < 2) {
        nameField.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email
      const emailField = document.getElementById('contactEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && !emailRegex.test(emailField.value.trim())) {
        emailField.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Subject
      const subjectField = document.getElementById('contactSubject');
      if (subjectField && subjectField.value === '') {
        subjectField.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Message
      const messageField = document.getElementById('contactMessage');
      if (messageField && messageField.value.trim().length < 10) {
        messageField.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        // Show success message
        contactForm.style.display = 'none';
        if (successMessage) {
          successMessage.classList.add('show');
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactForm.reset();
      } else {
        // Scroll to first invalid field
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });

    // Live validation: remove invalid class on input
    contactForm.querySelectorAll('.form-control, .form-select').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid') && field.value.trim().length > 0) {
          field.classList.remove('is-invalid');
        }
      });
      field.addEventListener('change', function () {
        if (field.classList.contains('is-invalid') && field.value !== '') {
          field.classList.remove('is-invalid');
        }
      });
    });
  }


  /* ---- 7. Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });


  /* ---- 8. Collapse Navbar on Link Click (Mobile) ---- */
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
