/**
 * HomeController — landing page. Pulls dynamic bits (news, stats) from the API
 * with static fallbacks so the page is fully rendered even offline.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('HomeController', HomeController);

  HomeController.$inject = ['$interval', '$scope', 'ConfigService', 'ApiService', 'SeoService'];

  function HomeController($interval, $scope, ConfigService, ApiService, SeoService) {
    var vm = this;
    SeoService.set('Home', 'Welcome to Alfalah Academy, Sultana — modern schooling with smart classrooms, labs, sports and holistic development.');

    vm.cfg = ConfigService.get();

    // ---- Hero slider ----
    vm.slides = [
      { img: 'assets/img/hero/hero-1.svg', title: 'Nurturing Knowledge,<br>Building Character', text: 'A modern school where every child is inspired to learn, lead and grow.' },
      { img: 'assets/img/hero/hero-2.svg', title: 'Smart Classrooms &<br>Modern Labs', text: 'Technology-driven learning that makes concepts come alive.' },
      { img: 'assets/img/hero/hero-3.svg', title: 'Sports, Arts &<br>Holistic Growth', text: 'Beyond academics — developing confident, well-rounded individuals.' }
    ];
    vm.current = 0;
    vm.goto = function (i) { vm.current = i; };
    var timer = $interval(function () {
      vm.current = (vm.current + 1) % vm.slides.length;
    }, 6000);
    $scope.$on('$destroy', function () { $interval.cancel(timer); });

    // ---- Stats ----
    vm.stats = (vm.cfg.stats && vm.cfg.stats.length) ? vm.cfg.stats : [
      { label: 'Students', value: 1200, suffix: '+', icon: 'bi-people' },
      { label: 'Teachers', value: 60, suffix: '+', icon: 'bi-person-workspace' },
      { label: 'Years of Excellence', value: 15, suffix: '+', icon: 'bi-award' },
      { label: 'Pass Percentage', value: 98, suffix: '%', icon: 'bi-mortarboard' }
    ];

    // ---- Why choose us ----
    vm.reasons = [
      { icon: 'bi-mortarboard-fill', title: 'Academic Excellence', text: 'A rigorous, balanced curriculum with consistently strong board results.' },
      { icon: 'bi-cpu-fill', title: 'Smart Learning', text: 'Digital classrooms and interactive lessons for deeper understanding.' },
      { icon: 'bi-heart-fill', title: 'Caring Environment', text: 'Small classes and mentors who know every student by name.' },
      { icon: 'bi-trophy-fill', title: 'Beyond Academics', text: 'Sports, arts, and clubs that build confidence and character.' },
      { icon: 'bi-shield-check', title: 'Safe & Secure', text: 'Secure campus, trained staff and GPS-enabled transport.' },
      { icon: 'bi-people-fill', title: 'Parent Partnership', text: 'Regular updates and open communication with families.' }
    ];

    // ---- Facilities ----
    vm.facilities = [
      { icon: 'bi-easel2-fill', title: 'Smart Classrooms' },
      { icon: 'bi-pc-display', title: 'Computer Lab' },
      { icon: 'bi-eyedropper', title: 'Science Lab' },
      { icon: 'bi-book-half', title: 'Library' },
      { icon: 'bi-dribbble', title: 'Sports' },
      { icon: 'bi-bus-front-fill', title: 'Transport' },
      { icon: 'bi-tree-fill', title: 'Playground' },
      { icon: 'bi-laptop', title: 'Digital Learning' }
    ];

    // ---- Achievements ----
    vm.achievements = [
      { icon: 'bi-award-fill', title: 'District Toppers', text: 'Multiple students ranked among district-level board toppers.' },
      { icon: 'bi-dribbble', title: 'State Sports Medals', text: 'Winners at state-level athletics and kabaddi tournaments.' },
      { icon: 'bi-lightbulb-fill', title: 'Science Fair Winners', text: 'Recognised at regional science and innovation exhibitions.' }
    ];

    // ---- Testimonials ----
    vm.testimonials = [
      { name: 'Rukhsar Bano', role: 'Parent', text: 'The teachers genuinely care. My daughter loves coming to school every day.' },
      { name: 'Imran Khan', role: 'Alumnus', text: 'Alfalah gave me the foundation and confidence for my engineering journey.' },
      { name: 'Sunita Devi', role: 'Parent', text: 'Smart classes and regular updates keep us involved in our son\'s progress.' }
    ];

    // ---- Latest news & events (API with fallback) ----
    vm.news = [];
    vm.events = [];
    vm.loadingNews = true;

    ApiService.get('/news', { limit: 3 })
      .then(function (data) { vm.news = (data && data.items) || data || []; })
      .catch(function () {
        vm.news = [
          { id: 'n1', title: 'Annual Day 2026 Celebrated with Great Zeal', date: '2026-06-20', category: 'Event', excerpt: 'Students showcased vibrant performances at the annual function.' },
          { id: 'n2', title: 'Admissions Open for Session 2026-27', date: '2026-06-10', category: 'Notice', excerpt: 'Enrol now for classes Nursery to X. Limited seats available.' },
          { id: 'n3', title: 'Science Exhibition Winners Announced', date: '2026-05-28', category: 'News', excerpt: 'Our young innovators bagged top honours at the regional fair.' }
        ];
      })
      .finally(function () { vm.loadingNews = false; });

    vm.events = [
      { day: '15', month: 'JUL', title: 'New Session Begins', time: 'All classes · 8:00 AM' },
      { day: '10', month: 'AUG', title: 'Parent-Teacher Meeting', time: 'Saturday · 9:00 AM' },
      { day: '15', month: 'AUG', title: 'Independence Day', time: 'Flag hoisting · 8:00 AM' },
      { day: '05', month: 'SEP', title: 'Teachers\' Day Celebration', time: 'Auditorium · 10:00 AM' }
    ];

    vm.formatDate = function (d) {
      try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
      catch (e) { return d; }
    };
  }
})();
