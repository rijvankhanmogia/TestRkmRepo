// =========================================
// IndianAI - Main JavaScript
// AngularJS Application + UI Interactions
// Author: Mohd Rijvan Khan Mogia
// Year: 2026
// =========================================

// =========================================
// AngularJS Application
// =========================================
angular.module('indianAIApp', [])
  .controller('ProductController', function($scope) {
    $scope.products = [
      {
        name: 'NewsExpress',
        slug: 'newsexpress',
        category: 'News',
        icon: 'bi-newspaper',
        description: 'Latest news summarized in approximately 60 words. Stay informed quickly without spending hours reading long articles.',
        url: 'newsexpress/index.html',
        color: '#ef4444'
      },
      {
        name: 'Paintora',
        slug: 'paintora',
        category: 'Creativity',
        icon: 'bi-palette',
        description: 'Express yourself with painting and craft tools. Create beautiful artwork and share your creativity with the world.',
        url: 'paintora/index.html',
        color: '#a855f7'
      },
      {
        name: 'VillageCross',
        slug: 'villagecross',
        category: 'Game',
        icon: 'bi-grid-3x3-gap',
        description: 'A 4-player board game on a 5x5 grid. Compete with sticks and strategy in this classic cross placement game.',
        url: 'villagecross/index.html',
        color: '#22c55e'
      },
      {
        name: 'IndianUtilityHub',
        slug: 'indianutilityhub',
        category: 'Utilities',
        icon: 'bi-tools',
        description: '29 offline daily-use tools including calculator, EMI calculator, interest calculator, age calculator and many more.',
        url: 'indianutilityhub/index.html',
        color: '#0ea5e9'
      },
      {
        name: 'CrickAdda',
        slug: 'crickAdda',
        category: 'Cricket',
        icon: 'bi-trophy',
        description: 'Local cricket live scores, streaming, group chat and fantasy team builder. The ultimate cricket companion for fans.',
        url: 'crickAdda/index.html',
        color: '#16a34a'
      },
      {
        name: 'DocSnap',
        slug: 'docsnap',
        category: 'Documents',
        icon: 'bi-file-pdf',
        description: '21 document tools including image to PDF, merge PDF, PDF to image, compress PDF and many more useful tools.',
        url: 'docsnap/index.html',
        color: '#2563eb'
      },
      {
        name: 'InshortAI',
        slug: 'InshortAI',
        category: 'AI',
        icon: 'bi-robot',
        description: 'Quick answers in 60 words, powered by Google Gemini AI. Get concise, accurate information instantly.',
        url: 'InshortAI/index.html',
        color: '#7c3aed'
      }
    ];

    $scope.selectedCategory = 'All';
    $scope.categories = ['All', 'News', 'Creativity', 'Game', 'Utilities', 'Cricket', 'Documents', 'AI'];

    $scope.filterProducts = function(category) {
      $scope.selectedCategory = category;
    };

    $scope.getFilteredProducts = function() {
      if ($scope.selectedCategory === 'All') return $scope.products;
      return $scope.products.filter(function(p) {
        return p.category === $scope.selectedCategory;
      });
    };

    $scope.getCardBg = function(color) {
      var r = parseInt(color.slice(1, 3), 16);
      var g = parseInt(color.slice(3, 5), 16);
      var b = parseInt(color.slice(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',0.1)';
    };
  });

// =========================================
// DOM Ready - Vanilla JS
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
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active nav link
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
    if ((currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('index.html')) && href === 'index.html') {
      link.classList.add('active');
    }
  });

  // Scroll to top button
  var scrollTopBtn = document.getElementById('scrollToTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
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

      [name, email, message].forEach(function(field) {
        if (field) field.classList.remove('is-invalid');
      });

      if (name && name.value.trim().length < 2) {
        name.classList.add('is-invalid');
        isValid = false;
      }

      if (email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          email.classList.add('is-invalid');
          isValid = false;
        }
      }

      if (message && message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        var successAlert = document.getElementById('formSuccess');
        if (successAlert) {
          successAlert.style.display = 'block';
          contactForm.reset();
          setTimeout(function() {
            successAlert.style.display = 'none';
          }, 5000);
        }
      }
    });
  }

  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var animatedElements = document.querySelectorAll('.product-card, .service-item, .info-card, .value-card, .contact-info-card, .team-card, .service-card-full');
    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // Smooth scroll for anchor links
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
