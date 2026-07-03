/**
 * <portal-shell> — dashboard chrome shared by student/teacher/admin portals:
 * collapsible sidebar, topbar, theme toggle, logout. Content is transcluded.
 *
 * Bindings:
 *   role      '@'  → 'student' | 'teacher' | 'admin'
 *   menu      '<'  → [{ id, label, icon }]
 *   active    '<'  → current section id
 *   user      '<'  → current user object
 *   onSelect  '&'  → callback(section)
 *   onLogout  '&'
 */
(function () {
  'use strict';

  angular.module('alfalahApp').component('portalShell', {
    templateUrl: 'app/shared/portal-shell/portal-shell.html',
    transclude: true,
    bindings: {
      role: '@',
      title: '@',
      menu: '<',
      active: '<',
      user: '<',
      onSelect: '&',
      onLogout: '&'
    },
    controller: ['ThemeService', function (ThemeService) {
      var vm = this;
      vm.collapsed = false;
      vm.mobileOpen = false;
      vm.toggle = function () { vm.collapsed = !vm.collapsed; };
      vm.toggleTheme = ThemeService.toggle;
      vm.theme = ThemeService.current;
      vm.select = function (id) { vm.mobileOpen = false; vm.onSelect({ section: id }); };
      vm.activeLabel = function () {
        var m = (vm.menu || []).filter(function (x) { return x.id === vm.active; })[0];
        return m ? m.label : '';
      };
    }]
  });
})();
