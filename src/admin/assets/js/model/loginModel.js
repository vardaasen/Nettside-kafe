/**
 * Modell for innlogging.
 */
const loginModel = {
  /**
   * Liste over brukere med ansatt ID og passord.
   * @type {Array<{employeeID: string, password: string}>}
   */
  users: [
    { employeeID: 'admin', password: 'getFTW!' },
    { employeeID: 'John', password: 'qwertyFTW!' }
  ],

  /**
   * Sjekker om innloggingsinfo stemmer.
   * @param {string} enteredID - Ansatt ID skrevet inn av brukeren.
   * @param {string} enteredPassword - Passord skrevet inn av brukeren.
   * @returns {boolean} Returnerer true hvis innloggingen er riktig.
   */
  checkCredentials(enteredID, enteredPassword) {
    return this.users.some(user =>
      user.employeeID === enteredID && user.password === enteredPassword
    );
  }
};
