/**
 * AdminController — Admin ERP dashboard. Self-contained mock data.
 * Section routing via /portal/admin/:section.
 */
(function () {
  'use strict';

  angular.module('alfalahApp').controller('AdminController', AdminController);

  AdminController.$inject = ['$location', '$routeParams', 'AuthService', 'ToastService'];

  function AdminController($location, $routeParams, AuthService, ToastService) {
    var vm = this;

    vm.user = AuthService.currentUser() || { name: 'System Administrator', email: 'admin@alfalahacademy', role: 'admin' };
    vm.active = $routeParams.section || 'dashboard';

    vm.menu = [
      { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { id: 'students', label: 'Students', icon: 'bi-people-fill' },
      { id: 'teachers', label: 'Teachers', icon: 'bi-person-workspace' },
      { id: 'staff', label: 'Staff', icon: 'bi-person-badge' },
      { id: 'admissions', label: 'Admissions', icon: 'bi-clipboard-plus' },
      { id: 'fees', label: 'Fees', icon: 'bi-cash-stack' },
      { id: 'expenses', label: 'Expenses', icon: 'bi-wallet2' },
      { id: 'attendance', label: 'Attendance', icon: 'bi-calendar-check' },
      { id: 'exams', label: 'Exams', icon: 'bi-clipboard-data' },
      { id: 'results', label: 'Results', icon: 'bi-graph-up-arrow' },
      { id: 'library', label: 'Library', icon: 'bi-book-half' },
      { id: 'transport', label: 'Transport', icon: 'bi-bus-front' },
      { id: 'hostel', label: 'Hostel', icon: 'bi-building' },
      { id: 'inventory', label: 'Inventory', icon: 'bi-box-seam' },
      { id: 'payroll', label: 'Payroll', icon: 'bi-cash-coin' },
      { id: 'notices', label: 'Notices', icon: 'bi-megaphone' },
      { id: 'news', label: 'News', icon: 'bi-newspaper' },
      { id: 'events', label: 'Events', icon: 'bi-calendar-event' },
      { id: 'gallery', label: 'Gallery', icon: 'bi-images' },
      { id: 'cms', label: 'Website CMS', icon: 'bi-layout-text-window' },
      { id: 'messages', label: 'Messages', icon: 'bi-envelope' },
      { id: 'users', label: 'Users & Roles', icon: 'bi-shield-lock' },
      { id: 'reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
      { id: 'settings', label: 'Settings', icon: 'bi-gear' }
    ];

    vm.select = function (section) { $location.path('/portal/admin/' + section); };
    vm.logout = function () { AuthService.logout(); $location.path('/login'); };

    // ---- Dashboard KPIs ----
    vm.kpis = [
      { label: 'Total Students', value: '1,248', icon: 'bi-people-fill', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
      { label: 'Teachers', value: 64, icon: 'bi-person-workspace', bg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
      { label: 'Fee Collected', value: '₹18.4L', icon: 'bi-cash-stack', bg: 'linear-gradient(135deg,#10b981,#059669)' },
      { label: 'Pending Admissions', value: 23, icon: 'bi-clipboard-plus', bg: 'linear-gradient(135deg,#f59e0b,#d97706)' },
      { label: 'Attendance Today', value: '92%', icon: 'bi-calendar-check', bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
      { label: 'Staff', value: 38, icon: 'bi-person-badge', bg: 'linear-gradient(135deg,#ef4444,#dc2626)' }
    ];

    // ---- Fee chart (monthly collection in lakhs) ----
    vm.feeChart = [
      { month: 'Jan', value: 12.5 }, { month: 'Feb', value: 14.2 }, { month: 'Mar', value: 16.8 },
      { month: 'Apr', value: 19.5 }, { month: 'May', value: 15.1 }, { month: 'Jun', value: 18.4 }
    ];
    vm.chartMax = 20;

    // ---- Recent admissions (dashboard) ----
    vm.recentAdmissions = [
      { ref: 'ADM-1042', student: 'Ishaan Gupta', cls: 'Nursery', date: '2026-07-01', status: 'Pending' },
      { ref: 'ADM-1041', student: 'Sara Ansari', cls: 'Class III', date: '2026-06-30', status: 'Approved' },
      { ref: 'ADM-1040', student: 'Vivaan Rao', cls: 'Class VI', date: '2026-06-30', status: 'Pending' },
      { ref: 'ADM-1039', student: 'Myra Joshi', cls: 'Class I', date: '2026-06-29', status: 'Approved' }
    ];

    // ---- Contact messages ----
    vm.messages = [
      { name: 'Rukhsar Bano', email: 'rukhsar@example.com', subject: 'Admission enquiry for Class V', date: '2026-07-01' },
      { name: 'Imran Khan', email: 'imran.k@example.com', subject: 'Transport route availability', date: '2026-06-30' },
      { name: 'Sunita Devi', email: 'sunita@example.com', subject: 'Fee payment issue', date: '2026-06-29' },
      { name: 'Ajay Verma', email: 'ajay.v@example.com', subject: 'Request for TC', date: '2026-06-28' }
    ];
    vm.viewMessage = function (m) { ToastService.info('Opening message from ' + m.name); };
    vm.deleteMessage = function (m) {
      var i = vm.messages.indexOf(m);
      if (i > -1) { vm.messages.splice(i, 1); ToastService.success('Message deleted'); }
    };

    // ---- Students ----
    vm.studentSearch = '';
    vm.students = [
      { adm: 'ALF-0087', name: 'Aarav Sharma', cls: 'VIII-A', guardian: 'Rakesh Sharma', contact: '+91 98765 43210', status: 'Active' },
      { adm: 'ALF-0088', name: 'Fatima Sheikh', cls: 'VIII-A', guardian: 'Imran Sheikh', contact: '+91 98111 22233', status: 'Active' },
      { adm: 'ALF-0089', name: 'Rohan Mehta', cls: 'VII-B', guardian: 'Nitin Mehta', contact: '+91 97000 11122', status: 'Active' },
      { adm: 'ALF-0090', name: 'Zoya Khan', cls: 'VIII-B', guardian: 'Salman Khan', contact: '+91 96500 33445', status: 'Active' },
      { adm: 'ALF-0091', name: 'Karan Patel', cls: 'VII-B', guardian: 'Dinesh Patel', contact: '+91 90000 55667', status: 'Inactive' },
      { adm: 'ALF-0092', name: 'Ananya Iyer', cls: 'IX-A', guardian: 'Ravi Iyer', contact: '+91 93333 77889', status: 'Active' },
      { adm: 'ALF-0093', name: 'Mohammed Ali', cls: 'IX-A', guardian: 'Yusuf Ali', contact: '+91 98989 12121', status: 'Active' },
      { adm: 'ALF-0094', name: 'Priya Nair', cls: 'VI-C', guardian: 'Suresh Nair', contact: '+91 97878 34343', status: 'Active' }
    ];
    vm.addStudent = function () { ToastService.info('Opening new student admission form'); };
    vm.editStudent = function (s) { ToastService.info('Editing ' + s.name); };
    vm.deleteStudent = function (s) {
      var i = vm.students.indexOf(s);
      if (i > -1) { vm.students.splice(i, 1); ToastService.success(s.name + ' removed'); }
    };

    // ---- Teachers ----
    vm.teachers = [
      { name: 'Mrs. Anita Kapoor', subject: 'Mathematics', qualification: 'M.Sc, B.Ed', contact: '+91 99001 23456' },
      { name: 'Mr. David Fernandes', subject: 'English', qualification: 'M.A, B.Ed', contact: '+91 99002 34567' },
      { name: 'Dr. Sana Iqbal', subject: 'Science', qualification: 'Ph.D', contact: '+91 99003 45678' },
      { name: 'Ms. Lata Rao', subject: 'Social Studies', qualification: 'M.A, B.Ed', contact: '+91 99004 56789' },
      { name: 'Mr. Imran Shaikh', subject: 'Computer', qualification: 'MCA', contact: '+91 99005 67890' }
    ];
    vm.addTeacher = function () { ToastService.info('Opening new teacher form'); };

    // ---- Admissions ----
    vm.admissions = [
      { ref: 'ADM-1042', student: 'Ishaan Gupta', cls: 'Nursery', date: '2026-07-01', status: 'Pending' },
      { ref: 'ADM-1041', student: 'Sara Ansari', cls: 'Class III', date: '2026-06-30', status: 'Approved' },
      { ref: 'ADM-1040', student: 'Vivaan Rao', cls: 'Class VI', date: '2026-06-30', status: 'Pending' },
      { ref: 'ADM-1039', student: 'Myra Joshi', cls: 'Class I', date: '2026-06-29', status: 'Approved' },
      { ref: 'ADM-1038', student: 'Aryan Das', cls: 'Class VIII', date: '2026-06-28', status: 'Pending' }
    ];
    vm.approveAdmission = function (a) { a.status = 'Approved'; ToastService.success(a.ref + ' approved'); };
    vm.rejectAdmission = function (a) { a.status = 'Rejected'; ToastService.warning(a.ref + ' rejected'); };

    // ---- Fees ----
    vm.feeKpis = [
      { label: 'Collected (Month)', value: '₹18.4L', icon: 'bi-cash-stack', bg: 'linear-gradient(135deg,#10b981,#059669)' },
      { label: 'Pending Dues', value: '₹3.2L', icon: 'bi-exclamation-circle', bg: 'linear-gradient(135deg,#ef4444,#dc2626)' },
      { label: 'Transactions', value: 412, icon: 'bi-receipt', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
      { label: 'Defaulters', value: 27, icon: 'bi-person-x', bg: 'linear-gradient(135deg,#f59e0b,#d97706)' }
    ];
    vm.feeTransactions = [
      { id: 'TXN-9001', student: 'Aarav Sharma', cls: 'VIII-A', amount: 12000, date: '2026-07-01', mode: 'Online' },
      { id: 'TXN-9000', student: 'Fatima Sheikh', cls: 'VIII-A', amount: 12000, date: '2026-07-01', mode: 'Cash' },
      { id: 'TXN-8999', student: 'Rohan Mehta', cls: 'VII-B', amount: 10500, date: '2026-06-30', mode: 'UPI' },
      { id: 'TXN-8998', student: 'Ananya Iyer', cls: 'IX-A', amount: 13500, date: '2026-06-30', mode: 'Online' },
      { id: 'TXN-8997', student: 'Mohammed Ali', cls: 'IX-A', amount: 13500, date: '2026-06-29', mode: 'Cheque' }
    ];
    vm.exportFees = function () { ToastService.info('Exporting to Excel...'); };
  }
})();
