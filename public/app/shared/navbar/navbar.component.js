/**
 * <site-navbar> — sticky public navbar with theme toggle and active-link tracking.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').component('siteNavbar', {
    templateUrl: 'app/shared/navbar/navbar.html',
    controller: NavbarController
  });

  NavbarController.$inject = ['$scope', '$location', '$window', 'ThemeService', 'ConfigService', 'AuthService'];

  function NavbarController($scope, $location, $window, ThemeService, ConfigService, AuthService) {
    var vm = this;
    vm.cfg = ConfigService.get();
    vm.scrolled = false;
    vm.collapsed = true;

    vm.links = [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
      { path: '/academics', label: 'Academics' },
      { path: '/faculty', label: 'Faculty' },
      { path: '/gallery', label: 'Gallery' },
      { path: '/news', label: 'News & Events' },
      { path: '/contact', label: 'Contact' }
    ];

    vm.isActive = function (path) {
      var p = $location.path();
      return path === '/' ? p === '/' : p.indexOf(path) === 0;
    };
    vm.go = function (path) { $location.path(path); vm.collapsed = true; };
    vm.toggleTheme = ThemeService.toggle;
    vm.theme = function () { return ThemeService.current(); };
    vm.user = AuthService.currentUser;
    vm.portalHome = function () {
      var u = AuthService.currentUser();
      return u ? AuthService.homeFor(u.role) : '/login';
    };

    function onScroll() {
      var s = ($window.pageYOffset || 0) > 12;
      if (s !== vm.scrolled) {
        vm.scrolled = s;
        $scope.$applyAsync();
      }
    }
    angular.element($window).on('scroll', onScroll);
    $scope.$on('$destroy', function () { angular.element($window).off('scroll', onScroll); });
  }
})();
