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
        { name: 'Molana Mohammad', role: 'Chairman', qualification: 'Aalim', subject: 'Arabic', experience: '25 years', photo: null },
        { name: 'Mohd. Mustak', role: 'Principal', qualification: 'B.Ed (English)', subject: 'English', experience: '17 years', photo: null },
        { name: 'Junaid Kureshi', role: 'Administrator', qualification: 'B.Tech (Computer Science)', subject: 'Computer', experience: '12 years', photo: null },
        { name: 'Mohd Imran', role: 'Teacher', qualification: 'B.Ed (Social Science)', subject: 'Social Science', experience: '10 years', photo: null },
        { name: 'Abdul Wahid', role: 'Teacher', qualification: 'B.Ed (Maths)', subject: 'Maths', experience: '6 years', photo: null },
        { name: 'Imran Khan', role: 'Teacher', qualification: 'M.A. (SSC)', subject: 'SSC', experience: '8 years', photo: null },
        { name: 'Sameer Khokar', role: 'Teacher', qualification: 'M.A. (Computer)', subject: 'Computer Lab', experience: '6 years', photo: null },
        { name: 'Mohammed Irfan', role: 'Teacher', qualification: 'M.Sc (Maths)', subject: 'Maths', experience: '5 years', photo: null },
        { name: 'Hafiz Aijaz', role: 'Teacher', qualification: 'Quran Hafiz', subject: 'Urdu & Arabic', experience: '7 years', photo: null },
        { name: 'Molana Aabid', role: 'Teacher', qualification: 'Quran Hafiz', subject: 'Urdu & Arabic', experience: '10 years', photo: null }
      ];
    }
  }
})();
