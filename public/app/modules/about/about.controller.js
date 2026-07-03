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
        name: 'Mohd. Mustak', role: 'Principal', icon: 'bi-person-badge',
        text: 'When Alfalah Academy opened its doors in Sultana, our dream was simple — to bring modern, values-based education within reach of every family in Chirawa. Today, walking through our classrooms, I see that dream alive in the curiosity of our students. We focus not only on marks, but on character, confidence and compassion. I warmly invite you to visit our campus and become part of the Alfalah family.'
      },
      {
        name: 'Molana Mohammad', role: 'Chairman', icon: 'bi-person-vcard',
        text: 'In the Name of Allah, the Most Gracious, the Most Merciful.\n\n' +
              'Dear Students, Teachers & Parents,\nAssalamu Alaikum.\n\n' +
              'At our Islamic school, we strive to build both knowledge and character upon Islamic values. Let us work together with sincerity, discipline, and respect to shape a bright future for our children in this world and the Hereafter.\n\n' +
              'May Allah bless our efforts and grant success to all.'
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
