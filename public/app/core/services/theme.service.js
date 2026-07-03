/**
 * ThemeService — light/dark mode persisted to localStorage, respects OS preference
 * on first visit. Drives Bootstrap's data-bs-theme attribute via RootController.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('ThemeService', ThemeService);

  function ThemeService() {
    var KEY = 'alfalah_theme';
    var theme = 'light';

    return {
      init: init,
      current: function () { return theme; },
      set: set,
      toggle: function () { set(theme === 'light' ? 'dark' : 'light'); }
    };

    function init() {
      var saved = window.localStorage.getItem(KEY);
      if (saved === 'light' || saved === 'dark') {
        theme = saved;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      }
      apply();
    }

    function set(next) {
      theme = next === 'dark' ? 'dark' : 'light';
      window.localStorage.setItem(KEY, theme);
      apply();
    }

    function apply() {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }
})();
