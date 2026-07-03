/**
 * NewsController — serves both the news list (/news) and a single item
 * (/news/:id). When $routeParams.id is present it loads the detail view;
 * otherwise it loads the full list. API-first with rich static fallbacks.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('NewsController', NewsController);

  NewsController.$inject = ['$routeParams', 'ApiService', 'SeoService'];

  function NewsController($routeParams, ApiService, SeoService) {
    var vm = this;

    vm.loading = true;
    vm.items = [];
    vm.item = null;
    vm.id = $routeParams.id || null;
    vm.isDetail = !!vm.id;

    // ---- Category filter (list view) ----
    vm.categories = ['All', 'News', 'Notice', 'Event', 'Circular'];
    vm.category = 'All';
    vm.setCategory = function (c) { vm.category = c; };
    vm.matches = function (n) {
      return vm.category === 'All' || n.category === vm.category;
    };

    vm.formatDate = function (d) {
      try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
      catch (e) { return d; }
    };

    if (vm.isDetail) {
      SeoService.set('News', 'Latest news, notices, events and circulars from Alfalah Academy, Sultana.');
      ApiService.get('/news/' + vm.id)
        .then(function (data) { vm.item = (data && data.item) || data || null; })
        .catch(function () { vm.item = findFallback(vm.id); })
        .finally(function () {
          if (!vm.item) { vm.item = findFallback(vm.id); }
          if (vm.item) { SeoService.set(vm.item.title, vm.item.excerpt); }
          vm.loading = false;
        });
    } else {
      SeoService.set('News & Events', 'Stay updated with the latest news, notices, events and circulars from Alfalah Academy, Sultana, Chirawa.');
      ApiService.get('/news')
        .then(function (data) {
          vm.items = (data && data.items) || data || [];
          if (!vm.items.length) { vm.items = fallback(); }
        })
        .catch(function () { vm.items = fallback(); })
        .finally(function () { vm.loading = false; });
    }

    function findFallback(id) {
      var all = fallback();
      for (var i = 0; i < all.length; i++) {
        if (String(all[i].id) === String(id)) { return all[i]; }
      }
      return null;
    }

    function fallback() {
      return [
        {
          id: 'n1', title: 'Admissions Open for Session 2026-27', date: '2026-06-25', category: 'Notice',
          excerpt: 'Enrolment is now open for classes Nursery to X. Limited seats — apply early to secure admission.',
          body: '<p>Alfalah Academy is pleased to announce that admissions for the academic session <strong>2026-27</strong> are now open for classes Nursery to X.</p><p>Prospectus and application forms are available at the school office between 8:00 AM and 1:00 PM on all working days. Parents may also submit an enquiry online through our website.</p><p>Seats are limited and allotted on a first-come, first-served basis. We encourage families to apply early to avoid disappointment. For any assistance, please contact the admissions desk.</p>'
        },
        {
          id: 'n2', title: 'Annual Day 2026 Celebrated with Great Zeal', date: '2026-06-20', category: 'Event',
          excerpt: 'Students dazzled parents and guests with vibrant performances at the annual function.',
          body: '<p>The school\'s <strong>Annual Day 2026</strong> was celebrated with tremendous enthusiasm in the presence of parents, guests and the entire Alfalah family.</p><p>From colourful dances and skits to soulful music and a stirring patriotic performance, our students showcased their talents on stage. The Chairman and Principal congratulated the students and thanked the teachers and parents for their unwavering support.</p><p>Prizes were distributed to outstanding performers and academic achievers, making the evening truly memorable.</p>'
        },
        {
          id: 'n3', title: 'Half-Yearly Examination Schedule Released', date: '2026-06-12', category: 'Circular',
          excerpt: 'The datesheet for the half-yearly examinations has been shared with all classes.',
          body: '<p>This is to inform all students and parents that the <strong>Half-Yearly Examinations</strong> will commence as per the schedule shared through the homework diary and class notice boards.</p><p>Students are advised to prepare well in advance and revise thoroughly. Kindly note the following:</p><ul><li>Examinations begin at 8:00 AM sharp.</li><li>Students must carry their own stationery and admit card.</li><li>Report cards will be distributed during the Parent-Teacher Meeting.</li></ul><p>We wish all our students the very best.</p>'
        },
        {
          id: 'n4', title: 'Science Exhibition Winners Announced', date: '2026-05-28', category: 'News',
          excerpt: 'Our young innovators bagged top honours at the regional science fair.',
          body: '<p>We are proud to share that students of Alfalah Academy secured top positions at the <strong>Regional Science Exhibition</strong> held recently.</p><p>Working models on renewable energy, water conservation and simple machines impressed the judges with their creativity and clarity. The winning teams have been selected to represent the school at the district-level event.</p><p>Heartiest congratulations to the students and their mentor teachers for this outstanding achievement.</p>'
        },
        {
          id: 'n5', title: 'Parent-Teacher Meeting on 10th August', date: '2026-05-15', category: 'Notice',
          excerpt: 'Parents are requested to attend the PTM to discuss their child\'s progress.',
          body: '<p>A <strong>Parent-Teacher Meeting (PTM)</strong> is scheduled for <strong>Saturday, 10th August 2026</strong> from 9:00 AM to 12:00 noon.</p><p>This is a valuable opportunity for parents to meet class teachers, review academic progress and discuss the overall development of their child. Report cards for the term will be handed over during the meeting.</p><p>We request all parents to make it convenient to attend.</p>'
        },
        {
          id: 'n6', title: 'Independence Day Celebration', date: '2026-05-05', category: 'Event',
          excerpt: 'Join us for the flag hoisting and cultural programme on 15th August.',
          body: '<p>Alfalah Academy will celebrate <strong>Independence Day</strong> on <strong>15th August 2026</strong> with great pride and patriotism.</p><p>The programme will begin with the flag hoisting ceremony at 8:00 AM, followed by the national anthem, a march past, and cultural performances by our students. Parents and well-wishers are cordially invited to join the celebration.</p><p>Let us come together to honour the spirit of our nation.</p>'
        }
      ];
    }
  }
})();
