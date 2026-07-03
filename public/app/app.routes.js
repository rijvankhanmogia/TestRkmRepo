/**
 * Route table. Public pages + auth + three role portals.
 * `resolve.auth` guards portal routes by required role.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').config(routes);

  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    // Role guard factory used in resolve blocks.
    function requireRole(role) {
      return ['$q', '$location', 'AuthService', function ($q, $location, AuthService) {
        var user = AuthService.currentUser();
        if (!user) {
          $location.path('/login').search({ role: role, redirect: $location.path() });
          return $q.reject('unauthenticated');
        }
        if (role && user.role !== role) {
          $location.path('/login').search({ role: role });
          return $q.reject('forbidden');
        }
        return user;
      }];
    }

    $routeProvider
      // ---------- Public ----------
      .when('/', { templateUrl: 'app/modules/home/home.html', controller: 'HomeController', controllerAs: 'vm' })
      .when('/about', { templateUrl: 'app/modules/about/about.html', controller: 'AboutController', controllerAs: 'vm' })
      .when('/academics', { templateUrl: 'app/modules/academics/academics.html', controller: 'AcademicsController', controllerAs: 'vm' })
      .when('/faculty', { templateUrl: 'app/modules/faculty/faculty.html', controller: 'FacultyController', controllerAs: 'vm' })
      .when('/gallery', { templateUrl: 'app/modules/gallery/gallery.html', controller: 'GalleryController', controllerAs: 'vm' })
      .when('/news', { templateUrl: 'app/modules/news/news.html', controller: 'NewsController', controllerAs: 'vm' })
      .when('/news/:id', { templateUrl: 'app/modules/news/news-detail.html', controller: 'NewsController', controllerAs: 'vm' })
      .when('/admissions', { templateUrl: 'app/modules/admissions/admissions.html', controller: 'AdmissionsController', controllerAs: 'vm' })
      .when('/contact', { templateUrl: 'app/modules/contact/contact.html', controller: 'ContactController', controllerAs: 'vm' })
      .when('/enquiry', { templateUrl: 'app/modules/enquiry/enquiry.html', controller: 'EnquiryController', controllerAs: 'vm' })

      // ---------- Auth ----------
      .when('/login', { templateUrl: 'app/modules/auth/login.html', controller: 'LoginController', controllerAs: 'vm' })

      // ---------- Student portal ----------
      .when('/portal/student', {
        templateUrl: 'app/modules/student/student.html',
        controller: 'StudentController', controllerAs: 'vm',
        resolve: { auth: requireRole('student') }
      })
      .when('/portal/student/:section', {
        templateUrl: 'app/modules/student/student.html',
        controller: 'StudentController', controllerAs: 'vm',
        resolve: { auth: requireRole('student') }
      })

      // ---------- Teacher portal ----------
      .when('/portal/teacher', {
        templateUrl: 'app/modules/teacher/teacher.html',
        controller: 'TeacherController', controllerAs: 'vm',
        resolve: { auth: requireRole('teacher') }
      })
      .when('/portal/teacher/:section', {
        templateUrl: 'app/modules/teacher/teacher.html',
        controller: 'TeacherController', controllerAs: 'vm',
        resolve: { auth: requireRole('teacher') }
      })

      // ---------- Admin portal ----------
      .when('/portal/admin', {
        templateUrl: 'app/modules/admin/admin.html',
        controller: 'AdminController', controllerAs: 'vm',
        resolve: { auth: requireRole('admin') }
      })
      .when('/portal/admin/:section', {
        templateUrl: 'app/modules/admin/admin.html',
        controller: 'AdminController', controllerAs: 'vm',
        resolve: { auth: requireRole('admin') }
      })

      // ---------- Errors ----------
      .when('/500', { templateUrl: 'app/modules/errors/500.html' })
      .otherwise({ templateUrl: 'app/modules/errors/404.html' });
  }
})();
