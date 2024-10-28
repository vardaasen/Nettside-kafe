/**
 * Sjekker om brukeren er logget inn basert på `isLoggedIn`-verdien i `localStorage`.
 * Hvis brukeren ikke er logget inn, blir de omdirigert til `index.html`.
 */
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'index.html';
}

/**
 * Legger til en lytter på `logoutBtn` som håndterer utloggingen av brukeren.
 * Når knappen klikkes, fjernes `isLoggedIn` fra `localStorage` for å indikere
 * at brukeren har logget ut, og brukeren omdirigeres til forsiden.
 *
 * @event click - Hendelsen som trigges når `logoutBtn` klikkes.
 */
document.getElementById('logoutBtn')?.addEventListener('click', function () {
  localStorage.removeItem('isLoggedIn');
  window.location.href = '../index.html';
});
