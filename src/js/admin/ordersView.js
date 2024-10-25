const ordersView = {
  /**
   * Gjengir bestillinger i brukergrensesnittet.
   */
  renderOrders() {
    console.log(model.orders);
    const orders = model.orders;
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    const visibleOrders = orders.filter((order) => order.status !== 'Hentet');
    const sortedOrders = sortByPickupDateAndTime(visibleOrders);

    sortedOrders.forEach((order) => {
      const orderRow = document.createElement('div');
      orderRow.classList.add('orders__row');

      orderRow.innerHTML = `
        <div class="orders__column orders__column--customer">
          ${order.customerName}
        </div>
        <div class="orders__column orders__column--products">
          ${renderOrderedProductsHtml(order.products)}
        </div>
        <div class="orders__column orders__column--schedule">
          ${order.pickUpSchedule.date} ${order.pickUpSchedule.time}
        </div>
        <div class="orders__column orders__column--status">
          <div class="orders__status">Status: ${order.status}</div>
          <div class="orders__status-change-label">Oppdater statusen:</div>
          <select id="statusSelect-${order.orderId}">
            <option value="Ny" ${order.status === 'Ny' ? 'selected' : ''}>Ny</option>
            <option value="Under arbeid" ${order.status === 'Under arbeid' ? 'selected' : ''}>Under arbeid</option>
            <option value="Klar til henting" ${order.status === 'Klar til henting' ? 'selected' : ''}>Klar til henting</option>
            <option value="Hentet" ${order.status === 'Hentet' ? 'selected' : ''}>Hentet</option>
          </select>
          <button
            onclick="ordersController.updateStatus(${order.orderId}, document.getElementById('statusSelect-${order.orderId}').value)">
            Oppdater
          </button>
        </div>
      `;

      ordersContainer.appendChild(orderRow);
    });
  },
};

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
 * Gjengir produkter for en bestilling.
 * @param {Array<{ productName: string, quantity: number, comment: string }>} orderProducts - Produktene for en bestilling.
 */
function renderOrderedProductsHtml(orderProducts) {
  let html = '';
  orderProducts.forEach((product) => {
    html += `
      <div class="orders__product">
        <div class="orders__product-name">${product.productName}</div>
        <div class="orders__product-quantity">Antall: ${product.quantity}</div>
        <div class="orders__product-comment">${product.comment}</div>
      </div>
    `;
  });
  return html;
}
