/* =====================================================
   CrickAdda - Tournament Firebase REST API Module
   Developer: Mohd Rijvan Khan Mogia
   Year: 2026
   ===================================================== */

window.TournamentFirebase = (function () {
  const BASE_URL = 'https://crickadda-848cb-default-rtdb.asia-southeast1.firebasedatabase.app/auction_db';

  async function get(path) {
    try {
      const url = BASE_URL + (path ? '/' + path.replace(/^\//, '') : '') + '.json';
      const res = await fetch(url);
      if (!res.ok) throw new Error('GET failed: ' + res.status);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error('[TF] GET error:', path, e);
      throw e;
    }
  }

  async function patch(path, data) {
    try {
      const url = BASE_URL + (path ? '/' + path.replace(/^\//, '') : '') + '.json';
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('PATCH failed: ' + res.status);
      return await res.json();
    } catch (e) {
      console.error('[TF] PATCH error:', path, e);
      throw e;
    }
  }

  async function put(path, data) {
    try {
      const url = BASE_URL + (path ? '/' + path.replace(/^\//, '') : '') + '.json';
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('PUT failed: ' + res.status);
      return await res.json();
    } catch (e) {
      console.error('[TF] PUT error:', path, e);
      throw e;
    }
  }

  async function del(path) {
    try {
      const url = BASE_URL + (path ? '/' + path.replace(/^\//, '') : '') + '.json';
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('DELETE failed: ' + res.status);
      return true;
    } catch (e) {
      console.error('[TF] DELETE error:', path, e);
      throw e;
    }
  }

  /**
   * Real-time polling listener. Polls every 3 seconds.
   * Returns an unsubscribe function.
   */
  function listen(path, callback) {
    let active = true;
    let lastValue = undefined;

    async function poll() {
      if (!active) return;
      try {
        const data = await get(path);
        const serialized = JSON.stringify(data);
        if (serialized !== lastValue) {
          lastValue = serialized;
          callback(data);
        }
      } catch (e) {
        // silent poll error
      }
      if (active) setTimeout(poll, 3000);
    }

    poll();

    return function unsubscribe() {
      active = false;
    };
  }

  function generateId(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function generateTournamentId() {
    return generateId(8).toUpperCase();
  }

  function generatePassword() {
    return generateId(8);
  }

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function checkTournamentIdUnique(id) {
    try {
      const data = await get(id);
      return data === null;
    } catch (e) {
      return false;
    }
  }

  async function generateUniqueId() {
    for (let i = 0; i < 10; i++) {
      const id = generateTournamentId();
      const isUnique = await checkTournamentIdUnique(id);
      if (isUnique) return id;
    }
    // Fallback with timestamp suffix
    return 'T' + Date.now().toString(36).toUpperCase().slice(-7);
  }

  return {
    BASE_URL,
    get,
    patch,
    put,
    delete: del,
    listen,
    generateTournamentId,
    generatePassword,
    hashPassword,
    checkTournamentIdUnique,
    generateUniqueId
  };
})();
