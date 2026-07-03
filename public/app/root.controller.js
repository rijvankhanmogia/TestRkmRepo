/**
 * RootController — owns app-level chrome state: theme, loading bar, portal detection.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('RootController', RootController);

  RootController.$inject = ['$rootScope', '$location', '$window', 'ThemeService'];

  function RootController($rootScope, $location, $window, ThemeService) {
    var vm = this;

    Object.defineProperty(vm, 'theme', { get: function () { return ThemeService.current(); } });
    Object.defineProperty(vm, 'loading', { get: function () { return !!$rootScope.$loading; } });
    Object.defineProperty(vm, 'isPortal', {
      get: function () {
        var p = $location.path();
        return p.indexOf('/portal') === 0 || p === '/login';
      }
    });

    vm.scrollTop = function () { $window.scrollTo({ top: 0, behavior: 'smooth' }); };
  }
})();
