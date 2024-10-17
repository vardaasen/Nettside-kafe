/**
 * Visning for bestillinger.
 */
const ordersView = {
  /**
   * Gjengir bestillinger i brukergrensesnittet.
   * @param {Array<{
   *   orderId: number,
   *   customerName: string,
   *   status: string,
   *   pickUpSchedule: { date: string, time: string },
   *   products: Array<{ productId: number, quantity: number, comment: string }>
   * }>} orders - Listen av bestillinger.
   */
  renderOrders(orders) {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    const visibleOrders = orders.filter(order => order.status !== 'Hentet');

    visibleOrders.forEach(order => {
      if (ordersController.isTimeValid(order.pickUpSchedule.time)) {
        const orderRow = document.createElement('div');
        orderRow.classList.add('orders__row');

        orderRow.innerHTML = `
          <div class="orders__column orders__column--customer">${order.customerName}</div>
          <div class="orders__column orders__column--products">
            ${order.products.map(product => {
          const productDetails = model.getProducts().find(p => p.productId === product.productId);
          return `
                <div class="orders__product">
                  <div class="orders__product-name">${productDetails.productName}</div>
                  <div class="orders__product-quantity">Antall: ${product.quantity}</div>
                  <div class="orders__product-comment">Kommentar: ${product.comment}</div>
                </div>
              `;
        }).join('')}
          </div>
          <div class="orders__column orders__column--schedule">${order.pickUpSchedule.date} ${order.pickUpSchedule.time}</div>
          <div class="orders__column orders__column--status">
            <div class="orders__status">Status: ${order.status}</div>
            <div class="orders__status-change-label">Oppdater statusen:</div>
            <select id="statusSelect-${order.orderId}">
              <option value="Ny" ${order.status === 'Ny' ? 'selected' : ''}>Ny</option>
              <option value="Under arbeid" ${order.status === 'Under arbeid' ? 'selected' : ''}>Under arbeid</option>
              <option value="Klar til henting" ${order.status === 'Klar til henting' ? 'selected' : ''}>Klar til henting</option>
              <option value="Hentet" ${order.status === 'Hentet' ? 'selected' : ''}>Hentet</option>
            </select>
            <button onclick="ordersController.updateStatus(${order.orderId}, document.getElementById('statusSelect-${order.orderId}').value)">Oppdater</button>
          </div>
        `;

        ordersContainer.appendChild(orderRow);
      }
    });
  }
};
