/**
 * count-up — animates a number from 0 to `count-up` when scrolled into view.
 * Usage: <span count-up="1200" cu-suffix="+" cu-duration="1600"></span>
 */
(function () {
  'use strict';

  angular.module('alfalahApp').directive('countUp', countUp);

  function countUp() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var target = parseFloat(attrs.countUp) || 0;
        var suffix = attrs.cuSuffix || '';
        var duration = parseInt(attrs.cuDuration, 10) || 1500;
        var done = false;

        function run() {
          if (done) { return; }
          done = true;
          var start = null;
          function step(ts) {
            if (!start) { start = ts; }
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            element.text(Math.floor(eased * target).toLocaleString('en-IN') + suffix);
            if (progress < 1) { window.requestAnimationFrame(step); }
            else { element.text(target.toLocaleString('en-IN') + suffix); }
          }
          window.requestAnimationFrame(step);
        }

        if (!('IntersectionObserver' in window)) { run(); return; }
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { run(); obs.disconnect(); } });
        }, { threshold: 0.4 });
        obs.observe(element[0]);
        scope.$on('$destroy', function () { obs.disconnect(); });
      }
    };
  }
})();
