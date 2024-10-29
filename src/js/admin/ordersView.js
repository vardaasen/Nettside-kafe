/**
 * Visning for bestillinger.
 *
 * `ordersView` håndterer rendering av bestillingsinformasjon i brukergrensesnittet
 * og gir mulighet til å oppdatere status for hver bestilling.
 */
const ordersView = {
  /**
   * Renderer bestillinger i brukergrensesnittet, filtrert etter status og søkekriterier.
   *
   * Funksjonen tømmer først eksisterende innhold i bestillingscontaineren og filtrerer bestillingene
   * basert på status og søkekriterier. Hvis ingen bestillinger samsvarer med kriteriene, vises en melding
   * om at ingen bestillinger ble funnet. De filtrerte bestillingene sorteres deretter etter hente-dato og -tid.
   * Til slutt opprettes det et rad-element for hver bestilling, som vises i bestillingscontaineren.
   *
   * @function renderOrders
   * @param {Array<Object>} orders - Liste over bestillinger som skal vises.
   * @param {string} [statusFilter='Alle'] - Valgt statusfilter for bestillingene, f.eks. 'Alle', 'Ny'.
   * @param {string} [searchQuery=''] - Søkekriterium for kundenavn eller bestillings-ID.
   */
  renderOrders(orders, statusFilter = 'Alle', searchQuery = '') {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    let filteredOrders = orders;
    if (statusFilter === 'Alle') {
      filteredOrders = filteredOrders.filter(
        (order) => order.status !== 'Hentet',
      );
    } else {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter,
      );
    }

    if (searchQuery) {
      filteredOrders = filteredOrders.filter((order) => {
        const nameMatch = order.customerName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const idMatch = order.orderId.toString().includes(searchQuery);
        return nameMatch || idMatch;
      });
    }

    if (orders.length === 0) {
      this.renderNoResultsMessage('Ingen bestillinger funnet.');
      return;
    }

    const sortedOrders = sortByPickupDateAndTime(filteredOrders);

    sortedOrders.forEach((order) => {
      const orderRow = document.createElement('div');
      orderRow.classList.add('orders-table__row');

      orderRow.innerHTML = `
        <div class="orders-table__column orders-table__column--customer">
          <div>${order.orderId}</div>
        </div>
        <div class="orders-table__column orders-table__column--customer">
          <div>${safeText(order.customerName)}</div>
          <div>${safeText(order.contactNumber)}</div>
        </div>
        <div class="orders-table__column orders-table__column--products">
          ${renderOrderedProductsHtml(order.products)}
        </div>
        <div class="orders-table__column orders-table__column--schedule">
          ${formatDateTime(order.pickUpSchedule.date, order.pickUpSchedule.time)}
        </div>
        <div class="orders-table__column orders-table__column--status">
          <div class="order-status">Status: ${order.status}</div>
          <div class="order-status__label">Oppdater statusen:</div>
          <select id="statusSelect-${order.orderId}" class="order-status__select">
            <option value="Ny" ${order.status === 'Ny' ? 'selected' : ''}>Ny</option>
      <option value="Under arbeid" ${order.status === 'Under arbeid' ? 'selected' : ''}>Under arbeid</option>
      <option value="Klar til henting" ${order.status === 'Klar til henting' ? 'selected' : ''}>Klar til henting</option>
      <option value="Hentet" ${order.status === 'Hentet' ? 'selected' : ''}>Hentet</option>
          </select>
          <button
            class="order-status__button"
            onclick="ordersController.updateStatus(${order.orderId}, document.getElementById('statusSelect-${order.orderId}').value)">
            Oppdater
          </button>
        </div>
      `;

      ordersContainer.appendChild(orderRow);
    });
  },

  /**
   * Viser en melding når ingen bestillinger samsvarer med søkekriteriene.
   *
   * Funksjonen tømmer eksisterende innhold i bestillingscontaineren og viser en melding
   * om at ingen resultater ble funnet, basert på den angitte meldingen.
   *
   * @function renderNoResultsMessage
   * @param {string} message - Melding som skal vises når det ikke finnes noen treff.
   */
  renderNoResultsMessage(message) {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = `<p class="orders-search__no-result">${message}</p>`;
  },
};

/**
 * Sorterer en liste over bestillinger etter hentetidspunkt (dato og tid).
 *
 * Denne funksjonen sorterer først etter hentedato (`pickUpSchedule.date`),
 * og deretter etter hentetid (`pickUpSchedule.time`) hvis datoene er like.
 * Hentetidspunktet konverteres til minutter for enklere sammenligning.
 *
 * @function
 * @param {Array<{pickUpSchedule: {date: string, time: string}}>} orders - En liste over bestillinger som skal sorteres.
 * @returns {Array} En ny liste med bestillinger sortert etter hentedato og tid.
 *
 * @example
 * const sortedOrders = sortByPickupDateAndTime(orders);
 */
function sortByPickupDateAndTime(orders) {
  return orders.sort((a, b) => {
    const aDate = new Date(a.pickUpSchedule.date);
    const bDate = new Date(b.pickUpSchedule.date);

    if (aDate.getTime() === bDate.getTime()) {
      const aTime = a.pickUpSchedule.time.split(':');
      const bTime = b.pickUpSchedule.time.split(':');

      return (
        parseInt(aTime[0]) * 60 +
        parseInt(aTime[1]) -
        (parseInt(bTime[0]) * 60 + parseInt(bTime[1]))
      );
    }

    return aDate.getTime() - bDate.getTime();
  });
}

/**
 * Genererer HTML for å vise en liste over bestilte produkter.
 *
 * Denne funksjonen tar en liste over produkter i en bestilling og genererer
 * HTML som viser produktnavn, mengde og eventuelle kommentarer for hvert produkt.
 *
 * @function
 * @param {Array<{productName: string, quantity: number, comment: string}>} orderProducts - En liste over produkter i en bestilling.
 * @returns {string} HTML-streng som representerer bestilte produkter.
 * @private
 *
 * @example
 * const orderProductsHtml = renderOrderedProductsHtml(order.products);
 */
function renderOrderedProductsHtml(orderProducts) {
  let html = '';
  orderProducts.forEach((product) => {
    html += `
      <div class="orders__product">
        <div class="orders__product-name">${safeText(product.productName)}</div>
        <div class="orders__product-quantity">Antall: ${safeText(product.quantity)}</div>
        <div class="orders__product-comment">${safeText(product.comment)}</div>
      </div>
    `;
  });
  return html;
}
