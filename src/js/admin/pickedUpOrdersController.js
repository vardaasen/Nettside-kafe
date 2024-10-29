/**
 * Kontroller for håndtering av hentede bestillinger.
 *
 * `pickedUpOrdersController` administrerer visning og søk av bestillinger med status 'Hentet'.
 */
const pickedUpOrdersController = {
  /**
   * Initialiserer `pickedUpOrdersController` ved å vise bestillingene som er hentet.
   */
  init() {
    this.displayOrders();
  },

  /**
   * Utfører et søk på hentede bestillinger ved å bruke søkefunksjonen.
   *
   * Funksjonen henter verdien fra søkefeltet og kaller `displayOrders` med søkekriteriet.
   *
   * @function searchOrders
   */
  searchOrders() {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
    this.displayOrders(searchQuery);
  },

  /**
   * Tilbakestiller søkefeltet og viser alle hentede bestillinger.
   *
   * Funksjonen nullstiller søkefeltet til en tom verdi og kaller deretter `displayOrders`
   * for å vise alle bestillinger som er hentet.
   *
   * @function resetSearch
   */
  resetSearch() {
    document.getElementById('searchInput').value = '';
    this.displayOrders();
  },

  /**
   * Filtrerer og viser hentede bestillinger basert på søkekriterier.
   *
   * Henter bestillingene som har status 'Hentet' fra `model.orders` og sender dem videre
   * til `pickedUpOrdersView.renderOrders` for å bli vist i grensesnittet.
   *
   * @function displayOrders
   * @param {string} [searchQuery=''] - Søkekriterium for kundenavn eller bestillings-ID.
   * @private
   */
  displayOrders(searchQuery = '') {
    const orders = model.orders.filter((order) => order.status === 'Hentet');
    pickedUpOrdersView.renderOrders(orders, searchQuery);
  },
};

/**
 * Lytter til `DOMContentLoaded`-hendelsen for å initialisere `pickedUpOrdersController`.
 *
 * Når dokumentet er ferdig lastet, kalles `pickedUpOrdersController.init()` for å sette opp visningen
 * av hentede bestillinger.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  pickedUpOrdersController.init();
});
document.addEventListener('DOMContentLoaded', function () {
  pickedUpOrdersController.init();
});
