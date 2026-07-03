/**
 * <section-heading eyebrow="" heading="" sub=""> — consistent centered section header.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').component('sectionHeading', {
    bindings: { eyebrow: '@', heading: '@', sub: '@', align: '@' },
    template:
      '<div class="mb-5" ng-class="$ctrl.align === \'start\' ? \'text-start\' : \'text-center\'">' +
      '  <span class="eyebrow reveal" ng-if="$ctrl.eyebrow"><i class="bi bi-stars"></i>{{ $ctrl.eyebrow }}</span>' +
      '  <h2 class="mt-3 mb-2 reveal delay-1">{{ $ctrl.heading }}</h2>' +
      '  <p class="lead mb-0 reveal delay-2 mx-auto" ng-if="$ctrl.sub" style="max-width:680px">{{ $ctrl.sub }}</p>' +
      '</div>'
  });
})();
