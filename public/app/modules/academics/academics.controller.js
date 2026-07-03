/**
 * AcademicsController — curriculum, subjects, examination system, academic
 * calendar and homework policy. Static, realistic content for a CBSE-pattern
 * school up to Class X.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('AcademicsController', AcademicsController);

  AcademicsController.$inject = ['SeoService'];

  function AcademicsController(SeoService) {
    var vm = this;
    SeoService.set('Academics', 'Explore the academic programme at Alfalah Academy, Sultana — curriculum from Pre-Primary to Secondary, subjects offered, examination system, academic calendar and homework policy.');

    // ---- Curriculum stages ----
    vm.stages = [
      { icon: 'bi-emoji-smile-fill', title: 'Pre-Primary', grades: 'Nursery – UKG', text: 'Play-based, activity-driven learning that builds language, numeracy and social skills through stories, rhymes and hands-on exploration.' },
      { icon: 'bi-pencil-fill', title: 'Primary', grades: 'Classes I – V', text: 'A strong foundation in languages, mathematics, EVS and computers, with an emphasis on reading habits, curiosity and confidence.' },
      { icon: 'bi-book-fill', title: 'Middle', grades: 'Classes VI – VIII', text: 'Concept-driven study of science, social science, mathematics and languages, supported by labs, projects and activity-based learning.' },
      { icon: 'bi-mortarboard-fill', title: 'Secondary', grades: 'Classes IX – X', text: 'Focused board preparation with regular assessments, doubt-clearing sessions and career guidance to help students excel and choose their path.' }
    ];

    // ---- Subjects offered ----
    vm.subjects = [
      { name: 'English', icon: 'bi-translate' },
      { name: 'Hindi', icon: 'bi-fonts' },
      { name: 'Sanskrit', icon: 'bi-journal-text' },
      { name: 'Mathematics', icon: 'bi-calculator' },
      { name: 'Science', icon: 'bi-eyedropper' },
      { name: 'Social Science', icon: 'bi-globe2' },
      { name: 'Computer Science', icon: 'bi-pc-display' },
      { name: 'General Knowledge', icon: 'bi-lightbulb' },
      { name: 'Art & Craft', icon: 'bi-palette' },
      { name: 'Physical Education', icon: 'bi-dribbble' },
      { name: 'Music', icon: 'bi-music-note-beamed' },
      { name: 'Moral Science', icon: 'bi-heart' }
    ];

    // ---- Examination system (CCE / term structure) ----
    vm.examScheme = [
      { term: 'Term 1', assessments: 'Periodic Test 1 + Half-Yearly Exam', weight: '50%', period: 'April – September' },
      { term: 'Term 2', assessments: 'Periodic Test 2 + Annual Exam', weight: '50%', period: 'October – March' }
    ];
    vm.examNotes = [
      'Continuous and Comprehensive Evaluation (CCE) tracks both scholastic and co-scholastic growth.',
      'Each term carries periodic tests, notebook submission, subject enrichment and a major exam.',
      'Grades A1 to E are awarded along with descriptive feedback for every student.',
      'Report cards are shared with parents at the end of each term during Parent-Teacher Meetings.'
    ];

    // ---- Academic calendar ----
    vm.calendar = [
      { month: 'April', activity: 'New session begins · Orientation · Book distribution' },
      { month: 'May', activity: 'Periodic Test 1 · Summer reading programme' },
      { month: 'June', activity: 'Summer break · Online assignments' },
      { month: 'July', activity: 'Classes resume · Investiture ceremony' },
      { month: 'August', activity: 'Independence Day · Half-Yearly examinations' },
      { month: 'September', activity: 'Teachers\' Day · Annual Sports Day' },
      { month: 'October', activity: 'Periodic Test 2 · Science exhibition · Diwali break' },
      { month: 'November', activity: 'Field trips · Inter-house competitions' },
      { month: 'December', activity: 'Annual Function · Winter activities' },
      { month: 'January', activity: 'Republic Day · Revision & pre-board tests' },
      { month: 'February', activity: 'Project submissions · Practical assessments' },
      { month: 'March', activity: 'Annual examinations · Results & PTM' }
    ];

    // ---- Homework policy ----
    vm.homeworkPolicy = [
      'Homework is meaningful and age-appropriate — designed to reinforce, not overwhelm.',
      'Pre-Primary children are given only light, activity-based tasks and reading practice.',
      'Primary classes receive assignments that can be comfortably completed within an hour.',
      'A weekly homework diary keeps parents informed of daily tasks and submissions.',
      'Weekends and holidays focus on reading, projects and creative activities rather than written work.',
      'Teachers provide timely feedback so students learn from every assignment.'
    ];
  }
})();
