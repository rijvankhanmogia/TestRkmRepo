/**
 * ContactController — contact details, social links, contact form and map.
 * Posts messages to /contact with a toast + form reset (demo-friendly).
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('ContactController', ContactController);

  ContactController.$inject = ['ConfigService', 'ApiService', 'ToastService', 'SeoService'];

  function ContactController(ConfigService, ApiService, ToastService, SeoService) {
    var vm = this;
    SeoService.set('Contact Us', 'Get in touch with Alfalah Academy, Sultana (Chirawa, Jhunjhunu, Rajasthan). Find our address, email, phone, office timing and location map, or send us a message.');

    vm.cfg = ConfigService.get();
    vm.model = {};
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
      ApiService.post('/contact', vm.model)
        .then(function () {
          done(form);
        })
        .catch(function (err) {
          if (err && err.message && err.status) {
            ToastService.error(err.message);
            vm.saving = false;
            return;
          }
          done(form);
        });
    };

    function done(form) {
      ToastService.success('Thank you! Your message has been sent.');
      vm.model = {};
      vm.saving = false;
      if (form) { form.$setPristine(); form.$setUntouched(); form.$submitted = false; }
    }
  }
})();
