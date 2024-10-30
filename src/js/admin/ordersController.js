/**
 * Kontroll for bestillinger.
 *
 * `ordersController` håndterer funksjonaliteten for å vise, søke etter, og filtrere bestillinger.
 * Denne kontrolleren initialiserer visningen av bestillinger og setter opp en søkelytter
 * for å filtrere basert på søkekriterier.
 */
const ordersController = {
  /**
   * Initialiserer `ordersController` ved å vise bestillingene og sette opp søkelytter.
   */
  init() {
    this.displayOrders();
    this.setupSearchListener();
  },

  /**
   * Utfører et søk på bestillinger ved å bruke filterfunksjonen.
   *
   * Funksjonen kaller `filterOrders` for å filtrere bestillingene basert på gjeldende søkekriterier.
   *
   * @function searchOrders
   */
  searchOrders() {
    this.filterOrders();
  },

  /**
   * Setter opp en hendelseslytter for søkefeltet som filtrerer bestillinger basert på brukerens inndata.
   *
   * Lytteren aktiveres ved inndata i søkefeltet og kontrollerer om inndataen er gyldig
   * (ikke et tall). Hvis inndataen er gyldig, utføres en filtrering av bestillinger.
   *
   * @function setupSearchListener
   */
  setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (isNaN(query)) {
        this.filterOrders();
      }
    });
  },

  /**
   * Filtrerer bestillinger basert på søkekriterier som ordre-ID og status.
   *
   * Funksjonen leser søkefeltet og statusfilteret for å utføre filtreringen.
   * Hvis inndataen er en gyldig ordre-ID, søkes det direkte etter denne spesifikke bestillingen.
   * Hvis det ikke finnes en bestilling med angitt ID, vises en melding om ingen treff.
   * Hvis inndataen ikke er en ordre-ID, kalles `displayOrders` for å filtrere basert på status og fritekst.
   *
   * @function filterOrders
   * @private
   */
  filterOrders() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    const statusFilter = document.getElementById('statusFilter').value;

    if (!isNaN(searchQuery) && searchQuery !== '') {
      const orderId = parseInt(searchQuery, 10);
      const orders = model.orders.filter((order) => order.orderId === orderId);

      if (orders.length > 0) {
        ordersView.renderOrders(orders);
      } else {
        ordersView.renderNoResultsMessage(
          `Ingen bestilling funnet med ID ${orderId}`,
        );
      }
    } else {
      this.displayOrders(statusFilter, searchQuery.toLowerCase());
    }
  },

  /**
   * Viser bestillinger basert på status og fritekstsøk etter kundenavn.
   *
   * Filtrerer bestillingene fra `model.orders` etter valgt status og søkekriterier.
   * Hvis statusfilteret er satt til 'Alle', vises alle bestillinger som samsvarer med søket.
   * Deretter vises resultatene ved å kalle `ordersView.renderOrders`.
   *
   * @function displayOrders
   * @param {string} [statusFilter='Alle'] - Statusfilter for bestillingene, f.eks. 'Alle', 'Under behandling', etc.
   * @param {string} [searchQuery=''] - Søkekriterium for kundenavn (case-insensitiv).
   * @private
   */
  displayOrders(statusFilter = 'Alle', searchQuery = '') {
    const orders = model.orders.filter(
      (order) =>
        (statusFilter === 'Alle' || order.status === statusFilter) &&
        (searchQuery === '' ||
          order.customerName.toLowerCase().includes(searchQuery)),
    );
    ordersView.renderOrders(orders);
  },

  /**
   * Tilbakestiller søkefeltene og viser alle bestillinger.
   *
   * Funksjonen nullstiller søkefeltet og statusfilteret til standardverdier,
   * og kaller deretter `displayOrders` for å vise alle bestillinger uten filter.
   *
   * @function resetSearch
   */
  resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'Alle';
    this.displayOrders();
  },

  /**
   * Oppdaterer statusen for en spesifikk bestilling og viser deretter oppdatert liste over bestillinger.
   *
   * Funksjonen kaller `model.updateOrderStatus` for å endre statusen til en bestilling
   * med angitt ID, og oppdaterer deretter bestillingsvisningen ved å kalle `displayOrders`.
   *
   * @function updateStatus
   * @param {number} orderId - ID for bestillingen som skal oppdateres.
   * @param {string} newStatus - Ny status for bestillingen, f.eks. 'Under behandling', 'Ferdig'.
   */
  updateStatus(orderId, newStatus) {
    model.updateOrderStatus(orderId, newStatus);
    this.displayOrders();
  },
};

/**
 * Lytter til `DOMContentLoaded`-hendelsen for å initialisere `ordersController`.
 *
 * Når dokumentet er ferdig lastet, kalles `ordersController.init()` for å sette opp
 * bestillingsvisning og søkelyttere.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  ordersController.init();
});

function safeText(text) {
  const sanitizedText = DOMPurify.sanitize(text);
  return sanitizedText
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}
