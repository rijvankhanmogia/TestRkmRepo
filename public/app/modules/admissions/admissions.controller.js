/**
 * AdmissionsController — admission process, eligibility, documents, fee structure
 * and the online admission form. Posts to /admissions with a demo-friendly
 * confirmation state so the page works with or without a live backend.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('AdmissionsController', AdmissionsController);

  AdmissionsController.$inject = ['ConfigService', 'ApiService', 'ToastService', 'SeoService'];

  function AdmissionsController(ConfigService, ApiService, ToastService, SeoService) {
    var vm = this;
    SeoService.set('Admissions', 'Admissions open for 2026-27 at Alfalah Academy, Sultana — admission process, eligibility, required documents, fee structure and online application form for classes Nursery to X.');

    vm.cfg = ConfigService.get();

    // ---- Classes offered ----
    vm.classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

    // ---- Admission process ----
    vm.processSteps = [
      { title: 'Enquiry & Registration', text: 'Fill the online enquiry or admission form, or visit the school office to collect a registration form.' },
      { title: 'Submit Documents', text: 'Provide the required documents along with recent passport-size photographs of the child.' },
      { title: 'Interaction / Assessment', text: 'A friendly interaction for early years, or a simple assessment for higher classes to understand your child.' },
      { title: 'Confirmation & Fee Payment', text: 'On selection, complete the admission by paying the applicable fees to reserve the seat.' }
    ];

    // ---- Eligibility (class-wise age criteria) ----
    vm.eligibility = [
      { klass: 'Nursery', age: '3+ years as on 31st March' },
      { klass: 'LKG', age: '4+ years as on 31st March' },
      { klass: 'UKG', age: '5+ years as on 31st March' },
      { klass: 'Class I', age: '6+ years as on 31st March' },
      { klass: 'Classes II - X', age: 'Age-appropriate promotion from previous class' }
    ];

    // ---- Required documents ----
    vm.documents = [
      'Birth certificate of the child (photocopy)',
      'Aadhaar card of the child',
      'Recent passport-size photographs (4 nos.)',
      'Transfer Certificate (TC) from previous school (Classes I - X)',
      'Previous class report card / mark sheet',
      'Aadhaar card of parent / guardian',
      'Residential address proof'
    ];

    // ---- Fee structure (realistic INR values) ----
    vm.fees = [
      { group: 'Nursery - UKG', admission: 2500, monthly: 900, annual: 3500 },
      { group: 'Classes I - V', admission: 3000, monthly: 1100, annual: 4000 },
      { group: 'Classes VI - VIII', admission: 3500, monthly: 1400, annual: 4800 },
      { group: 'Classes IX - X', admission: 4500, monthly: 1800, annual: 6000 }
    ];

    // ---- Form model + state ----
    vm.model = {};
    vm.submitted = false;
    vm.reference = null;
    vm.saving = false;

    vm.submit = function (form) {
      if (!form || form.$invalid) {
        if (form) {
          angular.forEach(form.$error, function (fields) {
            angular.forEach(fields, function (field) { field.$setTouched(); });
          });
        }
        ToastService.error('Please fill all required fields correctly.');
        return;
      }

      vm.saving = true;
      ApiService.post('/admissions', vm.model)
        .then(function (data) {
          finish((data && data.reference) || null);
        })
        .catch(function (err) {
          // Demo mode: still confirm, but surface a real error message if present.
          if (err && err.message && err.status) {
            ToastService.error(err.message);
            vm.saving = false;
            return;
          }
          finish(null);
        });
    };

    function finish(reference) {
      vm.reference = reference || ('ALF-' + Date.now());
      vm.submitted = true;
      vm.saving = false;
      vm.model = {};
      ToastService.success('Application submitted successfully!');
    }

    vm.applyAnother = function () {
      vm.submitted = false;
      vm.reference = null;
      vm.model = {};
    };
  }
})();
