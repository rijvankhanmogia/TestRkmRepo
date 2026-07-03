/**
 * ToastService — lightweight toast queue rendered by <toast-host>.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('ToastService', ToastService);

  ToastService.$inject = ['$timeout'];

  function ToastService($timeout) {
    var toasts = [];
    var seq = 0;

    return {
      list: function () { return toasts; },
      success: function (m, t) { return push('success', m, t); },
      error: function (m, t) { return push('error', m, t); },
      info: function (m, t) { return push('info', m, t); },
      warning: function (m, t) { return push('warning', m, t); },
      dismiss: dismiss
    };

    function push(type, message, title) {
      var toast = { id: ++seq, type: type, message: message, title: title };
      toasts.push(toast);
      $timeout(function () { dismiss(toast.id); }, 4500);
      return toast.id;
    }

    function dismiss(id) {
      for (var i = 0; i < toasts.length; i++) {
        if (toasts[i].id === id) { toasts.splice(i, 1); break; }
      }
    }
  }
})();
