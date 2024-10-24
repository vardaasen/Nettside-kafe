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

  /**
   * Håndterer visning/skjuling av passord.
   */
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('#togglePassword svg:nth-child(1)');
    const eyeOffIcon = document.querySelector(
      '#togglePassword svg:nth-child(2)',
    );

    if (passwordInput && eyeIcon && eyeOffIcon) {
      const isPasswordVisible =
        passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute(
        'type',
        isPasswordVisible ? 'text' : 'password',
      );

      // Toggle icon visibility
      eyeIcon.style.display = isPasswordVisible ? 'none' : 'block';
      eyeOffIcon.style.display = isPasswordVisible ? 'block' : 'none';
    }
  },

  /**
   * Initialiserer passordfeltets visningsfunksjonalitet.
   */
  initPasswordToggle() {
    const togglePasswordButton = document.getElementById('togglePassword');

    if (togglePasswordButton) {
      togglePasswordButton.addEventListener(
        'click',
        this.togglePasswordVisibility.bind(this),
      );
    }
  },
};

// Kjører koden når DOM er ferdig lastet.
document.addEventListener('DOMContentLoaded', function () {
  loginView.initPasswordToggle();
});
