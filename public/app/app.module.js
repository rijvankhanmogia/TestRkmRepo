/**
 * Alfalah Academy — root AngularJS module.
 * Dependencies: routing, animations (reveal/transitions), sanitize (safe HTML).
 */
(function () {
  'use strict';

  angular.module('alfalahApp', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize'
  ]);
})();
