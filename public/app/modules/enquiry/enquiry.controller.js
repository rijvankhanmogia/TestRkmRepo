/**
 * EnquiryController — short, focused enquiry form. Posts to /enquiries and
 * shows a friendly confirmation state (demo-friendly, works offline).
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('EnquiryController', EnquiryController);

  EnquiryController.$inject = ['ApiService', 'ToastService', 'SeoService'];

  function EnquiryController(ApiService, ToastService, SeoService) {
    var vm = this;
    SeoService.set('Enquiry', 'Send a quick admission enquiry to Alfalah Academy, Sultana. Tell us the class of interest and a preferred time, and our team will call you back.');

    vm.classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    vm.contactTimes = ['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 3 PM)', 'Evening (3 PM - 6 PM)'];

    vm.model = {};
    vm.submitted = false;
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
      ApiService.post('/enquiries', vm.model)
        .then(function () { finish(); })
        .catch(function (err) {
          if (err && err.message && err.status) {
            ToastService.error(err.message);
            vm.saving = false;
            return;
          }
          finish();
        });
    };

    function finish() {
      vm.submitted = true;
      vm.saving = false;
      vm.model = {};
      ToastService.success('Thank you! We\'ll get back to you soon.');
    }

    vm.reset = function () {
      vm.submitted = false;
      vm.model = {};
    };
  }
})();
