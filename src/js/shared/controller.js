/**
 * Bytter til en ny sidevisning basert på angitt sideindeks.
 *
 * Denne funksjonen oppdaterer `currentPageIndex` til den angitte `pageIndex`
 * og kaller `updateView()` for å rendre det nye innholdet på siden.
 *
 * @function
 * @name switchMenu
 * @param {number} pageIndex - Indeksen til siden som skal vises.
 * @example
 * // Bytt til siden med indeks 2:
 * switchMenu(2);
 */
function switchMenu(pageIndex) {
  model.app.currentPageIndex = pageIndex;
  updateView();
}
