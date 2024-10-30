/**
 * Kontroller for innlogging.
 *
 * `loginController` håndterer innlogging ved å kontrollere brukerens
 * legitimasjon mot lagrede data og administrere innloggingsstatus i `localStorage`.
 */
const loginController = {
  /**
   * Starter kontrolleren ved å legge til en lytter for innloggingsskjemaets innsending.
   *
   * Når skjemaet sendes inn, henter denne funksjonen innloggingsinformasjonen fra
   * `loginView`, sjekker legitimasjonen ved hjelp av `loginModel`, og setter innloggingsstatusen
   * hvis legitimasjonen er gyldig. Ved feil vises en feilmelding i grensesnittet.
   *
   * @method
   * @name init
   * @example
   * // Starter kontrolleren når siden lastes:
   * loginController.init();
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
   * Setter innloggingsstatus i `localStorage`.
   *
   * Funksjonen setter `isLoggedIn`-statusen til `true` i `localStorage`,
   * noe som indikerer at brukeren er pålogget. Dette kan brukes senere for å
   * kontrollere tilgang til andre deler av applikasjonen.
   *
   * @method
   * @name setLoggedIn
   * @example
   * // Sett innloggingsstatus til true:
   * loginController.setLoggedIn();
   */
  setLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
  },
};

// Starter kontrolleren når siden lastes
loginController.init();
