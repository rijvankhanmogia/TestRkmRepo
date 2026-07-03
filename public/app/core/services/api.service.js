/**
 * ApiService — thin wrapper over $http that prefixes the configured API base URL
 * and unwraps the { success, data } envelope returned by the Express backend.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('ApiService', ApiService);

  ApiService.$inject = ['$http', 'ConfigService', '$q'];

  function ApiService($http, ConfigService, $q) {
    return {
      get: function (path, params) { return call('GET', path, null, params); },
      post: function (path, body) { return call('POST', path, body); },
      put: function (path, body) { return call('PUT', path, body); },
      del: function (path) { return call('DELETE', path); }
    };

    function base() {
      var cfg = ConfigService.get();
      return (cfg.api && cfg.api.baseUrl) || 'http://localhost:6013/api';
    }

    function call(method, path, body, params) {
      return $http({
        method: method,
        url: base() + path,
        data: body,
        params: params
      }).then(function (res) {
        // Unwrap envelope when present.
        if (res.data && Object.prototype.hasOwnProperty.call(res.data, 'data')) {
          return res.data.data;
        }
        return res.data;
      }).catch(function (err) {
        var msg = (err.data && err.data.message) || err.statusText || 'Request failed';
        return $q.reject({ status: err.status, message: msg, raw: err });
      });
    }
  }
})();
