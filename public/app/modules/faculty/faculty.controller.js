/**
 * FacultyController — faculty directory with a subject/department filter.
 * Tries the API first, falls back to a rich static list so the page always
 * renders. Photos may be null → template shows an initial in the avatar.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('FacultyController', FacultyController);

  FacultyController.$inject = ['ApiService', 'SeoService'];

  function FacultyController(ApiService, SeoService) {
    var vm = this;
    SeoService.set('Faculty', 'Meet the experienced and caring teachers of Alfalah Academy, Sultana — dedicated educators across languages, sciences, mathematics and the arts.');

    vm.loading = true;
    vm.faculty = [];
    vm.filter = '';

    // Predicate for ng-repeat | filter — strict match avoids substring
    // collisions (e.g. "Science" vs "Social Science").
    vm.matches = function (f) {
      return !vm.filter || f.subject === vm.filter;
    };

    // Distinct subjects for the filter dropdown (built from the loaded list).
    vm.subjects = function () {
      var seen = {};
      var list = [];
      vm.faculty.forEach(function (f) {
        if (f.subject && !seen[f.subject]) { seen[f.subject] = true; list.push(f.subject); }
      });
      return list.sort();
    };

    ApiService.get('/faculty')
      .then(function (data) {
        vm.faculty = (data && data.items) || data || [];
        if (!vm.faculty.length) { vm.faculty = fallback(); }
      })
      .catch(function () { vm.faculty = fallback(); })
      .finally(function () { vm.loading = false; });

    function fallback() {
      return [
        { name: 'Dr. A. Rahman', qualification: 'Ph.D. (Education), M.A., B.Ed.', subject: 'Administration', experience: '22 years', photo: null },
        { name: 'Mrs. Sunita Sharma', qualification: 'M.A. (English), B.Ed.', subject: 'English', experience: '14 years', photo: null },
        { name: 'Mr. Rakesh Saini', qualification: 'M.Sc. (Mathematics), B.Ed.', subject: 'Mathematics', experience: '11 years', photo: null },
        { name: 'Ms. Farhana Bano', qualification: 'M.Sc. (Physics), B.Ed.', subject: 'Science', experience: '9 years', photo: null },
        { name: 'Mr. Mahesh Kumawat', qualification: 'M.A. (History), B.Ed.', subject: 'Social Science', experience: '13 years', photo: null },
        { name: 'Mrs. Kavita Yadav', qualification: 'M.A. (Hindi), B.Ed.', subject: 'Hindi', experience: '16 years', photo: null },
        { name: 'Mr. Imran Khan', qualification: 'MCA, B.Ed.', subject: 'Computer Science', experience: '8 years', photo: null },
        { name: 'Ms. Pooja Meena', qualification: 'B.F.A., D.El.Ed.', subject: 'Art & Craft', experience: '6 years', photo: null },
        { name: 'Mr. Deepak Singh', qualification: 'B.P.Ed., M.P.Ed.', subject: 'Physical Education', experience: '10 years', photo: null }
      ];
    }
  }
})();
