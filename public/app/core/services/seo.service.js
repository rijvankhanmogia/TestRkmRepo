/**
 * SeoService — updates <title> and meta description per route for basic SEO.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('SeoService', SeoService);

  SeoService.$inject = ['$document'];

  function SeoService($document) {
    var BASE = 'Alfalah Academy';
    var DEFAULT_DESC = 'Alfalah Academy, Sultana — a modern school with smart classrooms, labs, sports and holistic development.';

    return { set: set, reset: reset };

    function set(title, description) {
      $document[0].title = title ? (title + ' | ' + BASE) : (BASE + ' | Nurturing Knowledge, Building Character');
      var meta = $document[0].querySelector('meta[name="description"]');
      if (meta) { meta.setAttribute('content', description || DEFAULT_DESC); }
    }

    function reset() { set(null, DEFAULT_DESC); }
  }
})();
