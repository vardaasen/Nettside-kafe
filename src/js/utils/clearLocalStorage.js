/**
 * Tømmer `localStorage` og oppdaterer siden.
 *
 * Denne funksjonen fjerner alle data lagret i `localStorage`, viser en melding som bekrefter
 * at dataene er tømt, og laster deretter siden på nytt for å reflektere endringene.
 *
 * @function
 * @name clearLocalStorage
 * @example
 * // Tøm all data i localStorage:
 * clearLocalStorage();
 */
function clearLocalStorage() {
  localStorage.clear();
  alert('"Local storage" har blitt tømt!');
  location.reload();
}
