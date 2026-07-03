/**
 * ConfigService — loads /config.json once and exposes it app-wide.
 * Falls back to sensible defaults if the file is unavailable.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('ConfigService', ConfigService);

  ConfigService.$inject = ['$http', '$q'];

  function ConfigService($http, $q) {
    var DEFAULTS = {
      app: { name: 'Alfalah Academy', tagline: 'Nurturing Faith, Knowledge & Character' },
      contact: {
        email: 'alfalahacademysultana@gmail.com',
        phone: '+91 97851 27874',
        officeTiming: 'Monday - Saturday, 7:30 AM - 1:30 PM',
        address: { line1: 'Kishorpura Road, Sultana', line2: 'Tahsil - Chirawa', district: '', state: 'Rajasthan - 333028', country: 'India' },
        map: { lat: 28.124088, lng: 75.609324, zoom: 15 }
      },
      social: {},
      api: { baseUrl: 'http://localhost:6013/api' },
      stats: []
    };

    var cache = angular.copy(DEFAULTS);
    var loaded = null;

    return {
      load: load,
      get: function () { return cache; }
    };

    function load() {
      if (loaded) { return loaded; }
      loaded = $http.get('config.json', { cache: false }).then(function (res) {
        // Mutate the SAME object in place so every controller/component that
        // already captured ConfigService.get() sees the merged values.
        angular.merge(cache, res.data || {});
        return cache;
      }).catch(function () {
        return cache; // keep defaults
      });
      return loaded;
    }
  }
})();
