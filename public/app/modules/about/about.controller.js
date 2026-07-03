/**
 * AboutController — school story, vision/mission/values, leadership messages
 * and a staff overview. Static content with realistic school details.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('AboutController', AboutController);

  AboutController.$inject = ['ConfigService', 'SeoService'];

  function AboutController(ConfigService, SeoService) {
    var vm = this;
    SeoService.set('About Us', 'Learn about Alfalah Academy, Sultana — our history, vision, mission, values and the dedicated leadership and staff shaping young minds in Chirawa, Jhunjhunu, Rajasthan.');

    vm.cfg = ConfigService.get();

    // ---- Vision / Mission / Values ----
    vm.pillars = [
      { icon: 'bi-eye-fill', title: 'Our Vision', text: 'To be a leading centre of learning in the Shekhawati region — where academic excellence, strong values and modern skills prepare every child to thrive in a changing world.' },
      { icon: 'bi-flag-fill', title: 'Our Mission', text: 'To provide affordable, quality education in a safe and caring environment; to blend a rigorous curriculum with technology, sports and moral grounding; and to nurture confident, responsible citizens.' },
      { icon: 'bi-heart-fill', title: 'Our Values', text: 'Respect, honesty, discipline and compassion guide life at Alfalah. We celebrate curiosity, reward effort, and believe every child carries a unique spark worth nurturing.' }
    ];

    // ---- Leadership messages ----
    vm.messages = [
      {
        name: 'Dr. A. Rahman', role: 'Principal', icon: 'bi-person-badge',
        text: 'When Alfalah Academy opened its doors in Sultana, our dream was simple — to bring modern, values-based education within reach of every family in Chirawa. Today, walking through our classrooms, I see that dream alive in the curiosity of our students. We focus not only on marks, but on character, confidence and compassion. I warmly invite you to visit our campus and become part of the Alfalah family.'
      },
      {
        name: 'Haji Mohd. Yusuf', role: 'Chairman', icon: 'bi-person-vcard',
        text: 'Education is the truest form of service to society. Alfalah Academy was founded on the belief that a child from a small town deserves the same opportunities as any in the city. We have invested in smart classrooms, well-equipped labs and, above all, teachers who care. As Chairman, my commitment is to keep raising the bar — so that our students step into the world well-prepared and grounded in good values.'
      }
    ];

    // ---- Staff overview ----
    vm.staffStats = [
      { label: 'Teaching Staff', value: 62, suffix: '+', icon: 'bi-person-workspace' },
      { label: 'Support Staff', value: 24, suffix: '+', icon: 'bi-people-fill' },
      { label: 'Departments', value: 9, suffix: '', icon: 'bi-diagram-3-fill' }
    ];
  }
})();
