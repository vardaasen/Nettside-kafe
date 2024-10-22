/**
 * Kontroller for innlogging.
 */
const loginController = {
  /**
   * Starter kontrolleren ved å legge til lytter for innloggingsskjemaet.
   */
  init() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const employeeID = loginView.getEmployeeID();
      const password = loginView.getPassword();

      loginView.hideError();

      if (loginModel.checkCredentials(employeeID, password)) {
        this.setLoggedIn();
        window.location.href = 'bestillinger.html'; // Omdirigerer til bestillinger
      } else {
        loginView.showError();
      }
    });
  },

  /**
   * Setter innloggingsstatus i localStorage.
   */
  setLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
  },
};

// Starter kontrolleren når siden lastes
loginController.init();
