/**
 * <site-footer> — public footer with quick links, contact, and social.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').component('siteFooter', {
    templateUrl: 'app/shared/footer/footer.html',
    controller: ['ConfigService', function (ConfigService) {
      var vm = this;
      vm.cfg = ConfigService.get();
      vm.year = new Date().getFullYear();
    }]
  });
})();
