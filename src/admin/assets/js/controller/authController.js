/**
 * Kontrollerer om brukeren er innlogget og håndterer utlogging.
 */
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'index.html';
}

/**
 * Legger til en lytter for logg ut-knappen.
 * @function
 */
document.getElementById('logoutBtn')?.addEventListener('click', function () {
  localStorage.removeItem('isLoggedIn');
  window.location.href = '../index.html';
});
