/**
 * StudentController — Student Portal dashboard. Self-contained mock data so the
 * portal renders fully offline. Section routing via /portal/student/:section.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('StudentController', StudentController);

  StudentController.$inject = ['$location', '$routeParams', 'AuthService', 'ToastService'];

  function StudentController($location, $routeParams, AuthService, ToastService) {
    var vm = this;

    vm.user = AuthService.currentUser() || { name: 'Demo Student', email: 'student@alfalahacademy', role: 'student' };
    vm.active = $routeParams.section || 'dashboard';

    vm.menu = [
      { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
      { id: 'profile', label: 'My Profile', icon: 'bi-person-vcard' },
      { id: 'attendance', label: 'Attendance', icon: 'bi-calendar-check' },
      { id: 'homework', label: 'Homework', icon: 'bi-journal-text' },
      { id: 'assignments', label: 'Assignments', icon: 'bi-file-earmark-text' },
      { id: 'exams', label: 'Exams', icon: 'bi-clipboard-data' },
      { id: 'results', label: 'Results', icon: 'bi-graph-up' },
      { id: 'fees', label: 'Fees', icon: 'bi-cash-coin' },
      { id: 'library', label: 'Library', icon: 'bi-book' },
      { id: 'timetable', label: 'Timetable', icon: 'bi-table' },
      { id: 'notices', label: 'Notices', icon: 'bi-megaphone' },
      { id: 'leave', label: 'Leave', icon: 'bi-envelope-paper' },
      { id: 'idcard', label: 'ID Card', icon: 'bi-person-badge' },
      { id: 'report', label: 'Report Card', icon: 'bi-file-earmark-pdf' },
      { id: 'settings', label: 'Settings', icon: 'bi-gear' }
    ];

    vm.select = function (section) { $location.path('/portal/student/' + section); };
    vm.logout = function () { AuthService.logout(); $location.path('/login'); };

    // ---- Student meta ----
    vm.student = {
      name: vm.user.name || 'Aarav Sharma',
      roll: '24',
      admNo: 'ALF-2024-0087',
      className: 'Class VIII - A',
      section: 'A',
      guardian: 'Mr. Rakesh Sharma',
      contact: '+91 98765 43210',
      email: vm.user.email,
      dob: '2011-04-12',
      blood: 'B+',
      address: '14 Rose Villa, Sultana Road'
    };

    // ---- Dashboard KPIs ----
    vm.kpis = [
      { label: 'Attendance', value: '94%', icon: 'bi-calendar-check', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
      { label: 'Pending Homework', value: 3, icon: 'bi-journal-text', bg: 'linear-gradient(135deg,#f59e0b,#d97706)' },
      { label: 'Upcoming Exams', value: 2, icon: 'bi-clipboard-data', bg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
      { label: 'Fee Due', value: '₹4,500', icon: 'bi-cash-coin', bg: 'linear-gradient(135deg,#ef4444,#dc2626)' }
    ];

    vm.todaySchedule = [
      { period: 1, time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Kapoor', room: 'R-201' },
      { period: 2, time: '08:45 - 09:30', subject: 'English', teacher: 'Mr. Fernandes', room: 'R-201' },
      { period: 3, time: '09:45 - 10:30', subject: 'Science', teacher: 'Dr. Iqbal', room: 'Lab-2' },
      { period: 4, time: '10:30 - 11:15', subject: 'Social Studies', teacher: 'Ms. Rao', room: 'R-201' },
      { period: 5, time: '11:45 - 12:30', subject: 'Hindi', teacher: 'Mrs. Verma', room: 'R-201' },
      { period: 6, time: '12:30 - 01:15', subject: 'Computer', teacher: 'Mr. Shaikh', room: 'Comp Lab' }
    ];

    vm.announcements = [
      { title: 'Annual Sports Day on 18 Jul', date: '2026-07-01', tag: 'Event' },
      { title: 'Submit science project by Friday', date: '2026-06-29', tag: 'Academics' },
      { title: 'Library books due for return', date: '2026-06-27', tag: 'Library' }
    ];

    // ---- Homework ----
    vm.homework = [
      { subject: 'Mathematics', title: 'Exercise 5.2 — Linear Equations', due: '2026-07-04', status: 'Pending' },
      { subject: 'Science', title: 'Diagram: Human Digestive System', due: '2026-07-05', status: 'Pending' },
      { subject: 'English', title: 'Essay: My Favourite Book (300 words)', due: '2026-07-03', status: 'Pending' },
      { subject: 'Hindi', title: 'Grammar worksheet — Sandhi', due: '2026-06-28', status: 'Submitted' }
    ];

    // ---- Assignments ----
    vm.assignments = [
      { subject: 'Computer', title: 'HTML Personal Webpage', due: '2026-07-10', status: 'Pending' },
      { subject: 'Social Studies', title: 'Map work — Indian Rivers', due: '2026-07-08', status: 'In Progress' },
      { subject: 'Science', title: 'Model: Working of a Circuit', due: '2026-07-15', status: 'Pending' },
      { subject: 'Mathematics', title: 'Data handling survey report', due: '2026-06-30', status: 'Submitted' }
    ];

    // ---- Attendance ----
    vm.attendanceSummary = { present: 132, total: 140, percent: 94 };
    vm.attendanceRows = [
      { date: '2026-07-01', day: 'Wed', status: 'Present' },
      { date: '2026-06-30', day: 'Tue', status: 'Present' },
      { date: '2026-06-29', day: 'Mon', status: 'Present' },
      { date: '2026-06-27', day: 'Sat', status: 'Absent' },
      { date: '2026-06-26', day: 'Fri', status: 'Present' },
      { date: '2026-06-25', day: 'Thu', status: 'Present' },
      { date: '2026-06-24', day: 'Wed', status: 'Late' },
      { date: '2026-06-23', day: 'Tue', status: 'Present' }
    ];

    // ---- Results ----
    vm.results = [
      { subject: 'Mathematics', max: 100, marks: 88, grade: 'A' },
      { subject: 'Science', max: 100, marks: 82, grade: 'A' },
      { subject: 'English', max: 100, marks: 79, grade: 'B+' },
      { subject: 'Social Studies', max: 100, marks: 85, grade: 'A' },
      { subject: 'Hindi', max: 100, marks: 74, grade: 'B+' },
      { subject: 'Computer', max: 100, marks: 92, grade: 'A+' }
    ];
    vm.resultTotal = vm.results.reduce(function (s, r) { return s + r.marks; }, 0);
    vm.resultMax = vm.results.reduce(function (s, r) { return s + r.max; }, 0);
    vm.resultPercent = Math.round((vm.resultTotal / vm.resultMax) * 100);

    vm.downloadReport = function () { ToastService.info('Report card download started'); };

    // ---- Fees ----
    vm.fees = [
      { term: 'Term 1 (Apr - Jun)', amount: 12000, due: '2026-04-10', status: 'Paid' },
      { term: 'Term 2 (Jul - Sep)', amount: 12000, due: '2026-07-10', status: 'Due' },
      { term: 'Term 3 (Oct - Dec)', amount: 12000, due: '2026-10-10', status: 'Upcoming' },
      { term: 'Transport (Annual)', amount: 4500, due: '2026-07-10', status: 'Due' }
    ];
    vm.payNow = function () { ToastService.info('Redirecting to secure payment gateway...'); };
    vm.downloadReceipt = function (term) { ToastService.success('Receipt for ' + term + ' downloaded'); };

    // ---- Timetable ----
    vm.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    vm.periods = ['08:00', '08:45', '09:45', '10:30', '11:45', '12:30'];
    vm.timetable = {
      Mon: ['Maths', 'English', 'Science', 'Social', 'Hindi', 'Computer'],
      Tue: ['English', 'Maths', 'Hindi', 'Science', 'Drawing', 'Games'],
      Wed: ['Science', 'Social', 'Maths', 'English', 'Computer', 'Hindi'],
      Thu: ['Hindi', 'Science', 'English', 'Maths', 'Social', 'Library'],
      Fri: ['Computer', 'Maths', 'Science', 'Hindi', 'English', 'Games'],
      Sat: ['Social', 'English', 'Maths', 'Drawing', 'Assembly', '—']
    };

    // ---- Library ----
    vm.libraryBooks = [
      { title: 'The Jungle Book', author: 'Rudyard Kipling', issued: '2026-06-15', due: '2026-07-05' },
      { title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', issued: '2026-06-20', due: '2026-07-10' }
    ];

    // ---- Notices ----
    vm.notices = [
      { title: 'Holiday on account of Muharram', date: '2026-07-06', body: 'The school will remain closed on 6th July.' },
      { title: 'PTM for Class VIII', date: '2026-07-12', body: 'Parent-Teacher meeting from 9:00 AM to 12:00 PM.' },
      { title: 'Fee reminder — Term 2', date: '2026-07-02', body: 'Kindly clear pending dues before 10th July.' }
    ];

    vm.helper = { blank: function () { return ''; } };
  }
})();
