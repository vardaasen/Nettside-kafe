/**
 * Visning for innlogging.
 *
 * `loginView` håndterer brukergrensesnittet for innloggingssiden ved å tilby metoder
 * for å hente brukerdata, vise feilmeldinger og administrere passordsynlighet.
 */
const loginView = {
  /**
   * Henter brukerens ansatt-ID fra input-feltet.
   *
   * @function getEmployeeID
   * @returns {string} Ansatt-ID-en som er angitt av brukeren.
   */
  getEmployeeID() {
    return document.getElementById('employeeID').value;
  },

  /**
   * Henter brukerens passord fra input-feltet.
   *
   * @function getPassword
   * @returns {string} Passordet som er angitt av brukeren.
   */
  getPassword() {
    return document.getElementById('password').value;
  },

  /**
   * Viser feilmeldingen for innlogging.
   *
   * @function showError
   */
  showError() {
    document.getElementById('loginError').style.display = 'block';
  },

  /**
   * Skjuler feilmeldingen for innlogging.
   *
   * @function hideError
   */
  hideError() {
    document.getElementById('loginError').style.display = 'none';
  },

  /**
   * Veksler synligheten til passordfeltet mellom skjult og synlig. Oppdaterer
   * også ikonene for passordsynlighet (øye og øye med kryss).
   *
   * @function togglePasswordVisibility
   *
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
   * Initialiserer knappen for å veksle passordsynlighet. Legger til en klikk-lytter
   * på knappen som kaller `togglePasswordVisibility`.
   *
   * @function initPasswordToggle
   *
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

/**
 * Initialiserer `loginView` når innholdet på siden er lastet.
 *
 * @event DOMContentLoaded - initialiserer `loginView`
 */
document.addEventListener('DOMContentLoaded', function () {
  loginView.initPasswordToggle();
});
