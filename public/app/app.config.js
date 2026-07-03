/**
 * Global HTTP config: attach JWT to requests, handle 401 globally.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').config(configHttp);

  configHttp.$inject = ['$httpProvider', '$locationProvider'];

  function configHttp($httpProvider, $locationProvider) {
    // Hashbang routing (no server rewrite needed → deploys anywhere, incl. Vercel static)
    $locationProvider.hashPrefix('!');

    $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
      return {
        request: function (cfg) {
          var token = window.localStorage.getItem('alfalah_token');
          if (token && cfg.url && cfg.url.indexOf('/api') !== -1) {
            cfg.headers = cfg.headers || {};
            cfg.headers.Authorization = 'Bearer ' + token;
          }
          return cfg;
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            var auth = $injector.get('AuthService');
            var $location = $injector.get('$location');
            auth.logout(false);
            // Only bounce to login if we were inside a protected area
            if ($location.path().indexOf('/portal') === 0) {
              $location.path('/login');
            }
          }
          return $q.reject(rejection);
        }
      };
    }]);
  }
})();
