// =========================================
// [APP NAME] - Main JavaScript
// IndianAI Product Template
// Replace [APP NAME] with your product name
// =========================================

document.addEventListener('DOMContentLoaded', function() {

  // Footer Year
  var yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  // Navbar scroll effect
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Active nav link
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (currentPath.endsWith(href)) link.classList.add('active');
    if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && href === 'index.html') {
      link.classList.add('active');
    }
  });

  // Scroll to top button
  var scrollTopBtn = document.getElementById('scrollToTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form validation
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var isValid = true;

      [name, email, message].forEach(function(f) { if (f) f.classList.remove('is-invalid'); });

      if (name && name.value.trim().length < 2) { name.classList.add('is-invalid'); isValid = false; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('is-invalid'); isValid = false; }
      if (message && message.value.trim().length < 10) { message.classList.add('is-invalid'); isValid = false; }

      if (isValid) {
        var successAlert = document.getElementById('formSuccess');
        if (successAlert) {
          successAlert.style.display = 'block';
          contactForm.reset();
          setTimeout(function() { successAlert.style.display = 'none'; }, 5000);
        }
      }
    });
  }

  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .contact-info-card').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ADD YOUR PRODUCT-SPECIFIC JS HERE
  // ----------------------------------------
  // Example: product demo, interactive features, etc.
  // ----------------------------------------

});
