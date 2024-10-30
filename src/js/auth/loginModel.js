/**
 * Modell for håndtering av innlogging.
 *
 * `loginModel` inneholder en liste over brukere og metoder for å sjekke brukerlegitimasjon.
 */
const loginModel = {

  /**
   * Liste over registrerte brukere.
   * @type {Array<{employeeID: string, password: string}>}
   */
  users: [
    { employeeID: 'admin', password: 'getFTW!' },
    { employeeID: 'John', password: 'qwertyFTW!' },
  ],

  /**
   * Sjekker om innloggingsinformasjonen er gyldig.
   *
   * Sammenligner det oppgitte bruker-ID og passord med de lagrede brukeropplysningene.
   *
   * @function
   * @param {string} enteredID - Brukerens angitte ID.
   * @param {string} enteredPassword - Brukerens angitte passord.
   * @returns {boolean} `true` hvis legitimasjonen er gyldig, ellers `false`.
   *
   * @example
   * const isValid = loginModel.checkCredentials('admin', 'getFTW!');
   */
  checkCredentials(enteredID, enteredPassword) {
    return this.users.some(
      (user) =>
        user.employeeID === enteredID && user.password === enteredPassword,
    );
  },
};
