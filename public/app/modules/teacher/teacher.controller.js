/**
 * TeacherController — Teacher Portal dashboard. Self-contained mock data.
 * Section routing via /portal/teacher/:section.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('TeacherController', TeacherController);

  TeacherController.$inject = ['$location', '$routeParams', 'AuthService', 'ToastService'];

  function TeacherController($location, $routeParams, AuthService, ToastService) {
    var vm = this;

    vm.user = AuthService.currentUser() || { name: 'Demo Teacher', email: 'teacher@alfalahacademy', role: 'teacher' };
    vm.active = $routeParams.section || 'dashboard';

    vm.menu = [
      { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
      { id: 'attendance', label: 'Attendance', icon: 'bi-calendar-check' },
      { id: 'homework', label: 'Homework', icon: 'bi-journal-plus' },
      { id: 'assignments', label: 'Assignments', icon: 'bi-file-earmark-plus' },
      { id: 'marks', label: 'Marks Entry', icon: 'bi-pencil-square' },
      { id: 'exams', label: 'Exams', icon: 'bi-clipboard-data' },
      { id: 'timetable', label: 'Timetable', icon: 'bi-table' },
      { id: 'students', label: 'Students', icon: 'bi-people' },
      { id: 'leave', label: 'Leave', icon: 'bi-envelope-paper' },
      { id: 'announcements', label: 'Announcements', icon: 'bi-megaphone' },
      { id: 'messages', label: 'Messages', icon: 'bi-chat-dots' },
      { id: 'profile', label: 'My Profile', icon: 'bi-person-vcard' },
      { id: 'settings', label: 'Settings', icon: 'bi-gear' }
    ];

    vm.select = function (section) { $location.path('/portal/teacher/' + section); };
    vm.logout = function () { AuthService.logout(); $location.path('/login'); };

    // ---- KPIs ----
    vm.kpis = [
      { label: 'My Classes', value: 5, icon: 'bi-easel', bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
      { label: 'Total Students', value: 168, icon: 'bi-people', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
      { label: 'Classes Today', value: 4, icon: 'bi-calendar-day', bg: 'linear-gradient(135deg,#10b981,#059669)' },
      { label: 'Pending Marks', value: 2, icon: 'bi-pencil-square', bg: 'linear-gradient(135deg,#f59e0b,#d97706)' }
    ];

    vm.todaySchedule = [
      { period: 1, time: '08:00 - 08:45', cls: 'VIII-A', subject: 'Mathematics', room: 'R-201' },
      { period: 2, time: '08:45 - 09:30', cls: 'VII-B', subject: 'Mathematics', room: 'R-105' },
      { period: 4, time: '10:30 - 11:15', cls: 'VIII-B', subject: 'Mathematics', room: 'R-202' },
      { period: 6, time: '12:30 - 01:15', cls: 'IX-A', subject: 'Mathematics', room: 'R-301' }
    ];

    // ---- Classes / roster ----
    vm.classes = ['VIII-A', 'VIII-B', 'VII-B', 'IX-A', 'VI-C'];
    vm.selectedClass = vm.classes[0];

    vm.roster = [
      { roll: 1, name: 'Aarav Sharma', present: true },
      { roll: 2, name: 'Fatima Sheikh', present: true },
      { roll: 3, name: 'Rohan Mehta', present: true },
      { roll: 4, name: 'Zoya Khan', present: false },
      { roll: 5, name: 'Karan Patel', present: true },
      { roll: 6, name: 'Ananya Iyer', present: true },
      { roll: 7, name: 'Mohammed Ali', present: true },
      { roll: 8, name: 'Priya Nair', present: false }
    ];
    vm.setPresent = function (student, val) { student.present = val; };
    vm.saveAttendance = function () {
      var p = vm.roster.filter(function (s) { return s.present; }).length;
      ToastService.success('Attendance saved for ' + vm.selectedClass + ' (' + p + '/' + vm.roster.length + ' present)');
    };

    // ---- Marks entry ----
    vm.exams = ['Unit Test 1', 'Mid Term', 'Unit Test 2', 'Final Term'];
    vm.selectedExam = vm.exams[1];
    vm.marksRoster = [
      { roll: 1, name: 'Aarav Sharma', marks: 88 },
      { roll: 2, name: 'Fatima Sheikh', marks: 92 },
      { roll: 3, name: 'Rohan Mehta', marks: 74 },
      { roll: 4, name: 'Zoya Khan', marks: 81 },
      { roll: 5, name: 'Karan Patel', marks: 66 },
      { roll: 6, name: 'Ananya Iyer', marks: 95 }
    ];
    vm.submitMarks = function () {
      ToastService.success('Marks submitted for ' + vm.selectedClass + ' — ' + vm.selectedExam);
    };

    // ---- Students ----
    vm.studentSearch = '';
    vm.students = [
      { roll: 1, name: 'Aarav Sharma', cls: 'VIII-A', contact: '+91 98765 43210' },
      { roll: 2, name: 'Fatima Sheikh', cls: 'VIII-A', contact: '+91 98111 22233' },
      { roll: 3, name: 'Rohan Mehta', cls: 'VIII-A', contact: '+91 97000 11122' },
      { roll: 4, name: 'Zoya Khan', cls: 'VIII-B', contact: '+91 96500 33445' },
      { roll: 5, name: 'Karan Patel', cls: 'VII-B', contact: '+91 90000 55667' },
      { roll: 6, name: 'Ananya Iyer', cls: 'IX-A', contact: '+91 93333 77889' },
      { roll: 7, name: 'Mohammed Ali', cls: 'IX-A', contact: '+91 98989 12121' },
      { roll: 8, name: 'Priya Nair', cls: 'VI-C', contact: '+91 97878 34343' }
    ];

    // ---- Homework ----
    vm.newHomework = { cls: vm.classes[0], subject: 'Mathematics', title: '', description: '', due: '' };
    vm.postedHomework = [
      { cls: 'VIII-A', subject: 'Mathematics', title: 'Exercise 5.2 — Linear Equations', due: '2026-07-04' },
      { cls: 'VII-B', subject: 'Mathematics', title: 'Fractions worksheet', due: '2026-07-05' }
    ];
    vm.postHomework = function () {
      if (!vm.newHomework.title) { ToastService.warning('Please enter a homework title'); return; }
      vm.postedHomework.unshift({
        cls: vm.newHomework.cls, subject: vm.newHomework.subject,
        title: vm.newHomework.title, due: vm.newHomework.due || 'TBD'
      });
      ToastService.success('Homework posted to ' + vm.newHomework.cls);
      vm.newHomework.title = ''; vm.newHomework.description = ''; vm.newHomework.due = '';
    };
  }
})();
