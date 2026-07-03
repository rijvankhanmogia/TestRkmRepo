/**
 * AuthService — JWT auth backed by the Express API, with a demo fallback so the
 * public build works without a running backend (sample credentials from the spec).
 */
(function () {
  'use strict';

  angular.module('alfalahApp').factory('AuthService', AuthService);

  AuthService.$inject = ['ApiService', '$q', '$rootScope'];

  function AuthService(ApiService, $q, $rootScope) {
    var TOKEN_KEY = 'alfalah_token';
    var USER_KEY = 'alfalah_user';

    // Demo users — mirrors backend seed. Used only if the API is unreachable.
    var DEMO = [
      { email: 'admin@alfalahacademy', password: 'Admin@123', role: 'admin', name: 'System Administrator' },
      { email: 'teacher@alfalahacademy', password: 'Teacher@123', role: 'teacher', name: 'Demo Teacher' },
      { email: 'student@alfalahacademy', password: 'Student@123', role: 'student', name: 'Demo Student' }
    ];

    return {
      login: login,
      logout: logout,
      currentUser: currentUser,
      isLoggedIn: function () { return !!currentUser(); },
      hasRole: function (role) { var u = currentUser(); return !!u && u.role === role; },
      homeFor: homeFor
    };

    function login(email, password, role) {
      return ApiService.post('/auth/login', { email: email, password: password, role: role })
        .then(function (data) {
          persist(data.token, data.user);
          return data.user;
        })
        .catch(function () {
          // Offline / no backend → demo fallback.
          var match = DEMO.filter(function (u) {
            return u.email === (email || '').trim().toLowerCase() && u.password === password && (!role || u.role === role);
          })[0];
          if (!match) { return $q.reject({ message: 'Invalid credentials' }); }
          var user = { email: match.email, role: match.role, name: match.name, demo: true };
          persist('demo.' + match.role + '.token', user);
          return user;
        });
    }

    function persist(token, user) {
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      $rootScope.$broadcast('auth:changed', user);
    }

    function logout(broadcast) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
      if (broadcast !== false) { $rootScope.$broadcast('auth:changed', null); }
    }

    function currentUser() {
      try { return JSON.parse(window.localStorage.getItem(USER_KEY)); }
      catch (e) { return null; }
    }

    function homeFor(role) {
      return '/portal/' + (role || 'student');
    }
  }
})();
