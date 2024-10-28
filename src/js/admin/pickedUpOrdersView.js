/**
 * Visning for hentede bestillinger.
 *
 * `pickedUpOrdersView` håndterer rendering av bestillingsinformasjon i brukergrensesnittet.
 */
const pickedUpOrdersView = {
  renderOrders(orders, searchQuery = '') {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    // Filter orders based on search query
    let filteredOrders = orders;
    if (searchQuery) {
      filteredOrders = filteredOrders.filter((order) => {
        const nameMatch = order.customerName.toLowerCase().includes(searchQuery);
        const idMatch = order.orderId.toString().includes(searchQuery);
        return nameMatch || idMatch;
      });
    }

    // Sort orders
    const sortedOrders = sortByPickupDateAndTime(filteredOrders);

    // Render orders
    sortedOrders.forEach((order) => {
      const orderRow = document.createElement('div');
      orderRow.classList.add('orders-table__row');

      orderRow.innerHTML = `
        <div class="orders-table__column orders-table__column--customer">
          <div>${order.customerName}</div>
          <div>${order.contactNumber}</div>
        </div>
        <div class="orders-table__column orders-table__column--products">
          ${renderOrderedProductsHtml(order.products)}
        </div>
        <div class="orders-table__column orders-table__column--schedule">
          ${order.pickUpSchedule.date} ${order.pickUpSchedule.time}
        </div>
      `;

      ordersContainer.appendChild(orderRow);
    });

    // If no orders, display a message
    if (sortedOrders.length === 0) {
      ordersContainer.innerHTML = '<p>Ingen hentede bestillinger funnet.</p>';
    }
  },
};

function sortByPickupDateAndTime(orders) {
  return orders.sort((a, b) => {
    const aDateTime = new Date(`${a.pickUpSchedule.date}T${a.pickUpSchedule.time}`);
    const bDateTime = new Date(`${b.pickUpSchedule.date}T${b.pickUpSchedule.time}`);
    return bDateTime - aDateTime; // Sort descending for hentede orders
  });
}

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
