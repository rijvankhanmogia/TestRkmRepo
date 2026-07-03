/**
 * GalleryController — image gallery with category tabs and a lightbox, plus a
 * small video gallery row. Uses placeholder tiles (no real media) and falls
 * back to static content when the API is unavailable.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('GalleryController', GalleryController);

  GalleryController.$inject = ['ApiService', 'SeoService'];

  function GalleryController(ApiService, SeoService) {
    var vm = this;
    SeoService.set('Gallery', 'A glimpse of life at Alfalah Academy, Sultana — annual functions, sports day, classroom moments and school events.');

    vm.loading = true;
    vm.items = [];
    vm.active = null;

    // ---- Category tabs ----
    vm.categories = ['All', 'Annual Function', 'Sports Day', 'Classroom', 'Events'];
    vm.category = 'All';
    vm.setCategory = function (c) { vm.category = c; };
    vm.matches = function (item) {
      return vm.category === 'All' || item.category === vm.category;
    };

    // ---- Lightbox ----
    vm.open = function (item) { vm.active = item; };
    vm.close = function () { vm.active = null; };

    // ---- Video gallery (placeholders) ----
    vm.videos = [
      { title: 'Annual Function Highlights 2026' },
      { title: 'Sports Day Glimpses' },
      { title: 'A Day at Alfalah Academy' }
    ];

    ApiService.get('/gallery')
      .then(function (data) {
        vm.items = (data && data.items) || data || [];
        if (!vm.items.length) { vm.items = fallback(); }
      })
      .catch(function () { vm.items = fallback(); })
      .finally(function () { vm.loading = false; });

    function fallback() {
      return [
        { title: 'Annual Day Performance', category: 'Annual Function' },
        { title: 'Prize Distribution', category: 'Annual Function' },
        { title: 'Cultural Dance', category: 'Annual Function' },
        { title: 'Relay Race Finals', category: 'Sports Day' },
        { title: 'March Past', category: 'Sports Day' },
        { title: 'Kabaddi Match', category: 'Sports Day' },
        { title: 'Smart Class in Action', category: 'Classroom' },
        { title: 'Science Lab Experiment', category: 'Classroom' },
        { title: 'Library Reading Hour', category: 'Classroom' },
        { title: 'Independence Day Celebration', category: 'Events' },
        { title: 'Science Exhibition', category: 'Events' },
        { title: 'Republic Day Parade', category: 'Events' }
      ];
    }
  }
})();
