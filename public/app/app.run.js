/**
 * Run block: bootstrap theme + config, wire route lifecycle to the loading bar,
 * scroll-to-top on navigation, and portal detection for chrome toggling.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').run(runBlock);

  runBlock.$inject = ['$rootScope', '$window', 'ThemeService', 'ConfigService', 'SeoService'];

  function runBlock($rootScope, $window, ThemeService, ConfigService, SeoService) {
    ThemeService.init();
    ConfigService.load();

    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.$loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function (evt, current) {
      $rootScope.$loading = false;
      if ($window.scrollTo) { $window.scrollTo(0, 0); }
      SeoService.reset();
    });

    $rootScope.$on('$routeChangeError', function () {
      $rootScope.$loading = false;
    });
  }
})();
