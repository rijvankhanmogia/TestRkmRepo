/* ============================================
   DocSnap - Main JavaScript
   Developer: Mohd Rijvan Khan Mogia
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------
     Footer Year
  ------------------------------------------ */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------
     Navbar Scroll Effect
  ------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // initial check
  }

  /* ------------------------------------------
     Scroll To Top Button
  ------------------------------------------ */
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     Upload Area Drag & Drop UI Feedback
     (Visual only - no actual file processing)
  ------------------------------------------ */
  const uploadAreas = document.querySelectorAll('.upload-area');
  uploadAreas.forEach(function (area) {
    // Drag enter
    area.addEventListener('dragenter', function (e) {
      e.preventDefault();
      e.stopPropagation();
      area.classList.add('drag-over');
    });

    // Drag over
    area.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      area.classList.add('drag-over');
    });

    // Drag leave
    area.addEventListener('dragleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Only remove if leaving the element entirely
      if (!area.contains(e.relatedTarget)) {
        area.classList.remove('drag-over');
      }
    });

    // Drop
    area.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      area.classList.remove('drag-over');

      // Show demo message - no actual file processing
      showDemoMessage(area);
    });

    // Click to "select"
    const selectBtn = area.querySelector('.btn-select');
    if (selectBtn) {
      selectBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showDemoMessage(area);
      });
    }

    area.addEventListener('click', function () {
      showDemoMessage(area);
    });
  });

  function showDemoMessage(area) {
    const existingMsg = area.querySelector('.upload-demo-msg');
    if (existingMsg) return;

    const msg = document.createElement('p');
    msg.className = 'upload-demo-msg mt-2 mb-0';
    msg.style.cssText = 'color:#92400e; font-size:0.82rem; font-weight:500;';
    msg.innerHTML = '<i class="bi bi-info-circle me-1"></i>This is a UI preview. Download the app to process files.';

    const demoNote = area.nextElementSibling;
    if (demoNote && demoNote.classList.contains('demo-note')) {
      // already has a demo note below, just highlight it briefly
      demoNote.style.transition = 'background 0.3s';
      demoNote.style.background = '#fde68a';
      setTimeout(() => { demoNote.style.background = ''; }, 1200);
    } else {
      area.appendChild(msg);
      setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
      }, 4000);
    }
  }

  /* ------------------------------------------
     Contact Form Validation
  ------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Clear previous states
      contactForm.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
      });

      // Validate Name
      const nameInput = contactForm.querySelector('#name');
      if (nameInput) {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add('is-invalid');
          isValid = false;
        } else {
          nameInput.classList.add('is-valid');
        }
      }

      // Validate Email
      const emailInput = contactForm.querySelector('#email');
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('is-invalid');
          isValid = false;
        } else {
          emailInput.classList.add('is-valid');
        }
      }

      // Validate Subject
      const subjectInput = contactForm.querySelector('#subject');
      if (subjectInput) {
        if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
          subjectInput.classList.add('is-invalid');
          isValid = false;
        } else {
          subjectInput.classList.add('is-valid');
        }
      }

      // Validate Message
      const messageInput = contactForm.querySelector('#message');
      if (messageInput) {
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
          messageInput.classList.add('is-invalid');
          isValid = false;
        } else {
          messageInput.classList.add('is-valid');
        }
      }

      if (isValid) {
        const successAlert = document.getElementById('formSuccess');
        const submitBtn = contactForm.querySelector('.btn-submit');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        }

        // Simulate form submission (no backend)
        setTimeout(() => {
          if (successAlert) {
            successAlert.style.display = 'block';
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
          contactForm.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid');
          });
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
          }
        }, 1200);
      }
    });
  }

  /* ------------------------------------------
     Intersection Observer for Animations
  ------------------------------------------ */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     Tool Search / Filter
  ------------------------------------------ */
  const toolSearchInput = document.getElementById('toolSearch');
  if (toolSearchInput) {
    toolSearchInput.addEventListener('input', function () {
      const query = toolSearchInput.value.trim().toLowerCase();
      const toolCards = document.querySelectorAll('.tool-card');
      const toolCategories = document.querySelectorAll('.tool-category');

      toolCards.forEach(function (card) {
        const name = card.querySelector('h5') ? card.querySelector('h5').textContent.toLowerCase() : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        if (!query || name.includes(query) || desc.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Hide empty categories
      toolCategories.forEach(function (cat) {
        const visibleCards = cat.querySelectorAll('.tool-card:not([style*="display: none"])');
        cat.style.display = visibleCards.length === 0 ? 'none' : '';
      });

      // Show "no results" message
      const noResults = document.getElementById('noToolsMsg');
      if (noResults) {
        const allHidden = document.querySelectorAll('.tool-card:not([style*="display: none"])').length === 0;
        noResults.style.display = allHidden ? 'block' : 'none';
      }
    });
  }

  /* ------------------------------------------
     Navbar active link highlighting
  ------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });

});
