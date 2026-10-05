/* =====================================================
   CrickAdda - Tournament Utilities Module
   Developer: Mohd Rijvan Khan Mogia
   Year: 2026
   ===================================================== */

window.TournamentUtils = (function () {

  function formatINR(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const day = parseInt(parts[2], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    const year = parts[0];
    return String(day).padStart(2, '0') + ' ' + month + ' ' + year;
  }

  function formatDateTime(dateStr, timeStr) {
    if (!dateStr) return '';
    const datePart = formatDate(dateStr);
    if (!timeStr) return datePart;
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return datePart + ', ' + String(hour).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' ' + ampm;
  }

  function validatePhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateAge(age) {
    const n = parseInt(age, 10);
    return !isNaN(n) && n >= 10 && n <= 60;
  }

  function resizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file'));
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          let w = img.width;
          let h = img.height;
          const ratio = Math.min(maxWidth / w, maxHeight / h, 1);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality || 0.7));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function compressImageToLimit(file, maxKB, maxWidth, maxHeight) {
    maxWidth = maxWidth || 300;
    maxHeight = maxHeight || 300;
    const qualities = [0.8, 0.6, 0.4, 0.2];
    for (const q of qualities) {
      const b64 = await resizeImage(file, maxWidth, maxHeight, q);
      const kb = Math.round((b64.length * 3) / 4 / 1024);
      if (kb <= (maxKB || 80)) return b64;
    }
    // Return lowest quality if all exceed limit
    return await resizeImage(file, maxWidth, maxHeight, 0.2);
  }

  function countdown(targetDate, targetTime, callback) {
    function tick() {
      const targetStr = targetDate + 'T' + (targetTime || '00:00') + ':00';
      const target = new Date(targetStr);
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        callback({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      callback({ days, hours, minutes, seconds });
    }
    tick();
    return setInterval(tick, 1000);
  }

  function sanitizeFirebaseKey(str) {
    if (!str) return '';
    return str.toString().replace(/[.#$\[\]\/]/g, '_');
  }

  function getPlayerBasePriceByCategory(category) {
    const prices = { A: 5000, B: 3000, C: 1000, D: 500 };
    return prices[category] || 500;
  }

  // --- Toast ---
  function ensureToastContainer() {
    let el = document.getElementById('toastContainer');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toastContainer';
      document.body.appendChild(el);
    }
    return el;
  }

  function showToast(message, type) {
    type = type || 'info';
    const icons = {
      success: 'bi-check-circle-fill',
      error: 'bi-x-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill'
    };
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'ca-toast toast-' + type;
    toast.innerHTML = '<i class="bi ' + icons[type] + ' toast-icon"></i>'
      + '<div class="toast-body"><div class="toast-msg">' + escapeHtml(message) + '</div></div>'
      + '<button class="toast-close" onclick="this.parentElement.remove()"><i class="bi bi-x"></i></button>';
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  // --- Loading Overlay ---
  function ensureLoadingOverlay() {
    let el = document.getElementById('loadingOverlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'loadingOverlay';
      el.innerHTML = '<div class="spinner-border" role="status"></div><div class="loading-message" id="loadingMessage">Please wait...</div>';
      document.body.appendChild(el);
    }
    return el;
  }

  function showLoading(message) {
    const el = ensureLoadingOverlay();
    const msg = document.getElementById('loadingMessage');
    if (msg) msg.textContent = message || 'Please wait...';
    el.classList.add('show');
  }

  function hideLoading() {
    const el = document.getElementById('loadingOverlay');
    if (el) el.classList.remove('show');
  }

  // --- Confirm Modal ---
  function showConfirm(message, onConfirm, onCancel) {
    let modal = document.getElementById('caConfirmModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal fade confirm-modal';
      modal.id = 'caConfirmModal';
      modal.setAttribute('tabindex', '-1');
      modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<h5 class="modal-title"><i class="bi bi-question-circle text-warning me-2"></i>Confirm Action</h5>'
        + '<button type="button" class="btn-close" data-bs-dismiss="modal"></button>'
        + '</div>'
        + '<div class="modal-body" id="caConfirmBody"></div>'
        + '<div class="modal-footer">'
        + '<button class="btn btn-outline-secondary" data-bs-dismiss="modal" id="caConfirmCancelBtn">Cancel</button>'
        + '<button class="btn btn-success" id="caConfirmOkBtn">Confirm</button>'
        + '</div>'
        + '</div></div>';
      document.body.appendChild(modal);
    }

    document.getElementById('caConfirmBody').textContent = message;
    const bsModal = new bootstrap.Modal(modal);

    const okBtn = document.getElementById('caConfirmOkBtn');
    const cancelBtn = document.getElementById('caConfirmCancelBtn');

    const freshOk = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(freshOk, okBtn);
    const freshCancel = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(freshCancel, cancelBtn);

    document.getElementById('caConfirmOkBtn').addEventListener('click', () => {
      bsModal.hide();
      if (onConfirm) onConfirm();
    });

    document.getElementById('caConfirmCancelBtn').addEventListener('click', () => {
      bsModal.hide();
      if (onCancel) onCancel();
    });

    bsModal.show();
  }

  // --- Session Management ---
  function setAdminSession(tournamentId, passwordHash) {
    sessionStorage.setItem('ca_admin_tid', tournamentId);
    sessionStorage.setItem('ca_admin_hash', passwordHash);
  }

  function getAdminSession() {
    const tid = sessionStorage.getItem('ca_admin_tid');
    const hash = sessionStorage.getItem('ca_admin_hash');
    if (!tid || !hash) return null;
    return { tournamentId: tid, passwordHash: hash };
  }

  function clearAdminSession() {
    sessionStorage.removeItem('ca_admin_tid');
    sessionStorage.removeItem('ca_admin_hash');
  }

  function setSuperAdminSession() {
    sessionStorage.setItem('ca_super_admin', '1');
  }

  function isSuperAdmin() {
    return sessionStorage.getItem('ca_super_admin') === '1';
  }

  function clearSuperAdminSession() {
    sessionStorage.removeItem('ca_super_admin');
  }

  function isAdminForTournament(tournamentId) {
    const session = getAdminSession();
    if (!session) return false;
    return session.tournamentId === tournamentId;
  }

  return {
    formatINR,
    formatDate,
    formatDateTime,
    validatePhone,
    validateEmail,
    validateAge,
    resizeImage,
    compressImageToLimit,
    countdown,
    sanitizeFirebaseKey,
    getPlayerBasePriceByCategory,
    showToast,
    showLoading,
    hideLoading,
    showConfirm,
    setAdminSession,
    getAdminSession,
    clearAdminSession,
    setSuperAdminSession,
    isSuperAdmin,
    clearSuperAdminSession,
    isAdminForTournament
  };
})();
