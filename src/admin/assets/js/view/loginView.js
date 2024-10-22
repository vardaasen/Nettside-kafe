/**
 * Visning for innlogging.
 */
const loginView = {
  /**
   * Henter Ansatt ID fra inputfeltet.
   * @returns {string} Verdien fra Ansatt ID-feltet.
   */
  getEmployeeID() {
    return document.getElementById('employeeID').value;
  },

  /**
   * Henter passord fra inputfeltet.
   * @returns {string} Verdien fra passord-feltet.
   */
  getPassword() {
    return document.getElementById('password').value;
  },

  /**
   * Viser feilmelding når innloggingen er feil.
   */
  showError() {
    document.getElementById('loginError').style.display = 'block';
  },

  /**
   * Skjuler feilmelding.
   */
  hideError() {
    document.getElementById('loginError').style.display = 'none';
  },
};
