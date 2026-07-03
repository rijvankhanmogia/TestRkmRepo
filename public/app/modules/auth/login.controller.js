/**
 * LoginController — unified login for Student / Teacher / Admin roles.
 * Reads the default role from the query string, authenticates via AuthService
 * (which has a demo fallback), and redirects to the role's portal home.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$routeParams', 'AuthService', 'ToastService', 'SeoService'];

  function LoginController($location, $routeParams, AuthService, ToastService, SeoService) {
    var vm = this;
    SeoService.set('Login', 'Sign in to the Alfalah Academy portal — students, teachers and administrators.');

    var VALID_ROLES = ['student', 'teacher', 'admin'];

    vm.roles = [
      { id: 'student', label: 'Student', icon: 'bi-mortarboard-fill' },
      { id: 'teacher', label: 'Teacher', icon: 'bi-person-workspace' },
      { id: 'admin', label: 'Admin', icon: 'bi-shield-lock-fill' }
    ];

    // Default role from ?role= (route search), falling back to student.
    var requested = ($routeParams.role || $location.search().role || '').toLowerCase();
    vm.role = VALID_ROLES.indexOf(requested) !== -1 ? requested : 'student';

    vm.email = '';
    vm.password = '';
    vm.showPass = false;
    vm.loading = false;

    // Demo credentials for the click-to-fill helper.
    vm.demoAccounts = [
      { role: 'admin', label: 'Admin', email: 'admin@alfalahacademy', password: 'Admin@123' },
      { role: 'teacher', label: 'Teacher', email: 'teacher@alfalahacademy', password: 'Teacher@123' },
      { role: 'student', label: 'Student', email: 'student@alfalahacademy', password: 'Student@123' }
    ];

    vm.setRole = function (role) { vm.role = role; };

    vm.fill = function (account) {
      vm.email = account.email;
      vm.password = account.password;
      vm.role = account.role;
    };

    vm.login = function () {
      if (!vm.email || !vm.password) {
        ToastService.error('Please enter your email and password.');
        return;
      }
      vm.loading = true;
      AuthService.login(vm.email, vm.password, vm.role)
        .then(function (user) {
          ToastService.success('Welcome back, ' + (user.name || user.email) + '!');
          var redirect = $location.search().redirect;
          $location.path(redirect || AuthService.homeFor(user.role)).search({});
        })
        .catch(function () {
          ToastService.error('Invalid credentials');
        })
        .finally(function () { vm.loading = false; });
    };
  }
})();
