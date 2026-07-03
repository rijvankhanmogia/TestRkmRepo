/**
 * `reveal` — adds .is-visible when the element scrolls into view (IntersectionObserver).
 * Usage: <div class="reveal delay-1">…</div>  (the class is already present in markup)
 * This directive just observes any element carrying the `reveal` class.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').directive('reveal', reveal);

  function reveal() {
    return {
      restrict: 'C',
      link: function (scope, element) {
        var el = element[0];
        if (!('IntersectionObserver' in window)) {
          el.classList.add('is-visible');
          return;
        }
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        obs.observe(el);
        scope.$on('$destroy', function () { obs.disconnect(); });
      }
    };
  }
})();
