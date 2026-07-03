/**
 * <toast-host> — renders the ToastService queue.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').component('toastHost', {
    template:
      '<div class="toast-host" aria-live="polite" aria-atomic="true">' +
      '  <div class="aa-toast" ng-class="t.type" ng-repeat="t in $ctrl.toasts()" role="alert">' +
      '    <i class="bi ti" ng-class="{success:\'bi-check-circle-fill\', error:\'bi-x-circle-fill\', info:\'bi-info-circle-fill\', warning:\'bi-exclamation-triangle-fill\'}[t.type]"></i>' +
      '    <div class="flex-grow-1">' +
      '      <div class="fw-semibold" ng-if="t.title">{{ t.title }}</div>' +
      '      <div class="small text-body-secondary">{{ t.message }}</div>' +
      '    </div>' +
      '    <button type="button" class="btn-close btn-sm" aria-label="Dismiss" ng-click="$ctrl.dismiss(t.id)"></button>' +
      '  </div>' +
      '</div>',
    controller: ['ToastService', function (ToastService) {
      var vm = this;
      vm.toasts = ToastService.list;
      vm.dismiss = ToastService.dismiss;
    }]
  });
})();
