/**
 * Visning for hentede bestillinger.
 *
 * `pickedUpOrdersView` håndterer rendering av bestillingsinformasjon i brukergrensesnittet.
 */
const pickedUpOrdersView = {
  /**
   * Renderer bestillinger som er hentet i brukergrensesnittet, filtrert etter søkekriterier.
   *
   * Funksjonen filtrerer bestillingene basert på søkekriterier, sorterer dem etter hente-dato og -tid,
   * og genererer HTML for hver bestilling. Hvis ingen bestillinger finnes, vises en melding.
   *
   * @function renderOrders
   * @param {Array<Object>} orders - Liste over bestillinger som skal vises.
   * @param {string} [searchQuery=''] - Søkekriterium for kundenavn eller bestillings-ID.
   */
  renderOrders(orders, searchQuery = '') {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    // Filtrerer bestillinger basert på søkekriterier
    let filteredOrders = orders;
    if (searchQuery) {
      filteredOrders = filteredOrders.filter((order) => {
        const nameMatch = order.customerName
          .toLowerCase()
          .includes(searchQuery);
        const idMatch = order.orderId.toString().includes(searchQuery);
        return nameMatch || idMatch;
      });
    }

    // Sorterer bestillinger
    const sortedOrders = sortByPickupDateAndTime(filteredOrders);

    // Renderer bestillinger
    sortedOrders.forEach((order) => {
      const orderRow = document.createElement('div');
      orderRow.classList.add('orders-table__row');

      orderRow.innerHTML = `
        <div class="orders-table__column orders-table__column--order-id">
          <div>${order.orderId}</div>
        </div>
        <div class="orders-table__column orders-table__column--customer">
          <div>${order.customerName}</div>
          <div>${order.contactNumber}</div>
        </div>
        <div class="orders-table__column orders-table__column--products">
          ${renderOrderedProductsHtml(order.products)}
        </div>
        <div class="orders-table__column orders-table__column--schedule">
          ${formatDateTime(order.pickUpSchedule.date, order.pickUpSchedule.time)}
        </div>
      `;

      ordersContainer.appendChild(orderRow);
    });

    // Viser melding hvis ingen bestillinger er funnet
    if (sortedOrders.length === 0) {
      ordersContainer.innerHTML = '<p>Ingen hentede bestillinger funnet.</p>';
    }
  },
};

/**
 * Sorterer bestillinger etter hente-dato og -tid.
 *
 * @function sortByPickupDateAndTime
 * @param {Array<Object>} orders - Liste over bestillinger som skal sorteres.
 * @returns {Array<Object>} - Sortert liste over bestillinger, med de nyeste først.
 */
function sortByPickupDateAndTime(orders) {
  return orders.sort((a, b) => {
    const aDateTime = new Date(
      `${a.pickUpSchedule.date}T${a.pickUpSchedule.time}`,
    );
    const bDateTime = new Date(
      `${b.pickUpSchedule.date}T${b.pickUpSchedule.time}`,
    );
    return bDateTime - aDateTime; // Sort descending for hentede orders
  });
}

/**
 * Genererer HTML for produkter i en bestilling.
 *
 * Funksjonen tar en liste over produkter i en bestilling og returnerer en HTML-streng som representerer
 * hvert produkt med navn, antall og kommentar.
 *
 * @function renderOrderedProductsHtml
 * @param {Array<Object>} orderProducts - Liste over produkter i en bestilling.
 * @returns {string} - HTML-streng som representerer produktene i bestillingen.
 */
function renderOrderedProductsHtml(orderProducts) {
  let html = '';
  orderProducts.forEach((product) => {
    html += `
      <div class="order-product">
        <div class="order-product__name">${product.productName}</div>
        <div class="order-product__quantity">Antall: ${product.quantity}</div>
        <div class="order-product__comment">${product.comment}</div>
      </div>
    `;
  });
  return html;
}
