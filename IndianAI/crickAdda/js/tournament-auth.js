/* =====================================================
   CrickAdda - Tournament Authentication Module
   Developer: Mohd Rijvan Khan Mogia
   Year: 2026
   ===================================================== */

window.TournamentAuth = (function () {

  async function loginTournamentAdmin(tournamentId, password) {
    try {
      const authData = await window.TournamentFirebase.get(tournamentId + '/auth');
      if (!authData || !authData.passwordHash) {
        return { success: false, error: 'Tournament not found or not configured.' };
      }
      const inputHash = await window.TournamentFirebase.hashPassword(password);
      if (inputHash !== authData.passwordHash) {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
      window.TournamentUtils.setAdminSession(tournamentId, inputHash);
      return { success: true };
    } catch (e) {
      console.error('[Auth] loginTournamentAdmin error:', e);
      return { success: false, error: 'Failed to connect. Please check your internet and try again.' };
    }
  }

  async function loginSuperAdmin(password) {
    try {
      const inputHash = await window.TournamentFirebase.hashPassword(password);

      // Check if super admin exists
      const existingHash = await window.TournamentFirebase.get('superAdmin/passwordHash');

      if (existingHash === null || existingHash === undefined) {
        // First-time setup: store the password hash
        await window.TournamentFirebase.patch('superAdmin', { passwordHash: inputHash });
        window.TournamentUtils.setSuperAdminSession();
        return { success: true, firstSetup: true };
      }

      if (inputHash !== existingHash) {
        return { success: false, error: 'Invalid super admin password.' };
      }

      window.TournamentUtils.setSuperAdminSession();
      return { success: true };
    } catch (e) {
      console.error('[Auth] loginSuperAdmin error:', e);
      return { success: false, error: 'Failed to connect. Please try again.' };
    }
  }

  function requireAdminAuth(tournamentId) {
    const session = window.TournamentUtils.getAdminSession();
    if (!session || session.tournamentId !== tournamentId) {
      window.location.href = 'tournament.html?view=login&redirect=' + encodeURIComponent(tournamentId);
      return false;
    }
    return true;
  }

  function requireSuperAdmin() {
    if (!window.TournamentUtils.isSuperAdmin()) {
      // Will be handled by the super-admin page itself
      return false;
    }
    return true;
  }

  return {
    loginTournamentAdmin,
    loginSuperAdmin,
    requireAdminAuth,
    requireSuperAdmin
  };
})();
